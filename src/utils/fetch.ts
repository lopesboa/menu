const API_BASE = import.meta.env.VITE_APP_SERVER_URL
const API_KEY = import.meta.env.VITE_API_KEY

export async function apiFetch<T>(
	endpoint: string,
	options?: RequestInit
): Promise<T> {
	const response = await fetch(`${API_BASE}${endpoint}`, {
		...options,
		credentials: "include",
		headers: {
			"x-api-key": API_KEY,
			"Content-Type": "application/json",
			...options?.headers,
		},
	})

	if (!response.ok) {
		throw new Error(`Response status: ${response.status}`)
	}

	return response.json()
}
