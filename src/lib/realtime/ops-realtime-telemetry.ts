import posthog from "posthog-js"
import { sentryCaptureException } from "@/lib/sentry"

export const OpsRealtimeTelemetryEvents = {
	connectionStateChanged: "ops_realtime_connection_state_changed",
	domainRefreshRequested: "ops_realtime_domain_refresh_requested",
	orderStatusFallbackToRest: "ops_realtime_order_status_fallback_to_rest",
	orderStatusNoop: "ops_realtime_order_status_noop",
} as const

type OpsRealtimeTelemetryPayload = Record<
	string,
	string | number | boolean | null
>

export function captureOpsRealtimeTelemetry(
	eventName: string,
	payload?: OpsRealtimeTelemetryPayload
) {
	try {
		posthog.capture(eventName, payload)
	} catch (error) {
		sentryCaptureException(error, {
			context: "ops_realtime_telemetry_capture",
			eventName,
		})
	}
}
