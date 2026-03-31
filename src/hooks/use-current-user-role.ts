import { useAuthSelectors } from "@/domains/auth/store/auth-store"

export function useCurrentUserRole() {
	const { user } = useAuthSelectors()

	return {
		role: user?.role,
	}
}
