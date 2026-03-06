export const authRouteSegments = {
	login: "login",
	register: "register",
	forgot: "forgot",
	verify: "verify",
	changePassword: "change-password",
} as const

export const authRoutePaths = {
	login: `/${authRouteSegments.login}`,
	register: `/${authRouteSegments.register}`,
	forgot: `/${authRouteSegments.forgot}`,
	verify: `/${authRouteSegments.verify}`,
	changePassword: `/${authRouteSegments.changePassword}`,
	dashboardHome: "/dashboard",
} as const

export function sanitizeAuthRedirectPath(
	redirectTo: string | null | undefined,
	fallback: string = authRoutePaths.dashboardHome
) {
	if (!redirectTo) {
		return fallback
	}

	if (!redirectTo.startsWith("/") || redirectTo.startsWith("//")) {
		return fallback
	}

	return redirectTo
}

export function getLoginPathWithRedirect(redirectTo: string) {
	const safeRedirect = sanitizeAuthRedirectPath(redirectTo)
	const params = new URLSearchParams({ redirectTo: safeRedirect })

	return `${authRoutePaths.login}?${params.toString()}`
}
