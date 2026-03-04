import { useState } from "react"
import { type CepResponse, searchCep } from "@/services/cep-service"

interface UseCepSearchReturn {
	cepData: CepResponse | null
	isLoading: boolean
	error: string | null
	searchCep: (cep: string) => Promise<void>
	reset: () => void
}

export function useCepSearch(): UseCepSearchReturn {
	const [cepData, setCepData] = useState<CepResponse | null>(null)
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const search = async (cep: string) => {
		if (cep.length < 8) {
			return
		}

		setIsLoading(true)
		setError(null)

		try {
			const data = await searchCep(cep)
			setCepData(data)
			console.log({ data, cep })
		} catch {
			setError("CEP não encontrado")
			setCepData(null)
		} finally {
			setIsLoading(false)
		}
	}

	const reset = () => {
		setCepData(null)
		setError(null)
		setIsLoading(false)
	}

	return {
		cepData,
		isLoading,
		error,
		searchCep: search,
		reset,
	}
}
