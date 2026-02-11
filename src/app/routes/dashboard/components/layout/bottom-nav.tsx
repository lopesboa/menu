import { motion } from "framer-motion"
import {
	ChefHat,
	LayoutDashboard,
	LayoutGrid,
	ShoppingCart,
	UtensilsCrossed,
} from "lucide-react"
import { NavLink } from "react-router"
import { cn } from "@/utils/misc"

const navItems = [
	{ icon: LayoutDashboard, label: "Home", path: "/" },
	{ icon: ShoppingCart, label: "PDV", path: "/pos" },
	{ icon: LayoutGrid, label: "Mesas", path: "/tables" },
	{ icon: ChefHat, label: "Cozinha", path: "/kitchen" },
	{ icon: UtensilsCrossed, label: "Cardápio", path: "/menu" },
]

export function BottomNav() {
	return (
		<nav className="fixed right-0 bottom-0 left-0 z-40 border-surface-100 border-t bg-white lg:hidden">
			<div className="grid grid-cols-5 gap-1 p-2">
				{navItems.map((item) => (
					<NavLink
						className={({ isActive }) =>
							cn(
								"relative flex flex-col items-center gap-1 rounded-xl p-2 transition-colors",
								isActive
									? "text-primary-600"
									: "text-surface-400 hover:text-surface-600"
							)
						}
						key={item.path}
						to={item.path}
					>
						{({ isActive }) => (
							<>
								<item.icon className={cn("h-5 w-5", isActive && "scale-110")} />
								<span className="font-medium text-xs">{item.label}</span>
								{isActive && (
									<motion.div
										className="absolute inset-0 rounded-xl bg-primary-50"
										layoutId="bottomNavIndicator"
										transition={{ type: "spring", stiffness: 300, damping: 30 }}
									/>
								)}
							</>
						)}
					</NavLink>
				))}
			</div>
		</nav>
	)
}
