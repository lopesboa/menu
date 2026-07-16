import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { MenuItem } from "@/shared/types/menu-item-types"
import type {
	Cart,
	CartComboItem,
	CartDraftState,
	CartItem,
	CartProductItem,
} from "../types/cart-types"

function getItemKey(item: CartItem): string {
	if (item.kind === "combo") {
		return `combo:${item.comboOfferId}`
	}

	return `product:${item.productId}`
}

interface CartState extends Cart {
	addProductItem: (
		menuItem: MenuItem,
		quantity?: number,
		notes?: string,
		optionalItemIds?: string[]
	) => void
	addComboItem: (
		comboOfferId: string,
		comboName: string,
		comboPrice: number,
		quantity?: number,
		notes?: string
	) => void
	removeItem: (itemKey: string) => void
	updateQuantity: (itemKey: string, quantity: number) => void
	updateNotes: (itemKey: string, notes: string) => void
	clearCart: () => void
	setCustomerId: (customerId?: string) => void
	setCustomerName: (customerName?: string) => void
	setCustomerPhone: (customerPhone?: string) => void
	setTableId: (tableId?: string) => void
	setType: (type: Cart["type"]) => void
	setNotes: (notes: string) => void
	setSplitCount: (count: number) => void
	setDraft: (draft: CartDraftState) => void
	clearDraft: () => void
	getPreviewSubtotal: () => number
	getPreviewTotal: (taxRate: number) => number
}

const INITIAL_DRAFT: CartDraftState = {
	orderId: null,
	updatedAt: null,
}

const initialCart: Cart = {
	items: [],
	type: "dine_in",
	draft: INITIAL_DRAFT,
}

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			...initialCart,

			addProductItem: (menuItem, quantity, notes, optionalItemIds) => {
				const items = [...get().items]
				const key = `product:${menuItem.id}`
				const existingIndex = items.findIndex((i) => getItemKey(i) === key)
				const qty = quantity ?? 1

				if (existingIndex >= 0) {
					const existing = items[existingIndex] as CartProductItem
					items[existingIndex] = {
						...existing,
						quantity: existing.quantity + qty,
						...(notes ? { notes } : {}),
						...(optionalItemIds ? { optionalItemIds } : {}),
					}
				} else {
					const newItem: CartProductItem = {
						kind: "product",
						menuItem,
						productId: menuItem.id,
						quantity: qty,
						notes,
						optionalItemIds,
					}
					items.push(newItem)
				}

				set({ items })
			},

			addComboItem: (comboOfferId, comboName, comboPrice, quantity, notes) => {
				const items = [...get().items]
				const key = `combo:${comboOfferId}`
				const existingIndex = items.findIndex((i) => getItemKey(i) === key)
				const qty = quantity ?? 1

				if (existingIndex >= 0) {
					const existing = items[existingIndex] as CartComboItem
					items[existingIndex] = {
						...existing,
						quantity: existing.quantity + qty,
						...(notes ? { notes } : {}),
					}
				} else {
					const newItem: CartComboItem = {
						kind: "combo",
						comboOfferId,
						comboName,
						comboPrice,
						quantity: qty,
						notes,
					}
					items.push(newItem)
				}

				set({ items })
			},

			removeItem: (itemKey) => {
				set({
					items: get().items.filter((i) => getItemKey(i) !== itemKey),
				})
			},

			updateQuantity: (itemKey, quantity) => {
				if (quantity <= 0) {
					get().removeItem(itemKey)
					return
				}
				set({
					items: get().items.map((i) =>
						getItemKey(i) === itemKey ? { ...i, quantity } : i
					),
				})
			},

			updateNotes: (itemKey, notes) => {
				set({
					items: get().items.map((i) =>
						getItemKey(i) === itemKey ? { ...i, notes } : i
					),
				})
			},

			clearCart: () =>
				set({
					items: [],
					customerId: undefined,
					customerName: undefined,
					customerPhone: undefined,
					notes: undefined,
					draft: INITIAL_DRAFT,
				}),

			setCustomerId: (customerId) => set({ customerId }),
			setCustomerName: (customerName) => set({ customerName }),
			setCustomerPhone: (customerPhone) => set({ customerPhone }),
			setTableId: (tableId) => set({ tableId }),
			setType: (type) => set({ type }),
			setNotes: (notes) => set({ notes }),
			setSplitCount: (splitCount) => set({ splitCount }),

			setDraft: (draft) => set({ draft }),
			clearDraft: () => set({ draft: INITIAL_DRAFT }),

			getPreviewSubtotal: () => {
				return get().items.reduce((sum, item) => {
					if (item.kind === "product") {
						return sum + +item.menuItem.price * item.quantity
					}

					return sum + item.comboPrice * item.quantity
				}, 0)
			},

			getPreviewTotal: (taxRate) => {
				const subtotal = get().getPreviewSubtotal()
				return subtotal + subtotal * (taxRate / 100)
			},
		}),
		{
			name: "cart-storage",
		}
	)
)

export const useCartSelectors = () => {
	const items = useCartStore((state) => state.items)
	const type = useCartStore((state) => state.type)
	const customerId = useCartStore((state) => state.customerId)
	const customerName = useCartStore((state) => state.customerName)
	const customerPhone = useCartStore((state) => state.customerPhone)
	const tableId = useCartStore((state) => state.tableId)
	const notes = useCartStore((state) => state.notes)
	const splitCount = useCartStore((state) => state.splitCount)
	const draft = useCartStore((state) => state.draft)
	const getPreviewSubtotal = useCartStore((state) => state.getPreviewSubtotal)
	const getPreviewTotal = useCartStore((state) => state.getPreviewTotal)

	return {
		items,
		type,
		customerId,
		customerName,
		customerPhone,
		tableId,
		notes,
		splitCount,
		draft,
		getPreviewSubtotal,
		getPreviewTotal,
	}
}

export const useCartActions = () => {
	const addProductItem = useCartStore((state) => state.addProductItem)
	const addComboItem = useCartStore((state) => state.addComboItem)
	const removeItem = useCartStore((state) => state.removeItem)
	const updateQuantity = useCartStore((state) => state.updateQuantity)
	const updateNotes = useCartStore((state) => state.updateNotes)
	const clearCart = useCartStore((state) => state.clearCart)
	const setCustomerId = useCartStore((state) => state.setCustomerId)
	const setCustomerName = useCartStore((state) => state.setCustomerName)
	const setCustomerPhone = useCartStore((state) => state.setCustomerPhone)
	const setTableId = useCartStore((state) => state.setTableId)
	const setType = useCartStore((state) => state.setType)
	const setNotes = useCartStore((state) => state.setNotes)
	const setSplitCount = useCartStore((state) => state.setSplitCount)
	const setDraft = useCartStore((state) => state.setDraft)
	const clearDraft = useCartStore((state) => state.clearDraft)

	return {
		addProductItem,
		addComboItem,
		removeItem,
		updateQuantity,
		updateNotes,
		clearCart,
		setCustomerId,
		setCustomerName,
		setCustomerPhone,
		setTableId,
		setType,
		setNotes,
		setSplitCount,
		setDraft,
		clearDraft,
	}
}
