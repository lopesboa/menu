import { apiFetch } from "@/utils/fetch"
import type {
	CategoryApi,
	CreateCategoryPayload,
	UpdateCategoryPayload,
} from "../types/category.types"

export function getCategories(
	organizationId: string,
	signal?: AbortSignal
): Promise<CategoryApi[]> {
	return apiFetch<CategoryApi[]>(`/categories/${organizationId}`, {
		signal,
	})
}

export function getCategoryById(
	organizationId: string,
	catId: string,
	signal?: AbortSignal
): Promise<CategoryApi> {
	return apiFetch<CategoryApi>(`/categories/${organizationId}/${catId}`, {
		signal,
	})
}

export function createCategory(
	data: CreateCategoryPayload,
	signal?: AbortSignal
): Promise<CategoryApi> {
	return apiFetch<CategoryApi>("/categories", {
		signal,
		method: "POST",
		body: JSON.stringify(data),
	})
}

export function updateCategory(
	organizationId: string,
	catId: string,
	data: UpdateCategoryPayload,
	signal?: AbortSignal
): Promise<CategoryApi> {
	return apiFetch<CategoryApi>(`/categories/${organizationId}/${catId}`, {
		signal,
		method: "PATCH",
		body: JSON.stringify(data),
	})
}

export function deleteCategory(
	organizationId: string,
	catId: string,
	signal?: AbortSignal
): Promise<{ success: boolean } | { message: string } | unknown> {
	return apiFetch(`/categories/${organizationId}/${catId}`, {
		signal,
		method: "DELETE",
	})
}
