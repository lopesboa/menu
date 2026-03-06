import { motion } from "framer-motion"
import {
	Building2,
	Check,
	ChevronRight,
	Crown,
	Download,
	X,
	Zap,
} from "lucide-react"
import { useState } from "react"
import { Modal } from "@/components/ui/modal"
import {
	useBillingActions,
	useBillingSelectors,
} from "@/domains/billing/store/billing-store"
import {
	useRestaurantActions,
	useRestaurantSelectors,
} from "@/domains/restaurant/store/restaurant-store"
import { formatCurrency } from "@/utils/helpers"
import { cn } from "@/utils/misc"

export function BillingPage() {
	const { activeRestaurant, getRestaurants } = useRestaurantSelectors()
	const { setActiveRestaurant } = useRestaurantActions()
	const { plans, billingHistory, getCurrentPlan, getNextPlan } =
		useBillingSelectors()
	const { upgradePlan } = useBillingActions()

	const [showUpgradeModal, setShowUpgradeModal] = useState(false)
	const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

	const currentPlanDetails = getCurrentPlan()
	const nextPlan = getNextPlan()
	const restaurants = getRestaurants()

	return (
		<div className="space-y-6">
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				initial={{ opacity: 0, y: -20 }}
			>
				<h1 className="font-bold text-2xl text-surface-900">
					Plano e Cobrança
				</h1>
				<p className="mt-1 text-surface-500">
					Gerencie sua assinatura e métodos de pagamento
				</p>
			</motion.div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="space-y-6 lg:col-span-2"
					initial={{ opacity: 0, y: 20 }}
				>
					<div className="rounded-2xl border border-surface-100 bg-white p-6">
						<div className="mb-6 flex items-center justify-between">
							<div>
								<h2 className="font-semibold text-lg text-surface-900">
									Plano Atual
								</h2>
								<p className="text-surface-500">
									Seu plano e recursos disponíveis
								</p>
							</div>
							<div className="flex items-center gap-2 rounded-full bg-primary-100 px-4 py-2 font-medium text-primary-700">
								<Crown className="h-5 w-5" />
								{currentPlanDetails.name}
							</div>
						</div>

						<div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
							{[
								{
									label: "Pedidos/mês",
									value:
										currentPlanDetails.limits.ordersPerMonth ===
										Number.POSITIVE_INFINITY
											? "Ilimitado"
											: currentPlanDetails.limits.ordersPerMonth,
								},
								{
									label: "Produtos",
									value:
										currentPlanDetails.limits.products ===
										Number.POSITIVE_INFINITY
											? "Ilimitado"
											: currentPlanDetails.limits.products,
								},
								{
									label: "Funcionários",
									value:
										currentPlanDetails.limits.staff === Number.POSITIVE_INFINITY
											? "Ilimitado"
											: currentPlanDetails.limits.staff,
								},
								{
									label: "Locais",
									value:
										currentPlanDetails.limits.locations ===
										Number.POSITIVE_INFINITY
											? "Ilimitado"
											: currentPlanDetails.limits.locations,
								},
							].map((stat) => (
								<div
									className="rounded-xl bg-surface-50 p-4 text-center"
									key={stat.label}
								>
									<p className="font-bold text-2xl text-surface-900">
										{stat.value}
									</p>
									<p className="text-sm text-surface-500">{stat.label}</p>
								</div>
							))}
						</div>

						{nextPlan && (
							<button
								className="btn-primary w-full gap-2"
								onClick={() => {
									setSelectedPlan(nextPlan.id)
									setShowUpgradeModal(true)
								}}
								type="button"
							>
								<Zap className="h-5 w-5" />
								Upgrade para {nextPlan.name}
							</button>
						)}
					</div>

					<div className="rounded-2xl border border-surface-100 bg-white p-6">
						<h2 className="mb-4 font-semibold text-lg text-surface-900">
							Histórico de Cobranças
						</h2>
						<div className="space-y-3">
							{billingHistory.map((item) => (
								<div
									className="flex items-center justify-between rounded-xl bg-surface-50 p-4"
									key={item.id}
								>
									<div className="flex items-center gap-4">
										<div
											className={cn(
												"flex h-10 w-10 items-center justify-center rounded-full",
												item.status === "paid"
													? "bg-green-100 text-green-600"
													: "bg-red-100 text-red-600"
											)}
										>
											{item.status === "paid" ? (
												<Check className="h-5 w-5" />
											) : (
												<X className="h-5 w-5" />
											)}
										</div>
										<div>
											<p className="font-medium text-surface-900">
												{item.description}
											</p>
											<p className="text-sm text-surface-500">
												{new Date(item.date).toLocaleDateString("pt-BR")}
											</p>
										</div>
									</div>
									<div className="flex items-center gap-4">
										<span className="font-bold text-surface-900">
											{formatCurrency(item.amount)}
										</span>
										<button
											className="rounded-lg p-2 hover:bg-surface-100"
											type="button"
										>
											<Download className="h-4 w-4 text-surface-600" />
										</button>
									</div>
								</div>
							))}
						</div>
					</div>
				</motion.div>

				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="space-y-6"
					initial={{ opacity: 0, y: 20 }}
					transition={{ delay: 0.1 }}
				>
					<div className="rounded-2xl border border-surface-100 bg-white p-6">
						<h2 className="mb-4 font-semibold text-lg text-surface-900">
							Seus Restaurantes
						</h2>
						<div className="space-y-3">
							{restaurants.map((restaurant) => (
								<button
									className={cn(
										"flex w-full items-center gap-4 rounded-xl border-2 p-4 text-left transition-colors",
										activeRestaurant?.id === restaurant.id
											? "border-primary-500 bg-primary-50"
											: "border-surface-100 hover:border-surface-200"
									)}
									key={restaurant.id}
									onClick={() => setActiveRestaurant(restaurant)}
									type="button"
								>
									<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-100">
										<Building2 className="h-6 w-6 text-surface-600" />
									</div>
									<div className="flex-1">
										<p className="font-medium text-surface-900">
											{restaurant.name}
										</p>
										<p className="text-sm text-surface-500 capitalize">
											{restaurant.subscription.plan}
										</p>
									</div>
									<ChevronRight className="h-5 w-5 text-surface-400" />
								</button>
							))}
						</div>
					</div>

					<div className="rounded-2xl bg-linear-to-br from-primary-500 to-primary-600 p-6 text-white">
						<Crown className="mb-4 h-8 w-8" />
						<h3 className="mb-2 font-bold text-lg">
							Precisa de mais recursos?
						</h3>
						<p className="mb-4 text-primary-100">
							Fale com nossa equipe para soluções personalizadas para sua
							empresa.
						</p>
						<button
							className="w-full rounded-lg bg-white/20 py-2 font-medium transition-colors hover:bg-white/30"
							type="button"
						>
							Falar com Vendas
						</button>
					</div>
				</motion.div>
			</div>

			<Modal
				isOpen={showUpgradeModal}
				onClose={() => setShowUpgradeModal(false)}
				size="lg"
				title="Confirmar Upgrade"
			>
				{selectedPlan && (
					<div className="space-y-6">
						<p className="text-surface-600">
							Você está prestes a fazer upgrade para o plano{" "}
							<strong>{plans.find((p) => p.id === selectedPlan)?.name}</strong>.
							{!plans.find((p) => p.id === selectedPlan)?.price &&
								" Este plano é Grátis!"}
							{plans.find((p) => p.id === selectedPlan)?.price &&
								(plans.find((p) => p.id === selectedPlan)?.price ?? 0) > 0 && (
									<>
										{" "}
										O valor será de{" "}
										<strong>
											{formatCurrency(
												plans.find((p) => p.id === selectedPlan)?.price ?? 0
											)}
											/mês
										</strong>
										.
									</>
								)}
						</p>

						<div className="rounded-xl bg-surface-50 p-4">
							<h4 className="mb-2 font-medium text-surface-900">
								Novos limites:
							</h4>
							<ul className="space-y-1">
								<li className="flex items-center gap-2 text-sm">
									<Check className="h-4 w-4 text-green-600" />
									Pedidos:{" "}
									{plans.find((p) => p.id === selectedPlan)?.limits
										.ordersPerMonth === Number.POSITIVE_INFINITY
										? "Ilimitado"
										: plans.find((p) => p.id === selectedPlan)?.limits
												.ordersPerMonth}
									/mês
								</li>
								<li className="flex items-center gap-2 text-sm">
									<Check className="h-4 w-4 text-green-600" />
									Produtos:{" "}
									{plans.find((p) => p.id === selectedPlan)?.limits.products ===
									Number.POSITIVE_INFINITY
										? "Ilimitado"
										: plans.find((p) => p.id === selectedPlan)?.limits.products}
								</li>
								<li className="flex items-center gap-2 text-sm">
									<Check className="h-4 w-4 text-green-600" />
									Locais:{" "}
									{plans.find((p) => p.id === selectedPlan)?.limits
										.locations === Number.POSITIVE_INFINITY
										? "Ilimitado"
										: plans.find((p) => p.id === selectedPlan)?.limits
												.locations}
								</li>
							</ul>
						</div>

						<div className="flex gap-3">
							<button
								className="btn-secondary flex-1"
								onClick={() => setShowUpgradeModal(false)}
								type="button"
							>
								Cancelar
							</button>
							<button
								className="btn-primary flex-1"
								onClick={() => {
									upgradePlan(selectedPlan as never)
									setShowUpgradeModal(false)
								}}
								type="button"
							>
								Confirmar Upgrade
							</button>
						</div>
					</div>
				)}
			</Modal>
		</div>
	)
}
