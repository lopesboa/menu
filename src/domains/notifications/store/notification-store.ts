import { create } from "zustand"
import { generateId } from "@/utils/helpers"
import type { Notification } from "../types/notification-types"

interface NotificationStore {
	notifications: Notification[]
	addNotification: (
		notification: Omit<Notification, "id" | "createdAt" | "read">
	) => void
	markAsRead: (id: string) => void
	markAllAsRead: () => void
	removeNotification: (id: string) => void
	clearAll: () => void
}

export const useNotificationStore = create<NotificationStore>((set) => ({
	notifications: [],
	addNotification: (notification) =>
		set((state) => ({
			notifications: [
				{
					...notification,
					id: generateId(),
					createdAt: new Date(),
					read: false,
				},
				...state.notifications,
			].slice(0, 50),
		})),
	markAsRead: (id) =>
		set((state) => ({
			notifications: state.notifications.map((n) =>
				n.id === id ? { ...n, read: true } : n
			),
		})),
	markAllAsRead: () =>
		set((state) => ({
			notifications: state.notifications.map((n) => ({ ...n, read: true })),
		})),
	removeNotification: (id) =>
		set((state) => ({
			notifications: state.notifications.filter((n) => n.id !== id),
		})),
	clearAll: () => set({ notifications: [] }),
}))

export const useNotificationSelectors = () => {
	const notifications = useNotificationStore((state) => state.notifications)

	return {
		notifications,
	}
}

export const useNotificationActions = () => {
	const addNotification = useNotificationStore((state) => state.addNotification)
	const markAsRead = useNotificationStore((state) => state.markAsRead)
	const markAllAsRead = useNotificationStore((state) => state.markAllAsRead)
	const removeNotification = useNotificationStore(
		(state) => state.removeNotification
	)
	const clearAll = useNotificationStore((state) => state.clearAll)

	return {
		addNotification,
		markAsRead,
		markAllAsRead,
		removeNotification,
		clearAll,
	}
}
