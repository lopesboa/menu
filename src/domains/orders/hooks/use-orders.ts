import { useQuery } from "@tanstack/react-query"
import { getOrderStats, getOrders } from "../api/orders-api"
import type { OrderFilter } from "../types/order-query.types"
import { ordersQueryKeys } from "./orders-query-keys"

interface UseOrdersParams {
	organizationId: string | null
	filters?: OrderFilter
	page?: number
	count?: number
}

export function useOrders({
	organizationId,
	filters,
	page,
	count,
}: UseOrdersParams) {
	return useQuery({
		queryKey: ordersQueryKeys.list(organizationId, filters, page, count),
		enabled: Boolean(organizationId),
		queryFn: ({ signal }) =>
			getOrders({
				organizationId: organizationId as string,
				filters,
				page,
				count,
				signal,
			}),
	})
}

export function useOrderStats(organizationId: string | null) {
	return useQuery({
		queryKey: ordersQueryKeys.stats(organizationId),
		enabled: Boolean(organizationId),
		queryFn: ({ signal }) => getOrderStats(organizationId as string, signal),
	})
}
