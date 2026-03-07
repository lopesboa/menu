import { apiFetch } from "@/utils/fetch"
import type {
	InventoryItem,
	InventoryItemApi,
} from "../types/inventory-item-types"

interface InventoryApiEnvelope {
	inventory?: InventoryItemApi[]
	items?: InventoryItemApi[]
	data?: InventoryItemApi[]
}

type InventoryApiResponse = InventoryItemApi[] | InventoryApiEnvelope

function normalizeInventoryResponse(
	response: InventoryApiResponse
): InventoryItemApi[] {
	if (Array.isArray(response)) {
		return response
	}

	if (Array.isArray(response.inventory)) {
		return response.inventory
	}

	if (Array.isArray(response.items)) {
		return response.items
	}

	if (Array.isArray(response.data)) {
		return response.data
	}

	return []
}

export function mapInventoryApiToInventoryItem(
	item: InventoryItemApi
): InventoryItem {
	return {
		id: item.id,
		organizationId: item.organizationId,
		name: item.name?.trim() || "Item sem nome",
		quantity: item.quantity ?? 0,
		unit: item.unit?.trim() || "unidades",
		minQuantity: item.minQuantity ?? 0,
		category: item.category?.trim() || "Sem categoria",
		lastRestocked: item.lastRestocked
			? new Date(item.lastRestocked)
			: new Date(),
		costPerUnit: item.costPerUnit ?? 0,
		location: item.location ?? undefined,
		supplier: item.supplier ?? undefined,
	}
}

export async function getInventory(
	organizationId: string,
	signal?: AbortSignal
): Promise<InventoryItemApi[]> {
	const response = await apiFetch<InventoryApiResponse>(
		`/inventory/${organizationId}`,
		{ signal }
	)

	return normalizeInventoryResponse(response)
}

export async function getInventoryLowStock(
	organizationId: string,
	signal?: AbortSignal
): Promise<InventoryItemApi[]> {
	const response = await apiFetch<InventoryApiResponse>(
		`/inventory/${organizationId}/low-stock`,
		{ signal }
	)

	return normalizeInventoryResponse(response)
}
