import { create } from "zustand"
import type { Order, OrderStatus, OrderType } from "@/types/dashboard"

interface OrderStore {
	selectedOrder: Order | null
	filter: {
		status: OrderStatus | "all" | "approval_pending"
		type: OrderType | "all"
		search: string
	}
	setFilter: (key: "status" | "type" | "search", value: string) => void
	selectOrder: (order: Order | null) => void
}

const useOrderStore = create<OrderStore>((set) => ({
	selectedOrder: null,
	filter: {
		status: "all",
		type: "all",
		search: "",
	},
	setFilter: (key, value) =>
		set((state) => ({
			filter: { ...state.filter, [key]: value },
		})),
	selectOrder: (order) => set({ selectedOrder: order }),
}))

export const useSelectedOrder = () => {
	const selectedOrder = useOrderStore((state) => state.selectedOrder)
	const filter = useOrderStore((state) => state.filter)

	return {
		selectedOrder,
		filter,
	}
}

export const useOrdersActions = () => {
	const setFilter = useOrderStore((state) => state.setFilter)
	const selectOrder = useOrderStore((state) => state.selectOrder)

	return {
		setFilter,
		selectOrder,
	}
}
