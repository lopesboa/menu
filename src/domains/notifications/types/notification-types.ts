export interface Notification {
	id: string
	type: "info" | "success" | "warning" | "error"
	title: string
	message: string
	read: boolean
	createdAt: Date
	actionUrl?: string
}
