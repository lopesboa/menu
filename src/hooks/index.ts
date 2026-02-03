import type { CaptureOptions, EventName, Properties } from "posthog-js"
import { usePostHog } from "posthog-js/react"

export function usePostHogEvent() {
	const posthog = usePostHog()

	const capture = (
		event_name: EventName,
		properties?: Properties | null,
		options?: CaptureOptions
	) => {
		posthog.capture(event_name, properties, options)
	}

	return {
		capture,
	}
}
