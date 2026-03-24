import type { QueryClient } from "@tanstack/react-query"

export const opsQueryKeys = {
	all: ["ops"] as const,
	summary: (organizationId: string | null) =>
		[...opsQueryKeys.all, "summary", organizationId] as const,
}

export function invalidateOpsSummaryCache(
	queryClient: QueryClient,
	organizationId: string | null
) {
	queryClient.invalidateQueries({
		queryKey: opsQueryKeys.summary(organizationId),
	})
}
