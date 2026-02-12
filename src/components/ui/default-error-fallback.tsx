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
		<div className="flex min-h-screen flex-col items-center justify-center p-8 text-center">
			<h2 className="mb-2 font-semibold text-2xl text-white/80">
				Algo deu errado
			</h2>
			<p className="mb-6 max-w-md text-neutral-600">
				{error?.message || "Ocorreu um erro inesperado. Tente novamente."}
			</p>
			<Button
				className="px-10"
				fullWidth={false}
				onClick={onReset}
				variant="primary"
			>
				Tentar Novamente
			</Button>
		</div>
	)
}
