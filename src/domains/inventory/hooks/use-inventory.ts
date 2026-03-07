import { useQuery } from "@tanstack/react-query"
import {
	getInventory,
	getInventoryLowStock,
	mapInventoryApiToInventoryItem,
} from "../api/inventory-api"
import type {
	InventoryItem,
	InventoryItemApi,
} from "../types/inventory-item-types"
import { inventoryQueryKeys } from "./use-inventory-query-keys"

export function useInventory(organizationId: string | null | undefined) {
	return useQuery<InventoryItemApi[], Error, InventoryItem[]>({
		queryKey: inventoryQueryKeys.list(organizationId),
		queryFn: ({ signal }) => getInventory(organizationId as string, signal),
		enabled: Boolean(organizationId),
		refetchInterval: 60_000,
		staleTime: 30_000,
		refetchOnWindowFocus: true,
		select: (items) => items.map(mapInventoryApiToInventoryItem),
	})
}

export function useInventoryLowStock(
	organizationId: string | null | undefined
) {
	return useQuery<InventoryItemApi[], Error, InventoryItem[]>({
		queryKey: inventoryQueryKeys.lowStock(organizationId),
		queryFn: ({ signal }) =>
			getInventoryLowStock(organizationId as string, signal),
		enabled: Boolean(organizationId),
		refetchInterval: 60_000,
		staleTime: 30_000,
		refetchOnWindowFocus: true,
		select: (items) => items.map(mapInventoryApiToInventoryItem),
	})
}
