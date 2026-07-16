import { useQuery } from "@tanstack/react-query"
import { getPosOrder } from "../api/pos-orders-api"
import type { PosOrder } from "../types/pos-order-types"
import { posQueryKeys } from "./pos-query-keys"

interface UsePosOrderParams {
	organizationId: string | null
	orderId: string | null
}

export function usePosOrder({ organizationId, orderId }: UsePosOrderParams) {
	return useQuery<PosOrder>({
		queryKey: posQueryKeys.order(organizationId, orderId as string),
		enabled: Boolean(organizationId && orderId),
		queryFn: ({ signal }) =>
			getPosOrder(organizationId as string, orderId as string, signal),
	})
}
