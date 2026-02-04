import { useStepper } from "@/app/store/stepper-store"
import { cn } from "@/utils/misc"

type StepContentProps = React.ComponentProps<"div"> & {
	step: number
}

export function StepContent({ step, className, ...props }: StepContentProps) {
	const { currentStep } = useStepper()

	if (currentStep !== step) {
		return null
	}

	return (
		<div
			className={cn("fade-in animate-in duration-300")}
			data-slot="stepper-content"
			{...props}
		/>
	)
}
