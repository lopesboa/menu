import { Icon } from "@iconify-icon/react"

export function FeaturesSection() {
	return (
		<section className="relative py-32" id="features">
			<div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-2">
				<div className="space-y-8">
					<h2 className="scroll-reveal font-medium text-3xl text-white tracking-tight md:text-4xl">
						Criado para velocidade.
						<br />
						<span className="text-slate-500">Feito para escalar.</span>
					</h2>
					<div className="space-y-4">
						<button
							className="feature-nav-btn group active w-full rounded-xl border border-transparent p-6 text-left transition-all hover:bg-white/5"
							data-target="card-1"
							name="Cardápio Digital"
							type="button"
						>
							<div className="mb-2 flex items-center gap-4">
								<div className="rounded-lg bg-indigo-500/10 p-2 text-indigo-400 transition-colors group-hover:bg-indigo-500/20">
									<Icon icon="solar:smartphone-2-bold-duotone" width="24" />
								</div>
								<h3 className="font-medium text-lg text-slate-200">
									Cardápio Digital
								</h3>
							</div>
							<p className="pl-13 text-slate-400 text-sm">
								Integração via QR Code nativa e fluida. Sem downloads de apps.
							</p>
						</button>

						<button
							className="feature-nav-btn group w-full rounded-xl border border-transparent p-6 text-left transition-all hover:bg-white/5"
							data-target="card-2"
							name="Analytics em Tempo Real"
							type="button"
						>
							<div className="mb-2 flex items-center gap-4">
								<div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400 transition-colors group-hover:bg-emerald-500/20">
									<Icon icon="solar:chart-2-bold-duotone" width="24" />
								</div>
								<h3 className="font-medium text-lg text-slate-200">
									Analytics em Tempo Real
								</h3>
							</div>
							<p className="pl-13 text-slate-400 text-sm">
								Acompanhe faturamento, pratos mais vendidos e horários de pico.
							</p>
						</button>

						<button
							className="feature-nav-btn group w-full rounded-xl border border-transparent p-6 text-left transition-all hover:bg-white/5"
							data-target="card-3"
							name="Controle de Estoque"
							type="button"
						>
							<div className="mb-2 flex items-center gap-4">
								<div className="rounded-lg bg-rose-500/10 p-2 text-rose-400 transition-colors group-hover:bg-rose-500/20">
									<Icon icon="solar:box-minimalistic-bold-duotone" width="24" />
								</div>
								<h3 className="font-medium text-lg text-slate-200">
									Controle de Estoque
								</h3>
							</div>
							<p className="pl-13 text-slate-400 text-sm">
								Pause itens automaticamente quando o estoque acabar.
								Sincronizado.
							</p>
						</button>
					</div>
				</div>

				<div className="flashlight-container relative h-125 w-full">
					<div
						className="feature-card active flashlight-card flex h-full flex-col rounded-2xl border border-white/10 bg-[#0a0a0a] p-8"
						id="card-1"
					>
						<div className="mb-8 flex items-center justify-between">
							<div className="font-medium text-slate-400 text-sm">
								Pedido #2401
							</div>
							<div className="rounded bg-green-500/20 px-2 py-1 font-medium text-green-400 text-xs">
								Novo
							</div>
						</div>
						<div className="mb-auto space-y-4">
							<div className="flex items-center gap-4 rounded border border-white/5 bg-white/5 p-3">
								<div className="flex h-10 w-10 items-center justify-center rounded bg-orange-500/20 text-orange-400">
									<Icon icon="solar:hamburger-menu-bold-duotone" />
								</div>
								<div>
									<div className="text-slate-200 text-sm">
										Hambúrguer Artesanal
									</div>
									<div className="text-slate-500 text-xs">R$ 48,00</div>
								</div>
							</div>
							<div className="flex items-center gap-4 rounded border border-white/5 bg-white/5 p-3">
								<div className="flex h-10 w-10 items-center justify-center rounded bg-yellow-500/20 text-yellow-400">
									<Icon icon="solar:bottle-bold-duotone" />
								</div>
								<div>
									<div className="text-slate-200 text-sm">Coca 2L</div>
									<div className="text-slate-500 text-xs">R$ 12,00</div>
								</div>
							</div>
						</div>
						<div className="mt-8 flex items-center justify-between border-white/10 border-t pt-6">
							<div className="text-slate-400 text-sm">Total</div>
							<div className="font-medium text-white text-xl">R$ 60,00</div>
						</div>
						<div className="mt-4 w-full rounded-lg bg-white py-2 text-center font-medium text-black text-sm">
							Aceitar Pedido
						</div>
					</div>

					<div
						className="feature-card flashlight-card flex h-full flex-col rounded-2xl border border-white/10 bg-[#0a0a0a] p-8"
						id="card-2"
					>
						<div className="mb-8 flex items-center justify-between">
							<div className="font-medium text-slate-400 text-sm">
								Faturamento
							</div>
							<div className="text-slate-500 text-xs">Hoje</div>
						</div>
						<div className="mb-2 font-medium text-4xl text-white">
							R$ 4.289,50
						</div>
						<div className="mb-8 flex items-center gap-1 text-emerald-400 text-sm">
							<Icon icon="solar:graph-up-bold-duotone" /> +12.5% vs ontem
						</div>
						<div className="mt-auto mb-4 flex h-32 items-end gap-2">
							<div className="h-[40%] w-1/5 rounded-t bg-indigo-500/20" />
							<div className="h-[60%] w-1/5 rounded-t bg-indigo-500/20" />
							<div className="h-[30%] w-1/5 rounded-t bg-indigo-500/20" />
							<div className="h-[80%] w-1/5 rounded-t bg-indigo-500/20" />
							<div className="h-full w-1/5 rounded-t bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
						</div>
					</div>

					<div
						className="feature-card flashlight-card flex h-full flex-col rounded-2xl border border-white/10 bg-[#0a0a0a] p-8"
						id="card-3"
					>
						<div className="mb-6">
							<div className="mb-1 font-medium text-slate-400 text-sm">
								Status do Estoque
							</div>
							<h4 className="text-white text-xl">Alerta de Estoque</h4>
						</div>
						<div className="space-y-4">
							<div className="flex items-center justify-between rounded-lg border border-red-500/20 bg-red-500/10 p-4">
								<div className="flex items-center gap-3">
									<div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
									<span className="text-red-200 text-sm">Refrigerante</span>
								</div>
								<span className="font-mono text-red-200 text-sm">4 unid.</span>
							</div>
							<div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 p-4">
								<div className="flex items-center gap-3">
									<div className="h-2 w-2 rounded-full bg-green-500" />
									<span className="text-slate-300 text-sm">Farinha</span>
								</div>
								<span className="font-mono text-slate-400 text-sm">24 kg</span>
							</div>
						</div>
					</div>

					<div className="absolute right-0 -bottom-16 flex gap-2">
						<button
							className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
							id="prev-card"
							name="Navegar para esquerda"
							type="button"
						>
							<Icon icon="solar:arrow-left-bold-duotone" />
						</button>
						<button
							className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
							id="next-card"
							name="Navegar para direita"
							type="button"
						>
							<Icon icon="solar:arrow-right-bold-duotone" />
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}
