export interface CategoryApi {
	id: string
	organizationId: string
	name: string
	description: string | null
	order: number | null
	active: boolean
	createdAt: string
	updatedAt: string
}

export interface CreateCategoryPayload {
	organizationId: string
	name: string
	description?: string | null
	order?: number
	active?: boolean
}

export interface UpdateCategoryPayload {
	name?: string
	description?: string | null
	order?: number
	active?: boolean
}
