import { motion } from "framer-motion"
import { RefreshCw, Star } from "lucide-react"
import { useState } from "react"
import { useOrders } from "@/hooks/useOrders"
import { cn } from "@/utils/misc"

export function DeliveryPage() {
	const [activeTab, setActiveTab] = useState<
		"pending" | "picking_up" | "delivering" | "completed"
	>("pending")

	const { data: orders = [], isLoading } = useOrders(
		{ orderType: "delivery" },
		0,
		100
	)

	const pendingOrders = orders.filter((o) => o.status === "ready")
	const pickingUpOrders = orders.filter((o) => o.status === "preparing")
	const deliveringOrders = orders.filter((o) => o.status === "delivered")
	const completedOrders = orders.filter((o) => o.status === "delivered")

	if (isLoading) {
		return (
			<div className="flex h-96 items-center justify-center">
				<div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600" />
			</div>
		)
	}

	return (
		<div className="space-y-6">
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="flex items-center justify-between"
				initial={{ opacity: 0, y: -20 }}
			>
				<div>
					<h1 className="font-bold text-2xl text-surface-900">Delivery</h1>
					<p className="mt-1 text-surface-500">Gerencie pedidos de entrega</p>
				</div>
				<button className="btn-secondary gap-2" type="button">
					<RefreshCw className="h-4 w-4" />
					Sincronizar
				</button>
			</motion.div>

			<div className="grid grid-cols-4 gap-4">
				{[
					{
						key: "pending" as const,
						label: "Aguardando",
						count: pendingOrders.length,
						color: "bg-yellow-50 border-yellow-200",
					},
					{
						key: "picking_up" as const,
						label: "Retirada",
						count: pickingUpOrders.length,
						color: "bg-blue-50 border-blue-200",
					},
					{
						key: "delivering" as const,
						label: "Em Rota",
						count: deliveringOrders.length,
						color: "bg-purple-50 border-purple-200",
					},
					{
						key: "completed" as const,
						label: "Entregues",
						count: completedOrders.length,
						color: "bg-green-50 border-green-200",
					},
				].map((tab) => (
					<button
						className={cn(
							"rounded-xl border-2 p-4 text-left transition-all",
							activeTab === tab.key
								? `${tab.color} border-current`
								: "border-surface-100 bg-white"
						)}
						key={tab.key}
						onClick={() => setActiveTab(tab.key)}
						type="button"
					>
						<p className="font-bold text-2xl text-surface-900">{tab.count}</p>
						<p className="text-sm text-surface-600">{tab.label}</p>
					</button>
				))}
			</div>

			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="grid grid-cols-1 gap-6 lg:grid-cols-2"
				initial={{ opacity: 0, y: 20 }}
			>
				<div className="rounded-2xl border border-surface-100 bg-white p-6">
					<h2 className="mb-4 font-semibold text-lg text-surface-900">
						Plataformas Integradas
					</h2>
					<div className="space-y-3">
						{[
							{ name: "iFood", orders: 45, status: "connected" },
							{ name: "Uber Eats", orders: 32, status: "connected" },
							{ name: "Rappi", orders: 18, status: "connected" },
							{ name: "Delivery Direto", orders: 25, status: "disconnected" },
						].map((platform) => (
							<div
								className="flex items-center justify-between rounded-xl bg-surface-50 p-4"
								key={platform.name}
							>
								<div>
									<p className="font-medium text-surface-900">
										{platform.name}
									</p>
									<p className="text-sm text-surface-500">
										{platform.orders} pedidos hoje
									</p>
								</div>
								<span
									className={cn(
										"rounded-full px-3 py-1 font-medium text-xs",
										platform.status === "connected"
											? "bg-green-100 text-green-700"
											: "bg-red-100 text-red-700"
									)}
								>
									{platform.status === "connected"
										? "Conectado"
										: "Desconectado"}
								</span>
							</div>
						))}
					</div>
				</div>

				<div className="rounded-2xl border border-surface-100 bg-white p-6">
					<h2 className="mb-4 font-semibold text-lg text-surface-900">
						Motoboys Ativos
					</h2>
					<div className="space-y-3">
						{[
							{
								name: "João Pedro",
								status: "available",
								deliveries: 12,
								rating: 4.9,
							},
							{
								name: "Marcos Silva",
								status: "busy",
								deliveries: 8,
								rating: 4.8,
							},
							{
								name: "Carlos Eduardo",
								status: "available",
								deliveries: 15,
								rating: 4.7,
							},
						].map((driver) => (
							<div
								className="flex items-center gap-4 rounded-xl bg-surface-50 p-4"
								key={driver.name}
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 font-bold text-primary-700">
									{driver.name.charAt(0)}
								</div>
								<div className="flex-1">
									<p className="font-medium text-surface-900">{driver.name}</p>
									<div className="flex items-center gap-2 text-sm text-surface-500">
										<span>{driver.deliveries} entregas</span>
										<span>•</span>
										<span className="flex items-center gap-1">
											<Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
											{driver.rating}
										</span>
									</div>
								</div>
								<span
									className={cn(
										"rounded-full px-3 py-1 font-medium text-xs",
										driver.status === "available"
											? "bg-green-100 text-green-700"
											: "bg-yellow-100 text-yellow-700"
									)}
								>
									{driver.status === "available" ? "Disponível" : "Em Entrega"}
								</span>
							</div>
						))}
					</div>
				</div>
			</motion.div>
		</div>
	)
}
