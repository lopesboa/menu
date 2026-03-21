import { zodResolver } from "@hookform/resolvers/zod"
import { Icon } from "@iconify-icon/react"
import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { Link } from "react-router"
import { z } from "zod/v4"
import { DEMO_SALES_ID } from "@/app/constants"
import { useDialog, useDialogActions } from "@/app/store/dialog"
import { ErrorList, Field } from "@/components/form"
import { usePostHogEvent } from "@/hooks/use-posthog"
import { AnalyticsEvents } from "@/lib/analytics/events"
import {
	buildLandingEventProperties,
	rememberLandingRegisterIntent,
} from "@/lib/analytics/landing"
import {
	type DemoRequestResult,
	submitDemoRequest,
} from "@/services/demo-request-service"
import { cn } from "@/utils/misc"
import { Button } from "../ui/button"
import { Dialog } from "../ui/dialog"

const unitsOptions = [
	"1 a 2 unidades",
	"3 a 10 unidades",
	"11 ou mais unidades",
] as const

const demoSalesSchema = z.object({
	name: z.string().trim().min(2, "Informe seu nome"),
	email: z
		.email("Informe um e-mail valido")
		.transform((value) => value.toLowerCase()),
	restaurantName: z.string().trim().min(2, "Informe o nome do restaurante"),
	whatsapp: z
		.string()
		.trim()
		.refine((value) => value.replace(/\D/g, "").length >= 10, {
			message: "Informe um WhatsApp com DDD",
		}),
	units: z.enum(unitsOptions, {
		error: "Selecione a quantidade de unidades",
	}),
})

type DemoSalesForm = z.infer<typeof demoSalesSchema>

export function DemoSales() {
	const { closeDialog } = useDialogActions()
	const { dialogs } = useDialog()
	const { capture } = usePostHogEvent()
	const [loading, setLoading] = useState(false)
	const [hasTrackedStart, setHasTrackedStart] = useState(false)
	const [submitError, setSubmitError] = useState<string | null>(null)
	const [successTransport, setSuccessTransport] = useState<
		DemoRequestResult["transport"] | null
	>(null)

	const shouldScale = !dialogs[DEMO_SALES_ID]
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<DemoSalesForm>({
		resolver: zodResolver(demoSalesSchema),
		mode: "onBlur",
		defaultValues: {
			name: "",
			email: "",
			restaurantName: "",
			whatsapp: "",
			units: undefined,
		},
	})

	const handleCloseDemoSales = () => {
		setSubmitError(null)
		setSuccessTransport(null)
		setHasTrackedStart(false)
		reset()
		closeDialog(DEMO_SALES_ID)
	}

	const handleGoToRegister = () => {
		const properties = buildLandingEventProperties({
			cta_label: "Criar conta grátis",
			cta_position: "demo_success_primary",
		})

		capture(AnalyticsEvents.CTA_CLICKED, properties)
		capture(AnalyticsEvents.REGISTER_STARTED, properties)
		rememberLandingRegisterIntent(properties)
		handleCloseDemoSales()
	}

	const handleDemoStart = () => {
		if (hasTrackedStart) {
			return
		}

		capture(
			AnalyticsEvents.DEMO_STARTED,
			buildLandingEventProperties({
				cta_label: "Quero agendar minha demo",
				cta_position: "demo_modal",
			})
		)
		setHasTrackedStart(true)
	}

	const onSubmit: SubmitHandler<DemoSalesForm> = async (data) => {
		try {
			setLoading(true)
			setSubmitError(null)
			capture(
				AnalyticsEvents.DEMO_SUBMITTED,
				buildLandingEventProperties({
					cta_label: "Quero agendar minha demo",
					cta_position: "demo_modal",
					units: data.units,
				})
			)
			const result = await submitDemoRequest(data)
			capture(
				AnalyticsEvents.DEMO_SUCCESS,
				buildLandingEventProperties({
					cta_label: "Quero agendar minha demo",
					cta_position: "demo_modal",
					units: data.units,
				})
			)
			setSuccessTransport(result.transport)
			reset()
		} catch (error) {
			setSubmitError(
				error instanceof Error && error.message
					? error.message
					: "No momento, nao conseguimos concluir o agendamento. Tente novamente em alguns minutos ou crie sua conta gratis para seguir no self-service."
			)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Dialog id={DEMO_SALES_ID}>
			<div
				className={cn(
					"relative w-full max-w-lg transform rounded-2xl border border-white/10 bg-[#0f111a] p-8 shadow-2xl transition-all duration-300",
					shouldScale ? "scale-95" : ""
				)}
			>
				<button
					className="absolute top-4 right-4 text-slate-500 transition-colors hover:text-white"
					name="Fechar Demo"
					onClick={handleCloseDemoSales}
					type="button"
				>
					<Icon icon="solar:close-circle-bold-duotone" width="24" />
				</button>

				<div className="mb-8 space-y-2 text-center">
					<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
						<Icon icon="solar:chat-round-dots-bold-duotone" width="24" />
					</div>
					<h3 className="font-semibold text-2xl text-white tracking-tight">
						Veja, em poucos minutos, como o Menu Bão funciona no seu restaurante
					</h3>
					<p className="text-slate-400 text-sm">
						Agende uma demo rápida e prática para entender como vender mais com
						menos operação manual.
					</p>
				</div>

				{successTransport ? (
					<div className="space-y-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 text-center">
						<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
							<Icon icon="solar:check-read-bold-duotone" width="24" />
						</div>
						<div className="space-y-2">
							<h4 className="font-semibold text-lg text-white tracking-tight">
								{successTransport === "backend"
									? "Recebemos seu pedido de demo"
									: "Seu pedido de demo esta pronto para envio"}
							</h4>
							<p className="text-slate-300 text-sm">
								{successTransport === "backend"
									? "Nosso time comercial entra em contato em ate 24h uteis para combinar o melhor horario."
									: "Abrimos o canal de contato com sua mensagem preenchida. Envie a mensagem para concluir o agendamento."}
							</p>
						</div>
						<div className="flex flex-col gap-3 sm:flex-row">
							<Button className="mt-0" onClick={handleCloseDemoSales}>
								Fechar
							</Button>
							<Link
								aria-label="Navegar para criar conta grátis"
								className="relative mt-auto flex w-full items-center justify-center rounded-lg border border-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/5 sm:w-auto"
								onClick={handleGoToRegister}
								to="/register"
							>
								Criar conta grátis
							</Link>
						</div>
					</div>
				) : (
					<form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
						<Field
							errors={[errors.name?.message]}
							inputProps={{
								autoComplete: "name",
								iconName: "solar:user-bold-duotone",
								onFocus: handleDemoStart,
								placeholder: "Ex.: Ana",
								type: "text",
								...register("name"),
							}}
							label="Nome"
						/>
						<Field
							errors={[errors.email?.message]}
							inputProps={{
								autoComplete: "email",
								iconName: "solar:letter-bold-duotone",
								placeholder: "nome@restaurante.com.br",
								type: "email",
								...register("email"),
							}}
							label="E-mail de trabalho"
						/>
						<Field
							errors={[errors.restaurantName?.message]}
							inputProps={{
								autoComplete: "organization",
								iconName: "solar:shop-bold-duotone",
								placeholder: "Ex.: Sabor da Vila",
								type: "text",
								...register("restaurantName"),
							}}
							label="Nome do restaurante"
						/>
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<Field
								errors={[errors.whatsapp?.message]}
								inputProps={{
									autoComplete: "tel",
									iconName: "solar:phone-bold-duotone",
									placeholder: "(11) 99999-9999",
									type: "tel",
									...register("whatsapp"),
								}}
								label="WhatsApp"
							/>
							<div className="space-y-2">
								<span className="font-medium text-slate-300 text-sm">
									Quantidade de unidades
								</span>
								<select
									className={cn(
										"w-full cursor-pointer appearance-none rounded-lg border border-white/10 bg-black/50 px-4 py-2.5 text-sm text-white transition-all focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/50",
										errors.units ? "border-red-400" : undefined
									)}
									defaultValue=""
									{...register("units")}
								>
									<option disabled value="">
										Selecione
									</option>
									{unitsOptions.map((option) => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
								<ErrorList errors={[errors.units?.message]} />
							</div>
						</div>
						{submitError ? (
							<p className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-red-200 text-xs leading-relaxed">
								{submitError}
							</p>
						) : null}
						<Button
							className="mt-9 gap-2 py-3 shadow-lg"
							loading={loading}
							type="submit"
						>
							Quero agendar minha demo
						</Button>
						<p className="mt-4 text-center text-[10px] text-slate-600">
							Retorno em ate 24h uteis. Seus dados sao usados apenas para
							agendar a demo.
						</p>
					</form>
				)}
			</div>
		</Dialog>
	)
}
