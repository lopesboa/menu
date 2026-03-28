export type KdsItemStatus = "pending" | "preparing" | "ready" | "cancelled"

export interface KdsStation {
	id: string
	name: string
	slug: string
	displayOrder: number
	active: boolean
}

export interface KdsQueueItem {
	orderId: string
	orderNumber: number
	orderStatus: string
	orderType: string
	itemId: string
	productId: string
	name: string
	quantity: number
	itemStatus: KdsItemStatus
	stationId: string
	stationName: string
	notes: string | null
	createdAt: string | null
	updatedAt?: string | null
	previousStatus?: KdsItemStatus
}

export interface KdsQueueResult {
	items: KdsQueueItem[]
	pagination: {
		limit: number
		offset: number
		total: number
	}
}

export interface KdsQueueSnapshotEvent {
	items: KdsQueueItem[]
	serverTime: string
}

export interface KdsItemUpdatedEvent {
	itemId: string
	orderId: string
	orderNumber: number
	productId: string
	name: string
	quantity: number
	status: KdsItemStatus
	previousStatus?: KdsItemStatus
	stationId: string
	stationName: string
	updatedAt: string
}
