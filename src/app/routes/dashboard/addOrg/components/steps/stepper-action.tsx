import { cn } from "@/utils/misc"

export function StepperActions({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="stepper-action"
			className={cn(
				"max-w-150 mx-auto p-4 sm:p-0 flex justify-between items-center",
				className,
			)}
			{...props}
		/>
	)
}
