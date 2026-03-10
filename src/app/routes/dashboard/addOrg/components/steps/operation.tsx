import { Icon } from "@iconify-icon/react"
import { useFormContext, useWatch } from "react-hook-form"
import { cn, createOrgSlug } from "@/utils/misc"

interface OperationForm {
	organizationName: string
}

export function Operation() {
	const {
		register,
		formState: { errors },
		control,
	} = useFormContext<OperationForm>()

	const organizationName = useWatch({
		control,
		name: "organizationName",
	})

	const generatedSlug = organizationName ? createOrgSlug(organizationName) : ""

	const organizationNameField = register("organizationName", {
		required: "Nome do estabelecimento é obrigatório",
		minLength: {
			value: 3,
			message: "Nome deve ter pelo menos 3 caracteres",
		},
	})

	return (
		<div className="step-pane inactive-right" id="step-2">
			<div className="animate-reveal">
				<h1 className="mb-2 font-semibold text-2xl text-slate-900 tracking-tight sm:text-3xl">
					Seu estabelecimento
				</h1>
				<p className="mb-8 text-base text-slate-500 leading-relaxed">
					Preencha apenas o essencial para entrar na plataforma agora.
				</p>
			</div>

			<div className="space-y-5">
				<div className="input-group group">
					<label
						className="mb-1.5 ml-1 block font-medium text-slate-500 text-xs uppercase tracking-wider"
						htmlFor="organizationName"
					>
						Nome do Estabelecimento
					</label>
					<div className="relative transform transition-all focus-within:-translate-y-0.5">
						<Icon
							className="absolute top-3.5 left-4 text-slate-400 transition-colors"
							icon="solar:shop-2-linear"
							width="20"
						/>
						<input
							{...organizationNameField}
							className={cn(
								"w-full rounded-xl border border-slate-200 bg-white py-3.5 pr-4 pl-12 text-slate-900 text-sm shadow-sm transition-all placeholder:text-slate-300 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100",
								errors.organizationName &&
									"border-red-500 focus:border-red-500 focus:ring-red-100"
							)}
							id="organizationName"
							// onChange={handleOrganizationNameChange}
							placeholder="Ex: Trattoria da Nonna"
							type="text"
						/>
					</div>
					{errors.organizationName && (
						<p className="mt-1 text-red-500 text-xs">
							{errors.organizationName.message}
						</p>
					)}
				</div>

				<div className="input-group group">
					<div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-400 shadow-sm">
							<Icon icon="solar:link-linear" width="16" />
						</div>
						<div className="flex-1">
							<p className="mb-0.5 text-slate-400 text-xs">Seu link será:</p>
							<div className="flex items-center gap-1">
								<p
									className={cn(
										"min-h-5 border-slate-300 border-b border-dashed font-medium text-slate-900 text-sm",
										!generatedSlug && "text-slate-400"
									)}
								>
									{generatedSlug || "seu-estabelecimento"}
								</p>
								<span className="text-slate-400 text-sm">.grupoboa.com.br</span>
							</div>
						</div>
					</div>
					<p className="mt-1 text-slate-400 text-xs">
						O link e gerado automaticamente com base no nome do estabelecimento
						e podera ser alterado depois.
					</p>
				</div>

				<div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4">
					<p className="font-medium text-emerald-900 text-sm">
						Voce podera completar categoria, endereco e dados cadastrais depois.
					</p>
					<p className="mt-1 text-emerald-800 text-xs">
						Agora vamos apenas criar seu acesso inicial ao estabelecimento.
					</p>
				</div>
			</div>
		</div>
	)
}
