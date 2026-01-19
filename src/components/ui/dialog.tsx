import type { PropsWithChildren } from "react"
import { useDialog } from "@/app/store/dialog"
import { cn } from "@/utils/misc"

export type DialogProps = PropsWithChildren & {
	className?: string
	id: string
}

export function Dialog({ children, className, id }: DialogProps) {
	const { dialogs } = useDialog()
	const openDialog = dialogs[id]

	return (
		<div
			id="auth-modal"
			className={cn(
				"fixed inset-0 z-100",
				className,
				!openDialog ? " hidden" : "",
			)}
			aria-labelledby={id}
			role="dialog"
			aria-modal="true"
		>
			<div
				className={cn(
					"absolute inset-0 bg-black/95 transition-opacity duration-300",
					!openDialog ? "opacity-0" : "",
				)}
				id="auth-modal-backdrop"
			></div>

			<div className="relative min-h-screen flex items-center justify-center p-4">
				{children}
			</div>
		</div>
	)
}
