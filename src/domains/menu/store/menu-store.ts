import { create } from "zustand"
import type { MenuItem } from "@/types/dashboard"

interface MenuStore {
	menuItems: MenuItem[]
	selectedCategory: string
	searchQuery: string
	viewMode: "grid" | "list"
	setSelectedCategory: (category: string) => void
	setSearchQuery: (query: string) => void
	setViewMode: (mode: "grid" | "list") => void
	toggleItemAvailability: (itemId: string) => void
	updateItem: (itemId: string, updates: Partial<MenuItem>) => void
	addItem: (item: Omit<MenuItem, "id">) => void
	deleteItem: (itemId: string) => void
	getFilteredItems: () => MenuItem[]
	getCategories: () => string[]
}

const allCategories = [
	"Todas",
	"Appetizers",
	"Main Courses",
	"Pizzas",
	"Burgers",
	"Salads",
	"Desserts",
	"Beverages",
	"Sides",
]

export const useMenuStore = create<MenuStore>((set, get) => ({
	menuItems: [],
	selectedCategory: "Todas",
	searchQuery: "",
	viewMode: "grid",
	setSelectedCategory: (category) => set({ selectedCategory: category }),
	setSearchQuery: (query) => set({ searchQuery: query }),
	setViewMode: (mode) => set({ viewMode: mode }),
	toggleItemAvailability: (itemId) =>
		set((state) => ({
			menuItems: state.menuItems.map((item) =>
				item.id === itemId ? { ...item, available: !item.available } : item
			),
		})),
	updateItem: (itemId, updates) =>
		set((state) => ({
			menuItems: state.menuItems.map((item) =>
				item.id === itemId ? { ...item, ...updates } : item
			),
		})),
	addItem: (itemData) => {
		const newItem: MenuItem = {
			...itemData,
			id: `item-${Date.now()}`,
		}
		set((state) => ({ menuItems: [...state.menuItems, newItem] }))
	},
	deleteItem: (itemId) =>
		set((state) => ({
			menuItems: state.menuItems.filter((item) => item.id !== itemId),
		})),
	getFilteredItems: () => {
		const { menuItems, selectedCategory, searchQuery } = get()
		return menuItems.filter((item) => {
			if (selectedCategory !== "Todas" && item.category !== selectedCategory) {
				return false
			}
			if (searchQuery) {
				const query = searchQuery.toLowerCase()
				return (
					item.name.toLowerCase().includes(query) ||
					item.description.toLowerCase().includes(query) ||
					item.category.toLowerCase().includes(query)
				)
			}
			return true
		})
	},
	getCategories: () => allCategories,
}))

export const useMenuSelectors = () => {
	const menuItems = useMenuStore((state) => state.menuItems)
	const selectedCategory = useMenuStore((state) => state.selectedCategory)
	const searchQuery = useMenuStore((state) => state.searchQuery)
	const viewMode = useMenuStore((state) => state.viewMode)
	const getFilteredItems = useMenuStore((state) => state.getFilteredItems)
	const getCategories = useMenuStore((state) => state.getCategories)

	return {
		menuItems,
		selectedCategory,
		searchQuery,
		viewMode,
		getFilteredItems,
		getCategories,
	}
}

export const useMenuActions = () => {
	const setSelectedCategory = useMenuStore((state) => state.setSelectedCategory)
	const setSearchQuery = useMenuStore((state) => state.setSearchQuery)
	const setViewMode = useMenuStore((state) => state.setViewMode)
	const toggleItemAvailability = useMenuStore(
		(state) => state.toggleItemAvailability
	)
	const updateItem = useMenuStore((state) => state.updateItem)
	const addItem = useMenuStore((state) => state.addItem)
	const deleteItem = useMenuStore((state) => state.deleteItem)

	return {
		setSelectedCategory,
		setSearchQuery,
		setViewMode,
		toggleItemAvailability,
		updateItem,
		addItem,
		deleteItem,
	}
}
