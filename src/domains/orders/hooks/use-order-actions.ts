import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import {
	OpsRealtimeAckTimeoutError,
	OpsRealtimeCommandRejectedError,
	OpsRealtimeTransportError,
	opsRealtimeClient,
} from "@/lib/realtime/ops-realtime-client"
import {
	captureOpsRealtimeTelemetry,
	OpsRealtimeTelemetryEvents,
} from "@/lib/realtime/ops-realtime-telemetry"
import { sentryCaptureException } from "@/lib/sentry"
import { ApiRequestError } from "@/utils/fetch"
import { updateOrderApproval, updateOrderStatus } from "../api/orders-api"
import type { OrderStatus } from "../types/order.types"
import { invalidateOrdersCache, ordersQueryKeys } from "./orders-query-keys"

interface UpdateStatusMutationResult {
	changed: boolean
	source: "realtime" | "rest"
}

class RealtimeFallbackRestFailureError extends Error {
	readonly originalError: unknown

	constructor(originalError: unknown) {
		super("Falha ao atualizar status via fallback REST")
		this.name = "RealtimeFallbackRestFailureError"
		this.originalError = originalError
	}
}

function getErrorCode(error: unknown): string | undefined {
	if (error instanceof ApiRequestError) {
		return error.errorCode
	}

	if (error instanceof OpsRealtimeCommandRejectedError) {
		return error.errorCode
	}

	if (error instanceof RealtimeFallbackRestFailureError) {
		return getErrorCode(error.originalError)
	}

	return undefined
}

function isRealtimeFallbackAttempted(error: unknown): boolean {
	return error instanceof RealtimeFallbackRestFailureError
}

function getStatusErrorMessage(error: unknown): string {
	const errorCode = getErrorCode(error)

	if (errorCode) {
		switch (errorCode) {
			case "ORDER_NOT_FOUND":
				return "Pedido não encontrado para atualização"
			case "ORDER_INVALID_TRANSITION":
				return "Transição de status inválida para este pedido"
			case "FORBIDDEN":
				return "Seu perfil não tem permissão para esta ação"
			case "VALIDATION_ERROR":
				return "Dados inválidos para atualizar o pedido"
			default:
				return "Não foi possível atualizar o status do pedido"
		}
	}

	return "Não foi possível atualizar o status do pedido"
}

export function useOrderActions(organizationId: string | null) {
	const queryClient = useQueryClient()

	const statusMutation = useMutation({
		mutationKey: ordersQueryKeys.mutations.status(organizationId),
		mutationFn: async ({
			orderId,
			status,
		}: {
			orderId: string
			status: OrderStatus
		}) => {
			const orgId = organizationId as string

			try {
				const ack = await opsRealtimeClient.requestOrderStatusChange({
					organizationId: orgId,
					orderId,
					status,
				})

				if (ack.changed === false) {
					captureOpsRealtimeTelemetry(
						OpsRealtimeTelemetryEvents.orderStatusNoop,
						{
							organization_id: orgId,
							order_id: orderId,
							status,
							source: "realtime",
						}
					)

					return {
						changed: false,
						source: "realtime",
					} satisfies UpdateStatusMutationResult
				}

				return {
					changed: true,
					source: "realtime",
				} satisfies UpdateStatusMutationResult
			} catch (error) {
				if (
					error instanceof OpsRealtimeAckTimeoutError ||
					error instanceof OpsRealtimeTransportError
				) {
					captureOpsRealtimeTelemetry(
						OpsRealtimeTelemetryEvents.orderStatusFallbackToRest,
						{
							organization_id: orgId,
							order_id: orderId,
							status,
							reason: error.name,
						}
					)

					try {
						await updateOrderStatus(orgId, status, orderId)
					} catch (fallbackError) {
						throw new RealtimeFallbackRestFailureError(fallbackError)
					}

					return {
						changed: true,
						source: "rest",
					} satisfies UpdateStatusMutationResult
				}

				throw error
			}
		},
		onSuccess: (result, variables) => {
			if (!result.changed) {
				return
			}

			invalidateOrdersCache(queryClient, organizationId, variables.orderId)
		},
		onError: (error, variables) => {
			toast.error(getStatusErrorMessage(error))
			sentryCaptureException(error, {
				context: "orders_update_status",
				organizationId,
				orderId: variables.orderId,
				status: variables.status,
				realtimeFallback: isRealtimeFallbackAttempted(error),
			})
		},
	})

	const approvalMutation = useMutation({
		mutationKey: ordersQueryKeys.mutations.approval(organizationId),
		mutationFn: ({
			orderId,
			approvalStatus,
			approvedBy,
		}: {
			orderId: string
			approvalStatus: "approved" | "rejected"
			approvedBy: string
		}) =>
			updateOrderApproval(
				organizationId as string,
				{ approvalStatus, approvedBy },
				orderId
			),
		onSuccess: (_, variables) => {
			invalidateOrdersCache(queryClient, organizationId, variables.orderId)
		},
		onError: (error, variables) => {
			toast.error("Não foi possível atualizar a aprovação do pedido")
			sentryCaptureException(error, {
				context: "orders_update_approval",
				organizationId,
				orderId: variables.orderId,
				approvalStatus: variables.approvalStatus,
			})
		},
	})

	const updateStatus = (orderId: string, status: OrderStatus) => {
		if (!organizationId) {
			toast.error("Organização não identificada para executar esta ação")
			return
		}

		statusMutation.mutate({ orderId, status })
	}

	const approveOrder = (orderId: string, approvedBy: string) => {
		if (!organizationId) {
			toast.error("Organização não identificada para executar esta ação")
			return
		}

		approvalMutation.mutate({ orderId, approvalStatus: "approved", approvedBy })
	}

	const rejectOrder = (orderId: string, approvedBy: string, _notes: string) => {
		if (!organizationId) {
			toast.error("Organização não identificada para executar esta ação")
			return
		}

		approvalMutation.mutate({ orderId, approvalStatus: "rejected", approvedBy })
	}

	return {
		updateStatus,
		approveOrder,
		rejectOrder,
		isUpdating: statusMutation.isPending || approvalMutation.isPending,
	}
}
