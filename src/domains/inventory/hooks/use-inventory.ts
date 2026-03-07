import { useQuery } from "@tanstack/react-query"
import {
	getInventory,
	getInventoryLowStock,
	type InventoryListApiResponse,
	type InventoryPagination,
	mapInventoryApiToInventoryItem,
} from "../api/inventory-api"
import type { InventoryItem } from "../types/inventory-item-types"
import { inventoryQueryKeys } from "./use-inventory-query-keys"

export interface InventoryFilters {
	search?: string
	category?: string
	minStock?: number
	maxStock?: number
}

interface UseInventoryParams extends InventoryFilters {
	organizationId: string | null | undefined
	limit?: number
	offset?: number
}

export interface InventoryListResult {
	items: InventoryItem[]
	pagination: InventoryPagination
}

export function useInventory({
	organizationId,
	limit = 20,
	offset = 0,
	search,
	category,
	minStock,
	maxStock,
}: UseInventoryParams) {
	return useQuery<InventoryListApiResponse, Error, InventoryListResult>({
		queryKey: inventoryQueryKeys.list(organizationId, {
			limit,
			offset,
			search,
			category,
			minStock,
			maxStock,
		}),
		queryFn: ({ signal }) =>
			getInventory({
				organizationId: organizationId as string,
				limit,
				offset,
				search,
				category,
				minStock,
				maxStock,
				signal,
			}),
		enabled: Boolean(organizationId),
		refetchInterval: 60_000,
		staleTime: 30_000,
		refetchOnWindowFocus: true,
		select: (response) => ({
			items: response.data.map(mapInventoryApiToInventoryItem),
			pagination: response.pagination,
		}),
	})
}

export function useInventoryLowStock(params: UseInventoryParams) {
	const {
		organizationId,
		limit = 20,
		offset = 0,
		search,
		category,
		minStock,
		maxStock,
	} = params

	return useQuery<InventoryListApiResponse, Error, InventoryListResult>({
		queryKey: inventoryQueryKeys.lowStock(organizationId, {
			limit,
			offset,
			search,
			category,
			minStock,
			maxStock,
		}),
		queryFn: ({ signal }) =>
			getInventoryLowStock({
				organizationId: organizationId as string,
				limit,
				offset,
				search,
				category,
				minStock,
				maxStock,
				signal,
			}),
		enabled: Boolean(organizationId),
		refetchInterval: 60_000,
		staleTime: 30_000,
		refetchOnWindowFocus: true,
		select: (response) => ({
			items: response.data.map(mapInventoryApiToInventoryItem),
			pagination: response.pagination,
		}),
	})
}
