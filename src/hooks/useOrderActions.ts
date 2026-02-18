import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
	updateOrderApproval,
	updateOrderStatus,
} from "@/services/orders-service"
import type { OrderStatus } from "@/types/dashboard"
import { orderQueryKeys } from "./useOrders"

export function useOrderActions() {
	const queryClient = useQueryClient()

	const statusMutation = useMutation({
		mutationFn: ({
			orderId,
			status,
		}: {
			orderId: string
			status: OrderStatus
		}) => updateOrderStatus(status, orderId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: orderQueryKeys.getOrders() })
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
		}) => updateOrderApproval({ approvalStatus, approvedBy }, orderId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: orderQueryKeys.getOrders() })
		},
	})

	const updateStatus = (orderId: string, status: OrderStatus) => {
		statusMutation.mutate({ orderId, status })
	}

	const approveOrder = (orderId: string, approvedBy: string) => {
		approvalMutation.mutate({ orderId, approvalStatus: "approved", approvedBy })
	}

	const rejectOrder = (orderId: string, approvedBy: string, _notes: string) => {
		approvalMutation.mutate({ orderId, approvalStatus: "rejected", approvedBy })
	}

	return {
		updateStatus,
		approveOrder,
		rejectOrder,
		isUpdating: statusMutation.isPending || approvalMutation.isPending,
	}
}
