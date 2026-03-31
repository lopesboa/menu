import { useQuery } from "@tanstack/react-query"
import { getOpsSummary } from "../api/ops-summary-api"
import { opsQueryKeys } from "./use-ops-query-keys"

interface UseOpsSummaryOptions {
	refetchInterval?: number | false
}

export function useOpsSummary(
	organizationId: string | null,
	options?: UseOpsSummaryOptions
) {
	return useQuery({
		queryKey: opsQueryKeys.summary(organizationId),
		enabled: Boolean(organizationId),
		refetchInterval: options?.refetchInterval,
		queryFn: ({ signal }) => getOpsSummary(organizationId as string, signal),
	})
}
