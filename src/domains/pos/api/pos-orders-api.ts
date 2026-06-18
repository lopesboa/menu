import { apiFetch } from "@/utils/fetch"
import type {
	PosActivateResult,
	PosCancelPayload,
	PosCancelResult,
	PosCheckoutPayload,
	PosCheckoutResult,
	PosCreateOrderPayload,
	PosCreateOrderResult,
	PosDraftReplacePayload,
	PosDraftReplaceResult,
	PosFinalizeResult,
	PosOrder,
	PosReopenResult,
} from "../types/pos-order-types"

export async function createPosDraft(
	payload: PosCreateOrderPayload,
	signal?: AbortSignal
): Promise<PosCreateOrderResult> {
	return apiFetch<PosCreateOrderResult>("/pos/orders", {
		method: "POST",
		body: JSON.stringify(payload),
		signal,
	})
}

export async function getPosOrder(
	organizationId: string,
	orderId: string,
	signal?: AbortSignal
): Promise<PosOrder> {
	return apiFetch<PosOrder>(`/pos/orders/${organizationId}/${orderId}`, {
		signal,
	})
}

export async function replacePosDraft(
	organizationId: string,
	orderId: string,
	payload: PosDraftReplacePayload,
	signal?: AbortSignal
): Promise<PosDraftReplaceResult> {
	return apiFetch<PosDraftReplaceResult>(
		`/pos/orders/${organizationId}/${orderId}/draft`,
		{
			method: "PUT",
			body: JSON.stringify(payload),
			signal,
		}
	)
}

export async function finalizePosDraft(
	organizationId: string,
	orderId: string,
	signal?: AbortSignal
): Promise<PosFinalizeResult> {
	return apiFetch<PosFinalizeResult>(
		`/pos/orders/${organizationId}/${orderId}/finalize`,
		{
			method: "POST",
			signal,
		}
	)
}

export async function activatePosOrder(
	organizationId: string,
	orderId: string,
	signal?: AbortSignal
): Promise<PosActivateResult> {
	return apiFetch<PosActivateResult>(
		`/pos/orders/${organizationId}/${orderId}/activate`,
		{
			method: "POST",
			signal,
		}
	)
}

export async function checkoutPosOrder(
	organizationId: string,
	orderId: string,
	payload: PosCheckoutPayload,
	signal?: AbortSignal
): Promise<PosCheckoutResult> {
	return apiFetch<PosCheckoutResult>(
		`/pos/orders/${organizationId}/${orderId}/checkout`,
		{
			method: "POST",
			body: JSON.stringify(payload),
			signal,
		}
	)
}

export async function reopenPosOrder(
	organizationId: string,
	orderId: string,
	signal?: AbortSignal
): Promise<PosReopenResult> {
	return apiFetch<PosReopenResult>(
		`/pos/orders/${organizationId}/${orderId}/reopen`,
		{
			method: "POST",
			signal,
		}
	)
}

export async function cancelPosOrder(
	organizationId: string,
	orderId: string,
	payload: PosCancelPayload,
	signal?: AbortSignal
): Promise<PosCancelResult> {
	return apiFetch<PosCancelResult>(
		`/pos/orders/${organizationId}/${orderId}/cancel`,
		{
			method: "POST",
			body: JSON.stringify(payload),
			signal,
		}
	)
}
