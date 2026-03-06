export interface Customer {
	id: string
	organizationId: string
	name: string
	email: string
	phone: string
	totalOrders: number
	totalSpent: number
	loyaltyPoints: number
	lastVisit: Date
	preferences?: string[]
	avatar?: string
}

export interface CustomerApi {
	id: string
	organizationId: string
	name: string | null
	email: string | null
	phone: string | null
	totalOrders: number | null
	totalSpent: number | null
	loyaltyPoints: number | null
	lastVisit: string | null
	preferences: string[] | null
	avatar: string | null
}
