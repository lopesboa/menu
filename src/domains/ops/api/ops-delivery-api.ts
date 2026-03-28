import { apiFetch } from "@/utils/fetch"
import type {
	OpsDeliveryException,
	OpsDeliveryExceptionsResult,
} from "../types/ops-delivery.types"

interface DeliveryExceptionsQueryParams {
	status?: string
	source?: string
	from?: string
	to?: string
	limit?: number
	offset?: number
	signal?: AbortSignal
}

interface RawOpsDeliveryException {
	id?: string
	kind?: string
	organizationId?: string | null
	source?: string
	eventType?: string
	externalEventId?: string | null
	runId?: string | null
	orderId?: string | null
	status?: string
	attempts?: number
	errorCode?: string | null
	errorDetails?: string | null
	hasDeadLetter?: boolean
	occurredAt?: string | null
	updatedAt?: string | null
}

interface RawDeliveryExceptionsResponse {
	data?: RawOpsDeliveryException[]
	items?: RawOpsDeliveryException[]
	pagination?: {
		limit?: number
		offset?: number
		total?: number
	}
	meta?: {
		pagination?: {
			limit?: number
			offset?: number
			total?: number
		}
	}
}

function toSafeString(value: unknown, fallback: string) {
	if (typeof value === "string" && value.trim()) {
		return value.trim()
	}

	return fallback
}

function toSafeNullableString(value: unknown) {
	if (typeof value === "string" && value.trim()) {
		return value.trim()
	}

	return null
}

function toSafeNumber(value: unknown, fallback: number) {
	if (typeof value === "number" && Number.isFinite(value)) {
		return value
	}

	return fallback
}

function normalizeDeliveryException(
	raw: RawOpsDeliveryException
): OpsDeliveryException {
	const kind = toSafeString(raw.kind, "inbox")

	return {
		id: toSafeString(raw.id, "evento-delivery-sem-id"),
		kind:
			kind === "dead_letter" || kind === "run" || kind === "inbox"
				? kind
				: "inbox",
		organizationId: toSafeNullableString(raw.organizationId),
		source: toSafeString(raw.source, "delivery"),
		eventType: toSafeString(raw.eventType, "Evento de delivery"),
		externalEventId: toSafeNullableString(raw.externalEventId),
		runId: toSafeNullableString(raw.runId),
		orderId: toSafeNullableString(raw.orderId),
		status: toSafeString(raw.status, "unknown"),
		attempts: toSafeNumber(raw.attempts, 0),
		errorCode: toSafeNullableString(raw.errorCode),
		errorDetails: toSafeNullableString(raw.errorDetails),
		hasDeadLetter: raw.hasDeadLetter === true,
		occurredAt: toSafeNullableString(raw.occurredAt),
		updatedAt: toSafeNullableString(raw.updatedAt),
	}
}

function buildQueryString(params: DeliveryExceptionsQueryParams) {
	const queryParams = new URLSearchParams()

	if (params.status?.trim()) {
		queryParams.set("status", params.status.trim())
	}

	if (params.source?.trim()) {
		queryParams.set("source", params.source.trim())
	}

	if (params.from?.trim()) {
		queryParams.set("from", params.from.trim())
	}

	if (params.to?.trim()) {
		queryParams.set("to", params.to.trim())
	}

	if (typeof params.limit === "number") {
		queryParams.set(
			"limit",
			Math.min(100, Math.max(1, params.limit)).toString()
		)
	}

	if (typeof params.offset === "number") {
		queryParams.set("offset", Math.max(0, params.offset).toString())
	}

	const queryString = queryParams.toString()
	return queryString ? `?${queryString}` : ""
}

export async function getDeliveryExceptions(
	organizationId: string,
	params: DeliveryExceptionsQueryParams
): Promise<OpsDeliveryExceptionsResult> {
	const response = await apiFetch<RawDeliveryExceptionsResponse>(
		`/ops/${organizationId}/delivery-exceptions${buildQueryString(params)}`,
		{ signal: params.signal }
	)

	const items = (response.data ?? response.items ?? []).map(
		normalizeDeliveryException
	)
	const pagination = response.pagination ?? response.meta?.pagination

	return {
		items,
		pagination: {
			limit: toSafeNumber(pagination?.limit, params.limit ?? 10),
			offset: toSafeNumber(pagination?.offset, params.offset ?? 0),
			total: toSafeNumber(pagination?.total, items.length),
		},
	}
}
