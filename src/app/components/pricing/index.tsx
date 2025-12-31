import { Icon } from "@iconify-icon/react"
import { Button } from "../ui/button"

export function PricingSection({
	onSignUp,
	onShowDemo,
}: {
	onSignUp: () => void
	onShowDemo: () => void
}) {
	const handleOnSignUp = () => {
		onSignUp()
	}

	const handleOnTalkWithSales = () => {
		onShowDemo()
	}

	return (
		<section id="pricing" className="py-24 relative overflow-hidden">
			<div className="max-w-7xl mx-auto px-6">
				<div className="text-center max-w-2xl mx-auto mb-16 scroll-reveal">
					<h3 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-4">
						Preços simples e transparentes
					</h3>
					<p className="text-slate-400">
						Comece de graça, cresça sem limites. Sem taxas ocultas.
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8 flashlight-container-group">
					<div className="flashlight-card p-8 rounded-2xl bg-[#050505] flex flex-col scroll-reveal delay-100">
						<div className="mb-4">
							<span className="text-sm font-medium text-slate-400">
								Inicial
							</span>
						</div>
						<div className="mb-6">
							<span className="text-4xl font-medium text-white">R$ 0</span>
							<span className="text-slate-500">/mês</span>
						</div>
						<ul className="space-y-4 mb-8 text-sm text-slate-300">
							<li className="flex items-center gap-3">
								<Icon
									icon="solar:check-circle-bold-duotone"
									className="text-slate-500"
								/>{" "}
								Até 50 pedidos/mês
							</li>
							<li className="flex items-center gap-3">
								<Icon
									icon="solar:check-circle-bold-duotone"
									className="text-slate-500"
								/>{" "}
								Analytics básico
							</li>
							<li className="flex items-center gap-3">
								<Icon
									icon="solar:check-circle-bold-duotone"
									className="text-slate-500"
								/>{" "}
								1 Unidade
							</li>
						</ul>

						<Button onClick={handleOnSignUp} variant="secondary">
							Começar Grátis
						</Button>
					</div>

					<div className="flashlight-card p-8 rounded-2xl bg-[#050505] flex flex-col relative scroll-reveal delay-200">
						<div className="absolute top-0 right-0 p-3">
							<div className="px-2 py-1 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-medium uppercase tracking-wider">
								Popular
							</div>
						</div>
						<div className="mb-4">
							<span className="text-sm font-medium text-indigo-400">
								Profissional
							</span>
						</div>
						<div className="mb-6">
							<span className="text-4xl font-medium text-white">R$ 149</span>
							<span className="text-slate-500">/mês</span>
						</div>
						<ul className="space-y-4 mb-8 text-sm text-slate-300">
							<li className="flex items-center gap-3">
								<Icon
									icon="solar:check-circle-bold-duotone"
									className="text-indigo-500"
								/>{" "}
								Pedidos Ilimitados
							</li>
							<li className="flex items-center gap-3">
								<Icon
									icon="solar:check-circle-bold-duotone"
									className="text-indigo-500"
								/>{" "}
								Analytics avançado
							</li>
							<li className="flex items-center gap-3">
								<Icon
									icon="solar:check-circle-bold-duotone"
									className="text-indigo-500"
								/>{" "}
								Até 3 Unidades
							</li>
							<li className="flex items-center gap-3">
								<Icon
									icon="solar:check-circle-bold-duotone"
									className="text-indigo-500"
								/>{" "}
								Controle de Estoque
							</li>
						</ul>

						<Button onClick={handleOnSignUp}>Assinar Pro</Button>
					</div>

					<div className="flashlight-card p-8 rounded-2xl bg-[#050505] flex flex-col scroll-reveal delay-300">
						<div className="mb-4">
							<span className="text-sm font-medium text-slate-400">
								Empresarial
							</span>
						</div>
						<div className="mb-6">
							<span className="text-4xl font-medium text-white">
								Sob Medida
							</span>
						</div>
						<ul className="space-y-4 mb-8 text-sm text-slate-300">
							<li className="flex items-center gap-3">
								<Icon
									icon="solar:check-circle-bold-duotone"
									className="text-slate-500"
								/>{" "}
								Unidades Ilimitadas
							</li>
							<li className="flex items-center gap-3">
								<Icon
									icon="solar:check-circle-bold-duotone"
									className="text-slate-500"
								/>{" "}
								Suporte Dedicado
							</li>
							<li className="flex items-center gap-3">
								<Icon
									icon="solar:check-circle-bold-duotone"
									className="text-slate-500"
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
