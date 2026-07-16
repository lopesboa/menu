import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { sentryCaptureException } from "@/lib/sentry"
import { ApiRequestError } from "@/utils/fetch"
import {
	reprocessDeliveryInboxEvent,
	syncDeliveryRun,
} from "../api/ops-delivery-api"
import {
	invalidateOpsDeliveryExceptionsCache,
	invalidateOpsEventsCache,
	invalidateOpsSummaryCache,
	opsQueryKeys,
} from "./use-ops-query-keys"

function getDeliveryActionErrorMessage(
	error: unknown,
	action: "reprocess" | "sync"
) {
	const errorCode =
		error instanceof ApiRequestError ? error.errorCode : undefined

	if (errorCode) {
		switch (errorCode) {
			case "FORBIDDEN":
				return "Seu perfil nao tem permissao para esta acao"
			case "VALIDATION_ERROR":
				return action === "reprocess"
					? "Nao foi possivel reprocessar este evento"
					: "Nao foi possivel sincronizar esta corrida"
			default:
				return action === "reprocess"
					? "Falha ao reprocessar o evento de delivery"
					: "Falha ao sincronizar a corrida de delivery"
		}
	}

	return action === "reprocess"
		? "Falha ao reprocessar o evento de delivery"
		: "Falha ao sincronizar a corrida de delivery"
}

export function useOpsDeliveryActions(organizationId: string | null) {
	const queryClient = useQueryClient()

	const invalidateRelatedData = () => {
		invalidateOpsDeliveryExceptionsCache(queryClient, organizationId)
		invalidateOpsEventsCache(queryClient, organizationId)
		invalidateOpsSummaryCache(queryClient, organizationId)
	}

	const reprocessMutation = useMutation({
		mutationKey: [
			...opsQueryKeys.all,
			"mutation",
			"delivery-reprocess",
			organizationId,
		],
		mutationFn: ({ eventId }: { eventId: string }) =>
			reprocessDeliveryInboxEvent(organizationId as string, eventId),
		onSuccess: () => {
			toast.success("Evento de delivery reenviado para processamento")
			invalidateRelatedData()
		},
		onError: (error, variables) => {
			toast.error(getDeliveryActionErrorMessage(error, "reprocess"))
			sentryCaptureException(error, {
				context: "ops_delivery_reprocess",
				organizationId,
				eventId: variables.eventId,
			})
		},
	})

	const syncMutation = useMutation({
		mutationKey: [
			...opsQueryKeys.all,
			"mutation",
			"delivery-sync",
			organizationId,
		],
		mutationFn: ({ runId }: { runId: string }) =>
			syncDeliveryRun(organizationId as string, runId),
		onSuccess: () => {
			toast.success("Sincronizacao manual da corrida solicitada")
			invalidateRelatedData()
		},
		onError: (error, variables) => {
			toast.error(getDeliveryActionErrorMessage(error, "sync"))
			sentryCaptureException(error, {
				context: "ops_delivery_sync",
				organizationId,
				runId: variables.runId,
			})
		},
	})

	return {
		reprocessEvent: (eventId: string) => {
			if (!organizationId) {
				toast.error("Organizacao nao identificada para executar esta acao")
				return
			}

			reprocessMutation.mutate({ eventId })
		},
		syncRun: (runId: string) => {
			if (!organizationId) {
				toast.error("Organizacao nao identificada para executar esta acao")
				return
			}

			syncMutation.mutate({ runId })
		},
		isReprocessingEventId: reprocessMutation.variables?.eventId ?? null,
		isSyncingRunId: syncMutation.variables?.runId ?? null,
	}
}
