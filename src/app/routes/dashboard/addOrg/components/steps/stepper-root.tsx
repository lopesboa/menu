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
			data-slot="stepper-root"
			className={cn("w-full space-y-8", className)}
			{...props}
		/>
	)
}
