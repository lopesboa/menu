# Analytics (Posthog)

Event tracking and feature flags via Posthog.

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

## Provider

Posthog provider runs in production only. Page leave events are captured automatically.
