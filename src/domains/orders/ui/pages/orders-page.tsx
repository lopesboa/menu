import { motion } from "framer-motion"
import {
	CheckCircle,
	ChefHat,
	Clock,
	Plus,
	Search,
	Truck,
	XCircle,
} from "lucide-react"
import type React from "react"
import { useState } from "react"
import { toast } from "sonner"
import { StatusBadge } from "@/components/ui/status-badge"
import { useCurrentUserRole } from "@/hooks/use-current-user-role"
import { useOrganizationCheck } from "@/hooks/use-organization-check"
import { useOpsRealtimeFallbackPolling } from "@/lib/realtime/use-ops-realtime-fallback-polling"
import { formatCurrency, formatDateTime } from "@/utils/helpers"
import { cn } from "@/utils/misc"
import { useOrderActions } from "../../hooks/use-order-actions"
import { useOrders } from "../../hooks/use-orders"
import {
	canTransitionOrderStatus,
	getOperationalStatusLabel,
	type OperationalOrderStatus,
	toApiOrderStatus,
	toOperationalOrderStatus,
} from "../../model/order-operational-status"
import {
	type CriticalOrderAction,
	canExecuteCriticalOrderAction,
	getCriticalOrderPermissionMessage,
} from "../../model/order-permissions"
import {
	useOrderSelectors,
	useOrderActions as useOrderStoreActions,
} from "../../model/order-store"

const statusConfig: Record<
	OperationalOrderStatus,
	{ label: string; icon: React.ElementType; color: string }
> = {
	novo: {
		label: "Novo",
		icon: Clock,
		color: "bg-yellow-100 text-yellow-700",
	},
	aceito: {
		label: "Aceito",
		icon: CheckCircle,
		color: "bg-blue-100 text-blue-700",
	},
	em_preparo: {
		label: "Em preparo",
		icon: ChefHat,
		color: "bg-orange-100 text-orange-700",
	},
	pronto: {
		label: "Pronto",
		icon: Truck,
		color: "bg-green-100 text-green-700",
	},
	finalizado: {
		label: "Finalizado",
		icon: CheckCircle,
		color: "bg-gray-100 text-gray-700",
	},
	cancelado: {
		label: "Cancelado",
		icon: XCircle,
		color: "bg-red-100 text-red-700",
	},
	desconhecido: {
		label: "Desconhecido",
		icon: XCircle,
		color: "bg-surface-200 text-surface-700",
	},
}

export default function OrdersPage() {
	const { organizationId } = useOrganizationCheck()
	const { role } = useCurrentUserRole()
	const fallbackRefetchInterval = useOpsRealtimeFallbackPolling("orders")
	const { data: orders = [] } = useOrders({
		organizationId,
		page: 0,
		count: 50,
		refetchInterval: fallbackRefetchInterval,
	})
	const { updateStatus } = useOrderActions(organizationId)
	const { selectOrder, setFilter } = useOrderStoreActions()
	const { selectedOrder, filter } = useOrderSelectors()
	const [activeTab, setActiveTab] = useState<OperationalOrderStatus | "all">(
		"all"
	)

	const filteredOrders = orders.filter((order) => {
		const operationalStatus = toOperationalOrderStatus(order.status)

		if (activeTab !== "all" && operationalStatus !== activeTab) {
			return false
		}

		if (filter.search) {
			const search = filter.search.toLowerCase()
			return (
				order.notes?.toLowerCase().includes(search) ||
				order.customerName?.toLowerCase().includes(search) ||
				order.orderNumber?.toString().toLowerCase().includes(search)
			)
		}

		return true
	})

	const tabs: { key: OperationalOrderStatus | "all"; label: string }[] = [
		{ key: "all", label: "Todos" },
		{ key: "novo", label: getOperationalStatusLabel("novo") },
		{ key: "aceito", label: getOperationalStatusLabel("aceito") },
		{ key: "em_preparo", label: getOperationalStatusLabel("em_preparo") },
		{ key: "pronto", label: getOperationalStatusLabel("pronto") },
		{ key: "finalizado", label: getOperationalStatusLabel("finalizado") },
		{ key: "cancelado", label: getOperationalStatusLabel("cancelado") },
		{ key: "desconhecido", label: getOperationalStatusLabel("desconhecido") },
	]

	const handleStatusChange = (
		orderId: string,
		currentStatus: string,
		nextStatus: OperationalOrderStatus
	) => {
		if (!canTransitionOrderStatus(currentStatus, nextStatus)) {
			toast.error("Transição de status inválida para o fluxo operacional")
			return
		}

		updateStatus(orderId, toApiOrderStatus(nextStatus))
	}

	const validateCriticalPermission = (action: CriticalOrderAction) => {
		const canExecute = canExecuteCriticalOrderAction(role, action)
		if (canExecute) {
			return true
		}

		toast.error(getCriticalOrderPermissionMessage(action))
		return false
	}

	return (
		<div className="space-y-6">
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="flex items-center justify-between"
				initial={{ opacity: 0, y: -20 }}
			>
				<div>
					<h1 className="font-bold text-2xl text-surface-900">Pedidos</h1>
					<p className="mt-1 text-surface-500">
						Gerencie todos os pedidos do restaurante
					</p>
				</div>
				<button className="btn-primary gap-2" type="button">
					<Plus className="h-5 w-5" />
					Novo Pedido
				</button>
			</motion.div>

			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="overflow-hidden rounded-2xl border border-surface-100 bg-white"
				initial={{ opacity: 0, y: 20 }}
				transition={{ delay: 0.1 }}
			>
				<div className="flex items-center gap-4 border-surface-100 border-b p-4">
					<div className="relative max-w-md flex-1">
						<Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-surface-400" />
						<input
							className="input-field pl-10 text-surface-400"
							onChange={(e) => setFilter("search", e.target.value)}
							placeholder="Buscar por cliente ou número..."
							type="text"
							value={filter.search}
						/>
					</div>
				</div>

				<div className="flex gap-1 overflow-x-auto border-surface-100 border-b p-2">
					{tabs.map((tab) => (
						<button
							className={cn(
								"whitespace-nowrap rounded-lg px-4 py-2 font-medium text-sm transition-colors",
								activeTab === tab.key
									? "bg-primary-50 text-primary-700"
									: "text-surface-600 hover:bg-surface-50"
							)}
							key={tab.key}
							onClick={() => setActiveTab(tab.key)}
							type="button"
						>
							{tab.label}
							{tab.key !== "all" && (
								<span className="ml-2 rounded-full bg-surface-100 px-2 py-0.5 text-xs">
									{
										orders.filter(
											(order) =>
												toOperationalOrderStatus(order.status) === tab.key
										).length
									}
								</span>
							)}
						</button>
					))}
				</div>

				<div className="max-h-165 divide-y divide-surface-100 overflow-y-auto">
					{filteredOrders.map((order, index) => {
						const operationalStatus = toOperationalOrderStatus(order.status)
						const StatusIcon = statusConfig[operationalStatus]?.icon || Clock
						const canCancel = canExecuteCriticalOrderAction(role, "cancelar")
						const canRelease = canExecuteCriticalOrderAction(role, "liberar")

						return (
							<motion.div
								animate={{ opacity: 1, x: 0 }}
								className="cursor-pointer p-4 transition-colors hover:bg-surface-50"
								initial={{ opacity: 0, x: -20 }}
								key={order.id}
								onClick={() => selectOrder(order)}
								transition={{ delay: index * 0.03 }}
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-4">
										<div
											className={cn(
												"flex h-10 w-10 items-center justify-center rounded-xl",
												statusConfig[operationalStatus]?.color
											)}
										>
											<StatusIcon className="h-5 w-5" />
										</div>
										<div>
											<div className="flex items-center gap-2">
												<span className="font-semibold text-surface-900">
													#{order.orderNumber}
												</span>
												<span className="rounded-full bg-surface-100 px-2 py-0.5 text-surface-600 text-xs">
													{order.type === "dine_in" && "Presencial"}
													{order.type === "takeaway" && "Retirada"}
													{order.type === "delivery" && "Delivery"}
												</span>
											</div>
											<p className="text-sm text-surface-500">
												{order.customerName || "Cliente não identificado"} •{" "}
												{formatDateTime(order.createdAt)}
											</p>
										</div>
									</div>
									<div className="flex items-center gap-4">
										<div className="text-right">
											<p className="font-bold text-surface-900">
												{formatCurrency(order.total)}
											</p>
											<p className="text-surface-500 text-xs">
												{order.orderItems.length}{" "}
												{order.orderItems.length > 1 ? "itens" : "item"}{" "}
											</p>
										</div>
										<StatusBadge size="md" status={order.status} />
									</div>
								</div>
								{selectedOrder?.id === order.id && (
									<motion.div
										animate={{ opacity: 1, height: "auto" }}
										className="mt-4 rounded-xl bg-surface-50 p-4"
										initial={{ opacity: 0, height: 0 }}
									>
										<h4 className="mb-2 font-medium text-surface-900">
											Itens do Pedido
										</h4>
										<div className="space-y-2">
											{order.orderItems.map((item) => (
												<div
													className="flex items-center justify-between text-sm"
													key={item.id}
												>
													<span className="text-surface-600">
														{item.quantity}x {item.name}
													</span>
													<span className="font-medium text-surface-900">
														{formatCurrency(item.price * item.quantity)}
													</span>
												</div>
											))}
										</div>
										{order.notes && (
											<p className="mt-3 text-sm text-surface-500 italic">
												Observação: {order.notes}
											</p>
										)}
										<div className="mt-4 flex flex-wrap gap-2">
											{operationalStatus === "novo" && (
												<button
													className="btn-primary text-sm"
													onClick={(e) => {
														e.stopPropagation()
														handleStatusChange(order.id, order.status, "aceito")
													}}
													type="button"
												>
													Aceitar
												</button>
											)}
											{operationalStatus === "aceito" && (
												<button
													className="btn-primary text-sm"
													onClick={(e) => {
														e.stopPropagation()
														handleStatusChange(
															order.id,
															order.status,
															"em_preparo"
														)
													}}
													type="button"
												>
													Iniciar preparo
												</button>
											)}
											{operationalStatus === "em_preparo" && (
												<button
													className="btn-primary text-sm"
													onClick={(e) => {
														e.stopPropagation()
														handleStatusChange(order.id, order.status, "pronto")
													}}
													type="button"
												>
													Marcar pronto
												</button>
											)}
											{operationalStatus === "pronto" && (
												<button
													className="btn-primary text-sm"
													disabled={!canRelease}
													onClick={(e) => {
														e.stopPropagation()
														if (!validateCriticalPermission("liberar")) {
															return
														}

														handleStatusChange(
															order.id,
															order.status,
															"finalizado"
														)
													}}
													type="button"
												>
													Liberar pedido
												</button>
											)}
											{["novo", "aceito", "em_preparo", "pronto"].includes(
												operationalStatus
											) && (
												<button
													className="btn-secondary text-red-600 text-sm"
													disabled={!canCancel}
													onClick={(e) => {
														e.stopPropagation()
														if (!validateCriticalPermission("cancelar")) {
															return
														}

														handleStatusChange(
															order.id,
															order.status,
															"cancelado"
														)
													}}
													type="button"
												>
													Cancelar pedido
												</button>
											)}
										</div>
									</motion.div>
								)}
							</motion.div>
						)
					})}
				</div>
			</motion.div>
		</div>
	)
}
