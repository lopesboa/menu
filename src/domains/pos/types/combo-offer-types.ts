export interface ComboOfferItem {
	id: string
	comboOfferId: string
	productId: string
	productName: string
	productAvailable: boolean
	quantity: number
	sortOrder: number
	active: boolean
}

export interface ComboOffer {
	id: string
	organizationId: string
	name: string
	description: string
	price: number
	active: boolean
	items: ComboOfferItem[]
}

export interface ComboOfferCreateItemPayload {
	productId: string
	quantity: number
	sortOrder: number
	active: boolean
}

export interface ComboOfferCreatePayload {
	organizationId: string
	name: string
	description: string
	price: number
	items: ComboOfferCreateItemPayload[]
}

export interface ComboOfferUpdatePayload {
	name?: string
	description?: string
	price?: number
	items?: ComboOfferCreateItemPayload[]
}

export interface ComboOfferCreateResult {
	message: string
	comboOffer: ComboOffer
}

export interface ComboOfferUpdateResult {
	message: string
	comboOffer: ComboOffer
}

export interface ComboOfferDeactivateResult {
	message: string
}
