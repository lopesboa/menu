export interface OrderFilter {
	status?: string
	orderType?: string
	startDate?: string
	endDate?: string
	limit?: number
	offset?: number
}

export interface OrderStatsResponse {
	totalOrders: number
	totalRevenue: string
	pendingOrders: number
	preparingOrders: number
	readyOrders: number
	deliveredOrders: number
	cancelledOrders: number
	activeOrders: number
}
