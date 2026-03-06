import { useQuery } from "@tanstack/react-query"
import {
	getProducts,
	getProductsByCategory,
	mapProductApiToMenuItem,
} from "../api/products-api"
import type { MenuItem } from "../types/menu.types"
import type { ProductApi } from "../types/product.types"
import { productsQueryKeys } from "./products-query-keys"

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
