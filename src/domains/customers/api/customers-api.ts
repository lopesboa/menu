import { apiFetch } from "@/utils/fetch"
import type { Customer, CustomerApi } from "../types/customer-types"

export function mapCustomerApiToCustomer(customer: CustomerApi): Customer {
	return {
		...customer,
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
	return await apiFetch<CustomerApi[]>(`/customers/${organizationId}`, {
		signal,
	})
}
