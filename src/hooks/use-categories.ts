import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
	type CategoryApi,
	type CreateCategoryPayload,
	createCategory,
	deleteCategory,
	getCategories,
	getCategoryById,
	type UpdateCategoryPayload,
	updateCategory,
} from "@/services/category-service"

export const categoryQueryKeys = {
	all: (): ["categories"] => ["categories"],
	list: (
		organizationId: string | null | undefined
	): ["categories", "list", { organizationId: string | null | undefined }] => [
		...categoryQueryKeys.all(),
		"list",
		{ organizationId },
	],
	one: (
		organizationId: string | null | undefined,
		catId: string | null | undefined
	): [
		"categories",
		"one",
		{ organizationId: string | null | undefined },
		{ catId: string | null | undefined },
	] => [...categoryQueryKeys.all(), "one", { organizationId }, { catId }],
}

export function useCategories(organizationId: string | null | undefined) {
	return useQuery<CategoryApi[]>({
		queryKey: categoryQueryKeys.list(organizationId),
		queryFn: ({ signal }) => getCategories(organizationId as string, signal),
		enabled: Boolean(organizationId),
	})
}

export function useCategoryById(
	organizationId: string | null | undefined,
	catId: string | null | undefined
) {
	return useQuery<CategoryApi>({
		queryKey: categoryQueryKeys.one(organizationId, catId),
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
				queryKey: categoryQueryKeys.list(dataOrganizationId(variables.data)),
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
				queryKey: categoryQueryKeys.list(variables.organizationId),
			})
			queryClient.invalidateQueries({
				queryKey: categoryQueryKeys.one(
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
				queryKey: categoryQueryKeys.list(variables.organizationId),
			})
			queryClient.removeQueries({
				queryKey: categoryQueryKeys.one(
					variables.organizationId,
					variables.catId
				),
			})
		},
	})
}

function dataOrganizationId(data: CreateCategoryPayload): string {
	return data.organizationId
}
