import type {
	DashboardRevenue,
	DashboardSummary,
	SalesRanking,
} from "@/types/dashboard"
import { apiFetch } from "@/utils/fetch"

export function getDashboardSummary(
	organizationId: string,
	days = 1,
	signal?: AbortSignal
) {
	const endpoint = `/dashboard/${organizationId}/summary?days=${days}`

	return apiFetch<DashboardSummary>(endpoint, { signal })
}

export function getDashboardRevenueChart(
	organizationI: string,
	days = 1,
	signal?: AbortSignal
) {
	const endpoint = `/dashboard/${organizationI}/revenue-chart?days=${days}`

	return apiFetch<DashboardRevenue>(endpoint, { signal })
}

export function getDashboardSalesRanking(
	organizationI: string,
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
	const endpoint = `/dashboard/${organizationI}/sales-ranking${queryString ? `?${queryString}` : ""}`

	return apiFetch<SalesRanking>(endpoint, { signal })
}
