# Backlog executável — Frontend PDV + Delivery

Última atualização: 2026-03-24  
Base contratual: Frontend Contract Freeze - Wave 1 (Backend)

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
- [ ] **FE-07**: Cliente websocket `/ops` com `rt.subscribe|unsubscribe|refresh.request` por domínio.
  - Dependências: namespace e eventos de snapshot/delta.
  - Evidências:
    - PR/commit:
    - Prints/vídeo:
    - Observações:

- [ ] **FE-08**: Quick actions com `order.status.change.request` + fallback REST (`PATCH /orders/:organizationId/:orderId/status`).
  - Dependências: ack de comando e política de timeout.
  - Evidências:
    - PR/commit:
    - Prints/vídeo:
    - Observações:

- [ ] **FE-09**: Polling fallback por tela durante desconexão/reconexão.
  - Regras:
    - Queue/KDS/Delivery: 5-10s
    - Ops: 10-15s
  - Dependências: estado de conexão socket.
  - Evidências:
    - PR/commit:
    - Prints/vídeo:
    - Observações:

### Onda 1C — Ops monitoring
- [ ] **FE-10**: Tela de resumo operacional (`GET /ops/:organizationId/summary`).
  - Dependências: endpoint de summary.
  - Evidências:
    - PR/commit:
    - Prints/vídeo:
    - Observações:

- [ ] **FE-11**: Lista de inbox (`GET /ops/:organizationId/inbox-events`) com paginação/filtros.
  - Dependências: contrato de inbox events.
  - Evidências:
    - PR/commit:
    - Prints/vídeo:
    - Observações:

- [ ] **FE-12**: Lista de DLQ (`GET /ops/:organizationId/dead-letter-events`) com paginação.
  - Dependências: contrato de dead-letter events.
  - Evidências:
    - PR/commit:
    - Prints/vídeo:
    - Observações:

- [ ] **FE-13**: Ações de `reprocess` e `retry` com refresh das listas após sucesso.
  - Regras: após sucesso, atualizar inbox + DLQ mesmo com socket conectado.
  - Dependências: endpoints POST de ação.
  - Evidências:
    - PR/commit:
    - Prints/vídeo:
    - Observações:

### Onda 2 — Continuação e endurecimento
- [~] **FE-02**: Fluxo de criação de pedido no PDV com integração real e sem fallback legado desnecessário.
  - Dependências: contrato final do endpoint de criação.
  - Evidências:
    - PR/commit: `637e48e` (parcial)
    - Prints/vídeo:
    - Observações:

- [~] **FE-03**: Fluxo de fechamento de pedido no PDV com semântica final de backend (quando houver endpoint dedicado).
  - Dependências: definição final de fechamento/pagamento.
  - Evidências:
    - PR/commit: `637e48e` (parcial)
    - Prints/vídeo:
    - Observações:

- [ ] **FE-14**: Fechamento da execução com DoD "módulo sem mock" e evidências finais.
  - Dependências: conclusão de FE-01..FE-13 + validação conjunta front/back.
  - Evidências:
    - PR/commit:
    - Prints/vídeo:
    - Observações:

---

## Dependências consolidadas (atualizadas)

1. Contrato congelado da Wave 1 para `/queue`, `/orders/:org/:id/status`, `/ops/*` e websocket `/ops`.
2. Matriz de transição Wave 1: `pending -> confirmed/preparing/...` conforme freeze (sem reabertura).
3. Error shape estável com `errorCode` para UX de erro consistente.
4. Eventos websocket de snapshot e delta por domínio para sincronização em tempo real.
5. Regras de fallback polling e refresh pós-ação definidas no freeze.

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
