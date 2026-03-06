import { apiFetch } from "@/utils/fetch"
import type { Customer, CustomerApi } from "../types/customer-types"

interface CustomersApiEnvelope {
	customers?: CustomerApi[]
	data?: CustomerApi[]
	items?: CustomerApi[]
}

type CustomersApiResponse = CustomerApi[] | CustomersApiEnvelope

function normalizeCustomersResponse(
	response: CustomersApiResponse
): CustomerApi[] {
	if (Array.isArray(response)) {
		return response
	}

	if (Array.isArray(response.customers)) {
		return response.customers
	}

	if (Array.isArray(response.data)) {
		return response.data
	}

	if (Array.isArray(response.items)) {
		return response.items
	}

	return []
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
	organizationId: string,
	signal?: AbortSignal
): Promise<CustomerApi[]> {
	const response = await apiFetch<CustomersApiResponse>(
		`/customers/${organizationId}`,
		{
			signal,
		}
	)

	return normalizeCustomersResponse(response)
}
