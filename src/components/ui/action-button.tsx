import { motion } from "framer-motion"
import { cn } from "@/utils/misc"

interface ActionButtonProps {
	children: React.ReactNode
	variant?: "primary" | "secondary" | "outline" | "ghost" | "danger"
	size?: "sm" | "md" | "lg"
	fullWidth?: boolean
	disabled?: boolean
	className?: string
	onClick?: () => void
}

const variantStyles = {
	primary: "bg-primary-500 text-white hover:bg-primary-600 active:scale-95",
	secondary:
		"bg-surface-100 text-surface-700 hover:bg-surface-200 active:scale-95",
	outline:
		"border-2 border-surface-200 text-surface-700 hover:bg-surface-50 active:scale-95",
	ghost: "text-surface-600 hover:bg-surface-100 active:scale-95",
	danger: "bg-red-500 text-white hover:bg-red-600 active:scale-95",
}

const sizeClasses = {
	sm: "px-3 py-1.5 text-sm gap-1.5",
	md: "px-4 py-2.5 text-sm gap-2",
	lg: "px-6 py-3 text-base gap-2.5",
}

export function ActionButton({
	children,
	variant = "primary",
	size = "md",
	fullWidth = false,
	disabled = false,
	className,
	onClick,
}: ActionButtonProps) {
	return (
		<motion.button
			className={cn(
				"inline-flex items-center justify-center rounded-xl font-medium transition-colors",
				"focus:outline-none focus:ring-2 focus:ring-primary-500/20",
				variantStyles[variant],
				sizeClasses[size],
				fullWidth && "w-full",
				disabled && "cursor-not-allowed opacity-50",
				className
			)}
			disabled={disabled}
			onClick={onClick}
			whileHover={{ scale: disabled ? 1 : 1.02 }}
			whileTap={{ scale: disabled ? 1 : 0.98 }}
		>
			{children}
		</motion.button>
	)
}

interface BorderBeamButtonProps {
	children: React.ReactNode
	className?: string
	onClick?: () => void
}

export function BorderBeamButton({
	children,
	className,
	onClick,
}: BorderBeamButtonProps) {
	return (
		<motion.button
			className={cn(
				"relative inline-flex items-center justify-center overflow-hidden rounded-xl px-6 py-3 font-medium text-white",
				"bg-surface-900",
				className
			)}
			onClick={onClick}
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
		>
			<span className="relative z-10">{children}</span>
			<motion.span
				className="absolute inset-0 rounded-xl border-2 border-white/30"
				initial={{ opacity: 0 }}
				transition={{ duration: 0.2 }}
				whileHover={{ opacity: 1 }}
			/>
			<motion.span
				animate={{
					backgroundPosition: ["200% 0", "-200% 0"],
				}}
				className="absolute inset-0 rounded-xl border-2 border-transparent"
				style={{
					background:
						"linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent) background-repeat-no-repeat background-size-200% 100%",
				}}
				transition={{
					duration: 2,
					repeat: Number.POSITIVE_INFINITY,
					ease: "linear",
				}}
			/>
		</motion.button>
	)
}
