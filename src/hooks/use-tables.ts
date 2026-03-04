import { useQuery } from "@tanstack/react-query"
import {
	getTables,
	mapTableApiToTable,
	type TableApi,
} from "@/services/tables-service"
import type { Table } from "@/types/dashboard"

export const tableQueryKeys = {
	all: (): ["tables"] => ["tables"],
	list: (
		organizationId: string | null
	): ["tables", "list", { organizationId: string | null }] => [
		...tableQueryKeys.all(),
		"list",
		{ organizationId },
	],
}

export function useTables(organizationId: string | null) {
	return useQuery<TableApi[], Error, Table[]>({
		queryKey: tableQueryKeys.list(organizationId),
		queryFn: ({ signal }) => getTables(organizationId, signal),
		enabled: Boolean(organizationId),
		refetchInterval: 30_000,
		staleTime: 10_000,
		refetchOnWindowFocus: true,
		select: (tables) => tables.map(mapTableApiToTable),
	})
}
