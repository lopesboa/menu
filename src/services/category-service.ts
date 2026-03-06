import {
	createCategory as createCategoryFromDomain,
	deleteCategory as deleteCategoryFromDomain,
	getCategories as getCategoriesFromDomain,
	getCategoryById as getCategoryByIdFromDomain,
	updateCategory as updateCategoryFromDomain,
} from "@/domains/categories/api/categories-api"
import type {
	CategoryApi as CategoryApiFromDomain,
	CreateCategoryPayload as CreateCategoryPayloadFromDomain,
	UpdateCategoryPayload as UpdateCategoryPayloadFromDomain,
} from "@/domains/categories/types/category.types"

export type CategoryApi = CategoryApiFromDomain
export type CreateCategoryPayload = CreateCategoryPayloadFromDomain
export type UpdateCategoryPayload = UpdateCategoryPayloadFromDomain

export function getCategories(organizationId: string, signal?: AbortSignal) {
	return getCategoriesFromDomain(organizationId, signal)
}

export function getCategoryById(
	organizationId: string,
	catId: string,
	signal?: AbortSignal
) {
	return getCategoryByIdFromDomain(organizationId, catId, signal)
}

export function createCategory(
	data: CreateCategoryPayload,
	signal?: AbortSignal
) {
	return createCategoryFromDomain(data, signal)
}

export function updateCategory(
	organizationId: string,
	catId: string,
	data: UpdateCategoryPayload,
	signal?: AbortSignal
) {
	return updateCategoryFromDomain(organizationId, catId, data, signal)
}

export function deleteCategory(
	organizationId: string,
	catId: string,
	signal?: AbortSignal
) {
	return deleteCategoryFromDomain(organizationId, catId, signal)
}
