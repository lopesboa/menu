import type { QueryClient } from "@tanstack/react-query"
import type { OrderFilter } from "../types/order-query.types"

export const ordersQueryKeys = {
	all: ["orders"] as const,
	lists: (organizationId: string | null) =>
		[...ordersQueryKeys.all, "list", organizationId] as const,
	list: (
		organizationId: string | null,
		filters?: OrderFilter,
		page?: number,
		count?: number
	) =>
		[...ordersQueryKeys.lists(organizationId), filters, page, count] as const,
	details: (organizationId: string | null) =>
		[...ordersQueryKeys.all, "detail", organizationId] as const,
	detail: (organizationId: string | null, orderId: string) =>
		[...ordersQueryKeys.details(organizationId), orderId] as const,
	stats: (organizationId: string | null) =>
		[...ordersQueryKeys.all, "stats", organizationId] as const,
	mutations: {
		status: (organizationId: string | null) =>
			[...ordersQueryKeys.all, "mutation", "status", organizationId] as const,
		approval: (organizationId: string | null) =>
			[...ordersQueryKeys.all, "mutation", "approval", organizationId] as const,
	},
}

export function invalidateOrdersCache(
	queryClient: QueryClient,
	organizationId: string | null,
	orderId?: string
) {
	queryClient.invalidateQueries({
		queryKey: ordersQueryKeys.lists(organizationId),
	})

	if (orderId) {
		queryClient.invalidateQueries({
			queryKey: ordersQueryKeys.detail(organizationId, orderId),
		})
	}

	queryClient.invalidateQueries({
		queryKey: ordersQueryKeys.stats(organizationId),
	})
}
