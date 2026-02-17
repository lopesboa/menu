import { motion } from "framer-motion"
import {
	ArrowRight,
	DollarSign,
	ShoppingCart,
	TableIcon,
	TrendingUp,
	Users,
} from "lucide-react"
import { StatusBadge } from "@/components/ui/status-badge"
import { formatCurrency, formatRelativeTime } from "@/utils/helpers"
import { cn } from "@/utils/misc"
import { RevenueChart } from "../components/charts/revenue-chart"
import { MetricCard } from "../components/ui/metric-card"
import {
	customers,
	menuItems,
	orders,
	salesData,
	tables,
} from "../data/mockData"

export default function DashboardHome() {
	const todayOrders = orders.slice(0, 5)
	const topSelling = menuItems
		.filter((item) => item.available)
		.sort((a, b) => b.price - a.price)
		.slice(0, 5)

	const todayRevenue = orders
		.filter((order) => {
			const orderDate = new Date(order.createdAt)
			const today = new Date()
			return orderDate.toDateString() === today.toDateString()
		})
		.reduce((sum, order) => sum + order.total, 0)

	const activeOrders = orders.filter(
		(o) => o.status !== "delivered" && o.status !== "cancelled"
	).length
	const occupiedTables = tables.filter((t) => t.status === "occupied").length

	const stats = [
		{
			title: "Faturamento Hoje",
			value: formatCurrency(todayRevenue),
			change: 12.5,
			icon: DollarSign,
			iconColor: "text-green-600",
			iconBgColor: "bg-green-50",
			delay: 0,
		},
		{
			title: "Pedidos Hoje",
			value: activeOrders,
			change: 8.2,
			icon: ShoppingCart,
			iconColor: "text-blue-600",
			iconBgColor: "bg-blue-50",
			delay: 0.1,
		},
		{
			title: "Clientes Ativos",
			value: customers.length,
			change: 5.3,
			icon: Users,
			iconColor: "text-purple-600",
			iconBgColor: "bg-purple-50",
			delay: 0.2,
		},
		{
			title: "Mesas Ocupadas",
			value: `${occupiedTables}/${tables.length}`,
			change: -2.1,
			icon: TableIcon,
			iconColor: "text-orange-600",
			iconBgColor: "bg-orange-50",
			delay: 0.3,
		},
	]

	return (
		<div className="space-y-6">
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				initial={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.5 }}
			>
				<h1 className="font-bold text-2xl text-surface-900">Dashboard</h1>
				<p className="mt-1 text-surface-500">Bem-vindo ao MenuBao Restaurant</p>
			</motion.div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
				{stats.map((stat) => (
					<MetricCard key={stat.title} {...stat} />
				))}
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="rounded-2xl border border-surface-100 bg-white p-6 lg:col-span-2"
					initial={{ opacity: 0, y: 20 }}
					transition={{ delay: 0.4 }}
				>
					<div className="mb-6 flex items-center justify-between">
						<div>
							<h2 className="font-semibold text-lg text-surface-900">
								Faturamento
							</h2>
							<p className="text-sm text-surface-500">Últimos 30 dias</p>
						</div>
						<div className="flex items-center gap-2 text-green-600">
							<TrendingUp className="h-4 w-4" />
							<span className="font-medium text-sm">+12.5%</span>
						</div>
					</div>
					<RevenueChart data={salesData} />
				</motion.div>

				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="rounded-2xl border border-surface-100 bg-white p-6"
					initial={{ opacity: 0, y: 20 }}
					transition={{ delay: 0.5 }}
				>
					<h2 className="mb-4 font-semibold text-lg text-surface-900">
						Mais Vendidos
					</h2>
					<div className="space-y-4">
						{topSelling.map((item, index) => (
							<div
								className="flex cursor-pointer items-center gap-4 rounded-xl p-3 transition-colors hover:bg-surface-50"
								key={item.id}
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-100 font-bold text-surface-600">
									{index + 1}
								</div>
								<div className="min-w-0 flex-1">
									<p className="truncate font-medium text-surface-900">
										{item.name}
									</p>
									<p className="text-sm text-surface-500">{item.category}</p>
								</div>
								<div className="text-right">
									<p className="font-semibold text-surface-900">
										{formatCurrency(item.price)}
									</p>
								</div>
							</div>
						))}
					</div>
					<button
						className="mt-4 flex w-full items-center justify-center gap-2 py-2 font-medium text-primary-600 text-sm transition-colors hover:text-primary-700"
						type="button"
					>
						Ver todos <ArrowRight className="h-4 w-4" />
					</button>
				</motion.div>
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="rounded-2xl border border-surface-100 bg-white p-6"
					initial={{ opacity: 0, y: 20 }}
					transition={{ delay: 0.6 }}
				>
					<div className="mb-4 flex items-center justify-between">
						<h2 className="font-semibold text-lg text-surface-900">
							Pedidos Recentes
						</h2>
						<span className="text-sm text-surface-500">
							{orders.length} total
						</span>
					</div>
					<div className="space-y-3">
						{todayOrders.map((order) => (
							<div
								className="flex items-center justify-between rounded-xl bg-surface-50 p-4 transition-colors hover:bg-surface-100"
								key={order.id}
							>
								<div className="flex items-center gap-4">
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
										<span className="font-semibold text-primary-700 text-sm">
											#{order.id.replace("o", "")}
										</span>
									</div>
									<div>
										<p className="font-medium text-surface-900">
											{order.customerName || "Cliente"}
										</p>
										<p className="text-sm text-surface-500">
											{order.items.length} itens •{" "}
											{formatRelativeTime(order.createdAt)}
										</p>
									</div>
								</div>
								<div className="flex items-center gap-4">
									<span className="font-semibold text-surface-900">
										{formatCurrency(order.total)}
									</span>
									<StatusBadge size="sm" status={order.status} />
								</div>
							</div>
						))}
					</div>
				</motion.div>

				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="rounded-2xl border border-surface-100 bg-white p-6"
					initial={{ opacity: 0, y: 20 }}
					transition={{ delay: 0.7 }}
				>
					<h2 className="mb-4 font-semibold text-lg text-surface-900">
						Status das Mesas
					</h2>
					<div className="grid grid-cols-5 gap-3">
						{tables.map((table) => (
							<div
								className={cn(
									"cursor-pointer rounded-xl p-3 text-center transition-all hover:scale-105",
									table.status === "available" &&
										"border border-green-200 bg-green-50",
									table.status === "occupied" &&
										"border border-red-200 bg-red-50",
									table.status === "reserved" &&
										"border border-blue-200 bg-blue-50",
									table.status === "cleaning" &&
										"border border-yellow-200 bg-yellow-50"
								)}
								key={table.id}
							>
								<p className="font-bold text-surface-900">{table.number}</p>
								<p className="text-surface-500 text-xs">
									{table.capacity} lugares
								</p>
								<div
									className={cn(
										"mx-auto mt-2 h-2 w-2 rounded-full",
										table.status === "available" && "bg-green-500",
										table.status === "occupied" && "bg-red-500",
										table.status === "reserved" && "bg-blue-500",
										table.status === "cleaning" && "bg-yellow-500"
									)}
								/>
							</div>
						))}
					</div>
					<div className="mt-4 flex items-center justify-center gap-6 border-surface-100 border-t pt-4">
						<div className="flex items-center gap-2">
							<div className="h-3 w-3 rounded-full bg-green-500" />
							<span className="text-sm text-surface-600">Disponível</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="h-3 w-3 rounded-full bg-red-500" />
							<span className="text-sm text-surface-600">Ocupada</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="h-3 w-3 rounded-full bg-blue-500" />
							<span className="text-sm text-surface-600">Reservada</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="h-3 w-3 rounded-full bg-yellow-500" />
							<span className="text-sm text-surface-600">Limpeza</span>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	)
}
