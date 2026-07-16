import type { OrderStatus } from "../types/order.types"

export type OperationalOrderStatus =
	| "novo"
	| "aceito"
	| "em_preparo"
	| "pronto"
	| "finalizado"
	| "cancelado"
	| "desconhecido"

const OPERATIONAL_FROM_API_STATUS: Record<OrderStatus, OperationalOrderStatus> =
	{
		pending: "novo",
		confirmed: "aceito",
		preparing: "em_preparo",
		ready: "pronto",
		delivered: "finalizado",
		cancelled: "cancelado",
		rejected: "cancelado",
		unknown: "desconhecido",
	}

const API_FROM_OPERATIONAL_STATUS: Partial<
	Record<OperationalOrderStatus, OrderStatus>
> = {
	novo: "pending",
	aceito: "confirmed",
	em_preparo: "preparing",
	pronto: "ready",
	finalizado: "delivered",
	cancelado: "cancelled",
}

const DIRECT_OPERATIONAL_ALIASES: Partial<
	Record<string, OperationalOrderStatus>
> = {
	novo: "novo",
	aceito: "aceito",
	em_preparo: "em_preparo",
	pronto: "pronto",
	finalizado: "finalizado",
	cancelado: "cancelado",
	desconhecido: "desconhecido",
}

export const OPERATIONAL_STATUS_LABELS: Record<OperationalOrderStatus, string> =
	{
		novo: "Novo",
		aceito: "Aceito",
		em_preparo: "Em preparo",
		pronto: "Pronto",
		finalizado: "Finalizado",
		cancelado: "Cancelado",
		desconhecido: "Desconhecido",
	}

export const OPERATIONAL_STATUS_TRANSITIONS: Record<
	OperationalOrderStatus,
	OperationalOrderStatus[]
> = {
	novo: ["aceito", "cancelado"],
	aceito: ["em_preparo", "cancelado"],
	em_preparo: ["pronto", "cancelado"],
	pronto: ["finalizado", "cancelado"],
	finalizado: [],
	cancelado: [],
	desconhecido: [],
}

export function toOperationalOrderStatus(
	status: string
): OperationalOrderStatus {
	if (status in DIRECT_OPERATIONAL_ALIASES) {
		return DIRECT_OPERATIONAL_ALIASES[status] as OperationalOrderStatus
	}

	if (status in OPERATIONAL_FROM_API_STATUS) {
		return OPERATIONAL_FROM_API_STATUS[status as OrderStatus]
	}

	return "desconhecido"
}

export function toApiOrderStatus(status: OperationalOrderStatus): OrderStatus {
	const apiStatus = API_FROM_OPERATIONAL_STATUS[status]

	if (!apiStatus) {
		throw new Error("Status operacional desconhecido para atualização")
	}

	return apiStatus
}

export function getOperationalStatusLabel(status: string): string {
	const normalizedStatus = toOperationalOrderStatus(status)
	return OPERATIONAL_STATUS_LABELS[normalizedStatus]
}

export function canTransitionOrderStatus(
	currentStatus: string,
	nextStatus: OperationalOrderStatus
): boolean {
	const normalizedCurrentStatus = toOperationalOrderStatus(currentStatus)
	return OPERATIONAL_STATUS_TRANSITIONS[normalizedCurrentStatus].includes(
		nextStatus
	)
}
