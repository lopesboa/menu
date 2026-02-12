import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"

export function AuthErrorPage() {
	const navigate = useNavigate()

	const handleLogin = () => {
		navigate("/login")
	}

	return (
		<div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
			<h1 className="mb-4 font-bold text-4xl text-neutral-900">
				Sessão Expirada
			</h1>
			<p className="mb-8 max-w-md text-lg text-neutral-600">
				Sua sessão expirou. Por favor, faça login novamente para continuar.
			</p>
			<Button onClick={handleLogin} variant="primary">
				Fazer Login
			</Button>
		</div>
	)
}
