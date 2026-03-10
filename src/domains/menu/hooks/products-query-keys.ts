import type { QueryClient } from "@tanstack/react-query"

export const productsQueryKeys = {
	all: ["products"] as const,
	lists: (organizationId: string | null | undefined) =>
		[...productsQueryKeys.all, "list", { organizationId }] as const,
	list: (
		organizationId: string | null | undefined,
		categoryId?: string | null
	) => [...productsQueryKeys.lists(organizationId), { categoryId }] as const,
	details: (organizationId: string | null | undefined) =>
		[...productsQueryKeys.all, "one", { organizationId }] as const,
	one: (
		organizationId: string | null | undefined,
		productId: string | null | undefined
	) => [...productsQueryKeys.details(organizationId), { productId }] as const,
	mutations: {
		create: (organizationId: string | null | undefined) =>
			[
				...productsQueryKeys.all,
				"mutation",
				"create",
				{ organizationId },
			] as const,
		update: (organizationId: string | null | undefined) =>
			[
				...productsQueryKeys.all,
				"mutation",
				"update",
				{ organizationId },
			] as const,
		remove: (organizationId: string | null | undefined) =>
			[
				...productsQueryKeys.all,
				"mutation",
				"remove",
				{ organizationId },
			] as const,
	},
}

export function invalidateProductsCache(
	queryClient: QueryClient,
	organizationId: string | null | undefined,
	productId?: string
) {
	queryClient.invalidateQueries({
		queryKey: productsQueryKeys.lists(organizationId),
	})

	if (productId) {
		queryClient.invalidateQueries({
			queryKey: productsQueryKeys.one(organizationId, productId),
		})
	}
}
