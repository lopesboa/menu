import { apiFetch } from "@/utils/fetch"
import type {
	Table,
	TableApi,
	TableStatus,
	TableStatusApi,
} from "../types/table.types"

const TABLE_STATUS_VALUES: TableStatus[] = [
	"available",
	"occupied",
	"reserved",
	"cleaning",
]

function normalizeStatus(status: TableStatusApi): TableStatus {
	return TABLE_STATUS_VALUES.includes(status) ? status : "available"
}

export function mapTableApiToTable(table: TableApi): Table {
	return {
		id: table.id,
		organizationId: table.organizationId,
		number: table.number,
		capacity: table.capacity,
		status: normalizeStatus(table.status),
		section: table.section?.trim() || "Sem seção",
		currentOrderId: table.currentOrderId ?? undefined,
	}
}

export function getTables(
	organizationId: string | null,
	signal?: AbortSignal
): Promise<TableApi[]> {
	return apiFetch<TableApi[]>(`/tables/${organizationId}`, { signal })
}
