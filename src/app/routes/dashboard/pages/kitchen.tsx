import { motion } from "framer-motion"
import { CheckCircle, ChefHat, Clock, Volume2, VolumeX } from "lucide-react"
import { useEffect, useState } from "react"
import { useOrderActions } from "@/hooks/useOrderActions"
import { useOrders } from "@/hooks/useOrders"
import type { OrderStatus } from "@/types/dashboard"
import { cn } from "@/utils/misc"

export function KitchenPage() {
	const { data: orders = [] } = useOrders(undefined, 0, 100)
	const { updateStatus } = useOrderActions()
	const [currentTime, setCurrentTime] = useState(new Date())
	const [soundEnabled, setSoundEnabled] = useState(true)

	const pendingOrders = orders.filter((o) => o.status === "confirmed")
	const preparingOrders = orders.filter((o) => o.status === "preparing")

	useEffect(() => {
		const timer = setInterval(() => setCurrentTime(new Date()), 1000)
		return () => clearInterval(timer)
	}, [])

	const getOrderTime = (createdAt: Date) => {
		const diff = Math.floor(
			(currentTime.getTime() - new Date(createdAt).getTime()) / 1000
		)
		const minutes = Math.floor(diff / 60)
		const seconds = diff % 60
		return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
	}

	const getTimeColor = (createdAt: Date) => {
		const diff = Math.floor(
			(currentTime.getTime() - new Date(createdAt).getTime()) / 1000 / 60
		)
		if (diff < 10) {
			return "text-green-600 bg-green-100"
		}
		if (diff < 20) {
			return "text-yellow-600 bg-yellow-100"
		}
		return "text-red-600 bg-red-100"
	}

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
					<h1 className="font-bold text-2xl text-surface-900">Cozinha</h1>
					<p className="mt-1 text-surface-500">
						Visualização em tempo real para a equipe da cozinha
					</p>
				</div>
				<div className="flex items-center gap-4">
					<div className="text-right">
						<p className="font-bold text-2xl text-surface-900">
							{currentTime.toLocaleTimeString("pt-BR", {
								hour: "2-digit",
								minute: "2-digit",
								second: "2-digit",
							})}
						</p>
						<p className="text-sm text-surface-500">
							{currentTime.toLocaleDateString("pt-BR", {
								weekday: "long",
								day: "numeric",
								month: "long",
							})}
						</p>
					</div>
					<button
						className={cn(
							"rounded-xl p-3 transition-colors",
							soundEnabled
								? "bg-primary-100 text-primary-700"
								: "bg-surface-100 text-surface-400"
						)}
						onClick={() => setSoundEnabled(!soundEnabled)}
						type="button"
					>
						{soundEnabled ? (
							<Volume2 className="h-6 w-6" />
						) : (
							<VolumeX className="h-6 w-6" />
						)}
					</button>
				</div>
			</motion.div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<motion.div
					animate={{ opacity: 1, x: 0 }}
					className="rounded-2xl border-2 border-yellow-200 bg-yellow-50 p-6"
					initial={{ opacity: 0, x: -20 }}
				>
					<div className="mb-4 flex items-center justify-between">
						<div className="flex items-center gap-3">
							<Clock className="h-6 w-6 text-yellow-600" />
							<h2 className="font-bold text-xl text-yellow-900">
								Aguardando Preparo
							</h2>
						</div>
						<span className="rounded-full bg-yellow-200 px-3 py-1 font-medium text-yellow-800">
							{pendingOrders.length}
						</span>
					</div>
					<div className="space-y-3">
						{pendingOrders.slice(0, 6).map((order, index) => (
							<motion.div
								animate={{ opacity: 1, y: 0 }}
								className="rounded-xl border border-yellow-100 bg-white p-4 shadow-sm"
								initial={{ opacity: 0, y: 20 }}
								key={order.id}
								transition={{ delay: index * 0.1 }}
							>
								<div className="mb-3 flex items-center justify-between">
									<div className="flex items-center gap-3">
										<span className="font-bold text-lg text-surface-900">
											#{order.id.replace("o", "")}
										</span>
										<span
											className={cn(
												"rounded-lg px-2 py-1 font-medium text-sm",
												getTimeColor(order.createdAt)
											)}
										>
											{getOrderTime(order.createdAt)}
										</span>
									</div>
									<button
										className="rounded-lg bg-yellow-500 px-4 py-2 font-medium text-white transition-colors hover:bg-yellow-600"
										onClick={() => handleStatusChange(order.id, "preparing")}
										type="button"
									>
										Iniciar
									</button>
								</div>
								<div className="space-y-1">
									{order.orderItems.map((item) => (
										<div
											className="flex items-center gap-2 text-sm"
											key={item.id}
										>
											<span className="font-medium text-surface-900">
												{item.quantity}x
											</span>
											<span className="text-surface-700">{item.name}</span>
											{item.notes && (
												<span className="text-orange-600 text-xs italic">
													({item.notes})
												</span>
											)}
										</div>
									))}
								</div>
								{order.tableId && (
									<div className="mt-2 text-surface-500 text-xs">
										Mesa {order.tableId.replace("t", "")}
									</div>
								)}
							</motion.div>
						))}
						{pendingOrders.length === 0 && (
							<div className="py-8 text-center text-yellow-700">
								<CheckCircle className="mx-auto mb-2 h-12 w-12 opacity-50" />
								<p>Nenhum pedido aguardando</p>
							</div>
						)}
					</div>
				</motion.div>

				<motion.div
					animate={{ opacity: 1, x: 0 }}
					className="rounded-2xl border-2 border-orange-200 bg-orange-50 p-6"
					initial={{ opacity: 0, x: 20 }}
				>
					<div className="mb-4 flex items-center justify-between">
						<div className="flex items-center gap-3">
							<ChefHat className="h-6 w-6 text-orange-600" />
							<h2 className="font-bold text-orange-900 text-xl">Em Preparo</h2>
						</div>
						<span className="rounded-full bg-orange-200 px-3 py-1 font-medium text-orange-800">
							{preparingOrders.length}
						</span>
					</div>
					<div className="space-y-3">
						{preparingOrders.slice(0, 6).map((order, index) => (
							<motion.div
								animate={{ opacity: 1, y: 0 }}
								className="rounded-xl border border-orange-100 bg-white p-4 shadow-sm"
								initial={{ opacity: 0, y: 20 }}
								key={order.id}
								transition={{ delay: index * 0.1 }}
							>
								<div className="mb-3 flex items-center justify-between">
									<div className="flex items-center gap-3">
										<span className="font-bold text-lg text-surface-900">
											#{order.id.replace("o", "")}
										</span>
										<span
											className={cn(
												"rounded-lg px-2 py-1 font-medium text-sm",
												getTimeColor(order.createdAt)
											)}
										>
											{getOrderTime(order.createdAt)}
										</span>
									</div>
									<button
										className="rounded-lg bg-orange-500 px-4 py-2 font-medium text-white transition-colors hover:bg-orange-600"
										onClick={() => handleStatusChange(order.id, "ready")}
										type="button"
									>
										Pronto
									</button>
								</div>
								<div className="space-y-1">
									{order.orderItems.map((item) => (
										<div
											className="flex items-center gap-2 text-sm"
											key={item.id}
										>
											<span className="font-medium text-surface-900">
												{item.quantity}x
											</span>
											<span className="text-surface-700">{item.name}</span>
											{item.notes && (
												<span className="text-orange-600 text-xs italic">
													({item.notes})
												</span>
											)}
										</div>
									))}
								</div>
								{order.tableId && (
									<div className="mt-2 text-surface-500 text-xs">
										Mesa {order.tableId.replace("t", "")}
									</div>
								)}
							</motion.div>
						))}
						{preparingOrders.length === 0 && (
							<div className="py-8 text-center text-orange-700">
								<CheckCircle className="mx-auto mb-2 h-12 w-12 opacity-50" />
								<p>Nenhum pedido em preparo</p>
							</div>
						)}
					</div>
				</motion.div>
			</div>

			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="rounded-2xl border border-surface-100 bg-white p-6"
				initial={{ opacity: 0, y: 20 }}
				transition={{ delay: 0.3 }}
			>
				<h2 className="mb-4 font-semibold text-lg text-surface-900">
					Resumo da Cozinha
				</h2>
				<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
					<div className="rounded-xl bg-surface-50 p-4 text-center">
						<p className="font-bold text-3xl text-surface-900">
							{pendingOrders.length}
						</p>
						<p className="text-sm text-surface-500">Aguardando</p>
					</div>
					<div className="rounded-xl bg-surface-50 p-4 text-center">
						<p className="font-bold text-3xl text-surface-900">
							{preparingOrders.length}
						</p>
						<p className="text-sm text-surface-500">Em Preparo</p>
					</div>
					<div className="rounded-xl bg-surface-50 p-4 text-center">
						<p className="font-bold text-3xl text-surface-900">
							{orders.filter((o) => o.status === "ready").length}
						</p>
						<p className="text-sm text-surface-500">Prontos</p>
					</div>
					<div className="rounded-xl bg-surface-50 p-4 text-center">
						<p className="font-bold text-3xl text-surface-900">
							{orders.filter((o) => o.status === "delivered").length}
						</p>
						<p className="text-sm text-surface-500">Entregues Hoje</p>
					</div>
				</div>
			</motion.div>
		</div>
	)
}
