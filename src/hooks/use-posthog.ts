import type { CaptureOptions, EventName, Properties } from "posthog-js"
import { usePostHog } from "posthog-js/react"

export function usePostHogEvent() {
	const posthog = usePostHog()

	const capture = (
		eventName: EventName,
		properties?: Properties | null,
		options?: CaptureOptions
	) => {
		posthog.capture(eventName, properties, options)
	}

	const identify = (userId: string, userProperties?: Properties) => {
		posthog.identify(userId, userProperties)
	}

	const reset = () => {
		posthog.reset()
	}

	return {
		capture,
		identify,
		reset,
	}
}
