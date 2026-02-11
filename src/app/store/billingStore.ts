import { create } from "zustand"
import type { SubscriptionPlan, SubscriptionTier } from "@/types/dashboard"

export const subscriptionPlans: SubscriptionPlan[] = [
	{
		id: "free",
		name: "FREE",
		price: 0,
		interval: "month",
		features: [
			"até 500 pedidos/mês",
			"até 50 produtos",
			"2 funcionários",
			"1 local",
			"Relatórios básicos",
			"Suporte por email",
		],
		limits: {
			ordersPerMonth: 500,
			products: 50,
			staff: 2,
			locations: 1,
			analytics: "basic",
		},
	},
	{
		id: "pro",
		name: "PRO",
		price: 99,
		interval: "month",
		features: [
			"até 3.000 pedidos/mês",
			"Produtos ilimitados",
			"10 funcionários",
			"3 locais",
			"Relatórios avançados",
			"Integrações (iFood, Uber)",
			"Suporte prioritário",
			"Kitchen Display System",
		],
		limits: {
			ordersPerMonth: 3000,
			products: -1,
			staff: 10,
			locations: 3,
			analytics: "advanced",
		},
	},
	{
		id: "enterprise",
		name: "ENTERPRISE",
		price: 299,
		interval: "month",
		features: [
			"Pedidos ilimitados",
			"Produtos ilimitados",
			"Funcionários ilimitados",
			"Locais ilimitados",
			"Analytics completo",
			"API Access",
			"Dedicated support",
			"White-label options",
			"Custom integrations",
		],
		limits: {
			ordersPerMonth: Number.POSITIVE_INFINITY,
			products: -1,
			staff: Number.POSITIVE_INFINITY,
			locations: Number.POSITIVE_INFINITY,
			analytics: "full",
		},
	},
]

interface BillingState {
	plans: SubscriptionPlan[]
	currentPlan: SubscriptionTier
	billingHistory: Array<{
		id: string
		date: Date
		amount: number
		description: string
		status: "paid" | "pending" | "failed"
	}>
	upgradePlan: (planId: SubscriptionTier) => void
	cancelSubscription: () => void
	getCurrentPlan: () => SubscriptionPlan
	getNextPlan: () => SubscriptionPlan | null
}

export const useBillingStore = create<BillingState>((set, get) => ({
	plans: subscriptionPlans,
	currentPlan: "pro",
	billingHistory: [
		{
			id: "inv-001",
			date: new Date("2025-01-01"),
			amount: 99,
			description: "Plano PRO - Janeiro 2025",
			status: "paid",
		},
		{
			id: "inv-002",
			date: new Date("2024-12-01"),
			amount: 99,
			description: "Plano PRO - Dezembro 2024",
			status: "paid",
		},
		{
			id: "inv-003",
			date: new Date("2024-11-01"),
			amount: 99,
			description: "Plano PRO - Novembro 2024",
			status: "paid",
		},
	],
	upgradePlan: (planId) => {
		set({ currentPlan: planId })
	},
	cancelSubscription: () => {
		// TODO: Implement cancel subscription logic
	},
	getCurrentPlan: () => {
		const { currentPlan, plans } = get()
		return plans.find((p) => p.id === currentPlan) || plans[0]
	},
	getNextPlan: () => {
		const { currentPlan, plans } = get()
		const currentIndex = plans.findIndex((p) => p.id === currentPlan)
		return currentIndex < plans.length - 1 ? plans[currentIndex + 1] : null
	},
}))
