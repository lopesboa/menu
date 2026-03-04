import { useQuery } from "@tanstack/react-query"
import {
	getDashboardRevenueChart,
	getDashboardSalesRanking,
	getDashboardSummary,
} from "@/services/dashboard-service"

export const dashboardQueryKeys = {
	all: () => ["summary"],
	getDashboardSummary: (organizationI: string, days?: number) => [
		...dashboardQueryKeys.all(),
		"dashboard-summary",
		{ organizationI },
		{ days },
	],
	getDashboardRevenueChart: (organizationI: string, days?: number) => [
		...dashboardQueryKeys.all(),
		"revenue-chart",
		{ organizationI },
		{ days },
	],
	getDashboardSalesRanking: (
		organizationI: string,
		days?: number,
		page?: number,
		count?: number
	) => [
		...dashboardQueryKeys.all(),
		"sales-ranking",
		{ organizationI },
		{ days },
		{ page },
		{ count },
	],
}

export function useDashboardSummary(organizationId: string, days?: number) {
	return useQuery({
		queryKey: dashboardQueryKeys.getDashboardSummary(organizationId, days),
		queryFn: ({ signal }) => getDashboardSummary(organizationId, days, signal),
		refetchInterval: 30_000,
		staleTime: 10_000,
		enabled: !!organizationId,
		refetchOnWindowFocus: true,
	})
}

export function useRevenueChart(organizationI: string, days?: number) {
	return useQuery({
		queryKey: dashboardQueryKeys.getDashboardRevenueChart(organizationI, days),
		queryFn: ({ signal }) =>
			getDashboardRevenueChart(organizationI, days, signal),
	})
}

export function useSalesRanking(
	organizationI: string,
	days?: number,
	page?: number,
	count?: number
) {
	return useQuery({
		queryKey: dashboardQueryKeys.getDashboardSalesRanking(organizationI, days),
		queryFn: ({ signal }) =>
			getDashboardSalesRanking(organizationI, days, page, count, signal),
	})
}
