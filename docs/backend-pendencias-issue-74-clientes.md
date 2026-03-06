# Issue #74 - Pendencias de backend para concluir migracao de Clientes

## Objetivo

Documentar, de forma acionavel, o que o backend precisa entregar para concluir a
migracao do modulo de Clientes para dados reais.

## Endpoint e contrato

- [ ] Disponibilizar `GET /customers/{organizationId}` em ambiente de desenvolvimento/homologacao.
- [ ] Confirmar contrato de resposta com lista de clientes (array puro ou envelope documentado).
- [ ] Garantir campos minimos por cliente:
  - `id`
  - `organizationId`
  - `name`
  - `email`
  - `phone`
  - `totalOrders`
  - `totalSpent`
  - `loyaltyPoints`
  - `lastVisit`

## Paginacao, filtros e busca

- [ ] Definir se a listagem sera paginada e documentar formato (`limit`, `offset`, total).
- [ ] Definir filtros suportados (ex.: busca por nome/email/telefone).
- [ ] Garantir comportamento consistente para busca sem resultados (resposta vazia, sem erro).

## Erros e resiliencia

- [ ] Padronizar payload de erro (status, codigo, mensagem) para tratamento consistente no frontend.
- [ ] Garantir codigos HTTP coerentes para cenario de organizacao invalida e falhas internas.
- [ ] Evitar respostas parciais silenciosas quando houver falha de dependencia.

## Observabilidade

- [ ] Incluir `organizationId` nos logs estruturados da rota.
- [ ] Garantir rastreabilidade de erro por request (correlation id ou equivalente).

## Criterio de conclusao backend da #74

- [ ] Contrato final alinhado e validado entre front e back.
- [ ] Frontend consumindo apenas API real em `customers.tsx`, sem `mock-data`.
- [ ] Cenarios de sucesso, vazio e erro validados ponta a ponta.
