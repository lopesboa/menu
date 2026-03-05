import {
	useCartActions as domainUseCartActions,
	useCartSelectors as domainUseCartSelectors,
	useCartStore as domainUseCartStore,
} from "@/domains/pos/store/cart-store"

export const useCartStore = domainUseCartStore
export const useCartSelectors = domainUseCartSelectors
export const useCartActions = domainUseCartActions
