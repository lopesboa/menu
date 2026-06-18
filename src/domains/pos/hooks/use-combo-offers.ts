import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { sentryCaptureException } from "@/lib/sentry"
import { ApiRequestError } from "@/utils/fetch"
import {
	createComboOffer,
	deactivateComboOffer,
	getComboOffer,
	getComboOffers,
	updateComboOffer,
} from "../api/combo-offers-api"
import type {
	ComboOffer,
	ComboOfferCreatePayload,
	ComboOfferUpdatePayload,
} from "../types/combo-offer-types"
import { getPosErrorMessage } from "../types/pos-error-codes"
import {
	comboOffersQueryKeys,
	invalidateComboOffersCache,
} from "./pos-query-keys"

function extractErrorCode(error: unknown): string | undefined {
	if (error instanceof ApiRequestError) {
		return error.errorCode
	}

	return undefined
}

interface UseComboOffersParams {
	organizationId: string | null
	includeInactive?: boolean
}

export function useComboOffers({
	organizationId,
	includeInactive = false,
}: UseComboOffersParams) {
	return useQuery<ComboOffer[]>({
		queryKey: comboOffersQueryKeys.list(organizationId, includeInactive),
		enabled: Boolean(organizationId),
		queryFn: ({ signal }) =>
			getComboOffers(organizationId as string, includeInactive, signal),
	})
}

interface UseComboOfferParams {
	organizationId: string | null
	comboOfferId: string | null
}

export function useComboOffer({
	organizationId,
	comboOfferId,
}: UseComboOfferParams) {
	return useQuery<ComboOffer>({
		queryKey: comboOffersQueryKeys.detail(
			organizationId,
			comboOfferId as string
		),
		enabled: Boolean(organizationId && comboOfferId),
		queryFn: ({ signal }) =>
			getComboOffer(organizationId as string, comboOfferId as string, signal),
	})
}

export function useComboOfferActions(organizationId: string | null) {
	const queryClient = useQueryClient()

	const createMutation = useMutation({
		mutationKey: comboOffersQueryKeys.mutations.create(organizationId),
		mutationFn: (payload: Omit<ComboOfferCreatePayload, "organizationId">) =>
			createComboOffer({
				organizationId: organizationId as string,
				...payload,
			}),
		onSuccess: () => {
			toast.success("Combo criado")
			invalidateComboOffersCache(queryClient, organizationId)
		},
		onError: (error) => {
			toast.error(
				getPosErrorMessage(
					extractErrorCode(error),
					"Não foi possível criar o combo"
				)
			)
			sentryCaptureException(error, {
				context: "combo_offer_create",
				organizationId,
			})
		},
	})

	const updateMutation = useMutation({
		mutationKey: comboOffersQueryKeys.mutations.update(organizationId),
		mutationFn: ({
			comboOfferId,
			payload,
		}: {
			comboOfferId: string
			payload: ComboOfferUpdatePayload
		}) => updateComboOffer(organizationId as string, comboOfferId, payload),
		onSuccess: () => {
			toast.success("Combo atualizado")
			invalidateComboOffersCache(queryClient, organizationId)
		},
		onError: (error, variables) => {
			toast.error(
				getPosErrorMessage(
					extractErrorCode(error),
					"Não foi possível atualizar o combo"
				)
			)
			sentryCaptureException(error, {
				context: "combo_offer_update",
				organizationId,
				comboOfferId: variables.comboOfferId,
			})
		},
	})

	const deactivateMutation = useMutation({
		mutationKey: comboOffersQueryKeys.mutations.deactivate(organizationId),
		mutationFn: ({ comboOfferId }: { comboOfferId: string }) =>
			deactivateComboOffer(organizationId as string, comboOfferId),
		onSuccess: () => {
			toast.success("Combo desativado")
			invalidateComboOffersCache(queryClient, organizationId)
		},
		onError: (error, variables) => {
			toast.error(
				getPosErrorMessage(
					extractErrorCode(error),
					"Não foi possível desativar o combo"
				)
			)
			sentryCaptureException(error, {
				context: "combo_offer_deactivate",
				organizationId,
				comboOfferId: variables.comboOfferId,
			})
		},
	})

	const guardOrganization = (): boolean => {
		if (!organizationId) {
			toast.error("Organização não identificada para executar esta ação")
			return false
		}

		return true
	}

	return {
		createOffer: (payload: Omit<ComboOfferCreatePayload, "organizationId">) => {
			if (!guardOrganization()) return
			createMutation.mutate(payload)
		},

		updateOffer: (comboOfferId: string, payload: ComboOfferUpdatePayload) => {
			if (!guardOrganization()) return
			updateMutation.mutate({ comboOfferId, payload })
		},

		deactivateOffer: (comboOfferId: string) => {
			if (!guardOrganization()) return
			deactivateMutation.mutate({ comboOfferId })
		},

		isCreating: createMutation.isPending,
		isUpdating: updateMutation.isPending,
		isDeactivating: deactivateMutation.isPending,
	}
}
