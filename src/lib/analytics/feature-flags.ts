import { useFeatureFlagEnabled } from "posthog-js/react"

export const FeatureFlags = {
	NEW_DASHBOARD: "new_dashboard",
	BETA_FEATURES: "beta_features",
} as const

export function useFeatureFlag(
	flag: (typeof FeatureFlags)[keyof typeof FeatureFlags]
) {
	return useFeatureFlagEnabled(flag) === true
}
