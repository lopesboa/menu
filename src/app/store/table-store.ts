import { create } from "zustand"
import type { Table, TableStatus } from "@/types/dashboard"

interface TableStore {
	tables: Table[]
	selectedSection: string
	setSelectedSection: (section: string) => void
	updateTableStatus: (
		tableId: string,
		status: TableStatus,
		orderId?: string
	) => void
	getTablesBySection: (section: string) => Table[]
	getAvailableTables: () => Table[]
	getOccupiedTables: () => Table[]
}

export const useTableStore = create<TableStore>((set, get) => ({
	tables: [],
	selectedSection: "Todas",
	setSelectedSection: (section) => set({ selectedSection: section }),
	updateTableStatus: (tableId, status, orderId) =>
		set((state) => ({
			tables: state.tables.map((table) =>
				table.id === tableId
					? { ...table, status, currentOrderId: orderId }
					: table
			),
		})),
	getTablesBySection: (section) => {
		const { tables } = get()
		if (section === "Todas") {
			return tables
		}
		return tables.filter((table) => table.section === section)
	},
	getAvailableTables: () =>
		get().tables.filter((table) => table.status === "available"),
	getOccupiedTables: () =>
		get().tables.filter((table) => table.status === "occupied"),
}))
