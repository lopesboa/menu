import { motion } from "framer-motion"
import {
	AlertTriangle,
	ArrowUpDown,
	Edit,
	Package,
	Plus,
	Search,
	Trash2,
} from "lucide-react"
import { useState } from "react"
import { Modal } from "@/components/ui/modal"
import { formatCurrency } from "@/utils/helpers"
import { cn } from "@/utils/misc"
import { inventoryItems } from "../data/mockData"

export function InventoryPage() {
	const [searchQuery, setSearchQuery] = useState("")
	const [selectedCategory, setSelectedCategory] = useState("all")
	const [isModalOpen, setIsModalOpen] = useState(false)

	const categories = [
		"all",
		...new Set(inventoryItems.map((item) => item.category)),
	]

	const filteredItems = inventoryItems.filter((item) => {
		if (selectedCategory !== "all" && item.category !== selectedCategory) {
			return false
		}
		if (searchQuery) {
			const query = searchQuery.toLowerCase()
			return (
				item.name.toLowerCase().includes(query) ||
				item.category.toLowerCase().includes(query)
			)
		}
		return true
	})

	const lowStockItems = inventoryItems.filter(
		(item) => item.quantity <= item.minQuantity
	)

	const totalValue = inventoryItems.reduce(
		(sum, item) => sum + item.quantity * item.costPerUnit,
		0
	)

	return (
		<div className="space-y-6">
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="flex items-center justify-between"
				initial={{ opacity: 0, y: -20 }}
			>
				<div>
					<h1 className="font-bold text-2xl text-surface-900">Inventário</h1>
					<p className="mt-1 text-surface-500">
						Gerencie o estoque do restaurante
					</p>
				</div>
				<button
					className="btn-primary gap-2"
					onClick={() => setIsModalOpen(true)}
					type="button"
				>
					<Plus className="h-5 w-5" />
					Adicionar Item
				</button>
			</motion.div>

			{lowStockItems.length > 0 && (
				<motion.div
					animate={{ opacity: 1, y: 0 }}
					className="flex items-center gap-4 rounded-2xl border border-red-200 bg-red-50 p-4"
					initial={{ opacity: 0, y: 20 }}
				>
					<AlertTriangle className="h-6 w-6 shrink-0 text-red-600" />
					<div className="flex-1">
						<p className="font-medium text-red-900">
							Atenção! Itens com estoque baixo
						</p>
						<p className="text-red-700 text-sm">
							{lowStockItems.length} itens precisam ser repostos em breve
						</p>
					</div>
					<button
						className="btn-secondary border-red-200 text-red-700 hover:bg-red-100"
						type="button"
					>
						Visualizar
					</button>
				</motion.div>
			)}

			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="grid grid-cols-1 gap-4 md:grid-cols-3"
				initial={{ opacity: 0, y: 20 }}
				transition={{ delay: 0.1 }}
			>
				<div className="rounded-2xl border border-surface-100 bg-white p-6">
					<div className="flex items-center gap-3">
						<div className="rounded-xl bg-primary-50 p-3">
							<Package className="h-6 w-6 text-primary-600" />
						</div>
						<div>
							<p className="text-sm text-surface-500">Total de Itens</p>
							<p className="font-bold text-2xl text-surface-900">
								{inventoryItems.length}
							</p>
						</div>
					</div>
				</div>
				<div className="rounded-2xl border border-surface-100 bg-white p-6">
					<div className="flex items-center gap-3">
						<div className="rounded-xl bg-green-50 p-3">
							<ArrowUpDown className="h-6 w-6 text-green-600" />
						</div>
						<div>
							<p className="text-sm text-surface-500">Valor do Estoque</p>
							<p className="font-bold text-2xl text-surface-900">
								{formatCurrency(totalValue)}
							</p>
						</div>
					</div>
				</div>
				<div className="rounded-2xl border border-surface-100 bg-white p-6">
					<div className="flex items-center gap-3">
						<div className="rounded-xl bg-yellow-50 p-3">
							<AlertTriangle className="h-6 w-6 text-yellow-600" />
						</div>
						<div>
							<p className="text-sm text-surface-500">Estoque Baixo</p>
							<p className="font-bold text-2xl text-surface-900">
								{lowStockItems.length}
							</p>
						</div>
					</div>
				</div>
			</motion.div>

			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="overflow-hidden rounded-2xl border border-surface-100 bg-white"
				initial={{ opacity: 0, y: 20 }}
				transition={{ delay: 0.2 }}
			>
				<div className="flex items-center gap-4 border-surface-100 border-b p-4">
					<div className="relative max-w-md flex-1">
						<Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-surface-400" />
						<input
							className="input-field pl-10"
							onChange={(e) => setSearchQuery(e.target.value)}
							placeholder="Buscar itens..."
							type="text"
							value={searchQuery}
						/>
					</div>
					<div className="flex gap-2">
						{categories.map((category) => (
							<button
								className={cn(
									"rounded-lg px-4 py-2 font-medium text-sm transition-colors",
									selectedCategory === category
										? "bg-primary-50 text-primary-700"
										: "text-surface-600 hover:bg-surface-50"
								)}
								key={category}
								onClick={() => setSelectedCategory(category)}
								type="button"
							>
								{category === "all" ? "Todos" : category}
							</button>
						))}
					</div>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-surface-100 border-b">
								<th className="px-6 py-4 text-left font-medium text-sm text-surface-500">
									Item
								</th>
								<th className="px-6 py-4 text-left font-medium text-sm text-surface-500">
									Categoria
								</th>
								<th className="px-6 py-4 text-left font-medium text-sm text-surface-500">
									Quantidade
								</th>
								<th className="px-6 py-4 text-left font-medium text-sm text-surface-500">
									Mínimo
								</th>
								<th className="px-6 py-4 text-left font-medium text-sm text-surface-500">
									Custo/Unidade
								</th>
								<th className="px-6 py-4 text-left font-medium text-sm text-surface-500">
									Status
								</th>
								<th className="px-6 py-4 text-right font-medium text-sm text-surface-500">
									Ações
								</th>
							</tr>
						</thead>
						<tbody>
							{filteredItems.map((item, index) => (
								<motion.tr
									animate={{ opacity: 1, y: 0 }}
									className="border-surface-50 border-b hover:bg-surface-50"
									initial={{ opacity: 0, y: 10 }}
									key={item.id}
									transition={{ delay: index * 0.03 }}
								>
									<td className="px-6 py-4">
										<p className="font-medium text-surface-900">{item.name}</p>
									</td>
									<td className="px-6 py-4">
										<span className="rounded-full bg-surface-100 px-2 py-1 text-surface-600 text-xs">
											{item.category}
										</span>
									</td>
									<td className="px-6 py-4">
										<span
											className={cn(
												"font-medium",
												item.quantity <= item.minQuantity
													? "text-red-600"
													: "text-surface-900"
											)}
										>
											{item.quantity} {item.unit}
										</span>
									</td>
									<td className="px-6 py-4 text-surface-500">
										{item.minQuantity} {item.unit}
									</td>
									<td className="px-6 py-4 text-surface-900">
										{formatCurrency(item.costPerUnit)}
									</td>
									<td className="px-6 py-4">
										{(() => {
											if (item.quantity <= item.minQuantity) {
												return (
													<span className="rounded-full bg-red-100 px-2 py-1 font-medium text-red-700 text-xs">
														Crítico
													</span>
												)
											}
											if (item.quantity <= item.minQuantity * 1.5) {
												return (
													<span className="rounded-full bg-yellow-100 px-2 py-1 font-medium text-xs text-yellow-700">
														Baixo
													</span>
												)
											}
											return (
												<span className="rounded-full bg-green-100 px-2 py-1 font-medium text-green-700 text-xs">
													Normal
												</span>
											)
										})()}
									</td>
									<td className="px-6 py-4">
										<div className="flex items-center justify-end gap-2">
											<button
												className="rounded-lg p-2 transition-colors hover:bg-surface-100"
												type="button"
											>
												<Edit className="h-4 w-4 text-surface-600" />
											</button>
											<button
												className="rounded-lg p-2 transition-colors hover:bg-red-50"
												type="button"
											>
												<Trash2 className="h-4 w-4 text-red-600" />
											</button>
										</div>
									</td>
								</motion.tr>
							))}
						</tbody>
					</table>
				</div>
			</motion.div>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				size="md"
				title="Adicionar Item ao Inventário"
			>
				<form className="space-y-4">
					<div>
						<label
							className="mb-1 block font-medium text-sm text-surface-700"
							htmlFor="item-name"
						>
							Nome do Item
						</label>
						<input
							className="input-field"
							id="item-name"
							placeholder="Ex: Filé Mignon"
							type="text"
						/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label
								className="mb-1 block font-medium text-sm text-surface-700"
								htmlFor="item-category"
							>
								Categoria
							</label>
							<select className="input-field" id="item-category">
								{categories
									.filter((c) => c !== "all")
									.map((cat) => (
										<option key={cat} value={cat}>
											{cat}
										</option>
									))}
							</select>
						</div>
						<div>
							<label
								className="mb-1 block font-medium text-sm text-surface-700"
								htmlFor="item-unit"
							>
								Unidade
							</label>
							<select className="input-field" id="item-unit">
								<option value="kg">Quilograma (kg)</option>
								<option value="litros">Litros</option>
								<option value="unidades">Unidades</option>
								<option value="garrafas">Garrafas</option>
								<option value="latas">Latas</option>
							</select>
						</div>
					</div>
					<div className="grid grid-cols-3 gap-4">
						<div>
							<label
								className="mb-1 block font-medium text-sm text-surface-700"
								htmlFor="item-quantity"
							>
								Quantidade
							</label>
							<input
								className="input-field"
								id="item-quantity"
								placeholder="0"
								type="number"
							/>
						</div>
						<div>
							<label
								className="mb-1 block font-medium text-sm text-surface-700"
								htmlFor="item-min"
							>
								Mínimo
							</label>
							<input
								className="input-field"
								id="item-min"
								placeholder="0"
								type="number"
							/>
						</div>
						<div>
							<label
								className="mb-1 block font-medium text-sm text-surface-700"
								htmlFor="item-cost"
							>
								Custo/Unidade
							</label>
							<input
								className="input-field"
								id="item-cost"
								placeholder="0.00"
								step="0.01"
								type="number"
							/>
						</div>
					</div>
					<div className="flex justify-end gap-3 pt-4">
						<button
							className="btn-secondary"
							onClick={() => setIsModalOpen(false)}
							type="button"
						>
							Cancelar
						</button>
						<button className="btn-primary" type="submit">
							Adicionar
						</button>
					</div>
				</form>
			</Modal>
		</div>
	)
}
