# Roadmap de Remocao de Mocks e Alinhamento da Landing

## Objetivo

Remover dados mockados do produto, conectar os modulos principais ao backend real
e alinhar a comunicacao da landing page com o que esta disponivel no sistema.

## Principios

- Priorizar fluxo operacional critico (pedidos, estoque, clientes, vendas).
- Migrar por dominios, com entregas pequenas e rollback por modulo.
- Evitar fallback silencioso para mock em qualquer tela.
- Manter rastreabilidade com issues no projeto `Menu Frontend Refactor`.

## Sprint 1 (P0) - Base de dados reais e dominios criticos

- [#87](https://github.com/lopesboa/menu/issues/87) `[front]` Padronizar infraestrutura de dados por dominio.
- [#74](https://github.com/lopesboa/menu/issues/74) `[front+back]` Migrar Clientes para API real.
- [#75](https://github.com/lopesboa/menu/issues/75) `[front+back]` Migrar Inventario para API real e low-stock.
- [#89](https://github.com/lopesboa/menu/issues/89) `[front+back]` Definir DoD de modulo sem mock.

### Saida esperada

- Clientes e Inventario sem dependencia de `mock-data`.
- Estado de loading/vazio/erro/retry padronizado nos modulos migrados.
- Criterio de aceite formal para novas migracoes sem mock.

## Sprint 2 (P0) - Vendas, relatorios e cardapio

- [#76](https://github.com/lopesboa/menu/issues/76) `[front+back]` Migrar Sales para dados reais.
- [#77](https://github.com/lopesboa/menu/issues/77) `[front+back]` Migrar Reports para APIs reais.
- [#79](https://github.com/lopesboa/menu/issues/79) `[front+back]` Migrar Menu Builder para CRUD real.
- [#80](https://github.com/lopesboa/menu/issues/80) `[front+back]` Remover `mockRestaurants` e carregar restaurante real.

### Saida esperada

- KPIs sem dados aleatorios ou hardcoded.
- Fluxo de cardapio com CRUD real por organizacao.
- Contexto do restaurante ativo vindo de fonte real.

## Sprint 3 (P0/P1) - Operacao ponta a ponta

- [#78](https://github.com/lopesboa/menu/issues/78) `[front+back]` Finalizar pedido no PDV com persistencia real.
- [#86](https://github.com/lopesboa/menu/issues/86) `[front+back]` Remover blocos estaticos da tela de Delivery.
- [#88](https://github.com/lopesboa/menu/issues/88) `[front]` Decomissionar `mock-data.ts`.

### Saida esperada

- Pedido criado no PDV refletindo em operacao real.
- Delivery sem indicadores cenograficos para uso diario.
- Eliminacao total do arquivo central de mocks.

## Sprint 4 (P1) - Alinhamento comercial e features habilitadoras

- [#84](https://github.com/lopesboa/menu/issues/84) `[front]` Alinhar landing com funcionalidades disponiveis.
- [#85](https://github.com/lopesboa/menu/issues/85) `[front]` Destacar modulos operacionais ja existentes.
- [#81](https://github.com/lopesboa/menu/issues/81) `[front+back]` Implementar modulo de API Keys.
- [#82](https://github.com/lopesboa/menu/issues/82) `[front+back]` Criar dominio de Staff no frontend.
- [#83](https://github.com/lopesboa/menu/issues/83) `[front+back]` Substituir billing mock por fonte real (ou escopo temporario explicito).

### Saida esperada

- Landing sem promessas acima do que o produto entrega.
- Melhor comunicacao de valor de funcionalidades reais.
- Evolucao de capacidades enterprise e de administracao.

## Dependencias e riscos

- Dependencia de contratos de backend para payloads finais de pedidos, vendas e cobranca.
- Risco de divergencia de metricas durante migracao de relatorios.
- Risco de regressao de UX em telas com alto acoplamento legado.
- Mitigacao: rollout por modulo, observabilidade e rollback localizado.

## Criterio de conclusao do roadmap

- Nenhuma tela operacional depende de dados mockados.
- Nenhuma metrica de negocio depende de `Math.random` ou hardcode.
- Landing reflete com precisao o estado real das features.
- Issues P0 concluídas e P1 com plano de execucao ativo no projeto.
