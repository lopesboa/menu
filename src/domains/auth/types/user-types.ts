import type { UserRole } from "@/shared/types/user-role-types"

export interface User {
	id: string
	email: string
	name: string
	avatar?: string
	role: UserRole
	createdAt: Date
}

export interface UserRestaurant {
	organizationId: string
	restaurantName: string
	role: UserRole
	isOwner: boolean
}
