# React Patterns

Function components only - no class components.

## Zustand State Management

```typescript
// Pattern: Export custom hooks, separate state from actions
const useStore = create<State>()(...)

// State selector hook (atomic selectors)
export const useAuth = () => {
  const user = useAuthStore((state) => state.user)
  return { user }
}

// Actions hook
export const useAuthAction = () => {
  const login = useAuthStore((state) => state.login)
  return { login }
}
```

## Component Structure

- Props interface ends with `Props` suffix
- Use `type` for component props, `interface` for state
- Destructure props in function parameters
- Use `cn()` from `@/utils/misc` for class merging

## Hooks Rules

- Call hooks at top level only, never conditionally
- Specify all dependencies in useEffect/useCallback
- Use `for...of` over `.forEach()`
- Prefer `async/await` over promise chains
