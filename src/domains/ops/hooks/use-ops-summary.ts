import { useQuery } from "@tanstack/react-query"
import { getOpsSummary } from "../api/ops-summary-api"
import { opsQueryKeys } from "./ops-query-keys"

export function useOpsSummary(organizationId: string | null) {
	return useQuery({
		queryKey: opsQueryKeys.summary(organizationId),
		enabled: Boolean(organizationId),
		queryFn: ({ signal }) => getOpsSummary(organizationId as string, signal),
	})
}
