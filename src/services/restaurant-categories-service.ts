import { apiFetch } from "@/utils/fetch"

export interface RestaurantCategory {
	id: string
	name: string
	slug: string
	description: string | null
	isActive: boolean
	displayOrder: number
	createdAt: string
	updatedAt: string
}

export function getActiveRestaurantCategories(): Promise<RestaurantCategory[]> {
	return apiFetch<RestaurantCategory[]>("/restaurant-categories/active")
}

export function getRestaurantCategoryById(
	id: string
): Promise<RestaurantCategory> {
	return apiFetch<RestaurantCategory>(`/restaurant-categories/${id}`)
}
