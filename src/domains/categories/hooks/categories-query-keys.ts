import type { QueryClient } from "@tanstack/react-query"

export const categoriesQueryKeys = {
	all: ["categories"] as const,
	lists: (organizationId: string | null | undefined) =>
		[...categoriesQueryKeys.all, "list", { organizationId }] as const,
	list: (organizationId: string | null | undefined) =>
		[...categoriesQueryKeys.lists(organizationId)] as const,
	details: (organizationId: string | null | undefined) =>
		[...categoriesQueryKeys.all, "one", { organizationId }] as const,
	one: (
		organizationId: string | null | undefined,
		catId: string | null | undefined
	) => [...categoriesQueryKeys.details(organizationId), { catId }] as const,
	mutations: {
		create: (organizationId: string | null | undefined) =>
			[
				...categoriesQueryKeys.all,
				"mutation",
				"create",
				{ organizationId },
			] as const,
		update: (organizationId: string | null | undefined) =>
			[
				...categoriesQueryKeys.all,
				"mutation",
				"update",
				{ organizationId },
			] as const,
		remove: (organizationId: string | null | undefined) =>
			[
				...categoriesQueryKeys.all,
				"mutation",
				"remove",
				{ organizationId },
			] as const,
	},
}

export function invalidateCategoriesCache(
	queryClient: QueryClient,
	organizationId: string | null | undefined,
	catId?: string
) {
	queryClient.invalidateQueries({
		queryKey: categoriesQueryKeys.lists(organizationId),
	})

	if (catId) {
		queryClient.invalidateQueries({
			queryKey: categoriesQueryKeys.one(organizationId, catId),
		})
	}
}
