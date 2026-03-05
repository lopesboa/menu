import { useQuery } from "@tanstack/react-query"
import { authClient } from "@/lib/client"

export function useOrganizationCheck() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["session"],
		queryFn: async () => {
			const result = await authClient.getSession()
			return result.data?.session
		},
		retry: false,
		staleTime: 0,
	})

	const organizationId = data?.activeOrganizationId

	return {
		organizationId: organizationId ?? null,
		hasOrganization: !!organizationId,
		isLoading,
		error,
	}
}
