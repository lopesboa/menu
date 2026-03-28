import { AlertCircle, CalendarRange, RefreshCcw, Truck } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { useOpsRealtimeFallbackPolling } from "@/lib/realtime/use-ops-realtime-fallback-polling"
import { sentryCaptureException } from "@/lib/sentry"
import { formatDateTime, formatRelativeTime } from "@/utils/helpers"
import { cn } from "@/utils/misc"
import { useOpsDeliveryExceptions } from "../hooks/use-ops-delivery-exceptions"

const PAGE_SIZE = 5

function getKindLabel(kind: string) {
	if (kind === "dead_letter") {
		return "DLQ"
	}

	if (kind === "run") {
		return "Run"
	}

	return "Inbox"
}

function getStatusClasses(status: string) {
	const normalizedStatus = status.trim().toLowerCase()

	if (normalizedStatus === "failed" || normalizedStatus === "dead_letter") {
		return "bg-red-100 text-red-700"
	}

	if (normalizedStatus === "run_failed") {
		return "bg-amber-100 text-amber-800"
	}

	return "bg-surface-100 text-surface-700"
}

function renderOccurredAt(occurredAt: string | null) {
	if (!occurredAt) {
		return "Data indisponivel"
	}

	return `${formatRelativeTime(occurredAt)} • ${formatDateTime(occurredAt)}`
}

interface OpsDeliveryExceptionsPanelProps {
	organizationId: string | null
}

export function OpsDeliveryExceptionsPanel({
	organizationId,
}: OpsDeliveryExceptionsPanelProps) {
	const [status, setStatus] = useState("")
	const [source, setSource] = useState("")
	const [from, setFrom] = useState("")
	const [to, setTo] = useState("")
	const [offset, setOffset] = useState(0)
	const fallbackRefetchInterval = useOpsRealtimeFallbackPolling("delivery")
	const hasNotifiedError = useRef(false)

	const { data, error, isError, isLoading, isFetching, refetch } =
		useOpsDeliveryExceptions({
			organizationId,
			status: status || undefined,
			source: source.trim() || undefined,
			from: from || undefined,
			to: to || undefined,
			limit: PAGE_SIZE,
			offset,
			refetchInterval: fallbackRefetchInterval,
		})

	useEffect(() => {
		if (!(isError && error) || hasNotifiedError.current) {
			if (!isError) {
				hasNotifiedError.current = false
			}
			return
		}

		hasNotifiedError.current = true
		toast.error("Nao foi possivel carregar as excecoes de delivery")
		sentryCaptureException(error, {
			context: "ops_delivery_exceptions_fetch",
			organizationId,
		})
	}, [error, isError, organizationId])

	const items = data?.items ?? []
	const total = data?.pagination.total ?? items.length
	const page = Math.floor(offset / PAGE_SIZE) + 1
	const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

	useEffect(() => {
		if (offset === 0) {
			return
		}

		if (offset < total) {
			return
		}

		const nextOffset = Math.max(0, (totalPages - 1) * PAGE_SIZE)
		if (nextOffset !== offset) {
			setOffset(nextOffset)
		}
	}, [offset, total, totalPages])

	return (
		<section className="rounded-2xl border border-surface-100 bg-white p-6">
			<div className="flex flex-col gap-4 border-surface-100 border-b pb-4 lg:flex-row lg:items-end lg:justify-between">
				<div>
					<h2 className="font-semibold text-lg text-surface-900">
						Excecoes de delivery
					</h2>
					<p className="text-sm text-surface-500">
						Monitore falhas do parceiro, eventos mortos e runs com problema.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
					<select
						className="input-field"
						onChange={(event) => {
							setStatus(event.target.value)
							setOffset(0)
						}}
						value={status}
					>
						<option value="">Todos status</option>
						<option value="failed">Failed</option>
						<option value="dead_letter">Dead letter</option>
						<option value="run_failed">Run failed</option>
					</select>
					<input
						className="input-field"
						onChange={(event) => {
							setSource(event.target.value)
							setOffset(0)
						}}
						placeholder="Fonte do parceiro"
						type="text"
						value={source}
					/>
					<input
						className="input-field"
						onChange={(event) => {
							setFrom(event.target.value)
							setOffset(0)
						}}
						type="date"
						value={from}
					/>
					<input
						className="input-field"
						onChange={(event) => {
							setTo(event.target.value)
							setOffset(0)
						}}
						type="date"
						value={to}
					/>
				</div>
			</div>

			<div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-surface-100 bg-surface-50 px-4 py-3">
				<div className="flex items-center gap-3">
					<div className="rounded-xl bg-red-50 p-2 text-red-700">
						<Truck className="h-5 w-5" />
					</div>
					<div>
						<p className="font-medium text-surface-900">Total de excecoes</p>
						<p className="text-sm text-surface-500">{total} eventos na lista</p>
					</div>
				</div>
				<div className="flex items-center gap-2 text-surface-500 text-xs">
					<RefreshCcw className="h-4 w-4" />
					{isFetching
						? "Atualizando delivery..."
						: "Atualizacao automatica ativa"}
				</div>
			</div>

			<div className="mt-6 overflow-hidden rounded-2xl border border-surface-100 bg-white">
				<div className="divide-y divide-surface-100">
					{isLoading ? (
						<div className="p-6 text-center text-surface-600">
							Carregando excecoes de delivery...
						</div>
					) : null}
					{isError && !isLoading ? (
						<div className="flex flex-col items-center gap-3 p-6 text-center">
							<p className="font-medium text-red-700">
								Nao foi possivel carregar as excecoes de delivery.
							</p>
							<button
								className="btn-secondary"
								onClick={() => refetch()}
								type="button"
							>
								Tentar novamente
							</button>
						</div>
					) : null}
					{!(isLoading || isError) && items.length === 0 ? (
						<div className="p-6 text-center text-surface-600">
							Nenhuma excecao encontrada para os filtros informados.
						</div>
					) : null}
					{isLoading || isError
						? null
						: items.map((item) => (
								<div className="p-4" key={item.id}>
									<div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
										<div className="min-w-0 flex-1">
											<div className="flex flex-wrap items-center gap-2">
												<p className="font-medium text-surface-900">
													{item.eventType}
												</p>
												<span
													className={cn(
														"rounded-full px-2 py-1 font-medium text-xs",
														getStatusClasses(item.status)
													)}
												>
													{item.status}
												</span>
												<span className="rounded-full bg-surface-100 px-2 py-1 text-surface-600 text-xs">
													{getKindLabel(item.kind)}
												</span>
												<span className="rounded-full bg-surface-100 px-2 py-1 text-surface-600 text-xs">
													{item.source}
												</span>
											</div>
											<p className="mt-1 text-sm text-surface-500">
												{item.errorDetails ||
													"Sem detalhe adicional do parceiro"}
											</p>
											<div className="mt-2 flex flex-wrap items-center gap-3 text-surface-500 text-xs">
												<span>{renderOccurredAt(item.occurredAt)}</span>
												<span>{item.attempts} tentativas</span>
												{item.orderId ? (
													<span>Pedido {item.orderId}</span>
												) : null}
												{item.runId ? <span>Run {item.runId}</span> : null}
												{item.errorCode ? (
													<span>Codigo {item.errorCode}</span>
												) : null}
											</div>
										</div>
										<div className="rounded-xl bg-surface-50 px-3 py-2 text-right">
											<div className="flex items-center gap-2 text-surface-500 text-xs">
												<CalendarRange className="h-4 w-4" />
												Atualizado em
											</div>
											<p className="mt-1 font-medium text-sm text-surface-900">
												{item.updatedAt
													? formatDateTime(item.updatedAt)
													: "Data indisponivel"}
											</p>
											{item.hasDeadLetter ? (
												<div className="mt-2 inline-flex items-center gap-2 rounded-full bg-red-50 px-2 py-1 text-red-700 text-xs">
													<AlertCircle className="h-3.5 w-3.5" />
													Possui DLQ vinculada
												</div>
											) : null}
										</div>
									</div>
								</div>
							))}
				</div>

				<div className="flex items-center justify-between border-surface-100 border-t bg-white px-4 py-3 text-sm">
					<p className="text-surface-500">
						Pagina {page} de {totalPages}
					</p>
					<div className="flex items-center gap-2">
						<button
							className="btn-secondary"
							disabled={offset <= 0}
							onClick={() =>
								setOffset((current) => Math.max(0, current - PAGE_SIZE))
							}
							type="button"
						>
							Anterior
						</button>
						<button
							className="btn-secondary"
							disabled={offset + PAGE_SIZE >= total}
							onClick={() => setOffset((current) => current + PAGE_SIZE)}
							type="button"
						>
							Proxima
						</button>
					</div>
				</div>
			</div>
		</section>
	)
}
