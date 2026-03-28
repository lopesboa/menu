import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"
import { sentryCaptureException } from "@/lib/sentry"
import { ApiRequestError } from "@/utils/fetch"
import { updateKdsItemStatus } from "../api/kds-api"
import type { KdsItemStatus } from "../types/kds.types"
import { invalidateKdsCache, kdsQueryKeys } from "./kds-query-keys"

function getKdsErrorCode(error: unknown): string | undefined {
	if (error instanceof ApiRequestError) {
		return error.errorCode
	}

	return undefined
}

function getKdsStatusErrorMessage(error: unknown) {
	const errorCode = getKdsErrorCode(error)

	if (errorCode) {
		switch (errorCode) {
			case "KDS_ITEM_NOT_FOUND":
				return "Item da cozinha não encontrado"
			case "KDS_INVALID_STATUS":
				return "Status inválido para este item da cozinha"
			case "FORBIDDEN":
				return "Seu perfil não tem permissão para esta ação"
			case "VALIDATION_ERROR":
				return "Dados inválidos para atualizar o item da cozinha"
			default:
				return "Não foi possível atualizar o item da cozinha"
		}
	}

	return "Não foi possível atualizar o item da cozinha"
}

export function useKdsActions(organizationId: string | null) {
	const queryClient = useQueryClient()
	const [pendingItemIds, setPendingItemIds] = useState<string[]>([])

	const statusMutation = useMutation({
		mutationKey: kdsQueryKeys.mutations.status(organizationId),
		mutationFn: ({
			itemId,
			status,
		}: {
			itemId: string
			status: KdsItemStatus
		}) => updateKdsItemStatus(organizationId as string, itemId, status),
		onSuccess: (result) => {
			invalidateKdsCache(queryClient, organizationId, result.item.stationId)
		},
		onError: (error, variables) => {
			toast.error(getKdsStatusErrorMessage(error))
			sentryCaptureException(error, {
				context: "kds_update_item_status",
				organizationId,
				itemId: variables.itemId,
				status: variables.status,
			})
		},
	})

	const updateItemStatus = (itemId: string, status: KdsItemStatus) => {
		if (!organizationId) {
			toast.error("Organização não identificada para executar esta ação")
			return
		}

		setPendingItemIds((current) => {
			return current.includes(itemId) ? current : [...current, itemId]
		})

		statusMutation.mutate(
			{ itemId, status },
			{
				onSettled: () => {
					setPendingItemIds((current) => {
						return current.filter((currentItemId) => currentItemId !== itemId)
					})
				},
			}
		)
	}

	return {
		updateItemStatus,
		isUpdating: pendingItemIds.length > 0,
		isItemUpdating: (itemId: string) => pendingItemIds.includes(itemId),
		updatingStatus: statusMutation.variables?.status ?? null,
	}
}
