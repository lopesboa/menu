import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { sentryCaptureException } from "@/lib/sentry"
import { ApiRequestError } from "@/utils/fetch"
import { updateOrderApproval, updateOrderStatus } from "../api/orders-api"
import type { OrderStatus } from "../types/order.types"
import { invalidateOrdersCache, ordersQueryKeys } from "./orders-query-keys"

function getStatusErrorMessage(error: unknown): string {
	if (error instanceof ApiRequestError) {
		switch (error.errorCode) {
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
		mutationFn: ({
			orderId,
			status,
		}: {
			orderId: string
			status: OrderStatus
		}) => updateOrderStatus(organizationId as string, status, orderId),
		onSuccess: (_, variables) => {
			invalidateOrdersCache(queryClient, organizationId, variables.orderId)
		},
		onError: (error, variables) => {
			toast.error(getStatusErrorMessage(error))
			sentryCaptureException(error, {
				context: "orders_update_status",
				organizationId,
				orderId: variables.orderId,
				status: variables.status,
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
