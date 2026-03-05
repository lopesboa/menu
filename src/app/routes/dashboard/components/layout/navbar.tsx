import { AnimatePresence, motion } from "framer-motion"
import type { MouseEventHandler } from "react"
import { NavLink } from "react-router"
import { cn } from "@/utils/misc"
import { getDashboardNavigation } from "../../manifest"

const navItems = getDashboardNavigation("sidebar")

interface DashboardNavbarProps {
	isCollapsed: boolean
	onClick: MouseEventHandler<HTMLAnchorElement> | undefined
}

export function DashboardNavbar({
	isCollapsed,
	onClick,
}: DashboardNavbarProps) {
	return (
		<nav className="flex-1 space-y-1 overflow-y-auto p-4">
			{navItems.map((item) => (
				<NavLink
					className={({ isActive }) =>
						cn(
							"relative flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200",
							isActive
								? "bg-primary-50 text-primary-700"
								: "text-surface-600 hover:bg-surface-100 hover:text-surface-900",
							isCollapsed && "lg:justify-center"
						)
					}
					key={item.fullPath}
					onClick={onClick}
					to={item.fullPath}
				>
					{({ isActive }) => (
						<>
							{item.icon && (
								<item.icon
									className={cn(
										"h-5 w-5 shrink-0",
										isActive && "text-primary-500"
									)}
								/>
							)}
							<AnimatePresence mode="wait">
								{!isCollapsed && (
									<motion.span
										animate={{ opacity: 1, x: 0 }}
										className="font-medium"
										exit={{ opacity: 0, x: -10 }}
										initial={{ opacity: 0, x: -10 }}
									>
										{item.label}
									</motion.span>
								)}
							</AnimatePresence>
							{isActive && !isCollapsed && (
								<motion.div
									className="absolute left-0 h-8 w-1 rounded-r-full bg-primary-500"
									layoutId="activeIndicator"
								/>
							)}
						</>
					)}
				</NavLink>
			))}
		</nav>
	)
}
