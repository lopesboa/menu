import { motion } from "framer-motion"
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts"
import { ErrorBoundary } from "@/components/error-boundary"

interface ProgressBarChartProps {
	data: Array<{ name: string; value: number; color?: string }>
	maxValue?: number
	showValue?: boolean
}

function ProgressBarChartContent({
	data,
	maxValue,
	showValue = true,
}: ProgressBarChartProps) {
	const max = maxValue || Math.max(...data.map((d) => d.value))

	return (
		<div className="space-y-4">
			{data.map((item, index) => (
				<motion.div
					animate={{ opacity: 1, x: 0 }}
					className="space-y-2"
					initial={{ opacity: 0, x: -20 }}
					key={item.name}
					transition={{ delay: index * 0.1 }}
				>
					<div className="flex items-center justify-between text-sm">
						<span className="text-surface-600">{item.name}</span>
						{showValue && (
							<span className="font-medium text-surface-900">
								{item.value.toLocaleString("pt-BR")}
							</span>
						)}
					</div>
					<div className="h-3 overflow-hidden rounded-full bg-surface-100">
						<motion.div
							animate={{ width: `${(item.value / max) * 100}%` }}
							className="h-full rounded-full"
							initial={{ width: 0 }}
							style={{ backgroundColor: item.color || "#22c55e" }}
							transition={{
								duration: 0.8,
								delay: index * 0.1,
								ease: "easeOut",
							}}
						/>
					</div>
				</motion.div>
			))}
		</div>
	)
}

export function ProgressBarChart(props: ProgressBarChartProps) {
	return (
		<ErrorBoundary>
			<ProgressBarChartContent {...props} />
		</ErrorBoundary>
	)
}

interface BarChartComponentProps {
	data: Array<{ name: string; value: number; value2?: number }>
	colors?: { primary?: string; secondary?: string }
	stacked?: boolean
}

function BarChartComponentContent({
	data,
	colors = { primary: "#22c55e", secondary: "#f59e0b" },
	stacked = false,
}: BarChartComponentProps) {
	return (
		<motion.div
			animate={{ opacity: 1 }}
			className="h-72 w-full"
			initial={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
		>
			<ResponsiveContainer height="100%" width="100%">
				<BarChart
					data={data}
					margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
				>
					<CartesianGrid
						stroke="#e4e4e7"
						strokeDasharray="3 3"
						vertical={false}
					/>
					<XAxis
						axisLine={{ stroke: "#e4e4e7" }}
						dataKey="name"
						tick={{ fontSize: 12, fill: "#71717a" }}
						tickLine={false}
					/>
					<YAxis
						axisLine={false}
						tick={{ fontSize: 12, fill: "#71717a" }}
						tickLine={false}
					/>
					<Tooltip
						contentStyle={{
							backgroundColor: "#fff",
							border: "1px solid #e4e4e7",
							borderRadius: "12px",
							boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
						}}
					/>
					<Bar
						animationDuration={1000}
						dataKey="value"
						fill={colors.primary}
						radius={[4, 4, 0, 0]}
					/>
					{data[0]?.value2 !== undefined && !stacked && (
						<Bar
							animationDuration={1000}
							dataKey="value2"
							fill={colors.secondary}
							radius={[4, 4, 0, 0]}
						/>
					)}
				</BarChart>
			</ResponsiveContainer>
		</motion.div>
	)
}

export function BarChartComponent(props: BarChartComponentProps) {
	return (
		<ErrorBoundary>
			<BarChartComponentContent {...props} />
		</ErrorBoundary>
	)
}

interface CashFlowChartProps {
	data: Array<{ name: string; income: number; expense: number }>
}

function CashFlowChartContent({ data }: CashFlowChartProps) {
	return (
		<motion.div
			animate={{ opacity: 1 }}
			className="h-72 w-full"
			initial={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
		>
			<ResponsiveContainer height="100%" width="100%">
				<BarChart
					data={data}
					margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
				>
					<CartesianGrid
						stroke="#e4e4e7"
						strokeDasharray="3 3"
						vertical={false}
					/>
					<XAxis
						axisLine={{ stroke: "#e4e4e7" }}
						dataKey="name"
						tick={{ fontSize: 12, fill: "#71717a" }}
						tickLine={false}
					/>
					<YAxis
						axisLine={false}
						tick={{ fontSize: 12, fill: "#71717a" }}
						tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
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
						]}
					/>
					<Bar
						animationDuration={1000}
						dataKey="income"
						fill="#22c55e"
						name="Receitas"
						radius={[4, 4, 0, 0]}
					/>
					<Bar
						animationDuration={1000}
						dataKey="expense"
						fill="#ef4444"
						name="Despesas"
						radius={[4, 4, 0, 0]}
					/>
				</BarChart>
			</ResponsiveContainer>
		</motion.div>
	)
}

export function CashFlowChart(props: CashFlowChartProps) {
	return (
		<ErrorBoundary>
			<CashFlowChartContent {...props} />
		</ErrorBoundary>
	)
}
