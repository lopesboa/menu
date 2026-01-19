import { Icon } from "@iconify-icon/react"
import { Dialog } from "../ui/dialog"

export function ShowROI({
	onCloseDemo,
	onStartNow,
}: {
	onStartNow: () => void
	onCloseDemo: () => void
}) {
	return (
		<Dialog id="roi">
			<div
				className="relative w-full max-w-4xl bg-[#0f111a] border border-white/10 rounded-2xl shadow-2xl transform transition-all duration-300 scale-95 flex flex-col md:flex-row overflow-hidden"
				id="roi-modal-content"
			>
				<button
					type="button"
					name="Fechar Demo"
					onClick={onCloseDemo}
					className="absolute top-4 right-4 z-20 text-slate-500 hover:text-white transition-colors"
				>
					<Icon icon="solar:close-circle-bold-duotone" width="24" />
				</button>

				<div className="w-full md:w-1/2 p-8 border-b md:border-b-0 md:border-r border-white/10">
					<div className="mb-8">
						<div className="flex items-center gap-2 mb-2 text-indigo-400">
							<Icon
								icon="solar:calculator-minimalistic-bold-duotone"
								width="20"
							/>
							<span className="text-xs font-medium uppercase tracking-wider">
								Simulador de ROI
							</span>
						</div>
						<h3 className="text-2xl font-semibold text-white tracking-tight">
							Calcule seu potencial
						</h3>
						<p className="text-sm text-slate-400 mt-2">
							Veja quanto você pode economizar e crescer com o Menu Bão.
						</p>
					</div>

					<div className="space-y-8">
						<div>
							<div className="flex justify-between items-center mb-4">
								<span className="text-sm font-medium text-slate-200">
									Faturamento Mensal
								</span>
								<span
									className="text-sm font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20"
									id="display-revenue"
								>
									R$ 50.000
								</span>
							</div>
							<input
								type="range"
								min="10000"
								max="500000"
								step="1000"
								value="50000"
								className="w-full"
								id="input-revenue"
							/>
							<div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono">
								<span>R$ 10k</span>
								<span>R$ 500k</span>
							</div>
						</div>

						<div>
							<div className="flex justify-between items-center mb-4">
								<span className="text-sm font-medium text-slate-200">
									Pedidos Mensais
								</span>
								<span
									className="text-sm font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20"
									id="display-orders"
								>
									1,500
								</span>
							</div>
							<input
								type="range"
								min="100"
								max="10000"
								step="50"
								value="1500"
								className="w-full"
								id="input-orders"
							/>
							<div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono">
								<span>100</span>
								<span>10.000</span>
							</div>
						</div>

						<div>
							<div className="flex justify-between items-center mb-4">
								<span className="text-sm font-medium text-slate-200">
									Horas de Gestão/Semana
								</span>
								<span
									className="text-sm font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20"
									id="display-hours"
								>
									10h
								</span>
							</div>
							<input
								type="range"
								min="1"
								max="60"
								step="1"
								value="10"
								className="w-full"
								id="input-hours"
							/>
							<div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono">
								<span>1h</span>
								<span>60h</span>
							</div>
						</div>
					</div>
				</div>

				<div className="w-full md:w-1/2 bg-black/50 p-8 flex flex-col justify-center relative flashlight-container">
					<div className="absolute inset-0 overflow-hidden pointer-events-none">
						<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px]"></div>
					</div>

					<div className="relative z-10 space-y-4">
						<div className="flashlight-card p-6 rounded-xl bg-white/5 border border-white/10">
							<div className="flex items-center gap-3 mb-2">
								<div className="p-1.5 rounded bg-emerald-500/20 text-emerald-400">
									<Icon icon="solar:graph-new-up-bold-duotone" />
								</div>
								<span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
									Receita Extra Anual
								</span>
							</div>
							<div
								className="text-3xl font-semibold text-white tracking-tight tabular-nums"
								id="result-revenue"
							>
								R$ 120.000
							</div>
							<p className="text-xs text-slate-500 mt-1">
								Baseado em aumento de 20% na eficiência.
							</p>
						</div>

						<div className="flashlight-card p-6 rounded-xl bg-white/5 border border-white/10">
							<div className="flex items-center gap-3 mb-2">
								<div className="p-1.5 rounded bg-blue-500/20 text-blue-400">
									<Icon icon="solar:clock-circle-bold-duotone" />
								</div>
								<span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
									Horas Salvas por Ano
								</span>
							</div>
							<div
								className="text-3xl font-semibold text-white tracking-tight tabular-nums"
								id="result-hours"
							>
								260h
							</div>
							<p className="text-xs text-slate-500 mt-1">
								Equivalente a{" "}
								<span className="text-blue-400 font-medium">
									32 dias de trabalho
								</span>
								.
							</p>
						</div>

						<div className="pt-6">
							<button
								type="button"
								name="Começar agora"
								onClick={onStartNow}
								className="w-full py-3 rounded-lg bg-white text-black font-medium hover:bg-slate-200 transition-colors shadow-lg"
							>
								Começar agora
							</button>
							<p className="text-[10px] text-center text-slate-600 mt-3">
								Estimativas baseadas em dados médios de clientes.
							</p>
						</div>
					</div>
				</div>
			</div>
		</Dialog>
	)
}
