import { create } from "zustand"
import { persist } from "zustand/middleware"
import { authClient } from "@/lib/client"
import type { User } from "@/types/dashboard"

interface AuthState {
	user: User | null
	isAuthenticated: boolean
	actions: {
		login: (email: string, password: string) => Promise<void>
		logout: () => void
		updateUser: (updates: Partial<User>) => void
	}
}

const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: {
				id: "user-1",
				email: "admin@menubao.com",
				name: "Carlos Manager",
				avatar: "https://i.pravatar.cc/150?u=s1",
				role: "owner",
				restaurants: [
					{
						organizationId: "rest-1",
						restaurantName: "MenuBao Restaurant",
						role: "owner",
						isOwner: true,
					},
					{
						organizationId: "rest-2",
						restaurantName: "Sabor do Brasil",
						role: "manager",
						isOwner: false,
					},
				],
				createdAt: new Date("2024-01-01"),
			},
			isAuthenticated: true,
			actions: {
				login: async (email: string, _password: string) => {
					await new Promise((resolve) => setTimeout(resolve, 500))
					set({
						user: {
							id: "user-1",
							email,
							name: "Demo User",
							role: "owner",
							restaurants: [
								{
									organizationId: "rest-1",
									restaurantName: "MenuBao Restaurant",
									role: "owner",
									isOwner: true,
								},
							],
							createdAt: new Date(),
						},
						isAuthenticated: true,
					})
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
				updateUser: (updates) =>
					set((state) => ({
						user: state.user ? { ...state.user, ...updates } : null,
					})),
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

	return {
		user,
		isAuthenticated,
	}
}

export const useAuthAction = () => {
	const actions = useAuthStore((state) => state.actions)

	return actions
}
