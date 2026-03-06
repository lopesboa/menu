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

## Stores Zustand

- Nome canonico de exports de leitura: `use<Domain>Selectors`.
- Nome canonico de exports de escrita: `use<Domain>Actions`.
- Durante migracao, aliases legados (`useAuth`, `useAuthAction`, etc.) podem
  existir apenas em adaptadores de compatibilidade.

## Branches e PRs

- Padrao de branch: `issueNumber/descricao-curta`.
- Nao usar apenas `issueNumber/` como nome de branch.
- Exemplo correto para multiplas PRs na mesma issue:
  - `37/updates_orders_query_keys`
  - `37/updates_orders_ui_states`
- Preferir PRs pequenas e sequenciais para a mesma issue quando necessario.
