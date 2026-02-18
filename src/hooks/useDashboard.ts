import { useQuery } from "@tanstack/react-query"
import {
	getDashboardRevenueChart,
	getDashboardSalesRanking,
	getDashboardSummary,
} from "@/services/dashboard-service"

const dashboardQueryKeys = {
	getDashboardSummary: (days?: number) => ["list-summary", { days }],
	getDashboardRevenueChart: (days?: number) => [
		...dashboardQueryKeys.getDashboardSummary(),
		"revenue-chart",
		{ days },
	],
	getDashboardSalesRanking: (days?: number, page?: number, count?: number) => [
		...dashboardQueryKeys.getDashboardSummary(),
		"sales-ranking",
		{ days },
		{ page },
		{ count },
	],
}

//TODO: Add interval on this 3 hooksto have always updated data, this is important for UX
//Find better approach to this.
export function useDashboardSummary(days?: number) {
	return useQuery({
		queryKey: dashboardQueryKeys.getDashboardSummary(days),
		queryFn: ({ signal }) => getDashboardSummary(days, signal),
	})
}

export function useRevenueChart(days?: number) {
	return useQuery({
		queryKey: dashboardQueryKeys.getDashboardRevenueChart(),
		queryFn: ({ signal }) => getDashboardRevenueChart(days, signal),
	})
}

export function useSalesRanking(days?: number, page?: number, count?: number) {
	return useQuery({
		queryKey: dashboardQueryKeys.getDashboardSalesRanking(),
		queryFn: ({ signal }) =>
			getDashboardSalesRanking(days, page, count, signal),
	})
}
