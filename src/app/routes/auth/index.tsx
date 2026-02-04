import "./styles.css"
import { Outlet } from "react-router"

export default function AuthLayout() {
	return (
		<div
			className="relative flex min-h-screen items-center justify-center font-sans antialiased selection:bg-neutral-800 selection:text-white"
			data-slot="auth-layout"
		>
			<div
				className="relative z-10 w-full max-w-md p-6 sm:p-8"
				data-slot="auth-layout-container"
			>
				<Outlet />
			</div>
		</div>
	)
}
