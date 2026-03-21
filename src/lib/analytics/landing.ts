const landingAttributionKey = "menu-bao:landing-attribution"
const landingRegisterIntentKey = "menu-bao:landing-register-intent"

const landingVariant = "control"
const landingPage = "home"
const defaultRestaurantType = "geral"

interface LandingAttribution {
	referrer: string
	utm_campaign: string
	utm_content: string
	utm_medium: string
	utm_source: string
	utm_term: string
}

export interface LandingEventProperties extends LandingAttribution {
	cta_label: string
	cta_position: string
	landing_variant: string
	page: string
	plan?: string
	restaurant_type: string
	units?: string
}

export function persistLandingAttribution() {
	if (typeof window === "undefined") {
		return getEmptyAttribution()
	}

	const stored = readJson<LandingAttribution>(landingAttributionKey)
	if (stored) {
		return stored
	}

	const attribution = collectCurrentAttribution()
	window.sessionStorage.setItem(
		landingAttributionKey,
		JSON.stringify(attribution)
	)

	return attribution
}

export function buildLandingEventProperties(
	overrides: Partial<LandingEventProperties>
): LandingEventProperties {
	const attribution = persistLandingAttribution()

	return {
		...attribution,
		cta_label: "",
		cta_position: "",
		landing_variant: landingVariant,
		page: landingPage,
		restaurant_type: defaultRestaurantType,
		...overrides,
	}
}

export function rememberLandingRegisterIntent(
	properties: LandingEventProperties
) {
	if (typeof window === "undefined") {
		return
	}

	window.sessionStorage.setItem(
		landingRegisterIntentKey,
		JSON.stringify(properties)
	)
}

export function consumeLandingRegisterIntent() {
	if (typeof window === "undefined") {
		return null
	}

	const intent = readJson<LandingEventProperties>(landingRegisterIntentKey)
	window.sessionStorage.removeItem(landingRegisterIntentKey)

	return intent
}

function collectCurrentAttribution(): LandingAttribution {
	if (typeof window === "undefined") {
		return getEmptyAttribution()
	}

	const params = new URLSearchParams(window.location.search)

	return {
		referrer: document.referrer,
		utm_campaign: params.get("utm_campaign") ?? "",
		utm_content: params.get("utm_content") ?? "",
		utm_medium: params.get("utm_medium") ?? "",
		utm_source: params.get("utm_source") ?? "",
		utm_term: params.get("utm_term") ?? "",
	}
}

function getEmptyAttribution(): LandingAttribution {
	return {
		referrer: "",
		utm_campaign: "",
		utm_content: "",
		utm_medium: "",
		utm_source: "",
		utm_term: "",
	}
}

function readJson<T>(key: string): T | null {
	if (typeof window === "undefined") {
		return null
	}

	const value = window.sessionStorage.getItem(key)
	if (!value) {
		return null
	}

	try {
		return JSON.parse(value) as T
	} catch {
		return null
	}
}
