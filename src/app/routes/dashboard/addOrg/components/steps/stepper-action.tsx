import { cn } from "@/utils/misc"

export function StepperActions({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"mx-auto flex max-w-150 items-center justify-between p-4 sm:p-0",
				className
			)}
			data-slot="stepper-action"
			{...props}
		/>
	)
}
