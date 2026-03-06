import { useQuery } from "@tanstack/react-query"
import { getTables, mapTableApiToTable } from "../api/tables-api"
import type { Table } from "../types/table.types"
import { tablesQueryKeys } from "./tables-query-keys"

export function useTables(organizationId: string | null) {
	return useQuery({
		queryKey: tablesQueryKeys.list(organizationId),
		queryFn: ({ signal }) => getTables(organizationId, signal),
		enabled: Boolean(organizationId),
		refetchInterval: 30_000,
		staleTime: 10_000,
		refetchOnWindowFocus: true,
		select: (tables): Table[] => tables.map(mapTableApiToTable),
	})
}
