import { productsQueryKeys } from "@/domains/menu/hooks/products-query-keys"
import {
	useCreateProduct as useCreateProductFromDomain,
	useDeleteProduct as useDeleteProductFromDomain,
	useProductById as useProductByIdFromDomain,
	useProducts as useProductsFromDomain,
	useUpdateProduct as useUpdateProductFromDomain,
} from "@/domains/menu/hooks/use-products"
import type {
	CreateProductPayload as CreateProductPayloadFromDomain,
	ProductApi as ProductApiFromDomain,
	UpdateProductPayload as UpdateProductPayloadFromDomain,
} from "@/domains/menu/types/product.types"

export type ProductApi = ProductApiFromDomain
export type CreateProductPayload = CreateProductPayloadFromDomain
export type UpdateProductPayload = UpdateProductPayloadFromDomain

export const productQueryKeys = productsQueryKeys

export function useProducts(
	organizationId: string | null | undefined,
	categoryId?: string | null
) {
	return useProductsFromDomain(organizationId, categoryId)
}

export function useProductById(
	organizationId: string | null | undefined,
	productId: string | null | undefined
) {
	return useProductByIdFromDomain(organizationId, productId)
}

export function useCreateProduct() {
	return useCreateProductFromDomain()
}

export function useUpdateProduct() {
	return useUpdateProductFromDomain()
}

export function useDeleteProduct() {
	return useDeleteProductFromDomain()
}
