import { apiFetch } from "@/utils/fetch"
import type { Order, OrderStatus } from "../types/order.types"
import type {
	OrderFilter,
	OrderStatsResponse,
} from "../types/order-query.types"

interface OrdersRequest {
	organizationId: string
	filters?: OrderFilter
	page?: number
	count?: number
	signal?: AbortSignal
}

export function getOrders({
	organizationId,
	filters,
	page = 0,
	count = 20,
	signal,
}: OrdersRequest) {
	const params = new URLSearchParams()

	if (filters?.status) {
		params.append("status", filters.status)
	}
	if (filters?.orderType) {
		params.append("orderType", filters.orderType)
	}
	if (filters?.startDate) {
		params.append("startDate", filters.startDate)
	}
	if (filters?.endDate) {
		params.append("endDate", filters.endDate)
	}

	params.append("limit", count.toString())
	params.append("offset", page.toString())

	const queryString = params.toString()
	const endpoint = `/orders/${organizationId}${queryString ? `?${queryString}` : ""}`

	return apiFetch<Order[]>(endpoint, { signal })
}

export function getOrderStats(organizationId: string, signal?: AbortSignal) {
	return apiFetch<OrderStatsResponse>(`/orders/${organizationId}/stats`, {
		signal,
	})
}

export function getOrderByOrderId(
	organizationId: string,
	orderId: string,
	signal?: AbortSignal
) {
	return apiFetch<Order>(`/orders/${organizationId}/${orderId}`, { signal })
}

export function createOrder(data: unknown, signal?: AbortSignal) {
	return apiFetch("/orders", {
		signal,
		method: "POST",
		body: JSON.stringify(data),
	})
}

export function updateOrderStatus(
	organizationId: string,
	status: OrderStatus,
	orderId: string,
	signal?: AbortSignal
) {
	return apiFetch(`/orders/${organizationId}/${orderId}/status`, {
		signal,
		method: "PATCH",
		body: JSON.stringify({ status }),
	})
}

export function updateOrderApproval(
	organizationId: string,
	body: {
		approvalStatus: string
		approvedBy: string
	},
	orderId: string,
	signal?: AbortSignal
) {
	return apiFetch(`/orders/${organizationId}/${orderId}/approval`, {
		signal,
		method: "PATCH",
		body: JSON.stringify(body),
	})
}
