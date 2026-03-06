import {
	useTableActions as domainUseTableActions,
	useTableSelectors as domainUseTableSelectors,
	useTableStore as domainUseTableStore,
} from "../model/table-store"

export const useTableStore = domainUseTableStore
export const useTableSelectors = domainUseTableSelectors
export const useTableActions = domainUseTableActions
