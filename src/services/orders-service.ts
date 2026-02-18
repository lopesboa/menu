import type { Order, OrderStatus } from "@/types/dashboard"
import type { OrderFilter, OrderStatsResponse } from "@/types/orders"
import { apiFetch, ORG_ID } from "@/utils/fetch"

export function getOrders(
	filters?: OrderFilter,
	page = 0,
	count = 20,
	signal?: AbortSignal
) {
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
	const endpoint = `/orders/${ORG_ID}${queryString ? `?${queryString}` : ""}`

	return apiFetch<Order[]>(endpoint, { signal })
}

export function getOrderStats(signal?: AbortSignal) {
	return apiFetch<OrderStatsResponse>(`/orders/${ORG_ID}/stats`, { signal })
}

export function getOrderByOrderId(orderId: string, signal?: AbortSignal) {
	return apiFetch(`/orders/${ORG_ID}/${orderId}`, { signal })
}

export function createOrder(data: unknown, signal?: AbortSignal) {
	return apiFetch("/orders", {
		signal,
		method: "POST",
		body: JSON.stringify(data),
	})
}

export function updateOrderStatus(
	status: OrderStatus,
	orderId: string,
	signal?: AbortSignal
) {
	return apiFetch(`/orders/${ORG_ID}/${orderId}/status`, {
		signal,
		method: "PATCH",
		body: JSON.stringify(status),
	})
}

export function updateOrderApproval(
	body: {
		approvalStatus: string
		approvedBy: string
	},
	orderId: string,
	signal?: AbortSignal
) {
	return apiFetch(`/orders/${ORG_ID}/${orderId}/approval`, {
		signal,
		method: "PATCH",
		body: JSON.stringify(body),
	})
}
