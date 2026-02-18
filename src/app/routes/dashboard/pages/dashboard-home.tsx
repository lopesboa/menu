import { motion } from "framer-motion"
import {
	ArrowRight,
	DollarSign,
	ShoppingCart,
	TableIcon,
	TrendingDown,
	TrendingUp,
	Users,
} from "lucide-react"
import { StatusBadge } from "@/components/ui/status-badge"
import {
	useDashboardSummary,
	useRevenueChart,
	useSalesRanking,
} from "@/hooks/useDashboard"
import { formatCurrency, formatRelativeTime } from "@/utils/helpers"
import { cn } from "@/utils/misc"
import { MetricCard } from "../components/ui/metric-card"
import { RevenueChart } from "../components/recharts/revenue-chart"

export default function DashboardHome() {
	const { data: dashboardSummary } = useDashboardSummary(10)
	const { data: revenueChart } = useRevenueChart(30)
	const { data: salesRanking } = useSalesRanking(30, 1, 5)
	const isRevenueNegative =
		revenueChart?.summary.percentageChange &&
		revenueChart?.summary.percentageChange < 0
	const isRevenuePositive =
		revenueChart?.summary.percentageChange &&
		revenueChart?.summary.percentageChange > 0

	const stats = [
		{
			title: "Faturamento Hoje",
			value: formatCurrency(dashboardSummary?.stats.revenue.current),
			change: dashboardSummary?.stats.revenue.percentageChange || 0,
			icon: DollarSign,
			iconColor: "text-green-600",
			iconBgColor: "bg-green-50",
			delay: 0,
		},
		{
			title: "Pedidos Hoje",
			value: dashboardSummary?.stats.orders.current || 0,
			change: dashboardSummary?.stats.orders.percentageChange || 0,
			icon: ShoppingCart,
			iconColor: "text-blue-600",
			iconBgColor: "bg-blue-50",
			delay: 0.1,
		},
		{
			title: "Clientes Ativos",
			value: 22,
			change: 5.3,
			icon: Users,
			iconColor: "text-purple-600",
			iconBgColor: "bg-purple-50",
			delay: 0.2,
		},
		{
			title: "Mesas Ocupadas",
			value: `${dashboardSummary?.stats.tables.occupied}/${dashboardSummary?.stats.tables.total}`,
			change: dashboardSummary?.stats.tables.percentageChange || 0,
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
						<div
							className={cn(
								"flex items-center gap-2",
								isRevenueNegative ? "text-green-600" : "text-red-700"
							)}
						>
							{isRevenueNegative ? (
								<TrendingUp className="h-4 w-4" />
							) : (
								<TrendingDown className="h-4 w-4" />
							)}
							<span className="font-medium text-sm">
								{isRevenuePositive ? "+" : ""}
								{revenueChart?.summary.percentageChange
									? revenueChart?.summary.percentageChange
									: "0"}{" "}
								%
							</span>
						</div>
					</div>
					<RevenueChart data={revenueChart?.data || []} showOrders />
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
						{salesRanking?.products.map((item) => (
							<div
								className="flex cursor-pointer items-center gap-4 rounded-xl p-3 transition-colors hover:bg-surface-50"
								key={item.id}
							>
								<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-100 font-bold text-surface-600">
									{item.rank}
								</div>
								<div className="min-w-0 flex-1">
									<p className="truncate font-medium text-surface-900">
										{item.name}
									</p>
									<p className="text-sm text-surface-500">{item.category}</p>
								</div>
								<div className="text-right">
									<p className="font-semibold text-surface-900">
										{formatCurrency(item.revenue)}
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
							{dashboardSummary?.recentOrders.total} total
						</span>
					</div>
					<div className="space-y-3">
						{dashboardSummary?.recentOrders.orders?.map((order) => (
							<div
								className="flex items-center justify-between rounded-xl bg-surface-50 p-4 transition-colors hover:bg-surface-100"
								key={order.id}
							>
								<div className="flex items-center gap-4">
									<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
										<span className="font-semibold text-primary-700 text-sm">
											#{order.orderNumber}
										</span>
									</div>
									<div>
										<p className="font-medium text-surface-900">
											{order.customerName || "Cliente"}
										</p>
										<p className="text-sm text-surface-500">
											{order?.itemsCount && order.itemsCount > 1
												? "itens "
												: "1 item "}
											• {formatRelativeTime(order.createdAt)}
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
						{dashboardSummary?.tablesStatus.tables.map((table) => (
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
							<span className="text-sm text-surface-600">
								{dashboardSummary?.tablesStatus.summary.available} Disponível
							</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="h-3 w-3 rounded-full bg-red-500" />
							<span className="text-sm text-surface-600">
								{dashboardSummary?.tablesStatus.summary.occupied} Ocupada
							</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="h-3 w-3 rounded-full bg-blue-500" />
							<span className="text-sm text-surface-600">
								{dashboardSummary?.tablesStatus.summary.reserved} Reservada
							</span>
						</div>
						<div className="flex items-center gap-2">
							<div className="h-3 w-3 rounded-full bg-yellow-500" />
							<span className="text-sm text-surface-600">
								{dashboardSummary?.tablesStatus.summary.cleaning} Limpeza
							</span>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	)
}
