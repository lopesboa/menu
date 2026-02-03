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
			fullWidth={false}
			type="button"
			className="group bg-slate-900 text-white pl-8 pr-6 py-3.5 rounded-xl text-sm font-medium shadow-xl shadow-slate-900/20 hover:bg-slate-800 hover:shadow-2xl hover:shadow-slate-900/30 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-3 cursor-pointer"
			onClick={handleClick}
		>
			<span>{children}</span>
			<Icon
				icon="solar:arrow-right-linear"
				width="18"
				className="group-hover:translate-x-1 transition-transform"
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
			fullWidth={false}
			variant="ghost"
			type="button"
			className={cn(
				"flex px-4 py-2 rounded-lg text-sm font-medium text-slate-500  transition-all items-center gap-2 cursor-pointer",
			)}
			onClick={handleClick}
		>
			<Icon icon="solar:arrow-left-linear" width="18" />
			<span>{children}</span>
		</Button>
	)
}
