import type { OrderType } from "@/shared/types/commerce-types"
import type { MenuItem } from "@/shared/types/menu-item-types"

export interface CartProductItem {
	kind: "product"
	menuItem: MenuItem
	productId: string
	quantity: number
	notes?: string
	optionalItemIds?: string[]
}

export interface CartComboItem {
	kind: "combo"
	comboOfferId: string
	comboName: string
	comboPrice: number
	quantity: number
	notes?: string
}

export type CartItem = CartProductItem | CartComboItem

export interface CartDraftState {
	orderId: string | null
	updatedAt: string | null
}

export interface Cart {
	items: CartItem[]
	customerId?: string
	customerName?: string
	customerPhone?: string
	tableId?: string
	type: OrderType
	notes?: string
	splitCount?: number
	draft: CartDraftState
}
