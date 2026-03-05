import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { RouterProvider } from "react-router"
import { router } from "./app/routes"
import { ToastProvider } from "./components/ui/toast-provider"
import { PostHogClientProvider } from "./providers/posthog"

const queryClient = new QueryClient()

function App() {
	return (
		<PostHogClientProvider>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
				<ReactQueryDevtools initialIsOpen={false} />
				<ToastProvider />
			</QueryClientProvider>
		</PostHogClientProvider>
	)
}

export default App
