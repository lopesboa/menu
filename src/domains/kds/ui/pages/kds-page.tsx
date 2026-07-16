import { motion } from "framer-motion"
import {
	ArrowRight,
	CheckCircle2,
	ChefHat,
	Clock3,
	Layers3,
	LoaderCircle,
	RefreshCcw,
	UtensilsCrossed,
	XCircle,
} from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useOrganizationCheck } from "@/hooks/use-organization-check"
import { useOpsRealtimeFallbackPolling } from "@/lib/realtime/use-ops-realtime-fallback-polling"
import { formatDateTime } from "@/utils/helpers"
import { cn } from "@/utils/misc"
import { useKdsQueue, useKdsStations } from "../../hooks/use-kds"
import { useKdsActions } from "../../hooks/use-kds-actions"
import type { KdsItemStatus, KdsQueueItem } from "../../types/kds-types"

const PAGE_SIZE = 50

function getItemStatusLabel(status: KdsItemStatus) {
	switch (status) {
		case "pending":
			return "Pendente"
		case "preparing":
			return "Em preparo"
		case "ready":
			return "Pronto"
		case "cancelled":
			return "Cancelado"
		default:
			return "Desconhecido"
	}
}

function getItemStatusClasses(status: KdsItemStatus) {
	switch (status) {
		case "pending":
			return "bg-yellow-100 text-yellow-700"
		case "preparing":
			return "bg-orange-100 text-orange-700"
		case "ready":
			return "bg-green-100 text-green-700"
		case "cancelled":
			return "bg-red-100 text-red-700"
		default:
			return "bg-surface-100 text-surface-700"
	}
}

function getElapsedTime(createdAt: string | null, currentTime: Date) {
	if (!createdAt) {
		return "Sem horario"
	}

	const diffInSeconds = Math.max(
		0,
		Math.floor((currentTime.getTime() - new Date(createdAt).getTime()) / 1000)
	)
	const minutes = Math.floor(diffInSeconds / 60)
	const seconds = diffInSeconds % 60

	return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}

function getElapsedTimeClasses(createdAt: string | null, currentTime: Date) {
	if (!createdAt) {
		return "bg-surface-100 text-surface-500"
	}

	const diffInMinutes = Math.floor(
		(currentTime.getTime() - new Date(createdAt).getTime()) / 1000 / 60
	)

	if (diffInMinutes < 10) {
		return "bg-green-100 text-green-700"
	}

	if (diffInMinutes < 20) {
		return "bg-yellow-100 text-yellow-700"
	}

	return "bg-red-100 text-red-700"
}

function getNextAction(status: KdsItemStatus) {
	switch (status) {
		case "pending":
			return {
				label: "Iniciar preparo",
				nextStatus: "preparing" as const,
				icon: ArrowRight,
				className: "bg-yellow-500 hover:bg-yellow-600",
			}
		case "preparing":
			return {
				label: "Marcar como pronto",
				nextStatus: "ready" as const,
				icon: CheckCircle2,
				className: "bg-green-600 hover:bg-green-700",
			}
		default:
			return null
	}
}

function KdsItemCard({
	item,
	currentTime,
	isUpdating,
	onUpdateStatus,
}: {
	item: KdsQueueItem
	currentTime: Date
	isUpdating: boolean
	onUpdateStatus: (itemId: string, status: KdsItemStatus) => void
}) {
	const nextAction = getNextAction(item.itemStatus)

	return (
		<div className="rounded-2xl border border-surface-100 bg-white p-4 shadow-sm">
			<div className="flex flex-wrap items-start justify-between gap-3">
				<div>
					<div className="flex flex-wrap items-center gap-2">
						<p className="font-semibold text-surface-900">
							Pedido #{item.orderNumber}
						</p>
						<span
							className={cn(
								"rounded-full px-2 py-1 font-medium text-xs",
								getItemStatusClasses(item.itemStatus)
							)}
						>
							{getItemStatusLabel(item.itemStatus)}
						</span>
					</div>
					<p className="mt-1 text-sm text-surface-500">
						{item.stationName} • {item.orderType}
					</p>
				</div>
				<div
					className={cn(
						"rounded-xl px-3 py-1 font-medium text-sm",
						getElapsedTimeClasses(item.createdAt, currentTime)
					)}
				>
					{getElapsedTime(item.createdAt, currentTime)}
				</div>
			</div>

			<div className="mt-4 flex items-start gap-3">
				<div className="rounded-xl bg-surface-50 p-3">
					<UtensilsCrossed className="h-5 w-5 text-surface-500" />
				</div>
				<div className="min-w-0 flex-1">
					<p className="font-medium text-surface-900">
						{item.quantity}x {item.name}
					</p>
					<p className="mt-1 text-sm text-surface-500">
						Produto {item.productId}
					</p>
					{item.notes && (
						<p className="mt-2 rounded-xl bg-orange-50 px-3 py-2 text-orange-700 text-sm">
							Observacao: {item.notes}
						</p>
					)}
				</div>
			</div>

			<div className="mt-4 flex flex-wrap items-center gap-3 text-surface-500 text-xs">
				<span>Item {item.itemId}</span>
				<span>Pedido {item.orderId}</span>
				{item.createdAt ? <span>{formatDateTime(item.createdAt)}</span> : null}
			</div>

			<div className="mt-4 flex flex-wrap items-center gap-2">
				{nextAction ? (
					<button
						className={cn(
							"inline-flex items-center gap-2 rounded-xl px-4 py-2 font-medium text-sm text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60",
							nextAction.className
						)}
						disabled={isUpdating}
						onClick={() => onUpdateStatus(item.itemId, nextAction.nextStatus)}
						type="button"
					>
						<nextAction.icon className="h-4 w-4" />
						{isUpdating ? "Atualizando..." : nextAction.label}
					</button>
				) : (
					<span className="inline-flex items-center gap-2 rounded-xl bg-surface-100 px-3 py-2 text-sm text-surface-500">
						<XCircle className="h-4 w-4" />
						Sem ação disponível
					</span>
				)}
			</div>
		</div>
	)
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: tela operacional combina filtros, sincronizacao e estados de erro por estacao.
export function KdsPage() {
	const { organizationId } = useOrganizationCheck()
	const fallbackRefetchInterval = useOpsRealtimeFallbackPolling("kds")
	const { isItemUpdating, updateItemStatus } = useKdsActions(organizationId)
	const [currentTime, setCurrentTime] = useState(new Date())
	const [offset, setOffset] = useState(0)
	const [selectedStationId, setSelectedStationId] = useState<string | null>(
		null
	)

	const {
		data: stations = [],
		error: stationsError,
		isError: isStationsError,
		isLoading: isStationsLoading,
		isFetching: isStationsFetching,
		refetch: refetchStations,
	} = useKdsStations({ organizationId })

	useEffect(() => {
		const timer = setInterval(() => setCurrentTime(new Date()), 1000)
		return () => clearInterval(timer)
	}, [])

	useEffect(() => {
		if (stations.length === 0) {
			setSelectedStationId(null)
			setOffset(0)
			return
		}

		const stationStillExists = stations.some(
			(station) => station.id === selectedStationId
		)

		if (stationStillExists) {
			return
		}

		const nextStation =
			stations.find((station) => station.active) ?? stations[0]
		setOffset(0)
		setSelectedStationId(nextStation.id)
	}, [selectedStationId, stations])

	const {
		data: queueData,
		error: queueError,
		isError: isQueueError,
		isLoading: isQueueLoading,
		isFetching: isQueueFetching,
		refetch: refetchQueue,
	} = useKdsQueue({
		organizationId,
		stationId: selectedStationId,
		limit: PAGE_SIZE,
		offset,
		refetchInterval: fallbackRefetchInterval,
	})

	const filteredItems = useMemo(() => {
		return (queueData?.items ?? []).filter((item) => {
			return item.stationId === selectedStationId
		})
	}, [queueData?.items, selectedStationId])

	const pendingItems = filteredItems.filter(
		(item) => item.itemStatus === "pending"
	)
	const preparingItems = filteredItems.filter(
		(item) => item.itemStatus === "preparing"
	)
	const readyItems = filteredItems.filter((item) => item.itemStatus === "ready")

	const selectedStation = stations.find(
		(station) => station.id === selectedStationId
	)
	const queuePagination = queueData?.pagination
	const totalItems = queuePagination?.total ?? filteredItems.length
	const currentPage =
		Math.floor((queuePagination?.offset ?? offset) / PAGE_SIZE) + 1
	const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE))
	const canGoToPreviousPage = offset > 0
	const canGoToNextPage = offset + PAGE_SIZE < totalItems
	const showQueueState =
		Boolean(selectedStationId) && !(isQueueError && !isQueueLoading)
	const hasOperationalError = isStationsError || isQueueError
	let syncStatusMessage =
		"Realtime e fallback ativos para a estacao selecionada."
	if (fallbackRefetchInterval) {
		syncStatusMessage = "Fallback de polling ativo para a estacao selecionada."
	}
	if (isStationsFetching || isQueueFetching) {
		syncStatusMessage = "Atualizando dados da estacao..."
	}

	const handleUpdateItemStatus = (itemId: string, status: KdsItemStatus) => {
		updateItemStatus(itemId, status)
	}

	const handleSelectStation = (stationId: string) => {
		setOffset(0)
		setSelectedStationId(stationId)
	}

	return (
		<div className="space-y-6">
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="space-y-4"
				initial={{ opacity: 0, y: -20 }}
			>
				<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
					<div>
						<h1 className="font-bold text-2xl text-surface-900">
							KDS por estacao
						</h1>
						<p className="mt-1 text-surface-500">
							Escolha uma estacao para ver a fila ativa da cozinha.
						</p>
					</div>
					<div className="rounded-2xl border border-surface-100 bg-white px-4 py-3 shadow-sm">
						<p className="font-medium text-sm text-surface-900">
							Sincronizacao
						</p>
						<p className="mt-1 text-surface-500 text-xs">{syncStatusMessage}</p>
					</div>
				</div>

				<div className="rounded-2xl border border-surface-100 bg-white p-4 shadow-sm">
					<div className="flex flex-col gap-3">
						<div className="flex items-center justify-between gap-3">
							<div>
								<p className="font-medium text-sm text-surface-900">Estacoes</p>
								<p className="text-surface-500 text-xs">
									Toque em uma estacao para trocar a fila exibida.
								</p>
							</div>
							{selectedStation ? (
								<span className="rounded-full bg-surface-100 px-3 py-1 font-medium text-surface-700 text-xs">
									Ativa: {selectedStation.name}
								</span>
							) : null}
						</div>

						<div className="flex flex-wrap gap-2">
							{isStationsLoading ? (
								<span className="rounded-full bg-surface-100 px-3 py-2 text-sm text-surface-500">
									Carregando estacoes...
								</span>
							) : null}
							{isStationsError ? (
								<div className="flex flex-wrap items-center gap-2">
									<span className="rounded-full bg-red-50 px-3 py-2 text-red-700 text-sm">
										Nao foi possivel carregar as estacoes.
									</span>
									<button
										className="btn-secondary"
										onClick={() => {
											refetchStations()
										}}
										type="button"
									>
										Tentar novamente
									</button>
								</div>
							) : null}
							{!isStationsLoading && stations.length === 0 ? (
								<span className="rounded-full bg-surface-100 px-3 py-2 text-sm text-surface-500">
									Nenhuma estacao disponivel
								</span>
							) : null}
							{stations
								.filter((station) => station.active)
								.map((station) => {
									const isActive = station.id === selectedStationId

									return (
										<button
											className={cn(
												"rounded-full border px-4 py-2 font-medium text-sm transition-colors",
												isActive
													? "border-primary-200 bg-primary-50 text-primary-700"
													: "border-surface-200 bg-white text-surface-700 hover:border-surface-300 hover:bg-surface-50"
											)}
											key={station.id}
											onClick={() => handleSelectStation(station.id)}
											type="button"
										>
											{station.name}
										</button>
									)
								})}
						</div>
					</div>
				</div>
			</motion.div>

			{hasOperationalError ? (
				<section className="rounded-2xl border border-red-200 bg-red-50 p-5">
					<p className="font-medium text-red-800">
						Nao foi possivel carregar os dados operacionais do KDS.
					</p>
					<p className="mt-1 text-red-700 text-sm">
						{isStationsError
							? "Falha ao carregar a lista de estacoes."
							: "Falha ao carregar a fila da estacao selecionada."}
					</p>
					{stationsError || queueError ? (
						<div className="mt-3 flex flex-wrap items-center gap-2">
							<p className="text-red-700 text-xs">
								Verifique a conexao e tente atualizar novamente.
							</p>
							{isStationsError ? (
								<button
									className="btn-secondary"
									onClick={() => {
										refetchStations()
									}}
									type="button"
								>
									Recarregar estacoes
								</button>
							) : null}
							{selectedStationId && isQueueError ? (
								<button
									className="btn-secondary"
									onClick={() => {
										refetchQueue()
									}}
									type="button"
								>
									Recarregar fila
								</button>
							) : null}
						</div>
					) : null}
				</section>
			) : null}

			<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
				<div className="rounded-2xl border border-surface-100 bg-white p-4">
					<p className="text-sm text-surface-500">Estacao ativa</p>
					<p className="mt-2 font-semibold text-surface-900 text-xl">
						{selectedStation?.name ?? "Selecione uma estacao"}
					</p>
				</div>
				<div className="rounded-2xl border border-surface-100 bg-white p-4">
					<p className="text-sm text-surface-500">Pendentes</p>
					<p className="mt-2 font-semibold text-surface-900 text-xl">
						{pendingItems.length}
					</p>
				</div>
				<div className="rounded-2xl border border-surface-100 bg-white p-4">
					<p className="text-sm text-surface-500">Em preparo</p>
					<p className="mt-2 font-semibold text-surface-900 text-xl">
						{preparingItems.length}
					</p>
				</div>
				<div className="rounded-2xl border border-surface-100 bg-white p-4">
					<p className="text-sm text-surface-500">Prontos</p>
					<p className="mt-2 font-semibold text-surface-900 text-xl">
						{readyItems.length}
					</p>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
				{selectedStationId ? (
					<div className="xl:col-span-3">
						<div className="flex flex-col gap-3 rounded-2xl border border-surface-100 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
							<div>
								<p className="font-medium text-sm text-surface-900">
									Fila da estacao
								</p>
								<p className="mt-1 text-surface-500 text-xs">
									Pagina {currentPage} de {totalPages} • {totalItems} itens no
									total
								</p>
							</div>
							<div className="flex flex-wrap items-center gap-2">
								<button
									className="btn-secondary"
									disabled={!canGoToPreviousPage}
									onClick={() =>
										setOffset((currentOffset) =>
											Math.max(0, currentOffset - PAGE_SIZE)
										)
									}
									type="button"
								>
									Anterior
								</button>
								<button
									className="btn-secondary"
									disabled={!canGoToNextPage}
									onClick={() =>
										setOffset((currentOffset) => currentOffset + PAGE_SIZE)
									}
									type="button"
								>
									Proxima
								</button>
								<button
									className="btn-secondary"
									disabled={isQueueFetching}
									onClick={() => {
										refetchQueue()
									}}
									type="button"
								>
									{isQueueFetching ? (
										<LoaderCircle className="h-4 w-4 animate-spin" />
									) : (
										<RefreshCcw className="h-4 w-4" />
									)}
									Atualizar fila
								</button>
							</div>
						</div>
					</div>
				) : null}

				{!(selectedStationId || isStationsLoading) && stations.length > 0 ? (
					<div className="xl:col-span-3">
						<section className="rounded-2xl border border-surface-200 bg-white p-6 text-center">
							<p className="font-medium text-surface-900">
								Selecione uma estacao para carregar a fila do KDS.
							</p>
							<p className="mt-2 text-sm text-surface-500">
								A exibicao da fila sempre respeita o `stationId` ativo.
							</p>
						</section>
					</div>
				) : null}

				{showQueueState && isQueueLoading ? (
					<div className="xl:col-span-3">
						<section className="rounded-2xl border border-surface-200 bg-white p-6 text-center text-surface-600">
							Carregando fila da estacao selecionada...
						</section>
					</div>
				) : null}

				{showQueueState && !isQueueLoading && filteredItems.length === 0 ? (
					<div className="xl:col-span-3">
						<section className="rounded-2xl border border-surface-200 bg-white p-6 text-center">
							<p className="font-medium text-surface-900">
								Nenhum item encontrado nesta estacao.
							</p>
							<p className="mt-2 text-sm text-surface-500">
								Troque a estacao, avance a paginacao ou aguarde novos eventos
								realtime.
							</p>
						</section>
					</div>
				) : null}

				<section className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
					<div className="mb-4 flex items-center justify-between">
						<div className="flex items-center gap-3">
							<Clock3 className="h-5 w-5 text-yellow-700" />
							<h2 className="font-semibold text-lg text-surface-900">
								Pendentes
							</h2>
						</div>
						<span className="rounded-full bg-yellow-200 px-3 py-1 font-medium text-sm text-yellow-800">
							{pendingItems.length}
						</span>
					</div>
					<div className="space-y-3">
						{pendingItems.map((item) => (
							<KdsItemCard
								currentTime={currentTime}
								isUpdating={isItemUpdating(item.itemId)}
								item={item}
								key={item.itemId}
								onUpdateStatus={handleUpdateItemStatus}
							/>
						))}
						{pendingItems.length === 0 &&
						!isQueueLoading &&
						filteredItems.length > 0 ? (
							<p className="py-8 text-center text-yellow-800">
								Nenhum item pendente nesta estacao.
							</p>
						) : null}
					</div>
				</section>

				<section className="rounded-2xl border border-orange-200 bg-orange-50 p-6">
					<div className="mb-4 flex items-center justify-between">
						<div className="flex items-center gap-3">
							<ChefHat className="h-5 w-5 text-orange-700" />
							<h2 className="font-semibold text-lg text-surface-900">
								Em preparo
							</h2>
						</div>
						<span className="rounded-full bg-orange-200 px-3 py-1 font-medium text-orange-800 text-sm">
							{preparingItems.length}
						</span>
					</div>
					<div className="space-y-3">
						{preparingItems.map((item) => (
							<KdsItemCard
								currentTime={currentTime}
								isUpdating={isItemUpdating(item.itemId)}
								item={item}
								key={item.itemId}
								onUpdateStatus={handleUpdateItemStatus}
							/>
						))}
						{preparingItems.length === 0 &&
						!isQueueLoading &&
						filteredItems.length > 0 ? (
							<p className="py-8 text-center text-orange-800">
								Nenhum item em preparo nesta estacao.
							</p>
						) : null}
					</div>
				</section>

				<section className="rounded-2xl border border-green-200 bg-green-50 p-6">
					<div className="mb-4 flex items-center justify-between">
						<div className="flex items-center gap-3">
							<Layers3 className="h-5 w-5 text-green-700" />
							<h2 className="font-semibold text-lg text-surface-900">
								Prontos
							</h2>
						</div>
						<span className="rounded-full bg-green-200 px-3 py-1 font-medium text-green-800 text-sm">
							{readyItems.length}
						</span>
					</div>
					<div className="space-y-3">
						{readyItems.map((item) => (
							<KdsItemCard
								currentTime={currentTime}
								isUpdating={isItemUpdating(item.itemId)}
								item={item}
								key={item.itemId}
								onUpdateStatus={handleUpdateItemStatus}
							/>
						))}
						{readyItems.length === 0 &&
						!isQueueLoading &&
						filteredItems.length > 0 ? (
							<p className="py-8 text-center text-green-800">
								Nenhum item pronto nesta estacao.
							</p>
						) : null}
					</div>
				</section>
			</div>
		</div>
	)
}
