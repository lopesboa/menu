import { Icon } from "@iconify-icon/react"

export function Location() {
	return (
		<div id="step-3" className="step-pane inactive-right">
			<div className="animate-reveal">
				<h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 mb-2">
					Onde os clientes te acham?
				</h1>
				<p className="text-base text-slate-500 mb-8 leading-relaxed">
					Preencha o endereço principal da sua operação.
				</p>
			</div>

			<div className="space-y-4">
				<div className="input-group group">
					<div className="flex justify-between items-baseline mb-1.5 ml-1">
						<label className="block text-xs font-medium text-slate-500 uppercase tracking-wider">
							CEP
						</label>
						<span className="text-[10px] text-emerald-600 font-medium cursor-pointer hover:underline">
							Buscar automaticamente
						</span>
					</div>
					<div className="relative flex gap-2">
						<div className="relative w-full">
							<Icon
								icon="solar:magnifer-linear"
								className="absolute left-4 top-3.5 text-slate-400"
								width="20"
							/>
							<input
								type="text"
								placeholder="00000-000"
								className="w-full bg-white rounded-xl border border-slate-200 pl-12 pr-4 py-3.5 text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-100 focus:border-slate-400 transition-all shadow-sm"
							/>
						</div>
					</div>
				</div>

				<div className="input-group group">
					<label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider ml-1">
						Endereço
					</label>
					<input
						type="text"
						placeholder="Rua, Avenida..."
						className="w-full bg-white rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-100 focus:border-slate-400 transition-all shadow-sm"
					/>
				</div>

				<div className="grid grid-cols-[100px_1fr] gap-4">
					<div className="input-group group">
						<label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider ml-1">
							Número
						</label>
						<input
							type="text"
							placeholder="123"
							className="w-full bg-white rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-100 focus:border-slate-400 transition-all shadow-sm"
						/>
					</div>
					<div className="input-group group">
						<label className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider ml-1">
							Bairro
						</label>
						<input
							type="text"
							placeholder="Centro"
							className="w-full bg-white rounded-xl border border-slate-200 px-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-100 focus:border-slate-400 transition-all shadow-sm"
						/>
					</div>
				</div>

				<div className="pt-4 flex items-center gap-3">
					<label className="flex items-center gap-3 cursor-pointer group">
						<input
							type="checkbox"
							className="w-5 h-5 rounded border-slate-300 text-slate-900 focus:ring-slate-900 transition-colors cursor-pointer accent-slate-900"
						/>
						<span className="text-sm text-slate-500 group-hover:text-slate-700 transition-colors">
							Esta é uma Dark Kitchen (Sem fachada)
						</span>
					</label>
				</div>
			</div>
		</div>
	)
}
