import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { sentryCaptureException } from "@/lib/sentry"
import {
	type CreateAddressPayload,
	createAddress,
	getCities,
	getStates,
} from "@/services/address-service"
import { ApiRequestError } from "@/utils/fetch"

export const addressQueryKeys = {
	all: ["address"] as const,
	states: () => [...addressQueryKeys.all, "states"] as const,
	cities: () => [...addressQueryKeys.all, "cities"] as const,
	cityList: (stateCode: string) =>
		[...addressQueryKeys.cities(), { stateCode }] as const,
	addresses: () => [...addressQueryKeys.all, "addresses"] as const,
	mutations: {
		create: () => [...addressQueryKeys.all, "mutation", "create"] as const,
	},
}

function getErrorCode(error: unknown): string | undefined {
	if (error instanceof ApiRequestError) {
		return error.errorCode
	}
	return undefined
}

function getAddressErrorMessage(error: unknown): string {
	const errorCode = getErrorCode(error)

	if (errorCode) {
		switch (errorCode) {
			case "ADDRESS_NOT_FOUND":
				return "Endereço não encontrado"
			case "FORBIDDEN":
				return "Seu perfil não tem permissão para esta ação"
			case "VALIDATION_ERROR":
				return "Dados inválidos para o endereço"
			default:
				return "Não foi possível processar o endereço"
		}
	}

	return "Não foi possível processar o endereço"
}

export function useStates() {
	return useQuery({
		queryKey: addressQueryKeys.states(),
		queryFn: getStates,
	})
}

export function useCities(stateCode: string) {
	return useQuery({
		queryKey: addressQueryKeys.cityList(stateCode),
		queryFn: () => getCities(stateCode),
		enabled: !!stateCode,
	})
}

export function useCreateAddress() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: addressQueryKeys.mutations.create(),
		mutationFn: (data: CreateAddressPayload) => createAddress(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: addressQueryKeys.addresses() })
		},
		onError: (error, variables) => {
			toast.error(getAddressErrorMessage(error))
			sentryCaptureException(error, {
				context: "address_create",
				cityId: variables.cityId,
			})
		},
	})
}
