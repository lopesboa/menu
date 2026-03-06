import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateOrderApproval, updateOrderStatus } from "../api/orders-api"
import type { OrderStatus } from "../types/order.types"
import { ordersQueryKeys } from "./orders-query-keys"

export function useOrderActions(organizationId: string | null) {
	const queryClient = useQueryClient()

	const statusMutation = useMutation({
		mutationFn: ({
			orderId,
			status,
		}: {
			orderId: string
			status: OrderStatus
		}) => updateOrderStatus(organizationId as string, status, orderId),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: ordersQueryKeys.lists(organizationId),
			})
			queryClient.invalidateQueries({
				queryKey: ordersQueryKeys.detail(organizationId, variables.orderId),
			})
			queryClient.invalidateQueries({
				queryKey: ordersQueryKeys.stats(organizationId),
			})
		},
	})

	const approvalMutation = useMutation({
		mutationFn: ({
			orderId,
			approvalStatus,
			approvedBy,
		}: {
			orderId: string
			approvalStatus: "approved" | "rejected"
			approvedBy: string
		}) =>
			updateOrderApproval(
				organizationId as string,
				{ approvalStatus, approvedBy },
				orderId
			),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: ordersQueryKeys.lists(organizationId),
			})
			queryClient.invalidateQueries({
				queryKey: ordersQueryKeys.detail(organizationId, variables.orderId),
			})
			queryClient.invalidateQueries({
				queryKey: ordersQueryKeys.stats(organizationId),
			})
		},
	})

	const updateStatus = (orderId: string, status: OrderStatus) => {
		if (!organizationId) {
			return
		}

		statusMutation.mutate({ orderId, status })
	}

	const approveOrder = (orderId: string, approvedBy: string) => {
		if (!organizationId) {
			return
		}

		approvalMutation.mutate({ orderId, approvalStatus: "approved", approvedBy })
	}

	const rejectOrder = (orderId: string, approvedBy: string, _notes: string) => {
		if (!organizationId) {
			return
		}

		approvalMutation.mutate({ orderId, approvalStatus: "rejected", approvedBy })
	}

	return {
		updateStatus,
		approveOrder,
		rejectOrder,
		isUpdating: statusMutation.isPending || approvalMutation.isPending,
	}
}
