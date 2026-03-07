export interface ProductApi {
	id: string
	categoryId: string
	categoryName: string | null
	organizationId: string
	name: string
	description: string | null
	price: string | number
	imageUrl: string | null
	available: boolean
	calories: number | undefined
	allergens: string[] | null
	isNew: boolean
	isSignature: boolean
	order: number | null
	prepTime: number | null
	createdAt: string
	updatedAt: string
}

export interface CreateProductPayload {
	organizationId: string
	categoryId: string
	name: string
	description?: string | null
	price: number
	imageUrl?: string | null
	available?: boolean
	calories?: number | null
	allergens?: string[] | null
	isNew?: boolean
	isSignature?: boolean
	order?: number | null
	prepTime?: number | null
}

export interface UpdateProductPayload {
	categoryId?: string
	name?: string
	description?: string | null
	price?: number
	imageUrl?: string | null
	available?: boolean
	calories?: number | null
	allergens?: string[] | null
	isNew?: boolean
	isSignature?: boolean
	order?: number | null
	prepTime?: number | null
}
