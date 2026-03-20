# Analytics (Posthog)

Event tracking, attribution and experiment support via Posthog.

## Usage

```typescript
import { usePostHogEvent } from "@/hooks/use-posthog"

const { capture, identify, reset } = usePostHogEvent()

// Track event
capture("button_clicked", { button_name: "login" })

// Identify user (on login)
identify(user.id, { email: user.email })

// Reset on logout
reset()
```

## Typed Events

Use constants from `@/lib/analytics/events`:

```typescript
import { AnalyticsEvents } from "@/lib/analytics/events"
import { usePostHogEvent } from "@/hooks/use-posthog"

const { capture } = usePostHogEvent()

capture(AnalyticsEvents.BUTTON_CLICKED, { button_name: "login" })
```

**Available events:**
- `USER_LOGGED_IN`, `USER_LOGGED_OUT`, `USER_SIGNED_UP`
- `BUTTON_CLICKED`, `LINK_CLICKED`
- `PAGE_VIEWED`
- `FORM_SUBMITTED`, `FORM_ERROR`
- `ERROR_OCCURRED`

## Landing funnel events

The landing must expose a baseline conversion funnel before any copy, SEO or performance experiment ships.

### Required events

- `cta_clicked`
- `demo_opened`
- `demo_started`
- `demo_submitted`
- `demo_success`
- `pricing_plan_selected`
- `register_started`
- `register_completed`

### Required properties

- `page`
- `cta_label`
- `cta_position`
- `landing_variant`
- `plan`
- `restaurant_type`
- `units`
- `referrer`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`

### Event rules

- Every funnel event must fire once per user action.
- `cta_clicked` is mandatory for every primary and secondary CTA on the landing.
- `demo_started` should only fire after the user begins a real lead flow.
- `demo_success` should only fire on confirmed success state, not on button click.
- `register_completed` should be emitted only after the account creation success state.
- Properties must keep stable names across pages, variants and future SEO landings.

## Attribution and experiments

- Persist `utm_*` and `referrer` across the first landing session whenever possible.
- Include `landing_variant` in hero, CTA and conversion events for A/B tests.
- When testing different above-the-fold narratives, keep event names fixed and vary only the variant property.
- If a landing page is dedicated to a segment or integration, include a stable page identifier in every event.

## QA checklist for landing analytics

- [ ] Home pageview captured in production.
- [ ] Every visible CTA emits `cta_clicked` with `cta_label` and `cta_position`.
- [ ] Demo modal emits `demo_opened`, `demo_started`, `demo_submitted` and `demo_success` in the correct order.
- [ ] Signup flow emits `register_started` and `register_completed`.
- [ ] UTM parameters are preserved in the main conversion events.
- [ ] Events are typed and centralized, not scattered as raw strings.
- [ ] Event payloads are documented before running experiments.

## Feature Flags

Use typed feature flags from `@/lib/analytics/feature-flags`:

```typescript
import { FeatureFlags, useFeatureFlag } from "@/lib/analytics/feature-flags"

const isEnabled = useFeatureFlag(FeatureFlags.NEW_DASHBOARD)
```

## Best Practices

- Use snake_case for event names: `button_clicked` (not camelCase)
- Always include relevant properties: `{ button_name: "login", page: "auth" }`
- Identify user after login: `identify(user.id, { email: user.email })`
- Reset on logout: `reset()`
- Use typed events from `AnalyticsEvents` instead of magic strings
- Use typed flags from `FeatureFlags` instead of raw strings
- Prefer one event schema per user action, not multiple near-duplicates
- Do not ship CTA or funnel changes without analytics QA
- Capture experiment context in properties, not in ad-hoc event names

## Provider

Posthog provider runs in production only. Page leave events are captured automatically.
