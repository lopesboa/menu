import { AnimatePresence, motion } from "framer-motion"
import {
	BarChart3,
	ChefHat,
	LayoutDashboard,
	LayoutGrid,
	Package,
	Receipt,
	Settings,
	ShoppingCart,
	Truck,
	Users,
	Utensils,
} from "lucide-react"
import type { MouseEventHandler } from "react"
import { NavLink } from "react-router"
import { cn } from "@/utils/misc"

interface NavItem {
	icon: React.ElementType
	label: string
	path: string
	badge?: string
}

const navItems: NavItem[] = [
	{ icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
	{ icon: ShoppingCart, label: "PDV", path: "/dashboard/pos" },
	{ icon: LayoutGrid, label: "Mesas", path: "/dashboard/tables" },
	{ icon: Receipt, label: "Vendas", path: "/dashboard/sales" },
	{ icon: Package, label: "Inventário", path: "/dashboard/inventory" },
	{ icon: ShoppingCart, label: "Pedidos", path: "/dashboard/orders" },
	{ icon: ChefHat, label: "Cozinha", path: "/dashboard/kitchen" },
	{ icon: Truck, label: "Delivery", path: "/dashboar/delivery" },
	{ icon: Utensils, label: "Cardápio", path: "/dashboard/menu" },
	{ icon: Users, label: "Clientes", path: "/dashboard/customers" },
	{ icon: BarChart3, label: "Relatórios", path: "/dashboard/reports" },
	{ icon: Settings, label: "Configurações", path: "/dashboard/settings" },
]

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
					key={item.path}
					onClick={onClick}
					to={item.path}
				>
					{({ isActive }) => (
						<>
							<item.icon
								className={cn(
									"h-5 w-5 shrink-0",
									isActive && "text-primary-500"
								)}
							/>
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
							{item.badge && !isCollapsed && (
								<span className="ml-auto rounded-full bg-primary-500 px-2 py-0.5 text-white text-xs">
									{item.badge}
								</span>
							)}
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
