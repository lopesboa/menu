import { create } from "zustand"
import { setActiveOrganization } from "../hooks/use-organization"
import type { Restaurant } from "../types/restaurant-types"

interface RestaurantState {
	activeRestaurant: Restaurant | null
	restaurants: Restaurant[]
	isLoading: boolean
	setActiveRestaurant: (restaurant: Restaurant) => void
	setRestaurants: (restaurants: Restaurant[]) => void
	setIsLoading: (isLoading: boolean) => void
	changeActiveOrganization: (organizationId: string) => Promise<void>
}

export const useRestaurantStore = create<RestaurantState>((set) => ({
	activeRestaurant: null,
	restaurants: [],
	isLoading: true,
	setActiveRestaurant: (restaurant) => set({ activeRestaurant: restaurant }),
	setRestaurants: (restaurants) => set({ restaurants }),
	setIsLoading: (isLoading) => set({ isLoading }),
	changeActiveOrganization: async (organizationId: string) => {
		await setActiveOrganization(organizationId)
	},
}))

export const useRestaurantSelectors = () => {
	const activeRestaurant = useRestaurantStore((state) => state.activeRestaurant)
	const restaurants = useRestaurantStore((state) => state.restaurants)
	const isLoading = useRestaurantStore((state) => state.isLoading)

	return {
		activeRestaurant,
		getRestaurants: () => restaurants,
		restaurants,
		isLoading,
	}
}

export const useRestaurantActions = () => {
	const changeActiveOrganization = useRestaurantStore(
		(state) => state.changeActiveOrganization
	)
	const setActiveRestaurant = useRestaurantStore(
		(state) => state.setActiveRestaurant
	)
	const setRestaurants = useRestaurantStore((state) => state.setRestaurants)
	const setIsLoading = useRestaurantStore((state) => state.setIsLoading)

	return {
		changeActiveOrganization,
		setActiveRestaurant,
		setRestaurants,
		setIsLoading,
	}
}
