# Naming Conventions

## Arquivos

- Usar `kebab-case` para todos os arquivos.
- Stores devem seguir `*-store.ts`.
- Hooks devem seguir `use-*.ts`.
- Tipos de dominio devem seguir `*.types.ts` quando aplicavel.

## Identificadores

- Componentes React em `PascalCase`.
- Hooks em `camelCase` com prefixo `use`.
- Helpers e utils em `camelCase`.
- Tipos e interfaces em `PascalCase`.

## Estado (Zustand)

- Exports canonicos de leitura: `use<Domain>Selectors`.
- Exports canonicos de escrita: `use<Domain>Actions`.
- Store principal: `use<Domain>Store`.
- Nao criar novos aliases legados (`useAuth`, `useAuthAction`, etc).

## Imports

- Preferir alias absoluto `@/`.
- Importar direto do modulo canonico (ex.: `@/hooks/use-posthog`).
- Nao usar barrel para esconder ownership de modulo.
- Nao criar wrappers de compatibilidade em `src/app/store/*`.

## Branches e PRs

- Padrao de branch: `issueNumber/descricao-curta`.
- Exemplo: `42/limpeza-orfaos-e-docs`.
- Preferir PRs pequenos e com escopo unico.
