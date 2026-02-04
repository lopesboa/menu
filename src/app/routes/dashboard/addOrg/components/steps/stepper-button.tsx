import { Icon } from "@iconify-icon/react"
import { useStepperAction } from "@/app/store/stepper-store"
import { Button } from "@/components"
import { cn } from "@/utils/misc"

export function StepperNextButton({
	children,
}: React.ComponentProps<"button">) {
	const { goToNext } = useStepperAction()

	const handleClick = () => {
		goToNext()
	}

	return (
		<Button
			className="group flex transform cursor-pointer items-center gap-3 rounded-xl bg-slate-900 py-3.5 pr-6 pl-8 font-medium text-sm text-white shadow-slate-900/20 shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-2xl hover:shadow-slate-900/30"
			fullWidth={false}
			onClick={handleClick}
			type="button"
		>
			<span>{children}</span>
			<Icon
				className="transition-transform group-hover:translate-x-1"
				icon="solar:arrow-right-linear"
				width="18"
			/>
		</Button>
	)
}

export function StepperPreviousButton({
	children,
}: React.ComponentProps<"button">) {
	const { goToPrevious } = useStepperAction()

	const handleClick = () => {
		goToPrevious()
	}

	return (
		<Button
			className={cn(
				"flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 font-medium text-slate-500 text-sm transition-all"
			)}
			fullWidth={false}
			onClick={handleClick}
			type="button"
			variant="ghost"
		>
			<Icon icon="solar:arrow-left-linear" width="18" />
			<span>{children}</span>
		</Button>
	)
}
