import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { sentryCaptureException } from "@/lib/sentry"
import type { PaymentMethod } from "@/shared/types/commerce-types"
import { createOrder, updateOrderStatus } from "../api/orders-api"
import { toApiOrderStatus } from "../model/order-operational-status"
import { invalidateOrdersCache } from "./orders-query-keys"

const HTTP_STATUS_REGEX = /status:\s*(\d+)/i

interface CheckoutCartItem {
	menuItem: {
		id: string
		name: string
		price: string | number
	}
	quantity: number
	notes?: string
}

interface CheckoutPayload {
	organizationId: string
	items: CheckoutCartItem[]
	type: "dine_in" | "takeaway" | "delivery"
	tableId?: string
	customerId?: string
	notes?: string
	paymentMethod: PaymentMethod
	taxRate: number
	splitCount: number
}

interface PosCheckoutResult {
	orderId: string
	createdAt: Date
	syncMode: "api" | "fallback"
}

function readHttpStatus(error: unknown): number | null {
	if (!(error instanceof Error)) {
		return null
	}

	const matches = error.message.match(HTTP_STATUS_REGEX)
	if (!matches?.[1]) {
		return null
	}

	return Number(matches[1])
}

function isSafeFallbackStatus(error: unknown): boolean {
	const status = readHttpStatus(error)
	return status === 404 || status === 405 || status === 501 || status === 503
}

function buildLocalOrderId() {
	return `LOCAL-${Date.now()}`
}

function buildCreateOrderPayload(payload: CheckoutPayload) {
	const subtotal = payload.items.reduce(
		(sum, item) => sum + +item.menuItem.price * item.quantity,
		0
	)
	const tax = subtotal * (payload.taxRate / 100)
	const total = subtotal + tax

	return {
		organizationId: payload.organizationId,
		tableId: payload.tableId,
		customerId: payload.customerId,
		notes: payload.notes,
		type: payload.type,
		status: toApiOrderStatus("aceito"),
		subtotal,
		tax,
		discount: 0,
		total,
		paymentMethod: payload.paymentMethod,
		paymentStatus: "paid",
		splitBill:
			payload.splitCount > 1
				? Array.from({ length: payload.splitCount }, (_, index) => ({
						id: `${index + 1}`,
						amount: Number((total / payload.splitCount).toFixed(2)),
						paymentMethod: payload.paymentMethod,
						paid: true,
					}))
				: undefined,
		orderItems: payload.items.map((item) => ({
			menuItemId: item.menuItem.id,
			name: item.menuItem.name,
			quantity: item.quantity,
			price: +item.menuItem.price,
			notes: item.notes,
		})),
	}
}

export function usePosOrderCheckout(organizationId: string | null) {
	const queryClient = useQueryClient()

	const checkoutMutation = useMutation({
		mutationKey: ["orders", "mutation", "pos-checkout", organizationId],
		mutationFn: async (
			payload: Omit<CheckoutPayload, "organizationId">
		): Promise<PosCheckoutResult> => {
			if (!organizationId) {
				throw new Error("Organização inválida para finalizar pedido")
			}

			const createPayload = buildCreateOrderPayload({
				organizationId,
				...payload,
			})

			const createdAt = new Date()

			try {
				const createdOrder = (await createOrder(createPayload)) as {
					id?: string
				}

				const orderId = createdOrder?.id ?? buildLocalOrderId()

				try {
					await updateOrderStatus(
						organizationId,
						toApiOrderStatus("finalizado"),
						orderId
					)
				} catch (updateError) {
					if (isSafeFallbackStatus(updateError)) {
						return {
							orderId,
							createdAt,
							syncMode: "fallback",
						}
					}

					throw updateError
				}

				return {
					orderId,
					createdAt,
					syncMode: "api",
				}
			} catch (error) {
				if (isSafeFallbackStatus(error)) {
					return {
						orderId: buildLocalOrderId(),
						createdAt,
						syncMode: "fallback",
					}
				}

				throw error
			}
		},
		onSuccess: (result) => {
			invalidateOrdersCache(queryClient, organizationId, result.orderId)

			if (result.syncMode === "api") {
				toast.success("Pedido finalizado e sincronizado com o backend")
				return
			}

			toast.warning(
				"Pedido salvo em modo contingência. A sincronização será retomada quando os endpoints estiverem disponíveis."
			)
		},
		onError: (error) => {
			toast.error("Não foi possível finalizar o pedido")
			sentryCaptureException(error, {
				context: "pos_checkout_order",
				organizationId,
			})
		},
	})

	return {
		checkoutOrder: checkoutMutation.mutateAsync,
		isCheckoutPending: checkoutMutation.isPending,
	}
}
