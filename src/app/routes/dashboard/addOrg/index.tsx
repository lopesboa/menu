import "./styles.css"
import { zodResolver } from "@hookform/resolvers/zod"
import { Icon } from "@iconify-icon/react"
import { useEffect, useState } from "react"
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
	useStepperActions,
	useStepperSelectors,
} from "@/domains/onboarding/store/stepper-store"
import { authClient } from "@/lib/client"
import { sentryCaptureException } from "@/lib/sentry"
import { cn, createOrgSlug } from "@/utils/misc"
import { dashboardRoutePaths } from "../manifest"
import { Operation } from "./components/steps/operation"
import { StepContent } from "./components/steps/stepper-content"
import { StepperHeader } from "./components/steps/stepper-header"
import { StepperRoot } from "./components/steps/stepper-root"

const organizationSchema = z.object({
	organizationName: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
})

const fullSchema = organizationSchema

type OrganizationForm = z.infer<typeof fullSchema>

const steps = [{ label: "Estabelecimento" }]

export default function AddOrganization() {
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const { currentStep } = useStepperSelectors()
	const { reset, setTotalSteps } = useStepperActions()

	useEffect(() => {
		reset()
		setTotalSteps(steps.length)

		return () => {
			reset()
		}
	}, [reset, setTotalSteps])

	const methods = useForm<OrganizationForm>({
		resolver: zodResolver(fullSchema),
		mode: "onChange",
		defaultValues: {
			organizationName: "",
		},
	})

	const { handleSubmit } = methods

	const onSubmit: SubmitHandler<OrganizationForm> = async (data) => {
		try {
			setLoading(true)

			const slug = createOrgSlug(data.organizationName)

			if (!slug) {
				toast.error("Falha na criação", {
					description:
						"Nao foi possivel gerar o link do estabelecimento a partir do nome informado.",
				})
				return
			}

			const metadata = {
				plan: "free",
			}

			await authClient.organization.create(
				{
					name: data.organizationName,
					slug,
					logo: "",
					metadata,
					keepCurrentActiveOrganization: false,
				} as never,
				{
					onSuccess: () => {
						reset()
						toast.success("Estabelecimento criado!", {
							description:
								"Agora você pode completar os demais dados dentro da plataforma.",
						})
						navigate(dashboardRoutePaths.home, { replace: true })
					},
					onError: (err) => {
						toast.error("Falha na criação", {
							description: err.error.message,
						})
					},
				}
			)
		} catch (err) {
			sentryCaptureException(err)
			console.log({ err })
			toast.error("Falha na criação", {
				description: "Não foi possível criar a organização.",
			})
		} finally {
			setLoading(false)
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
								Comece com o essencial e complete o restante depois.
							</p>
						</div>
					</div>
					<StepperHeader allowClickNavigation={false} steps={steps} />

					<FormProvider {...methods}>
						<form
							className="elative min-h-115"
							id="org-form"
							onSubmit={handleSubmit(onSubmit)}
						>
							<StepContent step={1}>
								<Operation />
							</StepContent>
						</form>
					</FormProvider>
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
						onClick={() => handleSubmit(onSubmit)()}
						type="button"
					>
						<span>Criar estabelecimento</span>
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
