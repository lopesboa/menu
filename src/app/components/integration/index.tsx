import { Icon } from "@iconify-icon/react"

export function IntegrationSection() {
	return (
		<section
			id="integrations"
			className="py-24 relative border-b border-white/5 bg-[#050505] overflow-hidden"
		>
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-indigo-900/10 via-[#030712] to-[#030712]"></div>

			<div className="max-w-7xl mx-auto px-6 relative z-10">
				<div className="text-center mb-16 scroll-reveal">
					<h2 className="text-3xl md:text-4xl font-medium text-white tracking-tight mb-4">
						Adeus, tablets espalhados
					</h2>
					<p className="text-slate-400 max-w-xl mx-auto">
						Centralize iFood, Rappi, cardápio digital e impressoras em uma única
						tela. O caos da cozinha acabou.
					</p>
				</div>

				<div className="relative h-100 max-w-3xl mx-auto flex items-center justify-center">
					<div className="relative w-24 h-24 rounded-2xl bg-linear-to-tr from-indigo-600 to-purple-600 p-px z-20 shadow-[0_0_50px_rgba(79,70,229,0.3)]">
						<div className="w-full h-full rounded-2xl bg-[#0a0a0a] flex items-center justify-center flex-col gap-1">
							<Icon
								icon="solar:hamburger-menu-bold-duotone"
								width="32"
								className="text-white"
							/>
							<span className="text-[10px] font-bold text-white tracking-wide">
								BÃO
							</span>
						</div>
						<div className="hub-pulse w-32 h-32"></div>
						<div className="hub-pulse w-48 h-48 delay-300"></div>
					</div>

					<div className="absolute top-10 left-10 md:left-20 flex flex-col items-center gap-2 scroll-reveal delay-100">
						<div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-red-400">
							<Icon icon="solar:scooter-bold-duotone" width="24" />
						</div>
						<span className="text-xs text-slate-500 font-medium">Delivery</span>
						<div className="absolute top-1/2 left-full w-25 md:w-45 h-px bg-linear-to-r from-white/10 to-transparent -rotate-12 origin-left -z-10"></div>
					</div>

					<div className="absolute top-10 right-10 md:right-20 flex flex-col items-center gap-2 scroll-reveal delay-200">
						<div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-green-400">
							<Icon icon="solar:card-bold-duotone" width="24" />
						</div>
						<span className="text-xs text-slate-500 font-medium">
							Pagamentos
						</span>
						<div className="absolute top-1/2 right-full w-25 md:w-45 h-px bg-linear-to-l from-white/10 to-transparent rotate-12 origin-right -z-10"></div>
					</div>

					<div className="absolute bottom-10 left-10 md:left-20 flex flex-col items-center gap-2 scroll-reveal delay-300">
						<div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-400">
							<Icon icon="solar:printer-bold-duotone" width="24" />
						</div>
						<span className="text-xs text-slate-500 font-medium">Cozinha</span>
						<div className="absolute bottom-1/2 left-full w-25 md:w-45 h-px bg-linear-to-r from-white/10 to-transparent rotate-12 origin-left -z-10"></div>
					</div>

					<div className="absolute bottom-10 right-10 md:right-20 flex flex-col items-center gap-2 scroll-reveal delay-500">
						<div className="w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400">
							<Icon icon="solar:users-group-rounded-bold-duotone" width="24" />
						</div>
						<span className="text-xs text-slate-500 font-medium">Clientes</span>
						<div className="absolute bottom-1/2 right-full w-25 md:w-45 h-px bg-linear-to-l from-white/10 to-transparent -rotate-12 origin-right -z-10"></div>
					</div>
				</div>

				<div className="flex justify-center mt-8">
					<a
						href="#pricing"
						aria-label="Saiba mais vendo todas integrações"
						className="text-sm font-medium text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
					>
						Ver todas integrações <Icon icon="solar:arrow-right-linear" />
					</a>
				</div>
			</div>
		</section>
	)
}
