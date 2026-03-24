import { motion } from "framer-motion"
import {
	ArrowRight,
	BadgeCheck,
	CheckCircle2,
	ClipboardList,
	DollarSign,
	Package,
	Settings,
	ShoppingCart,
	Sparkles,
	TableIcon,
	TrendingDown,
	TrendingUp,
	Users,
	X,
} from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { useLoaderData, useNavigate } from "react-router"
import { toast } from "sonner"
import { StatusBadge } from "@/components/ui/status-badge"
import { useOpsSummary } from "@/domains/ops/hooks/use-ops-summary"
import {
	useDashboardSummary,
	useRevenueChart,
	useSalesRanking,
} from "@/hooks/use-dashboard"
import { authClient } from "@/lib/client"
import { sentryCaptureException } from "@/lib/sentry"
import { formatCurrency, formatRelativeTime } from "@/utils/helpers"
import { cn } from "@/utils/misc"
import { RevenueChart } from "../components/recharts/revenue-chart"
import { MetricCard } from "../components/ui/metric-card"
import { dashboardRoutePaths } from "../manifest"
import {
	completeDashboardOnboardingStep,
	countCompletedDashboardOnboardingSteps,
	type DashboardOnboardingChecklist,
	type DashboardOnboardingStepKey,
	dismissDashboardOnboardingChecklist,
	readDashboardOnboardingChecklistFromMetadata,
} from "../utils/onboarding-checklist"

const onboardingSteps = [
	{
		description:
			"Adicione os primeiros produtos e categorias para comecar a vender.",
		icon: Package,
		label: "Configurar cardapio",
		step: "menu",
		to: dashboardRoutePaths.menu,
	},
	{
		description:
			"Revise dados do estabelecimento e complete informacoes quando precisar.",
		icon: Settings,
		label: "Revisar configuracoes",
		step: "settings",
		to: dashboardRoutePaths.settings,
	},
	{
		description: "Confira plano, cobranca e os proximos passos comerciais.",
		icon: BadgeCheck,
		label: "Ver cobranca",
		step: "billing",
		to: dashboardRoutePaths.billing,
	},
] as const

export default function DashboardHome() {
	const loaderData = useLoaderData()
	const navigate = useNavigate()
	const [checklistData, setChecklistData] =
		useState<DashboardOnboardingChecklist | null>(null)
	const [organizationMetadata, setOrganizationMetadata] = useState<Record<
		string,
		unknown
	> | null>(null)
	const [checklistActionLoading, setChecklistActionLoading] = useState(false)

	const organizationId = loaderData.orgId

	useEffect(() => {
		let isMounted = true

		async function loadOrganizationChecklist() {
			if (!organizationId) {
				return
			}

			const { data, error } = await authClient.organization.getFullOrganization(
				{
					query: { organizationId },
				}
			)

			if (!isMounted) {
				return
			}

			if (error) {
				sentryCaptureException(error)
				return
			}

			const metadata =
				data?.metadata && typeof data.metadata === "object"
					? (data.metadata as Record<string, unknown>)
					: {}

			setOrganizationMetadata(metadata)
			setChecklistData(readDashboardOnboardingChecklistFromMetadata(metadata))
		}

		loadOrganizationChecklist().catch(sentryCaptureException)

		return () => {
			isMounted = false
		}
	}, [organizationId])

	const completedSteps = useMemo(
		() =>
			checklistData ? countCompletedDashboardOnboardingSteps(checklistData) : 0,
		[checklistData]
	)

	async function updateChecklistMetadata(
		nextChecklist: DashboardOnboardingChecklist
	) {
		if (!organizationId) {
			return false
		}

		setChecklistActionLoading(true)

		try {
			const nextMetadata = {
				...(organizationMetadata ?? {}),
				onboardingChecklist: nextChecklist,
			}

			const { error } = await authClient.organization.update({
				data: {
					metadata: nextMetadata,
				},
				organizationId,
			})

			if (error) {
				toast.error("Nao foi possivel atualizar seus proximos passos.")
				sentryCaptureException(error)
				return false
			}

			setOrganizationMetadata(nextMetadata)
			setChecklistData(nextChecklist)
			return true
		} catch (error) {
			toast.error("Nao foi possivel atualizar seus proximos passos.")
			sentryCaptureException(error)
			return false
		} finally {
			setChecklistActionLoading(false)
		}
	}

	async function handleDismissChecklist() {
		if (!checklistData) {
			return
		}

		await updateChecklistMetadata(
			dismissDashboardOnboardingChecklist(checklistData)
		)
	}

	async function handleChecklistNavigation(
		step: DashboardOnboardingStepKey,
		to: string
	) {
		if (!checklistData) {
			navigate(to)
			return
		}

		const updated = await updateChecklistMetadata(
			completeDashboardOnboardingStep(checklistData, step)
		)

		if (updated) {
			navigate(to)
		}
	}

	const { data: dashboardSummary } = useDashboardSummary(organizationId, 10)
	const { data: revenueChart } = useRevenueChart(organizationId, 30)
	const { data: salesRanking } = useSalesRanking(organizationId, 30, 1, 5)
	const { data: opsSummary } = useOpsSummary(organizationId)
	const isRevenueNegative =
		revenueChart?.summary.percentageChange &&
		revenueChart?.summary.percentageChange < 0
	const isRevenuePositive =
		revenueChart?.summary.percentageChange &&
		revenueChart?.summary.percentageChange > 0

	const stats = [
		{
			title: "Faturamento Hoje",
			value: formatCurrency(dashboardSummary?.stats.revenue.current || 0),
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
			{checklistData && !checklistData.dismissedAt && (
				<motion.section
					animate={{ opacity: 1, y: 0 }}
					className="relative overflow-hidden rounded-3xl border border-amber-200 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.18),transparent_35%),linear-gradient(135deg,rgba(255,251,235,1)_0%,rgba(255,255,255,1)_55%,rgba(255,237,213,0.85)_100%)] p-6 shadow-sm"
					initial={{ opacity: 0, y: 16 }}
				>
					<div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-amber-200/30 blur-3xl" />
					<div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-orange-200/20 blur-3xl" />
					<div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
						<div className="max-w-2xl space-y-3">
							<div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 font-medium text-amber-900 text-xs">
								<Sparkles className="h-3.5 w-3.5" />
								Primeiros passos do seu estabelecimento
							</div>
							<div>
								<h2 className="font-semibold text-2xl text-surface-900">
									Tudo certo, {checklistData.name} foi criado.
								</h2>
								<p className="mt-2 max-w-xl text-surface-600">
									Seu link inicial e `{checklistData.slug}.grupoboa.com.br`.
									Agora voce pode completar o restante sem pressa.
								</p>
							</div>
							<div className="flex flex-wrap items-center gap-3 text-sm">
								<div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-surface-700 shadow-sm ring-1 ring-amber-100">
									<CheckCircle2 className="h-4 w-4 text-emerald-600" />
									Estabelecimento criado com sucesso
								</div>
								<div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-surface-700 shadow-sm ring-1 ring-amber-100">
									<ClipboardList className="h-4 w-4 text-amber-700" />
									{completedSteps}/{completedSteps + onboardingSteps.length}{" "}
									passos concluidos
								</div>
							</div>
						</div>
						<button
							className="inline-flex items-center gap-2 self-start rounded-full border border-surface-200 bg-white px-3 py-2 font-medium text-sm text-surface-600 transition-colors hover:border-surface-300 hover:text-surface-900"
							disabled={checklistActionLoading}
							onClick={handleDismissChecklist}
							type="button"
						>
							<X className="h-4 w-4" />
							Fechar
						</button>
					</div>

					<div className="relative mt-6 grid gap-3 lg:grid-cols-3">
						{onboardingSteps.map((step, index) => {
							const StepIcon = step.icon

							return (
								<div
									className="group rounded-2xl border border-white bg-white/90 p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-md"
									key={step.label}
								>
									<div className="mb-3 flex items-center justify-between">
										<div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
											<StepIcon className="h-5 w-5" />
										</div>
										<span className="rounded-full bg-surface-100 px-2 py-1 font-medium text-surface-500 text-xs">
											0{index + 1}
										</span>
									</div>
									<h3 className="font-semibold text-base text-surface-900">
										{step.label}
									</h3>
									<p className="mt-1 text-sm text-surface-600">
										{step.description}
									</p>
									<button
										className="mt-4 inline-flex items-center gap-2 font-medium text-amber-800 text-sm"
										disabled={checklistActionLoading}
										onClick={() =>
											handleChecklistNavigation(step.step, step.to)
										}
										type="button"
									>
										Abrir agora
										<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
									</button>
								</div>
							)
						})}
					</div>

					<div className="relative mt-4 flex items-center gap-2 text-emerald-700 text-sm">
						<CheckCircle2 className="h-4 w-4" />
						Voce nao precisa completar tudo agora. O importante era entrar na
						plataforma.
					</div>
				</motion.section>
			)}

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

			<section className="rounded-2xl border border-surface-100 bg-white p-6">
				<div className="mb-4 flex items-center justify-between">
					<div>
						<h2 className="font-semibold text-lg text-surface-900">
							Resumo operacional
						</h2>
						<p className="text-sm text-surface-500">
							Visão inicial de inbox e DLQ da operação.
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
					<div className="rounded-xl border border-surface-100 bg-surface-50 p-4">
						<p className="text-surface-500 text-xs uppercase tracking-wide">
							Inbox recebidos
						</p>
						<p className="mt-1 font-semibold text-2xl text-surface-900">
							{opsSummary?.inbox.received ?? 0}
						</p>
					</div>
					<div className="rounded-xl border border-surface-100 bg-surface-50 p-4">
						<p className="text-surface-500 text-xs uppercase tracking-wide">
							Inbox processando
						</p>
						<p className="mt-1 font-semibold text-2xl text-surface-900">
							{opsSummary?.inbox.processing ?? 0}
						</p>
					</div>
					<div className="rounded-xl border border-surface-100 bg-surface-50 p-4">
						<p className="text-surface-500 text-xs uppercase tracking-wide">
							Inbox falhas
						</p>
						<p className="mt-1 font-semibold text-2xl text-surface-900">
							{opsSummary?.inbox.failed ?? 0}
						</p>
					</div>
					<div className="rounded-xl border border-surface-100 bg-surface-50 p-4">
						<p className="text-surface-500 text-xs uppercase tracking-wide">
							DLQ em aberto
						</p>
						<p className="mt-1 font-semibold text-2xl text-surface-900">
							{opsSummary?.dlq.open ?? 0}
						</p>
					</div>
					<div className="rounded-xl border border-surface-100 bg-surface-50 p-4">
						<p className="text-surface-500 text-xs uppercase tracking-wide">
							DLQ resolvidos
						</p>
						<p className="mt-1 font-semibold text-2xl text-surface-900">
							{opsSummary?.dlq.resolved ?? 0}
						</p>
					</div>
				</div>
			</section>

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
