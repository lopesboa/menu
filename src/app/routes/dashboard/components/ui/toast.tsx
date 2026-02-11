import { AnimatePresence, motion } from "framer-motion"
import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react"
import { useNotificationStore } from "@/app/store/notificationStore"
import { cn } from "@/utils/misc"

interface ToastProps {
	id: string
	type: "success" | "error" | "warning" | "info"
	title: string
	message: string
	onClose: (id: string) => void
}

const toastStyles = {
	success: "bg-green-50 border-green-200 text-green-800",
	error: "bg-red-50 border-red-200 text-red-800",
	warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
	info: "bg-blue-50 border-blue-200 text-blue-800",
}

const toastIcons = {
	success: CheckCircle,
	error: AlertCircle,
	warning: AlertTriangle,
	info: Info,
}

export function Toast({ id, type, title, message, onClose }: ToastProps) {
	const Icon = toastIcons[type]

	return (
		<motion.div
			animate={{ opacity: 1, x: 0, scale: 1 }}
			className={cn(
				"flex min-w-[320px] max-w-md items-start gap-3 rounded-xl border p-4 shadow-lg",
				toastStyles[type]
			)}
			exit={{ opacity: 0, x: 100, scale: 0.9 }}
			initial={{ opacity: 0, x: 100, scale: 0.9 }}
			transition={{ type: "spring", damping: 25, stiffness: 300 }}
		>
			<Icon className="mt-0.5 h-5 w-5 shrink-0" />
			<div className="min-w-0 flex-1">
				<p className="font-medium text-sm">{title}</p>
				<p className="mt-0.5 text-sm opacity-80">{message}</p>
			</div>
			<button
				className="shrink-0 rounded-lg p-1 transition-colors hover:bg-black/5"
				onClick={() => onClose(id)}
				type="button"
			>
				<X className="h-4 w-4" />
			</button>
		</motion.div>
	)
}

export function ToastContainer() {
	const { notifications, removeNotification } = useNotificationStore()

	const unreadNotifications = notifications.filter((n) => !n.read)

	return (
		<div className="pointer-events-none fixed top-4 right-4 z-100 flex flex-col gap-2">
			<AnimatePresence mode="popLayout">
				{unreadNotifications.slice(0, 5).map((notification) => (
					<div className="pointer-events-auto" key={notification.id}>
						<Toast
							id={notification.id}
							message={notification.message}
							onClose={removeNotification}
							title={notification.title}
							type={notification.type}
						/>
					</div>
				))}
			</AnimatePresence>
		</div>
	)
}
