import { useQuery } from "@tanstack/react-query"
import {
	type CustomersListApiResponse,
	type CustomersPagination,
	getCustomers,
	mapCustomerApiToCustomer,
} from "../api/customers-api"
import type { Customer } from "../types/customer-types"

export const customersQueryKeys = {
	all: ["customers"] as const,
	lists: (
		organizationId: string | null | undefined,
		limit: number,
		offset: number,
		search?: string
	) =>
		[
			...customersQueryKeys.all,
			"list",
			{ organizationId, limit, offset, search: search || null },
		] as const,
	list: (
		organizationId: string | null | undefined,
		limit: number,
		offset: number,
		search?: string
	) =>
		[
			...customersQueryKeys.lists(organizationId, limit, offset, search),
		] as const,
}

export interface UseCustomersParams {
	organizationId: string | null | undefined
	limit?: number
	offset?: number
	search?: string
}

export interface CustomersListResult {
	customers: Customer[]
	pagination: CustomersPagination
}

export function useCustomers({
	organizationId,
	limit = 20,
	offset = 0,
	search,
}: UseCustomersParams) {
	return useQuery<CustomersListApiResponse, Error, CustomersListResult>({
		queryKey: customersQueryKeys.list(organizationId, limit, offset, search),
		queryFn: ({ signal }) =>
			getCustomers({
				organizationId: organizationId as string,
				limit,
				offset,
				search,
				signal,
			}),
		enabled: Boolean(organizationId),
		refetchInterval: 60_000,
		staleTime: 30_000,
		refetchOnWindowFocus: true,
		select: (response) => ({
			customers: response.data.map(mapCustomerApiToCustomer),
			pagination: response.pagination,
		}),
	})
}
