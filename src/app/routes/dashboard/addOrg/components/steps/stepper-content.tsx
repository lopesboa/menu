import { useStepper } from "@/app/store/stepper-store"
import { cn } from "@/utils/misc"

type StepContentProps = React.ComponentProps<"div"> & {
	step: number
}

export function StepContent({ step, className, ...props }: StepContentProps) {
	const { currentStep } = useStepper()

	if (currentStep !== step) return null

	return (
		<div
			data-slot="stepper-content"
			className={cn("animate-in fade-in duration-300")}
			{...props}
		/>
	)
}
