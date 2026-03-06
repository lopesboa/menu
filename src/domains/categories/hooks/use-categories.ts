import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
	createCategory,
	deleteCategory,
	getCategories,
	getCategoryById,
	updateCategory,
} from "../api/categories-api"
import type {
	CategoryApi,
	CreateCategoryPayload,
	UpdateCategoryPayload,
} from "../types/category.types"
import { categoriesQueryKeys } from "./categories-query-keys"

export function useCategories(organizationId: string | null | undefined) {
	return useQuery<CategoryApi[]>({
		queryKey: categoriesQueryKeys.list(organizationId),
		queryFn: ({ signal }) => getCategories(organizationId as string, signal),
		enabled: Boolean(organizationId),
	})
}

export function useCategoryById(
	organizationId: string | null | undefined,
	catId: string | null | undefined
) {
	return useQuery<CategoryApi>({
		queryKey: categoriesQueryKeys.one(organizationId, catId),
		queryFn: ({ signal }) =>
			getCategoryById(organizationId as string, catId as string, signal),
		enabled: Boolean(organizationId && catId),
	})
}

export function useCreateCategory() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({
			data,
			signal,
		}: {
			data: CreateCategoryPayload
			signal?: AbortSignal
		}) => createCategory(data, signal),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: categoriesQueryKeys.list(variables.data.organizationId),
			})
		},
	})
}

export function useUpdateCategory() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({
			organizationId,
			catId,
			data,
			signal,
		}: {
			organizationId: string
			catId: string
			data: UpdateCategoryPayload
			signal?: AbortSignal
		}) => updateCategory(organizationId, catId, data, signal),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: categoriesQueryKeys.list(variables.organizationId),
			})
			queryClient.invalidateQueries({
				queryKey: categoriesQueryKeys.one(
					variables.organizationId,
					variables.catId
				),
			})
		},
	})
}

export function useDeleteCategory() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({
			organizationId,
			catId,
			signal,
		}: {
			organizationId: string
			catId: string
			signal?: AbortSignal
		}) => deleteCategory(organizationId, catId, signal),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({
				queryKey: categoriesQueryKeys.list(variables.organizationId),
			})
			queryClient.removeQueries({
				queryKey: categoriesQueryKeys.one(
					variables.organizationId,
					variables.catId
				),
			})
		},
	})
}
