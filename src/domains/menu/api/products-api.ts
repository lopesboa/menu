import { apiFetch } from "@/utils/fetch"
import type { MenuItem } from "../types/menu.types"
import type { ProductApi } from "../types/product.types"

const DEFAULT_CATEGORY_NAME = "Sem categoria"

export function mapProductApiToMenuItem(product: ProductApi): MenuItem {
	return {
		...product,
		description: product.description ?? "",
		category: product.categoryName?.trim() || DEFAULT_CATEGORY_NAME,
		image: product.imageUrl ?? "",
		preparationTime: product.prepTime ?? 0,
		allergens: product.allergens ?? [],
	}
}

export function getProducts(
	organizationId: string,
	signal?: AbortSignal
): Promise<ProductApi[]> {
	return apiFetch<ProductApi[]>(`/products/${organizationId}`, { signal })
}

export function getProductsByCategory(
	organizationId: string,
	categoryId: string,
	signal?: AbortSignal
): Promise<ProductApi[]> {
	return apiFetch<ProductApi[]>(
		`/products/${organizationId}/by-category/${categoryId}`,
		{
			signal,
		}
	)
}
