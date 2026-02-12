import { isRouteErrorResponse, useRouteError } from "react-router"
import { toast } from "sonner"
import { DefaultErrorFallback } from "@/components/ui/default-error-fallback"
import { sentryCaptureException } from "@/lib/sentry"

export function RouteErrorBoundary() {
	const error = useRouteError()

	let errorMessage = "Ocorreu um erro inesperado."
	let shouldReport = true

	if (isRouteErrorResponse(error)) {
		switch (error.status) {
			case 401:
				errorMessage = "Sua sessão expirou. Por favor, faça login novamente."
				toast.error("Sessão expirada", {
					description: "Por favor, faça login para continuar.",
				})
				break

			case 403:
				errorMessage = "Você não tem permissão para acessar este recurso."
				toast.error("Acesso negado")
				break
			case 404:
				errorMessage = "A página que você procura não existe."
				shouldReport = false
				break
			case 500:
				errorMessage =
					"Erro no servidor. Por favor, tente novamente mais tarde."
				toast.error("Erro no servidor")
				break
			default:
				errorMessage = error.statusText || errorMessage
		}
	} else if (error instanceof Error) {
		errorMessage = error.message
		if (error.message.includes("NetworkError")) {
			errorMessage =
				"Não foi possível conectar. Verifique sua conexão com a internet."
			toast.error("Erro de rede", {
				description: "Por favor, verifique sua conexão.",
			})
		}
	}

	if (shouldReport) {
		sentryCaptureException(
			error instanceof Error ? error : new Error(errorMessage)
		)
	}

	return (
		<DefaultErrorFallback
			error={error instanceof Error ? error : new Error(errorMessage)}
			onReset={() => window.location.reload()}
		/>
	)
}
