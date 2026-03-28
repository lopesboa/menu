import { useQuery } from "@tanstack/react-query"
import { getKdsQueue, getKdsStations } from "../api/kds-api"
import { kdsQueryKeys } from "./kds-query-keys"

interface UseKdsStationsParams {
	organizationId: string | null
}

interface UseKdsQueueParams {
	organizationId: string | null
	stationId: string | null
	limit?: number
	offset?: number
	refetchInterval?: number | false
}

export function useKdsStations({ organizationId }: UseKdsStationsParams) {
	return useQuery({
		queryKey: kdsQueryKeys.stations(organizationId),
		enabled: Boolean(organizationId),
		queryFn: ({ signal }) => getKdsStations(organizationId as string, signal),
	})
}

export function useKdsQueue({
	organizationId,
	stationId,
	limit = 50,
	offset = 0,
	refetchInterval,
}: UseKdsQueueParams) {
	return useQuery({
		queryKey: kdsQueryKeys.queue(organizationId, stationId, limit, offset),
		enabled: Boolean(organizationId && stationId),
		refetchInterval,
		queryFn: ({ signal }) =>
			getKdsQueue({
				organizationId: organizationId as string,
				stationId: stationId as string,
				limit,
				offset,
				signal,
			}),
	})
}
