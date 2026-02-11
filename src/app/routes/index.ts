import { lazy } from "react"
import { createBrowserRouter } from "react-router"
import { authClient } from "@/lib/client"
import { authMiddleware } from "../middleware/auth-middleware"

const HomeLayout = lazy(() => import("./home/layout"))
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

export const router = createBrowserRouter([
	{
		path: "/",
		Component: HomeLayout,
		children: [
			{
				index: true,
				Component: HomeContent,
			},
			{
				Component: AuthLayout,
				children: [
					{ path: "login", Component: Login },
					{ path: "register", Component: Register },
					{ path: "forgot", Component: Forgot },
					{ path: "verify", Component: Verify },
					{ path: "change-password", Component: ChangePassword },
				],
			},
		],
	},

	{
		path: "/dashboard",
		Component: Dashboard,
		middleware: [authMiddleware],
		loader: organizationLoader,
		children: [
			{ path: "add-org", Component: DashboardAddOrganization },
			{ index: true, Component: DashboardHome },
			{ path: "account", Component: Account },
		],
	},
])

async function organizationLoader() {
	const { data } = await authClient.getSession()
	const orgId = data?.session.activeOrganizationId

	return {
		orgId,
	}
}
