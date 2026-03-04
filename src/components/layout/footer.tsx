import { Icon } from "@iconify-icon/react"

export function Footer() {
	return (
		<footer className="border-white/5 border-t bg-black py-12">
			<div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
				<div className="flex items-center gap-2">
					<div className="flex h-5 w-5 items-center justify-center rounded bg-linear-to-tr from-indigo-500 to-purple-500 text-white">
						<Icon icon="solar:hamburger-menu-bold-duotone" width="12" />
					</div>
					<span className="font-medium text-slate-200 text-sm tracking-tight">
						Menu Bão
					</span>
				</div>
				<div className="text-slate-500 text-xs">
					© 2024 Menu Bão Ltda. Todos os direitos reservados.
				</div>
				<div className="flex gap-4">
					<a
						aria-label="Siga nossa página no twitter"
						className="text-slate-500 transition-colors hover:text-white"
						href="/"
					>
						<Icon icon="brandico:twitter-bird" />
					</a>
					<a
						aria-label="Siga nossa página no Instagram"
						className="text-slate-500 transition-colors hover:text-white"
						href="/"
					>
						<Icon icon="brandico:instagram" />
					</a>
					<a
						aria-label="Siga nossa página no Github"
						className="text-slate-500 transition-colors hover:text-white"
						href="/"
					>
						<Icon icon="brandico:github" />
					</a>
				</div>
			</div>
		</footer>
	)
}
