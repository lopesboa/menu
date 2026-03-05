import { Navigate, Outlet, useLocation } from "react-router"
import "./styles.css"
import { useOrganizationCheck } from "@/hooks/useOrganizationCheck"
import { cn } from "@/utils/misc"
import { ProtectedRoute } from "../protected-routes"
import { BottomNav } from "./components/layout/bottom-nav"
import { Sidebar } from "./components/layout/sidebar"
import { TopBar } from "./components/layout/top-bar"
import { dashboardRoutePaths } from "./manifest"

export default function Dashboard() {
	const { hasOrganization, isLoading } = useOrganizationCheck()
	const location = useLocation()

	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<div className="h-12 w-12 animate-spin rounded-full border-blue-600 border-b-2" />
			</div>
		)
	}

	if (!hasOrganization && location.pathname !== dashboardRoutePaths.addOrg) {
		return (
			<ProtectedRoute>
				<Navigate replace to={dashboardRoutePaths.addOrg} />
			</ProtectedRoute>
		)
	}

	return (
		<ProtectedRoute>
			<div className="flex min-h-screen bg-surface-50">
				<Sidebar />
				<div className="flex flex-1 flex-col lg:ml-0">
					<TopBar />
					<div className={cn("flex-1 overflow-auto", "p-4 sm:p-6", "lg:pb-6")}>
						<Outlet />
					</div>
				</div>
				<BottomNav />
			</div>
		</ProtectedRoute>
	)
}
