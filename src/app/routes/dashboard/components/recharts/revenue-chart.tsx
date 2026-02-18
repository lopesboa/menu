import { motion } from "framer-motion"
import {
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts"
import { ErrorBoundary } from "@/components/error-boundary"
import type { Daum } from "@/types/dashboard"

interface RevenueChartProps {
	data: Daum[]
	showOrders?: boolean
}

function RevenueChartContent({ data, showOrders = false }: RevenueChartProps) {
	const formatDate = (dateStr: string) => {
		const date = new Date(dateStr)
		return date.toLocaleDateString("pt-BR", {
			day: "2-digit",
			month: "2-digit",
		})
	}

	const formatCurrency = (value: number) => {
		return `R$ ${(value / 1000).toFixed(1)}k`
	}

	return (
		<motion.div
			animate={{ opacity: 1 }}
			className="h-80 w-full"
			initial={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
		>
			<ResponsiveContainer height="100%" width="100%">
				<LineChart
					data={data}
					margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
				>
					<defs>
						<linearGradient id="revenueGradient" x1="0" x2="0" y1="0" y2="1">
							<stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
							<stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
						</linearGradient>
					</defs>
					<CartesianGrid stroke="#e4e4e7" strokeDasharray="3 3" />
					<XAxis
						axisLine={{ stroke: "#e4e4e7" }}
						dataKey="date"
						tick={{ fontSize: 12, fill: "#71717a" }}
						tickFormatter={formatDate}
						tickLine={false}
					/>
					<YAxis
						axisLine={false}
						tick={{ fontSize: 12, fill: "#71717a" }}
						tickFormatter={formatCurrency}
						tickLine={false}
					/>
					<Tooltip
						contentStyle={{
							backgroundColor: "#fff",
							border: "1px solid #e4e4e7",
							borderRadius: "12px",
							boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
						}}
						formatter={(value) => [
							`R$ ${(value as number).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
							"Faturamento / Pedidos",
						]}
						labelFormatter={(label) => {
							const date = new Date(label)
							return date.toLocaleDateString("pt-BR", {
								weekday: "long",
								day: "2-digit",
								month: "long",
							})
						}}
					/>
					{showOrders && (
						<Legend
							wrapperStyle={{
								paddingTop: "20px",
							}}
						/>
					)}
					<Line
						activeDot={{ r: 6, fill: "#22c55e" }}
						animationDuration={1500}
						dataKey="revenue"
						dot={false}
						stroke="#22c55e"
						strokeWidth={3}
						type="monotone"
					/>
					{showOrders && (
						<Line
							activeDot={{ r: 4, fill: "#f59e0b" }}
							animationDuration={1500}
							dataKey="orders"
							dot={false}
							stroke="#f59e0b"
							strokeWidth={2}
							type="monotone"
						/>
					)}
				</LineChart>
			</ResponsiveContainer>
		</motion.div>
	)
}

export function RevenueChart(props: RevenueChartProps) {
	return (
		<ErrorBoundary>
			<RevenueChartContent {...props} />
		</ErrorBoundary>
	)
}
