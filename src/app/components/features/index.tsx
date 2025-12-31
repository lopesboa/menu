import { Icon } from "@iconify-icon/react"

export function FeaturesSection() {
	return (
		<section id="features" className="py-32 relative">
			<div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
				<div className="space-y-8">
					<h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white scroll-reveal">
						Criado para velocidade.
						<br />
						<span className="text-slate-500">Feito para escalar.</span>
					</h2>
					<div className="space-y-4">
						<button
							type="button"
							className="feature-nav-btn w-full text-left p-6 rounded-xl border border-transparent hover:bg-white/5 transition-all group active"
							data-target="card-1"
						>
							<div className="flex items-center gap-4 mb-2">
								<div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
									<Icon icon="solar:smartphone-2-bold-duotone" width="24" />
								</div>
								<h3 className="text-lg font-medium text-slate-200">
									Cardápio Digital
								</h3>
							</div>
							<p className="text-sm text-slate-400 pl-13">
								Integração via QR Code nativa e fluida. Sem downloads de apps.
							</p>
						</button>

						<button
							type="button"
							className="feature-nav-btn w-full text-left p-6 rounded-xl border border-transparent hover:bg-white/5 transition-all group"
							data-target="card-2"
						>
							<div className="flex items-center gap-4 mb-2">
								<div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
									<Icon icon="solar:chart-2-bold-duotone" width="24" />
								</div>
								<h3 className="text-lg font-medium text-slate-200">
									Analytics em Tempo Real
								</h3>
							</div>
							<p className="text-sm text-slate-400 pl-13">
								Acompanhe faturamento, pratos mais vendidos e horários de pico.
							</p>
						</button>

						<button
							type="button"
							className="feature-nav-btn w-full text-left p-6 rounded-xl border border-transparent hover:bg-white/5 transition-all group"
							data-target="card-3"
						>
							<div className="flex items-center gap-4 mb-2">
								<div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 group-hover:bg-rose-500/20 transition-colors">
									<Icon icon="solar:box-minimalistic-bold-duotone" width="24" />
								</div>
								<h3 className="text-lg font-medium text-slate-200">
									Controle de Estoque
								</h3>
							</div>
							<p className="text-sm text-slate-400 pl-13">
								Pause itens automaticamente quando o estoque acabar.
								Sincronizado.
							</p>
						</button>
					</div>
				</div>

				<div className="relative h-125 w-full flashlight-container">
					<div
						id="card-1"
						className="feature-card active flashlight-card rounded-2xl p-8 h-full bg-[#0a0a0a] border border-white/10 flex flex-col"
					>
						<div className="flex justify-between items-center mb-8">
							<div className="text-sm font-medium text-slate-400">
								Pedido #2401
							</div>
							<div className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs font-medium">
								Novo
							</div>
						</div>
						<div className="space-y-4 mb-auto">
							<div className="flex items-center gap-4 p-3 rounded bg-white/5 border border-white/5">
								<div className="w-10 h-10 bg-orange-500/20 rounded flex items-center justify-center text-orange-400">
									<Icon icon="solar:hamburger-menu-bold-duotone" />
								</div>
								<div>
									<div className="text-sm text-slate-200">
										Hambúrguer Artesanal
									</div>
									<div className="text-xs text-slate-500">R$ 48,00</div>
								</div>
							</div>
							<div className="flex items-center gap-4 p-3 rounded bg-white/5 border border-white/5">
								<div className="w-10 h-10 bg-yellow-500/20 rounded flex items-center justify-center text-yellow-400">
									<Icon icon="solar:bottle-bold-duotone" />
								</div>
								<div>
									<div className="text-sm text-slate-200">Coca 2L</div>
									<div className="text-xs text-slate-500">R$ 12,00</div>
								</div>
							</div>
						</div>
						<div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
							<div className="text-sm text-slate-400">Total</div>
							<div className="text-xl font-medium text-white">R$ 60,00</div>
						</div>
						<div className="mt-4 w-full py-2 bg-white text-black text-center text-sm font-medium rounded-lg">
							Aceitar Pedido
						</div>
					</div>

					<div
						id="card-2"
						className="feature-card flashlight-card rounded-2xl p-8 h-full bg-[#0a0a0a] border border-white/10 flex flex-col"
					>
						<div className="flex justify-between items-center mb-8">
							<div className="text-sm font-medium text-slate-400">
								Faturamento
							</div>
							<div className="text-xs text-slate-500">Hoje</div>
						</div>
						<div className="text-4xl font-medium text-white mb-2">
							R$ 4.289,50
						</div>
						<div className="text-sm text-emerald-400 flex items-center gap-1 mb-8">
							<Icon icon="solar:graph-up-bold-duotone" /> +12.5% vs ontem
						</div>
						<div className="flex items-end gap-2 h-32 mt-auto mb-4">
							<div className="w-1/5 h-[40%] bg-indigo-500/20 rounded-t"></div>
							<div className="w-1/5 h-[60%] bg-indigo-500/20 rounded-t"></div>
							<div className="w-1/5 h-[30%] bg-indigo-500/20 rounded-t"></div>
							<div className="w-1/5 h-[80%] bg-indigo-500/20 rounded-t"></div>
							<div className="w-1/5 h-full bg-indigo-500 rounded-t shadow-[0_0_15px_rgba(99,102,241,0.5)]"></div>
						</div>
					</div>

					<div
						id="card-3"
						className="feature-card flashlight-card rounded-2xl p-8 h-full bg-[#0a0a0a] border border-white/10 flex flex-col"
					>
						<div className="mb-6">
							<div className="text-sm font-medium text-slate-400 mb-1">
								Status do Estoque
							</div>
							<h4 className="text-xl text-white">Alerta de Estoque</h4>
						</div>
						<div className="space-y-4">
							<div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
									<span className="text-sm text-red-200">Refrigerante</span>
								</div>
								<span className="text-sm font-mono text-red-200">4 unid.</span>
							</div>
							<div className="bg-white/5 border border-white/5 p-4 rounded-lg flex items-center justify-between">
								<div className="flex items-center gap-3">
									<div className="w-2 h-2 rounded-full bg-green-500"></div>
									<span className="text-sm text-slate-300">Farinha</span>
								</div>
								<span className="text-sm font-mono text-slate-400">24 kg</span>
							</div>
						</div>
					</div>

					<div className="absolute -bottom-16 right-0 flex gap-2">
						<button
							type="button"
							className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
							id="prev-card"
						>
							<Icon icon="solar:arrow-left-bold-duotone" />
						</button>
						<button
							type="button"
							className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
							id="next-card"
						>
							<Icon icon="solar:arrow-right-bold-duotone" />
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}
