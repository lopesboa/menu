# Code Style

Formatter and linter configured with Biome/Ultracite.

## Formatter

- Indent: tabs (not spaces)
- Line width: 80 characters
- Quotes: double
- Semicolons: as-needed
- Import organization: enabled with natural sorting

## Linter Rules

- No unused imports/variables (error)
- Use exhaustive dependencies in hooks (warn)
- No parameter reassignment (error)
- Use `as const` assertions (error)
- Use self-closing elements (error)
- Sorted CSS classes with clsx/cva/cn functions (warn)

## Biome Workflow

- Prefer refactoring code to satisfy Biome rules instead of adding suppressions
- Do not introduce `biome-ignore` comments for new work without explicit team approval
- If a change triggers Biome warnings or errors during development, adjust the implementation and rerun `pnpm check`
