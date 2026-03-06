import { useQuery } from "@tanstack/react-query"
import {
	getDashboardRevenueChart,
	getDashboardSalesRanking,
	getDashboardSummary,
} from "@/services/dashboard-service"

export const dashboardQueryKeys = {
	all: ["dashboard"] as const,
	summary: (organizationId: string, days?: number) => [
		...dashboardQueryKeys.all,
		"summary",
		{ organizationId, days },
	],
	revenueChart: (organizationId: string, days?: number) => [
		...dashboardQueryKeys.all,
		"revenue-chart",
		{ organizationId, days },
	],
	salesRanking: (
		organizationId: string,
		days?: number,
		page?: number,
		count?: number
	) => [
		...dashboardQueryKeys.all,
		"sales-ranking",
		{ organizationId, days, page, count },
	],
}

export function useDashboardSummary(organizationId: string, days?: number) {
	return useQuery({
		queryKey: dashboardQueryKeys.summary(organizationId, days),
		queryFn: ({ signal }) => getDashboardSummary(organizationId, days, signal),
		refetchInterval: 30_000,
		staleTime: 10_000,
		enabled: !!organizationId,
		refetchOnWindowFocus: true,
	})
}

export function useRevenueChart(organizationId: string, days?: number) {
	return useQuery({
		queryKey: dashboardQueryKeys.revenueChart(organizationId, days),
		queryFn: ({ signal }) =>
			getDashboardRevenueChart(organizationId, days, signal),
	})
}

export function useSalesRanking(
	organizationId: string,
	days?: number,
	page?: number,
	count?: number
) {
	return useQuery({
		queryKey: dashboardQueryKeys.salesRanking(
			organizationId,
			days,
			page,
			count
		),
		queryFn: ({ signal }) =>
			getDashboardSalesRanking(organizationId, days, page, count, signal),
	})
}
