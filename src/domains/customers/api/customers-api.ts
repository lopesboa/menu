import { apiFetch } from "@/utils/fetch"
import type { Customer, CustomerApi } from "../types/customer-types"

export interface CustomersPagination {
	limit: number
	offset: number
	total: number
}

export interface CustomersListApiResponse {
	data: CustomerApi[]
	pagination: CustomersPagination
}

interface GetCustomersParams {
	organizationId: string
	limit?: number
	offset?: number
	search?: string
	signal?: AbortSignal
}

export function mapCustomerApiToCustomer(customer: CustomerApi): Customer {
	return {
		id: customer.id,
		organizationId: customer.organizationId,
		name: customer.name?.trim() || "Cliente sem nome",
		email: customer.email?.trim() || "",
		phone: customer.phone?.trim() || "",
		totalOrders: customer.totalOrders ?? 0,
		totalSpent: customer.totalSpent ?? 0,
		loyaltyPoints: customer.loyaltyPoints ?? 0,
		lastVisit: customer.lastVisit ? new Date(customer.lastVisit) : new Date(),
		avatar: customer.avatar ?? undefined,
		preferences: customer.preferences ?? [],
	}
}

export async function getCustomers(
	params: GetCustomersParams
): Promise<CustomersListApiResponse> {
	const queryParams = new URLSearchParams()

	if (typeof params.limit === "number") {
		queryParams.set(
			"limit",
			Math.min(100, Math.max(1, params.limit)).toString()
		)
	}

	if (typeof params.offset === "number") {
		queryParams.set("offset", Math.max(0, params.offset).toString())
	}

	if (params.search?.trim()) {
		queryParams.set("search", params.search.trim())
	}

	const queryString = queryParams.toString()
	const endpoint = `/customers/${params.organizationId}${queryString ? `?${queryString}` : ""}`

	return await apiFetch<CustomersListApiResponse>(endpoint, {
		signal: params.signal,
	})
}
