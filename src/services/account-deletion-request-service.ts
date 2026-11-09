export interface AccountDeletionRequestPayload {
	name: string
	email: string
}

const apiBaseUrl = import.meta.env.VITE_APP_SERVER_URL?.trim()

export async function submitAccountDeletionRequest(
	payload: AccountDeletionRequestPayload
) {
	if (!apiBaseUrl) {
		throw new Error("Canal de solicitação indisponível")
	}

	const response = await fetch(
		`${apiBaseUrl}/privacy/account-deletion-requests`,
		{
			method: "POST",
			credentials: "omit",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		}
	)

	if (!response.ok) {
		throw new Error("Não foi possível enviar a solicitação")
	}
}
