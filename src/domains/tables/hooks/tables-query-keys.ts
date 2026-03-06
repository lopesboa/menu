export const tablesQueryKeys = {
	all: ["tables"] as const,
	lists: (organizationId: string | null) =>
		[...tablesQueryKeys.all, "list", organizationId] as const,
	list: (organizationId: string | null) =>
		[...tablesQueryKeys.lists(organizationId)] as const,
}
