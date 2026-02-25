# Error Handling

- Remove `console.log`, `debugger` before committing
- Use `toast.error()` from sonner for user-facing errors
- **ALWAYS pair `toast.error()` with `sentryCaptureException()`** - user-facing errors must be tracked
- Throw `Error` objects with descriptive messages
- Handle async errors with try-catch in actions

**Required Pattern:**

```typescript
import { toast } from "sonner"
import { sentryCaptureException } from "@/lib/sentry"

try {
  await riskyOperation()
} catch (err) {
  toast.error("Algo deu errado ao processar sua solicitação")
  sentryCaptureException(err, { context: "operation_name" })
}
```

## Security

- Add `rel="noopener"` on `target="_blank"` links
- Never use `dangerouslySetInnerHTML` unless necessary
- Validate user input with Zod schemas
- Use auth middleware for protected routes

## Sentry (Error Tracking & Performance)

Import from `@/lib/sentry`:

- `sentryCaptureException(error, context?)` - Capture exceptions
- `sentrySetUser(user)` - Set user context (call on login/logout)
- `sentryAddBreadcrumb(category, message, data?)` - Add breadcrumbs for tracing

**Usage:**

```typescript
import { sentryCaptureException, sentrySetUser, sentryAddBreadcrumb } from "@/lib/sentry"

// Capture errors
try {
  await someOperation()
} catch (err) {
  sentryCaptureException(err, { context: "user_action" })
}

// Track user (on login)
sentrySetUser({ id: user.id })

// Add breadcrumbs for debugging
sentryAddBreadcrumb("auth", "User logged in", { method: "password" })
```

**Already configured:**
- Traces enabled (100% sample rate in dev)
- Session replay on errors
- Environment auto-detected from Vite MODE
