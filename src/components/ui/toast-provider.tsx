import { Toaster } from "sonner"

export function ToastProvider() {
	return (
		<Toaster
			closeButton
			duration={4000}
			position="top-right"
			richColors
			theme="light"
			toastOptions={{
				style: {
					background: "var(--color-surface)",
					border: "1px solid var(--color-border)",
				},
			}}
		/>
	)
}
