import type { MenuItem } from "@/types/dashboard"
import { apiFetch } from "@/utils/fetch"

export interface ProductApi {
	id: string
	categoryId: string
	categoryName: string | null
	organizationId: string
	name: string
	description: string | null
	price: string | number
	imageUrl: string | null
	available: boolean
	calories: number | undefined
	allergens: string[] | null
	isNew: boolean
	isSignature: boolean
	order: number | null
	prepTime: number | null
	createdAt: string
	updatedAt: string
}

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
