export const productsQueryKeys = {
	all: ["products"] as const,
	lists: (organizationId: string | null | undefined) =>
		[...productsQueryKeys.all, "list", { organizationId }] as const,
	list: (
		organizationId: string | null | undefined,
		categoryId?: string | null
	) => [...productsQueryKeys.lists(organizationId), { categoryId }] as const,
}
