# Objetivo da priorização

Priorizar um backlog inicial para o MVP e o MVP+ de um sistema de restaurante com PDV e delivery unificado, maximizando a entrega do núcleo operacional: captura rápida de pedidos, fila única por canal, priorização por promessa de entrega, execução em cozinha/expedição e visibilidade gerencial básica.

# Premissas de planejamento

- O PRD é a única fonte de verdade; itens em aberto foram tratados como premissas operacionais para não travar o plano.
- O MVP prioriza operação de balcão, salão básico e retirada, com delivery integrado em nível inicial.
- O modelo de status unificado será o backbone do produto: `novo/aceito/em preparo/pronto/aguardando retirada ou entrega/finalizado/cancelado/exceção`.
- O tempo prometido no MVP será inicialmente parametrizado por item/categoria e ajustado por regras simples, sem previsão avançada.
- O salão no MVP terá fluxo simplificado, sem separar conta, transferir mesa ou recursos avançados.
- O piloto inicial deve aceitar KDS e impressão, mas impressão pode ser fallback operacional.
- Operação mobile será responsiva para acompanhamento e expedição; fluxo pesado de cadastro fica preferencialmente em desktop/tablet.
- Integrações de delivery entram em arquitetura preparada para múltiplos parceiros, mas com 1 integração prioritária no recorte inicial.
- Caixa e relatórios ficam no nível operacional e gerencial básico, sem ambição de ERP/fiscal.
- MVP+ cobre ganhos de orquestração e inteligência operacional, não expansão ampla de escopo.

# Épicos priorizados

| Épico | Fase | Prioridade | Objetivo |
|---|---|---|---|
| E1. Fundamentos operacionais e acesso | MVP | P0 | Garantir base segura de usuários, perfis, auditoria e eventos |
| E2. Cardápio e configuração operacional | MVP | P0 | Permitir operar produtos, adicionais, combos, praças e tempos base |
| E3. PDV básico omnicanal | MVP | P0 | Capturar pedidos de balcão, salão básico e retirada com poucos cliques |
| E4. Pedido unificado e orquestração por promessa | MVP | P0 | Centralizar pedidos e priorizar por risco operacional |
| E5. Painel único de operação | MVP | P0 | Dar visão única dos pedidos ativos e ações rápidas por etapa |
| E6. Cozinha, KDS, impressão e expedição | MVP | P0 | Executar preparo e liberação com rastreabilidade |
| E7. Delivery integrado inicial | MVP | P1 | Ingerir pedidos externos e normalizar no fluxo único |
| E8. Caixa, relatórios e visão gerencial básica | MVP | P1 | Fechar turno e medir operação por canal |
| E9. Cliente, histórico e cupons simples | MVP | P1 | Suportar operação recorrente e promoções básicas |
| E10. Operação mobile | MVP | P1 | Viabilizar uso em tablet/celular nas rotinas críticas |
| E11. Alertas, priorização configurável e promessa dinâmica | MVP+ | P2 | Evoluir inteligência operacional |
| E12. Margem por canal e autonomia de configuração | MVP+ | P2 | Melhorar decisão gerencial e reduzir dependência de suporte |

# Backlog frontend

## E1. Fundamentos operacionais e acesso

| Tarefa | Prioridade | Tamanho | Descrição | Dependências |
|---|---|---:|---|---|
| Tela de login e seleção de unidade/turno | P0 | P | Acesso inicial para operadores entrarem rapidamente na operação | Backend de autenticação |
| Gestão de sessão e controle por perfil | P0 | M | Restringe ações de gestão, caixa e cozinha conforme papel | Modelo de permissões |
| Componentes base de UI operacional | P0 | M | Biblioteca inicial de cards, badges, status, timers, filtros e feedbacks | Nenhuma |
| Registro visual de ações críticas no front | P1 | P | Exibe confirmações e erros para cancelamento, reabertura e alterações críticas | Eventos/auditoria |

## E2. Cardápio e configuração operacional

| Tarefa | Prioridade | Tamanho | Descrição | Dependências |
|---|---|---:|---|---|
| Lista e cadastro de categorias | P0 | P | Permite criar e organizar categorias do cardápio | APIs de catálogo |
| Lista e cadastro de produtos | P0 | M | Formulário para preço, status, categoria e tempo base | APIs de catálogo |
| Cadastro de adicionais e grupos de adicionais | P0 | M | Configura complementos usados no PDV | APIs de catálogo |
| Cadastro de combos simples | P0 | M | Monta combos básicos para operação do MVP | Produtos e adicionais |
| Configuração de praça/estação por item | P0 | P | Associa itens às praças de preparo | Modelo de praça |
| Ativar/desativar item sem exclusão | P0 | P | Mantém histórico e evita ruptura operacional | APIs de catálogo |
| Configuração de taxas por canal | P1 | P | Permite parametrização gerencial para relatórios básicos | Backend de canais |

## E3. PDV básico omnicanal

| Tarefa | Prioridade | Tamanho | Descrição | Dependências |
|---|---|---:|---|---|
| Tela de criação rápida de pedido | P0 | M | Inicia pedido para balcão, mesa ou retirada com fluxo enxuto | Catálogo carregado |
| Busca e seleção rápida de itens | P0 | M | Permite lançar pedido com poucos cliques em pico | Catálogo e performance |
| Edição de itens, quantidades e adicionais | P0 | M | Ajusta pedido antes da confirmação | Motor de pedido |
| Observação por item e por pedido | P0 | P | Captura instruções operacionais para cozinha | Modelo de pedido |
| Contexto de salão básico e identificação de mesa | P0 | P | Vincula pedido a mesa sem recursos avançados | Pedido omnicanal |
| Identificação de cliente em retirada | P0 | P | Associa nome/telefone ao pedido | Cadastro de cliente |
| Fechamento de pedido com pagamento básico | P0 | M | Conclui venda com formas básicas de pagamento | Caixa e pedido |
| Reabertura/cancelamento conforme permissão | P1 | P | Permite correção com controle por perfil | Permissões e auditoria |

## E4. Pedido unificado e orquestração por promessa

| Tarefa | Prioridade | Tamanho | Descrição | Dependências |
|---|---|---:|---|---|
| Exibição do relógio operacional por pedido | P0 | P | Mostra tempo decorrido, prometido e desvio | Motor de prioridade |
| Badges de canal, etapa e criticidade | P0 | P | Torna clara a origem e urgência do pedido | Modelo unificado |
| Atualização em tempo real da lista de pedidos | P0 | M | Mantém operação sincronizada entre frente, cozinha e expedição | Infra real-time |
| Sinalização visual de risco, atraso e exceção | P0 | P | Antecipação visual antes da quebra de SLA | Cálculo de risco |
| Histórico visual de alterações críticas | P1 | P | Dá contexto quando pedido muda após entrar em produção | Auditoria de eventos |

## E5. Painel único de operação

| Tarefa | Prioridade | Tamanho | Descrição | Dependências |
|---|---|---:|---|---|
| Painel consolidado de pedidos ativos | P0 | G | Tela principal com fila única de operação | Pedido unificado |
| Ordenação por prioridade operacional | P0 | M | Renderiza a ordem vinda do backend com feedback claro | Motor de prioridade |
| Filtros rápidos por canal, etapa, atraso e praça | P0 | M | Permite leitura operacional em pico | Painel consolidado |
| Ações rápidas por pedido no painel | P0 | M | Aceitar, iniciar preparo, marcar pronto, liberar e finalizar | Workflow de status |
| Modo de visualização otimizado para pico | P0 | M | Densidade, contraste e legibilidade para alto volume | Componentes base |
| Painel de exceções de integração e operação | P1 | P | Destaca pedidos pendentes de atenção | Backend de exceções |

## E6. Cozinha, KDS, impressão e expedição

| Tarefa | Prioridade | Tamanho | Descrição | Dependências |
|---|---|---:|---|---|
| Tela KDS por praça/estação | P0 | M | Exibe pedidos filtrados por área de preparo | Praças e status |
| Sinalização visual forte de prioridade no KDS | P0 | P | Destaca o que precisa sair primeiro | Motor de prioridade |
| Avanço simples de status no KDS | P0 | P | Permite operar com poucos toques | Workflow de status |
| Tela de expedição/retirada | P0 | M | Separa pedidos prontos para conferência e liberação | Status pronto |
| Confirmação final de liberação | P0 | P | Evita erro na retirada/entrega | Workflow de expedição |
| Modo mobile para cozinha/expedição | P1 | M | Uso viável em tablet/celular | Responsividade e real-time |
| Configuração de impressão por praça | P1 | P | Define fallback ou operação híbrida com impressoras | Backend de impressão |

## E7. Delivery integrado inicial

| Tarefa | Prioridade | Tamanho | Descrição | Dependências |
|---|---|---:|---|---|
| Exibição clara da origem do pedido externo | P1 | P | Diferencia marketplace/parceiro no painel | Integração de canais |
| Ações operacionais para pedido integrado | P1 | M | Permite aceite, preparo e pronto no mesmo fluxo | Workflow unificado |
| Lista de falhas e pendências de integração | P1 | P | Apoia tratamento manual de exceções | Backend de falhas |

## E8. Caixa, relatórios e visão gerencial básica

| Tarefa | Prioridade | Tamanho | Descrição | Dependências |
|---|---|---:|---|---|
| Tela de abertura de caixa | P1 | P | Inicia turno por operador | Backend de caixa |
| Tela de fechamento de caixa | P1 | P | Consolida encerramento do turno | Backend de caixa |
| Relatório de vendas por canal | P1 | M | Visão gerencial básica por período | Agregações de vendas |
| Relatório de cancelamentos | P1 | P | Lista ocorrências e motivos | Auditoria |
| Relatório operacional por etapa | P1 | M | Mostra tempos médios e taxa de atraso | Eventos de status |
| Dashboard operacional inicial | P1 | M | KPIs principais para gestor | Relatórios básicos |

## E9. Cliente, histórico e cupons simples

| Tarefa | Prioridade | Tamanho | Descrição | Dependências |
|---|---|---:|---|---|
| Busca/cadastro rápido de cliente | P1 | P | Nome e telefone no fluxo do PDV | Backend de cliente |
| Histórico básico de pedidos do cliente | P1 | P | Consulta de pedidos anteriores | Pedidos e cliente |
| Aplicação de cupom simples no PDV | P1 | P | Desconto direto com regra básica | Motor de preço/cupom |

## E10. Operação mobile

| Tarefa | Prioridade | Tamanho | Descrição | Dependências |
|---|---|---:|---|---|
| Adaptação responsiva do painel único | P1 | M | Uso operacional em tablet/celular | Painel pronto |
| Adaptação responsiva da expedição | P1 | P | Fluxo rápido em dispositivos menores | Expedição pronta |
| Ajustes de touch targets e legibilidade | P1 | P | Reduz erro operacional em toque | Componentes base |

## E11. Alertas, priorização configurável e promessa dinâmica

| Tarefa | Prioridade | Tamanho | Descrição | Dependências |
|---|---|---:|---|---|
| Painel de alertas operacionais | P2 | M | Centraliza risco de atraso e exceções | Motor de alertas |
| UI para configuração de prioridade por canal | P2 | M | Ajusta pesos operacionais por canal | Regras configuráveis |
| Exibição de promessa ajustada dinamicamente | P2 | P | Mostra nova previsão quando carga muda | Backend de promessa dinâmica |

## E12. Margem por canal e autonomia de configuração

| Tarefa | Prioridade | Tamanho | Descrição | Dependências |
|---|---|---:|---|---|
| Dashboard de margem bruta estimada por canal | P2 | M | Exibe receita menos taxas parametrizadas | Taxas por canal |
| Fluxos guiados de configuração inicial | P2 | M | Reduz dependência de suporte no onboarding | Configuração operacional |

# Backlog backend

## E1. Fundamentos operacionais e acesso

| Tarefa | Prioridade | Tamanho | Descrição | Dependências |
|---|---|---:|---|---|
| Autenticação básica e sessão | P0 | M | Login seguro e gestão de sessão por usuário | Nenhuma |
| Modelo de perfis e permissões | P0 | M | Gestão, caixa/frente e cozinha/expedição | Autenticação |
| Log de auditoria para eventos críticos | P0 | M | Registra cancelamento, alteração, promessa manual e reabertura | Modelo de eventos |
| Infra de eventos de pedido | P0 | G | Base para rastreabilidade e relatórios por mudança de status | Modelagem de pedido |
| Canal em tempo real para atualização operacional | P0 | M | Distribui mudanças no painel/KDS | Infra de eventos |

## E2. Cardápio e configuração operacional

| Tarefa | Prioridade | Tamanho | Descrição | Dependências |
|---|---|---:|---|---|
| Modelagem de catálogo operacional | P0 | M | Produtos, categorias, adicionais, combos e observações | Nenhuma |
| CRUD de categorias e produtos | P0 | M | Cadastro e manutenção do cardápio | Modelagem de catálogo |
| CRUD de adicionais e combos simples | P0 | M | Estrutura comercial do MVP | Modelagem de catálogo |
| Ativação/desativação com preservação de histórico | P0 | P | Evita perda de referência operacional | Catálogo |
| Modelagem de praças/estações | P0 | P | Vincula item à área de preparo | Catálogo |
| Parametrização de tempo base por item/categoria | P0 | P | Alimenta promessa inicial | Catálogo |
| Parametrização de taxas por canal | P1 | P | Suporta relatórios e margem futura | Canais |

## E3. PDV básico omnicanal

| Tarefa | Prioridade | Tamanho | Descrição | Dependências |
|---|---|---:|---|---|
| Serviço de criação de pedido interno | P0 | G | Cria pedidos de balcão, salão e retirada | Catálogo e perfis |
| Cálculo de preço do pedido | P0 | M | Soma itens, adicionais, combos e descontos simples | Catálogo |
| Edição de pedido antes da finalização | P0 | M | Permite alterar itens e observações com consistência | Serviço de pedido |
| Fechamento com formas básicas de pagamento | P0 | M | Conclui venda e envia pedido para operação | Caixa e pedido |
| Reabertura/cancelamento com permissão | P1 | M | Controla mudanças críticas e trilha de auditoria | Perfis e auditoria |

## E4. Pedido unificado e orquestração por promessa

| Tarefa | Prioridade | Tamanho | Descrição | Dependências |
|---|---|---:|---|---|
| Modelo unificado de pedido multicanal | P0 | G | Padroniza canal, horário, promessa, etapa e prioridade | Serviço de pedido |
| Máquina de status operacional | P0 | G | Garante transições válidas entre aceite, preparo, pronto, expedição e finalização | Modelo unificado |
| Cálculo inicial de tempo prometido | P0 | M | Define promessa com base em parâmetros simples | Tempos base |
| Motor de prioridade operacional do MVP | P0 | G | Ordena por tempo prometido, estágio, canal e risco de atraso | Modelo unificado |
| Cálculo de risco e atraso | P0 | M | Classifica pedidos em risco, atrasados e bloqueados | Motor de prioridade |
| Histórico temporal por mudança de status | P0 | M | Persiste horário de cada etapa | Máquina de status |
| Tratamento de alterações críticas em pedido ativo | P1 | M | Notifica impacto para cozinha/expedição | Eventos em tempo real |

## E5. Painel único de operação

| Tarefa | Prioridade | Tamanho | Descrição | Dependências |
|---|---|---:|---|---|
| API de consulta da fila única | P0 | M | Retorna pedidos ativos consolidados com ordenação operacional | Motor de prioridade |
| API de filtros por canal, etapa, praça e atraso | P0 | P | Permite leitura segmentada da fila | Modelo unificado |
| Endpoints de ação rápida por pedido | P0 | M | Aceitar, iniciar preparo, pronto, liberar, finalizar | Máquina de status |
| Serviço de refresh near real-time | P0 | M | Sincroniza painel, KDS e expedição | Canal em tempo real |
| API de exceções operacionais | P1 | P | Lista pedidos bloqueados ou pendentes | Tratamento de exceções |

## E6. Cozinha, KDS, impressão e expedição

| Tarefa | Prioridade | Tamanho | Descrição | Dependências |
|---|---|---:|---|---|
| API de KDS por praça | P0 | M | Entrega fila de preparo filtrada por estação | Praças e prioridade |
| Serviço de impressão por praça | P0 | M | Gera saídas de impressão como fallback ou operação híbrida | Praças e pedido |
| Confirmação de avanço de etapa | P0 | P | Persiste mudanças simples e rastreáveis | Máquina de status |
| Fluxo de conferência e liberação final | P0 | M | Exige validação antes de retirada/entrega | Máquina de status |
| Registro de exceção operacional com motivo | P1 | P | Captura problemas na expedição/retirada | Auditoria |

## E7. Delivery integrado inicial

| Tarefa | Prioridade | Tamanho | Descrição | Dependências |
|---|---|---:|---|---|
| Arquitetura de integração de canais | P1 | G | Define conectores, normalização e reprocessamento | Modelo unificado |
| Conector do parceiro prioritário | P1 | G | Recebe pedidos externos em tempo real | Arquitetura de integração |
| Normalização de pedido externo para modelo interno | P1 | M | Converte payload externo em pedido operacional padrão | Modelo unificado |
| Deduplicação de pedidos por canal | P1 | M | Evita pedido duplicado na fila | Integração |
| Sincronização de status com canal externo | P1 | M | Reflete aceite/preparo/pronto conforme parceiro permitir | Máquina de status |
| Tratamento de falhas e reprocessamento controlado | P1 | M | Tolerância a integração instável | Arquitetura de integração |
| Registro de pedidos pendentes de atenção | P1 | P | Expõe falhas para operação | Tratamento de falhas |

## E8. Caixa, relatórios e visão gerencial básica

| Tarefa | Prioridade | Tamanho | Descrição | Dependências |
|---|---|---:|---|---|
| Serviço de abertura de caixa por operador/turno | P1 | M | Inicia sessão de caixa rastreável | Usuários e permissões |
| Serviço de fechamento de caixa | P1 | M | Consolida turno e valores básicos | Abertura de caixa |
| Agregação de vendas por canal | P1 | M | Base para relatório gerencial | Pedidos finalizados |
| Relatório de cancelamentos e motivos | P1 | P | Apoia gestão operacional | Auditoria |
| Métricas operacionais por etapa | P1 | M | Calcula tempos médios e taxa de atraso | Histórico de status |
| Dashboard gerencial inicial | P1 | M | Entrega KPIs operacionais centrais | Agregações e métricas |

## E9. Cliente, histórico e cupons simples

| Tarefa | Prioridade | Tamanho | Descrição | Dependências |
|---|---|---:|---|---|
| Cadastro simples de cliente | P1 | P | Nome e telefone com busca rápida | Nenhuma |
| Vinculação de cliente ao pedido | P1 | P | Associa histórico ao fluxo operacional | Serviço de pedido |
| Histórico básico de pedidos do cliente | P1 | P | Consulta rápida de recorrência | Cliente e pedido |
| Motor simples de cupom | P1 | M | Aplica desconto com regra básica | Cálculo de preço |

## E10. Operação mobile

| Tarefa | Prioridade | Tamanho | Descrição | Dependências |
|---|---|---:|---|---|
| Otimização de payloads para telas operacionais | P1 | P | Reduz latência em dispositivos móveis | APIs de painel/KDS |
| Estratégia de reconexão para uso em rede instável | P1 | M | Mantém operação próxima do tempo real | Canal em tempo real |

## E11. Alertas, priorização configurável e promessa dinâmica

| Tarefa | Prioridade | Tamanho | Descrição | Dependências |
|---|---|---:|---|---|
| Motor de alertas operacionais | P2 | M | Dispara alertas de risco, atraso e exceção | Cálculo de risco |
| Configuração de pesos por canal no motor de prioridade | P2 | M | Permite ajuste fino da fila | Motor de prioridade |
| Ajuste dinâmico de promessa por carga operacional | P2 | G | Recalcula promessa com base em fila e capacidade | Eventos e prioridade |

## E12. Margem por canal e autonomia de configuração

| Tarefa | Prioridade | Tamanho | Descrição | Dependências |
|---|---|---:|---|---|
| Cálculo de margem bruta estimada por canal | P2 | M | Considera taxas parametrizadas por canal | Taxas e vendas |
| Assistente de configuração inicial | P2 | M | Padroniza onboarding de cardápio, praça e tempos | Catálogo e parâmetros |

# Dependências críticas

- Definição do modelo unificado de pedido, status e eventos antes de avançar em painel, KDS, integrações e relatórios.
- Decisão do conector de delivery prioritário para evitar arquitetura genérica demais no MVP.
- Infraestrutura near real-time para painel único, KDS e expedição sincronizados.
- Modelagem de promessa inicial e critérios de prioridade operacional validados com operação piloto.
- Catálogo operacional com praças e tempos base antes de fechar PDV e orquestração.
- Política mínima de permissões e auditoria antes de liberar cancelamento, reabertura e mudanças críticas.
- Definição de hardware suportado para impressão/KDS/mobile antes de estabilização do piloto.
- Validação de UX de pico para PDV e painel único antes do rollout de operação real.

# Sequência sugerida de sprints

## Sprint 0 — Descoberta aplicada e foundations

- Fechar modelo unificado de pedido, status, eventos e promessa inicial.
- Definir perfis, permissões e eventos críticos de auditoria.
- Estruturar componentes base de UI operacional.
- Modelar catálogo operacional, praças e tempos base.
- Definir arquitetura near real-time e estratégia de integração de canais.

## Sprint 1 — Catálogo + PDV básico

- Entregar cadastro de categorias, produtos, adicionais, combos simples e praças.
- Entregar criação rápida de pedido para balcão, salão básico e retirada.
- Entregar edição de itens, observações e fechamento básico.
- Disponibilizar autenticação, sessão e perfis mínimos.
- Publicar primeira versão do serviço de pedido interno.

## Sprint 2 — Fila única + painel operacional

- Entregar modelo unificado de pedido multicanal e máquina de status.
- Entregar cálculo inicial de tempo prometido e prioridade do MVP.
- Entregar painel único com fila consolidada, filtros e ações rápidas.
- Entregar atualização em tempo real e sinalização de risco/atraso.
- Validar fluxo de pico com pedidos internos apenas.

## Sprint 3 — Cozinha, expedição e rastreabilidade

- Entregar KDS por praça com avanço simples de status.
- Entregar expedição/retirada com confirmação final.
- Entregar impressão por praça como fallback operacional.
- Persistir histórico temporal completo por etapa.
- Estabilizar operação mobile para painel/KDS/expedição.

## Sprint 4 — Caixa + relatórios + cliente

- Entregar abertura e fechamento de caixa por operador/turno.
- Entregar relatórios de vendas por canal, cancelamentos e tempos operacionais.
- Entregar dashboard gerencial inicial.
- Entregar cadastro simples de cliente, histórico básico e cupom simples.
- Preparar piloto end-to-end do núcleo operacional.

## Sprint 5 — Delivery integrado inicial

- Subir arquitetura de integração e conector prioritário.
- Ingerir pedidos externos, normalizar no modelo interno e deduplicar.
- Expor falhas de integração e fluxo de reprocessamento controlado.
- Sincronizar status essenciais com o canal externo.
- Estabilizar operação multicanal no painel único.

## Sprint 6 — Endurecimento do MVP e go-live piloto

- Corrigir gargalos de performance e UX em pico.
- Refinar prioridade operacional e calibragem da promessa inicial.
- Fechar lacunas de auditoria, exceções e suporte à operação real.
- Consolidar métricas de piloto e critérios de go/no-go.
- Preparar backlog de MVP+ com base em uso real.

## Pós-MVP — MVP+

- Priorização configurável por canal.
- Alertas operacionais e painel de exceções mais robusto.
- Promessa dinâmica baseada em carga.
- Margem bruta estimada por canal.
- Configuração guiada para maior autonomia operacional.
