export type PosErrorCode =
	| "ORDER_NOT_FOUND"
	| "ORDER_ITEM_PRODUCT_NOT_FOUND"
	| "ORDER_ITEM_OPTIONAL_NOT_FOUND"
	| "COMBO_OFFER_NOT_FOUND"
	| "ORDER_NOT_EDITABLE"
	| "ORDER_VERSION_CONFLICT"
	| "ORDER_NOT_FINALIZABLE"
	| "ORDER_NOT_ACTIVATABLE"
	| "ORDER_NOT_CHECKOUT_READY"
	| "ORDER_NOT_REOPENABLE"
	| "ORDER_NOT_CANCELLABLE"
	| "ORDER_ALREADY_ACTIVATED"
	| "ORDER_ALREADY_CANCELLED"
	| "ORDER_EMPTY_DRAFT"
	| "FORBIDDEN"
	| "VALIDATION_ERROR"

const POS_ERROR_MESSAGES: Record<PosErrorCode, string> = {
	ORDER_NOT_FOUND: "Pedido não encontrado",
	ORDER_ITEM_PRODUCT_NOT_FOUND: "Produto do item não encontrado no catálogo",
	ORDER_ITEM_OPTIONAL_NOT_FOUND: "Opcional do item não encontrado no catálogo",
	COMBO_OFFER_NOT_FOUND: "Combo não encontrado no catálogo",
	ORDER_NOT_EDITABLE: "Este pedido não pode mais ser editado",
	ORDER_VERSION_CONFLICT:
		"O pedido foi alterado por outra sessão. Recarregue e tente novamente.",
	ORDER_NOT_FINALIZABLE: "Este pedido não pode ser finalizado no estado atual",
	ORDER_NOT_ACTIVATABLE: "Este pedido não pode ser ativado no estado atual",
	ORDER_NOT_CHECKOUT_READY:
		"Este pedido não está pronto para pagamento no estado atual",
	ORDER_NOT_REOPENABLE: "Este pedido não pode ser reaberto no estado atual",
	ORDER_NOT_CANCELLABLE: "Este pedido não pode ser cancelado no estado atual",
	ORDER_ALREADY_ACTIVATED: "Este pedido já foi ativado para operação",
	ORDER_ALREADY_CANCELLED: "Este pedido já foi cancelado",
	ORDER_EMPTY_DRAFT:
		"O pedido precisa ter pelo menos um item para ser finalizado",
	FORBIDDEN: "Seu perfil não tem permissão para esta ação",
	VALIDATION_ERROR: "Dados inválidos para processar esta ação",
}

export function getPosErrorMessage(
	errorCode: string | undefined,
	fallback: string
): string {
	if (errorCode && errorCode in POS_ERROR_MESSAGES) {
		return POS_ERROR_MESSAGES[errorCode as PosErrorCode]
	}

	return fallback
}
