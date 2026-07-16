import { RefreshCw, Wifi, WifiOff } from "lucide-react"
import type {
	OpsRealtimeDomain,
	OpsRealtimeHealthState,
} from "@/lib/realtime/ops-realtime.types"
import { cn } from "@/utils/misc"

interface OpsRealtimeHealthWidgetProps {
	healthState: OpsRealtimeHealthState
	onRefreshDomain: (domain: OpsRealtimeDomain) => void
}

const DOMAIN_LABELS: Record<OpsRealtimeDomain, string> = {
	orders: "Pedidos",
	kds: "Cozinha",
	delivery: "Delivery",
	ops: "Ops",
}

function getConnectionAppearance(status: OpsRealtimeHealthState["status"]) {
	switch (status) {
		case "connected":
			return {
				label: "Conectado",
				containerClassName: "border-emerald-200 bg-emerald-50 text-emerald-700",
				dotClassName: "bg-emerald-500",
				icon: Wifi,
			}
		case "degraded":
			return {
				label: "Instável",
				containerClassName: "border-amber-200 bg-amber-50 text-amber-700",
				dotClassName: "bg-amber-500",
				icon: Wifi,
			}
		case "disconnected":
			return {
				label: "Desconectado",
				containerClassName: "border-red-200 bg-red-50 text-red-700",
				dotClassName: "bg-red-500",
				icon: WifiOff,
			}
		default:
			return {
				label: "Conectando",
				containerClassName: "border-sky-200 bg-sky-50 text-sky-700",
				dotClassName: "bg-sky-500",
				icon: Wifi,
			}
	}
}

export function OpsRealtimeHealthWidget({
	healthState,
	onRefreshDomain,
}: OpsRealtimeHealthWidgetProps) {
	const appearance = getConnectionAppearance(healthState.status)
	const StatusIcon = appearance.icon

	return (
		<section className="rounded-2xl border border-surface-100 bg-white p-4">
			<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div
					aria-live="polite"
					className={cn(
						"inline-flex items-center gap-2 rounded-full border px-3 py-1 font-medium text-xs",
						appearance.containerClassName
					)}
				>
					<StatusIcon className="h-3.5 w-3.5" />
					<span
						className={cn("h-2 w-2 rounded-full", appearance.dotClassName)}
					/>
					Conexão realtime: {appearance.label}
				</div>

				<p className="text-surface-500 text-xs">
					Use o refresh por domínio para revalidar dados operacionais.
				</p>
			</div>

			<div className="mt-3 flex flex-wrap gap-2">
				{(Object.keys(DOMAIN_LABELS) as OpsRealtimeDomain[]).map((domain) => (
					<button
						className="inline-flex items-center gap-2 rounded-lg border border-surface-200 bg-surface-50 px-3 py-2 font-medium text-sm text-surface-700 transition-colors hover:bg-surface-100"
						key={domain}
						onClick={() => onRefreshDomain(domain)}
						type="button"
					>
						<RefreshCw className="h-3.5 w-3.5" />
						Atualizar {DOMAIN_LABELS[domain]}
					</button>
				))}
			</div>
		</section>
	)
}
