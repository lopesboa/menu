import type {
	PosCommercialStatus,
	PosOperationalStatus,
} from "../types/pos-order-types"

export type PosOrderAction =
	| "edit"
	| "finalize"
	| "checkout"
	| "activate"
	| "reopen"
	| "cancel"

interface PosStatusContext {
	commercialStatus: PosCommercialStatus
	status: PosOperationalStatus | null
}

const COMMERCIAL_STATUS_LABELS: Record<PosCommercialStatus, string> = {
	draft: "Rascunho",
	submitted: "Confirmado",
	closed: "Pago",
	cancelled: "Cancelado",
}

const OPERATIONAL_STATUS_LABELS: Record<PosOperationalStatus, string> = {
	pending: "Pendente",
	confirmed: "Confirmado",
	preparing: "Em preparo",
	ready: "Pronto",
	delivered: "Entregue",
	cancelled: "Cancelado",
}

export function getCommercialStatusLabel(status: PosCommercialStatus): string {
	return COMMERCIAL_STATUS_LABELS[status] ?? status
}

export function getOperationalStatusLabel(
	status: PosOperationalStatus | null
): string {
	if (!status) {
		return "Pré-operação"
	}

	return OPERATIONAL_STATUS_LABELS[status] ?? status
}

export function canExecutePosAction(
	context: PosStatusContext,
	action: PosOrderAction
): boolean {
	const { commercialStatus, status } = context

	switch (action) {
		case "edit":
			return commercialStatus === "draft" && status === null

		case "finalize":
			return commercialStatus === "draft" && status === null

		case "cancel":
			return (
				(commercialStatus === "draft" && status === null) ||
				(commercialStatus === "submitted" && status === null)
			)

		case "checkout":
			return commercialStatus === "submitted" && status === null

		case "activate":
			return (
				(commercialStatus === "submitted" && status === null) ||
				(commercialStatus === "closed" && status === null)
			)

		case "reopen":
			return commercialStatus === "closed" && status === null

		default:
			return false
	}
}

export function getAvailablePosActions(
	context: PosStatusContext
): PosOrderAction[] {
	const allActions: PosOrderAction[] = [
		"edit",
		"finalize",
		"checkout",
		"activate",
		"reopen",
		"cancel",
	]

	return allActions.filter((action) => canExecutePosAction(context, action))
}

export function isPosOrderTerminal(context: PosStatusContext): boolean {
	return context.commercialStatus === "cancelled" || context.status !== null
}
