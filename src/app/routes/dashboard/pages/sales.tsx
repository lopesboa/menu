import { motion } from "framer-motion"
import { DollarSign, Download, TrendingDown, TrendingUp } from "lucide-react"
import { formatCurrency } from "@/utils/helpers"
import { CashFlowChart } from "../components/recharts/bar-chart"
import { DonutChart } from "../components/recharts/donut-chart"
import { RevenueChart } from "../components/recharts/revenue-chart"
import { salesData } from "../data/mockData"

export function SalesPage() {
	const totalRevenue = salesData.reduce((sum, d) => sum + d.revenue, 0)
	const totalExpenses = salesData.reduce((sum, d) => sum + d.expenses, 0)
	const netProfit = totalRevenue - totalExpenses

	const paymentMethods = [
		{ name: "PIX", value: 35, color: "#22c55e" },
		{ name: "Cartão de Crédito", value: 30, color: "#3b82f6" },
		{ name: "Cartão de Débito", value: 20, color: "#8b5cf6" },
		{ name: "Dinheiro", value: 10, color: "#f59e0b" },
		{ name: "Vale Refeição", value: 5, color: "#ec4899" },
	]

	const dailyData = salesData.slice(-7).map((d) => ({
		name: new Date(d.date).toLocaleDateString("pt-BR", { weekday: "short" }),
		income: d.revenue,
		expense: d.expenses,
	}))

	return (
		<div className="space-y-6">
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="flex items-center justify-between"
				initial={{ opacity: 0, y: -20 }}
			>
				<div>
					<h1 className="font-bold text-2xl text-surface-900">Vendas</h1>
					<p className="mt-1 text-surface-500">Relatório financeiro e vendas</p>
				</div>
				<button className="btn-secondary gap-2" type="button">
					<Download className="h-4 w-4" />
					Exportar
				</button>
			</motion.div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="metric-card"
					initial={{ opacity: 0, y: 20 }}
				>
					<div className="flex items-center gap-3">
						<div className="rounded-xl bg-green-50 p-3">
							<DollarSign className="h-6 w-6 text-green-600" />
						</div>
						<div>
							<p className="text-sm text-surface-500">Receita Total</p>
							<p className="font-bold text-2xl text-surface-900">
								{formatCurrency(totalRevenue)}
							</p>
						</div>
					</div>
				</motion.div>
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="metric-card"
					initial={{ opacity: 0, y: 20 }}
					transition={{ delay: 0.1 }}
				>
					<div className="flex items-center gap-3">
						<div className="rounded-xl bg-red-50 p-3">
							<TrendingDown className="h-6 w-6 text-red-600" />
						</div>
						<div>
							<p className="text-sm text-surface-500">Despesas</p>
							<p className="font-bold text-2xl text-surface-900">
								{formatCurrency(totalExpenses)}
							</p>
						</div>
					</div>
				</motion.div>
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="metric-card"
					initial={{ opacity: 0, y: 20 }}
					transition={{ delay: 0.2 }}
				>
					<div className="flex items-center gap-3">
						<div className="rounded-xl bg-blue-50 p-3">
							<TrendingUp className="h-6 w-6 text-blue-600" />
						</div>
						<div>
							<p className="text-sm text-surface-500">Lucro Líquido</p>
							<p className="font-bold text-2xl text-surface-900">
								{formatCurrency(netProfit)}
							</p>
						</div>
					</div>
				</motion.div>
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="rounded-2xl border border-surface-100 bg-white p-6 lg:col-span-2"
					initial={{ opacity: 0, y: 20 }}
					transition={{ delay: 0.3 }}
				>
					<h2 className="mb-4 font-semibold text-lg text-surface-900">
						Fluxo de Caixa
					</h2>
					<CashFlowChart data={dailyData} />
				</motion.div>
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="rounded-2xl border border-surface-100 bg-white p-6"
					initial={{ opacity: 0, y: 20 }}
					transition={{ delay: 0.4 }}
				>
					<h2 className="mb-4 font-semibold text-lg text-surface-900">
						Métodos de Pagamento
					</h2>
					<DonutChart data={paymentMethods} />
				</motion.div>
			</div>

			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="rounded-2xl border border-surface-100 bg-white p-6"
				initial={{ opacity: 0, y: 20 }}
				transition={{ delay: 0.5 }}
			>
				<h2 className="mb-4 font-semibold text-lg text-surface-900">
					Evolução de Vendas
				</h2>
				<RevenueChart data={salesData} />
			</motion.div>
		</div>
	)
}
