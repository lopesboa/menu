import {
	useOrderActions as domainUseOrderActions,
	useOrderSelectors as domainUseOrderSelectors,
	useOrderStore as domainUseOrderStore,
	useOrdersActions as domainUseOrdersActions,
	useSelectedOrder as domainUseSelectedOrder,
} from "../model/order-store"

export const useOrderStore = domainUseOrderStore
export const useOrderSelectors = domainUseOrderSelectors
export const useOrderActions = domainUseOrderActions
export const useSelectedOrder = domainUseSelectedOrder
export const useOrdersActions = domainUseOrdersActions
