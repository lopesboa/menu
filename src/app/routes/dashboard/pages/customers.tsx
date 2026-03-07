import { motion } from "framer-motion"
import { Award, Mail, Phone, Search, ShoppingBag, Star } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useCustomers } from "@/domains/customers/hooks/use-customers"
import { useOrganizationCheck } from "@/hooks/use-organization-check"
import { sentryCaptureException } from "@/lib/sentry"
import { formatCurrency, formatRelativeTime } from "@/utils/helpers"

const PAGE_SIZE = 20

//TODO: O Scroll de customer precisa manter fixo todo resto, fazer o scroll apenas da parte
//de cliente sem mover top clientes e a busca.
export function CustomersPage() {
	const [searchQuery, setSearchQuery] = useState("")
	const [offset, setOffset] = useState(0)
	const { organizationId } = useOrganizationCheck()
	const {
		data,
		error: customersError,
		isError: isCustomersError,
		isLoading: isCustomersLoading,
		refetch: refetchCustomers,
		isFetching: isCustomersFetching,
	} = useCustomers({
		organizationId,
		limit: PAGE_SIZE,
		offset,
		search: searchQuery.trim() || undefined,
	})

	const customers = data?.customers ?? []
	const pagination = data?.pagination
	const totalCustomers = pagination?.total ?? customers.length
	const currentPage = Math.floor((pagination?.offset ?? offset) / PAGE_SIZE) + 1
	const totalPages = Math.max(1, Math.ceil(totalCustomers / PAGE_SIZE))

	useEffect(() => {
		if (isCustomersError && customersError) {
			toast.error("Falha ao carregar os clientes")
			sentryCaptureException(customersError, {
				context: "customers_list_fetch",
				organizationId,
			})
		}
	}, [isCustomersError, customersError, organizationId])

	//TODO: Seria melhor ter esses dados do retorno do backend
	const topCustomers = [...customers]
		.sort((a, b) => b.totalSpent - a.totalSpent)
		.slice(0, 5)

	//TODO: Os dados de "Faturamento Total", "Pontos Distribuídos" e "Total de Visitas" precisam vir do backend.
	return (
		<div className="space-y-6">
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="flex items-center justify-between"
				initial={{ opacity: 0, y: -20 }}
			>
				<div>
					<h1 className="font-bold text-2xl text-surface-900">Clientes</h1>
					<p className="mt-1 text-surface-500">
						Gerencie seus clientes e programas de fidelidade
					</p>
				</div>
			</motion.div>

			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="grid grid-cols-1 gap-4 md:grid-cols-4"
				initial={{ opacity: 0, y: 20 }}
				transition={{ delay: 0.1 }}
			>
				<div className="metric-card">
					<div className="flex items-center gap-3">
						<div className="rounded-xl bg-blue-50 p-3">
							<ShoppingBag className="h-6 w-6 text-blue-600" />
						</div>
						<div>
							<p className="text-sm text-surface-500">Total de Clientes</p>
							<p className="font-bold text-2xl text-surface-900">
								{totalCustomers}
							</p>
						</div>
					</div>
				</div>
				<div className="metric-card">
					<div className="flex items-center gap-3">
						<div className="rounded-xl bg-green-50 p-3">
							<Award className="h-6 w-6 text-green-600" />
						</div>
						<div>
							<p className="text-sm text-surface-500">Total de Visitas</p>
							<p className="font-bold text-2xl text-surface-900">
								{customers.reduce((sum, c) => sum + c.totalOrders, 0)}
							</p>
						</div>
					</div>
				</div>
				<div className="metric-card">
					<div className="flex items-center gap-3">
						<div className="rounded-xl bg-purple-50 p-3">
							<Star className="h-6 w-6 text-purple-600" />
						</div>
						<div>
							<p className="text-sm text-surface-500">Pontos Distribuídos</p>
							<p className="font-bold text-2xl text-surface-900">
								{customers
									.reduce((sum, c) => sum + c.loyaltyPoints, 0)
									.toLocaleString()}
							</p>
						</div>
					</div>
				</div>
				<div className="metric-card">
					<div className="flex items-center gap-3">
						<div className="rounded-xl bg-orange-50 p-3">
							<Mail className="h-6 w-6 text-orange-600" />
						</div>
						<div>
							<p className="text-sm text-surface-500">Faturamento Total</p>
							<p className="font-bold text-2xl text-surface-900">
								{formatCurrency(
									customers.reduce((sum, c) => sum + c.totalSpent, 0)
								)}
							</p>
						</div>
					</div>
				</div>
			</motion.div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="lg:col-span-2"
					initial={{ opacity: 0, y: 20 }}
					transition={{ delay: 0.2 }}
				>
					<div className="overflow-hidden rounded-2xl border border-surface-100 bg-white">
						<div className="border-surface-100 border-b p-4">
							<div className="relative max-w-md">
								<Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-surface-400" />
								<input
									className="input-field pl-10"
									onChange={(e) => setSearchQuery(e.target.value)}
									placeholder="Buscar clientes..."
									type="text"
									value={searchQuery}
								/>
							</div>
							{isCustomersFetching && !isCustomersLoading && (
								<p className="mt-2 text-surface-500 text-xs">
									Atualizando clientes...
								</p>
							)}
						</div>
						<div className="divide-y divide-surface-100">
							{isCustomersLoading && (
								<div className="p-6 text-center text-surface-600">
									Carregando clientes...
								</div>
							)}
							{isCustomersError && !isCustomersLoading && (
								<div className="flex flex-col items-center gap-3 p-6 text-center">
									<p className="font-medium text-red-700">
										Não foi possível carregar os clientes.
									</p>
									<button
										className="btn-secondary"
										onClick={() => refetchCustomers()}
										type="button"
									>
										Tentar novamente
									</button>
								</div>
							)}
							{!(organizationId || isCustomersLoading || isCustomersError) && (
								<div className="p-6 text-center text-surface-600">
									Nenhuma organização ativa encontrada.
								</div>
							)}
							{organizationId &&
								!(isCustomersLoading || isCustomersError) &&
								customers.length === 0 && (
									<div className="p-6 text-center text-surface-600">
										{searchQuery
											? "Nenhum cliente encontrado para a busca."
											: "Nenhum cliente encontrado para esta organização."}
									</div>
								)}
							{!(isCustomersLoading || isCustomersError) &&
								customers.map((customer, index) => (
									<motion.div
										animate={{ opacity: 1, x: 0 }}
										className="cursor-pointer p-4 transition-colors hover:bg-surface-50"
										initial={{ opacity: 0, x: -20 }}
										key={customer.id}
										transition={{ delay: index * 0.03 }}
									>
										<div className="flex items-center gap-4">
											<div className="h-12 w-12 overflow-hidden rounded-full bg-surface-100">
												{customer.avatar ? (
													<img
														alt={customer.name}
														className="h-full w-full object-cover"
														height={48}
														src={customer.avatar}
														width={48}
													/>
												) : (
													<div className="flex h-full w-full items-center justify-center font-semibold text-surface-600">
														{customer.name.charAt(0)}
													</div>
												)}
											</div>
											<div className="flex-1">
												<div className="flex items-center gap-2">
													<h3 className="font-semibold text-surface-900">
														{customer.name}
													</h3>
													{customer.loyaltyPoints > 400 && (
														<span className="rounded-full bg-yellow-100 px-2 py-0.5 font-medium text-xs text-yellow-700">
															VIP
														</span>
													)}
												</div>
												<div className="mt-1 flex items-center gap-4 text-sm text-surface-500">
													<span className="flex items-center gap-1">
														<Mail className="h-3 w-3" />
														{customer.email || "Sem e-mail"}
													</span>
													<span className="flex items-center gap-1">
														<Phone className="h-3 w-3" />
														{customer.phone || "Sem telefone"}
													</span>
												</div>
											</div>
											<div className="text-right">
												<p className="font-bold text-surface-900">
													{formatCurrency(customer.totalSpent)}
												</p>
												<p className="text-sm text-surface-500">
													{customer.totalOrders} pedidos •{" "}
													{formatRelativeTime(customer.lastVisit)}
												</p>
											</div>
										</div>
									</motion.div>
								))}
							{organizationId && !isCustomersLoading && !isCustomersError && (
								<div className="flex items-center justify-between border-surface-100 border-t px-4 py-3 text-sm">
									<p className="text-surface-500">
										Página {currentPage} de {totalPages}
									</p>
									<div className="flex items-center gap-2">
										<button
											className="btn-secondary"
											disabled={offset <= 0}
											onClick={() =>
												setOffset((currentOffset) =>
													Math.max(0, currentOffset - PAGE_SIZE)
												)
											}
											type="button"
										>
											Anterior
										</button>
										<button
											className="btn-secondary"
											disabled={offset + PAGE_SIZE >= totalCustomers}
											onClick={() =>
												setOffset((currentOffset) => currentOffset + PAGE_SIZE)
											}
											type="button"
										>
											Próxima
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</motion.div>

				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="rounded-2xl border border-surface-100 bg-white p-6"
					initial={{ opacity: 0, y: 20 }}
					transition={{ delay: 0.3 }}
				>
					<h2 className="mb-4 font-semibold text-lg text-surface-900">
						Top Clientes
					</h2>
					<div className="space-y-4">
						{topCustomers.map((customer, index) => (
							<div className="flex items-center gap-4" key={customer.id}>
								<div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 font-bold text-primary-700 text-sm">
									{index + 1}
								</div>
								<div className="min-w-0 flex-1">
									<p className="truncate font-medium text-surface-900">
										{customer.name}
									</p>
									<p className="text-sm text-surface-500">
										{customer.totalOrders} pedidos
									</p>
								</div>
								<div className="text-right">
									<p className="font-semibold text-surface-900">
										{formatCurrency(customer.totalSpent)}
									</p>
								</div>
							</div>
						))}
					</div>
				</motion.div>
			</div>
		</div>
	)
}
