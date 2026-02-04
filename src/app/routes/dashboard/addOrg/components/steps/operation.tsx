import { Icon } from "@iconify-icon/react"

export function Operation() {
	return (
		<div className="step-pane inactive-right" id="step-2">
			<div className="animate-reveal">
				<h1 className="mb-2 font-semibold text-2xl text-slate-900 tracking-tight sm:text-3xl">
					Como você vai operar?
				</h1>
				<p className="mb-8 text-base text-slate-500 leading-relaxed">
					Adaptaremos as ferramentas do painel para o seu fluxo de trabalho.
				</p>
			</div>

			<div className="space-y-4">
				<label className="group block cursor-pointer">
					<input
						checked
						className="radio-card sr-only"
						id="operation-salon"
						name="operation_type"
						type="radio"
					/>
					<div className="relative flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-slate-300 group-hover:shadow-md">
						<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-500 transition-colors">
							<Icon icon="solar:chair-2-linear" width="22" />
						</div>
						<div className="flex-1">
							<h3 className="mb-1 font-medium text-slate-900 text-sm">
								Salão & Atendimento
							</h3>
							<p className="text-slate-500 text-xs leading-relaxed">
								Mesas, garçons e cardápio QR Code. Gestão completa de pedidos no
								local.
							</p>
						</div>
						<div className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 group-hover:border-slate-400">
							<div className="check-dot h-2.5 w-2.5 rounded-full bg-slate-900 opacity-0 transition-opacity" />
						</div>
					</div>
				</label>

				<label className="group block cursor-pointer">
					<input
						className="radio-card sr-only"
						id="operation-delivery"
						name="operation_type"
						type="radio"
					/>
					<div className="relative flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-slate-300 group-hover:shadow-md">
						<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-500 transition-colors">
							<Icon icon="solar:moped-linear" width="22" />
						</div>
						<div className="flex-1">
							<h3 className="mb-1 font-medium text-slate-900 text-sm">
								Delivery & Retirada
							</h3>
							<p className="text-slate-500 text-xs leading-relaxed">
								Focado em entregas e takeaway. Integração com motoboys e iFood.
							</p>
						</div>
						<div className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 group-hover:border-slate-400">
							<div className="check-dot h-2.5 w-2.5 rounded-full bg-slate-900 opacity-0 transition-opacity" />
						</div>
					</div>
				</label>

				<label className="group block cursor-pointer">
					<input
						className="radio-card sr-only"
						id="operation-counter"
						name="operation_type"
						type="radio"
					/>
					<div className="relative flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:border-slate-300 group-hover:shadow-md">
						<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-500 transition-colors">
							<Icon icon="solar:cup-hot-linear" width="22" />
						</div>
						<div className="flex-1">
							<h3 className="mb-1 font-medium text-slate-900 text-sm">
								Balcão Rápido
							</h3>
							<p className="text-slate-500 text-xs leading-relaxed">
								Cafés, padarias e fast-food. Fila ágil e pagamento no pedido.
							</p>
						</div>
						<div className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 group-hover:border-slate-400">
							<div className="check-dot h-2.5 w-2.5 rounded-full bg-slate-900 opacity-0 transition-opacity" />
						</div>
					</div>
				</label>
			</div>
		</div>
	)
}
