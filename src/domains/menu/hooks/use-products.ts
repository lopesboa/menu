import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { sentryCaptureException } from "@/lib/sentry"
import {
	createProduct,
	deleteProduct,
	getProductById,
	getProducts,
	getProductsByCategory,
	mapProductApiToMenuItem,
	updateProduct,
} from "../api/products-api"
import type { MenuItem } from "../types/menu.types"
import type {
	CreateProductPayload,
	ProductApi,
	UpdateProductPayload,
} from "../types/product.types"
import {
	invalidateProductsCache,
	productsQueryKeys,
} from "./products-query-keys"

export function useProducts(
	organizationId: string | null | undefined,
	categoryId?: string | null
) {
	return useQuery<ProductApi[], Error, MenuItem[]>({
		queryKey: productsQueryKeys.list(organizationId, categoryId),
		queryFn: ({ signal }) => {
			const orgId = organizationId as string
			if (categoryId) {
				return getProductsByCategory(orgId, categoryId, signal)
			}

			return getProducts(orgId, signal)
		},
		enabled: Boolean(organizationId),
		refetchInterval: 120_000,
		staleTime: 60_000,
		refetchOnWindowFocus: true,
		select: (products) => products.map(mapProductApiToMenuItem),
	})
}

export function useProductById(
	organizationId: string | null | undefined,
	productId: string | null | undefined
) {
	return useQuery<ProductApi>({
		queryKey: productsQueryKeys.one(organizationId, productId),
		queryFn: ({ signal }) =>
			getProductById(organizationId as string, productId as string, signal),
		enabled: Boolean(organizationId && productId),
	})
}

export function useCreateProduct() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: productsQueryKeys.mutations.create(undefined),
		mutationFn: ({
			data,
			signal,
		}: {
			data: CreateProductPayload
			signal?: AbortSignal
		}) => createProduct(data, signal),
		onSuccess: (_, variables) => {
			invalidateProductsCache(queryClient, variables.data.organizationId)
		},
		onError: (error, variables) => {
			sentryCaptureException(error, {
				context: "products_create",
				organizationId: variables.data.organizationId,
			})
		},
	})
}

export function useUpdateProduct() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: productsQueryKeys.mutations.update(undefined),
		mutationFn: ({
			organizationId,
			productId,
			data,
			signal,
		}: {
			organizationId: string
			productId: string
			data: UpdateProductPayload
			signal?: AbortSignal
		}) => updateProduct(organizationId, productId, data, signal),
		onSuccess: (_, variables) => {
			invalidateProductsCache(
				queryClient,
				variables.organizationId,
				variables.productId
			)
		},
		onError: (error, variables) => {
			sentryCaptureException(error, {
				context: "products_update",
				organizationId: variables.organizationId,
				productId: variables.productId,
			})
		},
	})
}

export function useDeleteProduct() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: productsQueryKeys.mutations.remove(undefined),
		mutationFn: ({
			organizationId,
			productId,
			signal,
		}: {
			organizationId: string
			productId: string
			signal?: AbortSignal
		}) => deleteProduct(organizationId, productId, signal),
		onSuccess: (_, variables) => {
			invalidateProductsCache(
				queryClient,
				variables.organizationId,
				variables.productId
			)
			queryClient.removeQueries({
				queryKey: productsQueryKeys.one(
					variables.organizationId,
					variables.productId
				),
			})
		},
		onError: (error, variables) => {
			sentryCaptureException(error, {
				context: "products_delete",
				organizationId: variables.organizationId,
				productId: variables.productId,
			})
		},
	})
}
