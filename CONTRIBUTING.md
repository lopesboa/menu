# Guia de Contribuicao

## Objetivo

Este guia define onde criar cada tipo de artefato para manter consistencia de
arquitetura, naming e ownership no repositorio.

## Onde criar cada artefato

- **Rota de autenticacao:** `src/app/routes/auth/*`
- **Rota de dashboard:** `src/app/routes/dashboard/*`
- **Componente de secao da landing:** `src/components/sections/*`
- **Componente base de UI:** `src/components/ui/*`
- **Store de dominio:** `src/domains/<dominio>/store/*`
- **Modelo interno de dominio:** `src/domains/<dominio>/model/*`
- **Hook de dominio:** `src/domains/<dominio>/hooks/*`
- **API de dominio:** `src/domains/<dominio>/api/*`
- **Tipos de dominio:** `src/domains/<dominio>/types/*`
- **Hook cross-feature:** `src/hooks/*`
- **Servico legado ativo:** `src/services/*`
- **Utilitario compartilhado:** `src/utils/*`
- **Biblioteca de observabilidade/cliente:** `src/lib/*`
- **Template de issue para agentes:** `.github/ISSUE_TEMPLATE/agent-*.md`
- **Prompt/base de agentes:** `agents/*.md`
- **Documentacao tecnica:** `docs/*.md`

## Regras de contribuicao

1. Nao criar wrappers legados em `src/app/store/*` (exceto `dialog.ts`).
2. Nao criar barrel para mascarar ownership de modulo.
3. Manter texto user-facing em pt-BR.
4. Atualizar docs quando mover paths ou ownership de arquivos.

## Fluxo recomendado de PR

1. Criar branch no padrao `JIRA-Key/descricao-curta`.
2. Implementar mudanca com escopo unico.
3. Rodar validacoes locais:
   - `pnpm build`
   - `pnpm check`
4. Preencher `.github/pull_request_template.md`.
5. Em migracoes sem mock, aplicar o DoD de `docs/dod-modulo-sem-mock.md`.
