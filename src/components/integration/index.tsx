import { Icon } from "@iconify-icon/react"

export function IntegrationSection() {
	return (
		<section
			className="relative overflow-hidden border-white/5 border-b bg-[#050505] py-24"
			id="integrations"
		>
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-indigo-900/10 via-[#030712] to-[#030712]" />

			<div className="relative z-10 mx-auto max-w-7xl px-6">
				<div className="scroll-reveal mb-16 text-center">
					<h2 className="mb-4 font-medium text-3xl text-white tracking-tight md:text-4xl">
						Adeus, tablets espalhados
					</h2>
					<p className="mx-auto max-w-xl text-slate-400">
						Centralize iFood, Rappi, cardápio digital e impressoras em uma única
						tela. O caos da cozinha acabou.
					</p>
				</div>

				<div className="relative mx-auto flex h-100 max-w-3xl items-center justify-center">
					<div className="relative z-20 h-24 w-24 rounded-2xl bg-linear-to-tr from-indigo-600 to-purple-600 p-px shadow-[0_0_50px_rgba(79,70,229,0.3)]">
						<div className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-2xl bg-[#0a0a0a]">
							<Icon
								className="text-white"
								icon="solar:hamburger-menu-bold-duotone"
								width="32"
							/>
							<span className="font-bold text-[10px] text-white tracking-wide">
								BÃO
							</span>
						</div>
						<div className="hub-pulse h-32 w-32" />
						<div className="hub-pulse h-48 w-48 delay-300" />
					</div>

					<div className="scroll-reveal absolute top-10 left-10 flex flex-col items-center gap-2 delay-100 md:left-20">
						<div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-red-400">
							<Icon icon="solar:scooter-bold-duotone" width="24" />
						</div>
						<span className="font-medium text-slate-500 text-xs">Delivery</span>
						<div className="absolute top-1/2 left-full -z-10 h-px w-25 origin-left -rotate-12 bg-linear-to-r from-white/10 to-transparent md:w-45" />
					</div>

					<div className="scroll-reveal absolute top-10 right-10 flex flex-col items-center gap-2 delay-200 md:right-20">
						<div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-green-400">
							<Icon icon="solar:card-bold-duotone" width="24" />
						</div>
						<span className="font-medium text-slate-500 text-xs">
							Pagamentos
						</span>
						<div className="absolute top-1/2 right-full -z-10 h-px w-25 origin-right rotate-12 bg-linear-to-l from-white/10 to-transparent md:w-45" />
					</div>

					<div className="scroll-reveal absolute bottom-10 left-10 flex flex-col items-center gap-2 delay-300 md:left-20">
						<div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-orange-400">
							<Icon icon="solar:printer-bold-duotone" width="24" />
						</div>
						<span className="font-medium text-slate-500 text-xs">Cozinha</span>
						<div className="absolute bottom-1/2 left-full -z-10 h-px w-25 origin-left rotate-12 bg-linear-to-r from-white/10 to-transparent md:w-45" />
					</div>

					<div className="scroll-reveal absolute right-10 bottom-10 flex flex-col items-center gap-2 delay-500 md:right-20">
						<div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-blue-400">
							<Icon icon="solar:users-group-rounded-bold-duotone" width="24" />
						</div>
						<span className="font-medium text-slate-500 text-xs">Clientes</span>
						<div className="absolute right-full bottom-1/2 -z-10 h-px w-25 origin-right -rotate-12 bg-linear-to-l from-white/10 to-transparent md:w-45" />
					</div>
				</div>

				<div className="mt-8 flex justify-center">
					<a
						aria-label="Saiba mais vendo todas integrações"
						className="flex items-center gap-1 font-medium text-indigo-400 text-sm transition-colors hover:text-indigo-300"
						href="#pricing"
					>
						Ver todas integrações <Icon icon="solar:arrow-right-linear" />
					</a>
				</div>
			</div>
		</section>
	)
}
