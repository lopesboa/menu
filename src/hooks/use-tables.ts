import { tablesQueryKeys as domainTablesQueryKeys } from "@/domains/tables/hooks/tables-query-keys"
import { useTables as domainUseTables } from "@/domains/tables/hooks/use-tables"

export const tableQueryKeys = {
	all: (): ["tables"] => ["tables"],
	list: (organizationId: string | null) =>
		domainTablesQueryKeys.list(organizationId),
}

export function useTables(organizationId: string | null) {
	return domainUseTables(organizationId)
}
