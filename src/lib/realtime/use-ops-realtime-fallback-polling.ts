import { useMemo, useSyncExternalStore } from "react"
import type {
	OpsRealtimeConnectionStatus,
	OpsRealtimeDomain,
} from "./ops-realtime.types"
import { opsRealtimeClient } from "./ops-realtime-client"

export const OPS_REALTIME_FALLBACK_POLLING_INTERVAL_BY_DOMAIN: Record<
	OpsRealtimeDomain,
	number
> = {
	orders: 8000,
	kds: 5000,
	delivery: 10_000,
	ops: 12_000,
}

function shouldUseFallbackPolling(
	status: OpsRealtimeConnectionStatus,
	lastDisconnectedAt: number | null
) {
	if (status === "disconnected" || status === "degraded") {
		return true
	}

	return status === "connecting" && lastDisconnectedAt !== null
}

function useOpsRealtimeHealthState() {
	return useSyncExternalStore(
		(listener) => opsRealtimeClient.subscribe(listener),
		() => opsRealtimeClient.getHealthState(),
		() => opsRealtimeClient.getHealthState()
	)
}

export function useOpsRealtimeFallbackPolling(domain: OpsRealtimeDomain) {
	const healthState = useOpsRealtimeHealthState()

	return useMemo(() => {
		if (
			!shouldUseFallbackPolling(
				healthState.status,
				healthState.lastDisconnectedAt
			)
		) {
			return false
		}

		return OPS_REALTIME_FALLBACK_POLLING_INTERVAL_BY_DOMAIN[domain]
	}, [domain, healthState.lastDisconnectedAt, healthState.status])
}
