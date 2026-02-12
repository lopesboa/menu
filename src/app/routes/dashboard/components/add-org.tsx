import { zodResolver } from "@hookform/resolvers/zod"
import { Icon } from "@iconify-icon/react"
import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import { useDialogActions } from "@/app/store/dialog"
import { Button, Dialog, Stepper } from "@/components"
import { Field } from "@/components/form"
import { authClient } from "@/lib/client"
import { cn, createOrgSlug } from "@/utils/misc"
import { OrganizationFormSchema } from "@/utils/user-validation"

interface OrganizationForm {
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
	const [loading, setLoading] = useState(false)
	const [currentStep, setCurrentStep] = useState(1)
	const { closeDialog } = useDialogActions()

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
		} catch {
			toast.error("Creation failed", {
				description: "Could not create organization.",
			})
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
			handleSubmit(onSubmit)()
		}
	}

	const handleBack = () => {
		if (currentStep > 1) {
			setCurrentStep((prev) => prev - 1)
		}
	}

	const isFirstStep = currentStep === 1

	return (
		<Dialog id={"add-org"}>
			<div
				className="relative w-full max-w-2xl px-4 md:px-0"
				data-slot="add-org"
			>
				<div
					className={cn(
						"transform animate-enter overflow-hidden rounded-2xl border border-white/5 bg-[#0f1115]/90 shadow-2xl ring-1 ring-white/5 backdrop-blur-xl transition-all delay-200 duration-300"
					)}
					data-slot="add-org-content"
				>
					<button
						className="absolute top-4 right-4 text-slate-500 transition-colors hover:text-white"
						name="Fechar"
						onClick={() => closeDialog("add-org")}
						type="button"
					>
						<Icon icon="solar:close-circle-bold-duotone" width="24" />
					</button>
					<div className="flex flex-col gap-6 border-white/5 border-b px-8 pt-8 pb-6">
						<div>
							<h3
								className="mb-1 font-medium text-white text-xl tracking-tight"
								id="animated-title"
							>
								Criar Estabelecimento
							</h3>
							<p className="animate-enter text-slate-500 text-xs delay-500">
								Set up your workspace in minutes.
							</p>
						</div>
						<Stepper
							currentStep={currentStep}
							onStepClick={handleonStepClick}
							steps={steps}
						/>
					</div>

					<form
						className="tp-8 animate-enter overflow-hidden px-8 pb-6 delay-600"
						id="org-form"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="flex flex-row gap-4">
							<Field
								errors={[errors?.organizationName?.message]}
								inputProps={{
									type: "text",
									placeholder: "José",
									iconName: "solar:user-bold-duotone",
									...register("organizationName"),
								}}
								label="Primeiro nome"
							/>
						</div>

						<div>
							<Field
								className="space-y-2"
								errors={[errors?.organizationName?.message]}
								inputProps={{
									id: "restaurant-name",
									type: "text",
									placeholder: "Bistrô do Chef",
									iconName: "solar:shop-bold-duotone",
									...register("organizationName"),
								}}
								label="Nome do Restaurante"
							/>
						</div>
					</form>
					<div className="relative z-20 flex items-center justify-between border-white/5 border-t bg-[#0f1115] px-8 py-6">
						<Button
							className={cn(
								"items-center gap-1.5 rounded-lg py-2 pr-3 pl-1 font-medium text-slate-400 text-xs transition-colors hover:bg-white/5 hover:text-white",
								isFirstStep ? "hidden" : "flex"
							)}
							fullWidth={false}
							id="btn-next"
							onClick={handleBack}
							type="button"
							variant="ghost"
						>
							<Icon icon="solar:arrow-left-linear" width="16" />
							<span>Back</span>
						</Button>

						<Button
							className="group ml-auto flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white text-xs shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(79,70,229,0.5)] active:bg-indigo-700"
							fullWidth={false}
							id="btn-next"
							loading={loading}
							onClick={handleNext}
							type="button"
						>
							<span>Continue</span>
							<Icon
								className="transition-transform group-hover:translate-x-0.5"
								icon="solar:arrow-right-linear"
								width="16"
							/>
						</Button>
					</div>
				</div>
			</div>
		</Dialog>
	)
}
