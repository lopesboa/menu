import { lazy } from "react"
import { createBrowserRouter } from "react-router"
import { authMiddleware } from "../middleware/auth-middleware"
import { orgMiddleware } from "../middleware/org-middleware"

const HomeLayout = lazy(() => import("./home/layout"))
const HomeContent = lazy(() => import("./home"))
const AuthLayout = lazy(() => import("./auth"))
const Login = lazy(() => import("./auth/login"))
const Forgot = lazy(() => import("./auth/forgot"))
const Register = lazy(() => import("./auth/register"))
const Verify = lazy(() => import("./auth/verify"))
const ChangePassword = lazy(() => import("./auth/change-password"))
const Dashboard = lazy(() => import("./dashboard"))
const DashboardHome = lazy(() => import("./dashboard/dashboard-home"))
const DashboardEmpty = lazy(() => import("./dashboard/empty"))
const DashboardAddOrganization = lazy(() => import("./dashboard/addOrg"))

export const router = createBrowserRouter([
	{
		path: "/",
		Component: HomeLayout,
		children: [
			{
				index: true,
				Component: HomeContent,
			},
		],
	},
	{
		path: "auth",
		Component: AuthLayout,
		children: [
			{ path: "login", Component: Login },
			{ path: "register", Component: Register },
			{ path: "forgot", Component: Forgot },
			{ path: "verify", Component: Verify },
			{ path: "change-password", Component: ChangePassword },
		],
	},

	{
		path: "/dashboard",
		Component: Dashboard,
		middleware: [authMiddleware, orgMiddleware],
		children: [{ index: true, Component: DashboardHome }],
	},
	{ path: "/dashboard/add-org", Component: DashboardAddOrganization },
	{ path: "dashboard/create", Component: DashboardEmpty },
])
