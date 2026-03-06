import {
	createOrder as domainCreateOrder,
	getOrderByOrderId as domainGetOrderByOrderId,
	getOrderStats as domainGetOrderStats,
	getOrders as domainGetOrders,
	updateOrderApproval as domainUpdateOrderApproval,
	updateOrderStatus as domainUpdateOrderStatus,
} from "@/domains/orders/api/orders-api"
import type { OrderStatus } from "@/domains/orders/types/order.types"
import type { OrderFilter } from "@/domains/orders/types/order-query.types"

const ORG_ID = "ddf490e6-c0f1-4f36-a19b-e6443bd1b7cd"

export function getOrders(
	filters?: OrderFilter,
	page = 0,
	count = 20,
	signal?: AbortSignal
) {
	return domainGetOrders({
		organizationId: ORG_ID,
		filters,
		page,
		count,
		signal,
	})
}

export function getOrderStats(signal?: AbortSignal) {
	return domainGetOrderStats(ORG_ID, signal)
}

export function getOrderByOrderId(orderId: string, signal?: AbortSignal) {
	return domainGetOrderByOrderId(ORG_ID, orderId, signal)
}

export function createOrder(data: unknown, signal?: AbortSignal) {
	return domainCreateOrder(data, signal)
}

export function updateOrderStatus(
	status: OrderStatus,
	orderId: string,
	signal?: AbortSignal
) {
	return domainUpdateOrderStatus(ORG_ID, status, orderId, signal)
}

export function updateOrderApproval(
	body: {
		approvalStatus: string
		approvedBy: string
	},
	orderId: string,
	signal?: AbortSignal
) {
	return domainUpdateOrderApproval(ORG_ID, body, orderId, signal)
}
