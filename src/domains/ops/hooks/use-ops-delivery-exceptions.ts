import { useQuery } from "@tanstack/react-query"
import { getDeliveryExceptions } from "../api/ops-delivery-api"
import type { OpsDeliveryExceptionsResult } from "../types/ops-delivery-types"
import { opsQueryKeys } from "./use-ops-query-keys"

interface UseOpsDeliveryExceptionsParams {
	organizationId: string | null
	status?: string
	source?: string
	from?: string
	to?: string
	limit?: number
	offset?: number
	refetchInterval?: number | false
}

export function useOpsDeliveryExceptions({
	organizationId,
	status,
	source,
	from,
	to,
	limit = 10,
	offset = 0,
	refetchInterval,
}: UseOpsDeliveryExceptionsParams) {
	return useQuery<OpsDeliveryExceptionsResult>({
		queryKey: opsQueryKeys.deliveryExceptions(
			organizationId,
			limit,
			offset,
			status,
			source,
			from,
			to
		),
		enabled: Boolean(organizationId),
		refetchInterval,
		queryFn: ({ signal }) =>
			getDeliveryExceptions(organizationId as string, {
				status,
				source,
				from,
				to,
				limit,
				offset,
				signal,
			}),
	})
}
