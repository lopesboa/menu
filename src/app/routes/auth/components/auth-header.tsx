import { Icon } from "@iconify-icon/react"
import { Link } from "react-router"
export function AuthHeader() {
	return (
		<Link
			aria-label="Navegar para o inicio"
			className="group mb-10 flex items-center justify-center gap-2"
			data-slot="auth-header"
			to="/"
		>
			<div className="flex h-6 w-6 items-center justify-center rounded bg-linear-to-tr from-indigo-500 to-purple-500 text-white">
				<Icon icon="solar:hamburger-menu-bold-duotone" width="14" />
			</div>
			<span className="font-medium text-slate-200 text-sm tracking-tight transition-colors group-hover:text-white">
				Menu Bão
			</span>
		</Link>
	)
}
