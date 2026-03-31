import { apiFetch } from "@/utils/fetch"
import type {
	KdsItemStatus,
	KdsItemStatusUpdateResult,
	KdsQueueItem,
	KdsQueueResult,
	KdsStation,
} from "../types/kds-types"

interface GetKdsQueueParams {
	organizationId: string
	stationId: string
	limit?: number
	offset?: number
	signal?: AbortSignal
}

interface RawKdsPagination {
	limit?: number
	offset?: number
	total?: number
}

interface RawKdsQueueResponse {
	data?: Partial<KdsQueueItem>[]
	items?: Partial<KdsQueueItem>[]
	pagination?: RawKdsPagination
	meta?: {
		pagination?: RawKdsPagination
	}
}

interface RawKdsStationsResponse {
	data?: Partial<KdsStation>[]
	items?: Partial<KdsStation>[]
}

interface RawKdsItemStatusUpdateResult {
	success?: boolean
	item?: Partial<KdsQueueItem> & {
		status?: KdsItemStatus
	}
}

function toSafeNumber(value: unknown, fallback: number) {
	if (typeof value === "number" && Number.isFinite(value)) {
		return value
	}

	return fallback
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
	const response = await apiFetch<
		Partial<KdsStation>[] | RawKdsStationsResponse
	>(`/kds/${organizationId}/stations`, { signal })

	const items = Array.isArray(response)
		? response
		: (response.data ?? response.items ?? [])

	return items.map(normalizeStation).sort((left, right) => {
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
	const normalizedLimit = Math.min(100, Math.max(1, limit))
	const normalizedOffset = Math.max(0, offset)
	const queryParams = new URLSearchParams({
		stationId,
		limit: normalizedLimit.toString(),
		offset: normalizedOffset.toString(),
	})

	const response = await apiFetch<
		Partial<KdsQueueItem>[] | RawKdsQueueResponse
	>(`/kds/${organizationId}/queue?${queryParams.toString()}`, { signal })

	const rawItems = Array.isArray(response)
		? response
		: (response.data ?? response.items ?? [])
	const pagination = Array.isArray(response)
		? undefined
		: (response.pagination ?? response.meta?.pagination)
	const items = rawItems.map(normalizeKdsQueueItem)

	return {
		items,
		pagination: {
			limit: toSafeNumber(pagination?.limit, normalizedLimit),
			offset: toSafeNumber(pagination?.offset, normalizedOffset),
			total: toSafeNumber(pagination?.total, items.length),
		},
	}
}

export async function updateKdsItemStatus(
	organizationId: string,
	itemId: string,
	status: KdsItemStatus,
	signal?: AbortSignal
): Promise<KdsItemStatusUpdateResult> {
	const response = await apiFetch<RawKdsItemStatusUpdateResult>(
		`/kds/${organizationId}/items/${itemId}/status`,
		{
			method: "PATCH",
			body: JSON.stringify({ status }),
			signal,
		}
	)

	return {
		success: response.success === true,
		item: normalizeKdsQueueItem({
			...response.item,
			itemStatus: response.item?.status,
		}),
	}
}

export { normalizeKdsQueueItem, normalizeStation }
