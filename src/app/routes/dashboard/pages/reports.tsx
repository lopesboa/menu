import { motion } from "framer-motion"
import {
	BarChart3,
	Calendar,
	DollarSign,
	Download,
	TrendingUp,
	Users,
} from "lucide-react"
import {
	customers,
	menuItems,
	salesData,
} from "@/app/routes/dashboard/data/mock-data"
import { useOrderStats } from "@/domains/orders/hooks/use-orders"
import { useOrganizationCheck } from "@/hooks/use-organization-check"
import { formatCurrency } from "@/utils/helpers"
import { cn } from "@/utils/misc"
import { BarChartComponent } from "../components/recharts/bar-chart"
import { DonutChart } from "../components/recharts/donut-chart"

export function ReportsPage() {
	const { organizationId } = useOrganizationCheck()
	const { data: stats } = useOrderStats(organizationId)

	const topProducts = menuItems
		.map((item) => ({
			name: item.name,
			value: Math.floor(Math.random() * 100) + 20,
		}))
		.sort((a, b) => b.value - a.value)
		.slice(0, 8)

	const weeklyData = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"].map(
		(day) => ({
			name: day,
			value: Math.floor(Math.random() * 50) + 30,
			value2: Math.floor(Math.random() * 30) + 20,
		})
	)

	const categoryData = [
		{ name: "Pizzas", value: 28, color: "#22c55e" },
		{ name: "Burgers", value: 24, color: "#3b82f6" },
		{ name: "Bebidas", value: 18, color: "#8b5cf6" },
		{ name: "Pratos", value: 16, color: "#f59e0b" },
		{ name: "Sobremesas", value: 14, color: "#ec4899" },
	]

	return (
		<div className="space-y-6">
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="flex items-center justify-between"
				initial={{ opacity: 0, y: -20 }}
			>
				<div>
					<h1 className="font-bold text-2xl text-surface-900">Relatórios</h1>
					<p className="mt-1 text-surface-500">
						Análises e métricas do restaurante
					</p>
				</div>
				<div className="flex items-center gap-3">
					<button className="btn-secondary gap-2" type="button">
						<Calendar className="h-4 w-4" />
						Este Mês
					</button>
					<button className="btn-primary gap-2" type="button">
						<Download className="h-4 w-4" />
						Exportar
					</button>
				</div>
			</motion.div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
				{[
					{
						title: "Faturamento",
						value: formatCurrency(salesData.reduce((s, d) => s + d.revenue, 0)),
						icon: DollarSign,
						color: "bg-green-50",
					},
					{
						title: "Pedidos",
						value: stats?.totalOrders ?? 0,
						icon: BarChart3,
						color: "bg-blue-50",
					},
					{
						title: "Clientes",
						value: customers.length,
						icon: Users,
						color: "bg-purple-50",
					},
					{
						title: "Ticket Médio",
						value: formatCurrency(
							Number(stats?.totalRevenue || 0) / (stats?.totalOrders || 1)
						),
						icon: TrendingUp,
						color: "bg-orange-50",
					},
				].map((stat) => (
					<motion.div
						animate={{ opacity: 1, y: 0 }}
						className="metric-card"
						initial={{ opacity: 0, y: 20 }}
						key={stat.title}
						transition={{ delay: 0.1 }}
					>
						<div className={cn("w-fit rounded-xl p-3", stat.color)}>
							<stat.icon className="h-6 w-6 text-surface-700" />
						</div>
						<p className="mt-3 font-bold text-2xl text-surface-900">
							{stat.value}
						</p>
						<p className="text-sm text-surface-500">{stat.title}</p>
					</motion.div>
				))}
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="rounded-2xl border border-surface-100 bg-white p-6 lg:col-span-2"
					initial={{ opacity: 0, y: 20 }}
				>
					<h2 className="mb-4 font-semibold text-lg text-surface-900">
						Vendas da Semana
					</h2>
					<BarChartComponent data={weeklyData} />
				</motion.div>
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="rounded-2xl border border-surface-100 bg-white p-6"
					initial={{ opacity: 0, y: 20 }}
					transition={{ delay: 0.2 }}
				>
					<h2 className="mb-4 font-semibold text-lg text-surface-900">
						Vendas por Categoria
					</h2>
					<DonutChart data={categoryData} />
				</motion.div>
			</div>

			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="rounded-2xl border border-surface-100 bg-white p-6"
				initial={{ opacity: 0, y: 20 }}
				transition={{ delay: 0.3 }}
			>
				<h2 className="mb-4 font-semibold text-lg text-surface-900">
					Produtos Mais Vendidos
				</h2>
				<div className="space-y-3">
					{topProducts.map((product, index) => (
						<div className="flex items-center gap-4" key={product.name}>
							<span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-100 font-bold text-sm text-surface-600">
								{index + 1}
							</span>
							<div className="flex-1">
								<p className="font-medium text-surface-900">{product.name}</p>
								<div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-100">
									<motion.div
										animate={{
											width: `${(product.value / topProducts[0].value) * 100}%`,
										}}
										className="h-full rounded-full bg-primary-500"
										initial={{ width: 0 }}
										transition={{ duration: 0.8, delay: index * 0.1 }}
									/>
								</div>
							</div>
							<span className="font-semibold text-surface-900">
								{product.value} vend.
							</span>
						</div>
					))}
				</div>
			</motion.div>
		</div>
	)
}
