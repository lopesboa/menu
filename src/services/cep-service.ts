export interface CepResponse {
	cep: string
	state: string
	city: string
	neighborhood: string
	street: string
	service: string
	location?: {
		type: "Point"
		coordinates: {
			longitude: string
			latitude: string
		}
	}
}

export async function searchCep(cep: string): Promise<CepResponse> {
	const cleanCep = cep.replace(/\D/g, "")
	const response = await fetch(
		`https://brasilapi.com.br/api/cep/v2/${cleanCep}`
	)

	if (!response.ok) {
		throw new Error("CEP não encontrado")
	}

	return response.json()
}
