import { apiFetch } from "@/utils/fetch"
import type {
	InventoryItem,
	InventoryItemApi,
} from "../types/inventory-item-types"

export interface InventoryPagination {
	limit: number
	offset: number
	total: number
}

export interface InventoryListApiResponse {
	data: InventoryItemApi[]
	pagination: InventoryPagination
}

interface InventoryQueryParams {
	limit?: number
	offset?: number
	search?: string
	category?: string
	minStock?: number
	maxStock?: number
}

interface GetInventoryParams extends InventoryQueryParams {
	organizationId: string
	signal?: AbortSignal
}

function buildInventoryQueryParams(params: InventoryQueryParams): string {
	const queryParams = new URLSearchParams()

	if (typeof params.limit === "number") {
		queryParams.set(
			"limit",
			Math.min(100, Math.max(1, Math.trunc(params.limit))).toString()
		)
	}

	if (typeof params.offset === "number") {
		queryParams.set("offset", Math.max(0, Math.trunc(params.offset)).toString())
	}

	if (params.search?.trim()) {
		queryParams.set("search", params.search.trim())
	}

	if (params.category?.trim()) {
		queryParams.set("category", params.category.trim())
	}

	if (typeof params.minStock === "number") {
		queryParams.set("minStock", Math.max(0, params.minStock).toString())
	}

	if (typeof params.maxStock === "number") {
		queryParams.set("maxStock", Math.max(0, params.maxStock).toString())
	}

	return queryParams.toString()
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
	params: GetInventoryParams
): Promise<InventoryListApiResponse> {
	const queryString = buildInventoryQueryParams(params)
	const endpoint = `/inventory/${params.organizationId}${queryString ? `?${queryString}` : ""}`

	return await apiFetch<InventoryListApiResponse>(endpoint, {
		signal: params.signal,
	})
}

export async function getInventoryLowStock(
	params: GetInventoryParams
): Promise<InventoryListApiResponse> {
	const queryString = buildInventoryQueryParams(params)
	const endpoint = `/inventory/${params.organizationId}/low-stock${queryString ? `?${queryString}` : ""}`

	return await apiFetch<InventoryListApiResponse>(endpoint, {
		signal: params.signal,
	})
}
