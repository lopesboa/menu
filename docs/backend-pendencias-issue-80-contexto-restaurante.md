# Issue #80 - Pendencias de backend para contexto real de restaurante

## Objetivo

Documentar o contrato minimo que o backend precisa expor para o frontend parar de
depender de defaults locais ao montar o contexto do restaurante ativo.

## O que o frontend passou a consumir

- `authClient.useListOrganizations()` para listar os restaurantes da conta.
- `authClient.useActiveOrganization()` para identificar o restaurante ativo.
- `GET /address/{addressId}` para resolver o endereco salvo na organizacao.

## Ajustes ainda necessarios no backend

- [ ] Garantir que `listOrganizations` e `get-full-organization` retornem os
  campos customizados da organizacao usados pelo produto:
  - `addressId`
  - `phone`
  - `timezone`
  - `currency`
  - `metadata.plan`
  - `metadata.subscriptionStatus`
  - `metadata.subscriptionId`
  - `metadata.currentPeriodStart`
  - `metadata.currentPeriodEnd`
  - `metadata.cancelAtPeriodEnd`
  - `metadata.taxRate`
  - `metadata.defaultPaymentMethods`
  - `metadata.invoicePrefix`
  - `metadata.requireCashierApproval`
- [ ] Confirmar se `GET /address/{addressId}` seguira retornando apenas
  `street`, `number`, `complement`, `neighborhood` e `zipCode` ou se tambem deve
  incluir cidade/UF para exibicao completa no dashboard e comprovante do PDV.
- [ ] Garantir uma action de troca de contexto consistente (`setActive`) com
  invalidacao da sessao e do contexto da organizacao ativa.

## Contrato recomendado

- [ ] Expor um payload unico de contexto do restaurante ativo, seja expandindo
  `/organization/get-full-organization` ou criando um endpoint dedicado como
  `GET /restaurants/context/{organizationId}`.
- [ ] Retornar no mesmo payload:
  - identificacao (`id`, `name`, `slug`, `logo`)
  - contato (`phone`)
  - endereco resolvido ou `addressId` + endereco expandido
  - assinatura (`plan`, `status`, `currentPeriodStart`, `currentPeriodEnd`)
  - configuracoes operacionais do PDV (`taxRate`, `defaultPaymentMethods`,
    `invoicePrefix`, `requireCashierApproval`, `timezone`, `currency`)

## Criterio de conclusao backend da #80

- [ ] Frontend sem `mockRestaurants` e sem defaults obrigatorios para plano,
  endereco e configuracoes operacionais.
- [ ] Troca de restaurante refletindo imediatamente em Conta, Cobrança, PDV e
  demais consumidores do contexto.
- [ ] Contrato final validado entre front e back em ambiente de desenvolvimento.
