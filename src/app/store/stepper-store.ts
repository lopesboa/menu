import {
	useStepper as domainUseStepper,
	useStepperAction as domainUseStepperAction,
	useStepperActions as domainUseStepperActions,
	useStepperSelectors as domainUseStepperSelectors,
	useStepperStore as domainUseStepperStore,
} from "@/domains/onboarding/store/stepper-store"

export const useStepperStore = domainUseStepperStore
export const useStepperSelectors = domainUseStepperSelectors
export const useStepperActions = domainUseStepperActions

export const useStepper = domainUseStepper
export const useStepperAction = domainUseStepperAction
