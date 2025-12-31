import { Icon } from "@iconify-icon/react"

type NavebarProps = {
	signUp: () => void
	signIn: () => void
}

export function Navbar({ signIn, signUp }: NavebarProps) {
	return (
		<nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
			<div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
				<a href="/" className="flex items-center gap-2 group">
					<div className="w-6 h-6 rounded bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white">
						<Icon icon="solar:hamburger-menu-bold-duotone" width="14" />
					</div>
					<span className="font-medium tracking-tight text-sm text-slate-200 group-hover:text-white transition-colors">
						Menu Bão
					</span>
				</a>
				<div className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-400">
					<a href="#features" className="hover:text-white transition-colors">
						Funcionalidades
					</a>
					<a
						href="#integrations"
						className="hover:text-white transition-colors"
					>
						Integrações
					</a>
					<a href="#pricing" className="hover:text-white transition-colors">
						Preços
					</a>
				</div>
				<div className="flex items-center gap-3">
					<button
						type="button"
						onClick={signIn}
						className="text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
					>
						Entrar
					</button>
					<button
						type="button"
						onClick={signUp}
						className="cursor-pointer relative px-3 py-1.5 rounded-full bg-white/10 text-xs font-medium text-white hover:bg-white/15 transition-all overflow-hidden group"
					>
						<span className="relative z-10">Criar Conta</span>
						<div className="border-beam opacity-0 group-hover:opacity-100 transition-opacity"></div>
					</button>
				</div>
			</div>
		</nav>
	)
}
