/** biome-ignore-all lint/a11y/useKeyWithClickEvents: Notification overlay requires click handling without keyboard events */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: Notification overlay uses click handler for closing */
/** biome-ignore-all lint/a11y/noNoninteractiveElementInteractions: Notification container needs click handling */

import { motion } from "framer-motion"
import { Bell, X } from "lucide-react"
import type { MouseEventHandler } from "react"
import type { Notification } from "@/types/dashboard"
import { cn } from "@/utils/misc"

interface NotificationProps {
	onClick: MouseEventHandler<HTMLDivElement> | undefined
	unreadCount: number
	markAllAsRead: MouseEventHandler<HTMLButtonElement> | undefined
	removeNotification: (id: string) => void
	markAsRead: (id: string) => void
	notifications: Notification[]
}

export function Notifications({
	onClick,
	unreadCount,
	markAllAsRead,
	removeNotification,
	markAsRead,
	notifications,
}: NotificationProps) {
	return (
		<>
			<div className="fixed inset-0 z-40" onClick={onClick} />
			<motion.div
				animate={{ opacity: 1, y: 0, scale: 1 }}
				className="absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-surface-100 bg-white shadow-xl"
				exit={{ opacity: 0, y: 10, scale: 0.95 }}
				initial={{ opacity: 0, y: 10, scale: 0.95 }}
			>
				<div className="flex items-center justify-between border-surface-100 border-b px-4 py-3">
					<h3 className="font-semibold text-surface-900">Notificações</h3>
					{unreadCount > 0 && (
						<button
							className="font-medium text-primary-600 text-xs hover:text-primary-700"
							onClick={markAllAsRead}
							type="button"
						>
							Marcar todas como lidas
						</button>
					)}
				</div>
				<div className="max-h-96 overflow-y-auto">
					{notifications.length === 0 ? (
						<div className="p-8 text-center text-surface-500">
							<Bell className="mx-auto mb-2 h-12 w-12 opacity-50" />
							<p>Nenhuma notificação</p>
						</div>
					) : (
						notifications.slice(0, 10).map((notification) => (
							<div
								className={cn(
									"cursor-pointer border-surface-50 border-b px-4 py-3 transition-colors hover:bg-surface-50",
									!notification.read && "bg-primary-50/50"
								)}
								key={notification.id}
								onClick={() => markAsRead(notification.id)}
							>
								<div className="flex items-start gap-3">
									<div
										className={cn(
											"mt-2 h-2 w-2 shrink-0 rounded-full",
											notification.type === "success" && "bg-green-500",
											notification.type === "error" && "bg-red-500",
											notification.type === "warning" && "bg-yellow-500",
											notification.type === "info" && "bg-blue-500"
										)}
									/>
									<div className="min-w-0 flex-1">
										<p className="font-medium text-sm text-surface-900">
											{notification.title}
										</p>
										<p className="truncate text-sm text-surface-500">
											{notification.message}
										</p>
									</div>
									<button
										className="rounded p-1 hover:bg-surface-100"
										onClick={(e) => {
											e.stopPropagation()
											removeNotification(notification.id)
										}}
										type="button"
									>
										<X className="h-3 w-3 text-surface-400" />
									</button>
								</div>
							</div>
						))
					)}
				</div>
			</motion.div>
		</>
	)
}
