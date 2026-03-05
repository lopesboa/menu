import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Cart, MenuItem } from "@/types/dashboard"

interface CartState extends Cart {
	addItem: (menuItem: MenuItem, quantity?: number, notes?: string) => void
	removeItem: (menuItemId: string) => void
	updateQuantity: (menuItemId: string, quantity: number) => void
	updateNotes: (menuItemId: string, notes: string) => void
	clearCart: () => void
	setCustomerId: (customerId?: string) => void
	setTableId: (tableId?: string) => void
	setType: (type: Cart["type"]) => void
	setNotes: (notes: string) => void
	setSplitCount: (count: number) => void
	getSubtotal: () => number
	getTax: (rate: number) => number
	getTotal: (rate: number) => number
	splitBill: () => number[]
}

const initialCart: Cart = {
	items: [],
	type: "dine_in",
}

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			...initialCart,

			addItem: (menuItem, quantity, notes) => {
				const items = [...get().items]
				const existingIndex = items.findIndex(
					(i) => i.menuItem.id === menuItem.id
				)
				const qty = quantity ?? 1

				if (existingIndex >= 0) {
					items[existingIndex].quantity += qty
					if (notes) {
						items[existingIndex].notes = notes
					}
				} else {
					items.push({ menuItem, quantity: qty, notes })
				}

				set({ items })
			},

			removeItem: (menuItemId) => {
				set({ items: get().items.filter((i) => i.menuItem.id !== menuItemId) })
			},

			updateQuantity: (menuItemId, quantity) => {
				if (quantity <= 0) {
					get().removeItem(menuItemId)
					return
				}
				set({
					items: get().items.map((i) =>
						i.menuItem.id === menuItemId ? { ...i, quantity } : i
					),
				})
			},

			updateNotes: (menuItemId, notes) => {
				set({
					items: get().items.map((i) =>
						i.menuItem.id === menuItemId ? { ...i, notes } : i
					),
				})
			},

			clearCart: () =>
				set({ items: [], customerId: undefined, notes: undefined }),

			setCustomerId: (customerId) => set({ customerId }),

			setTableId: (tableId) => set({ tableId }),

			setType: (type) => set({ type }),

			setNotes: (notes) => set({ notes }),

			setSplitCount: (splitCount) => set({ splitCount }),

			getSubtotal: () => {
				return get().items.reduce(
					(sum, item) => sum + +item.menuItem.price * item.quantity,
					0
				)
			},

			getTax: (rate) => {
				return get().getSubtotal() * (rate / 100)
			},

			getTotal: (rate) => {
				return get().getSubtotal() + get().getTax(rate)
			},

			splitBill: () => {
				const { getTotal, items } = get()
				if (items.length === 0) {
					return []
				}
				const total = getTotal(10)
				const splitCount = get().splitCount || 1
				const baseAmount = Math.floor(total / splitCount)
				const remainder = total % splitCount

				return new Array(splitCount)
					.fill(0)
					.map((_, i) => baseAmount + (i < remainder ? 1 : 0))
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
	const tableId = useCartStore((state) => state.tableId)
	const notes = useCartStore((state) => state.notes)
	const splitCount = useCartStore((state) => state.splitCount)
	const getSubtotal = useCartStore((state) => state.getSubtotal)
	const getTax = useCartStore((state) => state.getTax)
	const getTotal = useCartStore((state) => state.getTotal)
	const splitBill = useCartStore((state) => state.splitBill)

	return {
		items,
		type,
		customerId,
		tableId,
		notes,
		splitCount,
		getSubtotal,
		getTax,
		getTotal,
		splitBill,
	}
}

export const useCartActions = () => {
	const addItem = useCartStore((state) => state.addItem)
	const removeItem = useCartStore((state) => state.removeItem)
	const updateQuantity = useCartStore((state) => state.updateQuantity)
	const updateNotes = useCartStore((state) => state.updateNotes)
	const clearCart = useCartStore((state) => state.clearCart)
	const setCustomerId = useCartStore((state) => state.setCustomerId)
	const setTableId = useCartStore((state) => state.setTableId)
	const setType = useCartStore((state) => state.setType)
	const setNotes = useCartStore((state) => state.setNotes)
	const setSplitCount = useCartStore((state) => state.setSplitCount)

	return {
		addItem,
		removeItem,
		updateQuantity,
		updateNotes,
		clearCart,
		setCustomerId,
		setTableId,
		setType,
		setNotes,
		setSplitCount,
	}
}
