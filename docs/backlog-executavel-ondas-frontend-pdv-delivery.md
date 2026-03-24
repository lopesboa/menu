# Backlog executável — Frontend PDV + Delivery

## Objetivo

Centralizar o acompanhamento da execução frontend por ondas, mantendo rastreabilidade de dependências, validações obrigatórias e evidências por tarefa.

---

## Visão do plano por ondas

### Onda 1 — Núcleo operacional seguro (FE-01 a FE-04)
- Alinhar modelo de status no frontend.
- Conectar fluxo de criação/fechamento de pedido no PDV com fallback controlado.
- Aplicar gates de permissão para ações críticas.

### Onda 2 — Operação em tempo real e robustez (FE-05 a FE-09)
- Melhorar sincronização de pedidos e sinalização operacional.
- Reforçar estados de erro/retry e observabilidade operacional.
- Expandir cobertura de ações rápidas e consistência de UX entre telas.

### Onda 3 — Escala operacional e acabamento (FE-10 a FE-14)
- Consolidar experiência omnicanal para pico.
- Completar critérios de prontidão para rollout sem mock.
- Fechar lacunas de acessibilidade, testes e evidências finais.

---

## Backlog FE-01..FE-14 (status inicial)

Legenda de status:
- [ ] Não iniciado
- [x] Concluído

### Onda 1
- [ ] **FE-01**: Camada única de mapeamento/status no frontend alinhada ao modelo operacional.
  - Dependências: contrato de status backend (mesmo que parcial).
  - Evidências:
    - PR/commit:
    - Prints/vídeo:
    - Observações:

- [ ] **FE-02**: Fluxo de criação de pedido no PDV com integração real quando endpoint estiver disponível.
  - Dependências: endpoint de criação de pedido.
  - Evidências:
    - PR/commit:
    - Prints/vídeo:
    - Observações:

- [ ] **FE-03**: Fluxo de fechamento de pedido no PDV com fallback controlado (feature-safe) sem quebrar UX.
  - Dependências: endpoint de atualização/finalização de status.
  - Evidências:
    - PR/commit:
    - Prints/vídeo:
    - Observações:

- [ ] **FE-04**: Gates de permissão para ações críticas (cancelar, reabrir, liberar) com feedback claro.
  - Dependências: papéis de usuário carregados na sessão.
  - Evidências:
    - PR/commit:
    - Prints/vídeo:
    - Observações:

### Onda 2
- [ ] **FE-05**: Atualização near real-time de lista de pedidos (polling/realtime) com comportamento estável.
  - Dependências: estratégia backend de atualização (polling curto ou canal realtime).
  - Evidências:
    - PR/commit:
    - Prints/vídeo:
    - Observações:

- [ ] **FE-06**: Estados de loading/vazio/erro/retry padronizados nas telas operacionais.
  - Dependências: contrato de erro backend consistente.
  - Evidências:
    - PR/commit:
    - Prints/vídeo:
    - Observações:

- [ ] **FE-07**: Sinalização de risco/atraso/exceção por pedido no painel operacional.
  - Dependências: campos de SLA/criticidade do backend.
  - Evidências:
    - PR/commit:
    - Prints/vídeo:
    - Observações:

- [ ] **FE-08**: Ações rápidas consistentes entre Pedidos, Cozinha e Delivery.
  - Dependências: máquina de status backend + permissões mínimas.
  - Evidências:
    - PR/commit:
    - Prints/vídeo:
    - Observações:

- [ ] **FE-09**: Feedback operacional orientado a ação (toasts claros, CTA de retry e contexto).
  - Dependências: padronização de erros por endpoint.
  - Evidências:
    - PR/commit:
    - Prints/vídeo:
    - Observações:

### Onda 3
- [ ] **FE-10**: Otimização de UX para pico (densidade, contraste, legibilidade, atalhos principais).
  - Dependências: validação com operação piloto.
  - Evidências:
    - PR/commit:
    - Prints/vídeo:
    - Observações:

- [ ] **FE-11**: Responsividade operacional para tablet/celular nos fluxos críticos.
  - Dependências: definição de breakpoints e dispositivos alvo.
  - Evidências:
    - PR/commit:
    - Prints/vídeo:
    - Observações:

- [ ] **FE-12**: Cobertura de testes dos fluxos críticos de pedido/status/permissão.
  - Dependências: massa mínima de testes e mocks de integração controlados.
  - Evidências:
    - PR/commit:
    - Prints/vídeo:
    - Observações:

- [ ] **FE-13**: Endurecimento de observabilidade (Sentry + contexto por ação crítica).
  - Dependências: política de captura e taxonomia de erros.
  - Evidências:
    - PR/commit:
    - Prints/vídeo:
    - Observações:

- [ ] **FE-14**: Fechamento da onda com checklist DoD “módulo sem mock” e evidências finais.
  - Dependências: conclusão de FE-01..FE-13 + validação conjunta front/back.
  - Evidências:
    - PR/commit:
    - Prints/vídeo:
    - Observações:

---

## Dependências (visão consolidada)

1. Contrato de pedido/status backend estável por `organizationId`.
2. Endpoint de criação de pedido e endpoint de atualização/finalização de status.
3. Disponibilidade de papéis/permissões no contexto de sessão.
4. Estratégia de atualização operacional (polling/realtime) para fila única.
5. Modelo de erro padronizado para feedback consistente ao operador.

---

## Check log obrigatório (usar a cada avanço)

> Preencher **sempre** que uma tarefa avançar de status.

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
- Evidências:
  - Build/Check: `pnpm build && pnpm check`
  - Link de PR/commit:
  - Print/vídeo:
- Próximo passo:
  -
```

---

## Histórico de check log

> (Adicionar entradas seguindo o template acima)
