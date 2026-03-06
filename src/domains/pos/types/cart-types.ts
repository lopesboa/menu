import type { OrderType } from "@/shared/types/commerce-types"
import type { MenuItem } from "@/shared/types/menu-item-types"

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
