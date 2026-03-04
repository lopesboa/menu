import type { Table, TableStatus } from "@/types/dashboard"
import { apiFetch } from "@/utils/fetch"

export type TableStatusApi = "available" | "occupied" | "reserved" | "cleaning"

export interface TableApi {
	id: string
	organizationId: string
	number: number
	capacity: number
	status: TableStatusApi
	section: string | null
	currentOrderId: string | null
	createdAt: string
	updatedAt: string
}

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
	organizationId: string,
	signal?: AbortSignal
): Promise<TableApi[]> {
	return apiFetch<TableApi[]>(`/tables/${organizationId}`, { signal })
}
