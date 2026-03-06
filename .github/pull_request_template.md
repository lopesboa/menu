## Contexto

Descreva o problema de negocio/tecnico que este PR resolve.

## O que mudou

-

## Como validar

1. `pnpm build`
2. `pnpm check`
3. Validacao funcional/manual (descrever)

## Checklist geral

- [ ] Texto user-facing em pt-BR.
- [ ] Sem codigo morto e sem import nao utilizado.
- [ ] Sem alteracao fora do escopo.

## Checklist de arquitetura

- [ ] Respeita fronteiras `app/domains/shared`.
- [ ] Sem import cruzado direto entre dominios.
- [ ] Naming e paths seguem `docs/naming.md` e `docs/architecture.md`.
- [ ] Tipos cross-domain estao em `shared/types`.
- [ ] Quando houve migracao, `docs/architecture.md` foi atualizado.

## Checklist modulo sem mock (quando aplicavel)

- [ ] Sem fallback silencioso para `mock-data` no modulo.
- [ ] Query keys e endpoint segregados por `organizationId`.
- [ ] Estados de loading, vazio, erro e retry implementados.
- [ ] Erros com impacto para usuario tratados com `toast.error` + `sentryCaptureException`.
- [ ] Contrato validado (campos, paginacao, filtros) com front e back.
- [ ] DoD aplicado conforme `docs/dod-modulo-sem-mock.md`.
