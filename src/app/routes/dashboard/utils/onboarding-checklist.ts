export const DASHBOARD_ONBOARDING_STEP_KEYS = [
	"menu",
	"settings",
	"billing",
] as const

export type DashboardOnboardingStepKey =
	(typeof DASHBOARD_ONBOARDING_STEP_KEYS)[number]

export interface DashboardOnboardingChecklist {
	createdAt: string
	dismissedAt: string | null
	name: string
	slug: string
	steps: Record<DashboardOnboardingStepKey, string | null>
}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null
}

export function createDashboardOnboardingChecklist(data: {
	name: string
	slug: string
}): DashboardOnboardingChecklist {
	return {
		createdAt: new Date().toISOString(),
		dismissedAt: null,
		name: data.name,
		slug: data.slug,
		steps: {
			billing: null,
			menu: null,
			settings: null,
		},
	}
}

export function readDashboardOnboardingChecklistFromMetadata(
	metadata: unknown
): DashboardOnboardingChecklist | null {
	if (!isRecord(metadata)) {
		return null
	}

	const checklist = metadata.onboardingChecklist

	if (!isRecord(checklist)) {
		return null
	}

	if (
		typeof checklist.createdAt !== "string" ||
		typeof checklist.name !== "string" ||
		typeof checklist.slug !== "string"
	) {
		return null
	}

	const dismissedAt =
		typeof checklist.dismissedAt === "string" ? checklist.dismissedAt : null

	const stepsSource = isRecord(checklist.steps) ? checklist.steps : {}

	return {
		createdAt: checklist.createdAt,
		dismissedAt,
		name: checklist.name,
		slug: checklist.slug,
		steps: {
			billing:
				typeof stepsSource.billing === "string" ? stepsSource.billing : null,
			menu: typeof stepsSource.menu === "string" ? stepsSource.menu : null,
			settings:
				typeof stepsSource.settings === "string" ? stepsSource.settings : null,
		},
	}
}

export function completeDashboardOnboardingStep(
	checklist: DashboardOnboardingChecklist,
	step: DashboardOnboardingStepKey
): DashboardOnboardingChecklist {
	if (checklist.steps[step]) {
		return checklist
	}

	return {
		...checklist,
		steps: {
			...checklist.steps,
			[step]: new Date().toISOString(),
		},
	}
}

export function dismissDashboardOnboardingChecklist(
	checklist: DashboardOnboardingChecklist
): DashboardOnboardingChecklist {
	return {
		...checklist,
		dismissedAt: new Date().toISOString(),
	}
}

export function countCompletedDashboardOnboardingSteps(
	checklist: DashboardOnboardingChecklist
) {
	return DASHBOARD_ONBOARDING_STEP_KEYS.filter((step) => checklist.steps[step])
		.length
}
