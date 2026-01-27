import { Icon } from "@iconify-icon/react"
import { cn } from "@/utils/misc"

type Step = {
	label: string
}

type StepperProps = {
	steps: Step[]
	currentStep: number
	onStepClick?: (index: number) => void
}

export function Stepper({ steps, currentStep, onStepClick }: StepperProps) {
	const handleStepClick = (index: number) => {
		if (onStepClick) {
			onStepClick(index)
		}
	}

	return (
		<div className="flex items-center w-full select-none">
			{steps.map((step, index) => {
				const stepNumber = index + 1
				const isCompleted = stepNumber < currentStep
				const isActive = stepNumber === currentStep
				const isUpcoming = stepNumber > currentStep
				const isLast = index === steps.length - 1

				return (
					<div
						key={step.label}
						className="flex items-center flex-1 last:flex-initial"
					>
						<button
							type="button"
							className="flex items-center gap-3 relative z-10 group cursor-pointer"
							onClick={() => handleStepClick(stepNumber)}
						>
							<div
								className={cn(
									"w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold border-2 transition-all duration-300",
									isCompleted && "bg-indigo-500 border-indigo-500 text-white",
									isActive &&
										"bg-indigo-500/10 border-indigo-500 text-indigo-400",
									isUpcoming && "border-slate-700 text-slate-500 bg-[#0f1115]",
								)}
							>
								{isCompleted ? (
									<Icon icon="lucide:check" className="text-white" width="14" />
								) : (
									<span>{stepNumber}</span>
								)}
							</div>

							<span
								className={cn(
									"text-xs font-medium transition-colors duration-300",
									(isCompleted || isActive) && "text-indigo-400",
									isUpcoming && "text-slate-500",
								)}
							>
								{step.label}
							</span>
						</button>

						{!isLast && (
							<div className="flex-1 h-px bg-slate-800/80 mx-4 relative rounded-full overflow-hidden">
								<div
									className={cn(
										"absolute left-0 top-0 h-full bg-indigo-500 transition-all duration-300",
										stepNumber < currentStep ? "w-full" : "w-0",
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
