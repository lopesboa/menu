import { AlertTriangle, Inbox, RefreshCcw, Search } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import { useOpsRealtimeFallbackPolling } from "@/lib/realtime/use-ops-realtime-fallback-polling"
import { sentryCaptureException } from "@/lib/sentry"
import { formatDateTime, formatRelativeTime } from "@/utils/helpers"
import { cn } from "@/utils/misc"
import { useDeadLetterEvents, useInboxEvents } from "../hooks/use-ops-events"

const PAGE_SIZE = 5

function getStatusClasses(status: string) {
	const normalizedStatus = status.trim().toLowerCase()

	switch (normalizedStatus) {
		case "received":
		case "queued":
		case "open":
			return "bg-blue-100 text-blue-700"
		case "processing":
		case "retrying":
			return "bg-amber-100 text-amber-800"
		case "resolved":
		case "processed":
		case "success":
			return "bg-emerald-100 text-emerald-700"
		case "failed":
		case "error":
			return "bg-red-100 text-red-700"
		default:
			return "bg-surface-100 text-surface-700"
	}
}

function getStatusLabel(status: string) {
	const normalizedStatus = status.trim().toLowerCase()

	switch (normalizedStatus) {
		case "received":
			return "Recebido"
		case "queued":
			return "Na fila"
		case "processing":
			return "Processando"
		case "processed":
			return "Processado"
		case "open":
			return "Em aberto"
		case "resolved":
			return "Resolvido"
		case "retrying":
			return "Reprocessando"
		case "failed":
			return "Falhou"
		case "error":
			return "Erro"
		default:
			return status || "Desconhecido"
	}
}

function renderOccurredAt(
	occurredAt: string | null,
	variant: "full" | "compact"
) {
	if (!occurredAt) {
		return variant === "full" ? "Data indisponivel" : "Sem data informada"
	}

	return variant === "full"
		? formatDateTime(occurredAt)
		: formatRelativeTime(occurredAt)
}

interface OpsEventsPanelProps {
	organizationId: string | null
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: painel operacional combina filtros, duas consultas e estados de listagem.
export function OpsEventsPanel({ organizationId }: OpsEventsPanelProps) {
	const [search, setSearch] = useState("")
	const [channel, setChannel] = useState("")
	const [inboxStatus, setInboxStatus] = useState("")
	const [dlqStatus, setDlqStatus] = useState("")
	const [inboxOffset, setInboxOffset] = useState(0)
	const [dlqOffset, setDlqOffset] = useState(0)
	const opsFallbackRefetchInterval = useOpsRealtimeFallbackPolling("ops")
	const hasNotifiedInboxError = useRef(false)
	const hasNotifiedDlqError = useRef(false)

	const {
		data: inboxData,
		error: inboxError,
		isError: isInboxError,
		isLoading: isInboxLoading,
		isFetching: isInboxFetching,
		refetch: refetchInbox,
	} = useInboxEvents({
		organizationId,
		limit: PAGE_SIZE,
		offset: inboxOffset,
		search: search.trim() || undefined,
		status: inboxStatus || undefined,
		channel: channel || undefined,
		refetchInterval: opsFallbackRefetchInterval,
	})

	const {
		data: dlqData,
		error: dlqError,
		isError: isDlqError,
		isLoading: isDlqLoading,
		isFetching: isDlqFetching,
		refetch: refetchDlq,
	} = useDeadLetterEvents({
		organizationId,
		limit: PAGE_SIZE,
		offset: dlqOffset,
		search: search.trim() || undefined,
		status: dlqStatus || undefined,
		channel: channel || undefined,
		refetchInterval: opsFallbackRefetchInterval,
	})

	useEffect(() => {
		if (!(isInboxError && inboxError) || hasNotifiedInboxError.current) {
			if (!isInboxError) {
				hasNotifiedInboxError.current = false
			}
			return
		}

		hasNotifiedInboxError.current = true
		toast.error("Nao foi possivel carregar os eventos da inbox")
		sentryCaptureException(inboxError, {
			context: "ops_inbox_events_fetch",
			organizationId,
		})
	}, [inboxError, isInboxError, organizationId])

	useEffect(() => {
		if (!(isDlqError && dlqError) || hasNotifiedDlqError.current) {
			if (!isDlqError) {
				hasNotifiedDlqError.current = false
			}
			return
		}

		hasNotifiedDlqError.current = true
		toast.error("Nao foi possivel carregar os eventos da DLQ")
		sentryCaptureException(dlqError, {
			context: "ops_dlq_events_fetch",
			organizationId,
		})
	}, [dlqError, isDlqError, organizationId])

	const inboxItems = inboxData?.items ?? []
	const dlqItems = dlqData?.items ?? []
	const inboxTotal = inboxData?.pagination.total ?? inboxItems.length
	const dlqTotal = dlqData?.pagination.total ?? dlqItems.length
	const inboxPage = Math.floor(inboxOffset / PAGE_SIZE) + 1
	const dlqPage = Math.floor(dlqOffset / PAGE_SIZE) + 1
	const inboxTotalPages = Math.max(1, Math.ceil(inboxTotal / PAGE_SIZE))
	const dlqTotalPages = Math.max(1, Math.ceil(dlqTotal / PAGE_SIZE))

	return (
		<section className="rounded-2xl border border-surface-100 bg-white p-6">
			<div className="flex flex-col gap-4 border-surface-100 border-b pb-4 lg:flex-row lg:items-end lg:justify-between">
				<div>
					<h2 className="font-semibold text-lg text-surface-900">
						Inbox e DLQ operacional
					</h2>
					<p className="text-sm text-surface-500">
						Acompanhe eventos processados, falhas e itens que exigem acao.
					</p>
				</div>

				<div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
					<div className="relative min-w-0">
						<Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-surface-400" />
						<input
							className="input-field pl-9"
							onChange={(event) => {
								setSearch(event.target.value)
								setInboxOffset(0)
								setDlqOffset(0)
							}}
							placeholder="Buscar por evento ou pedido"
							type="text"
							value={search}
						/>
					</div>
					<select
						className="input-field"
						onChange={(event) => {
							setChannel(event.target.value)
							setInboxOffset(0)
							setDlqOffset(0)
						}}
						value={channel}
					>
						<option value="">Todos os canais</option>
						<option value="orders">Pedidos</option>
						<option value="kds">Cozinha</option>
						<option value="delivery">Delivery</option>
						<option value="ops">Operacao</option>
					</select>
					<div className="flex items-center gap-2 text-surface-500 text-xs">
						<RefreshCcw className="h-4 w-4" />
						{isInboxFetching || isDlqFetching
							? "Atualizando listas operacionais..."
							: "Atualizacao automatica ativa"}
					</div>
				</div>
			</div>

			<div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
				<div className="overflow-hidden rounded-2xl border border-surface-100 bg-surface-50/50">
					<div className="flex items-center justify-between border-surface-100 border-b bg-white px-4 py-4">
						<div className="flex items-center gap-3">
							<div className="rounded-xl bg-blue-50 p-2 text-blue-700">
								<Inbox className="h-5 w-5" />
							</div>
							<div>
								<h3 className="font-semibold text-surface-900">Inbox</h3>
								<p className="text-sm text-surface-500">
									{inboxTotal} eventos encontrados
								</p>
							</div>
						</div>
						<select
							className="input-field max-w-40"
							onChange={(event) => {
								setInboxStatus(event.target.value)
								setInboxOffset(0)
							}}
							value={inboxStatus}
						>
							<option value="">Todos status</option>
							<option value="received">Recebidos</option>
							<option value="processing">Processando</option>
							<option value="failed">Falhas</option>
						</select>
					</div>

					<div className="divide-y divide-surface-100 bg-white">
						{isInboxLoading && (
							<div className="p-6 text-center text-surface-600">
								Carregando eventos da inbox...
							</div>
						)}
						{isInboxError && !isInboxLoading && (
							<div className="flex flex-col items-center gap-3 p-6 text-center">
								<p className="font-medium text-red-700">
									Nao foi possivel carregar a inbox operacional.
								</p>
								<button
									className="btn-secondary"
									onClick={() => refetchInbox()}
									type="button"
								>
									Tentar novamente
								</button>
							</div>
						)}
						{!(isInboxLoading || isInboxError) && inboxItems.length === 0 && (
							<div className="p-6 text-center text-surface-600">
								Nenhum evento encontrado para os filtros informados.
							</div>
						)}
						{!(isInboxLoading || isInboxError) &&
							inboxItems.map((item) => (
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
													{getStatusLabel(item.status)}
												</span>
												<span className="rounded-full bg-surface-100 px-2 py-1 text-surface-600 text-xs">
													{item.channel}
												</span>
											</div>
											<p className="mt-1 text-sm text-surface-500">
												{item.orderId
													? `Pedido ${item.orderId}`
													: "Sem pedido associado"}
											</p>
											<div className="mt-2 flex flex-wrap items-center gap-3 text-surface-500 text-xs">
												<span>
													{renderOccurredAt(item.occurredAt, "compact")}
												</span>
												<span>{renderOccurredAt(item.occurredAt, "full")}</span>
												<span>{item.attempts} tentativas</span>
												{item.errorCode && <span>Codigo {item.errorCode}</span>}
											</div>
										</div>
									</div>
								</div>
							))}
					</div>

					<div className="flex items-center justify-between border-surface-100 border-t bg-white px-4 py-3 text-sm">
						<p className="text-surface-500">
							Pagina {inboxPage} de {inboxTotalPages}
						</p>
						<div className="flex items-center gap-2">
							<button
								className="btn-secondary"
								disabled={inboxOffset <= 0}
								onClick={() =>
									setInboxOffset((current) => Math.max(0, current - PAGE_SIZE))
								}
								type="button"
							>
								Anterior
							</button>
							<button
								className="btn-secondary"
								disabled={inboxOffset + PAGE_SIZE >= inboxTotal}
								onClick={() => setInboxOffset((current) => current + PAGE_SIZE)}
								type="button"
							>
								Proxima
							</button>
						</div>
					</div>
				</div>

				<div className="overflow-hidden rounded-2xl border border-surface-100 bg-surface-50/50">
					<div className="flex items-center justify-between border-surface-100 border-b bg-white px-4 py-4">
						<div className="flex items-center gap-3">
							<div className="rounded-xl bg-red-50 p-2 text-red-700">
								<AlertTriangle className="h-5 w-5" />
							</div>
							<div>
								<h3 className="font-semibold text-surface-900">DLQ</h3>
								<p className="text-sm text-surface-500">
									{dlqTotal} eventos encontrados
								</p>
							</div>
						</div>
						<select
							className="input-field max-w-40"
							onChange={(event) => {
								setDlqStatus(event.target.value)
								setDlqOffset(0)
							}}
							value={dlqStatus}
						>
							<option value="">Todos status</option>
							<option value="open">Em aberto</option>
							<option value="retrying">Reprocessando</option>
							<option value="resolved">Resolvidos</option>
							<option value="failed">Falhas</option>
						</select>
					</div>

					<div className="divide-y divide-surface-100 bg-white">
						{isDlqLoading && (
							<div className="p-6 text-center text-surface-600">
								Carregando eventos da DLQ...
							</div>
						)}
						{isDlqError && !isDlqLoading && (
							<div className="flex flex-col items-center gap-3 p-6 text-center">
								<p className="font-medium text-red-700">
									Nao foi possivel carregar a DLQ operacional.
								</p>
								<button
									className="btn-secondary"
									onClick={() => refetchDlq()}
									type="button"
								>
									Tentar novamente
								</button>
							</div>
						)}
						{!(isDlqLoading || isDlqError) && dlqItems.length === 0 && (
							<div className="p-6 text-center text-surface-600">
								Nenhum evento encontrado para os filtros informados.
							</div>
						)}
						{!(isDlqLoading || isDlqError) &&
							dlqItems.map((item) => (
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
													{getStatusLabel(item.status)}
												</span>
												<span className="rounded-full bg-surface-100 px-2 py-1 text-surface-600 text-xs">
													{item.channel}
												</span>
											</div>
											<p className="mt-1 text-sm text-surface-500">
												{item.lastError || "Sem detalhe adicional do backend"}
											</p>
											<div className="mt-2 flex flex-wrap items-center gap-3 text-surface-500 text-xs">
												<span>
													{item.orderId
														? `Pedido ${item.orderId}`
														: "Sem pedido associado"}
												</span>
												<span>
													{renderOccurredAt(item.occurredAt, "compact")}
												</span>
												<span>{item.attempts} tentativas</span>
												{item.errorCode && <span>Codigo {item.errorCode}</span>}
											</div>
										</div>
									</div>
								</div>
							))}
					</div>

					<div className="flex items-center justify-between border-surface-100 border-t bg-white px-4 py-3 text-sm">
						<p className="text-surface-500">
							Pagina {dlqPage} de {dlqTotalPages}
						</p>
						<div className="flex items-center gap-2">
							<button
								className="btn-secondary"
								disabled={dlqOffset <= 0}
								onClick={() =>
									setDlqOffset((current) => Math.max(0, current - PAGE_SIZE))
								}
								type="button"
							>
								Anterior
							</button>
							<button
								className="btn-secondary"
								disabled={dlqOffset + PAGE_SIZE >= dlqTotal}
								onClick={() => setDlqOffset((current) => current + PAGE_SIZE)}
								type="button"
							>
								Proxima
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
