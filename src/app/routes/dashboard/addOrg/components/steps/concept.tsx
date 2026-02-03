import { Icon } from "@iconify-icon/react"

export function Concept() {
	return (
		<div className="step-pane active" id="step-1">
			<div className="stagger-2 animate-reveal">
				<h1 className="mb-2 font-semibold text-2xl text-slate-900 tracking-tight sm:text-3xl">
					Vamos criar seu espaço.
				</h1>
				<p className="mb-8 text-base text-slate-500 leading-relaxed">
					Comece definindo a identidade do seu negócio. Isso aparecerá no
					cardápio digital.
				</p>
			</div>

			<div className="stagger-3 animate-reveal space-y-5">
				<div className="input-group group">
					<span className="mb-1.5 ml-1 block font-medium text-slate-500 text-xs uppercase tracking-wider transition-colors">
						Nome do Restaurante
					</span>
					<div className="relative transform transition-all focus-within:-translate-y-0.5">
						<Icon
							className="absolute top-3.5 left-4 text-slate-400 transition-colors"
							icon="solar:shop-2-linear"
							width="20"
						/>
						<input
							className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pr-4 pl-12 text-slate-900 text-sm shadow-sm transition-all placeholder:text-slate-300 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100"
							placeholder="Ex: Trattoria da Nonna"
							type="text"
						/>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div className="input-group group">
						<span className="mb-1.5 ml-1 block font-medium text-slate-500 text-xs uppercase tracking-wider transition-colors">
							Categoria
						</span>
						<div className="relative">
							<select className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white py-3.5 pr-10 pl-4 text-slate-900 text-sm shadow-sm transition-all focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100">
								<option disabled selected value="">
									Selecione...
								</option>
								<option>Brasileira</option>
								<option>Italiana</option>
								<option>Japonesa</option>
								<option>Hamburgueria</option>
								<option>Cafeteria</option>
							</select>
							<Icon
								className="pointer-events-none absolute top-4 right-4 text-slate-400"
								icon="solar:alt-arrow-down-linear"
								width="16"
							/>
						</div>
					</div>
					<div className="input-group group">
						<span className="mb-1.5 ml-1 block font-medium text-slate-500 text-xs uppercase tracking-wider transition-colors">
							Responsável
						</span>
						<div className="relative">
							<Icon
								className="absolute top-3.5 left-4 text-slate-400 transition-colors"
								icon="solar:user-id-linear"
								width="20"
							/>
							<input
								className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pr-4 pl-12 text-slate-900 text-sm shadow-sm transition-all placeholder:text-slate-300 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100"
								placeholder="Seu nome"
								type="text"
							/>
						</div>
					</div>
				</div>

				<div className="input-group group pt-2">
					<div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm">
							<Icon icon="solar:link-linear" width="16" />
						</div>
						<div className="flex-1">
							<p className="mb-0.5 text-slate-400 text-xs">Seu link será:</p>
							<p className="font-medium text-slate-600 text-sm">
								<span className="border-slate-300 border-b border-dashed text-slate-900">
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
