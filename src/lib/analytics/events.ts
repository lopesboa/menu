export const AnalyticsEvents = {
	USER_LOGGED_IN: "user_logged_in",
	USER_LOGGED_OUT: "user_logged_out",
	USER_SIGNED_UP: "user_signed_up",

	BUTTON_CLICKED: "button_clicked",
	LINK_CLICKED: "link_clicked",

	PAGE_VIEWED: "page_viewed",

	FORM_SUBMITTED: "form_submitted",
	FORM_ERROR: "form_error",

	ERROR_OCCURRED: "error_occurred",
} as const

export type AnalyticsEvent =
	(typeof AnalyticsEvents)[keyof typeof AnalyticsEvents]
