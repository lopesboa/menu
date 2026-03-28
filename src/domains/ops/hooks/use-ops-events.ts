import { useQuery } from "@tanstack/react-query"
import { getDeadLetterEvents, getInboxEvents } from "../api/ops-events-api"
import type {
	OpsDeadLetterEventsResult,
	OpsInboxEventsResult,
} from "../types/ops-events.types"
import { opsQueryKeys } from "./ops-query-keys"

interface UseOpsEventsParams {
	organizationId: string | null
	limit?: number
	offset?: number
	search?: string
	status?: string
	channel?: string
	refetchInterval?: number | false
}

export function useInboxEvents({
	organizationId,
	limit = 10,
	offset = 0,
	search,
	status,
	channel,
	refetchInterval,
}: UseOpsEventsParams) {
	return useQuery<OpsInboxEventsResult>({
		queryKey: opsQueryKeys.inbox(
			organizationId,
			limit,
			offset,
			search,
			status,
			channel
		),
		enabled: Boolean(organizationId),
		refetchInterval,
		queryFn: ({ signal }) =>
			getInboxEvents(organizationId as string, {
				limit,
				offset,
				search,
				status,
				channel,
				signal,
			}),
	})
}

export function useDeadLetterEvents({
	organizationId,
	limit = 10,
	offset = 0,
	search,
	status,
	channel,
	refetchInterval,
}: UseOpsEventsParams) {
	return useQuery<OpsDeadLetterEventsResult>({
		queryKey: opsQueryKeys.dlq(
			organizationId,
			limit,
			offset,
			search,
			status,
			channel
		),
		enabled: Boolean(organizationId),
		refetchInterval,
		queryFn: ({ signal }) =>
			getDeadLetterEvents(organizationId as string, {
				limit,
				offset,
				search,
				status,
				channel,
				signal,
			}),
	})
}
