import { create } from "zustand"
import type { Notification } from "@/types/dashboard"
import { generateId } from "@/utils/helpers"

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
