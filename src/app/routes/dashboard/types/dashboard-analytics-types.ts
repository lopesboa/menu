import type { Order } from "@/domains/orders/types/order.types"
import type { Table } from "@/domains/tables/types/table.types"

export interface SalesData {
	date: string
	revenue: number
	orders: number
	expenses: number
}

export interface RevenueChartPoint {
	date: string
	revenue: number
	orders: number
}

interface RevenueSummary {
	totalRevenue: number
	percentageChange: number
}

export interface DashboardRevenue {
	data: RevenueChartPoint[]
	summary: RevenueSummary
}

interface StatsRoot {
	current: number
	previous: number
	percentageChange: number
}

interface TablesStats {
	occupied: number
	total: number
	percentageChange: number
}

interface Stats {
	revenue: StatsRoot
	orders: StatsRoot
	tables: TablesStats
}

interface RecentOrders {
	total: number
	orders: Order[]
}

interface TablesSummary {
	available: number
	occupied: number
	reserved: number
	cleaning: number
	total: number
}

interface TablesStatus {
	summary: TablesSummary
	tables: Table[]
}

interface TopProduct {
	rank: number
	id: string
	name: string
	category: string
	price: number
	quantitySold: number
}

interface Period {
	days: number
	startDate: string
	endDate: string
}

export interface DashboardSummary {
	stats: Stats
	recentOrders: RecentOrders
	tablesStatus: TablesStatus
	topProducts: TopProduct[]
	period: Period
}

interface ProductRanking {
	rank: number
	id: string
	name: string
	category: string
	price: number
	quantitySold: number
	revenue: number
}

interface Pagination {
	page: number
	limit: number
	total: number
	totalPages: number
}

export interface SalesRanking {
	products: ProductRanking[]
	pagination: Pagination
}
