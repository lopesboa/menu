export const inventoryQueryKeys = {
	all: ["inventory"] as const,
	lists: (organizationId: string | null | undefined) =>
		[...inventoryQueryKeys.all, "list", { organizationId }] as const,
	list: (organizationId: string | null | undefined) =>
		[...inventoryQueryKeys.lists(organizationId)] as const,
	lowStock: (organizationId: string | null | undefined) =>
		[...inventoryQueryKeys.all, "low-stock", { organizationId }] as const,
}
