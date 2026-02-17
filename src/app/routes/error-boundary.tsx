import { isRouteErrorResponse, useRouteError } from "react-router"
import { toast } from "sonner"
import { DefaultErrorFallback } from "@/components/ui/default-error-fallback"
import { sentryCaptureException } from "@/lib/sentry"
import { AuthErrorPage } from "./error-pages/auth-error"

export function RouteErrorBoundary() {
	const error = useRouteError()

	if (isRouteErrorResponse(error)) {
		if (error.status === 401 || error.status === 403) {
			toast.error("Sessão expirada", {
				description: "Por favor, faça login para continuar.",
			})
			return <AuthErrorPage />
		}

		if (error.status === 404) {
			return (
				<DefaultErrorFallback
					error={new Error("A página que você procura não existe.")}
					onReset={() => window.location.reload()}
				/>
			)
		}

		if (error.status >= 500) {
			toast.error("Erro no servidor")
			sentryCaptureException(error)
			return (
				<DefaultErrorFallback
					error={
						new Error(
							"Erro no servidor. Por favor, tente novamente mais tarde."
						)
					}
					onReset={() => window.location.reload()}
				/>
			)
		}
	}

	if (error instanceof Error) {
		if (error.message.includes("NetworkError")) {
			toast.error("Erro de rede", {
				description: "Por favor, verifique sua conexão.",
			})
			return (
				<DefaultErrorFallback
					error={
						new Error(
							"Não foi possível conectar. Verifique sua conexão com a internet."
						)
					}
					onReset={() => window.location.reload()}
				/>
			)
		}

		sentryCaptureException(error)
		return (
			<DefaultErrorFallback
				error={error}
				onReset={() => window.location.reload()}
			/>
		)
	}

	sentryCaptureException(new Error(String(error)))
	return (
		<DefaultErrorFallback
			error={new Error("Ocorreu um erro inesperado.")}
			onReset={() => window.location.reload()}
		/>
	)
}
