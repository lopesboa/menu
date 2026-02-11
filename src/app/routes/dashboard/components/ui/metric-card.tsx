import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/utils/misc"

interface MetricCardProps {
	title: string
	value: string | number
	change?: number
	icon: LucideIcon
	iconColor?: string
	iconBgColor?: string
	delay?: number
	className?: string
}

export function MetricCard({
	title,
	value,
	change,
	icon: Icon,
	iconColor = "text-primary-500",
	iconBgColor = "bg-primary-50",
	delay = 0,
	className,
}: MetricCardProps) {
	const isPositive = change && change > 0
	const isNegative = change && change < 0

	return (
		<motion.div
			animate={{ opacity: 1, y: 0 }}
			className={cn("metric-card group", className)}
			initial={{ opacity: 0, y: 20 }}
			transition={{ delay, duration: 0.4, ease: "easeOut" }}
		>
			<div className="flex items-start justify-between">
				<div
					className={cn(
						"rounded-xl p-3 transition-transform group-hover:scale-110",
						iconBgColor
					)}
				>
					<Icon className={cn("h-6 w-6", iconColor)} />
				</div>
				{change !== undefined && (
					<div
						className={cn(
							"flex items-center gap-1 rounded-full px-2 py-1 font-medium text-xs",
							isPositive && "bg-green-100 text-green-700",
							isNegative && "bg-red-100 text-red-700",
							change === 0 && "bg-surface-100 text-surface-600"
						)}
					>
						<span>
							{isPositive ? "+" : ""}
							{change}%
						</span>
					</div>
				)}
			</div>
			<div className="mt-4">
				<p className="font-medium text-sm text-surface-500">{title}</p>
				<p className="mt-1 font-bold text-2xl text-surface-900">{value}</p>
			</div>
		</motion.div>
	)
}
