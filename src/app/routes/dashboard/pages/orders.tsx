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
import { useOrdersActions, useSelectedOrder } from "@/app/store/orderStore"
import { StatusBadge } from "@/components/ui/status-badge"
import { useOrderActions } from "@/hooks/useOrderActions"
import { useOrders } from "@/hooks/useOrders"
import type { OrderStatus } from "@/types/dashboard"
import { formatCurrency, formatDateTime } from "@/utils/helpers"
import { cn } from "@/utils/misc"

const statusConfig: Record<
	OrderStatus,
	{ label: string; icon: React.ElementType; color: string }
> = {
	pending: {
		label: "Pendente",
		icon: Clock,
		color: "bg-yellow-100 text-yellow-700",
	},
	confirmed: {
		label: "Confirmado",
		icon: CheckCircle,
		color: "bg-blue-100 text-blue-700",
	},
	preparing: {
		label: "Preparando",
		icon: ChefHat,
		color: "bg-orange-100 text-orange-700",
	},
	ready: { label: "Pronto", icon: Truck, color: "bg-green-100 text-green-700" },
	delivered: {
		label: "Entregue",
		icon: CheckCircle,
		color: "bg-gray-100 text-gray-700",
	},
	cancelled: {
		label: "Cancelado",
		icon: XCircle,
		color: "bg-red-100 text-red-700",
	},
	rejected: {
		label: "Rejeitado",
		icon: XCircle,
		color: "bg-red-100 text-red-700",
	},
}

export default function OrdersPage() {
	const { data: orders = [] } = useOrders(undefined, 0, 50)
	const { updateStatus } = useOrderActions()
	const { selectOrder, setFilter } = useOrdersActions()
	const { selectedOrder, filter } = useSelectedOrder()
	const [activeTab, setActiveTab] = useState<OrderStatus | "all">("all")

	const filteredOrders = orders.filter((order) => {
		if (activeTab !== "all" && order.status !== activeTab) {
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

	const tabs: { key: OrderStatus | "all"; label: string }[] = [
		{ key: "all", label: "Todos" },
		{ key: "pending", label: "Pendente" },
		{ key: "confirmed", label: "Confirmado" },
		{ key: "preparing", label: "Preparando" },
		{ key: "ready", label: "Pronto" },
		{ key: "delivered", label: "Entregue" },
	]

	const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
		updateStatus(orderId, newStatus)
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
									{orders.filter((o) => o.status === tab.key).length}
								</span>
							)}
						</button>
					))}
				</div>

				<div className="max-h-165 divide-y divide-surface-100 overflow-y-auto">
					{filteredOrders.map((order, index) => {
						const StatusIcon = statusConfig[order.status]?.icon || Clock
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
												statusConfig[order.status]?.color
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
										<div className="mt-4 flex gap-2">
											{order.status === "pending" && (
												<button
													className="btn-primary text-sm"
													onClick={(e) => {
														e.stopPropagation()
														handleStatusChange(order.id, "confirmed")
													}}
													type="button"
												>
													Confirmar
												</button>
											)}
											{order.status === "confirmed" && (
												<button
													className="btn-primary text-sm"
													onClick={(e) => {
														e.stopPropagation()
														handleStatusChange(order.id, "preparing")
													}}
													type="button"
												>
													Iniciar Preparo
												</button>
											)}
											{order.status === "preparing" && (
												<button
													className="btn-primary text-sm"
													onClick={(e) => {
														e.stopPropagation()
														handleStatusChange(order.id, "ready")
													}}
													type="button"
												>
													Marcar Pronto
												</button>
											)}
											{order.status === "ready" && (
												<button
													className="btn-primary text-sm"
													onClick={(e) => {
														e.stopPropagation()
														handleStatusChange(order.id, "delivered")
													}}
													type="button"
												>
													Entregar
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
