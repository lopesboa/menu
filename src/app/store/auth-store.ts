import {
	useAuth as domainUseAuth,
	useAuthAction as domainUseAuthAction,
	useAuthActions as domainUseAuthActions,
	useAuthSelectors as domainUseAuthSelectors,
	useAuthStore as domainUseAuthStore,
} from "@/domains/auth/store/auth-store"

export const useAuthStore = domainUseAuthStore
export const useAuthSelectors = domainUseAuthSelectors
export const useAuthActions = domainUseAuthActions
export const useAuth = domainUseAuth
export const useAuthAction = domainUseAuthAction
