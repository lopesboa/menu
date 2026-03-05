import { motion } from "framer-motion"
import {
	ChevronRight,
	Filter,
	LayoutGrid,
	Plus,
	ShoppingCart,
} from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "sonner"
import { useCartStore } from "@/domains/pos/store/cart-store"
import { useOrganizationCheck } from "@/hooks/use-organization-check"
import { useTables } from "@/hooks/use-tables"
import { sentryCaptureException } from "@/lib/sentry"
import type { Table } from "@/types/dashboard"
import { cn } from "@/utils/misc"
import { dashboardRoutePaths } from "../manifest"

export default function TablesPage() {
	const { setTableId, setType, clearCart } = useCartStore()
	const { organizationId } = useOrganizationCheck()
	const {
		data: tables = [],
		error: tablesError,
		isError: isTablesError,
		isLoading: isTablesLoading,
		refetch: refetchTables,
	} = useTables(organizationId)
	const hasNotifiedTablesError = useRef(false)
	const navigate = useNavigate()

	const [selectedSection, setSelectedSection] = useState("Todas")
	const [viewMode, setViewMode] = useState<"grid" | "floor">("floor")

	const sections = useMemo(() => {
		const sectionList = Array.from(
			new Set(tables.map((table) => table.section))
		).sort((left, right) => left.localeCompare(right, "pt-BR"))
		return ["Todas", ...sectionList]
	}, [tables])

	useEffect(() => {
		if (!sections.includes(selectedSection)) {
			setSelectedSection("Todas")
		}
	}, [sections, selectedSection])

	const handleTableClick = (table: Table) => {
		if (table.status === "available") {
			clearCart()
			setTableId(table.id)
			setType("dine_in")
			navigate(dashboardRoutePaths.pos)
		} else if (table.status === "occupied" && table.currentOrderId) {
			navigate(`${dashboardRoutePaths.orders}?id=${table.currentOrderId}`)
		}
	}

	const filteredTables = useMemo(() => {
		return selectedSection === "Todas"
			? tables
			: tables.filter((table) => table.section === selectedSection)
	}, [selectedSection, tables])

	const stats = useMemo(() => {
		return {
			available: tables.filter((table) => table.status === "available").length,
			occupied: tables.filter((table) => table.status === "occupied").length,
			reserved: tables.filter((table) => table.status === "reserved").length,
			cleaning: tables.filter((table) => table.status === "cleaning").length,
		}
	}, [tables])

	useEffect(() => {
		if (!(isTablesError && tablesError) || hasNotifiedTablesError.current) {
			if (!isTablesError) {
				hasNotifiedTablesError.current = false
			}
			return
		}

		hasNotifiedTablesError.current = true
		toast.error("Falha ao carregar as mesas")
		sentryCaptureException(tablesError, {
			context: "tables_list_fetch",
			organizationId,
		})
	}, [isTablesError, tablesError, organizationId])

	return (
		<div className="space-y-6">
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
				initial={{ opacity: 0, y: -20 }}
			>
				<div>
					<h1 className="font-bold text-2xl text-surface-900">Mesas</h1>
					<p className="mt-1 text-surface-500">
						Gerencie as mesas do restaurante
					</p>
				</div>
				<div className="flex items-center gap-2">
					<button className="btn-secondary gap-2" type="button">
						<Filter className="h-4 w-4" />
						Filtros
					</button>
					<button className="btn-primary gap-2" type="button">
						<Plus className="h-4 w-4" />
						Nova Mesa
					</button>
				</div>
			</motion.div>

			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="grid grid-cols-2 gap-4 sm:grid-cols-4"
				initial={{ opacity: 0, y: 20 }}
				transition={{ delay: 0.1 }}
			>
				{[
					{
						label: "Disponíveis",
						value: stats.available,
						color: "bg-green-50 border-green-200",
						icon: "🟢",
					},
					{
						label: "Ocupadas",
						value: stats.occupied,
						color: "bg-red-50 border-red-200",
						icon: "🔴",
					},
					{
						label: "Reservadas",
						value: stats.reserved,
						color: "bg-blue-50 border-blue-200",
						icon: "🔵",
					},
					{
						label: "Limpeza",
						value: stats.cleaning,
						color: "bg-yellow-50 border-yellow-200",
						icon: "🟡",
					},
				].map((stat) => (
					<div
						className={cn("rounded-xl border-2 p-4", stat.color)}
						key={stat.label}
					>
						<p className="font-bold text-2xl text-surface-900">{stat.value}</p>
						<p className="text-sm text-surface-600">{stat.label}</p>
					</div>
				))}
			</motion.div>

			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="overflow-hidden rounded-2xl border border-surface-100 bg-white"
				initial={{ opacity: 0, y: 20 }}
				transition={{ delay: 0.2 }}
			>
				<div className="flex flex-col gap-4 border-surface-100 border-b p-4 sm:flex-row sm:items-center">
					<div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
						{sections.map((section) => (
							<button
								className={cn(
									"whitespace-nowrap rounded-lg px-4 py-2 font-medium text-sm transition-colors",
									selectedSection === section
										? "bg-primary-50 text-primary-700"
										: "text-surface-600 hover:bg-surface-50"
								)}
								key={section}
								onClick={() => setSelectedSection(section)}
								type="button"
							>
								{section}
							</button>
						))}
					</div>
					<div className="ml-auto flex items-center gap-2">
						<button
							className={cn(
								"rounded-lg p-2 transition-colors",
								viewMode === "floor"
									? "bg-primary-100 text-primary-700"
									: "text-surface-400"
							)}
							onClick={() => setViewMode("floor")}
							type="button"
						>
							<LayoutGrid className="h-5 w-5" />
						</button>
						<button
							className={cn(
								"rounded-lg p-2 transition-colors",
								viewMode === "grid"
									? "bg-primary-100 text-primary-700"
									: "text-surface-400"
							)}
							onClick={() => setViewMode("grid")}
							type="button"
						>
							<ChevronRight className="h-5 w-5 rotate-90" />
						</button>
					</div>
				</div>

				{isTablesLoading && (
					<div className="p-6 text-center text-surface-600">
						Carregando mesas...
					</div>
				)}
				{isTablesError && !isTablesLoading && (
					<div className="flex flex-col items-center gap-3 p-6 text-center">
						<p className="font-medium text-red-700">
							Não foi possível carregar as mesas.
						</p>
						<button
							className="btn-secondary"
							onClick={() => refetchTables()}
							type="button"
						>
							Tentar novamente
						</button>
					</div>
				)}
				{!(isTablesLoading || isTablesError) && filteredTables.length === 0 && (
					<div className="p-6 text-center text-surface-600">
						Nenhuma mesa encontrada para esta seção.
					</div>
				)}
				{!(isTablesLoading || isTablesError) &&
					filteredTables.length > 0 &&
					(viewMode === "floor" ? (
						<div className="p-6">
							<div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
								{filteredTables.map((table, index) => (
									<motion.button
										animate={{ opacity: 1, scale: 1 }}
										className={cn(
											"relative rounded-2xl border-2 p-4 transition-all duration-200",
											"hover:-translate-y-1 hover:shadow-lg",
											table.status === "available" &&
												"border-green-200 bg-green-50 hover:border-green-300",
											table.status === "occupied" &&
												"border-red-200 bg-red-50 hover:border-red-300",
											table.status === "reserved" &&
												"border-blue-200 bg-blue-50 hover:border-blue-300",
											table.status === "cleaning" &&
												"border-yellow-200 bg-yellow-50 hover:border-yellow-300"
										)}
										initial={{ opacity: 0, scale: 0.8 }}
										key={table.id}
										onClick={() => handleTableClick(table)}
										transition={{ delay: index * 0.02 }}
									>
										<div className="text-center">
											<div
												className={cn(
													"mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl",
													"font-bold text-lg",
													table.status === "available" &&
														"bg-green-100 text-green-700",
													table.status === "occupied" &&
														"bg-red-100 text-red-700",
													table.status === "reserved" &&
														"bg-blue-100 text-blue-700",
													table.status === "cleaning" &&
														"bg-yellow-100 text-yellow-700"
												)}
											>
												{table.number}
											</div>
											<p className="text-surface-500 text-xs">
												{table.capacity} lugares
											</p>
											<p className="mt-1 font-medium text-xs">
												{table.status === "available" && "Livre"}
												{table.status === "occupied" && "Ocupada"}
												{table.status === "reserved" && "Reservada"}
												{table.status === "cleaning" && "Limpeza"}
											</p>
										</div>
										{table.status === "occupied" && (
											<div className="absolute top-2 right-2 h-3 w-3 animate-pulse rounded-full bg-red-500" />
										)}
									</motion.button>
								))}
							</div>
						</div>
					) : (
						<div className="divide-y divide-surface-100">
							{filteredTables.map((table, index) => (
								<motion.div
									animate={{ opacity: 1, x: 0 }}
									className="flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-surface-50"
									initial={{ opacity: 0, x: -20 }}
									key={table.id}
									onClick={() => handleTableClick(table)}
									transition={{ delay: index * 0.03 }}
								>
									<div className="flex items-center gap-4">
										<div
											className={cn(
												"flex h-12 w-12 items-center justify-center rounded-xl font-bold text-lg",
												table.status === "available" &&
													"bg-green-100 text-green-700",
												table.status === "occupied" &&
													"bg-red-100 text-red-700",
												table.status === "reserved" &&
													"bg-blue-100 text-blue-700",
												table.status === "cleaning" &&
													"bg-yellow-100 text-yellow-700"
											)}
										>
											{table.number}
										</div>
										<div>
											<p className="font-medium text-surface-900">
												Mesa {table.number}
											</p>
											<p className="text-sm text-surface-500">
												{table.section} • {table.capacity} lugares
											</p>
										</div>
									</div>
									<div className="flex items-center gap-4">
										<span
											className={cn(
												"rounded-full px-3 py-1 font-medium text-xs",
												table.status === "available" &&
													"bg-green-100 text-green-700",
												table.status === "occupied" &&
													"bg-red-100 text-red-700",
												table.status === "reserved" &&
													"bg-blue-100 text-blue-700",
												table.status === "cleaning" &&
													"bg-yellow-100 text-yellow-700"
											)}
										>
											{table.status === "available" && "Livre"}
											{table.status === "occupied" && "Ocupada"}
											{table.status === "reserved" && "Reservada"}
											{table.status === "cleaning" && "Limpeza"}
										</span>
										{table.status === "occupied" && (
											<button
												className="rounded-lg p-2 hover:bg-surface-100"
												onClick={(e) => {
													e.stopPropagation()
													handleTableClick(table)
												}}
												type="button"
											>
												<ShoppingCart className="h-5 w-5 text-surface-600" />
											</button>
										)}
										<ChevronRight className="h-5 w-5 text-surface-400" />
									</div>
								</motion.div>
							))}
						</div>
					))}
			</motion.div>

			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="rounded-2xl border border-surface-100 bg-white p-6"
				initial={{ opacity: 0, y: 20 }}
				transition={{ delay: 0.3 }}
			>
				<h2 className="mb-4 font-semibold text-lg text-surface-900">
					Resumo por Seção
				</h2>
				<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
					{!(isTablesLoading || isTablesError) &&
						sections
							.filter((section) => section !== "Todas")
							.map((section) => {
								const sectionTables = tables.filter(
									(table) => table.section === section
								)
								const occupied = sectionTables.filter(
									(table) => table.status === "occupied"
								).length
								return (
									<div
										className="rounded-xl bg-surface-50 p-4 text-center"
										key={section}
									>
										<p className="font-bold text-lg text-surface-900">
											{sectionTables.length}
										</p>
										<p className="truncate text-surface-500 text-xs">
											{section}
										</p>
										<p className="mt-1 text-primary-600 text-xs">
											{occupied} ocupadas
										</p>
									</div>
								)
							})}
				</div>
			</motion.div>
		</div>
	)
}
