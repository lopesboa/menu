import { apiFetch } from "@/utils/fetch"
import type {
	OpsDeadLetterEvent,
	OpsDeadLetterEventsResult,
	OpsEventsPagination,
	OpsInboxEvent,
	OpsInboxEventsResult,
} from "../types/ops-events.types"

interface OpsEventsQueryParams {
	limit?: number
	offset?: number
	search?: string
	status?: string
	channel?: string
	signal?: AbortSignal
}

interface RawOpsEvent {
	id?: string
	eventId?: string
	type?: string
	eventType?: string
	status?: string
	channel?: string
	orderId?: string | null
	entityId?: string | null
	occurredAt?: string
	createdAt?: string
	updatedAt?: string | null
	attempts?: number
	retryCount?: number
	errorCode?: string | null
	lastError?: string | null
	errorMessage?: string | null
}

interface RawOpsEventsResponse {
	data?: RawOpsEvent[]
	items?: RawOpsEvent[]
	pagination?: Partial<OpsEventsPagination>
	meta?: {
		pagination?: Partial<OpsEventsPagination>
	}
}

function toSafeNumber(value: unknown, fallback = 0) {
	if (typeof value === "number" && Number.isFinite(value)) {
		return value
	}

	return fallback
}

function toSafeString(value: unknown, fallback: string) {
	if (typeof value === "string" && value.trim()) {
		return value.trim()
	}

	return fallback
}

function normalizePagination(
	pagination: Partial<OpsEventsPagination> | undefined,
	limit: number,
	offset: number,
	total: number
): OpsEventsPagination {
	return {
		limit: toSafeNumber(pagination?.limit, limit),
		offset: toSafeNumber(pagination?.offset, offset),
		total: toSafeNumber(pagination?.total, total),
	}
}

function normalizeInboxEvent(raw: RawOpsEvent): OpsInboxEvent {
	let orderId: string | null = null
	if (typeof raw.orderId === "string") {
		orderId = raw.orderId
	} else if (typeof raw.entityId === "string") {
		orderId = raw.entityId
	}

	let occurredAt: string | null = null
	if (typeof raw.occurredAt === "string" && raw.occurredAt.trim()) {
		occurredAt = raw.occurredAt
	} else if (typeof raw.createdAt === "string" && raw.createdAt.trim()) {
		occurredAt = raw.createdAt
	}

	return {
		id: toSafeString(raw.id ?? raw.eventId, "evento-sem-id"),
		eventType: toSafeString(raw.eventType ?? raw.type, "Evento operacional"),
		status: toSafeString(raw.status, "unknown"),
		channel: toSafeString(raw.channel, "operacao"),
		orderId,
		occurredAt,
		updatedAt: typeof raw.updatedAt === "string" ? raw.updatedAt : null,
		attempts: toSafeNumber(raw.attempts ?? raw.retryCount),
		errorCode: typeof raw.errorCode === "string" ? raw.errorCode : null,
	}
}

function normalizeDeadLetterEvent(raw: RawOpsEvent): OpsDeadLetterEvent {
	let lastError: string | null = null
	if (typeof raw.lastError === "string") {
		lastError = raw.lastError
	} else if (typeof raw.errorMessage === "string") {
		lastError = raw.errorMessage
	}

	return {
		...normalizeInboxEvent(raw),
		lastError,
	}
}

function buildQueryString(params: OpsEventsQueryParams) {
	const queryParams = new URLSearchParams()

	if (typeof params.limit === "number") {
		queryParams.set(
			"limit",
			Math.min(100, Math.max(1, params.limit)).toString()
		)
	}

	if (typeof params.offset === "number") {
		queryParams.set("offset", Math.max(0, params.offset).toString())
	}

	if (params.search?.trim()) {
		queryParams.set("search", params.search.trim())
	}

	if (params.status?.trim()) {
		queryParams.set("status", params.status.trim())
	}

	if (params.channel?.trim()) {
		queryParams.set("channel", params.channel.trim())
	}

	const queryString = queryParams.toString()
	return queryString ? `?${queryString}` : ""
}

export async function getInboxEvents(
	organizationId: string,
	params: OpsEventsQueryParams
): Promise<OpsInboxEventsResult> {
	const response = await apiFetch<RawOpsEventsResponse>(
		`/ops/${organizationId}/inbox-events${buildQueryString(params)}`,
		{
			signal: params.signal,
		}
	)

	const items = (response.data ?? response.items ?? []).map(normalizeInboxEvent)
	const pagination = normalizePagination(
		response.pagination ?? response.meta?.pagination,
		params.limit ?? 10,
		params.offset ?? 0,
		items.length
	)

	return { items, pagination }
}

export async function getDeadLetterEvents(
	organizationId: string,
	params: OpsEventsQueryParams
): Promise<OpsDeadLetterEventsResult> {
	const response = await apiFetch<RawOpsEventsResponse>(
		`/ops/${organizationId}/dead-letter-events${buildQueryString(params)}`,
		{
			signal: params.signal,
		}
	)

	const items = (response.data ?? response.items ?? []).map(
		normalizeDeadLetterEvent
	)
	const pagination = normalizePagination(
		response.pagination ?? response.meta?.pagination,
		params.limit ?? 10,
		params.offset ?? 0,
		items.length
	)

	return { items, pagination }
}
