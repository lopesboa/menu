import { create } from "zustand"

type StepperActions = {
	setCurrentStep: (step: number) => void
	setTotalSteps: (total: number) => void
	goToNext: () => void
	goToPrevious: () => void
	reset: () => void
	isFirst: () => boolean
	isLast: () => boolean
}

type StepperStore = {
	currentStep: number
	totalSteps: number
	actions: StepperActions
}

export const useStepperStore = create<StepperStore>((set, get) => ({
	currentStep: 1,
	totalSteps: 0,
	actions: {
		setCurrentStep: (step) => set({ currentStep: step }),
		setTotalSteps: (total) => set({ totalSteps: total }),
		goToNext: () => {
			const { currentStep, totalSteps } = get()
			if (currentStep < totalSteps) {
				console.log("currentStep", currentStep, totalSteps)
				set({ currentStep: currentStep + 1 })
			}
		},
		goToPrevious: () => {
			const { currentStep } = get()
			if (currentStep > 1) {
				set({ currentStep: currentStep - 1 })
			}
		},
		reset: () => set({ currentStep: 1 }),
		isFirst: () => get().currentStep === 1,
		isLast: () => get().currentStep === get().totalSteps,
	},
}))

export const useStepper = () => {
	const { totalSteps, currentStep } = useStepperStore((state) => state)

	return {
		currentStep,
		totalSteps,
	}
}

export const useStepperAction = () => {
	const {
		isLast,
		isFirst,
		goToPrevious,
		goToNext,
		reset,
		setTotalSteps,
		setCurrentStep,
	} = useStepperStore((state) => state.actions)

	return {
		isLast,
		isFirst,
		goToPrevious,
		goToNext,
		reset,
		setTotalSteps,
		setCurrentStep,
	}
}
