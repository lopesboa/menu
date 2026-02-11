import { create } from "zustand"
import type { Restaurant, SubscriptionTier } from "@/types/dashboard"

interface RestaurantState {
	activeRestaurant: Restaurant | null
	setActiveRestaurant: (restaurant: Restaurant) => void
	getRestaurants: () => Restaurant[]
}

const mockRestaurants: Restaurant[] = [
	{
		id: "rest-1",
		ownerId: "user-1",
		name: "MenuBao Restaurant",
		slug: "menubao-restaurant",
		address: "Av. Paulista, 1000 - São Paulo, SP",
		phone: "(11) 3333-0000",
		timezone: "America/Sao_Paulo",
		currency: "BRL",
		settings: {
			requireCashierApproval: false,
			defaultPaymentMethods: ["cash", "pix", "credit", "debit"],
			taxRate: 10,
			invoicePrefix: "MB",
			theme: "light",
			timezone: "America/Sao_Paulo",
		},
		subscription: {
			id: "sub-1",
			organizationId: "rest-1",
			plan: "pro" as SubscriptionTier,
			status: "active",
			currentPeriodStart: new Date("2025-01-01"),
			currentPeriodEnd: new Date("2026-01-01"),
			cancelAtPeriodEnd: false,
		},
		createdAt: new Date("2024-01-01"),
		updatedAt: new Date(),
	},
	{
		id: "rest-2",
		ownerId: "user-1",
		name: "Sabor do Brasil",
		slug: "sabor-do-brasil",
		address: "Av. Rebouças, 500 - São Paulo, SP",
		phone: "(11) 4444-0000",
		timezone: "America/Sao_Paulo",
		currency: "BRL",
		settings: {
			requireCashierApproval: true,
			defaultPaymentMethods: ["cash", "pix", "credit"],
			taxRate: 8,
			invoicePrefix: "SB",
			theme: "dark",
			timezone: "America/Sao_Paulo",
		},
		subscription: {
			id: "sub-2",
			organizationId: "rest-2",
			plan: "free" as SubscriptionTier,
			status: "active",
			currentPeriodStart: new Date("2025-01-01"),
			currentPeriodEnd: new Date("2026-01-01"),
			cancelAtPeriodEnd: false,
		},
		createdAt: new Date("2024-06-01"),
		updatedAt: new Date(),
	},
]

export const useRestaurantStore = create<RestaurantState>((set) => ({
	activeRestaurant: mockRestaurants[0],
	setActiveRestaurant: (restaurant) => set({ activeRestaurant: restaurant }),
	getRestaurants: () => mockRestaurants,
}))
