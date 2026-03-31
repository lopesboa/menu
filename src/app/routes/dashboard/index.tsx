import { useQueryClient } from "@tanstack/react-query"
import { Navigate, Outlet, useLocation } from "react-router"
import "./styles.css"
import { useOpsRealtimeQueryAdapter } from "@/app/realtime/use-ops-realtime-query-adapter"
import { invalidateKdsCache } from "@/domains/kds/hooks/use-kds-query-keys"
import {
	invalidateOpsEventsCache,
	invalidateOpsSummaryCache,
} from "@/domains/ops/hooks/use-ops-query-keys"
import { useOpsRealtimeSession } from "@/domains/ops/realtime/use-ops-realtime-session"
import { invalidateOrdersCache } from "@/domains/orders/hooks/orders-query-keys"
import { useOrganizationCheck } from "@/hooks/use-organization-check"
import type { OpsRealtimeDomain } from "@/lib/realtime/ops-realtime.types"
import {
	captureOpsRealtimeTelemetry,
	OpsRealtimeTelemetryEvents,
} from "@/lib/realtime/ops-realtime-telemetry"
import { cn } from "@/utils/misc"
import { ProtectedRoute } from "../protected-routes"
import { BottomNav } from "./components/layout/bottom-nav"
import { Sidebar } from "./components/layout/sidebar"
import { TopBar } from "./components/layout/top-bar"
import { dashboardRoutePaths } from "./manifest"

export default function Dashboard() {
	const { hasOrganization, isLoading, organizationId } = useOrganizationCheck()
	const location = useLocation()
	const queryClient = useQueryClient()

	const { healthState, refreshDomain } = useOpsRealtimeSession({
		enabled: hasOrganization && !isLoading,
		organizationId,
	})
	useOpsRealtimeQueryAdapter({ organizationId })

	const handleRefreshDomain = (domain: OpsRealtimeDomain) => {
		if (!organizationId) {
			return
		}

		refreshDomain(domain)
		captureOpsRealtimeTelemetry(
			OpsRealtimeTelemetryEvents.domainRefreshRequested,
			{
				domain,
				organization_id: organizationId,
				connection_status: healthState.status,
			}
		)

		if (domain === "ops") {
			invalidateOpsEventsCache(queryClient, organizationId)
			invalidateOpsSummaryCache(queryClient, organizationId)
			return
		}

		if (domain === "kds") {
			invalidateKdsCache(queryClient, organizationId)
			return
		}

		invalidateOrdersCache(queryClient, organizationId)
	}

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
					<TopBar
						healthState={healthState}
						onRefreshDomain={handleRefreshDomain}
					/>
					<div className={cn("flex-1 overflow-auto", "p-4 sm:p-6", "lg:pb-6")}>
						<Outlet />
					</div>
				</div>
				<BottomNav />
			</div>
		</ProtectedRoute>
	)
}
