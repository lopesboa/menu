import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { sentryCaptureException } from "@/lib/sentry"
import { ApiRequestError } from "@/utils/fetch"
import {
	activatePosOrder,
	cancelPosOrder,
	checkoutPosOrder,
	createPosDraft,
	finalizePosDraft,
	reopenPosOrder,
	replacePosDraft,
} from "../api/pos-orders-api"
import { getPosErrorMessage } from "../types/pos-error-codes"
import type {
	PosActivateResult,
	PosCancelPayload,
	PosCancelResult,
	PosCheckoutPayload,
	PosCheckoutResult,
	PosCreateOrderPayload,
	PosCreateOrderResult,
	PosDraftReplacePayload,
	PosDraftReplaceResult,
	PosFinalizeResult,
	PosPaymentMethod,
	PosReopenResult,
} from "../types/pos-order-types"
import { invalidatePosOrderCache, posQueryKeys } from "./pos-query-keys"

function extractErrorCode(error: unknown): string | undefined {
	if (error instanceof ApiRequestError) {
		return error.errorCode
	}

	return undefined
}

function isVersionConflict(error: unknown): boolean {
	return extractErrorCode(error) === "ORDER_VERSION_CONFLICT"
}

export function usePosOrderActions(organizationId: string | null) {
	const queryClient = useQueryClient()

	const createMutation = useMutation<
		PosCreateOrderResult,
		unknown,
		Omit<PosCreateOrderPayload, "organizationId">
	>({
		mutationKey: posQueryKeys.mutations.create(organizationId),
		mutationFn: (payload) =>
			createPosDraft({
				organizationId: organizationId as string,
				...payload,
			}),
		onSuccess: (result) => {
			toast.success("Pedido criado")
			invalidatePosOrderCache(queryClient, organizationId, result.order.id)
		},
		onError: (error) => {
			toast.error(
				getPosErrorMessage(
					extractErrorCode(error),
					"Não foi possível criar o pedido"
				)
			)
			sentryCaptureException(error, {
				context: "pos_create_draft",
				organizationId,
			})
		},
	})

	const replaceDraftMutation = useMutation<
		PosDraftReplaceResult,
		unknown,
		{ orderId: string; payload: PosDraftReplacePayload }
	>({
		mutationKey: posQueryKeys.mutations.replaceDraft(organizationId),
		mutationFn: ({ orderId, payload }) =>
			replacePosDraft(organizationId as string, orderId, payload),
		onSuccess: (result) => {
			invalidatePosOrderCache(queryClient, organizationId, result.order.id)
		},
		onError: (error, variables) => {
			if (isVersionConflict(error)) {
				toast.error(
					getPosErrorMessage("ORDER_VERSION_CONFLICT", "Conflito de versão")
				)
				invalidatePosOrderCache(queryClient, organizationId, variables.orderId)
				return
			}

			toast.error(
				getPosErrorMessage(
					extractErrorCode(error),
					"Não foi possível atualizar o pedido"
				)
			)
			sentryCaptureException(error, {
				context: "pos_replace_draft",
				organizationId,
				orderId: variables.orderId,
			})
		},
	})

	const finalizeMutation = useMutation<
		PosFinalizeResult,
		unknown,
		{ orderId: string }
	>({
		mutationKey: posQueryKeys.mutations.finalize(organizationId),
		mutationFn: ({ orderId }) =>
			finalizePosDraft(organizationId as string, orderId),
		onSuccess: (result) => {
			toast.success("Pedido finalizado comercialmente")
			invalidatePosOrderCache(queryClient, organizationId, result.order.id)
		},
		onError: (error, variables) => {
			toast.error(
				getPosErrorMessage(
					extractErrorCode(error),
					"Não foi possível finalizar o pedido"
				)
			)
			sentryCaptureException(error, {
				context: "pos_finalize",
				organizationId,
				orderId: variables.orderId,
			})
		},
	})

	const activateMutation = useMutation<
		PosActivateResult,
		unknown,
		{ orderId: string }
	>({
		mutationKey: posQueryKeys.mutations.activate(organizationId),
		mutationFn: ({ orderId }) =>
			activatePosOrder(organizationId as string, orderId),
		onSuccess: (result) => {
			toast.success("Pedido ativado para operação")
			invalidatePosOrderCache(queryClient, organizationId, result.order.id)
		},
		onError: (error, variables) => {
			toast.error(
				getPosErrorMessage(
					extractErrorCode(error),
					"Não foi possível ativar o pedido"
				)
			)
			sentryCaptureException(error, {
				context: "pos_activate",
				organizationId,
				orderId: variables.orderId,
			})
		},
	})

	const checkoutMutation = useMutation<
		PosCheckoutResult,
		unknown,
		{ orderId: string; payload: PosCheckoutPayload }
	>({
		mutationKey: posQueryKeys.mutations.checkout(organizationId),
		mutationFn: ({ orderId, payload }) =>
			checkoutPosOrder(organizationId as string, orderId, payload),
		onSuccess: (result) => {
			toast.success("Pagamento registrado")
			invalidatePosOrderCache(queryClient, organizationId, result.order.id)
		},
		onError: (error, variables) => {
			toast.error(
				getPosErrorMessage(
					extractErrorCode(error),
					"Não foi possível registrar o pagamento"
				)
			)
			sentryCaptureException(error, {
				context: "pos_checkout",
				organizationId,
				orderId: variables.orderId,
			})
		},
	})

	const reopenMutation = useMutation<
		PosReopenResult,
		unknown,
		{ orderId: string }
	>({
		mutationKey: posQueryKeys.mutations.reopen(organizationId),
		mutationFn: ({ orderId }) =>
			reopenPosOrder(organizationId as string, orderId),
		onSuccess: (result) => {
			toast.success("Pedido reaberto para edição")
			invalidatePosOrderCache(queryClient, organizationId, result.order.id)
		},
		onError: (error, variables) => {
			toast.error(
				getPosErrorMessage(
					extractErrorCode(error),
					"Não foi possível reabrir o pedido"
				)
			)
			sentryCaptureException(error, {
				context: "pos_reopen",
				organizationId,
				orderId: variables.orderId,
			})
		},
	})

	const cancelMutation = useMutation<
		PosCancelResult,
		unknown,
		{ orderId: string; payload: PosCancelPayload }
	>({
		mutationKey: posQueryKeys.mutations.cancel(organizationId),
		mutationFn: ({ orderId, payload }) =>
			cancelPosOrder(organizationId as string, orderId, payload),
		onSuccess: (result) => {
			toast.success("Pedido cancelado")
			invalidatePosOrderCache(queryClient, organizationId, result.order.id)
		},
		onError: (error, variables) => {
			toast.error(
				getPosErrorMessage(
					extractErrorCode(error),
					"Não foi possível cancelar o pedido"
				)
			)
			sentryCaptureException(error, {
				context: "pos_cancel",
				organizationId,
				orderId: variables.orderId,
			})
		},
	})

	const guardOrganization = (): boolean => {
		if (!organizationId) {
			toast.error("Organização não identificada para executar esta ação")
			return false
		}

		return true
	}

	return {
		createDraft: (payload: Omit<PosCreateOrderPayload, "organizationId">) => {
			if (!guardOrganization()) {
				return
			}
			return createMutation.mutateAsync(payload)
		},

		replaceDraft: (orderId: string, payload: PosDraftReplacePayload) => {
			if (!guardOrganization()) {
				return
			}
			replaceDraftMutation.mutate({ orderId, payload })
		},

		finalize: (orderId: string) => {
			if (!guardOrganization()) {
				return
			}
			return finalizeMutation.mutateAsync({ orderId })
		},

		activate: (orderId: string) => {
			if (!guardOrganization()) {
				return
			}
			return activateMutation.mutateAsync({ orderId })
		},

		checkout: (orderId: string, paymentMethod: PosPaymentMethod) => {
			if (!guardOrganization()) {
				return
			}
			return checkoutMutation.mutateAsync({
				orderId,
				payload: { paymentMethod },
			})
		},

		reopen: (orderId: string) => {
			if (!guardOrganization()) {
				return
			}
			return reopenMutation.mutateAsync({ orderId })
		},

		cancel: (orderId: string, reason: string) => {
			if (!guardOrganization()) {
				return
			}
			cancelMutation.mutate({ orderId, payload: { reason } })
		},

		isCreating: createMutation.isPending,
		isReplacingDraft: replaceDraftMutation.isPending,
		isFinalizing: finalizeMutation.isPending,
		isActivating: activateMutation.isPending,
		isCheckingOut: checkoutMutation.isPending,
		isReopening: reopenMutation.isPending,
		isCancelling: cancelMutation.isPending,

		isVersionConflict: isVersionConflict(replaceDraftMutation.error),

		lastCreatedOrder: createMutation.data?.order ?? null,
		lastReplacedOrder: replaceDraftMutation.data?.order ?? null,
		lastCheckoutOrder: checkoutMutation.data?.order ?? null,
	}
}
