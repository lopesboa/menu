import { categoriesQueryKeys } from "@/domains/categories/hooks/categories-query-keys"
import {
	useCategories as useCategoriesFromDomain,
	useCategoryById as useCategoryByIdFromDomain,
	useCreateCategory as useCreateCategoryFromDomain,
	useDeleteCategory as useDeleteCategoryFromDomain,
	useUpdateCategory as useUpdateCategoryFromDomain,
} from "@/domains/categories/hooks/use-categories"
import type {
	CategoryApi as CategoryApiFromDomain,
	CreateCategoryPayload as CreateCategoryPayloadFromDomain,
	UpdateCategoryPayload as UpdateCategoryPayloadFromDomain,
} from "@/domains/categories/types/category.types"

export type CategoryApi = CategoryApiFromDomain
export type CreateCategoryPayload = CreateCategoryPayloadFromDomain
export type UpdateCategoryPayload = UpdateCategoryPayloadFromDomain

export const categoryQueryKeys = categoriesQueryKeys

export function useCategories(organizationId: string | null | undefined) {
	return useCategoriesFromDomain(organizationId)
}

export function useCategoryById(
	organizationId: string | null | undefined,
	catId: string | null | undefined
) {
	return useCategoryByIdFromDomain(organizationId, catId)
}

export function useCreateCategory() {
	return useCreateCategoryFromDomain()
}

export function useUpdateCategory() {
	return useUpdateCategoryFromDomain()
}

export function useDeleteCategory() {
	return useDeleteCategoryFromDomain()
}
