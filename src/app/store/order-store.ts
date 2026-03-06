import {
	useOrderActions as domainUseOrderActions,
	useOrderSelectors as domainUseOrderSelectors,
	useOrderStore as domainUseOrderStore,
} from "@/domains/orders/store/order-store"

export const useOrderStore = domainUseOrderStore
export const useOrderSelectors = domainUseOrderSelectors
export const useOrderActions = domainUseOrderActions

export const useSelectedOrder = domainUseOrderSelectors
export const useOrdersActions = domainUseOrderActions
