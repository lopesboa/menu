import "./styles.css"
import { zodResolver } from "@hookform/resolvers/zod"
import { Icon } from "@iconify-icon/react"
import { useState } from "react"
import {
	FormProvider,
	type SubmitHandler,
	useForm,
	useWatch,
} from "react-hook-form"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { z } from "zod"
import { useStepper, useStepperAction } from "@/app/store/stepper-store"
import { Button } from "@/components/ui/button"
import { useCities, useCreateAddress } from "@/hooks/use-address"
import { authClient } from "@/lib/client"
import { sentryCaptureException } from "@/lib/sentry"
import { cn } from "@/utils/misc"
import { dashboardRoutePaths } from "../manifest"
import { Concept } from "./components/steps/concept"
import { Location } from "./components/steps/location"
import { Operation } from "./components/steps/operation"
import { StepContent } from "./components/steps/stepper-content"
import { StepperHeader } from "./components/steps/stepper-header"
import { StepperRoot } from "./components/steps/stepper-root"

const step1Schema = z.object({
	ownerName: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
	ownerDocType: z.string().min(1, "Selecione o tipo de documento"),
	ownerDocNumber: z.string().min(1, "Número do documento é obrigatório"),
})

const step2Schema = z.object({
	organizationName: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
	slug: z
		.string()
		.min(1, "Slug é obrigatório")
		.regex(/^[a-z0-9-]+$/, "Apenas letras minúsculas, números e hífens"),
	phone: z.string().min(1, "Telefone é obrigatório"),
	docType: z.string().min(1, "Selecione o tipo de documento"),
	docNumber: z.string().min(1, "Número do documento é obrigatório"),
	categoryId: z.string().min(1, "Selecione uma categoria"),
	// operationType: z.string().min(1, "Selecione o tipo de operação"),
})

const step3Schema = z.object({
	zipCode: z.string().min(1, "CEP é obrigatório"),
	state: z.string().min(1, "Selecione um estado"),
	city: z.string().min(1, "Selecione uma cidade"),
	street: z.string().min(1, "Endereço é obrigatório"),
	number: z.string().min(1, "Número é obrigatório"),
	complement: z.string().optional(),
	neighborhood: z.string().min(1, "Bairro é obrigatório"),
})

const fullSchema = step1Schema.merge(step2Schema).merge(step3Schema)

type OrganizationForm = z.infer<typeof fullSchema>

const steps = [
	{ label: "Dados Pessoais" },
	{ label: "Empresa" },
	{ label: "Endereço" },
]

export default function AddOrganization() {
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const { currentStep } = useStepper()
	const { goToNext, goToPrevious, setTotalSteps } = useStepperAction()
	const { mutateAsync, error } = useCreateAddress()

	const methods = useForm<OrganizationForm>({
		resolver: zodResolver(fullSchema),
		mode: "onChange",
		defaultValues: {
			ownerName: "",
			ownerDocType: undefined,
			ownerDocNumber: "",
			organizationName: "",
			slug: "",
			phone: "",
			docType: undefined,
			docNumber: "",
			categoryId: "",
			// operationType: "",
			zipCode: "",
			state: "",
			city: "",
			street: "",
			number: "",
			complement: "",
			neighborhood: "",
		},
	})

	const { handleSubmit, trigger } = methods

	const [state, city] = useWatch({
		control: methods.control,
		name: ["state", "city"],
	})

	const { data: cities = [] } = useCities(state)
	const selectedCity = cities.find((c) => c.name === city)

	const validateCurrentStep = async (): Promise<boolean> => {
		let fieldsToValidate: (keyof OrganizationForm)[] = []

		switch (currentStep) {
			case 1:
				fieldsToValidate = ["ownerName", "ownerDocType", "ownerDocNumber"]
				break
			case 2:
				fieldsToValidate = [
					"organizationName",
					"slug",
					"phone",
					"docType",
					"docNumber",
					"categoryId",
					// "operationType",
				]
				break
			case 3:
				fieldsToValidate = [
					"zipCode",
					"state",
					"city",
					"street",
					"number",
					"neighborhood",
				]
				break
			default:
				fieldsToValidate = []
		}

		const isValid = await trigger(fieldsToValidate)
		return isValid
	}

	const onSubmit: SubmitHandler<OrganizationForm> = async (data) => {
		try {
			setLoading(true)

			const addressData = {
				street: data.street,
				number: data.number,
				complement: data.complement,
				neighborhood: data.neighborhood,
				zipCode: data.zipCode,
				cityId: selectedCity?.id || "",
			}

			const { id: addressId } = await mutateAsync(addressData)

			const metadata = {
				// operationType: data.operationType,
				// ownerName: data.ownerName,
				ownerDocType: data.ownerDocType,
				ownerDocNumber: data.ownerDocNumber,
				plan: "free",
			}

			console.log(data.categoryId, addressId, error)

			await authClient.organization.create(
				{
					name: data.organizationName,
					slug: data.slug,
					logo: "",
					metadata,
					isActive: true,
					// phone: data.phone,
					docType: data.docType.toLowerCase(),
					// planExpiresAt: new Date(),
					docNumber: data.docNumber,
					categoryId: data.categoryId,
					addressId,
					// isOpen: true,

					keepCurrentActiveOrganization: true,
				} as never,
				{
					onSuccess: () => {
						toast.success("Organização criada!", {
							description: "Seu estabelecimento foi criado com sucesso.",
						})
						navigate(dashboardRoutePaths.home, { replace: true })
						authClient.useActiveOrganization
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

	const handleNext = async () => {
		if (currentStep < steps.length) {
			const isValid = await validateCurrentStep()
			if (isValid) {
				goToNext()
			}
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

					<FormProvider {...methods}>
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
						<span>{currentStep === steps.length ? "Criar" : "Continuar"}</span>
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
