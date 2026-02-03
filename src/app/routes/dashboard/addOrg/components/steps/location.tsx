import { Icon } from "@iconify-icon/react"

export function Location() {
	return (
		<div className="step-pane inactive-right" id="step-3">
			<div className="animate-reveal">
				<h1 className="mb-2 font-semibold text-2xl text-slate-900 tracking-tight sm:text-3xl">
					Onde os clientes te acham?
				</h1>
				<p className="mb-8 text-base text-slate-500 leading-relaxed">
					Preencha o endereço principal da sua operação.
				</p>
			</div>

			<div className="space-y-4">
				<div className="input-group group">
					<div className="mb-1.5 ml-1 flex items-baseline justify-between">
						<label className="block font-medium text-slate-500 text-xs uppercase tracking-wider">
							CEP
						</label>
						<span className="cursor-pointer font-medium text-[10px] text-emerald-600 hover:underline">
							Buscar automaticamente
						</span>
					</div>
					<div className="relative flex gap-2">
						<div className="relative w-full">
							<Icon
								className="absolute top-3.5 left-4 text-slate-400"
								icon="solar:magnifer-linear"
								width="20"
							/>
							<input
								className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pr-4 pl-12 text-slate-900 text-sm shadow-sm transition-all focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100"
								placeholder="00000-000"
								type="text"
							/>
						</div>
					</div>
				</div>

				<div className="input-group group">
					<label className="mb-1.5 ml-1 block font-medium text-slate-500 text-xs uppercase tracking-wider">
						Endereço
					</label>
					<input
						className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 text-sm shadow-sm transition-all placeholder:text-slate-300 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100"
						placeholder="Rua, Avenida..."
						type="text"
					/>
				</div>

				<div className="grid grid-cols-[100px_1fr] gap-4">
					<div className="input-group group">
						<label className="mb-1.5 ml-1 block font-medium text-slate-500 text-xs uppercase tracking-wider">
							Número
						</label>
						<input
							className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 text-sm shadow-sm transition-all placeholder:text-slate-300 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100"
							placeholder="123"
							type="text"
						/>
					</div>
					<div className="input-group group">
						<label className="mb-1.5 ml-1 block font-medium text-slate-500 text-xs uppercase tracking-wider">
							Bairro
						</label>
						<input
							className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 text-sm shadow-sm transition-all placeholder:text-slate-300 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100"
							placeholder="Centro"
							type="text"
						/>
					</div>
				</div>

				<div className="flex items-center gap-3 pt-4">
					<label className="group flex cursor-pointer items-center gap-3">
						<input
							className="h-5 w-5 cursor-pointer rounded border-slate-300 text-slate-900 accent-slate-900 transition-colors focus:ring-slate-900"
							type="checkbox"
						/>
						<span className="text-slate-500 text-sm transition-colors group-hover:text-slate-700">
							Esta é uma Dark Kitchen (Sem fachada)
						</span>
					</label>
				</div>
			</div>
		</div>
	)
}
