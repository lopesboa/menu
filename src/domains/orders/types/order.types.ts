export type OrderStatus =
	| "pending"
	| "confirmed"
	| "preparing"
	| "ready"
	| "delivered"
	| "cancelled"
	| "rejected"
	| "unknown"

export type PaymentMethod = "cash" | "credit" | "debit" | "pix" | "meal_voucher"

export type OrderType = "dine_in" | "takeaway" | "delivery"

export interface OrderItem {
	id: string
	menuItemId: string
	name: string
	quantity: number
	price: number
	notes?: string
	status: OrderStatus
	recipeUsed?: boolean
}

export interface SplitBill {
	id: string
	amount: number
	paymentMethod?: PaymentMethod
	paid: boolean
}

export interface Order {
	id: string
	organizationId: string
	tableId?: string
	customerId?: string
	staffId?: string
	orderItems: OrderItem[]
	status: OrderStatus
	stage?: OrderStatus
	channel?: OrderType
	delayed?: boolean
	approvalStatus?: "pending" | "approved" | "rejected"
	approvedBy?: string
	approvalNotes?: string
	type: OrderType
	subtotal: number
	tax: number
	discount: number
	total: number
	paymentMethod?: PaymentMethod
	paymentStatus: "pending" | "paid" | "refunded"
	splitBill?: SplitBill[]
	createdAt: Date
	updatedAt: Date
	customerName?: string
	notes?: string
	orderNumber: number
	itemsCount?: number
}
