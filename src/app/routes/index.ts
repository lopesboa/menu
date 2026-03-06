import { lazy } from "react"
import { createBrowserRouter } from "react-router"
import { authClient } from "@/lib/client"
import { authMiddleware } from "../middleware/auth-middleware"
import { authRouteSegments } from "./auth/manifest"
import { dashboardRouteSegments } from "./dashboard/manifest"
import { RouteErrorBoundary } from "./error-boundary"
import { NotFoundPage } from "./error-pages/not-found"

const HomeLayout = lazy(() => import("../../components/layout/layout"))
const HomeContent = lazy(() => import("./home"))
const AuthLayout = lazy(() => import("./auth"))
const Login = lazy(() => import("./auth/login"))
const Forgot = lazy(() => import("./auth/forgot"))
const Register = lazy(() => import("./auth/register"))
const Verify = lazy(() => import("./auth/verify"))
const ChangePassword = lazy(() => import("./auth/change-password"))

const Dashboard = lazy(() => import("./dashboard"))
const DashboardAddOrganization = lazy(() => import("./dashboard/addOrg"))
const DashboardHome = lazy(() => import("./dashboard/pages/dashboard-home"))
const Account = lazy(() => import("./dashboard/pages/account"))
const Orders = lazy(() => import("@/domains/orders/ui/pages/orders-page"))
const POS = lazy(() => import("./dashboard/pages/pos"))
const Settings = lazy(() => import("./dashboard/pages/settings"))
const Tables = lazy(() => import("@/domains/tables/ui/pages/tables-page"))
const Sales = lazy(() =>
	import("./dashboard/pages/sales").then((module) => ({
		default: module.SalesPage,
	}))
)
const Reports = lazy(() =>
	import("./dashboard/pages/reports").then((module) => ({
		default: module.ReportsPage,
	}))
)
const Inventory = lazy(() =>
	import("./dashboard/pages/inventory").then((module) => ({
		default: module.InventoryPage,
	}))
)
const Kitchen = lazy(() =>
	import("@/domains/orders/ui/pages/kitchen-page").then((module) => ({
		default: module.KitchenPage,
	}))
)
const Delivery = lazy(() =>
	import("@/domains/orders/ui/pages/delivery-page").then((module) => ({
		default: module.DeliveryPage,
	}))
)
const Customers = lazy(() =>
	import("./dashboard/pages/customers").then((module) => ({
		default: module.CustomersPage,
	}))
)
const MenuBuilder = lazy(() =>
	import("./dashboard/pages/menu-builder").then((module) => ({
		default: module.MenuBuilderPage,
	}))
)
const Billing = lazy(() =>
	import("./dashboard/pages/billing").then((module) => ({
		default: module.BillingPage,
	}))
)

export const router = createBrowserRouter([
	{
		path: "/",
		Component: HomeLayout,
		ErrorBoundary: RouteErrorBoundary,
		children: [
			{
				index: true,
				Component: HomeContent,
			},
			{
				Component: AuthLayout,
				children: [
					{ path: authRouteSegments.login, Component: Login },
					{ path: authRouteSegments.register, Component: Register },
					{ path: authRouteSegments.forgot, Component: Forgot },
					{ path: authRouteSegments.verify, Component: Verify },
					{
						path: authRouteSegments.changePassword,
						Component: ChangePassword,
					},
				],
			},
		],
	},

	{
		path: "/dashboard",
		Component: Dashboard,
		middleware: [authMiddleware],
		// loader: organizationLoader,
		ErrorBoundary: RouteErrorBoundary,
		children: [
			{ index: true, Component: DashboardHome, loader: organizationLoader },
			{
				path: dashboardRouteSegments.addOrg,
				Component: DashboardAddOrganization,
			},
			{ path: dashboardRouteSegments.account, Component: Account },
			{ path: dashboardRouteSegments.orders, Component: Orders },
			{ path: dashboardRouteSegments.pos, Component: POS },
			{ path: dashboardRouteSegments.settings, Component: Settings },
			{ path: dashboardRouteSegments.tables, Component: Tables },
			{ path: dashboardRouteSegments.sales, Component: Sales },
			{ path: dashboardRouteSegments.reports, Component: Reports },
			{ path: dashboardRouteSegments.inventory, Component: Inventory },
			{ path: dashboardRouteSegments.kitchen, Component: Kitchen },
			{ path: dashboardRouteSegments.delivery, Component: Delivery },
			{ path: dashboardRouteSegments.customers, Component: Customers },
			{ path: dashboardRouteSegments.menu, Component: MenuBuilder },
			{ path: dashboardRouteSegments.billing, Component: Billing },
			{ path: "*", Component: NotFoundPage },
		],
	},
	{
		path: "*",
		Component: NotFoundPage,
	},
])

async function organizationLoader() {
	const { data } = await authClient.getSession()
	const orgId = data?.session.activeOrganizationId

	return {
		orgId,
	}
}
