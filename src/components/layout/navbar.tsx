import { Icon } from "@iconify-icon/react"
import { Link, useLocation } from "react-router"
import { authRoutePaths } from "@/app/routes/auth/manifest"
import { usePostHogEvent } from "@/hooks/use-posthog"
import { AnalyticsEvents } from "@/lib/analytics/events"
import {
	buildLandingEventProperties,
	rememberLandingRegisterIntent,
} from "@/lib/analytics/landing"

export function Navbar() {
	const location = useLocation()
	const { capture } = usePostHogEvent()

	const handleLandingRegisterClick = () => {
		if (location.pathname !== "/") {
			return
		}

		const properties = buildLandingEventProperties({
			cta_label: "Criar conta grátis",
			cta_position: "navbar_primary",
		})

		capture(AnalyticsEvents.CTA_CLICKED, properties)
		capture(AnalyticsEvents.REGISTER_STARTED, properties)
		rememberLandingRegisterIntent(properties)
	}

	return (
		<nav className="fixed top-0 z-50 w-full border-white/5 border-b bg-black/50 backdrop-blur-xl">
			<div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
				<header>
					<Link
						aria-label="Navegar para o inicio"
						className="group flex items-center gap-2"
						to="/"
					>
						<div className="flex h-6 w-6 items-center justify-center rounded bg-linear-to-tr from-indigo-500 to-purple-500 text-white">
							<Icon icon="solar:hamburger-menu-bold-duotone" width="14" />
						</div>
						<span className="font-medium text-slate-200 text-sm tracking-tight transition-colors group-hover:text-white">
							Menu Bão
						</span>
					</Link>
				</header>
				<div className="hidden items-center gap-6 font-medium text-slate-400 text-xs md:flex">
					<a
						aria-label="Navegar para Funcionalidades"
						className="transition-colors hover:text-white"
						href="#features"
					>
						Funcionalidades
					</a>
					<a
						aria-label="Navegar para Integrações"
						className="transition-colors hover:text-white"
						href="#integrations"
					>
						Integrações
					</a>
					<a
						aria-label="Navegar para Preços"
						className="transition-colors hover:text-white"
						href="#pricing"
					>
						Preços
					</a>
				</div>
				<div className="flex items-center gap-3">
					<Link
						aria-label="Navegar para entrar"
						className="cursor-pointer font-medium text-slate-400 text-xs transition-colors hover:text-white"
						to={authRoutePaths.login}
					>
						Entrar
					</Link>
					<Link
						aria-label="Navegar para criar conta"
						className="group relative cursor-pointer overflow-hidden rounded-full bg-white/10 px-3 py-1.5 font-medium text-white text-xs transition-all hover:bg-white/15"
						onClick={handleLandingRegisterClick}
						to={authRoutePaths.register}
					>
						<span className="relative z-10">Criar conta grátis</span>
						<div className="border-beam opacity-0 transition-opacity group-hover:opacity-100" />
					</Link>
				</div>
			</div>
		</nav>
	)
}
