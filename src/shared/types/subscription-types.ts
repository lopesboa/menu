export type SubscriptionTier = "free" | "pro" | "enterprise"

export type SubscriptionStatus = "active" | "cancelled" | "expired" | "trial"

export interface SubscriptionPlan {
	id: SubscriptionTier
	name: string
	price: number
	interval: "month" | "year"
	features: string[]
	limits: {
		ordersPerMonth: number
		products: number
		staff: number
		locations: number
		analytics: "basic" | "advanced" | "full"
	}
}

export interface Subscription {
	id: string
	organizationId: string
	plan: SubscriptionTier
	status: SubscriptionStatus
	currentPeriodStart: Date
	currentPeriodEnd: Date
	cancelAtPeriodEnd: boolean
}
