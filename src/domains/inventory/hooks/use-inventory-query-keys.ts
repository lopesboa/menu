export const inventoryQueryKeys = {
	all: ["inventory"] as const,
	lists: (
		organizationId: string | null | undefined,
		params: {
			limit: number
			offset: number
			search?: string
			category?: string
			minStock?: number
			maxStock?: number
		}
	) =>
		[
			...inventoryQueryKeys.all,
			"list",
			{
				organizationId,
				limit: params.limit,
				offset: params.offset,
				search: params.search || null,
				category: params.category || null,
				minStock: params.minStock ?? null,
				maxStock: params.maxStock ?? null,
			},
		] as const,
	list: (
		organizationId: string | null | undefined,
		params: {
			limit: number
			offset: number
			search?: string
			category?: string
			minStock?: number
			maxStock?: number
		}
	) => [...inventoryQueryKeys.lists(organizationId, params)] as const,
	lowStock: (
		organizationId: string | null | undefined,
		params: {
			limit: number
			offset: number
			search?: string
			category?: string
			minStock?: number
			maxStock?: number
		}
	) =>
		[
			...inventoryQueryKeys.all,
			"low-stock",
			{
				organizationId,
				limit: params.limit,
				offset: params.offset,
				search: params.search || null,
				category: params.category || null,
				minStock: params.minStock ?? null,
				maxStock: params.maxStock ?? null,
			},
		] as const,
}
