import { apiFetch } from "@/utils/fetch"
import type {
	KdsQueueItem,
	KdsQueueResult,
	KdsStation,
} from "../types/kds.types"

interface GetKdsQueueParams {
	organizationId: string
	stationId: string
	limit?: number
	offset?: number
	signal?: AbortSignal
}

function normalizeStation(rawStation: Partial<KdsStation>): KdsStation {
	return {
		id: rawStation.id?.trim() || "station-sem-id",
		name: rawStation.name?.trim() || "Estacao sem nome",
		slug: rawStation.slug?.trim() || "estacao-sem-slug",
		displayOrder:
			typeof rawStation.displayOrder === "number" ? rawStation.displayOrder : 0,
		active: rawStation.active !== false,
	}
}

function normalizeKdsQueueItem(rawItem: Partial<KdsQueueItem>): KdsQueueItem {
	return {
		orderId: rawItem.orderId?.trim() || "pedido-sem-id",
		orderNumber:
			typeof rawItem.orderNumber === "number" ? rawItem.orderNumber : 0,
		orderStatus: rawItem.orderStatus?.trim() || "pending",
		orderType: rawItem.orderType?.trim() || "delivery",
		itemId: rawItem.itemId?.trim() || "item-sem-id",
		productId: rawItem.productId?.trim() || "produto-sem-id",
		name: rawItem.name?.trim() || "Item sem nome",
		quantity: typeof rawItem.quantity === "number" ? rawItem.quantity : 1,
		itemStatus: rawItem.itemStatus ?? "pending",
		stationId: rawItem.stationId?.trim() || "station-sem-id",
		stationName: rawItem.stationName?.trim() || "Estacao",
		notes: rawItem.notes?.trim() || null,
		createdAt: rawItem.createdAt?.trim() || null,
		updatedAt: rawItem.updatedAt?.trim() || null,
		previousStatus: rawItem.previousStatus,
	}
}

export async function getKdsStations(
	organizationId: string,
	signal?: AbortSignal
): Promise<KdsStation[]> {
	const response = await apiFetch<Partial<KdsStation>[]>(
		`/kds/${organizationId}/stations`,
		{ signal }
	)

	return response.map(normalizeStation).sort((left, right) => {
		return left.displayOrder - right.displayOrder
	})
}

export async function getKdsQueue({
	organizationId,
	stationId,
	limit = 50,
	offset = 0,
	signal,
}: GetKdsQueueParams): Promise<KdsQueueResult> {
	const queryParams = new URLSearchParams({
		stationId,
		limit: Math.min(100, Math.max(1, limit)).toString(),
		offset: Math.max(0, offset).toString(),
	})

	const response = await apiFetch<Partial<KdsQueueItem>[]>(
		`/kds/${organizationId}/queue?${queryParams.toString()}`,
		{ signal }
	)

	const items = response.map(normalizeKdsQueueItem)

	return {
		items,
		pagination: {
			limit,
			offset,
			total: items.length,
		},
	}
}

export { normalizeKdsQueueItem, normalizeStation }
