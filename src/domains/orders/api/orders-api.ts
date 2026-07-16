import { apiFetch } from "@/utils/fetch"
import type { Order, OrderStatus, OrderType } from "../types/order.types"
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

type QueueOrderRaw = Partial<Order> & {
	orderType?: string
	channel?: string
	stage?: string
	subTotal?: number
	delayed?: boolean
}

const ORDER_TYPES = new Set<OrderType>(["dine_in", "takeaway", "delivery"])
const ORDER_STATUSES = new Set<OrderStatus>([
	"pending",
	"confirmed",
	"preparing",
	"ready",
	"delivered",
	"cancelled",
	"rejected",
])

function normalizeOrderType(type: string | undefined): OrderType {
	if (type && ORDER_TYPES.has(type as OrderType)) {
		return type as OrderType
	}

	return "takeaway"
}

function normalizeOrderStatus(status: string | undefined): OrderStatus {
	if (status && ORDER_STATUSES.has(status as OrderStatus)) {
		return status as OrderStatus
	}

	return "unknown"
}

function normalizeOrder(rawOrder: QueueOrderRaw): Order {
	const normalizedType = normalizeOrderType(
		rawOrder.type ?? rawOrder.orderType ?? rawOrder.channel
	)
	const normalizedStatus = normalizeOrderStatus(
		rawOrder.status ?? rawOrder.stage
	)

	return {
		id: rawOrder.id ?? "",
		organizationId: rawOrder.organizationId ?? "",
		tableId: rawOrder.tableId,
		customerId: rawOrder.customerId,
		staffId: rawOrder.staffId,
		orderItems: rawOrder.orderItems ?? [],
		type: normalizedType,
		channel: rawOrder.channel ?? normalizedType,
		status: normalizedStatus,
		stage: rawOrder.stage ?? normalizedStatus,
		delayed: Boolean(rawOrder.delayed),
		approvalStatus: rawOrder.approvalStatus,
		approvedBy: rawOrder.approvedBy,
		approvalNotes: rawOrder.approvalNotes,
		subtotal: Number(rawOrder.subtotal ?? rawOrder.subTotal ?? 0),
		tax: Number(rawOrder.tax ?? 0),
		discount: Number(rawOrder.discount ?? 0),
		total: Number(rawOrder.total ?? 0),
		paymentMethod: rawOrder.paymentMethod,
		paymentStatus: rawOrder.paymentStatus ?? "pending",
		splitBill: rawOrder.splitBill,
		createdAt: new Date(rawOrder.createdAt ?? new Date()),
		updatedAt: new Date(rawOrder.updatedAt ?? new Date()),
		customerName: rawOrder.customerName,
		notes: rawOrder.notes,
		orderNumber: rawOrder.orderNumber ?? 0,
		itemsCount: rawOrder.itemsCount,
	}
}

export function getOrders({
	organizationId,
	filters,
	page = 0,
	count = 20,
	signal,
}: OrdersRequest) {
	const params = new URLSearchParams()
	const channel = filters?.channel ?? filters?.orderType
	const stage = filters?.stage ?? filters?.status

	if (channel) {
		params.append("channel", channel)
	}
	if (stage) {
		params.append("stage", stage)
	}
	if (typeof filters?.delayed === "boolean") {
		params.append("delayed", String(filters.delayed))
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
	const endpoint = `/queue/${organizationId}${queryString ? `?${queryString}` : ""}`

	return apiFetch<QueueOrderRaw[]>(endpoint, { signal }).then((orders) =>
		orders.map((order) => normalizeOrder(order))
	)
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
