import "./styles.css"
import { Outlet } from "react-router"
import { AuthHeader } from "./components/auth-header"

export default function AuthLayout() {
	return (
		<div
			data-slot="auth-layout"
			className="min-h-screen flex items-center justify-center relative font-sans antialiased selection:bg-neutral-800 selection:text-white"
		>
			<div
				data-slot="auth-layout-container"
				className="relative z-10 w-full max-w-md p-6 sm:p-8"
			>
				<AuthHeader />
				<Outlet />
			</div>
		</div>
	)
}
