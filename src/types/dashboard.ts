export type {
	DashboardRevenue,
	DashboardSummary,
	RevenueChartPoint as Daum,
	SalesData,
	SalesRanking,
} from "@/app/routes/dashboard/types/dashboard-analytics-types"
export type { User, UserRestaurant } from "@/domains/auth/types/user-types"
export type { Customer } from "@/domains/customers/types/customer-types"
export type { InventoryItem } from "@/domains/inventory/types/inventory-item-types"
export type { Notification } from "@/domains/notifications/types/notification-types"
export type {
	Order,
	OrderItem,
	OrderStatus,
	SplitBill,
} from "@/domains/orders/types/order.types"
export type { Cart, CartItem } from "@/domains/pos/types/cart-types"
export type {
	Restaurant,
	RestaurantSettings,
} from "@/domains/restaurant/types/restaurant-types"
export type { Table, TableStatus } from "@/domains/tables/types/table.types"
export type { OrderType, PaymentMethod } from "@/shared/types/commerce-types"
export type {
	MenuItem,
	Recipe,
	RecipeIngredient,
} from "@/shared/types/menu-item-types"
export type {
	Subscription,
	SubscriptionPlan,
	SubscriptionStatus,
	SubscriptionTier,
} from "@/shared/types/subscription-types"
export type { UserRole } from "@/shared/types/user-role-types"

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

export interface DashboardMetrics {
	revenue: number
	orders: number
	avgTicket: number
	activeTables: number
	lowStockItems: number
}

export interface Staff {
	id: string
	organizationId: string
	name: string
	role: import("@/shared/types/user-role-types").UserRole
	avatar: string
	active: boolean
	pin?: string
}
