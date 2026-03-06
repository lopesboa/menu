import type { PaymentMethod } from "@/shared/types/commerce-types"
import type { Subscription } from "@/shared/types/subscription-types"

export interface RestaurantSettings {
	requireCashierApproval: boolean
	defaultPaymentMethods: PaymentMethod[]
	taxRate: number
	invoicePrefix: string
	theme: "light" | "dark" | "system"
	timezone: string
}

export interface Restaurant {
	id: string
	ownerId: string
	name: string
	slug: string
	logo?: string
	address: string
	phone: string
	timezone: string
	currency: string
	settings: RestaurantSettings
	subscription: Subscription
	createdAt: Date
	updatedAt: Date
}
