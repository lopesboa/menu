export type TableStatus = "available" | "occupied" | "reserved" | "cleaning"

export type TableStatusApi = "available" | "occupied" | "reserved" | "cleaning"

export interface Table {
	id: string
	organizationId: string
	number: number
	capacity: number
	status: TableStatus
	currentOrderId?: string
	section: string
}

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
