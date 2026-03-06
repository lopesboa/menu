import {
	useNotificationActions as domainUseNotificationActions,
	useNotificationSelectors as domainUseNotificationSelectors,
	useNotificationStore as domainUseNotificationStore,
} from "@/domains/notifications/store/notification-store"

export const useNotificationStore = domainUseNotificationStore
export const useNotificationSelectors = domainUseNotificationSelectors
export const useNotificationActions = domainUseNotificationActions
