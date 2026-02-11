import type { PostHogConfig } from "posthog-js"

import { PostHogProvider } from "posthog-js/react"
import type { PropsWithChildren } from "react"

const options: Partial<PostHogConfig> = {
	api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
	defaults: "2025-11-30",
} as const

export function PostHogClientProvider({ children }: PropsWithChildren) {
	if (import.meta.env.PROD) {
		return (
			<PostHogProvider
				apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
				options={options}
			>
				{children}
			</PostHogProvider>
		)
	}

	return children
}
