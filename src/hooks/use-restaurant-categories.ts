import { useQuery } from "@tanstack/react-query"
import { getActiveRestaurantCategories } from "@/services/restaurant-categories-service"

export function useActiveRestaurantCategories() {
	return useQuery({
		queryKey: ["restaurant-categories", "active"],
		queryFn: getActiveRestaurantCategories,
	})
}
