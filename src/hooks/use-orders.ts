import { ordersQueryKeys as domainOrdersQueryKeys } from "@/domains/orders/hooks/orders-query-keys"
import {
	useOrderStats as domainUseOrderStats,
	useOrders as domainUseOrders,
} from "@/domains/orders/hooks/use-orders"
import type { OrderFilter } from "@/domains/orders/types/order-query.types"

export const orderQueryKeys = {
	all: () => [...domainOrdersQueryKeys.all],
	getOrders: (filters?: OrderFilter, page?: number, count?: number) =>
		domainOrdersQueryKeys.list(null, filters, page, count),
	getOrderById: (orderId: string) =>
		domainOrdersQueryKeys.detail(null, orderId),
	getOrderStats: () => domainOrdersQueryKeys.stats(null),
}

export function useOrders(
	filters?: OrderFilter,
	page?: number,
	count?: number,
	organizationId?: string | null
) {
	return domainUseOrders({
		organizationId: organizationId ?? null,
		filters,
		page,
		count,
	})
}

export function useOrderStats(organizationId?: string | null) {
	return domainUseOrderStats(organizationId ?? null)
}
