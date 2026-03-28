import { useOpsRealtimeFallbackPolling } from "@/lib/realtime/use-ops-realtime-fallback-polling"
import { useOpsSummary } from "../hooks/use-ops-summary"

interface OpsSummarySectionProps {
	organizationId: string | null
}

export function OpsSummarySection({ organizationId }: OpsSummarySectionProps) {
	const opsFallbackRefetchInterval = useOpsRealtimeFallbackPolling("ops")
	const { data: opsSummary } = useOpsSummary(organizationId, {
		refetchInterval: opsFallbackRefetchInterval,
	})

	return (
		<section className="rounded-2xl border border-surface-100 bg-white p-6">
			<div className="mb-4 flex items-center justify-between">
				<div>
					<h2 className="font-semibold text-lg text-surface-900">
						Resumo operacional
					</h2>
					<p className="text-sm text-surface-500">
						Visao inicial de inbox e DLQ da operacao.
					</p>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
				<div className="rounded-xl border border-surface-100 bg-surface-50 p-4">
					<p className="text-surface-500 text-xs uppercase tracking-wide">
						Inbox recebidos
					</p>
					<p className="mt-1 font-semibold text-2xl text-surface-900">
						{opsSummary?.inbox.received ?? 0}
					</p>
				</div>
				<div className="rounded-xl border border-surface-100 bg-surface-50 p-4">
					<p className="text-surface-500 text-xs uppercase tracking-wide">
						Inbox processando
					</p>
					<p className="mt-1 font-semibold text-2xl text-surface-900">
						{opsSummary?.inbox.processing ?? 0}
					</p>
				</div>
				<div className="rounded-xl border border-surface-100 bg-surface-50 p-4">
					<p className="text-surface-500 text-xs uppercase tracking-wide">
						Inbox falhas
					</p>
					<p className="mt-1 font-semibold text-2xl text-surface-900">
						{opsSummary?.inbox.failed ?? 0}
					</p>
				</div>
				<div className="rounded-xl border border-surface-100 bg-surface-50 p-4">
					<p className="text-surface-500 text-xs uppercase tracking-wide">
						DLQ em aberto
					</p>
					<p className="mt-1 font-semibold text-2xl text-surface-900">
						{opsSummary?.dlq.open ?? 0}
					</p>
				</div>
				<div className="rounded-xl border border-surface-100 bg-surface-50 p-4">
					<p className="text-surface-500 text-xs uppercase tracking-wide">
						DLQ resolvidos
					</p>
					<p className="mt-1 font-semibold text-2xl text-surface-900">
						{opsSummary?.dlq.resolved ?? 0}
					</p>
				</div>
			</div>
		</section>
	)
}
