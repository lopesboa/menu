import { useId } from "react"
import { cn } from "@/utils/misc"
import { Input, type InputProps } from "./ui/input"

export type ListOfErrors = Array<string | null | undefined> | null | undefined
export function ErrorList({
	id,
	errors,
}: {
	errors: ListOfErrors
	id?: string
}) {
	const errorsToRender = errors?.filter(Boolean)

	if (!errorsToRender?.length) {
		return null
	}

	return (
		<ul className="flex flex-col gap-1" id={id}>
			{errorsToRender.map((error) => (
				<li
					className="text-[10px] text-foreground-destructive text-red-700"
					key={error}
				>
					{error}
				</li>
			))}
		</ul>
	)
}

export function Field({
	inputProps,
	errors,
	className,
	label,
}: {
	inputProps: InputProps
	errors?: ListOfErrors
	className?: string
	label: string
}) {
	const fallbackId = useId()
	const id = inputProps.id ?? fallbackId
	const hasErrors = errors?.filter(Boolean).length
	const errorId = hasErrors ? `${id}-error` : undefined

	return (
		<div className={cn("space-y-2", className)}>
			<span className="font-medium text-slate-300 text-sm">{label}</span>
			<Input
				aria-describedby={errorId}
				aria-invalid={errorId ? true : undefined}
				className={cn(
					"mt-1 w-full rounded-lg border border-white/10 bg-black/50 px-10 py-2.5 text-sm text-white transition-all placeholder:text-slate-600 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/50",
					errorId ? "border-red-400" : undefined
				)}
				id={id}
				{...inputProps}
			/>

			{errorId ? <ErrorList errors={errors} id={errorId} /> : null}
		</div>
	)
}
