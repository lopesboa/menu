import { Icon } from "@iconify-icon/react"
import { useFormContext } from "react-hook-form"
import { useActiveCategories } from "@/hooks/useCategories"
import { cn, createOrgSlug } from "@/utils/misc"

interface OperationForm {
	organizationName: string
	slug: string
	phone: string
	docType: "CPF" | "CNPJ"
	docNumber: string
	categoryId: string
	operationType: string
}

export function Operation() {
	const {
		register,
		formState: { errors },
		setValue,
		watch,
	} = useFormContext<OperationForm>()

	const { data: categories = [], isLoading: isCategoriesLoading } =
		useActiveCategories()
	const organizationName = watch("organizationName")

	const generatedSlug = organizationName ? createOrgSlug(organizationName) : ""

	const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "")
		setValue("slug", value, { shouldValidate: true })
	}

	return (
		<div className="step-pane inactive-right" id="step-2">
			<div className="animate-reveal">
				<h1 className="mb-2 font-semibold text-2xl text-slate-900 tracking-tight sm:text-3xl">
					Dados da Empresa
				</h1>
				<p className="mb-8 text-base text-slate-500 leading-relaxed">
					Informações sobre o seu estabelecimento.
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
							{...register("organizationName", {
								required: "Nome do estabelecimento é obrigatório",
								minLength: {
									value: 3,
									message: "Nome deve ter pelo menos 3 caracteres",
								},
							})}
							className={cn(
								"w-full rounded-xl border border-slate-200 bg-white py-3.5 pr-4 pl-12 text-slate-900 text-sm shadow-sm transition-all placeholder:text-slate-300 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100",
								errors.organizationName &&
									"border-red-500 focus:border-red-500 focus:ring-red-100"
							)}
							id="organizationName"
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
								<input
									maxLength={50}
									{...register("slug", {
										required: "Slug é obrigatório",
										// pattern: {
										// value: /^[a-z0-9-]+$/,
										// message: "Apenas letras minúsculas, números e hífens",
										// },
									})}
									className={cn(
										"w-32 border-slate-300 border-b border-dashed bg-transparent font-medium text-slate-900 text-sm focus:border-slate-500 focus:outline-none",
										errors.slug && "border-red-500 text-red-500"
									)}
									onChange={handleSlugChange}
									placeholder={generatedSlug || "seu-restaurante"}
								/>
								<span className="text-slate-400 text-sm">.grupoboa.com.br</span>
							</div>
						</div>
					</div>
					{errors.slug && (
						<p className="mt-1 text-red-500 text-xs">{errors.slug.message}</p>
					)}
					<p className="mt-1 text-slate-400 text-xs">
						O link é gerado automaticamente, mas você pode editá-lo
					</p>
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div className="input-group group">
						<label
							className="mb-1.5 ml-1 block font-medium text-slate-500 text-xs uppercase tracking-wider"
							htmlFor="phone"
						>
							Telefone
						</label>
						<div className="relative">
							<Icon
								className="absolute top-3.5 left-4 text-slate-400 transition-colors"
								icon="solar:phone-linear"
								width="20"
							/>
							<input
								{...register("phone", {
									required: "Telefone é obrigatório",
								})}
								className={cn(
									"w-full rounded-xl border border-slate-200 bg-white py-3.5 pr-4 pl-12 text-slate-900 text-sm shadow-sm transition-all placeholder:text-slate-300 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100",
									errors.phone &&
										"border-red-500 focus:border-red-500 focus:ring-red-100"
								)}
								id="phone"
								placeholder="(00) 00000-0000"
								type="text"
							/>
						</div>
						{errors.phone && (
							<p className="mt-1 text-red-500 text-xs">
								{errors.phone.message}
							</p>
						)}
					</div>

					<div className="input-group group">
						<label
							className="mb-1.5 ml-1 block font-medium text-slate-500 text-xs uppercase tracking-wider"
							htmlFor="categoryId"
						>
							Categoria
						</label>
						<div className="relative">
							<select
								{...register("categoryId", {
									required: "Selecione uma categoria",
								})}
								className={cn(
									"w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white py-3.5 pr-10 pl-4 text-slate-900 text-sm shadow-sm transition-all focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100",
									errors.categoryId &&
										"border-red-500 focus:border-red-500 focus:ring-red-100"
								)}
								disabled={isCategoriesLoading}
								id="categoryId"
							>
								<option value="">Selecione...</option>
								{categories.map((cat) => (
									<option key={cat.id} value={cat.id}>
										{cat.name}
									</option>
								))}
							</select>
							<Icon
								className="pointer-events-none absolute top-4 right-4 text-slate-400"
								icon="solar:alt-arrow-down-linear"
								width="16"
							/>
						</div>
						{errors.categoryId && (
							<p className="mt-1 text-red-500 text-xs">
								{errors.categoryId.message}
							</p>
						)}
					</div>
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div className="input-group group">
						<label
							className="mb-1.5 ml-1 block font-medium text-slate-500 text-xs uppercase tracking-wider"
							htmlFor="docType"
						>
							Tipo de Documento
						</label>
						<div className="relative">
							<select
								{...register("docType", {
									required: "Selecione o tipo de documento",
								})}
								className={cn(
									"w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white py-3.5 pr-10 pl-4 text-slate-900 text-sm shadow-sm transition-all focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100",
									errors.docType &&
										"border-red-500 focus:border-red-500 focus:ring-red-100"
								)}
								id="docType"
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
						{errors.docType && (
							<p className="mt-1 text-red-500 text-xs">
								{errors.docType.message}
							</p>
						)}
					</div>

					<div className="input-group group">
						<label
							className="mb-1.5 ml-1 block font-medium text-slate-500 text-xs uppercase tracking-wider"
							htmlFor="docNumber"
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
								{...register("docNumber", {
									required: "Número do documento é obrigatório",
								})}
								className={cn(
									"w-full rounded-xl border border-slate-200 bg-white py-3.5 pr-4 pl-12 text-slate-900 text-sm shadow-sm transition-all placeholder:text-slate-300 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100",
									errors.docNumber &&
										"border-red-500 focus:border-red-500 focus:ring-red-100"
								)}
								id="docNumber"
								placeholder="000.000.000-00"
								type="text"
							/>
						</div>
						{errors.docNumber && (
							<p className="mt-1 text-red-500 text-xs">
								{errors.docNumber.message}
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
