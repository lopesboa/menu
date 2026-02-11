import { Icon } from "@iconify-icon/react"
import { AnimatePresence, motion } from "framer-motion"
import { Columns, Menu, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/utils/misc"
import { DashboardNavbar } from "./navbar"

export function Sidebar() {
	const [isCollapsed, setIsCollapsed] = useState(false)
	const [isMobileOpen, setIsMobileOpen] = useState(false)

	return (
		<>
			<button
				className="fixed top-2 left-4 z-50 rounded-xl bg-white p-2 shadow-lg lg:hidden"
				onClick={() => setIsMobileOpen(true)}
				type="button"
			>
				<Menu className="h-6 w-6 text-surface-600" />
			</button>

			<AnimatePresence mode="wait">
				{isMobileOpen && (
					<motion.div
						animate={{ opacity: 1 }}
						className="fixed inset-0 z-50 bg-black/50 lg:hidden"
						exit={{ opacity: 0 }}
						initial={{ opacity: 0 }}
						onClick={() => setIsMobileOpen(false)}
					/>
				)}
			</AnimatePresence>

			<motion.aside
				animate={{
					width: isCollapsed ? 80 : 280,
				}}
				className={cn(
					"fixed inset-y-0 left-0 z-50 lg:static lg:z-0",
					"border-surface-100 border-r bg-white",
					"flex flex-col",
					"transition-all duration-300",
					isMobileOpen ? "w-72" : "-translate-x-full lg:translate-x-0"
				)}
				initial={false}
			>
				<div className="flex flex-col border-surface-100 border-b p-4">
					<div className="mb-4 flex items-center justify-between">
						<AnimatePresence mode="wait">
							{!isCollapsed && (
								<motion.div
									animate={{ opacity: 1 }}
									className="flex items-center gap-3"
									exit={{ opacity: 0 }}
									initial={{ opacity: 0 }}
								>
									<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/25">
										<Icon
											className="h-5 w-5 text-white"
											icon="solar:shop-bold-duotone"
										/>
									</div>
									<div>
										<h1 className="font-bold text-surface-900">MenuBao</h1>
										<p className="text-surface-500 text-xs">Restaurante</p>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
						<button
							className="hidden rounded-lg p-2 transition-colors hover:bg-surface-100 lg:flex"
							onClick={() => setIsCollapsed(!isCollapsed)}
							type="button"
						>
							<Columns className="h-5 w-5 text-surface-600" />
						</button>
						<button
							className="rounded-lg p-2 transition-colors hover:bg-surface-100 lg:hidden"
							onClick={() => setIsMobileOpen(false)}
							type="button"
						>
							<X className="h-5 w-5 text-surface-600" />
						</button>
					</div>
				</div>

				<DashboardNavbar
					isCollapsed={isCollapsed}
					onClick={() => setIsMobileOpen(false)}
				/>
			</motion.aside>
		</>
	)
}
