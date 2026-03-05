import { AnimatePresence, motion } from "framer-motion"
import {
	CreditCard,
	DollarSign,
	Grid,
	List,
	Minus,
	Plus,
	Search,
	ShoppingCart,
	Smartphone,
	Split,
	Trash2,
	User,
} from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import { toast } from "sonner"
import { Modal } from "@/components/ui/modal"
import { useCartStore } from "@/domains/pos/store/cart-store"
import { useRestaurantStore } from "@/domains/restaurant/store/restaurant-store"
import { useCategories } from "@/hooks/use-categories"
import { useOrganizationCheck } from "@/hooks/use-organization-check"
import { useProducts } from "@/hooks/use-products"
import { sentryCaptureException } from "@/lib/sentry"
import type { PaymentMethod } from "@/types/dashboard"
import { formatCurrency } from "@/utils/helpers"
import { cn } from "@/utils/misc"

interface LastOrderItem {
	menuItem: {
		id: string
		name: string
		price: string | number
		image: string
	}
	quantity: number
	notes?: string
}

interface LastOrder {
	id: string
	items: LastOrderItem[]
	subtotal: number
	tax: number
	total: number
	paymentMethod: PaymentMethod
	createdAt: Date
}

const SPLIT_CYCLE = [1, 2, 3, 4]

function getNextSplitCount(current: number): number {
	const currentIndex = SPLIT_CYCLE.indexOf(current)
	if (currentIndex === -1) {
		return SPLIT_CYCLE[0]
	}

	return SPLIT_CYCLE[(currentIndex + 1) % SPLIT_CYCLE.length]
}

interface UseQueryErrorNotificationParams {
	isError: boolean
	error: unknown
	organizationId: string | null
	message: string
	context: string
}

function useQueryErrorNotification({
	isError,
	error,
	organizationId,
	message,
	context,
}: UseQueryErrorNotificationParams) {
	const hasNotifiedRef = useRef(false)

	useEffect(() => {
		if (!(isError && error) || hasNotifiedRef.current) {
			if (!isError) {
				hasNotifiedRef.current = false
			}
			return
		}

		hasNotifiedRef.current = true
		toast.error(message)
		sentryCaptureException(error, {
			context,
			organizationId,
		})
	}, [isError, error, organizationId, message, context])
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: página de PDV concentra múltiplos estados de UI no mesmo componente.
export default function POSPage() {
	const {
		items,
		addItem,
		removeItem,
		updateQuantity,
		clearCart,
		setType,
		getSubtotal,
		getTotal,
	} = useCartStore()
	const { activeRestaurant } = useRestaurantStore()
	const { organizationId } = useOrganizationCheck()
	const [searchQuery, setSearchQuery] = useState("")
	const [selectedCategoryId, setSelectedCategoryId] = useState("all")
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
	const [showPayment, setShowPayment] = useState(false)
	const [showReceipt, setShowReceipt] = useState(false)
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix")
	const [splitCount, setSplitCountLocal] = useState(1)
	const [lastOrder, setLastOrder] = useState<LastOrder | null>(null)
	const selectedCategoryFilterId =
		selectedCategoryId === "all" ? null : selectedCategoryId

	const {
		data: menuItems = [],
		error: productsError,
		isError: isProductsError,
		isLoading: isProductsLoading,
		refetch: refetchProducts,
	} = useProducts(organizationId, selectedCategoryFilterId)
	const {
		data: categoriesResponse = [],
		error: categoriesError,
		isError: isCategoriesError,
		isLoading: isCategoriesLoading,
		refetch: refetchCategories,
	} = useCategories(organizationId)

	const categories = useMemo(() => {
		const categoryTabs = [{ id: "all", label: "Todos" }]
		const seenIds = new Set(["all"])

		const sortedCategories = categoriesResponse
			.filter((category) => category.active)
			.sort((left, right) => (left.order ?? 0) - (right.order ?? 0))

		for (const category of sortedCategories) {
			const label = category.name.trim()
			if (!label || seenIds.has(category.id)) {
				continue
			}

			seenIds.add(category.id)
			categoryTabs.push({
				id: category.id,
				label,
			})
		}

		return categoryTabs
	}, [categoriesResponse])

	const filteredItems = useMemo(() => {
		const normalizedQuery = searchQuery.trim().toLowerCase()

		return menuItems.filter(
			(item) =>
				item.available &&
				(!normalizedQuery || item.name.toLowerCase().includes(normalizedQuery))
		)
	}, [menuItems, searchQuery])

	useEffect(() => {
		const hasSelectedCategory = categories.some(
			(category) => category.id === selectedCategoryId
		)
		if (!hasSelectedCategory) {
			setSelectedCategoryId("all")
		}
	}, [categories, selectedCategoryId])

	useQueryErrorNotification({
		isError: isProductsError,
		error: productsError,
		organizationId,
		message: "Falha ao carregar os produtos",
		context: "pos_products_fetch",
	})

	useQueryErrorNotification({
		isError: isCategoriesError,
		error: categoriesError,
		organizationId,
		message: "Falha ao carregar as categorias",
		context: "pos_categories_fetch",
	})

	const handlePayment = () => {
		const order: LastOrder = {
			id: `ORD-${Date.now()}`,
			items,
			subtotal: getSubtotal(),
			tax: getTotal(10) - getSubtotal(),
			total: getTotal(10),
			paymentMethod,
			createdAt: new Date(),
		}
		setLastOrder(order)
		clearCart()
		setShowPayment(false)
		setShowReceipt(true)
	}

	const taxRate = activeRestaurant?.settings.taxRate || 10

	return (
		<div className="flex h-[calc(100vh-120px)] gap-6">
			<div className="flex flex-1 flex-col">
				<div className="mb-4 flex items-center justify-between">
					<div>
						<h1 className="font-bold text-2xl text-surface-900">PDV</h1>
						<p className="text-sm text-surface-500">Ponto de Venda</p>
					</div>
					<div className="flex items-center gap-2">
						<button
							className={cn(
								"rounded-lg px-4 py-2 font-medium text-sm transition-colors",
								useCartStore.getState().type === "dine_in"
									? "bg-primary-500 text-white"
									: "bg-surface-100 text-surface-600"
							)}
							onClick={() => setType("dine_in")}
							type="button"
						>
							Mesa
						</button>
						<button
							className={cn(
								"rounded-lg px-4 py-2 font-medium text-sm transition-colors",
								useCartStore.getState().type === "takeaway"
									? "bg-primary-500 text-white"
									: "bg-surface-100 text-surface-600"
							)}
							onClick={() => setType("takeaway")}
							type="button"
						>
							Retirada
						</button>
						<button
							className={cn(
								"rounded-lg px-4 py-2 font-medium text-sm transition-colors",
								useCartStore.getState().type === "delivery"
									? "bg-primary-500 text-white"
									: "bg-surface-100 text-surface-600"
							)}
							onClick={() => setType("delivery")}
							type="button"
						>
							Delivery
						</button>
					</div>
				</div>

				<div className="mb-4 rounded-2xl border border-surface-100 bg-white p-4">
					<div className="flex items-center gap-4">
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
						<div className="flex gap-2">
							{isCategoriesLoading && (
								<span className="self-center text-sm text-surface-500">
									Carregando categorias...
								</span>
							)}
							{categories.slice(0, 6).map((cat) => (
								<button
									className={cn(
										"rounded-lg px-3 py-1.5 font-medium text-sm transition-colors",
										selectedCategoryId === cat.id
											? "bg-primary-50 text-primary-700"
											: "text-surface-600 hover:bg-surface-50"
									)}
									key={cat.id}
									onClick={() => setSelectedCategoryId(cat.id)}
									type="button"
								>
									{cat.label}
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
									viewMode === "grid" ? "bg-surface-100" : ""
								)}
								onClick={() => setViewMode("grid")}
								type="button"
							>
								<Grid className="h-5 w-5" />
							</button>
							<button
								className={cn(
									"p-2 transition-colors",
									viewMode === "list" ? "bg-surface-100" : ""
								)}
								onClick={() => setViewMode("list")}
								type="button"
							>
								<List className="h-5 w-5" />
							</button>
						</div>
					</div>
				</div>

				<div
					className={cn(
						"flex-1 overflow-y-auto rounded-2xl border border-surface-100 bg-white p-4",
						viewMode === "grid"
							? "grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4"
							: "space-y-2"
					)}
				>
					{isProductsLoading && (
						<div className="col-span-full flex h-full items-center justify-center rounded-xl bg-surface-50 p-6 text-surface-600">
							Carregando produtos...
						</div>
					)}

					{isProductsError && !isProductsLoading && (
						<div className="col-span-full flex flex-col items-center justify-center gap-3 rounded-xl bg-red-50 p-6 text-center">
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
							<div className="col-span-full flex h-full items-center justify-center rounded-xl bg-surface-50 p-6 text-center text-surface-600">
								{searchQuery
									? "Nenhum produto encontrado para a busca."
									: "Nenhum produto disponível."}
							</div>
						)}

					{!(isProductsLoading || isProductsError) &&
						filteredItems.map((item, index) => (
							<motion.div
								animate={{ opacity: 1, scale: 1 }}
								className={cn(
									"cursor-pointer rounded-xl border-2 border-transparent bg-surface-50 p-4 transition-all hover:border-primary-200 hover:bg-primary-50",
									viewMode === "list" && "flex items-center gap-4"
								)}
								initial={{ opacity: 0, scale: 0.9 }}
								key={item.id}
								onClick={() => addItem(item)}
								transition={{ delay: index * 0.02 }}
							>
								{viewMode === "grid" ? (
									<>
										<div className="mb-3 h-32 overflow-hidden rounded-lg bg-surface-200">
											{item.image ? (
												<img
													alt={item.name}
													className="h-full w-full object-cover"
													height={128}
													src={item.image}
													width={128}
												/>
											) : (
												<div className="flex h-full items-center justify-center text-surface-500 text-xs">
													Sem imagem
												</div>
											)}
										</div>
										<h3 className="truncate font-semibold text-surface-900">
											{item.name}
										</h3>
										<p className="font-bold text-lg text-primary-600">
											{formatCurrency(+item.price)}
										</p>
									</>
								) : (
									<>
										<div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-surface-200">
											{item.image ? (
												<img
													alt={item.name}
													className="h-full w-full object-cover"
													height={64}
													src={item.image}
													width={64}
												/>
											) : (
												<div className="flex h-full items-center justify-center text-surface-500 text-xs">
													Sem imagem
												</div>
											)}
										</div>
										<div className="flex-1">
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
									</>
								)}
							</motion.div>
						))}
				</div>
			</div>

			<div className="flex w-96 shrink-0 flex-col rounded-2xl border border-surface-100 bg-white">
				<div className="border-surface-100 border-b p-4">
					<h2 className="flex items-center gap-2 font-semibold text-surface-900">
						<ShoppingCart className="h-5 w-5" />
						Carrinho
						{items.length > 0 && (
							<span className="ml-auto rounded-full bg-primary-100 px-2 py-0.5 text-primary-700 text-xs">
								{items.length}
							</span>
						)}
					</h2>
				</div>

				<div className="flex-1 space-y-3 overflow-y-auto p-4">
					<AnimatePresence>
						{items.map((item) => (
							<motion.div
								animate={{ opacity: 1, x: 0 }}
								className="flex items-center gap-3 rounded-xl bg-surface-50 p-3"
								exit={{ opacity: 0, x: -20 }}
								initial={{ opacity: 0, x: 20 }}
								key={item.menuItem.id}
							>
								<div className="h-12 w-12 overflow-hidden rounded-lg bg-surface-200">
									{item.menuItem.image ? (
										<img
											alt={item.menuItem.name}
											className="h-full w-full object-cover"
											height={48}
											src={item.menuItem.image}
											width={48}
										/>
									) : (
										<div className="flex h-full items-center justify-center text-[10px] text-surface-500">
											Sem imagem
										</div>
									)}
								</div>
								<div className="min-w-0 flex-1">
									<p className="truncate font-medium text-surface-900">
										{item.menuItem.name}
									</p>
									<p className="text-sm text-surface-500">
										{formatCurrency(+item.menuItem.price)}
									</p>
								</div>
								<div className="flex items-center gap-2">
									<button
										className="rounded-lg p-1 hover:bg-surface-200"
										onClick={() =>
											updateQuantity(item.menuItem.id, item.quantity - 1)
										}
										type="button"
									>
										<Minus className="h-4 w-4" />
									</button>
									<span className="w-8 text-center font-medium">
										{item.quantity}
									</span>
									<button
										className="rounded-lg p-1 hover:bg-surface-200"
										onClick={() =>
											updateQuantity(item.menuItem.id, item.quantity + 1)
										}
										type="button"
									>
										<Plus className="h-4 w-4" />
									</button>
								</div>
								<button
									className="rounded-lg p-2 text-red-600 hover:bg-red-100"
									onClick={() => removeItem(item.menuItem.id)}
									type="button"
								>
									<Trash2 className="h-4 w-4" />
								</button>
							</motion.div>
						))}
					</AnimatePresence>

					{items.length === 0 && (
						<div className="py-12 text-center text-surface-500">
							<ShoppingCart className="mx-auto mb-2 h-12 w-12 opacity-50" />
							<p>Carrinho vazio</p>
							<p className="text-sm">Adicione produtos para começar</p>
						</div>
					)}
				</div>

				{items.length > 0 && (
					<div className="space-y-3 border-surface-100 border-t p-4">
						<div className="flex justify-between text-sm">
							<span className="text-surface-500">Subtotal</span>
							<span className="text-surface-900">
								{formatCurrency(getSubtotal())}
							</span>
						</div>
						<div className="flex justify-between text-sm">
							<span className="text-surface-500">
								Taxa de serviço ({taxRate}%)
							</span>
							<span className="text-surface-900">
								{formatCurrency(getTotal(taxRate) - getSubtotal())}
							</span>
						</div>
						<div className="flex justify-between border-surface-100 border-t pt-2 font-bold text-lg">
							<span>Total</span>
							<span className="text-primary-600">
								{formatCurrency(getTotal(taxRate))}
							</span>
						</div>

						<div className="flex gap-2">
							<button
								className="btn-secondary flex-1 justify-center gap-2"
								onClick={() =>
									setSplitCountLocal(getNextSplitCount(splitCount))
								}
								type="button"
							>
								<Split className="h-4 w-4" />
								Dividir ({splitCount})
							</button>
							<button
								className="btn-secondary flex-1 justify-center gap-2"
								type="button"
							>
								<User className="h-4 w-4" />
								Cliente
							</button>
						</div>

						<button
							className="btn-primary w-full gap-2 py-3 text-lg"
							onClick={() => setShowPayment(true)}
							type="button"
						>
							<CreditCard className="h-5 w-5" />
							Finalizar Pedido
						</button>
					</div>
				)}
			</div>

			<Modal
				isOpen={showPayment}
				onClose={() => setShowPayment(false)}
				size="md"
				title="Pagamento"
			>
				<div className="space-y-6">
					<div className="rounded-xl bg-surface-50 p-6 text-center">
						<p className="text-sm text-surface-500">Total a pagar</p>
						<p className="font-bold text-3xl text-surface-900">
							{formatCurrency(getTotal(taxRate))}
						</p>
					</div>

					{splitCount > 1 && (
						<div>
							<p className="mb-2 font-medium text-surface-700">Dividir em:</p>
							<div className="grid grid-cols-4 gap-2">
								{[2, 3, 4, 5].map((n) => (
									<button
										className={cn(
											"rounded-lg py-2 font-medium transition-colors",
											splitCount === n
												? "bg-primary-500 text-white"
												: "bg-surface-100 text-surface-600"
										)}
										key={n}
										onClick={() => setSplitCountLocal(n)}
										type="button"
									>
										{n}x {formatCurrency(getTotal(taxRate) / n)}
									</button>
								))}
							</div>
						</div>
					)}

					<div>
						<p className="mb-2 font-medium text-surface-700">
							Método de pagamento
						</p>
						<div className="grid grid-cols-2 gap-2">
							{[
								{ method: "pix", icon: Smartphone, label: "PIX" },
								{ method: "credit", icon: CreditCard, label: "Cartão Crédito" },
								{ method: "debit", icon: CreditCard, label: "Cartão Débito" },
								{ method: "cash", icon: DollarSign, label: "Dinheiro" },
							].map(({ method, icon: Icon, label }) => (
								<button
									className={cn(
										"flex items-center gap-2 rounded-xl border-2 p-3 transition-colors",
										paymentMethod === method
											? "border-primary-500 bg-primary-50"
											: "border-surface-200"
									)}
									key={method}
									onClick={() => setPaymentMethod(method as PaymentMethod)}
									type="button"
								>
									<Icon className="h-5 w-5 text-surface-600" />
									<span className="font-medium">{label}</span>
								</button>
							))}
						</div>
					</div>

					<button
						className="btn-primary w-full py-3"
						onClick={handlePayment}
						type="button"
					>
						Confirmar Pagamento
					</button>
				</div>
			</Modal>

			<Modal
				isOpen={showReceipt}
				onClose={() => setShowReceipt(false)}
				size="sm"
				title="Comprovante"
			>
				{lastOrder && (
					<div className="space-y-4">
						<div className="border-surface-100 border-b pb-4 text-center">
							<p className="font-bold text-lg">{activeRestaurant?.name}</p>
							<p className="text-sm text-surface-500">
								{activeRestaurant?.address}
							</p>
							<p className="text-sm text-surface-500">Pedido #{lastOrder.id}</p>
							<p className="text-sm text-surface-500">
								{new Date(lastOrder.createdAt).toLocaleString()}
							</p>
						</div>
						<div className="space-y-2">
							{lastOrder.items.map((item: LastOrderItem) => (
								<div
									className="flex justify-between text-sm"
									key={item.menuItem.id}
								>
									<span>
										{item.quantity}x {item.menuItem.name}
									</span>
									<span>
										{formatCurrency(+item.menuItem.price * item.quantity)}
									</span>
								</div>
							))}
						</div>
						<div className="space-y-1 border-surface-100 border-t pt-2">
							<div className="flex justify-between text-sm">
								<span>Subtotal</span>
								<span>{formatCurrency(lastOrder.subtotal)}</span>
							</div>
							<div className="flex justify-between text-sm">
								<span>Taxa</span>
								<span>{formatCurrency(lastOrder.tax)}</span>
							</div>
							<div className="flex justify-between font-bold text-lg">
								<span>Total</span>
								<span>{formatCurrency(lastOrder.total)}</span>
							</div>
						</div>
						<p className="pt-4 text-center text-sm text-surface-500">
							Obrigado pela preferência!
						</p>
					</div>
				)}
			</Modal>
		</div>
	)
}
