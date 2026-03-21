export const AnalyticsEvents = {
	USER_LOGGED_IN: "user_logged_in",
	USER_LOGGED_OUT: "user_logged_out",
	USER_SIGNED_UP: "user_signed_up",

	BUTTON_CLICKED: "button_clicked",
	LINK_CLICKED: "link_clicked",

	PAGE_VIEWED: "page_viewed",
	CTA_CLICKED: "cta_clicked",
	DEMO_OPENED: "demo_opened",
	DEMO_STARTED: "demo_started",
	DEMO_SUBMITTED: "demo_submitted",
	DEMO_SUCCESS: "demo_success",
	PRICING_PLAN_SELECTED: "pricing_plan_selected",
	REGISTER_STARTED: "register_started",
	REGISTER_COMPLETED: "register_completed",

	FORM_SUBMITTED: "form_submitted",
	FORM_ERROR: "form_error",

	ERROR_OCCURRED: "error_occurred",
} as const

export type AnalyticsEvent =
	(typeof AnalyticsEvents)[keyof typeof AnalyticsEvents]
