import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { sentryCaptureException } from "@/lib/sentry"
import {
	type CreateAddressPayload,
	createAddress,
	getCities,
	getStates,
} from "@/services/address-service"

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
			sentryCaptureException(error, {
				context: "address_create",
				cityId: variables.cityId,
			})
		},
	})
}
