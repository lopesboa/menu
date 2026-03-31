import { motion } from "framer-motion"
import { Building2, Check, ChevronRight, Crown } from "lucide-react"
import { useState } from "react"
import { Modal } from "@/components/ui/modal"
import {
	useBillingActions,
	useBillingSelectors,
} from "@/domains/billing/store/billing-store"
import {
	setActiveOrganization,
	useOrganization,
	useOrganizationList,
} from "@/domains/restaurant/hooks/use-organization"
import { useRestaurantSelectors } from "@/domains/restaurant/store/restaurant-store"
import { formatCurrency } from "@/utils/helpers"
import { cn } from "@/utils/misc"

export function BillingPage() {
	const { activeRestaurant } = useRestaurantSelectors()
	const { organizations: restaurants } = useOrganizationList()
	const { organization: currentOrg } = useOrganization()
	const { plans, billingHistory, getCurrentPlan } = useBillingSelectors()
	const { upgradePlan } = useBillingActions()

	const [showUpgradeModal, setShowUpgradeModal] = useState(false)
	const [selectedPlan, setSelectedPlan] = useState<string | null>(null)

	const currentPlanDetails = getCurrentPlan()

	const subscriptionPlan = currentOrg?.subscription?.plan ?? "free"

	const handleSelectRestaurant = async (orgId: string) => {
		await setActiveOrganization(orgId)
	}

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

			{currentPlanDetails && (
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="rounded-2xl bg-linear-to-br from-primary-500 to-primary-600 p-6 text-white"
					initial={{ opacity: 0, y: -20 }}
					transition={{ delay: 0.1 }}
				>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-primary-200 text-sm">Plano atual</p>
							<h2 className="mt-1 font-bold text-2xl capitalize">
								{subscriptionPlan}
							</h2>
							<p className="mt-2 text-primary-200">
								{formatCurrency(currentPlanDetails.price)}/mês
							</p>
						</div>
						{currentPlanDetails.id !== "pro" && (
							<button
								className="rounded-lg bg-white/20 px-4 py-2 font-medium transition-colors hover:bg-white/30"
								onClick={() => setShowUpgradeModal(true)}
								type="button"
							>
								Upgrade
							</button>
						)}
					</div>
				</motion.div>
			)}

			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="grid grid-cols-1 gap-6 md:grid-cols-3"
				initial={{ opacity: 0, y: -20 }}
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
								onClick={() => handleSelectRestaurant(restaurant.id)}
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
										{activeRestaurant?.id === restaurant.id
											? subscriptionPlan
											: "ver plano"}
									</p>
								</div>
								<ChevronRight className="h-5 w-5 text-surface-400" />
							</button>
						))}
					</div>
				</div>

				<div className="rounded-2xl bg-linear-to-br from-primary-500 to-primary-600 p-6 text-white">
					<Crown className="mb-4 h-8 w-8" />
					<h3 className="mb-2 font-bold text-lg">Precisa de mais recursos?</h3>
					<p className="mb-4 text-primary-100">
						Fale com nossa equipe para soluções personalizadas para sua empresa.
					</p>
					<button
						className="w-full rounded-lg bg-white/20 py-2 font-medium transition-colors hover:bg-white/30"
						type="button"
					>
						Falar com Vendas
					</button>
				</div>

				<div className="rounded-2xl border border-surface-100 bg-white p-6">
					<h2 className="mb-4 font-semibold text-lg text-surface-900">
						Histórico de Cobranças
					</h2>
					{billingHistory.length === 0 ? (
						<p className="text-surface-500">Nenhuma cobrança encontrada.</p>
					) : (
						<div className="space-y-3">
							{billingHistory.slice(0, 5).map((item) => (
								<div
									className="flex items-center justify-between border-surface-100 border-b pb-3"
									key={item.id}
								>
									<div>
										<p className="font-medium text-surface-900">
											{item.description}
										</p>
										<p className="text-sm text-surface-500">
											{item.date.toLocaleDateString("pt-BR")}
										</p>
									</div>
									<p className="font-medium text-surface-900">
										{formatCurrency(item.amount)}
									</p>
								</div>
							))}
						</div>
					)}
				</div>
			</motion.div>

			<Modal
				isOpen={showUpgradeModal}
				onClose={() => setShowUpgradeModal(false)}
				title="Escolha seu plano"
			>
				<div className="space-y-4">
					{plans.map((plan) => (
						<button
							className={cn(
								"flex w-full items-center justify-between rounded-xl border-2 p-4 text-left transition-colors",
								selectedPlan === plan.id
									? "border-primary-500 bg-primary-50"
									: "border-surface-100 hover:border-surface-200"
							)}
							key={plan.id}
							onClick={() => setSelectedPlan(plan.id)}
							type="button"
						>
							<div>
								<p className="font-medium text-surface-900">{plan.name}</p>
								<p className="text-sm text-surface-500">
									{formatCurrency(plan.price)}/mês
								</p>
							</div>
							{selectedPlan === plan.id && (
								<Check className="h-5 w-5 text-primary-500" />
							)}
						</button>
					))}
					<button
						className="btn-primary w-full"
						disabled={!selectedPlan || selectedPlan === currentPlanDetails?.id}
						onClick={() => {
							if (selectedPlan) {
								upgradePlan(selectedPlan as "free" | "pro" | "enterprise")
								setShowUpgradeModal(false)
							}
						}}
						type="button"
					>
						Confirmar Upgrade
					</button>
				</div>
			</Modal>
		</div>
	)
}
