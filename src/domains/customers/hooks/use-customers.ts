import { useQuery } from "@tanstack/react-query"
import { getCustomers, mapCustomerApiToCustomer } from "../api/customers-api"
import type { Customer, CustomerApi } from "../types/customer-types"
import { customersQueryKeys } from "./customers-query-keys"

export function useCustomers(organizationId: string | null | undefined) {
	return useQuery<CustomerApi[], Error, Customer[]>({
		queryKey: customersQueryKeys.list(organizationId),
		queryFn: ({ signal }) => getCustomers(organizationId as string, signal),
		enabled: Boolean(organizationId),
		refetchInterval: 60_000,
		staleTime: 30_000,
		refetchOnWindowFocus: true,
		select: (customers) => customers.map(mapCustomerApiToCustomer),
	})
}
