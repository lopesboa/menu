import { cn } from "@/utils/misc"

type StepperRootProps = React.ComponentProps<"div"> & {
	// children: ReactNode
	defaultStep?: number
	onStepChange?: (step: number) => void
}

export function StepperRoot({
	defaultStep = 1,
	onStepChange,
	className,
	...props
}: StepperRootProps) {
	return (
		<div
			className={cn("w-full space-y-8", className)}
			data-slot="stepper-root"
			{...props}
		/>
	)
}
