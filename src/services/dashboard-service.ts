import type {
	DashboardRevenue,
	DashboardSummary,
	SalesRanking,
} from "@/types/dashboard"
import { apiFetch, ORG_ID } from "@/utils/fetch"

export function getDashboardSummary(days = 1, signal?: AbortSignal) {
	const endpoint = `/dashboard/${ORG_ID}/summary?days=${days}`

	return apiFetch<DashboardSummary>(endpoint, { signal })
}

export function getDashboardRevenueChart(days = 1, signal?: AbortSignal) {
	const endpoint = `/dashboard/${ORG_ID}/revenue-chart?days=${days}`

	return apiFetch<DashboardRevenue>(endpoint, { signal })
}

export function getDashboardSalesRanking(
	days = 1,
	page = 0,
	count = 20,
	signal?: AbortSignal
) {
	const params = new URLSearchParams()

	params.append("limit", count.toString())
	params.append("offset", page.toString())
	params.append("days", days.toString())

	const queryString = params.toString()
	const endpoint = `/dashboard/${ORG_ID}/sales-ranking${queryString ? `?${queryString}` : ""}`

	return apiFetch<SalesRanking>(endpoint, { signal })
}
