import { useQuery } from "@tanstack/react-query"
import { authClient } from "@/lib/client"

export const organizationQueryKeys = {
	all: ["organization"] as const,
	session: () => [...organizationQueryKeys.all, "session"] as const,
}

export function useOrganizationCheck() {
	const { data, isLoading, error } = useQuery({
		queryKey: organizationQueryKeys.session(),
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
