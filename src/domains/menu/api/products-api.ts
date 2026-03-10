import { apiFetch } from "@/utils/fetch"
import type { MenuItem } from "../types/menu.types"
import type {
	CreateProductPayload,
	ProductApi,
	UpdateProductPayload,
} from "../types/product.types"

const DEFAULT_CATEGORY_NAME = "Sem categoria"

export function mapProductApiToMenuItem(product: ProductApi): MenuItem {
	return {
		...product,
		categoryId: product.categoryId,
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

export function getProductById(
	organizationId: string,
	productId: string,
	signal?: AbortSignal
): Promise<ProductApi> {
	return apiFetch<ProductApi>(`/products/${organizationId}/${productId}`, {
		signal,
	})
}

export function createProduct(
	data: CreateProductPayload,
	signal?: AbortSignal
): Promise<ProductApi> {
	return apiFetch<ProductApi>("/products", {
		signal,
		method: "POST",
		body: JSON.stringify(data),
	})
}

export function updateProduct(
	organizationId: string,
	productId: string,
	data: UpdateProductPayload,
	signal?: AbortSignal
): Promise<ProductApi> {
	return apiFetch<ProductApi>(`/products/${organizationId}/${productId}`, {
		signal,
		method: "PATCH",
		body: JSON.stringify(data),
	})
}

export function deleteProduct(
	organizationId: string,
	productId: string,
	signal?: AbortSignal
): Promise<{ success: boolean } | { message: string } | unknown> {
	return apiFetch(`/products/${organizationId}/${productId}`, {
		signal,
		method: "DELETE",
	})
}
