import { Icon } from "@iconify-icon/react"
import { Link } from "react-router"
export function AuthHeader() {
	return (
		<Link
			data-slot="auth-header"
			to="/"
			aria-label="Navegar para o inicio"
			className="flex items-center justify-center gap-2 group mb-10"
		>
			<div className="w-6 h-6 rounded bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white">
				<Icon icon="solar:hamburger-menu-bold-duotone" width="14" />
			</div>
			<span className="font-medium tracking-tight text-sm text-slate-200 group-hover:text-white transition-colors">
				Menu Bão
			</span>
		</Link>
	)
}
