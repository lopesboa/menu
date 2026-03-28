import {
	Activity,
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
	UtensilsCrossed,
} from "lucide-react"
import type { ElementType } from "react"

type DashboardRouteKey =
	| "home"
	| "pos"
	| "tables"
	| "sales"
	| "inventory"
	| "orders"
	| "kitchen"
	| "delivery"
	| "menu"
	| "customers"
	| "operations"
	| "reports"
	| "settings"
	| "account"
	| "billing"
	| "addOrg"

type DashboardNavPlacement = "sidebar" | "bottom"

interface DashboardRouteManifestItem {
	key: DashboardRouteKey
	label: string
	fullPath: string
	segment?: string
	showInSidebar: boolean
	showInBottomNav: boolean
	icon?: ElementType
}

const DASHBOARD_ROUTES: DashboardRouteManifestItem[] = [
	{
		key: "home",
		label: "Dashboard",
		fullPath: "/dashboard",
		showInSidebar: true,
		showInBottomNav: true,
		icon: LayoutDashboard,
	},
	{
		key: "pos",
		label: "PDV",
		fullPath: "/dashboard/pos",
		segment: "pos",
		showInSidebar: true,
		showInBottomNav: true,
		icon: ShoppingCart,
	},
	{
		key: "tables",
		label: "Mesas",
		fullPath: "/dashboard/tables",
		segment: "tables",
		showInSidebar: true,
		showInBottomNav: true,
		icon: LayoutGrid,
	},
	{
		key: "sales",
		label: "Vendas",
		fullPath: "/dashboard/sales",
		segment: "sales",
		showInSidebar: true,
		showInBottomNav: false,
		icon: Receipt,
	},
	{
		key: "inventory",
		label: "Inventário",
		fullPath: "/dashboard/inventory",
		segment: "inventory",
		showInSidebar: true,
		showInBottomNav: false,
		icon: Package,
	},
	{
		key: "orders",
		label: "Pedidos",
		fullPath: "/dashboard/orders",
		segment: "orders",
		showInSidebar: true,
		showInBottomNav: false,
		icon: ShoppingCart,
	},
	{
		key: "kitchen",
		label: "Cozinha",
		fullPath: "/dashboard/kitchen",
		segment: "kitchen",
		showInSidebar: true,
		showInBottomNav: true,
		icon: ChefHat,
	},
	{
		key: "delivery",
		label: "Delivery",
		fullPath: "/dashboard/delivery",
		segment: "delivery",
		showInSidebar: true,
		showInBottomNav: false,
		icon: Truck,
	},
	{
		key: "menu",
		label: "Cardápio",
		fullPath: "/dashboard/menu",
		segment: "menu",
		showInSidebar: true,
		showInBottomNav: true,
		icon: Utensils,
	},
	{
		key: "customers",
		label: "Clientes",
		fullPath: "/dashboard/customers",
		segment: "customers",
		showInSidebar: true,
		showInBottomNav: false,
		icon: Users,
	},
	{
		key: "operations",
		label: "Operacoes",
		fullPath: "/dashboard/operations",
		segment: "operations",
		showInSidebar: true,
		showInBottomNav: false,
		icon: Activity,
	},
	{
		key: "reports",
		label: "Relatórios",
		fullPath: "/dashboard/reports",
		segment: "reports",
		showInSidebar: true,
		showInBottomNav: false,
		icon: BarChart3,
	},
	{
		key: "settings",
		label: "Configurações",
		fullPath: "/dashboard/settings",
		segment: "settings",
		showInSidebar: true,
		showInBottomNav: false,
		icon: Settings,
	},
	{
		key: "account",
		label: "Conta",
		fullPath: "/dashboard/account",
		segment: "account",
		showInSidebar: false,
		showInBottomNav: false,
	},
	{
		key: "billing",
		label: "Cobrança",
		fullPath: "/dashboard/billing",
		segment: "billing",
		showInSidebar: false,
		showInBottomNav: false,
	},
	{
		key: "addOrg",
		label: "Adicionar Organização",
		fullPath: "/dashboard/add-org",
		segment: "add-org",
		showInSidebar: false,
		showInBottomNav: false,
	},
]

export const dashboardRoutePaths = {
	home: "/dashboard",
	pos: "/dashboard/pos",
	tables: "/dashboard/tables",
	sales: "/dashboard/sales",
	inventory: "/dashboard/inventory",
	orders: "/dashboard/orders",
	kitchen: "/dashboard/kitchen",
	delivery: "/dashboard/delivery",
	menu: "/dashboard/menu",
	customers: "/dashboard/customers",
	operations: "/dashboard/operations",
	reports: "/dashboard/reports",
	settings: "/dashboard/settings",
	account: "/dashboard/account",
	billing: "/dashboard/billing",
	addOrg: "/dashboard/add-org",
} as const

export const dashboardRouteSegments = {
	pos: "pos",
	tables: "tables",
	sales: "sales",
	inventory: "inventory",
	orders: "orders",
	kitchen: "kitchen",
	delivery: "delivery",
	menu: "menu",
	customers: "customers",
	operations: "operations",
	reports: "reports",
	settings: "settings",
	account: "account",
	billing: "billing",
	addOrg: "add-org",
} as const

export function getDashboardNavigation(placement: DashboardNavPlacement) {
	if (placement === "sidebar") {
		return DASHBOARD_ROUTES.filter((item) => item.showInSidebar)
	}

	return DASHBOARD_ROUTES.filter((item) => item.showInBottomNav).map(
		(item) => ({
			...item,
			icon: item.key === "menu" ? UtensilsCrossed : item.icon,
		})
	)
}
