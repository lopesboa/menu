import { zodResolver } from "@hookform/resolvers/zod"
import { Icon } from "@iconify-icon/react"
import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { useDialogActions } from "@/app/store/dialog"
import { Button, Dialog, Stepper } from "@/components"
import { Field } from "@/components/form"
import { authClient } from "@/lib/client"
import { cn, createOrgSlug } from "@/utils/misc"
import { OrganizationFormSchema } from "@/utils/user-validation"

type OrganizationForm = {
	slug: string
	logo?: string
	organizationName: string
	metadata?: Record<string, unknown>
	redirectTo?: string
	keepCurrentActiveOrganization?: boolean
}

const steps = [
	{ label: "Identity" },
	{ label: "Contact" },
	{ label: "Details" },
]

export function AddOrgForm() {
	const [_loading, setLoading] = useState(false)
	const [currentStep, setCurrentStep] = useState(1)
	const { closeDialog } = useDialogActions()
	// const { isOpen } = useDialog()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<OrganizationForm>({
		resolver: zodResolver(OrganizationFormSchema),
		mode: "onBlur",
		defaultValues: {
			slug: "",
			redirectTo: "",
			keepCurrentActiveOrganization: false,
			logo: "",
			metadata: {},
			organizationName: "",
		},
	})

	const onSubmit: SubmitHandler<OrganizationForm> = async (data) => {
		const metadata = { plan: "free" }
		try {
			setLoading(true)
			await authClient.organization.create({
				name: data.organizationName,
				slug: createOrgSlug(data.organizationName),
				keepCurrentActiveOrganization: true,
				logo: "",
				metadata,
			})
		} catch (error) {
		} finally {
			setLoading(false)
		}
	}

	const handleonStepClick = (step: number) => {
		setCurrentStep(step)
	}

	const handleNext = () => {
		if (currentStep < steps.length) {
			setCurrentStep((prev) => prev + 1)
		} else {
			// Último step - submeter o form
			handleSubmit(onSubmit)()
		}
	}

	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep((prev) => prev - 1)
		}
	}

	const isFirstStep = currentStep === 1
	// const isLastStep = currentStep === steps.length

	return (
		<Dialog id={"add-org"}>
			<div
				data-slot="add-org"
				className="relative w-full max-w-2xl px-4 md:px-0"
			>
				<div
					data-slot="add-org-content"
					className={cn(
						"bg-[#0f1115]/90 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl overflow-hidden animate-enter delay-200 ring-1 ring-white/5 transform transition-all duration-300",
					)}
				>
					<button
						type="button"
						name="Fechar"
						onClick={() => closeDialog("add-org")}
						className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
					>
						<Icon icon="solar:close-circle-bold-duotone" width="24" />
					</button>
					<div className="px-8 pt-8 pb-6 border-b border-white/5 flex flex-col gap-6">
						<div>
							<h3
								className="text-xl text-white font-medium tracking-tight mb-1"
								id="animated-title"
							>
								Criar Estabelecimento
							</h3>
							<p className="text-xs text-slate-500 animate-enter delay-500">
								Set up your workspace in minutes.
							</p>
						</div>
						<Stepper
							steps={steps}
							currentStep={currentStep}
							onStepClick={handleonStepClick}
						/>
					</div>

					<form
						id="org-form"
						className="px-8 tp-8 pb-6 overflow-hidden animate-enter delay-600"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="flex flex-row gap-4">
							<Field
								errors={[errors?.organizationName?.message]}
								label="Primeiro nome"
								inputProps={{
									type: "text",
									placeholder: "José",
									iconName: "solar:user-bold-duotone",
									...register("organizationName"),
								}}
							/>
						</div>

						<div>
							<Field
								errors={[errors?.organizationName?.message]}
								className="space-y-2"
								label="Nome do Restaurante"
								inputProps={{
									id: "restaurant-name",
									type: "text",
									placeholder: "Bistrô do Chef",
									iconName: "solar:shop-bold-duotone",
									...register("organizationName"),
								}}
							/>
						</div>
					</form>
					<div className="px-8 py-6 bg-[#0f1115] border-t border-white/5 flex justify-between items-center z-20 relative">
						<Button
							id="btn-next"
							variant="ghost"
							type="button"
							fullWidth={false}
							className={cn(
								"text-xs font-medium text-slate-400 hover:text-white transition-colors items-center gap-1.5 pl-1 pr-3 py-2 rounded-lg hover:bg-white/5",
								isFirstStep ? "hidden" : "flex",
							)}
							onClick={handleBack}
						>
							<Icon icon="solar:arrow-left-linear" width="16" />
							<span>Back</span>
						</Button>

						<Button
							id="btn-next"
							type="button"
							fullWidth={false}
							className="ml-auto text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 transition-all px-5 py-2.5 rounded-lg shadow-[0_0_15px_rgba(79,70,229,0.3)] hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] flex items-center gap-2 group"
							onClick={handleNext}
						>
							<span>Continue</span>
							<Icon
								icon="solar:arrow-right-linear"
								width="16"
								className="group-hover:translate-x-0.5 transition-transform"
							/>
						</Button>
					</div>
				</div>
			</div>
		</Dialog>
	)
}
