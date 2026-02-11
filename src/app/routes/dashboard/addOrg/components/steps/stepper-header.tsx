import { Icon } from "@iconify-icon/react"
import { useEffect } from "react"
import { useStepper, useStepperAction } from "@/app/store/stepper-store"
import { cn } from "@/utils/misc"

interface Step {
	label: string
}

interface StepperHeaderProps {
	steps: Step[]
	allowClickNavigation?: boolean
}

export function StepperHeader({
	steps,
	allowClickNavigation = true,
}: StepperHeaderProps) {
	const { setCurrentStep, setTotalSteps } = useStepperAction()
	const { currentStep } = useStepper()

	useEffect(() => {
		setTotalSteps(steps.length)
	}, [steps.length, setTotalSteps])

	const handleStepClick = (index: number) => {
		if (allowClickNavigation) {
			setCurrentStep(index)
		}
	}

	return (
		<div
			className="flex w-full select-none items-center"
			data-slot="stepper-header"
		>
			{steps.map((step, index) => {
				const stepNumber = index + 1
				const isCompleted = stepNumber < currentStep
				const isActive = stepNumber === currentStep
				const isUpcoming = stepNumber > currentStep
				const isLast = index === steps.length - 1

				return (
					<div
						className="flex flex-1 items-center last:flex-initial"
						key={step.label}
					>
						<button
							className={cn(
								"group relative z-10 flex items-center gap-3",
								allowClickNavigation ? "cursor-pointer" : "cursor-default"
							)}
							disabled={!allowClickNavigation}
							onClick={() => handleStepClick(stepNumber)}
							type="button"
						>
							<div
								className={cn(
									"flex h-7 w-7 items-center justify-center rounded-full border-2 font-semibold text-[11px] transition-all duration-300",
									isCompleted && "border-indigo-500 bg-indigo-500 text-white",
									isActive &&
										"border-indigo-500 bg-indigo-500/10 text-indigo-400",
									isUpcoming && "border-slate-700 bg-[#0f1115] text-slate-500"
								)}
							>
								{isCompleted ? (
									<Icon className="text-white" icon="lucide:check" width="14" />
								) : (
									<span>{stepNumber}</span>
								)}
							</div>
							<span
								className={cn(
									"font-medium text-xs transition-colors duration-300",
									(isCompleted || isActive) && "text-indigo-400",
									isUpcoming && "text-slate-500"
								)}
							>
								{step.label}
							</span>
						</button>
						{!isLast && (
							<div className="relative mx-4 h-px flex-1 overflow-hidden rounded-full bg-slate-800/80">
								<div
									className={cn(
										"absolute top-0 left-0 h-full bg-indigo-500 transition-all duration-300",
										stepNumber < currentStep ? "w-full" : "w-0"
									)}
								/>
							</div>
						)}
					</div>
				)
			})}
		</div>
	)
}
