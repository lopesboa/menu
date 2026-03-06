export const customersQueryKeys = {
	all: ["customers"] as const,
	lists: (organizationId: string | null | undefined) =>
		[...customersQueryKeys.all, "list", { organizationId }] as const,
	list: (organizationId: string | null | undefined) =>
		[...customersQueryKeys.lists(organizationId)] as const,
}
