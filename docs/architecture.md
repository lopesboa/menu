# Frontend Architecture

## Objetivo

Documentar a estrutura real do frontend, com paths canonicos para reduzir
duvidas de ownership, diminuir imports legados e acelerar onboarding.

## Estrutura atual (fonte da verdade)

```text
src/
  app/
    constants.ts
    middleware/
      auth-middleware.ts
    routes/
      auth/
      dashboard/
      error-pages/
      home/
      protected-routes.tsx
    store/
      dialog.ts
  components/
    animations/
    layout/
    logos/
    sections/
    ui/
  domains/
    auth/
      store/
    billing/
      store/
      types/
    categories/
      api/
      hooks/
      types/
    menu/
      api/
      hooks/
      store/
      types/
    notifications/
      store/
    onboarding/
      store/
    orders/
      api/
      hooks/
      model/
      store/
      types/
      ui/
    pos/
      store/
    restaurant/
      store/
    tables/
      api/
      hooks/
      model/
      store/
      types/
      ui/
  hooks/
  lib/
  providers/
  services/
  types/
  utils/
```

## Fronteiras de dependencia

- `app/*` pode importar `domains/*`, `components/*`, `hooks/*`, `lib/*`,
  `services/*`, `types/*` e `utils/*`.
- `domains/*` nao importa `app/*`.
- `domains/*` nao cruza import direto entre contextos sem necessidade clara.
- `components/*` e `hooks/*` devem permanecer sem regra de negocio de dominio.
- `app/store/dialog.ts` e o unico estado global compartilhado fora de dominio.

## Paths canonicos por artefato

- **Rotas de autenticacao:** `src/app/routes/auth/*`
- **Rotas de dashboard:** `src/app/routes/dashboard/*`
- **Paginas de dominio ja extraidas:**
  - `src/domains/orders/ui/pages/orders-page.tsx`
  - `src/domains/orders/ui/pages/kitchen-page.tsx`
  - `src/domains/orders/ui/pages/delivery-page.tsx`
  - `src/domains/tables/ui/pages/tables-page.tsx`
- **Stores de dominio:** `src/domains/<dominio>/store/*`
- **Modelos internos de store:** `src/domains/<dominio>/model/*`
- **APIs de dominio:** `src/domains/<dominio>/api/*`
- **Hooks de dominio:** `src/domains/<dominio>/hooks/*`
- **Hooks cross-feature:** `src/hooks/*`
- **Servicos legados ainda ativos:** `src/services/*`

## Limpeza tecnica executada

- Removidos adaptadores legados sem uso em `src/app/store/*`.
- Removido barrel legado `src/hooks/index.ts`.
- Atualizado consumo para import canonico de analytics em
  `src/hooks/use-posthog.ts`.

## Checklist de PR (arquitetura)

- [ ] Artefato novo criado no path canonico correto.
- [ ] Sem reintroduzir wrappers legados em `app/store`.
- [ ] Sem barrel novo para mascarar ownership de dominio.
- [ ] Imports seguem convencoes de `docs/naming.md`.
