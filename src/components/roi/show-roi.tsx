import { Icon } from "@iconify-icon/react"
import { Dialog } from "../ui/dialog"
import { Link } from "react-router"

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
				className="relative flex w-full max-w-4xl scale-95 transform flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0f111a] shadow-2xl transition-all duration-300 md:flex-row"
				id="roi-modal-content"
			>
				<button
					className="absolute top-4 right-4 z-20 text-slate-500 transition-colors hover:text-white"
					name="Fechar Demo"
					onClick={onCloseDemo}
					type="button"
				>
					<Icon icon="solar:close-circle-bold-duotone" width="24" />
				</button>

				<div className="w-full border-white/10 border-b p-8 md:w-1/2 md:border-r md:border-b-0">
					<div className="mb-8">
						<div className="mb-2 flex items-center gap-2 text-indigo-400">
							<Icon
								icon="solar:calculator-minimalistic-bold-duotone"
								width="20"
							/>
							<span className="font-medium text-xs uppercase tracking-wider">
								Simulador de ROI
							</span>
						</div>
						<h3 className="font-semibold text-2xl text-white tracking-tight">
							Calcule seu potencial
						</h3>
						<p className="mt-2 text-slate-400 text-sm">
							Veja quanto você pode economizar e crescer com o Menu Bão.
						</p>
					</div>

					<div className="space-y-8">
						<div>
							<div className="mb-4 flex items-center justify-between">
								<span className="font-medium text-slate-200 text-sm">
									Faturamento Mensal
								</span>
								<span
									className="rounded border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 font-mono text-indigo-400 text-sm"
									id="display-revenue"
								>
									R$ 50.000
								</span>
							</div>
							<input
								className="w-full"
								id="input-revenue"
								max="500000"
								min="10000"
								step="1000"
								type="range"
								value="50000"
							/>
							<div className="mt-2 flex justify-between font-mono text-[10px] text-slate-500">
								<span>R$ 10k</span>
								<span>R$ 500k</span>
							</div>
						</div>

						<div>
							<div className="mb-4 flex items-center justify-between">
								<span className="font-medium text-slate-200 text-sm">
									Pedidos Mensais
								</span>
								<span
									className="rounded border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 font-mono text-indigo-400 text-sm"
									id="display-orders"
								>
									1,500
								</span>
							</div>
							<input
								className="w-full"
								id="input-orders"
								max="10000"
								min="100"
								step="50"
								type="range"
								value="1500"
							/>
							<div className="mt-2 flex justify-between font-mono text-[10px] text-slate-500">
								<span>100</span>
								<span>10.000</span>
							</div>
						</div>

						<div>
							<div className="mb-4 flex items-center justify-between">
								<span className="font-medium text-slate-200 text-sm">
									Horas de Gestão/Semana
								</span>
								<span
									className="rounded border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 font-mono text-indigo-400 text-sm"
									id="display-hours"
								>
									10h
								</span>
							</div>
							<input
								className="w-full"
								id="input-hours"
								max="60"
								min="1"
								step="1"
								type="range"
								value="10"
							/>
							<div className="mt-2 flex justify-between font-mono text-[10px] text-slate-500">
								<span>1h</span>
								<span>60h</span>
							</div>
						</div>
					</div>
				</div>

				<div className="flashlight-container relative flex w-full flex-col justify-center bg-black/50 p-8 md:w-1/2">
					<div className="pointer-events-none absolute inset-0 overflow-hidden">
						<div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-[100px]" />
					</div>

					<div className="relative z-10 space-y-4">
						<div className="flashlight-card rounded-xl border border-white/10 bg-white/5 p-6">
							<div className="mb-2 flex items-center gap-3">
								<div className="rounded bg-emerald-500/20 p-1.5 text-emerald-400">
									<Icon icon="solar:graph-new-up-bold-duotone" />
								</div>
								<span className="font-medium text-slate-400 text-xs uppercase tracking-wider">
									Receita Extra Anual
								</span>
							</div>
							<div
								className="font-semibold text-3xl text-white tabular-nums tracking-tight"
								id="result-revenue"
							>
								R$ 120.000
							</div>
							<p className="mt-1 text-slate-500 text-xs">
								Baseado em aumento de 20% na eficiência.
							</p>
						</div>

						<div className="flashlight-card rounded-xl border border-white/10 bg-white/5 p-6">
							<div className="mb-2 flex items-center gap-3">
								<div className="rounded bg-blue-500/20 p-1.5 text-blue-400">
									<Icon icon="solar:clock-circle-bold-duotone" />
								</div>
								<span className="font-medium text-slate-400 text-xs uppercase tracking-wider">
									Horas Salvas por Ano
								</span>
							</div>
							<div
								className="font-semibold text-3xl text-white tabular-nums tracking-tight"
								id="result-hours"
							>
								260h
							</div>
							<p className="mt-1 text-slate-500 text-xs">
								Equivalente a{" "}
								<span className="font-medium text-blue-400">
									32 dias de trabalho
								</span>
								.
							</p>
						</div>

						<div className="pt-6">
							<button
								className="w-full rounded-lg bg-white py-3 font-medium text-black shadow-lg transition-colors hover:bg-slate-200"
								name="Começar agora"
								onClick={onStartNow}
								type="button"
							>
								<Link aria-label="Começar agora" to="/auth/register">
									Começar agora
								</Link>
							</button>
							<p className="mt-3 text-center text-[10px] text-slate-600">
								Estimativas baseadas em dados médios de clientes.
							</p>
						</div>
					</div>
				</div>
			</div>
		</Dialog>
	)
}
