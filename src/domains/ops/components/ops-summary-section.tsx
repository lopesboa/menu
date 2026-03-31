import { RefreshCcw } from "lucide-react"
import { useEffect, useRef } from "react"
import { toast } from "sonner"
import { useOpsRealtimeFallbackPolling } from "@/lib/realtime/use-ops-realtime-fallback-polling"
import { sentryCaptureException } from "@/lib/sentry"
import { useOpsSummary } from "../hooks/use-ops-summary"

interface OpsSummarySectionProps {
	organizationId: string | null
}

export function OpsSummarySection({ organizationId }: OpsSummarySectionProps) {
	const opsFallbackRefetchInterval = useOpsRealtimeFallbackPolling("ops")
	const {
		data: opsSummary,
		error,
		isError,
		isFetching,
		isLoading,
		refetch,
	} = useOpsSummary(organizationId, {
		refetchInterval: opsFallbackRefetchInterval,
	})
	const hasNotifiedError = useRef(false)

	const summaryItems = [
		{
			label: "Inbox recebidos",
			value: opsSummary?.inbox.received ?? 0,
		},
		{
			label: "Inbox processando",
			value: opsSummary?.inbox.processing ?? 0,
		},
		{
			label: "Inbox falhas",
			value: opsSummary?.inbox.failed ?? 0,
		},
		{
			label: "DLQ em aberto",
			value: opsSummary?.dlq.open ?? 0,
		},
		{
			label: "DLQ resolvidos",
			value: opsSummary?.dlq.resolved ?? 0,
		},
	]
	const totalTrackedEvents = summaryItems.reduce((total, item) => {
		return total + item.value
	}, 0)

	let syncMessage = "Realtime e fallback ativos para o resumo operacional."
	if (opsFallbackRefetchInterval) {
		syncMessage = "Fallback de polling ativo para o resumo operacional."
	}
	if (isFetching) {
		syncMessage = "Atualizando resumo operacional..."
	}

	useEffect(() => {
		if (!(isError && error)) {
			hasNotifiedError.current = false
			return
		}

		if (hasNotifiedError.current) {
			return
		}

		hasNotifiedError.current = true
		toast.error("Nao foi possivel carregar o resumo operacional")
		sentryCaptureException(error, {
			context: "ops_summary_fetch",
			organizationId,
		})
	}, [error, isError, organizationId])

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
				<div className="flex items-center gap-2 text-surface-500 text-xs">
					<RefreshCcw className="h-4 w-4" />
					{syncMessage}
				</div>
			</div>

			{isLoading ? (
				<div className="rounded-xl border border-surface-100 bg-surface-50 p-6 text-center text-surface-600">
					Carregando resumo operacional...
				</div>
			) : null}

			{isError && !isLoading ? (
				<div className="flex flex-col items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-6 text-center">
					<p className="font-medium text-red-700">
						Nao foi possivel carregar o resumo operacional.
					</p>
					<button
						className="btn-secondary"
						onClick={() => {
							refetch()
						}}
						type="button"
					>
						Tentar novamente
					</button>
				</div>
			) : null}

			{isLoading || isError ? null : (
				<>
					<div className="mb-4 rounded-xl border border-surface-100 bg-surface-50 px-4 py-3">
						<p className="font-medium text-sm text-surface-900">
							Total monitorado agora
						</p>
						<p className="mt-1 text-surface-500 text-xs">
							{totalTrackedEvents === 0
								? "Nenhum evento monitorado no momento."
								: `${totalTrackedEvents} eventos acompanhados entre inbox e DLQ.`}
						</p>
					</div>

					<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
						{summaryItems.map((item) => (
							<div
								className="rounded-xl border border-surface-100 bg-surface-50 p-4"
								key={item.label}
							>
								<p className="text-surface-500 text-xs uppercase tracking-wide">
									{item.label}
								</p>
								<p className="mt-1 font-semibold text-2xl text-surface-900">
									{item.value}
								</p>
							</div>
						))}
					</div>
				</>
			)}
		</section>
	)
}
