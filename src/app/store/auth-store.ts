import { toast } from "sonner"
import { create } from "zustand"
import { persist } from "zustand/middleware"
import { authClient } from "@/lib/client"
import type { User } from "@/types/dashboard"

interface AuthState {
	user: User | null
	isAuthenticated: boolean
	isLoading: boolean
	login: (
		email: string,
		password: string,
		rememberMe?: boolean,
		redirectTo?: string
	) => Promise<void>
	logout: () => void
}

const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			isLoading: false,
			isAuthenticated: true,
			login: async (
				email: string,
				password: string,
				rememberMe,
				redirectTo
			) => {
				set({ isLoading: true })
				await authClient.signIn.email(
					{
						email,
						password,
						callbackURL: redirectTo || "/dashboard",
						rememberMe,
					},
					{
						onSuccess(data) {
							set({
								user: data.data.user,
								isAuthenticated: true,
							})
						},
						onError(err) {
							if (err.error.status === 401) {
								toast.error("Falha no login", {
									description: "E-mail ou senha invalida",
								})
							}
						},
					}
				)
				set({ isLoading: false })
			},
			logout: () => {
				authClient.signOut({
					fetchOptions: {
						onSuccess: () => {
							set({ user: null, isAuthenticated: false })
						},
					},
				})
			},
		}),
		{
			name: "auth-storage",
		}
	)
)

export const useAuth = () => {
	const user = useAuthStore((state) => state.user)
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
	const isLoading = useAuthStore((state) => state.isLoading)

	return {
		user,
		isLoading,
		isAuthenticated,
	}
}

export const useAuthAction = () => {
	const login = useAuthStore((state) => state.login)
	const logout = useAuthStore((state) => state.logout)

	return {
		login,
		logout,
	}
}
