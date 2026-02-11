import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { useEffect } from "react"
import { cn } from "@/utils/misc"

interface ModalProps {
	isOpen: boolean
	onClose: () => void
	title?: string
	children: React.ReactNode
	size?: "sm" | "md" | "lg" | "xl" | "full"
	className?: string
}

const sizeClasses = {
	sm: "max-w-md",
	md: "max-w-lg",
	lg: "max-w-2xl",
	xl: "max-w-4xl",
	full: "max-w-[90vw]",
}

export function Modal({
	isOpen,
	onClose,
	title,
	children,
	size = "md",
	className,
}: ModalProps) {
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose()
			}
		}

		if (isOpen) {
			document.addEventListener("keydown", handleEscape)
			document.body.style.overflow = "hidden"
		}

		return () => {
			document.removeEventListener("keydown", handleEscape)
			document.body.style.overflow = "unset"
		}
	}, [isOpen, onClose])

	return (
		<AnimatePresence>
			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center">
					<motion.div
						animate={{ opacity: 1 }}
						className="absolute inset-0 bg-black/50 backdrop-blur-sm"
						exit={{ opacity: 0 }}
						initial={{ opacity: 0 }}
						onClick={onClose}
						transition={{ duration: 0.2 }}
					/>
					<motion.div
						animate={{ opacity: 1, scale: 1, y: 0 }}
						className={cn(
							"relative w-full overflow-hidden rounded-2xl bg-white shadow-2xl",
							sizeClasses[size],
							className
						)}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
					>
						{title && (
							<div className="flex items-center justify-between border-surface-100 border-b px-6 py-4">
								<h2 className="font-semibold text-lg text-surface-900">
									{title}
								</h2>
								<button
									className="rounded-lg p-2 text-surface-400 transition-colors hover:bg-surface-100 hover:text-surface-600"
									onClick={onClose}
									type="button"
								>
									<X className="h-5 w-5" />
								</button>
							</div>
						)}
						<div className="max-h-[80vh] overflow-y-auto p-6">{children}</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	)
}
