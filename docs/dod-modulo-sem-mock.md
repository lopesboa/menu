# Definition of Done (DoD) - Modulo sem mock

## Objetivo

Padronizar o criterio minimo para considerar um modulo migrado para dados reais,
sem dependencia de mocks e com comportamento confiavel em cenario de falha.

## Escopo

Este DoD se aplica a migracoes de dominio que removem consumo de dados fake e
passam a depender de contrato real de API.

## Checklist tecnico (front + back)

- [ ] Endpoint real definido por `organizationId` e contrato versionado.
- [ ] Contrato cobre campos obrigatorios, filtros, paginacao e ordenacao (quando aplicavel).
- [ ] Nao existe fallback silencioso para `mock-data` no modulo migrado.
- [ ] Query keys usam `organizationId` para isolar cache por organizacao.
- [ ] Erros de API sao tipados e tratados de forma consistente no modulo.

## Checklist UX e resiliencia (front)

- [ ] Estado de loading exibido na tela sem bloquear toda a navegacao.
- [ ] Estado vazio com mensagem clara e sem ambiguidades.
- [ ] Estado de erro com CTA de `Tentar novamente`.
- [ ] Busca/listagem continuam consistentes apos refresh da pagina.
- [ ] Texto user-facing validado em pt-BR.

## Checklist observabilidade e operacao

- [ ] Falhas relevantes disparam `toast.error` para usuario.
- [ ] Falhas relevantes sao capturadas com `sentryCaptureException`.
- [ ] Contexto minimo de erro registrado (`context`, `organizationId`, acao).
- [ ] Sem `console.log` ou `debugger` no fluxo entregue.

## Criterio de aceite para fechar issue de migracao

- [ ] PR inclui evidencias de validacao (`pnpm build` e `pnpm check`).
- [ ] PR preenche checklist de modulo sem mock no template.
- [ ] Front e back validam o contrato final em ambiente de desenvolvimento.

## Evidencias recomendadas no PR

- Prints ou video curto dos estados: loading, vazio, erro/retry e sucesso.
- Exemplo de payload real (request/response) para o endpoint migrado.
- Nota de risco, rollout e plano de rollback por modulo.
