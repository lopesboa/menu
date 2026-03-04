import { Icon } from "@iconify-icon/react"
import { Link } from "react-router"
import { Button } from "../ui/button"

export function PricingSection({ onShowDemo }: { onShowDemo: () => void }) {
	const handleOnTalkWithSales = () => {
		onShowDemo()
	}

	return (
		<section className="relative overflow-hidden py-24" id="pricing">
			<div className="mx-auto max-w-7xl px-6">
				<div className="scroll-reveal mx-auto mb-16 max-w-2xl text-center">
					<h3 className="mb-4 font-medium text-3xl text-white tracking-tight md:text-4xl">
						Preços simples e transparentes
					</h3>
					<p className="text-slate-400">
						Comece de graça, cresça sem limites. Sem taxas ocultas.
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

						<Button variant="secondary">
							<Link aria-label="Navegar para criar conta" to="/register">
								Começar Grátis
							</Link>
						</Button>
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

						<Button>
							<Link aria-label="Navegar para criar conta" to="/register">
								Assinar Pro
							</Link>
						</Button>
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

						<Button onClick={handleOnTalkWithSales} variant="secondary">
							Falar com Vendas
						</Button>
					</div>
				</div>
			</div>
		</section>
	)
}
