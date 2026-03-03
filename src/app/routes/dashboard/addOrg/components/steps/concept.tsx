import { Icon } from "@iconify-icon/react"
import { useFormContext } from "react-hook-form"
import { cn } from "@/utils/misc"

interface ConceptForm {
	ownerName: string
	ownerDocType: "CPF" | "CNPJ"
	ownerDocNumber: string
}

export function Concept() {
	const {
		register,
		formState: { errors },
	} = useFormContext<ConceptForm>()

	return (
		<div className="step-pane active" id="step-1">
			<div className="stagger-2 animate-reveal">
				<h1 className="mb-2 font-semibold text-2xl text-slate-900 tracking-tight sm:text-3xl">
					Dados Pessoais
				</h1>
				<p className="mb-8 text-base text-slate-500 leading-relaxed">
					Informações do responsável pelo estabelecimento.
				</p>
			</div>

			<div className="stagger-3 animate-reveal space-y-5">
				<div className="input-group group">
					<label
						className="mb-1.5 ml-1 block font-medium text-slate-500 text-xs uppercase tracking-wider"
						htmlFor="ownerName"
					>
						Nome Completo
					</label>
					<div className="relative transform transition-all focus-within:-translate-y-0.5">
						<Icon
							className="absolute top-3.5 left-4 text-slate-400 transition-colors"
							icon="solar:user-id-linear"
							width="20"
						/>
						<input
							{...register("ownerName", {
								required: "Nome é obrigatório",
								minLength: {
									value: 3,
									message: "Nome deve ter pelo menos 3 caracteres",
								},
							})}
							className={cn(
								"w-full rounded-xl border border-slate-200 bg-white py-3.5 pr-4 pl-12 text-slate-900 text-sm shadow-sm transition-all placeholder:text-slate-300 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100",
								errors.ownerName &&
									"border-red-500 focus:border-red-500 focus:ring-red-100"
							)}
							id="ownerName"
							placeholder="Seu nome completo"
							type="text"
						/>
					</div>
					{errors.ownerName && (
						<p className="mt-1 text-red-500 text-xs">
							{errors.ownerName.message}
						</p>
					)}
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div className="input-group group">
						<label
							className="mb-1.5 ml-1 block font-medium text-slate-500 text-xs uppercase tracking-wider"
							htmlFor="ownerDocType"
						>
							Tipo de Documento
						</label>
						<div className="relative">
							<select
								{...register("ownerDocType", {
									required: "Selecione o tipo de documento",
								})}
								className={cn(
									"w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white py-3.5 pr-10 pl-4 text-slate-900 text-sm shadow-sm transition-all focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100",
									errors.ownerDocType &&
										"border-red-500 focus:border-red-500 focus:ring-red-100"
								)}
								id="ownerDocType"
							>
								<option value="">Selecione...</option>
								<option value="CPF">CPF</option>
								<option value="CNPJ">CNPJ</option>
							</select>
							<Icon
								className="pointer-events-none absolute top-4 right-4 text-slate-400"
								icon="solar:alt-arrow-down-linear"
								width="16"
							/>
						</div>
						{errors.ownerDocType && (
							<p className="mt-1 text-red-500 text-xs">
								{errors.ownerDocType.message}
							</p>
						)}
					</div>

					<div className="input-group group">
						<label
							className="mb-1.5 ml-1 block font-medium text-slate-500 text-xs uppercase tracking-wider"
							htmlFor="ownerDocNumber"
						>
							Número do Documento
						</label>
						<div className="relative">
							<Icon
								className="absolute top-3.5 left-4 text-slate-400 transition-colors"
								icon="solar:document-linear"
								width="20"
							/>
							<input
								{...register("ownerDocNumber", {
									required: "Número do documento é obrigatório",
								})}
								className={cn(
									"w-full rounded-xl border border-slate-200 bg-white py-3.5 pr-4 pl-12 text-slate-900 text-sm shadow-sm transition-all placeholder:text-slate-300 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100",
									errors.ownerDocNumber &&
										"border-red-500 focus:border-red-500 focus:ring-red-100"
								)}
								id="ownerDocNumber"
								placeholder="000.000.000-00"
								type="text"
							/>
						</div>
						{errors.ownerDocNumber && (
							<p className="mt-1 text-red-500 text-xs">
								{errors.ownerDocNumber.message}
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
