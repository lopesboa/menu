import "./styles.css"
import { zodResolver } from "@hookform/resolvers/zod"
import { Icon } from "@iconify-icon/react"
import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import { useStepper, useStepperAction } from "@/app/store/stepper-store"
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

interface OrganizationForm {
	slug: string
	logo?: string
	organizationName: string
	metadata?: Record<string, unknown>
	redirectTo?: string
	keepCurrentActiveOrganization?: boolean
}

const steps = [{ label: "Conceito" }, { label: "Operação" }, { label: "Local" }]

export default function AddOrganization() {
	const [loading, setLoading] = useState(false)
	const { currentStep } = useStepper()
	const { goToNext, goToPrevious, setTotalSteps } = useStepperAction()

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
		} catch {
			toast.error("Falha na criação", {
				description: "Não foi possível criar a organização.",
			})
		} finally {
			setLoading(false)
		}
	}

	const handleNext = () => {
		if (currentStep < steps.length) {
			goToNext()
		} else {
			handleSubmit(onSubmit)()
		}
	}

	const handleBack = () => {
		if (currentStep > 1) {
			goToPrevious()
		}
	}

	const isFirstStep = currentStep === 1

	return (
		<div
			className="flex min-h-screen flex-col items-center justify-center overflow-hidden p-4 sm:p-6"
			data-slot="add-organization"
		>
			<div
				className="relative z-10 mt-16 w-full max-w-150 sm:mt-0"
				data-slot="add-org-content"
			>
				<StepperRoot
					defaultStep={1}
					onStepChange={() => {
						setTotalSteps(steps.length)
					}}
				>
					<div className="flex flex-col gap-6 border-white/5 border-b px-8 pt-8 pb-6">
						<div>
							<h3
								className="mb-1 font-medium text-white text-xl tracking-tight"
								id="animated-title"
							>
								Criar Estabelecimento
							</h3>
							<p className="animate-enter text-slate-500 text-xs delay-500">
								Configure seu estabelecimento em minutos.
							</p>
						</div>
					</div>
					<StepperHeader steps={steps} />

					<form
						className="elative min-h-115"
						id="org-form"
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

			<div className="stagger-3 fixed bottom-0 left-0 z-50 mt-8 w-full animate-reveal border-slate-200 border-t bg-white/90 backdrop-blur-xl sm:static sm:border-0 sm:bg-transparent">
				<div className="mx-auto flex max-w-150 items-center justify-between p-4 sm:p-0">
					<Button
						className={cn(
							"flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 font-medium text-slate-500 text-sm transition-all",
							isFirstStep ? "opacity-0" : ""
						)}
						fullWidth={false}
						onClick={handleBack}
						type="button"
						variant="ghost"
					>
						<Icon icon="solar:arrow-left-linear" width="18" />
						<span>Voltar</span>
					</Button>

					<Button
						className="group flex transform cursor-pointer items-center gap-3 rounded-xl bg-slate-900 py-3.5 pr-6 pl-8 font-medium text-sm text-white shadow-slate-900/20 shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-2xl hover:shadow-slate-900/30"
						fullWidth={false}
						loading={loading}
						onClick={handleNext}
						type="button"
					>
						<span>Continuar</span>
						<Icon
							className="transition-transform group-hover:translate-x-1"
							icon="solar:arrow-right-linear"
							width="18"
						/>
					</Button>
				</div>
			</div>
		</div>
	)
}
