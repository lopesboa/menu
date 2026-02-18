import { useQuery } from "@tanstack/react-query"
import { getOrderStats, getOrders } from "@/services/orders-service"
import type { OrderFilter } from "@/types/orders"

const queryKeys = {
	all: () => ["orders"],
	getOrders: (filters?: OrderFilter, page?: number, count?: number) => [
		...queryKeys.all(),
		"list",
		{ filters },
		{ page },
		{ count },
	],
	getOrderById: (orderId: string) => [...queryKeys.all(), "one", { orderId }],
	getOrderStats: () => [...queryKeys.all(), "stats"],
}

export function useOrders(
	filters?: OrderFilter,
	page?: number,
	count?: number
) {
	return useQuery({
		queryKey: queryKeys.getOrders(filters, page, count),
		queryFn: ({ signal }) => getOrders(filters, page, count, signal),
	})
}

export function useOrderStats() {
	return useQuery({
		queryKey: queryKeys.getOrderStats(),
		queryFn: ({ signal }) => getOrderStats(signal),
	})
}
