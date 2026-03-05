import {
	useRestaurantActions as domainUseRestaurantActions,
	useRestaurantSelectors as domainUseRestaurantSelectors,
	useRestaurantStore as domainUseRestaurantStore,
} from "@/domains/restaurant/store/restaurant-store"

export const useRestaurantStore = domainUseRestaurantStore
export const useRestaurantSelectors = domainUseRestaurantSelectors
export const useRestaurantActions = domainUseRestaurantActions
