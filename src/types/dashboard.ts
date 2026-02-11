export type OrderStatus =
	| "pending"
	| "confirmed"
	| "preparing"
	| "ready"
	| "delivered"
	| "cancelled"
	| "rejected"
export type PaymentMethod = "cash" | "credit" | "debit" | "pix" | "meal_voucher"
export type OrderType = "dine_in" | "takeaway" | "delivery"
export type TableStatus = "available" | "occupied" | "reserved" | "cleaning"
export type UserRole = "owner" | "manager" | "cashier" | "kitchen" | "waiter"

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

export interface RestaurantSettings {
	requireCashierApproval: boolean
	defaultPaymentMethods: PaymentMethod[]
	taxRate: number
	invoicePrefix: string
	theme: "light" | "dark" | "system"
	timezone: string
}

export interface User {
	id: string
	email: string
	name: string
	avatar?: string
	role: UserRole
	restaurants: UserRestaurant[]
	createdAt: Date
}

export interface UserRestaurant {
	organizationId: string
	restaurantName: string
	role: UserRole
	isOwner: boolean
}

export interface MenuItem {
	id: string
	organizationId: string
	name: string
	description: string
	price: number
	category: string
	image: string
	available: boolean
	preparationTime: number
	calories?: number
	allergens?: string[]
	recipe?: Recipe
}

export interface RecipeIngredient {
	inventoryItemId: string
	name: string
	quantity: number
	unit: string
}

export interface Recipe {
	id: string
	menuItemId: string
	ingredients: RecipeIngredient[]
	yield: number
	instructions?: string
}

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

export interface Order {
	id: string
	organizationId: string
	tableId?: string
	customerId?: string
	staffId?: string
	items: OrderItem[]
	status: OrderStatus
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
}

export interface SplitBill {
	id: string
	amount: number
	paymentMethod?: PaymentMethod
	paid: boolean
}

export interface Table {
	id: string
	organizationId: string
	number: number
	capacity: number
	status: TableStatus
	currentOrderId?: string
	section: string
}

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

export interface Staff {
	id: string
	organizationId: string
	name: string
	role: UserRole
	avatar: string
	active: boolean
	pin?: string
}

export interface InventoryItem {
	id: string
	organizationId: string
	name: string
	quantity: number
	unit: string
	minQuantity: number
	category: string
	lastRestocked: Date
	costPerUnit: number
	location?: string
	supplier?: string
}

export interface InventoryTransaction {
	id: string
	inventoryItemId: string
	type: "in" | "out" | "adjustment" | "waste"
	quantity: number
	reason?: string
	orderId?: string
	performedBy: string
	createdAt: Date
}

export interface Notification {
	id: string
	type: "info" | "success" | "warning" | "error"
	title: string
	message: string
	read: boolean
	createdAt: Date
	actionUrl?: string
}

export interface SalesData {
	date: string
	revenue: number
	orders: number
	expenses: number
}

export interface DashboardMetrics {
	revenue: number
	orders: number
	avgTicket: number
	activeTables: number
	lowStockItems: number
}

export interface CartItem {
	menuItem: MenuItem
	quantity: number
	notes?: string
}

export interface Cart {
	items: CartItem[]
	customerId?: string
	tableId?: string
	type: OrderType
	notes?: string
	splitCount?: number
}
