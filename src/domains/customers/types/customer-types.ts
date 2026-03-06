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
