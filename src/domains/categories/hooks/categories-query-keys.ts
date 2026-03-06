export const categoriesQueryKeys = {
	all: ["categories"] as const,
	list: (organizationId: string | null | undefined) =>
		[...categoriesQueryKeys.all, "list", { organizationId }] as const,
	one: (
		organizationId: string | null | undefined,
		catId: string | null | undefined
	) =>
		[...categoriesQueryKeys.all, "one", { organizationId }, { catId }] as const,
}
