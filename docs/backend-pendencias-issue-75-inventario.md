# Issue #75 - Pendencias de backend para concluir migracao de Inventario

## Objetivo

Deixar explicito o que o backend precisa entregar para concluir a migracao do
modulo de Inventario para API real, incluindo alertas de estoque baixo.

## Endpoint de listagem

- [ ] Disponibilizar `GET /inventory/{organizationId}` em dev/homolog.
- [ ] Confirmar contrato de resposta (array puro ou envelope documentado).
- [ ] Garantir campos minimos por item:
  - `id`
  - `organizationId`
  - `name`
  - `quantity`
  - `unit`
  - `minQuantity`
  - `category`
  - `costPerUnit`
  - `lastRestocked`

## Endpoint de alerta (low-stock)

- [ ] Disponibilizar `GET /inventory/{organizationId}/low-stock`.
- [ ] Definir regra oficial de low-stock no backend (comparacao com `minQuantity`).
- [ ] Garantir que o endpoint retorne somente itens em estado critico/baixo conforme regra.

## Filtros, paginacao e consistencia

- [ ] Definir se listagem principal tera paginacao (`limit`, `offset`, total).
- [ ] Definir filtros suportados (categoria, busca textual, faixa de estoque).
- [ ] Garantir consistencia entre listagem principal e endpoint de low-stock.

## Erros e observabilidade

- [ ] Padronizar payload de erro (status, codigo, mensagem) para retry no frontend.
- [ ] Retornar codigos HTTP coerentes para organizacao invalida e falhas internas.
- [ ] Incluir `organizationId` e identificador de request em logs estruturados.

## Criterio de conclusao backend da #75

- [ ] Contrato final alinhado e validado entre front e back.
- [ ] Front consumindo apenas API real em `inventory.tsx`, sem `mock-data`.
- [ ] Cenarios de sucesso, vazio e erro/retry validados em listagem e low-stock.
