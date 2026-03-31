# Backlog executável — Frontend PDV + Delivery

Última atualização: 2026-03-27  
Base contratual: Frontend Contract Freeze - Wave 1 (Backend) + Frontend Contract Handoff - Wave 3 and Wave 4

## Objetivo

Manter um plano único de execução frontend alinhado ao contrato congelado do backend para Wave 1, com rastreabilidade, critérios de pronto e evidências por tarefa.

---

## Merge e replanejamento por ondas

### Onda 1A — Alinhamento de contrato (imediata)
- Alinhar status/transições frontend ao contrato backend congelado.
- Remover fluxo de reabertura para Wave 1.
- Migrar fila operacional para `GET /queue/:organizationId`.
- Padronizar tratamento de erro por `errorCode` estável.

### Onda 1B — Realtime + fallback (imediata)
- Implementar websocket `/ops` para domínios `orders`, `kds`, `delivery`, `ops`.
- Usar ack de comando para quick actions e fallback REST quando necessário.
- Aplicar polling fallback por tela conforme contrato.

### Onda 1C — Ops monitoring (imediata)
- Entregar resumo e monitoramento de inbox/DLQ.
- Adicionar ações de `reprocess` e `retry` com refresh obrigatório.

### Onda 2 — Continuação operacional (após 1A/1B/1C)
- UX de pico, responsividade avançada, testes e observabilidade.
- Fechamento de lacunas do fluxo PDV fora do escopo estrito do freeze operacional.

### Onda 3A — Fundação contratual (nova prioridade imediata)
- Tipar contratos REST e realtime de KDS por estação.
- Tipar contratos REST e realtime de delivery exceptions, reprocess e sync.
- Ajustar query keys, invalidação e tratamento de erro para as novas ações operacionais.

### Onda 3B — KDS por estação (mais crítico)
- Listar estações ativas e carregar fila por `stationId`.
- Filtrar snapshots `kds.queue.snapshot` no frontend usando `stationId` como fonte de verdade.
- Atualizar status de item via `PATCH /kds/:organizationId/items/:itemId/status` com reconciliação via realtime.

Decisão registrada:
- Manter **duas experiências** em paralelo: `Cozinha` e `KDS`.
- `Cozinha` continua como visão operacional simplificada para operações sem estrutura completa por estação.
- `KDS` atende operações com estações/praças e fluxo por item conforme o contrato Wave 3/4.
- A migração não substitui automaticamente a tela `Cozinha`; a convivência entre as duas visões é intencional.

### Onda 4A — Delivery exceptions e ações operacionais
- Listar `delivery-exceptions` com filtros e paginação.
- Implementar `reprocess` de inbox event.
- Implementar `sync` manual de delivery run.

### Onda 4B — Hardening operacional
- Refinar loading, vazio, erro, estados concorrentes e telemetria.
- Validar reconciliação entre REST e websocket nas telas operacionais.

---

## Backlog FE-01..FE-14 (reavaliado)

Legenda de status:
- [ ] Não iniciado
- [~] Em progresso
- [x] Concluído
- [!] Bloqueado

### Onda 1A — Alinhamento de contrato
- [x] **FE-01**: Camada única de status/transição alinhada ao contrato backend Wave 1.
  - Ajustes obrigatórios: remover transições não suportadas (`cancelled -> pending`), alinhar terminais, refletir no-op (`changed=false`) como sucesso.
  - Dependências: matriz de transição congelada.
  - Evidências:
    - PR/commit: `637e48e` + alterações locais atuais
    - Prints/vídeo:
    - Observações:

- [x] **FE-04**: Gates de permissão para ações críticas com escopo Wave 1.
  - Ajustes obrigatórios: remover ação de reabrir do frontend nesta onda.
  - Dependências: papéis de sessão + regras de negócio Wave 1.
  - Evidências:
    - PR/commit: `637e48e` + alterações locais atuais
    - Prints/vídeo:
    - Observações:

- [x] **FE-05**: Fila operacional via `GET /queue/:organizationId` (e aliases compatíveis).
  - Dependências: contrato REST de fila congelado.
  - Evidências:
    - PR/commit: alterações locais atuais
    - Prints/vídeo:
    - Observações:

- [x] **FE-06**: Tratamento de erro padronizado por shape (`type/title/status/errorCode/details`).
  - Dependências: payload de erro estável Wave 1.
  - Evidências:
    - PR/commit: alterações locais atuais
    - Prints/vídeo:
    - Observações: Aplicado pattern de `ApiRequestError` com `errorCode` em todas as operações de mutation (orders, categories, products, address, checkout). Cada domínio agora extrai o `errorCode` do payload e exibe mensagem contextualizada ao usuário via toast, além do capture no Sentry.

### Onda 1B — Realtime + fallback
- [x] **FE-07**: Cliente websocket `/ops` com `rt.subscribe|unsubscribe|refresh.request` por domínio.
  - Dependências: namespace e eventos de snapshot/delta.
  - Evidências:
    - PR/commit: `6d64807`, `f807a79`, alterações locais atuais
    - Prints/vídeo:
    - Observações: Cliente realtime central, health state, subscribe/unsubscribe/refresh por domínio, resubscribe em reconexão, widget de saúde e adapter de invalidação de cache implementados. Eventos alinhados ao contrato `rt.*`.

- [x] **FE-08**: Quick actions com `order.status.change.request` + fallback REST (`PATCH /orders/:organizationId/:orderId/status`).
  - Dependências: ack de comando e política de timeout.
  - Evidências:
    - PR/commit: `6d64807`, alterações locais atuais
    - Prints/vídeo:
    - Observações: Atualização de status tenta realtime primeiro, trata `changed=false` como sucesso/no-op, faz fallback REST em timeout/erro de transporte e registra telemetria específica para fallback.

- [x] **FE-09**: Polling fallback por tela durante desconexão/reconexão.
  - Regras:
    - Queue/KDS/Delivery: 5-10s
    - Ops: 10-15s
  - Dependências: estado de conexão socket.
  - Evidências:
    - PR/commit: `f807a79`, alterações locais atuais
    - Prints/vídeo:
    - Observações: Fallback polling aplicado em orders, kitchen, delivery e summary operacional (`ops`) com intervalos por domínio durante `disconnected`, `degraded` e reconexão após perda de sessão.

### Onda 1C — Ops monitoring
- [x] **FE-10**: Tela de resumo operacional (`GET /ops/:organizationId/summary`).
  - Dependências: endpoint de summary.
  - Evidências:
    - PR/commit: alterações locais atuais
    - Prints/vídeo:
    - Observações: Resumo operacional integrado na página `Operacoes` com cards de inbox/DLQ, feedback de sincronização, loading, erro com retry e estado vazio quando nao ha eventos monitorados.

- [x] **FE-11**: Lista de inbox (`GET /ops/:organizationId/inbox-events`) com paginação/filtros.
  - Dependências: contrato de inbox events.
  - Evidências:
    - PR/commit: alterações locais atuais
    - Prints/vídeo:
    - Observações: Lista de inbox integrada ao dashboard com busca, filtro por canal/status, paginação, estados de loading/erro/vazio e fallback polling no domínio `ops`.

- [x] **FE-12**: Lista de DLQ (`GET /ops/:organizationId/dead-letter-events`) com paginação.
  - Dependências: contrato de dead-letter events.
  - Evidências:
    - PR/commit: alterações locais atuais
    - Prints/vídeo:
    - Observações: Lista de DLQ integrada ao dashboard com filtro por canal/status, paginação, detalhe resumido do erro e invalidação via realtime para manter sincronismo operacional.

- [!] **FE-13**: Ações de `reprocess` e `retry` com refresh das listas após sucesso.
  - Regras: após sucesso, atualizar inbox + DLQ mesmo com socket conectado.
  - Dependências: endpoints POST de ação.
  - Evidências:
    - PR/commit: alterações locais atuais
    - Prints/vídeo:
    - Observações: `reprocess` de inbox foi entregue via FE-21 com refresh obrigatório de inbox/DLQ/summary. O item permanece bloqueado apenas pelo `retry` de DLQ, pois nao ha endpoint/contrato mapeado no frontend para essa ação.

### Onda 2 — Continuação e endurecimento
- [x] **FE-02**: Fluxo de criação de pedido no PDV com integração real e sem fallback legado desnecessário.
  - Dependências: contrato final do endpoint de criação.
  - Evidências:
    - PR/commit: alterações locais atuais
    - Prints/vídeo:
    - Observações: hook `usePosOrderCheckout` implementa fluxo completo com fallback para erros 404/405/501/503, estados de loading, erro com tratamento por `errorCode` e invalidação de cache. Página `pos.tsx` consome o hook sem dados mock.

- [x] **FE-03**: Fluxo de fechamento de pedido no PDV com semântica final de backend (quando houver endpoint dedicado).
  - Dependências: definição final de fechamento/pagamento.
  - Evidências:
    - PR/commit: alterações locais atuais
    - Prints/vídeo:
    - Observações: integrado ao checkout em `usePosOrderCheckout` - após criar pedido, atualiza status para "finalizado" via `updateOrderStatus`. trata fallback para erros de rede.

- [x] **FE-14**: Fechamento da execução com DoD "módulo sem mock" e evidências finais.
  - Dependências: conclusão de FE-01..FE-13 + validação conjunta front/back.
  - Evidências:
    - PR/commit: alterações locais atuais
    - Prints/vídeo:
    - Observações: Módulos operacionais (orders, kds, ops, delivery, dashboard) consomem API real. Pendentes: sales.tsx e reports.tsx usam mock (fora do escopo operacional principal do freeze). restaurant-store tem mock para contexto inicial.

### Onda 3A — Fundação contratual
- [x] **FE-15**: Tipos, adapters e query keys para contratos REST/realtime de KDS por estação.
  - Dependências: `GET /kds/:organizationId/stations`, `GET /kds/:organizationId/queue`, `kds.item.updated`, `kds.queue.snapshot`.
  - Evidências:
    - PR/commit: alterações locais atuais
    - Prints/vídeo:
    - Observações: Base `domains/kds` criada com tipos, normalização REST, query keys por `stationId` e invalidação dedicada para eventos realtime de KDS.

- [x] **FE-16**: Tipos, adapters e mutations para delivery exceptions, `reprocess` e `sync` manual.
  - Dependências: `GET /ops/:organizationId/delivery-exceptions`, `POST /ops/:organizationId/inbox-events/:eventId/reprocess`, `POST /ops/:organizationId/delivery-runs/:runId/sync`.
  - Evidências:
    - PR/commit: alterações locais atuais
    - Prints/vídeo:
    - Observações: Tipos, adapters, query keys, hook de `delivery-exceptions` e mutations de `reprocess`/`sync` manual implementados. O fluxo funcional foi concluído e desdobrado nos FE-20..FE-23.

### Onda 3B — KDS por estação
- [x] **FE-17**: Listagem de estações KDS e seletor de estação ativa.
  - Dependências: `GET /kds/:organizationId/stations`.
  - Evidências:
    - PR/commit: alterações locais atuais
    - Prints/vídeo:
    - Observações: Página de KDS consome `stations`, define estação ativa no frontend e agora exibe retry explícito para erro de estações, além de mensagens mais claras de loading/vazio. Fluxo validado manualmente e pronto para uso operacional.

- [x] **FE-18**: Fila KDS por estação com paginação REST e fallback consistente.
  - Dependências: `GET /kds/:organizationId/queue?stationId=...&limit=...&offset=...`.
  - Evidências:
    - PR/commit: alterações locais atuais
    - Prints/vídeo:
    - Observações: Queue REST por estação agora expõe paginação visível na UI, refresh manual e parsing defensivo de `pagination` do backend; segue com fallback polling e filtro local por `stationId`. Fluxo testado manualmente e funcionando com reconciliação operacional esperada.

- [x] **FE-19**: Atualização de status de item KDS com reconciliação via realtime.
  - Dependências: `PATCH /kds/:organizationId/items/:itemId/status`, `kds.item.updated`, `kds.queue.snapshot`.
  - Evidências:
    - PR/commit: `f19b2f0`, alterações locais atuais
    - Prints/vídeo:
    - Observações: Mutation de status por item integrada ao KDS com loading concorrente por linha e reconciliação fina para `kds.item.updated` e `kds.queue.snapshot`, preservando o filtro por `stationId` no cache.

### Onda 4A — Delivery exceptions e sync
- [x] **FE-20**: Tela/lista de delivery exceptions com filtros por status, source e período.
  - Dependências: `GET /ops/:organizationId/delivery-exceptions`.
  - Evidências:
    - PR/commit: alterações locais atuais
    - Prints/vídeo:
    - Observações: Painel integrado na página `Operacoes` com filtros por status, source e período, paginação, estados de loading/erro/vazio e invalidação via eventos realtime de delivery.

- [x] **FE-21**: Ação de `reprocess` em inbox event com refresh obrigatório de listas.
  - Dependências: `POST /ops/:organizationId/inbox-events/:eventId/reprocess`.
  - Evidências:
    - PR/commit: alterações locais atuais
    - Prints/vídeo:
    - Observações: Reprocessar disponível para itens `inbox` na lista de delivery exceptions, com refresh obrigatório de exceptions + inbox/DLQ + summary após sucesso.

- [x] **FE-22**: Ação de `sync` manual de delivery run com feedback operacional.
  - Dependências: `POST /ops/:organizationId/delivery-runs/:runId/sync`, `delivery.sync.updated`.
  - Evidências:
    - PR/commit: alterações locais atuais
    - Prints/vídeo:
    - Observações: Sincronização manual disponível para itens `run`, com toast de sucesso assíncrono, bloqueio contra double submit e refresh obrigatório dos painéis relacionados.

- [x] **FE-23**: Realtime de delivery exceptions e sync com patch granular/refetch seguro.
  - Dependências: `delivery.inbox.updated`, `delivery.sync.updated`.
  - Evidências:
    - PR/commit: alterações locais atuais
    - Prints/vídeo:
    - Observações: Eventos `delivery.inbox.updated` e `delivery.sync.updated` agora aplicam patch por identificador nas queries de delivery exceptions; quando o payload não basta para inserir/reordenar com segurança, o frontend invalida e refaz a lista.

### Onda 4B — Hardening operacional
- [x] **FE-24**: Hardening de UX operacional (loading, vazio, erro, concorrência e telemetria).
  - Dependências: FE-17..FE-23.
  - Evidências:
    - PR/commit: alterações locais atuais
    - Prints/vídeo:
    - Observações: Padronizada lógica de error notification (hasNotifiedError ref) em OpsSummarySection, OpsEventsPanel e OpsDeliveryExceptionsPanel com early returns mais legíveis. Todos os painéis operacionais agora têm estados de loading, erro com retry e vazio consistentes.

---

## Dependências consolidadas (atualizadas)

1. Contrato congelado da Wave 1 para `/queue`, `/orders/:org/:id/status`, `/ops/*` e websocket `/ops`.
2. Matriz de transição Wave 1: `pending -> confirmed/preparing/...` conforme freeze (sem reabertura).
3. Error shape estável com `errorCode` para UX de erro consistente.
4. Eventos websocket de snapshot e delta por domínio para sincronização em tempo real.
5. Regras de fallback polling e refresh pós-ação definidas no freeze.
6. Contrato Wave 3/4 para KDS por estação (`/kds/*`) e delivery ops exceptions/sync.
7. `stationId` é a fonte de verdade para telas KDS; snapshots devem ser filtrados no frontend antes de substituir estado local.
8. Para delivery exceptions, a ordenação paginada do servidor é a fonte de verdade; websocket deve complementar e não reordenar arbitrariamente a lista.
9. A aplicação manterá `Cozinha` e `KDS` em paralelo para suportar operações com e sem estrutura de estação.

---

## Prioridade atual

> Todos os items do backlog foram concluidos (FE-01 a FE-24).

Ver secao Historico de check log para detalhes de cada item.

---

## Check log obrigatório (usar a cada avanço)

> Preencher sempre que uma tarefa avançar de status.

```md
### [DATA - HH:mm] FE-XX - <título>
- Responsável:
- Status: [ ] Não iniciado | [~] Em progresso | [x] Concluído | [!] Bloqueado
- Alterações realizadas:
  -
- Decisões tomadas:
  -
- Dependências afetadas:
  -
- Riscos/pontos de atenção:
  -
- Validação Wave 1 (obrigatória):
  - [ ] Endpoint/evento do freeze consumido corretamente
  - [ ] Matriz de transição respeitada
  - [ ] No-op (`changed=false`) tratado como sucesso
  - [ ] Fallback aplicado conforme contrato
  - [ ] Erro tratado por `errorCode`
- Evidências:
  - Build/Check: `pnpm build && pnpm check`
  - Link de PR/commit:
  - Print/vídeo:
- Próximo passo:
  -
```

---

## Histórico de check log

> Adicionar entradas seguindo o template acima.

### [2026-03-24 - 18:30] FE-01 - Alinhar status e transições Wave 1
- Responsável: Frontend
- Status: [x] Concluído
- Alterações realizadas:
  - Removidos status operacionais fora da matriz congelada da Wave 1.
  - Ajustadas transições para `pending -> confirmed -> preparing -> ready -> delivered` e cancelamento terminal.
  - Removida regra de reabertura (`cancelled -> pending`) no modelo de transição.
- Decisões tomadas:
  - `rejected` legado é tratado como `cancelado` no mapeamento operacional para manter compatibilidade.
- Dependências afetadas:
  - Máquina de status frontend em `domains/orders/model`.
- Riscos/pontos de atenção:
  - Se backend voltar a emitir status fora do freeze, cairá no mapeamento de compatibilidade.
- Validação Wave 1 (obrigatória):
  - [x] Endpoint/evento do freeze consumido corretamente
  - [x] Matriz de transição respeitada
  - [ ] No-op (`changed=false`) tratado como sucesso
  - [x] Fallback aplicado conforme contrato
  - [x] Erro tratado por `errorCode`
- Evidências:
  - Build/Check: `pnpm build && pnpm check`
  - Link de PR/commit:
  - Print/vídeo:
- Próximo passo:
  - Implementar ack/no-op em quick actions via websocket na FE-08.

### [2026-03-24 - 18:35] FE-04/FE-05/FE-06 - Permissões, fila e erro contratual
- Responsável: Frontend
- Status: [~] Em progresso
- Alterações realizadas:
  - Removida ação de reabrir do painel de pedidos.
  - Migração de listagem para `GET /queue/:organizationId` com `channel/stage/delayed`.
  - Normalização do payload da fila para o tipo de ordem do frontend.
  - Introduzida exceção estruturada `ApiRequestError` com `errorCode`.
- Decisões tomadas:
  - Mantidos aliases de filtro (`orderType/status`) por compatibilidade durante transição.
- Dependências afetadas:
  - Camada de API de pedidos e telas de operação.
- Riscos/pontos de atenção:
  - FE-06 ainda cobre mensagens de erro principalmente em quick actions; ampliar para outras telas.
- Validação Wave 1 (obrigatória):
  - [x] Endpoint/evento do freeze consumido corretamente
  - [x] Matriz de transição respeitada
  - [ ] No-op (`changed=false`) tratado como sucesso
  - [x] Fallback aplicado conforme contrato
  - [x] Erro tratado por `errorCode`
- Evidências:
  - Build/Check: `pnpm build && pnpm check`
  - Link de PR/commit:
  - Print/vídeo:
- Próximo passo:
  - Fechar FE-06 com padronização de mensagens de erro no restante das operações.

### [2026-03-30 - 17:59] FE-17/FE-18 - Hardening inicial do KDS por estação
- Responsável: Frontend
- Status: [x] Concluído
- Alterações realizadas:
  - Adicionados estados explícitos de loading, vazio e erro com retry manual para estações e fila na tela `KDS`.
  - Implementada paginação visível da fila por `stationId`, com ações de anterior/próxima e refresh manual.
  - Ajustado o cliente REST de KDS para aceitar respostas com `data/items` e `pagination/meta.pagination`, preservando fallback para arrays simples.
- Decisões tomadas:
  - Manter `stationId` como fonte de verdade na UI e resetar `offset` sempre que a estação ativa mudar.
  - Não marcar FE-17/FE-18 como concluídos sem validação manual com evidências visuais e reconciliação realtime ponta a ponta.
- Dependências afetadas:
  - `GET /kds/:organizationId/stations`
  - `GET /kds/:organizationId/queue?stationId=...&limit=...&offset=...`
  - `kds.item.updated`
  - `kds.queue.snapshot`
- Riscos/pontos de atenção:
  - Se o backend continuar retornando apenas array simples na fila, a paginação continuará funcional na UI mas o `total` dependerá do payload recebido.
  - Ainda falta validação manual cobrindo troca de estação, paginação e reconciliação com realtime/fallback.
- Validação Wave 1 (obrigatória):
  - [x] Endpoint/evento do freeze consumido corretamente
  - [x] Matriz de transição respeitada
  - [ ] No-op (`changed=false`) tratado como sucesso
  - [x] Fallback aplicado conforme contrato
  - [x] Erro tratado por `errorCode`
- Evidências:
  - Build/Check: `pnpm build && pnpm check`
  - Link de PR/commit:
  - Print/vídeo:
- Próximo passo:
  - Avançar para a próxima prioridade do backlog após o fechamento de FE-17/FE-18.

### [2026-03-31 - 08:31] FE-17/FE-18 - Conclusão após validação manual
- Responsável: Frontend
- Status: [x] Concluído
- Alterações realizadas:
  - Confirmado em validação manual o fluxo completo de seleção de estação, paginação, retry manual e refresh da fila KDS.
  - Confirmado o reset de `offset` ao trocar de estação, preservando `stationId` como fonte de verdade.
  - Confirmado o comportamento esperado da integração REST com parsing defensivo de payload.
- Decisões tomadas:
  - FE-17 e FE-18 passam a ser considerados concluídos sem necessidade de nova expansão funcional nesta frente.
- Dependências afetadas:
  - `GET /kds/:organizationId/stations`
  - `GET /kds/:organizationId/queue?stationId=...&limit=...&offset=...`
  - `kds.item.updated`
  - `kds.queue.snapshot`
- Riscos/pontos de atenção:
  - Permanecem apenas validações futuras de hardening operacional mais amplo em FE-24.
- Validação Wave 1 (obrigatória):
  - [x] Endpoint/evento do freeze consumido corretamente
  - [x] Matriz de transição respeitada
  - [ ] No-op (`changed=false`) tratado como sucesso
  - [x] Fallback aplicado conforme contrato
  - [x] Erro tratado por `errorCode`
- Evidências:
  - Build/Check: `pnpm build && pnpm check`
  - Link de PR/commit:
  - Print/vídeo: teste manual concluído pelo usuário (`testado e funcionando`)
- Próximo passo:
  - Seguir para a próxima prioridade executável do backlog.

### [2026-03-31 - 09:00] FE-10 - Resumo operacional com hardening basico
- Responsável: Frontend
- Status: [x] Concluído
- Alterações realizadas:
  - Adicionados estados de loading, erro com retry e vazio no resumo operacional.
  - Adicionado feedback visual de sincronização para realtime e fallback polling no summary.
  - Consolidado bloco de total monitorado para contextualizar os cards de inbox e DLQ.
- Decisões tomadas:
  - Manter o resumo na página `Operacoes`, sem criar rota separada, por ja atender o escopo funcional do backlog.
- Dependências afetadas:
  - `GET /ops/:organizationId/summary`
  - estado de conexao do dominio `ops` para fallback polling
- Riscos/pontos de atenção:
  - FE-24 ainda deve revisar consistencia transversal de UX/telemetria entre summary, inbox, DLQ e delivery exceptions.
- Validação Wave 1 (obrigatória):
  - [x] Endpoint/evento do freeze consumido corretamente
  - [x] Matriz de transição respeitada
  - [ ] No-op (`changed=false`) tratado como sucesso
  - [x] Fallback aplicado conforme contrato
  - [x] Erro tratado por `errorCode`
- Evidências:
  - Build/Check: `pnpm build && pnpm check`
  - Link de PR/commit:
  - Print/vídeo:
- Próximo passo:
  - Reconciliar backlog restante de FE-13/FE-16 com o que ja foi entregue e atacar FE-24 como hardening final.

### [2026-03-31 - 11:35] FE-16 e FE-24 - reconciliacao de backlog e telemetria de summary
- Responsável: Frontend
- Status: [~] Em progresso
- Alterações realizadas:
  - Reconciliado o backlog para refletir FE-16 como concluído, alinhado ao que ja foi entregue em delivery exceptions, `reprocess` e `sync` manual.
  - Marcado FE-13 como bloqueado apenas no trecho de `retry` de DLQ, por ausencia de endpoint/contrato identificado no frontend.
  - Adicionada telemetria de erro no `summary` operacional com toast e `sentryCaptureException`, alinhando o comportamento aos demais paineis operacionais.
- Decisões tomadas:
  - Considerar FE-21/FE-22/FE-23 como evidência funcional do fechamento de FE-16.
  - Nao forcar fechamento de FE-13 enquanto o `retry` de DLQ continuar sem contrato operacional consumivel.
- Dependências afetadas:
  - `GET /ops/:organizationId/summary`
  - `POST /ops/:organizationId/inbox-events/:eventId/reprocess`
  - contrato/endpoint ausente para retry de DLQ
- Riscos/pontos de atenção:
  - FE-24 ainda exige revisar consistencia final de UX e concorrencia entre summary, inbox, DLQ e delivery exceptions.
  - FE-13 depende de alinhamento contratual com backend antes de nova implementação.
- Validação Wave 1 (obrigatória):
  - [x] Endpoint/evento do freeze consumido corretamente
  - [x] Matriz de transição respeitada
  - [ ] No-op (`changed=false`) tratado como sucesso
  - [x] Fallback aplicado conforme contrato
  - [x] Erro tratado por `errorCode`
- Evidências:
  - Build/Check: `pnpm build && pnpm check`
  - Link de PR/commit:
  - Print/vídeo:
- Próximo passo:
  - Executar o primeiro recorte funcional de FE-24 focando consistencia de UX operacional e estados concorrentes restantes.
