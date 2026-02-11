import { getStatusColor, getStatusLabel } from "@/utils/helpers"
import { cn } from "@/utils/misc"

interface StatusBadgeProps {
	status: string
	size?: "sm" | "md" | "lg"
	className?: string
}

const sizeClasses = {
	sm: "px-2 py-0.5 text-xs",
	md: "px-2.5 py-1 text-xs",
	lg: "px-3 py-1.5 text-sm",
}

export function StatusBadge({
	status,
	size = "md",
	className,
}: StatusBadgeProps) {
	return (
		<span
			className={cn(
				"inline-flex items-center rounded-full font-medium",
				getStatusColor(status),
				sizeClasses[size],
				className
			)}
		>
			{getStatusLabel(status)}
		</span>
	)
}
