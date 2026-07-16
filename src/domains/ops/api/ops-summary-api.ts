import { apiFetch } from "@/utils/fetch"
import type { OpsSummaryStats } from "../types/ops-summary-types"

interface OpsSummaryResponseRaw {
	inbox?: {
		received?: number
		processing?: number
		failed?: number
	}
	dlq?: {
		open?: number
		resolved?: number
	}
}

function toSafeNumber(value: unknown) {
	if (typeof value === "number" && Number.isFinite(value)) {
		return value
	}

	return 0
}

function normalizeOpsSummary(raw: OpsSummaryResponseRaw): OpsSummaryStats {
	return {
		inbox: {
			received: toSafeNumber(raw.inbox?.received),
			processing: toSafeNumber(raw.inbox?.processing),
			failed: toSafeNumber(raw.inbox?.failed),
		},
		dlq: {
			open: toSafeNumber(raw.dlq?.open),
			resolved: toSafeNumber(raw.dlq?.resolved),
		},
	}
}

export async function getOpsSummary(
	organizationId: string,
	signal?: AbortSignal
) {
	const response = await apiFetch<OpsSummaryResponseRaw>(
		`/ops/${organizationId}/summary`,
		{ signal }
	)

	return normalizeOpsSummary(response)
}
