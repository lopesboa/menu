import { useQuery } from "@tanstack/react-query"
import { getOrderStats, getOrders } from "@/services/orders-service"
import type { OrderFilter } from "@/types/orders"

export const orderQueryKeys = {
	all: () => ["orders"],
	getOrders: (filters?: OrderFilter, page?: number, count?: number) => [
		...orderQueryKeys.all(),
		"list",
		{ filters },
		{ page },
		{ count },
	],
	getOrderById: (orderId: string) => [
		...orderQueryKeys.all(),
		"one",
		{ orderId },
	],
	getOrderStats: () => [...orderQueryKeys.all(), "stats"],
}

export function useOrders(
	filters?: OrderFilter,
	page?: number,
	count?: number
) {
	return useQuery({
		queryKey: orderQueryKeys.getOrders(filters, page, count),
		queryFn: ({ signal }) => getOrders(filters, page, count, signal),
	})
}

export function useOrderStats() {
	return useQuery({
		queryKey: orderQueryKeys.getOrderStats(),
		queryFn: ({ signal }) => getOrderStats(signal),
	})
}
