import { Icon } from "@iconify-icon/react"
import { Link } from "react-router"
import { MenuBaoLogo } from "@/components/brand/menu-bao-logo"

export function Footer() {
	return (
		<footer className="border-white/5 border-t bg-black py-12">
			<div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
				<MenuBaoLogo
					className="text-slate-200"
					markClassName="size-5 text-brand-paper"
					markTilClassName="text-brand-urucum"
				/>
				<div className="text-slate-500 text-xs">
					© 2024 Menu Bão Ltda. Todos os direitos reservados.
				</div>
				<div className="flex items-center gap-4 text-slate-400 text-xs">
					<Link
						className="hover:text-white"
						to="/solucoes/sistema-para-restaurante"
					>
						Soluções
					</Link>
					<Link className="hover:text-white" to="/#integrations">
						Integrações
					</Link>
					<Link className="hover:text-white" to="/#pricing">
						Preços
					</Link>
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
