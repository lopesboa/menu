import { Icon } from "@iconify-icon/react"

// <style>
//
// </style>
export function Operation() {
	return (
		<div id="step-2" className="step-pane inactive-right">
			<div className="animate-reveal">
				<h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 mb-2">
					Como você vai operar?
				</h1>
				<p className="text-base text-slate-500 mb-8 leading-relaxed">
					Adaptaremos as ferramentas do painel para o seu fluxo de trabalho.
				</p>
			</div>

			<div className="space-y-4">
				<label className="cursor-pointer group block">
					<input
						type="radio"
						name="operation_type"
						className="radio-card sr-only"
						checked
					/>
					<div className="relative rounded-2xl border border-slate-200 bg-white p-5 hover:border-slate-300 transition-all duration-200 flex items-start gap-4 shadow-sm group-hover:shadow-md">
						<div className="w-10 h-10 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center shrink-0 transition-colors">
							<Icon icon="solar:chair-2-linear" width="22" />
						</div>
						<div className="flex-1">
							<h3 className="font-medium text-slate-900 text-sm mb-1">
								Salão & Atendimento
							</h3>
							<p className="text-xs text-slate-500 leading-relaxed">
								Mesas, garçons e cardápio QR Code. Gestão completa de pedidos no
								local.
							</p>
						</div>
						<div className="w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-slate-400">
							<div className="w-2.5 h-2.5 rounded-full bg-slate-900 opacity-0 transition-opacity check-dot"></div>
						</div>
					</div>
				</label>

				<label className="cursor-pointer group block">
					<input
						type="radio"
						name="operation_type"
						className="radio-card sr-only"
					/>
					<div className="relative rounded-2xl border border-slate-200 bg-white p-5 hover:border-slate-300 transition-all duration-200 flex items-start gap-4 shadow-sm group-hover:shadow-md">
						<div className="w-10 h-10 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center shrink-0 transition-colors">
							<Icon icon="solar:moped-linear" width="22" />
						</div>
						<div className="flex-1">
							<h3 className="font-medium text-slate-900 text-sm mb-1">
								Delivery & Retirada
							</h3>
							<p className="text-xs text-slate-500 leading-relaxed">
								Focado em entregas e takeaway. Integração com motoboys e iFood.
							</p>
						</div>
						<div className="w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-slate-400">
							<div className="w-2.5 h-2.5 rounded-full bg-slate-900 opacity-0 transition-opacity check-dot"></div>
						</div>
					</div>
				</label>

				<label className="cursor-pointer group block">
					<input
						type="radio"
						name="operation_type"
						className="radio-card sr-only"
					/>
					<div className="relative rounded-2xl border border-slate-200 bg-white p-5 hover:border-slate-300 transition-all duration-200 flex items-start gap-4 shadow-sm group-hover:shadow-md">
						<div className="w-10 h-10 rounded-full bg-slate-50 text-slate-500 flex items-center justify-center shrink-0 transition-colors">
							<Icon icon="solar:cup-hot-linear" width="22" />
						</div>
						<div className="flex-1">
							<h3 className="font-medium text-slate-900 text-sm mb-1">
								Balcão Rápido
							</h3>
							<p className="text-xs text-slate-500 leading-relaxed">
								Cafés, padarias e fast-food. Fila ágil e pagamento no pedido.
							</p>
						</div>
						<div className="w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-slate-400">
							<div className="w-2.5 h-2.5 rounded-full bg-slate-900 opacity-0 transition-opacity check-dot"></div>
						</div>
					</div>
				</label>
			</div>
		</div>
	)
}
