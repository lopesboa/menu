import type { PostHogConfig } from "posthog-js"
import { PostHogProvider } from "posthog-js/react"
import { RouterProvider } from "react-router"
import { router } from "./app/routes"

const options: Partial<PostHogConfig> = {
	api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
	defaults: "2025-11-30",
} as const

function App() {
	return (
		<PostHogProvider
			apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
			options={options}
		>
			<RouterProvider router={router} />
		</PostHogProvider>
	)
}

export default App
