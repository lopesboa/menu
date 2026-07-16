export type PosCommercialStatus = "draft" | "submitted" | "closed" | "cancelled"

export type PosOperationalStatus =
	| "pending"
	| "confirmed"
	| "preparing"
	| "ready"
	| "delivered"
	| "cancelled"

export type PosPaymentMethod = "cash" | "card" | "pix"

export type PosPaymentStatus = "pending" | "paid" | "refunded"

export type PosOrderType = "dine_in" | "takeaway" | "delivery"

export interface PosOrderOptional {
	id: string
	orderItemId: string
	optionalItemId: string
	name: string
	price: number
	createdAt: string
}

export interface PosDraftItem {
	id: string
	orderId: string
	productId: string
	name: string
	quantity: number
	unitPrice: number
	status: string | null
	stationId: string
	notes: string | null
	optionals: PosOrderOptional[]
}

export interface PosComboSnapshotItem {
	id: string
	orderComboSnapshotId: string
	productId: string
	name: string
	quantity: number
	sortOrder: number
	stationId: string
}

export interface PosComboSnapshot {
	id: string
	orderId: string
	comboOfferId: string
	name: string
	price: number
	quantity: number
	notes: string | null
	items: PosComboSnapshotItem[]
}

export interface PosOrder {
	id: string
	organizationId: string
	orderNumber: number
	customerName: string
	customerPhone: string
	customerId: string | null
	staffId: string | null
	tableId: string | null
	notes: string
	subTotal: number
	serviceFee: number
	tax: number
	discount: number
	total: number
	status: PosOperationalStatus | null
	orderType: PosOrderType
	source: string
	commercialStatus: PosCommercialStatus
	cancellationReason: string | null
	cancelledAt: string | null
	paymentMethod: PosPaymentMethod | null
	paymentStatus: PosPaymentStatus
	approvalStatus: string | null
	approvedBy: string | null
	createdAt: string
	updatedAt: string
	orderItems: PosDraftItem[]
	comboItems: PosComboSnapshot[]
}

export interface PosCreateOrderItemPayload {
	productId: string
	quantity: number
	notes?: string
	optionalItemIds?: string[]
}

export interface PosCreateComboItemPayload {
	comboOfferId: string
	quantity: number
	notes?: string
}

export type PosCreateOrderItem =
	| PosCreateOrderItemPayload
	| PosCreateComboItemPayload

export interface PosCreateOrderPayload {
	organizationId: string
	orderType: PosOrderType
	tableId?: string
	customerName?: string
	customerPhone?: string
	notes?: string
	orderItems: PosCreateOrderItem[]
}

export interface PosCreateOrderResult {
	message: string
	order: Pick<
		PosOrder,
		| "id"
		| "organizationId"
		| "orderNumber"
		| "commercialStatus"
		| "status"
		| "source"
		| "total"
		| "updatedAt"
		| "orderItems"
	>
}

export interface PosDraftReplacePayload {
	expectedUpdatedAt: string
	notes?: string
	orderItems: PosCreateOrderItem[]
}

export interface PosDraftReplaceResult {
	message: string
	order: Pick<
		PosOrder,
		"id" | "commercialStatus" | "status" | "total" | "updatedAt" | "orderItems"
	>
}

export interface PosFinalizeResult {
	message: string
	order: Pick<
		PosOrder,
		| "id"
		| "commercialStatus"
		| "status"
		| "updatedAt"
		| "orderItems"
		| "comboItems"
	>
}

export interface PosActivateResult {
	message: string
	order: Pick<
		PosOrder,
		| "id"
		| "organizationId"
		| "orderNumber"
		| "orderType"
		| "commercialStatus"
		| "status"
		| "total"
		| "paymentMethod"
		| "paymentStatus"
		| "updatedAt"
	>
}

export interface PosCheckoutPayload {
	paymentMethod: PosPaymentMethod
}

export interface PosCheckoutResult {
	message: string
	order: Pick<
		PosOrder,
		| "id"
		| "commercialStatus"
		| "paymentMethod"
		| "paymentStatus"
		| "status"
		| "total"
		| "updatedAt"
	>
}

export interface PosReopenResult {
	message: string
	order: Pick<
		PosOrder,
		| "id"
		| "commercialStatus"
		| "paymentMethod"
		| "paymentStatus"
		| "status"
		| "updatedAt"
		| "orderItems"
	>
}

export interface PosCancelPayload {
	reason: string
}

export interface PosCancelResult {
	message: string
	order: Pick<
		PosOrder,
		| "id"
		| "organizationId"
		| "orderNumber"
		| "orderType"
		| "commercialStatus"
		| "cancellationReason"
		| "cancelledAt"
		| "status"
		| "updatedAt"
	>
}
