import { useOrderActions as domainUseOrderActions } from "@/domains/orders/hooks/use-order-actions"

export function useOrderActions(organizationId?: string | null) {
	return domainUseOrderActions(organizationId ?? null)
}
