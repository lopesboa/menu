import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
	type CreateAddressPayload,
	createAddress,
	getCities,
	getStates,
} from "@/services/address-service"

export function useStates() {
	return useQuery({
		queryKey: ["states"],
		queryFn: getStates,
	})
}

export function useCities(stateCode: string | undefined) {
	return useQuery({
		queryKey: ["cities", stateCode],
		queryFn: () => getCities(stateCode),
		enabled: !!stateCode,
	})
}

export function useCreateAddress() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (data: CreateAddressPayload) => createAddress(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["addresses"] })
		},
	})
}
