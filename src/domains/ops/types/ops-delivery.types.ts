export type OpsDeliveryExceptionKind = "inbox" | "dead_letter" | "run"

export interface OpsDeliveryException {
	id: string
	kind: OpsDeliveryExceptionKind
	organizationId: string | null
	source: string
	eventType: string
	externalEventId: string | null
	runId: string | null
	orderId: string | null
	status: string
	attempts: number
	errorCode: string | null
	errorDetails: string | null
	hasDeadLetter: boolean
	occurredAt: string | null
	updatedAt: string | null
}

export interface OpsDeliveryExceptionsResult {
	items: OpsDeliveryException[]
	pagination: {
		limit: number
		offset: number
		total: number
	}
}

export interface OpsDeliveryReprocessResult {
	message: string
	eventId: string
}

export interface OpsDeliverySyncResult {
	message: string
	runId: string
	orderId: string | null
	status: string
	lastEventType: string | null
	lastEventAt: string | null
	syncedAt: string | null
}
