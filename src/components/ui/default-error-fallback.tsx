import { Button } from "@/components/ui/button"

interface DefaultErrorFallbackProps {
	error: Error | null
	onReset: () => void
}

export function DefaultErrorFallback({
	error,
	onReset,
}: DefaultErrorFallbackProps) {
	return (
		<div className="flex min-h-[400px] flex-col items-center justify-center p-8 text-center">
			<h2 className="mb-2 font-semibold text-2xl text-neutral-900">
				Algo deu errado
			</h2>
			<p className="mb-6 max-w-md text-neutral-600">
				{error?.message || "Ocorreu um erro inesperado. Tente novamente."}
			</p>
			<Button onClick={onReset} variant="primary">
				Tentar Novamente
			</Button>
		</div>
	)
}
