export const productsQueryKeys = {
	all: ["products"] as const,
	list: (
		organizationId: string | null | undefined,
		categoryId?: string | null
	) =>
		[...productsQueryKeys.all, "list", { organizationId, categoryId }] as const,
}
