import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { sentryCaptureException } from "@/lib/sentry"
import { ApiRequestError } from "@/utils/fetch"
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
import {
	categoriesQueryKeys,
	invalidateCategoriesCache,
} from "./categories-query-keys"

function getErrorCode(error: unknown): string | undefined {
	if (error instanceof ApiRequestError) {
		return error.errorCode
	}
	return undefined
}

function getCategoryErrorMessage(error: unknown): string {
	const errorCode = getErrorCode(error)

	if (errorCode) {
		switch (errorCode) {
			case "CATEGORY_NOT_FOUND":
				return "Categoria não encontrada"
			case "FORBIDDEN":
				return "Seu perfil não tem permissão para esta ação"
			case "VALIDATION_ERROR":
				return "Dados inválidos para a categoria"
			default:
				return "Não foi possível processar a categoria"
		}
	}

	return "Não foi possível processar a categoria"
}

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
		mutationKey: categoriesQueryKeys.mutations.create(undefined),
		mutationFn: ({
			data,
			signal,
		}: {
			data: CreateCategoryPayload
			signal?: AbortSignal
		}) => createCategory(data, signal),
		onSuccess: (_, variables) => {
			invalidateCategoriesCache(queryClient, variables.data.organizationId)
		},
		onError: (error, variables) => {
			toast.error(getCategoryErrorMessage(error))
			sentryCaptureException(error, {
				context: "categories_create",
				organizationId: variables.data.organizationId,
			})
		},
	})
}

export function useUpdateCategory() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: categoriesQueryKeys.mutations.update(undefined),
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
			invalidateCategoriesCache(
				queryClient,
				variables.organizationId,
				variables.catId
			)
		},
		onError: (error, variables) => {
			toast.error(getCategoryErrorMessage(error))
			sentryCaptureException(error, {
				context: "categories_update",
				organizationId: variables.organizationId,
				catId: variables.catId,
			})
		},
	})
}

export function useDeleteCategory() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: categoriesQueryKeys.mutations.remove(undefined),
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
			invalidateCategoriesCache(queryClient, variables.organizationId)
			queryClient.removeQueries({
				queryKey: categoriesQueryKeys.one(
					variables.organizationId,
					variables.catId
				),
			})
		},
		onError: (error, variables) => {
			toast.error(getCategoryErrorMessage(error))
			sentryCaptureException(error, {
				context: "categories_delete",
				organizationId: variables.organizationId,
				catId: variables.catId,
			})
		},
	})
}
