import "./styles.css"
import { zodResolver } from "@hookform/resolvers/zod"
import { Icon } from "@iconify-icon/react"
import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { Button } from "@/components"
import { authClient } from "@/lib/client"
import { cn, createOrgSlug } from "@/utils/misc"
import { OrganizationFormSchema } from "@/utils/user-validation"
import { Concept } from "./components/steps/concept"
import { Location } from "./components/steps/location"
import { Operation } from "./components/steps/operation"
import { StepperActions } from "./components/steps/stepper-action"
import {
	StepperNextButton,
	StepperPreviousButton,
} from "./components/steps/stepper-button"
import { StepContent } from "./components/steps/stepper-content"
import { StepperHeader } from "./components/steps/stepper-header"
import { StepperRoot } from "./components/steps/stepper-root"

type OrganizationForm = {
	slug: string
	logo?: string
	organizationName: string
	metadata?: Record<string, unknown>
	redirectTo?: string
	keepCurrentActiveOrganization?: boolean
}

const steps = [{ label: "Conceito" }, { label: "Operação" }, { label: "Local" }]

export default function AddOrganization() {
	const [_loading, setLoading] = useState(false)
	const [currentStep, setCurrentStep] = useState(1)

	const { handleSubmit } = useForm<OrganizationForm>({
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

	// const handleonStepClick = (step: number) => {
	// 	setCurrentStep(step)
	// }

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

	return (
		<div
			data-slot="add-organization"
			className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden"
		>
			<div
				data-slot="add-org-content"
				className="w-full max-w-150 mt-16 sm:mt-0 relative z-10"
			>
				<StepperRoot
					defaultStep={1}
					onStepChange={(step) => console.log({ step })}
				>
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
					</div>
					<StepperHeader steps={steps} />

					<form
						id="org-form"
						className="elative min-h-115"
						// className="px-8 tp-8 pb-6 overflow-hidden animate-enter delay-600"
						onSubmit={handleSubmit(onSubmit)}
					>
						<StepContent step={1}>
							<Concept />
						</StepContent>
						<StepContent step={2}>
							<Operation />
						</StepContent>
						<StepContent step={3}>
							<Location />
						</StepContent>
					</form>
					<StepperActions>
						<StepperPreviousButton>Voltar</StepperPreviousButton>
						<StepperNextButton>Próximo</StepperNextButton>
					</StepperActions>
				</StepperRoot>
			</div>

			<div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-xl border-t border-slate-200 sm:static sm:bg-transparent sm:border-0 mt-8 animate-reveal stagger-3 z-50">
				<div className="max-w-150 mx-auto p-4 sm:p-0 flex justify-between items-center">
					<Button
						fullWidth={false}
						variant="ghost"
						type="button"
						className={cn(
							"flex px-4 py-2 rounded-lg text-sm font-medium text-slate-500  transition-all items-center gap-2 cursor-pointer",
							isFirstStep ? "opacity-0" : "",
						)}
						onClick={handleBack}
					>
						<Icon icon="solar:arrow-left-linear" width="18" />
						<span>Voltar</span>
					</Button>

					<Button
						fullWidth={false}
						type="button"
						className="group bg-slate-900 text-white pl-8 pr-6 py-3.5 rounded-xl text-sm font-medium shadow-xl shadow-slate-900/20 hover:bg-slate-800 hover:shadow-2xl hover:shadow-slate-900/30 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-3 cursor-pointer"
						onClick={handleNext}
					>
						<span>Continuar</span>
						<Icon
							icon="solar:arrow-right-linear"
							width="18"
							className="group-hover:translate-x-1 transition-transform"
						/>
					</Button>
				</div>
			</div>
		</div>
	)
}
