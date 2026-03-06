# Frontend Architecture

## Objetivo

Definir a arquitetura alvo do frontend para reduzir acoplamento, padronizar
decisoes e acelerar entrega com menor risco.

## Estrutura alvo

```text
src/
  app/
    bootstrap/          # providers, inicializacao, app shell
    router/             # manifesto unico de rotas e guards
    store/              # estado global realmente cross-domain
  domains/
    auth/
      api/
      hooks/
      routes/
      types/
      ui/
    dashboard/
      routes/
      ui/
    orders/
      api/
      hooks/
      store/
      types/
      ui/
    tables/
      api/
      hooks/
      store/
      types/
      ui/
    menu/
      api/
      hooks/
      types/
      ui/
  shared/
    ui/                 # design system
    hooks/              # hooks reutilizaveis sem regra de negocio
    lib/                # client, sentry, analytics
    services/           # adaptadores genericos
    types/              # contratos cross-domain
    utils/
```

## Regras de dependencia

- `app/*` pode importar `domains/*` e `shared/*`.
- `domains/*` pode importar apenas `shared/*`.
- `domains/*` NAO pode importar outro dominio diretamente.
- Integracao entre dominios deve ocorrer via `app/router` ou contratos em
  `shared/types`.
- `shared/*` nao pode importar `app/*` nem `domains/*`.

## Convencoes

### Naming

- Arquivos em kebab-case.
- Store: `*-store.ts`.
- Hook: `use-*.ts` para padrao interno de arquivo.
- Tipos de dominio em `domains/<dominio>/types`.
- Tipos transversais apenas em `shared/types`.

### Imports

- Preferir aliases (`@/`) em vez de caminhos relativos profundos.
- Evitar barrel em dominio quando esconder dependencia real.
- Um modulo nao deve importar arquivo privado de outro modulo.

## Mapa de migracao (origem -> destino)

- `src/app/routes/auth/*` -> `src/domains/auth/routes/*`
- `src/app/routes/dashboard/*` -> `src/domains/dashboard/routes/*`
- `src/app/routes/dashboard/pages/orders.tsx` ->
  `src/domains/orders/ui/pages/orders-page.tsx`
- `src/app/routes/dashboard/pages/kitchen.tsx` ->
  `src/domains/orders/ui/pages/kitchen-page.tsx`
- `src/app/routes/dashboard/pages/delivery.tsx` ->
  `src/domains/orders/ui/pages/delivery-page.tsx`
- `src/app/routes/dashboard/pages/tables.tsx` ->
  `src/domains/tables/ui/pages/tables-page.tsx`
- `src/components/sections/*` -> `src/domains/dashboard/ui/sections/*` (quando
  funcionalidade de dashboard) ou `src/shared/ui/sections/*` (quando generico)
- `src/hooks/use-orders.ts` -> `src/domains/orders/hooks/use-orders.ts`
- `src/hooks/use-order-actions.ts` ->
  `src/domains/orders/hooks/use-order-actions.ts`
- `src/hooks/use-tables.ts` -> `src/domains/tables/hooks/use-tables.ts`
- `src/hooks/use-products.ts` -> `src/domains/menu/hooks/use-products.ts`
- `src/hooks/use-categories.ts` ->
  `src/domains/menu/hooks/use-categories.ts`
- `src/services/orders-service.ts` -> `src/domains/orders/api/orders-api.ts`
- `src/services/tables-service.ts` -> `src/domains/tables/api/tables-api.ts`
- `src/services/products-service.ts` -> `src/domains/menu/api/products-api.ts`
- `src/services/category-service.ts` -> `src/domains/menu/api/categories-api.ts`
- `src/app/store/auth-store.ts` -> `src/domains/auth/store/auth-store.ts`
- `src/app/store/billing-store.ts` -> `src/domains/billing/store/billing-store.ts`
- `src/app/store/restaurant-store.ts` ->
  `src/domains/restaurant/store/restaurant-store.ts`
- `src/app/store/order-store.ts` -> `src/domains/orders/model/order-store.ts`
- `src/app/store/cart-store.ts` -> `src/domains/pos/store/cart-store.ts`
- `src/app/store/table-store.ts` -> `src/domains/tables/store/table-store.ts`
- `src/app/store/menu-store.ts` -> `src/domains/menu/store/menu-store.ts`
- `src/app/store/notification-store.ts` ->
  `src/domains/notifications/store/notification-store.ts`
- `src/app/store/stepper-store.ts` ->
  `src/domains/onboarding/store/stepper-store.ts`
- `src/app/store/dialog.ts` -> `src/app/store/dialog.ts` (cross-domain)
- `src/app/store/theme-store.ts` -> `src/app/store/theme-store.ts` (cross-domain)
- `src/types/orders.ts` -> `src/domains/orders/types/orders.ts`
- `src/types/dashboard.ts` ->
  `src/domains/*/types/*` + `src/shared/types/dashboard-common.ts`
- `src/lib/*` -> `src/shared/lib/*`
- `src/utils/*` -> `src/shared/utils/*`

## Fases de execucao

1. Publicar arquitetura alvo e ADR (esta entrega).
2. Unificar manifesto de rotas e navegacao.
3. Padronizar naming/imports e mover stores por dominio.
4. Migrar dominios (orders, tables, menu/categories).
5. Adicionar guardrails de arquitetura no CI.

## Guardrails no CI

- Comando: `pnpm architecture:check`.
- Workflow: `.github/workflows/ci.yml` executa build, check e guardrails em PRs.
- `biome.json` aplica `noRestrictedImports` em `src/domains` e `src/shared`
  para evitar imports proibidos por camada.
- Falhas cobertas:
  - boundary entre `app/domains/shared`
  - ciclos arquiteturais entre modulos monitorados
  - naming em arquivos-chave (`kebab-case`, `*-store`, `use-*` em domains)
- Excecoes temporarias devem ser registradas em
  `scripts/architecture-guardrails-exceptions.json` e revisadas no PR.
- Excecoes temporarias no Biome devem ficar explicitas em `overrides` com escopo
  minimo e plano de remocao.

## Plano de rollback

- Migrar por lotes pequenos e com PRs atomicos.
- Manter adaptadores temporarios para imports legados durante transicao.
- Enquanto houver consumo legado, manter adaptadores em `src/app/store/*-store.ts`.
- Reverter por modulo (nao rollback global) em caso de regressao.

## Checklist de PR (arquitetura)

- [ ] O modulo novo respeita as fronteiras `app/domains/shared`.
- [ ] Nao ha import cruzado entre dominios.
- [ ] Naming e caminhos seguem convencoes definidas.
- [ ] Nenhum novo tipo transversal foi adicionado fora de `shared/types`.
- [ ] Mapa de migracao foi atualizado quando houve movimentacao de arquivos.
