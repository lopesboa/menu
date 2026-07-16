const API_BASE = import.meta.env.VITE_APP_SERVER_URL
const API_KEY = import.meta.env.VITE_API_KEY

export interface ApiErrorPayload {
	type?: string
	title?: string
	status?: number
	errorCode?: string
	details?: string
}

export class ApiRequestError extends Error {
	status: number
	errorCode?: string
	type?: string
	details?: string

	constructor(status: number, payload?: ApiErrorPayload) {
		super(`Response status: ${status}`)
		this.name = "ApiRequestError"
		this.status = status
		this.errorCode = payload?.errorCode
		this.type = payload?.type
		this.details = payload?.details
	}
}

export async function apiFetch<T>(
	endpoint: string,
	options?: RequestInit
): Promise<T> {
	const hasDeleteMethod = options?.method !== "DELETE"

	const response = await fetch(`${API_BASE}${endpoint}`, {
		...options,
		credentials: "include",
		headers: {
			"x-api-key": API_KEY,
			...(hasDeleteMethod && { "Content-Type": "application/json" }),
			...options?.headers,
		},
	})

	if (!response.ok) {
		let payload: ApiErrorPayload | undefined

		try {
			payload = (await response.json()) as ApiErrorPayload
		} catch {
			payload = undefined
		}

		throw new ApiRequestError(response.status, payload)
	}

	return response.json()
}
