import { Icon } from "@iconify-icon/react"

export function Concept() {
	return (
		<div id="step-1" className="step-pane active">
			<div className="animate-reveal stagger-2">
				<h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 mb-2">
					Vamos criar seu espaço.
				</h1>
				<p className="text-base text-slate-500 mb-8 leading-relaxed">
					Comece definindo a identidade do seu negócio. Isso aparecerá no
					cardápio digital.
				</p>
			</div>

			<div className="space-y-5 animate-reveal stagger-3">
				<div className="input-group group">
					<span className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider ml-1 transition-colors">
						Nome do Restaurante
					</span>
					<div className="relative transition-all transform focus-within:-translate-y-0.5">
						<Icon
							icon="solar:shop-2-linear"
							className="absolute left-4 top-3.5 text-slate-400 transition-colors"
							width="20"
						/>
						<input
							type="text"
							placeholder="Ex: Trattoria da Nonna"
							className="w-full bg-white rounded-xl border border-slate-200 pl-12 pr-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-100 focus:border-slate-400 transition-all shadow-sm"
						/>
					</div>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div className="input-group group">
						<span className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider ml-1 transition-colors">
							Categoria
						</span>
						<div className="relative">
							<select className="w-full appearance-none bg-white rounded-xl border border-slate-200 pl-4 pr-10 py-3.5 text-sm text-slate-900 focus:outline-none focus:ring-4 focus:ring-slate-100 focus:border-slate-400 transition-all shadow-sm cursor-pointer">
								<option value="" disabled selected>
									Selecione...
								</option>
								<option>Brasileira</option>
								<option>Italiana</option>
								<option>Japonesa</option>
								<option>Hamburgueria</option>
								<option>Cafeteria</option>
							</select>
							<Icon
								icon="solar:alt-arrow-down-linear"
								className="absolute right-4 top-4 text-slate-400 pointer-events-none"
								width="16"
							/>
						</div>
					</div>
					<div className="input-group group">
						<span className="block text-xs font-medium text-slate-500 mb-1.5 uppercase tracking-wider ml-1 transition-colors">
							Responsável
						</span>
						<div className="relative">
							<Icon
								icon="solar:user-id-linear"
								className="absolute left-4 top-3.5 text-slate-400 transition-colors"
								width="20"
							/>
							<input
								type="text"
								placeholder="Seu nome"
								className="w-full bg-white rounded-xl border border-slate-200 pl-12 pr-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-slate-100 focus:border-slate-400 transition-all shadow-sm"
							/>
						</div>
					</div>
				</div>

				<div className="input-group group pt-2">
					<div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
						<div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-400">
							<Icon icon="solar:link-linear" width="16" />
						</div>
						<div className="flex-1">
							<p className="text-xs text-slate-400 mb-0.5">Seu link será:</p>
							<p className="text-sm font-medium text-slate-600">
								<span className="text-slate-900 border-b border-dashed border-slate-300">
									seurestaurante
								</span>
								.grupoboa.com.br
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
