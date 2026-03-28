import type { QueryClient } from "@tanstack/react-query"

export const kdsQueryKeys = {
	all: ["kds"] as const,
	stations: (organizationId: string | null) =>
		[...kdsQueryKeys.all, "stations", organizationId] as const,
	queues: (organizationId: string | null) =>
		[...kdsQueryKeys.all, "queue", organizationId] as const,
	queue: (
		organizationId: string | null,
		stationId: string | null,
		limit: number,
		offset: number
	) =>
		[
			...kdsQueryKeys.queues(organizationId),
			{ stationId, limit, offset },
		] as const,
}

export function invalidateKdsCache(
	queryClient: QueryClient,
	organizationId: string | null,
	stationId?: string | null
) {
	queryClient.invalidateQueries({
		queryKey: kdsQueryKeys.stations(organizationId),
	})

	if (stationId) {
		queryClient.invalidateQueries({
			queryKey: kdsQueryKeys.queue(organizationId, stationId, 50, 0),
			exact: false,
		})
	}

	queryClient.invalidateQueries({
		queryKey: kdsQueryKeys.queues(organizationId),
	})
}
