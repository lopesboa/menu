# ADR 0001 - Estrutura modular frontend

## Status

Aceito

## Contexto

O projeto cresceu com organizacao mista entre `app/routes`, `hooks`,
`services`, `components`, `types` e `store`, gerando:

- baixa previsibilidade de ownership por dominio;
- dependencia cruzada dificil de rastrear;
- maior custo para refactor e onboarding.

## Decisao

Adotar arquitetura por fronteiras explicitas:

- `app`: composicao global (bootstrap, router, estado global cross-domain).
- `domains`: regra e implementacao por dominio (api, hooks, store, types, ui).
- `shared`: reutilizacao transversal sem regra de negocio.

## Alternativas avaliadas

1. Manter estrutura atual e apenas padronizar nomes.
   - Pro: menor esforco imediato.
   - Contra: acoplamento estrutural permanece.

2. Estrutura 100% por tipo tecnico (components/hooks/services/types).
   - Pro: simples no inicio.
   - Contra: ownership de negocio difuso em medio prazo.

3. Estrutura por dominio com camada shared (decisao escolhida).
   - Pro: ownership claro, evolucao previsivel, menor impacto colateral.
   - Contra: migracao inicial demanda disciplina de boundaries.

## Consequencias

### Positivas

- Menor risco de regressao por alteracao local.
- Melhor rastreabilidade de dependencias por dominio.
- Facilita guardrails automaticos no CI.

### Negativas

- Custo inicial de migracao de imports e arquivos.
- Curva de adaptacao do time para novas regras.

## Plano de adocao

- Aplicacao incremental por modulo, sem big-bang.
- PRs pequenos com checklist arquitetural obrigatorio.
- Adaptadores temporarios durante transicao para reduzir quebra.
