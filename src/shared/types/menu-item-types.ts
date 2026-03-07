export interface RecipeIngredient {
	inventoryItemId: string
	name: string
	quantity: number
	unit: string
}

export interface Recipe {
	id: string
	menuItemId: string
	ingredients: RecipeIngredient[]
	yield: number
	instructions?: string
}

export interface MenuItem {
	id: string
	organizationId: string
	categoryId?: string
	name: string
	description: string
	price: number | string
	category: string
	image: string
	available: boolean
	preparationTime: number
	calories?: number
	allergens?: string[]
	recipe?: Recipe
}
