import { useQuery } from "@tanstack/react-query"
import { getActiveRestaurantCategories } from "@/services/restaurant-categories-service"

export const restaurantCategoriesQueryKeys = {
	all: ["restaurant-categories"] as const,
	active: () => [...restaurantCategoriesQueryKeys.all, "active"] as const,
}

export function useActiveRestaurantCategories() {
	return useQuery({
		queryKey: restaurantCategoriesQueryKeys.active(),
		queryFn: getActiveRestaurantCategories,
	})
}
