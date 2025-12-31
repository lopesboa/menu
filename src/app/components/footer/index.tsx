import { Icon } from "@iconify-icon/react"

export function Footer() {
	return (
		<footer className="py-12 border-t border-white/5 bg-black">
			<div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
				<div className="flex items-center gap-2">
					<div className="w-5 h-5 rounded bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white">
						<Icon icon="solar:hamburger-menu-bold-duotone" width="12" />
					</div>
					<span className="font-medium tracking-tight text-sm text-slate-200">
						Menu Bão
					</span>
				</div>
				<div className="text-slate-500 text-xs">
					© 2024 Menu Bão Ltda. Todos os direitos reservados.
				</div>
				<div className="flex gap-4">
					<a
						href="/"
						className="text-slate-500 hover:text-white transition-colors"
					>
						<Icon icon="brandico:twitter-bird" />
					</a>
					<a
						href="/"
						className="text-slate-500 hover:text-white transition-colors"
					>
						<Icon icon="brandico:instagram" />
					</a>
					<a
						href="/"
						className="text-slate-500 hover:text-white transition-colors"
					>
						<Icon icon="brandico:github" />
					</a>
				</div>
			</div>
		</footer>
	)
}
