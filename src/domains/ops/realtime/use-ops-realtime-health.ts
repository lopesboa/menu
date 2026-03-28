import { useSyncExternalStore } from "react"
import { opsRealtimeClient } from "@/lib/realtime/ops-realtime-client"

export function useOpsRealtimeHealth() {
	return useSyncExternalStore(
		(listener) => opsRealtimeClient.subscribe(listener),
		() => opsRealtimeClient.getHealthState(),
		() => opsRealtimeClient.getHealthState()
	)
}
