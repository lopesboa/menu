import { useEffect } from "react"
import { OPS_REALTIME_DOMAINS } from "@/lib/realtime/ops-realtime.constants"
import type { OpsRealtimeDomain } from "@/lib/realtime/ops-realtime.types"
import { opsRealtimeClient } from "@/lib/realtime/ops-realtime-client"
import { useOpsRealtimeHealth } from "./use-ops-realtime-health"

interface UseOpsRealtimeSessionParams {
	enabled: boolean
	organizationId: string | null
	domains?: readonly OpsRealtimeDomain[]
}

export function useOpsRealtimeSession({
	enabled,
	organizationId,
	domains = OPS_REALTIME_DOMAINS,
}: UseOpsRealtimeSessionParams) {
	const healthState = useOpsRealtimeHealth()

	useEffect(() => {
		if (!(enabled && organizationId)) {
			return
		}

		opsRealtimeClient.startSession(organizationId)
		for (const domain of domains) {
			opsRealtimeClient.subscribeDomain(domain)
		}

		return () => {
			for (const domain of domains) {
				opsRealtimeClient.unsubscribeDomain(domain)
			}

			opsRealtimeClient.stopSession()
		}
	}, [domains, enabled, organizationId])

	return {
		healthState,
		refreshDomain: (domain: OpsRealtimeDomain) => {
			opsRealtimeClient.refreshDomain(domain)
		},
		subscribeDomain: (domain: OpsRealtimeDomain) => {
			opsRealtimeClient.subscribeDomain(domain)
		},
		unsubscribeDomain: (domain: OpsRealtimeDomain) => {
			opsRealtimeClient.unsubscribeDomain(domain)
		},
	}
}
