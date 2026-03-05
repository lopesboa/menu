import { Icon } from "@iconify-icon/react"
import { type ChangeEvent, useEffect } from "react"
import { useFormContext, useWatch } from "react-hook-form"
import { useCities, useStates } from "@/hooks/use-address"
import { useCepSearch } from "@/hooks/use-cep-search"
import { cn } from "@/utils/misc"

interface LocationForm {
	zipCode: string
	state: string
	city: string
	street: string
	number: string
	complement: string
	neighborhood: string
}

export function Location() {
	const {
		register,
		formState: { errors },
		setValue,
		control,
	} = useFormContext<LocationForm>()

	const [state] = useWatch({
		control,
		name: ["state"],
	})

	const { cepData, error: cepError, searchCep } = useCepSearch()
	const { data: states = [], isLoading: isStatesLoading } = useStates()
	const { data: cities = [], isLoading: isCitiesLoading } = useCities(state)

	const handleCepSearch = (
		event: ChangeEvent<HTMLInputElement, HTMLInputElement>
	) => {
		event.preventDefault()

		const value = event.target.value

		if (value && value.length >= 8) {
			searchCep(value)
		}
	}

	useEffect(() => {
		if (cepData) {
			setValue("street", cepData.street, { shouldValidate: true })
			setValue("neighborhood", cepData.neighborhood, { shouldValidate: true })
			setValue("state", cepData.state, { shouldValidate: true })
			setValue("city", cepData.city, { shouldValidate: true })
		}
	}, [cepData, setValue])

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
						<label
							className="block font-medium text-slate-500 text-xs uppercase tracking-wider"
							htmlFor="zipCode"
						>
							CEP
						</label>
					</div>
					<div className="relative flex gap-2">
						<div className="relative w-full">
							<Icon
								className="absolute top-3.5 left-4 text-slate-400"
								icon="solar:magnifer-linear"
								width="20"
							/>
							<input
								{...register("zipCode", {
									required: "CEP é obrigatório",
								})}
								className={cn(
									"w-full rounded-xl border border-slate-200 bg-white py-3.5 pr-4 pl-12 text-slate-900 text-sm shadow-sm transition-all focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100",
									errors.zipCode &&
										"border-red-500 focus:border-red-500 focus:ring-red-100"
								)}
								id="zipCode"
								onChange={handleCepSearch}
								placeholder="00000-000"
								type="text"
							/>
						</div>
					</div>
					{errors.zipCode && (
						<p className="mt-1 text-red-500 text-xs">
							{errors.zipCode.message}
						</p>
					)}
					{cepError && <p className="mt-1 text-red-500 text-xs">{cepError}</p>}
				</div>

				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					<div className="input-group group">
						<label
							className="mb-1.5 ml-1 block font-medium text-slate-500 text-xs uppercase tracking-wider"
							htmlFor="state"
						>
							Estado
						</label>
						<div className="relative">
							<select
								{...register("state", { required: "Selecione um estado" })}
								className={cn(
									"w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white py-3.5 pr-10 pl-4 text-slate-900 text-sm shadow-sm transition-all focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100",
									errors.state &&
										"border-red-500 focus:border-red-500 focus:ring-red-100"
								)}
								disabled={isStatesLoading}
								id="state"
							>
								<option value="">Selecione...</option>
								{states.map((s) => (
									<option key={s.id} value={s.code}>
										{s.name}
									</option>
								))}
							</select>
							<Icon
								className="pointer-events-none absolute top-4 right-4 text-slate-400"
								icon="solar:alt-arrow-down-linear"
								width="16"
							/>
						</div>
						{errors.state && (
							<p className="mt-1 text-red-500 text-xs">
								{errors.state.message}
							</p>
						)}
					</div>

					<div className="input-group group">
						<label
							className="mb-1.5 ml-1 block font-medium text-slate-500 text-xs uppercase tracking-wider"
							htmlFor="city"
						>
							Cidade
						</label>
						<div className="relative">
							<select
								{...register("city", { required: "Selecione uma cidade" })}
								className={cn(
									"w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white py-3.5 pr-10 pl-4 text-slate-900 text-sm shadow-sm transition-all focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100",
									errors.city &&
										"border-red-500 focus:border-red-500 focus:ring-red-100"
								)}
								disabled={isCitiesLoading || !state}
								id="city"
							>
								<option value="">Selecione...</option>
								{cities.map((c) => (
									<option key={c.id} value={c.name}>
										{c.name}
									</option>
								))}
							</select>
							<Icon
								className="pointer-events-none absolute top-4 right-4 text-slate-400"
								icon="solar:alt-arrow-down-linear"
								width="16"
							/>
						</div>
						{errors.city && (
							<p className="mt-1 text-red-500 text-xs">{errors.city.message}</p>
						)}
					</div>
				</div>

				<div className="input-group group">
					<label
						className="mb-1.5 ml-1 block font-medium text-slate-500 text-xs uppercase tracking-wider"
						htmlFor="street"
					>
						Endereço
					</label>
					<input
						{...register("street", { required: "Endereço é obrigatório" })}
						className={cn(
							"w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 text-sm shadow-sm transition-all placeholder:text-slate-300 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100",
							errors.street &&
								"border-red-500 focus:border-red-500 focus:ring-red-100"
						)}
						id="street"
						placeholder="Rua, Avenida..."
						type="text"
					/>
					{errors.street && (
						<p className="mt-1 text-red-500 text-xs">{errors.street.message}</p>
					)}
				</div>

				<div className="grid grid-cols-[100px_1fr] gap-4">
					<div className="input-group group">
						<label
							className="mb-1.5 ml-1 block font-medium text-slate-500 text-xs uppercase tracking-wider"
							htmlFor="number"
						>
							Número
						</label>
						<input
							{...register("number", { required: "Número é obrigatório" })}
							className={cn(
								"w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 text-sm shadow-sm transition-all placeholder:text-slate-300 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100",
								errors.number &&
									"border-red-500 focus:border-red-500 focus:ring-red-100"
							)}
							id="number"
							placeholder="123"
							type="text"
						/>
						{errors.number && (
							<p className="mt-1 text-red-500 text-xs">
								{errors.number.message}
							</p>
						)}
					</div>
					<div className="input-group group">
						<label
							className="mb-1.5 ml-1 block font-medium text-slate-500 text-xs uppercase tracking-wider"
							htmlFor="complement"
						>
							Complemento
						</label>
						<input
							{...register("complement")}
							className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 text-sm shadow-sm transition-all placeholder:text-slate-300 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100"
							id="complement"
							placeholder="Apto, Sala..."
							type="text"
						/>
					</div>
				</div>

				<div className="input-group group">
					<label
						className="mb-1.5 ml-1 block font-medium text-slate-500 text-xs uppercase tracking-wider"
						htmlFor="neighborhood"
					>
						Bairro
					</label>
					<input
						{...register("neighborhood", { required: "Bairro é obrigatório" })}
						className={cn(
							"w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-slate-900 text-sm shadow-sm transition-all placeholder:text-slate-300 focus:border-slate-400 focus:outline-none focus:ring-4 focus:ring-slate-100",
							errors.neighborhood &&
								"border-red-500 focus:border-red-500 focus:ring-red-100"
						)}
						id="neighborhood"
						placeholder="Centro"
						type="text"
					/>
					{errors.neighborhood && (
						<p className="mt-1 text-red-500 text-xs">
							{errors.neighborhood.message}
						</p>
					)}
				</div>
			</div>
		</div>
	)
}
