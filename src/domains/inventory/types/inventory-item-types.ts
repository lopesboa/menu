export interface InventoryItem {
	id: string
	organizationId: string
	name: string
	quantity: number
	unit: string
	minQuantity: number
	category: string
	lastRestocked: Date
	costPerUnit: number
	location?: string
	supplier?: string
}

export interface InventoryItemApi {
	id: string
	organizationId: string
	name: string | null
	quantity: number | null
	unit: string | null
	minQuantity: number | null
	category: string | null
	lastRestocked: string | null
	costPerUnit: number | null
	location: string | null
	supplier: string | null
}
