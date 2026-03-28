import type { QueryClient } from "@tanstack/react-query"
import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { normalizeKdsQueueItem } from "@/domains/kds/api/kds-api"
import {
	invalidateKdsCache,
	kdsQueryKeys,
} from "@/domains/kds/hooks/kds-query-keys"
import type {
	KdsQueueItem,
	KdsQueueResult,
} from "@/domains/kds/types/kds.types"
import {
	invalidateOpsEventsCache,
	invalidateOpsSummaryCache,
} from "@/domains/ops/hooks/ops-query-keys"
import { invalidateOrdersCache } from "@/domains/orders/hooks/orders-query-keys"
import { OPS_REALTIME_DOMAIN_EVENT_NAMES } from "@/lib/realtime/ops-realtime.constants"
import type {
	OpsRealtimeDomain,
	OpsRealtimeDomainEventPayload,
} from "@/lib/realtime/ops-realtime.types"
import { opsRealtimeClient } from "@/lib/realtime/ops-realtime-client"
import { sentryCaptureException } from "@/lib/sentry"

interface UseOpsRealtimeQueryAdapterParams {
	organizationId: string | null
}

function getDomainFromEventName(eventName: string): OpsRealtimeDomain | null {
	if (eventName.startsWith("orders.")) {
		return "orders"
	}

	if (eventName.startsWith("kds.")) {
		return "kds"
	}

	if (eventName.startsWith("delivery.")) {
		return "delivery"
	}

	if (eventName.startsWith("ops.")) {
		return "ops"
	}

	return null
}

function shouldInvalidateKnownCaches(domain: OpsRealtimeDomain) {
	return (
		domain === "orders" ||
		domain === "kds" ||
		domain === "delivery" ||
		domain === "ops"
	)
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null
}

function patchKdsItemInQueue(
	current: KdsQueueResult | undefined,
	item: KdsQueueItem,
	stationId: string | null | undefined
) {
	if (!(current && stationId)) {
		return current
	}

	const existingIndex = current.items.findIndex(
		(queueItem) => queueItem.itemId === item.itemId
	)

	if (stationId !== item.stationId) {
		if (existingIndex === -1) {
			return current
		}

		const items = current.items.filter(
			(queueItem) => queueItem.itemId !== item.itemId
		)
		return {
			...current,
			items,
			pagination: {
				...current.pagination,
				total: Math.max(0, current.pagination.total - 1),
			},
		}
	}

	if (existingIndex === -1) {
		const items = [item, ...current.items]
		return {
			...current,
			items,
			pagination: {
				...current.pagination,
				total: current.pagination.total + 1,
			},
		}
	}

	const items = [...current.items]
	items[existingIndex] = {
		...items[existingIndex],
		...item,
	}

	return {
		...current,
		items,
	}
}

function forEachKdsQueueQuery(
	queryClient: QueryClient,
	organizationId: string,
	callback: (
		queryKey: readonly unknown[],
		params: { stationId?: string | null; limit?: number; offset?: number }
	) => void
) {
	const queries = queryClient.getQueryCache().findAll({
		queryKey: kdsQueryKeys.queues(organizationId),
	})

	for (const query of queries) {
		const queryKey = query.queryKey
		const params = queryKey[3] as
			| { stationId?: string | null; limit?: number; offset?: number }
			| undefined

		callback(queryKey, params ?? {})
	}
}

function applyKdsItemUpdatedEvent(
	queryClient: QueryClient,
	organizationId: string,
	payload: OpsRealtimeDomainEventPayload
) {
	if (!isRecord(payload.data)) {
		invalidateKdsCache(queryClient, organizationId)
		return
	}

	const item = normalizeKdsQueueItem({
		...payload.data,
		itemStatus: payload.data.status as KdsQueueItem["itemStatus"] | undefined,
		previousStatus: payload.data.previousStatus as
			| KdsQueueItem["previousStatus"]
			| undefined,
	})

	forEachKdsQueueQuery(queryClient, organizationId, (queryKey, params) => {
		queryClient.setQueryData(
			queryKey,
			(current: KdsQueueResult | undefined) => {
				return patchKdsItemInQueue(current, item, params.stationId)
			}
		)
	})
}

function applyKdsQueueSnapshotEvent(
	queryClient: QueryClient,
	organizationId: string,
	payload: OpsRealtimeDomainEventPayload
) {
	if (!(isRecord(payload.data) && Array.isArray(payload.data.items))) {
		invalidateKdsCache(queryClient, organizationId)
		return
	}

	const items = payload.data.items.map((queueItem) => {
		return normalizeKdsQueueItem(queueItem as Partial<KdsQueueItem>)
	})

	forEachKdsQueueQuery(queryClient, organizationId, (queryKey, params) => {
		queryClient.setQueryData(
			queryKey,
			(currentResult: KdsQueueResult | undefined) => {
				if (!currentResult) {
					return currentResult
				}

				const stationId = params.stationId
				if (!stationId) {
					return currentResult
				}

				const filteredItems = items.filter(
					(item) => item.stationId === stationId
				)
				const offset = params.offset ?? 0
				const limit = params.limit ?? currentResult.pagination.limit
				const pagedItems = filteredItems.slice(offset, offset + limit)

				return {
					...currentResult,
					items: pagedItems,
					pagination: {
						limit,
						offset,
						total: filteredItems.length,
					},
				}
			}
		)
	})
}

function reconcileKdsRealtimeEvent(
	queryClient: QueryClient,
	organizationId: string,
	eventName: string,
	payload: OpsRealtimeDomainEventPayload
) {
	if (eventName === "kds.item.updated") {
		applyKdsItemUpdatedEvent(queryClient, organizationId, payload)
		return true
	}

	if (eventName === "kds.queue.snapshot") {
		applyKdsQueueSnapshotEvent(queryClient, organizationId, payload)
		return true
	}

	return false
}

function invalidateCacheForDomain(
	queryClient: QueryClient,
	organizationId: string,
	domain: OpsRealtimeDomain,
	eventName: string,
	payload: OpsRealtimeDomainEventPayload
) {
	if (domain === "kds") {
		if (
			reconcileKdsRealtimeEvent(queryClient, organizationId, eventName, payload)
		) {
			return
		}

		invalidateKdsCache(queryClient, organizationId)
		return
	}

	invalidateOrdersCache(queryClient, organizationId, payload.orderId)

	if (domain === "ops") {
		invalidateOpsEventsCache(queryClient, organizationId)
		invalidateOpsSummaryCache(queryClient, organizationId)
	}
}

export function useOpsRealtimeQueryAdapter({
	organizationId,
}: UseOpsRealtimeQueryAdapterParams) {
	const queryClient = useQueryClient()

	useEffect(() => {
		if (!organizationId) {
			return
		}

		const unsubscribers = OPS_REALTIME_DOMAIN_EVENT_NAMES.map((eventName) =>
			opsRealtimeClient.addEventListener(eventName, (rawPayload: unknown) => {
				try {
					const payload = rawPayload as OpsRealtimeDomainEventPayload
					const eventDomain = getDomainFromEventName(eventName)
					const domain = payload.domain ?? eventDomain

					if (!(domain && shouldInvalidateKnownCaches(domain))) {
						return
					}

					if (
						typeof payload.organizationId === "string" &&
						payload.organizationId !== organizationId
					) {
						return
					}

					invalidateCacheForDomain(
						queryClient,
						organizationId,
						domain,
						eventName,
						payload
					)
				} catch (error) {
					sentryCaptureException(error, {
						context: "ops_realtime_query_adapter",
						eventName,
						organizationId,
					})
				}
			})
		)

		return () => {
			for (const unsubscribe of unsubscribers) {
				unsubscribe()
			}
		}
	}, [organizationId, queryClient])
}
