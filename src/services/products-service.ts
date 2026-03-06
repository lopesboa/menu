import {
	getProductsByCategory as getProductsByCategoryFromDomain,
	getProducts as getProductsFromDomain,
	mapProductApiToMenuItem as mapProductApiToMenuItemFromDomain,
} from "@/domains/menu/api/products-api"
import type { ProductApi as ProductApiFromDomain } from "@/domains/menu/types/product.types"

export type ProductApi = ProductApiFromDomain

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
