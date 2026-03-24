import type { OPS_REALTIME_DOMAINS } from "./ops-realtime.constants"

export type OpsRealtimeDomain = (typeof OPS_REALTIME_DOMAINS)[number]

export type OpsRealtimeConnectionStatus =
	| "idle"
	| "connecting"
	| "connected"
	| "degraded"
	| "disconnected"

export interface OpsRealtimeDomainCommandPayload {
	organizationId: string
	domain: OpsRealtimeDomain
}

export interface OrderStatusChangeRequestPayload {
	organizationId: string
	orderId: string
	status: string
}

export interface OrderStatusChangeAck {
	changed?: boolean
	errorCode?: string
	message?: string
	ok?: boolean
	reason?: string
}

export interface OpsRealtimeDomainEventPayload {
	changed?: boolean
	delta?: Record<string, unknown>
	domain?: OpsRealtimeDomain
	entityId?: string
	organizationId?: string
	orderId?: string
	snapshot?: Record<string, unknown>
	timestamp?: string
}

export interface OpsRealtimeHealthState {
	status: OpsRealtimeConnectionStatus
	isConnected: boolean
	organizationId: string | null
	lastConnectedAt: number | null
	lastDisconnectedAt: number | null
	lastError: string | null
	subscribedDomains: OpsRealtimeDomain[]
}
