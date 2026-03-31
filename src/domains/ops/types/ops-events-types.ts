export interface OpsEventsPagination {
	limit: number
	offset: number
	total: number
}

export interface OpsInboxEvent {
	id: string
	eventType: string
	status: string
	channel: string
	orderId: string | null
	occurredAt: string | null
	updatedAt: string | null
	attempts: number
	errorCode: string | null
}

export interface OpsDeadLetterEvent {
	id: string
	eventType: string
	status: string
	channel: string
	orderId: string | null
	occurredAt: string | null
	updatedAt: string | null
	attempts: number
	errorCode: string | null
	lastError: string | null
}

export interface OpsInboxEventsResult {
	items: OpsInboxEvent[]
	pagination: OpsEventsPagination
}

export interface OpsDeadLetterEventsResult {
	items: OpsDeadLetterEvent[]
	pagination: OpsEventsPagination
}
