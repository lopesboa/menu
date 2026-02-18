import { create } from "zustand"
import type { Order, OrderStatus, OrderType } from "@/types/dashboard"
import { orders as initialOrders } from "../routes/dashboard/data/mockData"

interface OrderStore {
	orders: Order[]
	selectedOrder: Order | null
	filter: {
		status: OrderStatus | "all" | "approval_pending"
		type: OrderType | "all"
		search: string
	}
	setFilter: (key: "status" | "type" | "search", value: string) => void
	selectOrder: (order: Order | null) => void
	addOrder: (order: Omit<Order, "id" | "createdAt" | "updatedAt">) => void
	updateOrderStatus: (
		orderId: string,
		status: OrderStatus,
		approvedBy?: string,
		notes?: string
	) => void
	updateOrder: (orderId: string, updates: Partial<Order>) => void
	approveOrder: (orderId: string, approvedBy: string) => void
	rejectOrder: (orderId: string, approvedBy: string, notes: string) => void
	getFilteredOrders: () => Order[]
	getOrderById: (id: string) => Order | undefined
	getPendingApprovalOrders: () => Order[]
	getKitchenOrders: () => Order[]
}

export const useOrderStore = create<OrderStore>((set, get) => ({
	orders: initialOrders,
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
	addOrder: (orderData) => {
		const newOrder: Order = {
			...orderData,
			id: `o${Date.now()}`,
			createdAt: new Date(),
			updatedAt: new Date(),
		}
		set((state) => ({ orders: [newOrder, ...state.orders] }))
	},
	updateOrderStatus: (orderId, status, approvedBy, notes) =>
		set((state) => ({
			orders: state.orders.map((order) =>
				order.id === orderId
					? {
							...order,
							status,
							approvedBy,
							approvalNotes: notes,
							updatedAt: new Date(),
						}
					: order
			),
			selectedOrder:
				state.selectedOrder?.id === orderId
					? {
							...state.selectedOrder,
							status,
							approvedBy,
							approvalNotes: notes,
							updatedAt: new Date(),
						}
					: state.selectedOrder,
		})),
	updateOrder: (orderId, updates) =>
		set((state) => ({
			orders: state.orders.map((order) =>
				order.id === orderId
					? { ...order, ...updates, updatedAt: new Date() }
					: order
			),
			selectedOrder:
				state.selectedOrder?.id === orderId
					? { ...state.selectedOrder, ...updates, updatedAt: new Date() }
					: state.selectedOrder,
		})),
	approveOrder: (orderId, approvedBy) =>
		set((state) => ({
			orders: state.orders.map((order) =>
				order.id === orderId
					? {
							...order,
							approvalStatus: "approved",
							approvedBy,
							status: "confirmed",
							updatedAt: new Date(),
						}
					: order
			),
			selectedOrder:
				state.selectedOrder?.id === orderId
					? {
							...state.selectedOrder,
							approvalStatus: "approved",
							approvedBy,
							status: "confirmed",
							updatedAt: new Date(),
						}
					: state.selectedOrder,
		})),
	rejectOrder: (orderId, approvedBy, notes) =>
		set((state) => ({
			orders: state.orders.map((order) =>
				order.id === orderId
					? {
							...order,
							approvalStatus: "rejected",
							approvedBy,
							approvalNotes: notes,
							status: "rejected",
							updatedAt: new Date(),
						}
					: order
			),
			selectedOrder:
				state.selectedOrder?.id === orderId
					? {
							...state.selectedOrder,
							approvalStatus: "rejected",
							approvedBy,
							approvalNotes: notes,
							status: "rejected",
							updatedAt: new Date(),
						}
					: state.selectedOrder,
		})),
	getFilteredOrders: () => {
		const { orders, filter } = get()
		return orders.filter((order) => {
			if (filter.status !== "all") {
				if (filter.status === "approval_pending") {
					if (order.approvalStatus !== "pending") {
						return false
					}
				} else if (order.status !== filter.status) {
					return false
				}
			}
			if (filter.type !== "all" && order.type !== filter.type) {
				return false
			}
			if (filter.search) {
				const searchLower = filter.search.toLowerCase()
				return (
					order.id.toLowerCase().includes(searchLower) ||
					order.customerName?.toLowerCase().includes(searchLower) ||
					order.orderItems.some((item) =>
						item.name.toLowerCase().includes(searchLower)
					)
				)
			}
			return true
		})
	},
	getOrderById: (id) => get().orders.find((order) => order.id === id),
	getPendingApprovalOrders: () =>
		get().orders.filter((o) => o.approvalStatus === "pending"),
	getKitchenOrders: () =>
		get().orders.filter((o) =>
			["confirmed", "preparing", "ready"].includes(o.status)
		),
}))
