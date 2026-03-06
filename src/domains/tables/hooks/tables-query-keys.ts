export const tablesQueryKeys = {
	all: ["tables"] as const,
	list: (organizationId: string | null) =>
		[...tablesQueryKeys.all, "list", organizationId] as const,
}
