import { Link } from "react-router"
import { Button } from "@/components/ui/button"

export function NotFoundPage() {
	return (
		<div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
			<h1 className="mb-4 font-bold text-6xl text-neutral-900">404</h1>
			<p className="mb-8 text-lg text-neutral-600">
				A página que você procura não existe.
			</p>
			<Link to="/">
				<Button variant="primary">Voltar para o início</Button>
			</Link>
		</div>
	)
}
