import { productsQueryKeys } from "@/domains/menu/hooks/products-query-keys"
import { useProducts as useProductsFromDomain } from "@/domains/menu/hooks/use-products"

export const productQueryKeys = productsQueryKeys

export function useProducts(
	organizationId: string | null | undefined,
	categoryId?: string | null
) {
	return useProductsFromDomain(organizationId, categoryId)
}
