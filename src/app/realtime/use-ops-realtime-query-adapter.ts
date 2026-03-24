import { useQueryClient } from "@tanstack/react-query"
import { useEffect } from "react"
import { invalidateOpsSummaryCache } from "@/domains/ops/hooks/ops-query-keys"
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

function shouldInvalidateOrdersCache(domain: OpsRealtimeDomain) {
	return (
		domain === "orders" ||
		domain === "kds" ||
		domain === "delivery" ||
		domain === "ops"
	)
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

					if (!(domain && shouldInvalidateOrdersCache(domain))) {
						return
					}

					if (
						typeof payload.organizationId === "string" &&
						payload.organizationId !== organizationId
					) {
						return
					}

					invalidateOrdersCache(queryClient, organizationId, payload.orderId)

					if (domain === "ops") {
						invalidateOpsSummaryCache(queryClient, organizationId)
					}
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
