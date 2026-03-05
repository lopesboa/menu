# Naming Conventions

## Arquivos

- Usar `kebab-case` para todos os arquivos (`app.tsx`, `use-orders.ts`, `order-store.ts`).
- Stores devem seguir `*-store.ts`.
- Hooks devem seguir `use-*.ts`.

## Identificadores

- Componentes React em `PascalCase` (`Button`, `DashboardHome`).
- Hooks em `camelCase` com prefixo `use` (`useOrders`, `useOrderActions`).
- Utils em `camelCase` (`formatCurrency`, `sanitizeAuthRedirectPath`).
- Types e interfaces em `PascalCase` (`User`, `AuthState`).
