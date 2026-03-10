import { motion } from "framer-motion"
import {
	Check,
	Edit,
	Grid,
	List,
	Pencil,
	Plus,
	Search,
	Settings,
	Trash2,
	X,
} from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { toast } from "sonner"
import { Modal } from "@/components/ui/modal"
import {
	useCategories,
	useCreateCategory,
	useDeleteCategory,
	useUpdateCategory,
} from "@/domains/categories/hooks/use-categories"
import {
	useCreateProduct,
	useDeleteProduct,
	useProducts,
	useUpdateProduct,
} from "@/domains/menu/hooks/use-products"
import type { MenuItem } from "@/domains/menu/types/menu.types"
import { useOrganizationCheck } from "@/hooks/use-organization-check"
import { sentryCaptureException } from "@/lib/sentry"
import { formatCurrency } from "@/utils/helpers"
import { cn } from "@/utils/misc"

const ALL_CATEGORY_ID = "all"

interface ProductFormState {
	name: string
	price: string
	description: string
	categoryId: string
	imageUrl: string
	preparationTime: string
	available: boolean
}

interface CategoryFormState {
	name: string
	description: string
	active: boolean
}

interface PendingDeleteCategory {
	id: string
	name: string
}

const EMPTY_CATEGORY_FORM: CategoryFormState = {
	name: "",
	description: "",
	active: true,
}

function mapProductToForm(
	product: MenuItem,
	fallbackCategoryId: string
): ProductFormState {
	return {
		name: product.name,
		price: String(product.price),
		description: product.description,
		categoryId: product.categoryId ?? fallbackCategoryId,
		imageUrl: product.image,
		preparationTime: String(product.preparationTime),
		available: product.available,
	}
}

function parseNumberInput(value: string): number {
	const parsedValue = Number.parseFloat(value.replace(",", "."))
	return Number.isFinite(parsedValue) ? parsedValue : Number.NaN
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: página concentra fluxos de CRUD de produtos e categorias.
export function MenuBuilderPage() {
	const [searchQuery, setSearchQuery] = useState("")
	const [selectedCategoryId, setSelectedCategoryId] = useState(ALL_CATEGORY_ID)
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
	const [isProductModalOpen, setIsProductModalOpen] = useState(false)
	const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
	const [editingProduct, setEditingProduct] = useState<MenuItem | null>(null)
	const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
		null
	)
	const [pendingDeleteProduct, setPendingDeleteProduct] =
		useState<MenuItem | null>(null)
	const [pendingDeleteCategory, setPendingDeleteCategory] =
		useState<PendingDeleteCategory | null>(null)
	const [productForm, setProductForm] = useState<ProductFormState>({
		name: "",
		price: "",
		description: "",
		categoryId: "",
		imageUrl: "",
		preparationTime: "",
		available: true,
	})
	const [newCategoryForm, setNewCategoryForm] =
		useState<CategoryFormState>(EMPTY_CATEGORY_FORM)
	const [editCategoryForm, setEditCategoryForm] =
		useState<CategoryFormState>(EMPTY_CATEGORY_FORM)

	const { organizationId } = useOrganizationCheck()
	const selectedCategoryFilterId =
		selectedCategoryId === ALL_CATEGORY_ID ? null : selectedCategoryId
	const {
		data: categoriesResponse = [],
		error: categoriesError,
		isError: isCategoriesError,
		isLoading: isCategoriesLoading,
		refetch: refetchCategories,
	} = useCategories(organizationId)
	const {
		data: menuItems = [],
		error: productsError,
		isError: isProductsError,
		isLoading: isProductsLoading,
		refetch: refetchProducts,
	} = useProducts(organizationId, selectedCategoryFilterId)
	const createProductMutation = useCreateProduct()
	const updateProductMutation = useUpdateProduct()
	const deleteProductMutation = useDeleteProduct()
	const createCategoryMutation = useCreateCategory()
	const updateCategoryMutation = useUpdateCategory()
	const deleteCategoryMutation = useDeleteCategory()
	const hasNotifiedCategoriesError = useRef(false)
	const hasNotifiedProductsError = useRef(false)

	const categoryTabs = useMemo(() => {
		const tabs = [{ id: ALL_CATEGORY_ID, label: "Todos" }]

		for (const category of categoriesResponse
			.filter((item) => item.active)
			.sort((left, right) => (left.order ?? 0) - (right.order ?? 0))) {
			const label = category.name.trim()
			if (!label) {
				continue
			}

			tabs.push({
				id: category.id,
				label,
			})
		}

		return tabs
	}, [categoriesResponse])

	const selectableCategories = useMemo(
		() => categoryTabs.filter((category) => category.id !== ALL_CATEGORY_ID),
		[categoryTabs]
	)

	const categoryFallbackId = selectableCategories[0]?.id ?? ""

	const filteredItems = useMemo(() => {
		const normalizedQuery = searchQuery.trim().toLowerCase()

		return menuItems.filter((item) => {
			if (!normalizedQuery) {
				return true
			}

			return (
				item.name.toLowerCase().includes(normalizedQuery) ||
				item.description.toLowerCase().includes(normalizedQuery)
			)
		})
	}, [menuItems, searchQuery])

	const isSubmittingProduct =
		createProductMutation.isPending || updateProductMutation.isPending
	const isSubmittingCategory =
		createCategoryMutation.isPending || updateCategoryMutation.isPending
	const isDeletingItem =
		deleteProductMutation.isPending || deleteCategoryMutation.isPending
	let productSubmitLabel = "Adicionar"
	if (isSubmittingProduct) {
		productSubmitLabel = "Salvando..."
	} else if (editingProduct) {
		productSubmitLabel = "Salvar alterações"
	}

	let deleteModalMessage = "Deseja continuar com a exclusão?"
	if (pendingDeleteProduct) {
		deleteModalMessage = `Deseja excluir o produto "${pendingDeleteProduct.name}"?`
	} else if (pendingDeleteCategory) {
		deleteModalMessage = `Deseja excluir a categoria "${pendingDeleteCategory.name}"?`
	}

	useEffect(() => {
		const hasSelectedCategory = categoryTabs.some(
			(category) => category.id === selectedCategoryId
		)

		if (!hasSelectedCategory) {
			setSelectedCategoryId(ALL_CATEGORY_ID)
		}
	}, [categoryTabs, selectedCategoryId])

	useEffect(() => {
		if (productForm.categoryId || !categoryFallbackId) {
			return
		}

		setProductForm((currentState) => ({
			...currentState,
			categoryId: categoryFallbackId,
		}))
	}, [productForm.categoryId, categoryFallbackId])

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

	useEffect(() => {
		if (
			!(isProductsError && productsError) ||
			hasNotifiedProductsError.current
		) {
			if (!isProductsError) {
				hasNotifiedProductsError.current = false
			}
			return
		}

		hasNotifiedProductsError.current = true
		toast.error("Falha ao carregar os produtos")
		sentryCaptureException(productsError, {
			context: "menu_builder_products_fetch",
			organizationId,
		})
	}, [isProductsError, productsError, organizationId])

	function resetProductForm() {
		setProductForm({
			name: "",
			price: "",
			description: "",
			categoryId: categoryFallbackId,
			imageUrl: "",
			preparationTime: "",
			available: true,
		})
	}

	function handleOpenNewProductModal() {
		setEditingProduct(null)
		resetProductForm()
		setIsProductModalOpen(true)
	}

	function handleOpenEditProductModal(product: MenuItem) {
		setEditingProduct(product)
		setProductForm(mapProductToForm(product, categoryFallbackId))
		setIsProductModalOpen(true)
	}

	function handleCloseProductModal() {
		setIsProductModalOpen(false)
		setEditingProduct(null)
		resetProductForm()
	}

	async function handleProductSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()

		if (!organizationId) {
			toast.error("Organização não encontrada")
			return
		}

		if (!productForm.name.trim()) {
			toast.error("Informe o nome do produto")
			return
		}

		if (!productForm.categoryId) {
			toast.error("Selecione uma categoria")
			return
		}

		const parsedPrice = parseNumberInput(productForm.price)
		if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
			toast.error("Informe um preço válido")
			return
		}

		const parsedPreparationTime = parseNumberInput(productForm.preparationTime)

		if (!Number.isFinite(parsedPreparationTime) || parsedPreparationTime < 0) {
			toast.error("Informe um tempo de preparo válido")
			return
		}

		const payload = {
			categoryId: productForm.categoryId,
			name: productForm.name.trim(),
			description: productForm.description.trim() || null,
			price: productForm.price,
			imageUrl: productForm.imageUrl.trim() || null,
			available: productForm.available,
			prepTime: Math.trunc(parsedPreparationTime),
		}

		try {
			if (editingProduct) {
				await updateProductMutation.mutateAsync({
					organizationId,
					productId: editingProduct.id,
					data: payload,
				})
				toast.success("Produto atualizado com sucesso")
			} else {
				await createProductMutation.mutateAsync({
					data: {
						organizationId,
						...payload,
					},
				})
				toast.success("Produto criado com sucesso")
			}

			handleCloseProductModal()
		} catch {
			toast.error("Não foi possível salvar o produto")
		}
	}

	function handleDeleteProduct(product: MenuItem) {
		setPendingDeleteCategory(null)
		setPendingDeleteProduct(product)
	}

	async function confirmDeleteProduct(product: MenuItem) {
		if (!organizationId) {
			toast.error("Organização não encontrada")
			return
		}

		try {
			await deleteProductMutation.mutateAsync({
				organizationId,
				productId: product.id,
			})
			setPendingDeleteProduct(null)
			toast.success("Produto excluído com sucesso")
		} catch {
			toast.error("Não foi possível excluir o produto")
		}
	}

	async function handleCreateCategory(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()

		if (!organizationId) {
			toast.error("Organização não encontrada")
			return
		}

		if (!newCategoryForm.name.trim()) {
			toast.error("Informe o nome da categoria")
			return
		}

		try {
			await createCategoryMutation.mutateAsync({
				data: {
					organizationId,
					name: newCategoryForm.name.trim(),
					description: newCategoryForm.description.trim(),
					active: newCategoryForm.active,
				},
			})
			setNewCategoryForm(EMPTY_CATEGORY_FORM)
			toast.success("Categoria criada com sucesso")
		} catch {
			toast.error("Não foi possível criar a categoria")
		}
	}

	function handleStartEditCategory(categoryId: string) {
		const category = categoriesResponse.find((item) => item.id === categoryId)
		if (!category) {
			return
		}

		setEditingCategoryId(category.id)
		setEditCategoryForm({
			name: category.name,
			description: category.description ?? "",
			active: category.active,
		})
	}

	function handleCancelEditCategory() {
		setEditingCategoryId(null)
		setEditCategoryForm(EMPTY_CATEGORY_FORM)
	}

	async function handleSaveCategory(categoryId: string) {
		if (!organizationId) {
			toast.error("Organização não encontrada")
			return
		}

		if (!editCategoryForm.name.trim()) {
			toast.error("Informe o nome da categoria")
			return
		}

		try {
			await updateCategoryMutation.mutateAsync({
				organizationId,
				catId: categoryId,
				data: {
					name: editCategoryForm.name.trim(),
					description: editCategoryForm.description.trim() || null,
					active: editCategoryForm.active,
				},
			})
			handleCancelEditCategory()
			toast.success("Categoria atualizada com sucesso")
		} catch {
			toast.error("Não foi possível atualizar a categoria")
		}
	}

	function handleDeleteCategory(categoryId: string, categoryName: string) {
		setPendingDeleteProduct(null)
		setPendingDeleteCategory({
			id: categoryId,
			name: categoryName,
		})
	}

	async function confirmDeleteCategory(category: PendingDeleteCategory) {
		if (!organizationId) {
			toast.error("Organização não encontrada")
			return
		}

		try {
			await deleteCategoryMutation.mutateAsync({
				organizationId,
				catId: category.id,
			})
			setPendingDeleteCategory(null)
			toast.success("Categoria excluída com sucesso")
		} catch {
			toast.error("Não foi possível excluir a categoria")
		}
	}

	function handleCloseDeleteModal() {
		setPendingDeleteProduct(null)
		setPendingDeleteCategory(null)
	}

	async function handleConfirmDelete() {
		if (pendingDeleteProduct) {
			await confirmDeleteProduct(pendingDeleteProduct)
			return
		}

		if (pendingDeleteCategory) {
			await confirmDeleteCategory(pendingDeleteCategory)
		}
	}

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
						Gerencie os produtos e categorias do seu cardápio
					</p>
				</div>
				<div className="flex items-center gap-2">
					<button
						className="btn-secondary gap-2"
						onClick={() => setIsCategoryModalOpen(true)}
						type="button"
					>
						<Settings className="h-5 w-5" />
						Categorias
					</button>
					<button
						className="btn-primary gap-2"
						onClick={handleOpenNewProductModal}
						type="button"
					>
						<Plus className="h-5 w-5" />
						Novo Produto
					</button>
				</div>
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
						onChange={(event) => setSearchQuery(event.target.value)}
						placeholder="Buscar produtos..."
						type="text"
						value={searchQuery}
					/>
				</div>
				<div className="flex items-center gap-4">
					<div className="flex gap-2">
						{isCategoriesLoading && (
							<span className="self-center text-sm text-surface-500">
								Carregando categorias...
							</span>
						)}
						{categoryTabs.slice(0, 6).map((category) => (
							<button
								className={cn(
									"rounded-lg px-3 py-1.5 font-medium text-sm transition-colors",
									selectedCategoryId === category.id
										? "bg-primary-50 text-primary-700"
										: "text-surface-600 hover:bg-surface-50"
								)}
								key={category.id}
								onClick={() => setSelectedCategoryId(category.id)}
								type="button"
							>
								{category.label}
							</button>
						))}
						{isCategoriesError && (
							<button
								className="rounded-lg border border-surface-200 px-3 py-1.5 font-medium text-sm text-surface-600 transition-colors hover:bg-surface-50"
								onClick={() => refetchCategories()}
								type="button"
							>
								Recarregar categorias
							</button>
						)}
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
				{isProductsLoading && (
					<div className="col-span-full rounded-2xl bg-surface-50 p-6 text-center text-surface-600">
						Carregando produtos...
					</div>
				)}

				{isProductsError && !isProductsLoading && (
					<div className="col-span-full flex flex-col items-center gap-3 rounded-2xl bg-red-50 p-6 text-center">
						<p className="font-medium text-red-700">
							Não foi possível carregar os produtos.
						</p>
						<button
							className="btn-secondary"
							onClick={() => refetchProducts()}
							type="button"
						>
							Tentar novamente
						</button>
					</div>
				)}

				{!(isProductsLoading || isProductsError) &&
					filteredItems.length === 0 && (
						<div className="col-span-full rounded-2xl bg-surface-50 p-6 text-center text-surface-600">
							{searchQuery
								? "Nenhum produto encontrado para a busca."
								: "Nenhum produto cadastrado para essa categoria."}
						</div>
					)}

				{!(isProductsLoading || isProductsError) &&
					filteredItems.map((item, index) => (
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
										{item.image ? (
											<img
												alt={item.name}
												className="h-full w-full object-cover"
												height={160}
												src={item.image}
												width={160}
											/>
										) : (
											<div className="flex h-full items-center justify-center text-surface-500 text-xs">
												Sem imagem
											</div>
										)}
									</div>
									<div className="p-4">
										<div className="flex items-start justify-between gap-3">
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
													onClick={() => handleOpenEditProductModal(item)}
													type="button"
												>
													<Edit className="h-4 w-4 text-surface-600" />
												</button>
												<button
													className="rounded-lg p-1.5 hover:bg-red-50"
													onClick={() => handleDeleteProduct(item)}
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
										{item.image ? (
											<img
												alt={item.name}
												className="h-full w-full object-cover"
												height={80}
												src={item.image}
												width={80}
											/>
										) : (
											<div className="flex h-full items-center justify-center text-surface-500 text-xs">
												Sem imagem
											</div>
										)}
									</div>
									<div className="flex flex-1 items-center justify-between p-4">
										<div>
											<h3 className="font-semibold text-surface-900">
												{item.name}
											</h3>
											<p className="text-sm text-surface-500">
												{item.category}
											</p>
										</div>
										<span className="font-bold text-primary-600">
											{formatCurrency(+item.price)}
										</span>
										<div className="flex gap-1">
											<button
												className="rounded-lg p-2 hover:bg-surface-100"
												onClick={() => handleOpenEditProductModal(item)}
												type="button"
											>
												<Edit className="h-4 w-4 text-surface-600" />
											</button>
											<button
												className="rounded-lg p-2 hover:bg-red-50"
												onClick={() => handleDeleteProduct(item)}
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
				isOpen={isProductModalOpen}
				onClose={handleCloseProductModal}
				size="lg"
				title={editingProduct ? "Editar Produto" : "Novo Produto"}
			>
				<form className="space-y-4" onSubmit={handleProductSubmit}>
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
								onChange={(event) =>
									setProductForm((currentState) => ({
										...currentState,
										name: event.target.value,
									}))
								}
								placeholder="Nome do produto"
								type="text"
								value={productForm.name}
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
								onChange={(event) =>
									setProductForm((currentState) => ({
										...currentState,
										price: event.target.value,
									}))
								}
								placeholder="0,00"
								step="0.01"
								type="number"
								value={productForm.price}
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
							onChange={(event) =>
								setProductForm((currentState) => ({
									...currentState,
									description: event.target.value,
								}))
							}
							placeholder="Descrição do produto"
							rows={3}
							value={productForm.description}
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
								onChange={(event) =>
									setProductForm((currentState) => ({
										...currentState,
										categoryId: event.target.value,
									}))
								}
								value={productForm.categoryId}
							>
								{isCategoriesLoading && (
									<option value="">Carregando categorias...</option>
								)}
								{!isCategoriesLoading && selectableCategories.length === 0 && (
									<option value="">Nenhuma categoria disponível</option>
								)}
								{selectableCategories.map((category) => (
									<option key={category.id} value={category.id}>
										{category.label}
									</option>
								))}
							</select>
						</div>
						<div>
							<label
								className="mb-1 block font-medium text-sm text-surface-700"
								htmlFor="product-prep-time"
							>
								Tempo de Preparo (min)
							</label>
							<input
								className="input-field"
								id="product-prep-time"
								onChange={(event) =>
									setProductForm((currentState) => ({
										...currentState,
										preparationTime: event.target.value,
									}))
								}
								placeholder="15"
								type="number"
								value={productForm.preparationTime}
							/>
						</div>
					</div>
					<div>
						<label
							className="mb-1 block font-medium text-sm text-surface-700"
							htmlFor="product-image-url"
						>
							URL da imagem
						</label>
						<input
							className="input-field"
							id="product-image-url"
							onChange={(event) =>
								setProductForm((currentState) => ({
									...currentState,
									imageUrl: event.target.value,
								}))
							}
							placeholder="https://..."
							type="url"
							value={productForm.imageUrl}
						/>
					</div>
					<label className="flex items-center gap-2 font-medium text-sm text-surface-700">
						<input
							checked={productForm.available}
							onChange={(event) =>
								setProductForm((currentState) => ({
									...currentState,
									available: event.target.checked,
								}))
							}
							type="checkbox"
						/>
						Produto disponível para venda
					</label>
					<div className="flex justify-end gap-3 pt-4">
						<button
							className="btn-secondary"
							onClick={handleCloseProductModal}
							type="button"
						>
							Cancelar
						</button>
						<button
							className="btn-primary"
							disabled={
								isSubmittingProduct || selectableCategories.length === 0
							}
							type="submit"
						>
							{productSubmitLabel}
						</button>
					</div>
				</form>
			</Modal>

			<Modal
				isOpen={isCategoryModalOpen}
				onClose={() => setIsCategoryModalOpen(false)}
				size="lg"
				title="Gerenciar Categorias"
			>
				<div className="space-y-6">
					<form
						className="space-y-3 rounded-2xl border border-surface-100 p-4"
						onSubmit={handleCreateCategory}
					>
						<h3 className="font-semibold text-surface-900">Nova categoria</h3>
						<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
							<input
								className="input-field"
								onChange={(event) =>
									setNewCategoryForm((currentState) => ({
										...currentState,
										name: event.target.value,
									}))
								}
								placeholder="Nome da categoria"
								type="text"
								value={newCategoryForm.name}
							/>
							<input
								className="input-field"
								onChange={(event) =>
									setNewCategoryForm((currentState) => ({
										...currentState,
										description: event.target.value,
									}))
								}
								placeholder="Descrição (opcional)"
								type="text"
								value={newCategoryForm.description}
							/>
						</div>
						<label className="flex items-center gap-2 font-medium text-sm text-surface-700">
							<input
								checked={newCategoryForm.active}
								onChange={(event) =>
									setNewCategoryForm((currentState) => ({
										...currentState,
										active: event.target.checked,
									}))
								}
								type="checkbox"
							/>
							Categoria ativa
						</label>
						<div className="flex justify-end">
							<button
								className="btn-primary"
								disabled={isSubmittingCategory}
								type="submit"
							>
								{isSubmittingCategory ? "Criando..." : "Criar categoria"}
							</button>
						</div>
					</form>

					<div className="space-y-3">
						<h3 className="font-semibold text-surface-900">
							Categorias existentes
						</h3>
						{categoriesResponse.length === 0 && (
							<div className="rounded-xl bg-surface-50 p-4 text-sm text-surface-600">
								Nenhuma categoria cadastrada.
							</div>
						)}
						{categoriesResponse
							.slice()
							.sort((left, right) => (left.order ?? 0) - (right.order ?? 0))
							.map((category) => {
								const isEditing = editingCategoryId === category.id

								return (
									<div
										className="rounded-xl border border-surface-100 p-3"
										key={category.id}
									>
										{isEditing ? (
											<div className="space-y-3">
												<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
													<input
														className="input-field"
														onChange={(event) =>
															setEditCategoryForm((currentState) => ({
																...currentState,
																name: event.target.value,
															}))
														}
														type="text"
														value={editCategoryForm.name}
													/>
													<input
														className="input-field"
														onChange={(event) =>
															setEditCategoryForm((currentState) => ({
																...currentState,
																description: event.target.value,
															}))
														}
														placeholder="Descrição (opcional)"
														type="text"
														value={editCategoryForm.description}
													/>
												</div>
												<label className="flex items-center gap-2 font-medium text-sm text-surface-700">
													<input
														checked={editCategoryForm.active}
														onChange={(event) =>
															setEditCategoryForm((currentState) => ({
																...currentState,
																active: event.target.checked,
															}))
														}
														type="checkbox"
													/>
													Categoria ativa
												</label>
												<div className="flex justify-end gap-2">
													<button
														className="btn-secondary gap-1"
														onClick={handleCancelEditCategory}
														type="button"
													>
														<X className="h-4 w-4" />
														Cancelar
													</button>
													<button
														className="btn-primary gap-1"
														onClick={() => handleSaveCategory(category.id)}
														type="button"
													>
														<Check className="h-4 w-4" />
														Salvar
													</button>
												</div>
											</div>
										) : (
											<div className="flex items-center justify-between gap-3">
												<div>
													<p className="font-medium text-surface-900">
														{category.name}
													</p>
													<p className="text-sm text-surface-500">
														{category.description || "Sem descrição"}
													</p>
													<span
														className={cn(
															"mt-1 inline-block rounded-full px-2 py-0.5 font-medium text-xs",
															category.active
																? "bg-green-100 text-green-700"
																: "bg-surface-100 text-surface-600"
														)}
													>
														{category.active ? "Ativa" : "Inativa"}
													</span>
												</div>
												<div className="flex gap-2">
													<button
														className="rounded-lg p-2 hover:bg-surface-100"
														onClick={() => handleStartEditCategory(category.id)}
														type="button"
													>
														<Pencil className="h-4 w-4 text-surface-600" />
													</button>
													<button
														className="rounded-lg p-2 hover:bg-red-50"
														onClick={() =>
															handleDeleteCategory(category.id, category.name)
														}
														type="button"
													>
														<Trash2 className="h-4 w-4 text-red-600" />
													</button>
												</div>
											</div>
										)}
									</div>
								)
							})}
					</div>
				</div>
			</Modal>

			<Modal
				isOpen={Boolean(pendingDeleteProduct || pendingDeleteCategory)}
				onClose={handleCloseDeleteModal}
				size="sm"
				title="Confirmar exclusão"
			>
				<div className="space-y-4">
					<p className="text-sm text-surface-700">{deleteModalMessage}</p>
					<div className="flex justify-end gap-2">
						<button
							className="btn-secondary"
							onClick={handleCloseDeleteModal}
							type="button"
						>
							Cancelar
						</button>
						<button
							className="btn-primary"
							disabled={isDeletingItem}
							onClick={handleConfirmDelete}
							type="button"
						>
							{isDeletingItem ? "Excluindo..." : "Excluir"}
						</button>
					</div>
				</div>
			</Modal>
		</div>
	)
}
