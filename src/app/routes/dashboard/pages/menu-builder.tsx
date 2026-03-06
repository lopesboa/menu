import { motion } from "framer-motion"
import { Edit, Grid, List, Plus, Search, Trash2 } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { toast } from "sonner"
import { menuItems } from "@/app/routes/dashboard/data/mock-data"
import { Modal } from "@/components/ui/modal"
import { useCategories } from "@/domains/categories/hooks/use-categories"
import { useOrganizationCheck } from "@/hooks/use-organization-check"
import { sentryCaptureException } from "@/lib/sentry"
import { formatCurrency } from "@/utils/helpers"
import { cn } from "@/utils/misc"

export function MenuBuilderPage() {
	const [searchQuery, setSearchQuery] = useState("")
	const [selectedCategory, setSelectedCategory] = useState("all")
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { organizationId } = useOrganizationCheck()
	const {
		data: categoriesResponse = [],
		error: categoriesError,
		isError: isCategoriesError,
		isLoading: isCategoriesLoading,
	} = useCategories(organizationId)
	const hasNotifiedCategoriesError = useRef(false)

	const categories = useMemo(() => {
		const categoryNames = categoriesResponse
			.filter((category) => category.active)
			.sort((left, right) => (left.order ?? 0) - (right.order ?? 0))
			.map((category) => category.name.trim())
			.filter(Boolean)

		return ["all", ...Array.from(new Set(categoryNames))]
	}, [categoriesResponse])

	const selectableCategories = useMemo(
		() => categories.filter((category) => category !== "all"),
		[categories]
	)

	useEffect(() => {
		if (!categories.includes(selectedCategory)) {
			setSelectedCategory("all")
		}
	}, [categories, selectedCategory])

	useEffect(() => {
		if (
			!(isCategoriesError && categoriesError) ||
			hasNotifiedCategoriesError.current
		) {
			if (!isCategoriesError) {
				hasNotifiedCategoriesError.current = false
			}
			return
		}

		hasNotifiedCategoriesError.current = true
		toast.error("Falha ao carregar as categorias")
		sentryCaptureException(categoriesError, {
			context: "menu_builder_categories_fetch",
			organizationId,
		})
	}, [isCategoriesError, categoriesError, organizationId])

	const filteredItems = menuItems.filter((item) => {
		if (selectedCategory !== "all" && item.category !== selectedCategory) {
			return false
		}
		if (searchQuery) {
			const query = searchQuery.toLowerCase()
			return (
				item.name.toLowerCase().includes(query) ||
				item.description.toLowerCase().includes(query)
			)
		}
		return true
	})

	return (
		<div className="space-y-6">
			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="flex items-center justify-between"
				initial={{ opacity: 0, y: -20 }}
			>
				<div>
					<h1 className="font-bold text-2xl text-surface-900">Cardápio</h1>
					<p className="mt-1 text-surface-500">
						Gerencie os produtos do seu cardápio
					</p>
				</div>
				<button
					className="btn-primary gap-2"
					onClick={() => setIsModalOpen(true)}
					type="button"
				>
					<Plus className="h-5 w-5" />
					Novo Produto
				</button>
			</motion.div>

			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className="flex items-center justify-between rounded-2xl border border-surface-100 bg-white p-4"
				initial={{ opacity: 0, y: 20 }}
				transition={{ delay: 0.1 }}
			>
				<div className="relative max-w-md flex-1">
					<Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-surface-400" />
					<input
						className="input-field pl-10"
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Buscar produtos..."
						type="text"
						value={searchQuery}
					/>
				</div>
				<div className="flex items-center gap-4">
					<div className="flex gap-2">
						{categories.slice(0, 5).map((cat) => (
							<button
								className={cn(
									"rounded-lg px-3 py-1.5 font-medium text-sm transition-colors",
									selectedCategory === cat
										? "bg-primary-50 text-primary-700"
										: "text-surface-600 hover:bg-surface-50"
								)}
								key={cat}
								onClick={() => setSelectedCategory(cat)}
								type="button"
							>
								{cat === "all" ? "Todos" : cat}
							</button>
						))}
					</div>
					<div className="flex rounded-lg border border-surface-200">
						<button
							className={cn(
								"p-2 transition-colors",
								viewMode === "grid"
									? "bg-surface-100 text-surface-900"
									: "text-surface-400"
							)}
							onClick={() => setViewMode("grid")}
							type="button"
						>
							<Grid className="h-5 w-5" />
						</button>
						<button
							className={cn(
								"p-2 transition-colors",
								viewMode === "list"
									? "bg-surface-100 text-surface-900"
									: "text-surface-400"
							)}
							onClick={() => setViewMode("list")}
							type="button"
						>
							<List className="h-5 w-5" />
						</button>
					</div>
				</div>
			</motion.div>

			<motion.div
				animate={{ opacity: 1, y: 0 }}
				className={cn(
					viewMode === "grid"
						? "grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
						: "space-y-3"
				)}
				initial={{ opacity: 0, y: 20 }}
				transition={{ delay: 0.2 }}
			>
				{filteredItems.map((item, index) => (
					<motion.div
						animate={{ opacity: 1, scale: 1 }}
						className={cn(
							"overflow-hidden rounded-2xl border border-surface-100 bg-white transition-shadow hover:shadow-lg",
							viewMode === "list" && "flex items-center"
						)}
						initial={{ opacity: 0, scale: 0.9 }}
						key={item.id}
						transition={{ delay: index * 0.03 }}
					>
						{viewMode === "grid" ? (
							<>
								<div className="h-40 overflow-hidden bg-surface-100">
									<img
										alt={item.name}
										className="h-full w-full object-cover"
										height={160}
										src={item.image}
										width={160}
									/>
								</div>
								<div className="p-4">
									<div className="flex items-start justify-between">
										<div>
											<h3 className="font-semibold text-surface-900">
												{item.name}
											</h3>
											<p className="mt-1 text-surface-500 text-xs">
												{item.category}
											</p>
										</div>
										<span className="font-bold text-primary-600">
											{formatCurrency(+item.price)}
										</span>
									</div>
									<p className="mt-2 line-clamp-2 text-sm text-surface-600">
										{item.description}
									</p>
									<div className="mt-4 flex items-center justify-between">
										<span
											className={cn(
												"rounded-full px-2 py-1 font-medium text-xs",
												item.available
													? "bg-green-100 text-green-700"
													: "bg-red-100 text-red-700"
											)}
										>
											{item.available ? "Disponível" : "Indisponível"}
										</span>
										<div className="flex gap-1">
											<button
												className="rounded-lg p-1.5 hover:bg-surface-100"
												type="button"
											>
												<Edit className="h-4 w-4 text-surface-600" />
											</button>
											<button
												className="rounded-lg p-1.5 hover:bg-red-50"
												type="button"
											>
												<Trash2 className="h-4 w-4 text-red-600" />
											</button>
										</div>
									</div>
								</div>
							</>
						) : (
							<>
								<div className="h-20 w-20 shrink-0 bg-surface-100">
									<img
										alt={item.name}
										className="h-full w-full object-cover"
										height={80}
										src={item.image}
										width={80}
									/>
								</div>
								<div className="flex flex-1 items-center justify-between p-4">
									<div>
										<h3 className="font-semibold text-surface-900">
											{item.name}
										</h3>
										<p className="text-sm text-surface-500">{item.category}</p>
									</div>
									<span className="font-bold text-primary-600">
										{formatCurrency(+item.price)}
									</span>
									<div className="flex gap-1">
										<button
											className="rounded-lg p-2 hover:bg-surface-100"
											type="button"
										>
											<Edit className="h-4 w-4 text-surface-600" />
										</button>
										<button
											className="rounded-lg p-2 hover:bg-red-50"
											type="button"
										>
											<Trash2 className="h-4 w-4 text-red-600" />
										</button>
									</div>
								</div>
							</>
						)}
					</motion.div>
				))}
			</motion.div>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				size="lg"
				title="Novo Produto"
			>
				<form className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label
								className="mb-1 block font-medium text-sm text-surface-700"
								htmlFor="product-name"
							>
								Nome
							</label>
							<input
								className="input-field"
								id="product-name"
								placeholder="Nome do produto"
								type="text"
							/>
						</div>
						<div>
							<label
								className="mb-1 block font-medium text-sm text-surface-700"
								htmlFor="product-price"
							>
								Preço
							</label>
							<input
								className="input-field"
								id="product-price"
								placeholder="0.00"
								step="0.01"
								type="number"
							/>
						</div>
					</div>
					<div>
						<label
							className="mb-1 block font-medium text-sm text-surface-700"
							htmlFor="product-description"
						>
							Descrição
						</label>
						<textarea
							className="input-field"
							id="product-description"
							placeholder="Descrição do produto"
							rows={3}
						/>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label
								className="mb-1 block font-medium text-sm text-surface-700"
								htmlFor="product-category"
							>
								Categoria
							</label>
							<select
								className="input-field"
								disabled={
									isCategoriesLoading || selectableCategories.length === 0
								}
								id="product-category"
							>
								{isCategoriesLoading && (
									<option value="">Carregando categorias...</option>
								)}
								{!isCategoriesLoading && selectableCategories.length === 0 && (
									<option value="">Nenhuma categoria disponível</option>
								)}
								{selectableCategories.map((cat) => (
									<option key={cat} value={cat}>
										{cat}
									</option>
								))}
							</select>
						</div>
						<div>
							<label
								className="mb-1 block font-medium text-sm text-surface-700"
								htmlFor="product-prep-time"
							>
								Tempo de Preparo
							</label>
							<input
								className="input-field"
								id="product-prep-time"
								placeholder="15"
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
