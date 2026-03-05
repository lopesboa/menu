import {
	useTableActions as domainUseTableActions,
	useTableSelectors as domainUseTableSelectors,
	useTableStore as domainUseTableStore,
} from "@/domains/tables/store/table-store"

export const useTableStore = domainUseTableStore
export const useTableSelectors = domainUseTableSelectors
export const useTableActions = domainUseTableActions
