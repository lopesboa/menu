import type { Recipe, RecipeIngredient } from "@/types/dashboard"

export const recipes: Record<string, Recipe> = {
	"1": {
		id: "recipe-1",
		menuItemId: "1",
		yield: 1,
		ingredients: [
			{
				inventoryItemId: "inv12",
				name: "Pão Italiano",
				quantity: 1,
				unit: "unidades",
			},
			{ inventoryItemId: "inv13", name: "Tomate", quantity: 100, unit: "g" },
			{ inventoryItemId: "inv17", name: "Manjericão", quantity: 10, unit: "g" },
			{
				inventoryItemId: "inv17",
				name: "Azeite de Oliveira",
				quantity: 20,
				unit: "ml",
			},
		],
		instructions:
			"Torrar o pão, cortar tomates, adicionar manjericão e azeite.",
	},
	"2": {
		id: "recipe-2",
		menuItemId: "2",
		yield: 1,
		ingredients: [
			{
				inventoryItemId: "inv1",
				name: "Filé Mignon",
				quantity: 150,
				unit: "g",
			},
			{ inventoryItemId: "inv6", name: "Parmesian", quantity: 30, unit: "g" },
			{ inventoryItemId: "inv18", name: "Alcaparras", quantity: 20, unit: "g" },
		],
		instructions: "Fatiar filé bem fino, adicionar alcaparras e parmesan.",
	},
	"6": {
		id: "recipe-6",
		menuItemId: "6",
		yield: 1,
		ingredients: [
			{
				inventoryItemId: "inv1",
				name: "Filé Mignon",
				quantity: 200,
				unit: "g",
			},
			{
				inventoryItemId: "inv9",
				name: "Arroz Arbório",
				quantity: 150,
				unit: "g",
			},
			{ inventoryItemId: "inv10", name: "Batata", quantity: 200, unit: "g" },
			{
				inventoryItemId: "inv14",
				name: "Alface Romana",
				quantity: 50,
				unit: "g",
			},
		],
		instructions: "Grelhar filé no ponto deseado, servir com arroz e batata.",
	},
	"7": {
		id: "recipe-7",
		menuItemId: "7",
		yield: 1,
		ingredients: [
			{ inventoryItemId: "inv2", name: "Frango", quantity: 200, unit: "g" },
			{ inventoryItemId: "inv5", name: "Mussarela", quantity: 80, unit: "g" },
			{
				inventoryItemId: "inv11",
				name: "Massa para Pizza",
				quantity: 1,
				unit: "unidades",
			},
			{
				inventoryItemId: "inv18",
				name: "Molho de Tomate",
				quantity: 100,
				unit: "ml",
			},
		],
		instructions: "Empanar frango, fritar, cobrir com molho e mussarela.",
	},
	"15": {
		id: "recipe-15",
		menuItemId: "15",
		yield: 1,
		ingredients: [
			{
				inventoryItemId: "inv19",
				name: "Pão de Hambúrguer",
				quantity: 1,
				unit: "unidades",
			},
			{
				inventoryItemId: "inv1",
				name: "Carne Moída",
				quantity: 180,
				unit: "g",
			},
			{ inventoryItemId: "inv13", name: "Alface", quantity: 30, unit: "g" },
			{ inventoryItemId: "inv15", name: "Tomate", quantity: 50, unit: "g" },
		],
		instructions: "Grear hambúrguer, montar no pão com vegetais.",
	},
	"32": {
		id: "recipe-32",
		menuItemId: "32",
		yield: 1,
		ingredients: [
			{ inventoryItemId: "inv3", name: "Mojarra", quantity: 400, unit: "g" },
			{ inventoryItemId: "inv9", name: "Arroz", quantity: 200, unit: "g" },
			{ inventoryItemId: "inv10", name: "Farofa", quantity: 100, unit: "g" },
			{
				inventoryItemId: "inv14",
				name: "Limão",
				quantity: 1,
				unit: "unidades",
			},
		],
		instructions: "Fritar mojarra, servir com arroz, farofa e pirão.",
	},
	"46": {
		id: "recipe-46",
		menuItemId: "46",
		yield: 1,
		ingredients: [
			{ inventoryItemId: "inv1", name: "Maminha", quantity: 300, unit: "g" },
			{ inventoryItemId: "inv9", name: "Arroz", quantity: 150, unit: "g" },
			{ inventoryItemId: "inv10", name: "Farofa", quantity: 80, unit: "g" },
			{ inventoryItemId: "inv14", name: "Alface", quantity: 50, unit: "g" },
		],
		instructions: "Grelhar maminha, servir com arroz e farofa.",
	},
	"47": {
		id: "recipe-47",
		menuItemId: "47",
		yield: 1,
		ingredients: [
			{ inventoryItemId: "inv1", name: "Picanha", quantity: 350, unit: "g" },
			{ inventoryItemId: "inv9", name: "Arroz", quantity: 150, unit: "g" },
			{ inventoryItemId: "inv16", name: "Batata", quantity: 150, unit: "g" },
		],
		instructions: "Grelhar picanha no ponto solicitado.",
	},
}

export function getRecipeForItem(menuItemId: string): Recipe | undefined {
	return recipes[menuItemId]
}

export function getIngredientUsage(
	menuItemId: string,
	quantity = 1
): RecipeIngredient[] {
	const recipe = recipes[menuItemId]
	if (!recipe) {
		return []
	}
	return recipe.ingredients.map((ing) => ({
		...ing,
		quantity: ing.quantity * quantity,
	}))
}

export function checkIngredientAvailability(
	menuItemId: string,
	quantity: number,
	inventory: Record<string, { quantity: number; unit: string }>
): { available: boolean; missing: string[] } {
	const ingredients = getIngredientUsage(menuItemId, quantity)
	const missing: string[] = []

	for (const ing of ingredients) {
		const invItem = inventory[ing.inventoryItemId]
		if (!invItem || invItem.quantity < ing.quantity) {
			missing.push(ing.name)
		}
	}

	return {
		available: missing.length === 0,
		missing,
	}
}
