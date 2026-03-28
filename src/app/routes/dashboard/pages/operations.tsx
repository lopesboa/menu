import { motion } from "framer-motion"
import { Activity, ArrowRightLeft } from "lucide-react"
import { OpsEventsPanel } from "@/domains/ops/components/ops-events-panel"
import { OpsSummarySection } from "@/domains/ops/components/ops-summary-section"
import { useOrganizationCheck } from "@/hooks/use-organization-check"

export function OperationsPage() {
	const { organizationId } = useOrganizationCheck()

	return (
		<div className="space-y-6">
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				initial={{ opacity: 0, y: -20 }}
			>
				<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
					<div>
						<div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-700 text-xs">
							<Activity className="h-3.5 w-3.5" />
							Central operacional
						</div>
						<h1 className="mt-3 font-bold text-2xl text-surface-900">
							Operacoes
						</h1>
						<p className="mt-1 max-w-2xl text-surface-500">
							Acompanhe o resumo operacional, a inbox de eventos e os itens em
							DLQ sem poluir a tela inicial do dashboard.
						</p>
					</div>
					<div className="rounded-2xl border border-surface-100 bg-white px-4 py-3 shadow-sm">
						<div className="flex items-center gap-3">
							<div className="rounded-xl bg-amber-50 p-2 text-amber-700">
								<ArrowRightLeft className="h-5 w-5" />
							</div>
							<div>
								<p className="font-medium text-sm text-surface-900">
									Visao dedicada para operacao
								</p>
								<p className="text-surface-500 text-xs">
									Use esta area para monitoramento e triagem do dia a dia.
								</p>
							</div>
						</div>
					</div>
				</div>
			</motion.div>

			<OpsSummarySection organizationId={organizationId} />
			<OpsEventsPanel organizationId={organizationId} />
		</div>
	)
}
