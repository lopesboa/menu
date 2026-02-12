import { motion } from "framer-motion"
import {
	Cell,
	Legend,
	Pie,
	PieChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts"
import { ErrorBoundary } from "@/components/error-boundary"

interface PaymentMethodChartProps {
	data: Array<{ name: string; value: number; color: string }>
}

function PaymentMethodChartContent({ data }: PaymentMethodChartProps) {
	return (
		<motion.div
			animate={{ opacity: 1, scale: 1 }}
			className="h-64 w-full"
			initial={{ opacity: 0, scale: 0.9 }}
			transition={{ duration: 0.5 }}
		>
			<ResponsiveContainer height="100%" width="100%">
				<PieChart>
					<Pie
						animationDuration={1000}
						cx="50%"
						cy="50%"
						data={data}
						dataKey="value"
						innerRadius={60}
						outerRadius={80}
						paddingAngle={4}
					>
						{data.map((entry) => (
							<Cell fill={entry.color} key={`cell-${entry.name}`} />
						))}
					</Pie>
					<Tooltip
						contentStyle={{
							backgroundColor: "#fff",
							border: "1px solid #e4e4e7",
							borderRadius: "12px",
							boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
						}}
						formatter={(value) => [
							`${(value as number).toFixed(1)}%`,
							"Percentual",
						]}
					/>
					<Legend
						align="right"
						iconSize={10}
						iconType="circle"
						layout="vertical"
						verticalAlign="middle"
						wrapperStyle={{
							fontSize: "12px",
							color: "#71717a",
						}}
					/>
				</PieChart>
			</ResponsiveContainer>
		</motion.div>
	)
}

export function PaymentMethodChart(props: PaymentMethodChartProps) {
	return (
		<ErrorBoundary>
			<PaymentMethodChartContent {...props} />
		</ErrorBoundary>
	)
}

interface DonutChartProps {
	data: Array<{ name: string; value: number; color: string }>
	title?: string
}

function DonutChartContent({ data, title }: DonutChartProps) {
	const total = data.reduce((sum, item) => sum + item.value, 0)

	return (
		<div className="rounded-2xl border border-surface-100 bg-white p-6">
			{title && (
				<h3 className="mb-4 font-semibold text-lg text-surface-900">{title}</h3>
			)}
			<div className="flex items-center justify-between">
				<div className="h-48 w-48">
					<ResponsiveContainer height="100%" width="100%">
						<PieChart>
							<Pie
								animationDuration={1000}
								cx="50%"
								cy="50%"
								data={data}
								dataKey="value"
								innerRadius={50}
								outerRadius={70}
								paddingAngle={2}
							>
								{data.map((entry) => (
									<Cell fill={entry.color} key={`cell-${entry.name}`} />
								))}
							</Pie>
							<Tooltip
								contentStyle={{
									backgroundColor: "#fff",
									border: "1px solid #e4e4e7",
									borderRadius: "8px",
								}}
							/>
						</PieChart>
					</ResponsiveContainer>
				</div>
				<div className="ml-4 flex-1 space-y-3">
					{data.map((item) => (
						<div className="flex items-center justify-between" key={item.name}>
							<div className="flex items-center gap-2">
								<div
									className="h-3 w-3 rounded-full"
									style={{ backgroundColor: item.color }}
								/>
								<span className="text-sm text-surface-600">{item.name}</span>
							</div>
							<span className="font-medium text-sm text-surface-900">
								{((item.value / total) * 100).toFixed(1)}%
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export function DonutChart(props: DonutChartProps) {
	return (
		<ErrorBoundary>
			<DonutChartContent {...props} />
		</ErrorBoundary>
	)
}
