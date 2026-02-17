import {
	addBreadcrumb,
	captureException,
	captureMessage,
	init,
	replayIntegration,
	setUser,
} from "@sentry/react"

init({
	dsn: import.meta.env.VITE_PUBLIC_SENTRY_DSN,
	environment: import.meta.env.MODE ?? "development",
	tracesSampleRate: 1.0,
	replaysOnErrorSampleRate: 1.0,
	replaysSessionSampleRate: 0.1,
	integrations: [
		replayIntegration({
			maskAllText: true,
			blockAllMedia: true,
		}),
	],
})

export const sentryCaptureException = (
	error: unknown,
	context?: Record<string, unknown>
) => {
	if (error instanceof Error) {
		captureException(error, { extra: context })
	} else {
		captureMessage(String(error), "error")
	}
}

export const sentrySetUser = (user: { id: string } | null) => {
	if (user) {
		setUser({ id: user.id })
	} else {
		setUser(null)
	}
}

export const sentryAddBreadcrumb = (
	category: string,
	message: string,
	data?: Record<string, unknown>
) => {
	addBreadcrumb({
		category,
		message,
		data,
		level: "info",
	})
}
