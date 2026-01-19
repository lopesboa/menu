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

	if (!errorsToRender?.length) return null

	return (
		<ul id={id} className="flex flex-col gap-1">
			{errorsToRender.map((error) => (
				<li
					key={error}
					className="text-[10px] text-foreground-destructive text-red-700"
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
			<span className="text-sm font-medium text-slate-300">{label}</span>
			<Input
				id={id}
				aria-invalid={errorId ? true : undefined}
				aria-describedby={errorId}
				className={cn(
					"w-full mt-1 bg-black/50 border border-white/10 rounded-lg px-10 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all",
					errorId ? "border-red-400" : undefined,
				)}
				{...inputProps}
			/>

			{errorId ? <ErrorList id={errorId} errors={errors} /> : null}
		</div>
	)
}
