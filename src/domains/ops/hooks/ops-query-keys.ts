import type { QueryClient } from "@tanstack/react-query"

export const opsQueryKeys = {
	all: ["ops"] as const,
	summary: (organizationId: string | null) =>
		[...opsQueryKeys.all, "summary", organizationId] as const,
	inbox: (
		organizationId: string | null,
		limit: number,
		offset: number,
		search?: string,
		status?: string,
		channel?: string
	) =>
		[
			...opsQueryKeys.all,
			"inbox",
			{ organizationId, limit, offset, search, status, channel },
		] as const,
	dlq: (
		organizationId: string | null,
		limit: number,
		offset: number,
		search?: string,
		status?: string,
		channel?: string
	) =>
		[
			...opsQueryKeys.all,
			"dlq",
			{ organizationId, limit, offset, search, status, channel },
		] as const,
}

export function invalidateOpsSummaryCache(
	queryClient: QueryClient,
	organizationId: string | null
) {
	queryClient.invalidateQueries({
		queryKey: opsQueryKeys.summary(organizationId),
	})
}

export function invalidateOpsEventsCache(
	queryClient: QueryClient,
	organizationId: string | null
) {
	queryClient.invalidateQueries({
		predicate: (query) => {
			const [scope, key, params] = query.queryKey as [
				string,
				string,
				{ organizationId?: string | null } | undefined,
			]

			if (scope !== "ops") {
				return false
			}

			if (!(key === "inbox" || key === "dlq")) {
				return false
			}

			return params?.organizationId === organizationId
		},
	})
}
