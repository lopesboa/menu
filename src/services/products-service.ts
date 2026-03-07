import {
	createProduct as createProductFromDomain,
	deleteProduct as deleteProductFromDomain,
	getProductById as getProductByIdFromDomain,
	getProductsByCategory as getProductsByCategoryFromDomain,
	getProducts as getProductsFromDomain,
	mapProductApiToMenuItem as mapProductApiToMenuItemFromDomain,
	updateProduct as updateProductFromDomain,
} from "@/domains/menu/api/products-api"
import type {
	CreateProductPayload as CreateProductPayloadFromDomain,
	ProductApi as ProductApiFromDomain,
	UpdateProductPayload as UpdateProductPayloadFromDomain,
} from "@/domains/menu/types/product.types"

export type ProductApi = ProductApiFromDomain
export type CreateProductPayload = CreateProductPayloadFromDomain
export type UpdateProductPayload = UpdateProductPayloadFromDomain

export const mapProductApiToMenuItem = mapProductApiToMenuItemFromDomain

export function getProducts(organizationId: string, signal?: AbortSignal) {
	return getProductsFromDomain(organizationId, signal)
}

export function getProductsByCategory(
	organizationId: string,
	categoryId: string,
	signal?: AbortSignal
) {
	return getProductsByCategoryFromDomain(organizationId, categoryId, signal)
}

export function getProductById(
	organizationId: string,
	productId: string,
	signal?: AbortSignal
) {
	return getProductByIdFromDomain(organizationId, productId, signal)
}

export function createProduct(
	data: CreateProductPayload,
	signal?: AbortSignal
) {
	return createProductFromDomain(data, signal)
}

export function updateProduct(
	organizationId: string,
	productId: string,
	data: UpdateProductPayload,
	signal?: AbortSignal
) {
	return updateProductFromDomain(organizationId, productId, data, signal)
}

export function deleteProduct(
	organizationId: string,
	productId: string,
	signal?: AbortSignal
) {
	return deleteProductFromDomain(organizationId, productId, signal)
}
