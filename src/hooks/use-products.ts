import { useQuery } from "@tanstack/react-query"
import {
	getProducts,
	getProductsByCategory,
	mapProductApiToMenuItem,
	type ProductApi,
} from "@/services/products-service"
import type { MenuItem } from "@/types/dashboard"

export const productQueryKeys = {
	all: (): ["products"] => ["products"],
	list: (
		organizationId: string | null | undefined,
		categoryId?: string | null
	): [
		"products",
		"list",
		{
			organizationId: string | null | undefined
			categoryId: string | null | undefined
		},
	] => [...productQueryKeys.all(), "list", { organizationId, categoryId }],
}

export function useProducts(
	organizationId: string | null | undefined,
	categoryId?: string | null
) {
	return useQuery<ProductApi[], Error, MenuItem[]>({
		queryKey: productQueryKeys.list(organizationId, categoryId),
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
