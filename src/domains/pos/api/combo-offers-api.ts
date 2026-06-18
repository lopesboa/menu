import { apiFetch } from "@/utils/fetch"
import type {
	ComboOffer,
	ComboOfferCreatePayload,
	ComboOfferCreateResult,
	ComboOfferDeactivateResult,
	ComboOfferUpdatePayload,
	ComboOfferUpdateResult,
} from "../types/combo-offer-types"

export async function getComboOffers(
	organizationId: string,
	includeInactive = false,
	signal?: AbortSignal
): Promise<ComboOffer[]> {
	const params = new URLSearchParams()

	if (includeInactive) {
		params.set("includeInactive", "true")
	}

	const queryString = params.toString()
	const endpoint = `/combo-offers/${organizationId}${queryString ? `?${queryString}` : ""}`

	return apiFetch<ComboOffer[]>(endpoint, { signal })
}

export async function getComboOffer(
	organizationId: string,
	comboOfferId: string,
	signal?: AbortSignal
): Promise<ComboOffer> {
	return apiFetch<ComboOffer>(
		`/combo-offers/${organizationId}/${comboOfferId}`,
		{ signal }
	)
}

export async function createComboOffer(
	payload: ComboOfferCreatePayload,
	signal?: AbortSignal
): Promise<ComboOfferCreateResult> {
	return apiFetch<ComboOfferCreateResult>("/combo-offers", {
		method: "POST",
		body: JSON.stringify(payload),
		signal,
	})
}

export async function updateComboOffer(
	organizationId: string,
	comboOfferId: string,
	payload: ComboOfferUpdatePayload,
	signal?: AbortSignal
): Promise<ComboOfferUpdateResult> {
	return apiFetch<ComboOfferUpdateResult>(
		`/combo-offers/${organizationId}/${comboOfferId}`,
		{
			method: "PATCH",
			body: JSON.stringify(payload),
			signal,
		}
	)
}

export async function deactivateComboOffer(
	organizationId: string,
	comboOfferId: string,
	signal?: AbortSignal
): Promise<ComboOfferDeactivateResult> {
	return apiFetch<ComboOfferDeactivateResult>(
		`/combo-offers/${organizationId}/${comboOfferId}/deactivate`,
		{
			method: "PATCH",
			signal,
		}
	)
}
