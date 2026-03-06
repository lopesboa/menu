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
