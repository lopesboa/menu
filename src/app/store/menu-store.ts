import {
	useMenuActions as domainUseMenuActions,
	useMenuSelectors as domainUseMenuSelectors,
	useMenuStore as domainUseMenuStore,
} from "@/domains/menu/store/menu-store"

export const useMenuStore = domainUseMenuStore
export const useMenuSelectors = domainUseMenuSelectors
export const useMenuActions = domainUseMenuActions
