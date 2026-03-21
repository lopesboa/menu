import { Icon } from "@iconify-icon/react"
import { Link } from "react-router"
import { usePostHogEvent } from "@/hooks/use-posthog"
import { AnalyticsEvents } from "@/lib/analytics/events"
import { buildLandingEventProperties } from "@/lib/analytics/landing"
import { Button } from "../ui/button"

export function PricingSection({
	onShowDemo,
	onStartRegister,
}: {
	onShowDemo: (params: { ctaLabel: string; ctaPosition: string }) => void
	onStartRegister: (params: {
		ctaLabel: string
		ctaPosition: string
		plan?: string
	}) => void
}) {
	const { capture } = usePostHogEvent()

	const handlePlanSelection = ({
		ctaLabel,
		ctaPosition,
		plan,
	}: {
		ctaLabel: string
		ctaPosition: string
		plan: string
	}) => {
		const properties = buildLandingEventProperties({
			cta_label: ctaLabel,
			cta_position: ctaPosition,
			plan,
		})

		capture(AnalyticsEvents.PRICING_PLAN_SELECTED, properties)
	}

	const handleRegisterPlan = ({
		ctaLabel,
		ctaPosition,
		plan,
	}: {
		ctaLabel: string
		ctaPosition: string
		plan: string
	}) => {
		handlePlanSelection({ ctaLabel, ctaPosition, plan })
		onStartRegister({ ctaLabel, ctaPosition, plan })
	}

	const handleOnTalkWithSales = () => {
		handlePlanSelection({
			ctaLabel: "Falar com especialista",
			ctaPosition: "pricing_enterprise",
			plan: "empresarial",
		})
		onShowDemo({
			ctaLabel: "Falar com especialista",
			ctaPosition: "pricing_enterprise",
		})
	}

	return (
		<section className="relative overflow-hidden py-24" id="pricing">
			<div className="mx-auto max-w-7xl px-6">
				<div className="scroll-reveal mx-auto mb-16 max-w-2xl text-center">
					<h3 className="mb-4 font-medium text-3xl text-white tracking-tight md:text-4xl">
						Escolha o plano certo para o seu momento
					</h3>
					<p className="text-slate-400">
						Comece com o que faz sentido hoje e ajuste conforme sua operação
						cresce.
					</p>
				</div>

				<div className="flashlight-container-group grid gap-8 md:grid-cols-3">
					<div className="flashlight-card scroll-reveal flex flex-col rounded-2xl bg-background p-8 delay-100">
						<div className="mb-4">
							<span className="font-medium text-slate-400 text-sm">
								Inicial
							</span>
						</div>
						<div className="mb-6">
							<span className="font-medium text-4xl text-white">R$ 0</span>
							<span className="text-slate-500">/mês</span>
						</div>
						<p className="mb-4 text-slate-400 text-sm">
							<span className="font-medium text-slate-300">Para quem é:</span>{" "}
							operações que estão começando no digital e querem validar a
							demanda sem custo fixo.
						</p>
						<ul className="mb-8 space-y-4 text-slate-300 text-sm">
							<li className="flex items-center gap-3">
								<Icon
									className="text-slate-500"
									icon="solar:check-circle-bold-duotone"
								/>{" "}
								Até 50 pedidos/mês
							</li>
							<li className="flex items-center gap-3">
								<Icon
									className="text-slate-500"
									icon="solar:check-circle-bold-duotone"
								/>{" "}
								Analytics básico
							</li>
							<li className="flex items-center gap-3">
								<Icon
									className="text-slate-500"
									icon="solar:check-circle-bold-duotone"
								/>{" "}
								1 Unidade
							</li>
						</ul>

						<div className="mt-auto space-y-3">
							<p className="text-slate-500 text-xs">
								Sem compromisso de longo prazo. Ajuste ou cancele conforme as
								condições vigentes.
							</p>
							<Button variant="secondary">
								<Link
									aria-label="Navegar para criar conta grátis"
									onClick={() => {
										handleRegisterPlan({
											ctaLabel: "Criar conta grátis",
											ctaPosition: "pricing_starter",
											plan: "inicial",
										})
									}}
									to="/register"
								>
									Criar conta grátis
								</Link>
							</Button>
						</div>
					</div>

					<div className="flashlight-card scroll-reveal relative flex flex-col rounded-2xl bg-background p-8 delay-200">
						<div className="absolute top-0 right-0 p-3">
							<div className="rounded border border-indigo-500/20 bg-indigo-500/10 px-2 py-1 font-medium text-[10px] text-indigo-400 uppercase tracking-wider">
								Popular
							</div>
						</div>
						<div className="mb-4">
							<span className="font-medium text-indigo-400 text-sm">
								Profissional
							</span>
						</div>
						<div className="mb-6">
							<span className="font-medium text-4xl text-white">R$ 49,90</span>
							<span className="text-slate-500">/mês</span>
						</div>
						<p className="mb-4 text-slate-400 text-sm">
							<span className="font-medium text-slate-300">Para quem é:</span>{" "}
							restaurantes em crescimento que precisam de escala e mais controle
							no dia a dia.
						</p>
						<ul className="mb-8 space-y-4 text-slate-300 text-sm">
							<li className="flex items-center gap-3">
								<Icon
									className="text-indigo-500"
									icon="solar:check-circle-bold-duotone"
								/>{" "}
								Pedidos Ilimitados
							</li>
							<li className="flex items-center gap-3">
								<Icon
									className="text-indigo-500"
									icon="solar:check-circle-bold-duotone"
								/>{" "}
								Analytics avançado
							</li>
							<li className="flex items-center gap-3">
								<Icon
									className="text-indigo-500"
									icon="solar:check-circle-bold-duotone"
								/>{" "}
								Até 3 Unidades
							</li>
							<li className="flex items-center gap-3">
								<Icon
									className="text-indigo-500"
									icon="solar:check-circle-bold-duotone"
								/>{" "}
								Controle de Estoque
							</li>
						</ul>

						<div className="mt-auto space-y-3">
							<p className="text-slate-500 text-xs">
								Assinatura mensal com possibilidade de ajuste conforme
								sazonalidade e volume.
							</p>
							<Button>
								<Link
									aria-label="Navegar para assinar plano profissional"
									onClick={() => {
										handleRegisterPlan({
											ctaLabel: "Assinar Profissional",
											ctaPosition: "pricing_professional",
											plan: "profissional",
										})
									}}
									to="/register"
								>
									Assinar Profissional
								</Link>
							</Button>
						</div>
					</div>

					<div className="flashlight-card scroll-reveal flex flex-col rounded-2xl bg-background p-8 delay-300">
						<div className="mb-4">
							<span className="font-medium text-slate-400 text-sm">
								Empresarial
							</span>
						</div>
						<div className="mb-6">
							<span className="font-medium text-4xl text-white">
								Sob Medida
							</span>
						</div>
						<p className="mb-4 text-slate-400 text-sm">
							<span className="font-medium text-slate-300">Para quem é:</span>{" "}
							redes e operações multiunidade com demandas avançadas de gestão.
						</p>
						<ul className="mb-8 space-y-4 text-slate-300 text-sm">
							<li className="flex items-center gap-3">
								<Icon
									className="text-slate-500"
									icon="solar:check-circle-bold-duotone"
								/>{" "}
								Unidades Ilimitadas
							</li>
							<li className="flex items-center gap-3">
								<Icon
									className="text-slate-500"
									icon="solar:check-circle-bold-duotone"
								/>{" "}
								Suporte Dedicado
							</li>
							<li className="flex items-center gap-3">
								<Icon
									className="text-slate-500"
									icon="solar:check-circle-bold-duotone"
								/>{" "}
								Acesso à API
							</li>
						</ul>

						<div className="mt-auto space-y-3">
							<p className="text-slate-500 text-xs">
								Escopo definido antes da contratação, com implantação guiada e
								acompanhamento inicial.
							</p>
							<Button onClick={handleOnTalkWithSales} variant="secondary">
								Falar com especialista
							</Button>
						</div>
					</div>
				</div>

				<p className="mt-8 text-center text-slate-500 text-xs">
					Suporte humano em horário comercial, com níveis de atendimento de
					acordo com o plano.
				</p>
			</div>
		</section>
	)
}
