# PRD: Sistema de Restaurante com PDV e Delivery Unificado

**Status**: Draft  
**Autor**: Product Manager  
**Última atualização**: 21/03/2026  
**Versão**: 0.1

## 1. Título

Sistema de restaurante com PDV e delivery unificado para operação omnicanal no mercado brasileiro

## 2. Contexto e problema

Restaurantes no Brasil operam hoje com múltiplos canais de venda e atendimento: salão, balcão, retirada, telefone/WhatsApp e marketplaces como iFood, Rappi e aiqfome. A captura do pedido já está relativamente resolvida pelo mercado, mas a operação segue fragmentada.

Na prática, é comum que o restaurante use:
- um PDV para salão e balcão
- um ou mais marketplaces para delivery
- WhatsApp para atendimento direto
- impressão solta ou comunicação manual com cozinha
- controles paralelos para caixa, atrasos, cancelamentos e conciliação

Essa fragmentação gera problemas operacionais recorrentes:
- fila de pedidos sem prioridade única entre canais
- baixa previsibilidade de atraso e promessa de entrega
- retrabalho entre frente de loja, cozinha e expedição
- dificuldade de operar em pico com poucos cliques e baixo erro
- pouca visibilidade sobre impacto de canal na margem
- alto custo de treinamento e dependência de suporte para ajustes simples

O gap competitivo principal não está em "ter PDV" ou "ter delivery", mas em operar todos os canais sem atrito, com decisão operacional em tempo real.

## 3. Oportunidade

Existe espaço para um produto que una PDV e delivery em uma camada operacional única, centrada em execução e não apenas em captura de pedidos.

Oportunidade clara:
- reduzir atraso, cancelamento e ruptura de promessa
- aumentar produtividade da frente de loja e da cozinha
- dar previsibilidade operacional em horários de pico
- melhorar controle por canal, inclusive impacto em margem
- diminuir dependência de processos paralelos e improvisos

A tese é que restaurantes valorizam mais um sistema que reduz caos operacional do que mais um canal de venda isolado.

## 4. Objetivo do produto

Construir um sistema operacional para restaurantes que centralize pedidos de diferentes canais, organize a fila de produção e expedição com base em tempo prometido e permita que gestão, frente de loja e cozinha trabalhem na mesma verdade operacional.

O produto deve ser capaz de:
- registrar e operar pedidos de salão, balcão, retirada e delivery
- consolidar todos os pedidos em um painel único
- usar o tempo prometido como referência central de priorização
- reduzir fricção operacional em horários de pico
- fornecer visibilidade básica de desempenho operacional e impacto por canal

## 5. Hipótese principal

Se o restaurante operar todos os pedidos em um único sistema, com priorização por canal e promessa de entrega, então conseguirá reduzir atrasos, retrabalho e cancelamentos, mantendo maior controle operacional e protegendo margem mesmo em horários de pico.

## 6. Público-alvo e personas operacionais

**Segmento inicial**
- restaurantes independentes e pequenas redes no Brasil
- operação com consumo local + retirada + delivery
- volume operacional moderado a alto em horários de pico
- dependência relevante de marketplaces, mas necessidade de controle próprio da operação

**Persona 1: Gestor(a) da operação / dono(a)**
- responde por vendas, equipe, caixa, atraso e margem
- precisa entender desempenho por canal e gargalos operacionais
- quer configurar o básico sem depender de suporte
- sofre com falta de visibilidade em tempo real

**Persona 2: Operador(a) de frente de loja / caixa**
- registra pedidos, altera itens, fecha contas, organiza retirada
- trabalha sob pressão e com alto volume simultâneo
- precisa de fluxo rápido, tolerante a erro e fácil de aprender
- sofre com excesso de cliques e telas fragmentadas

**Persona 3: Cozinha / expedição**
- prepara, separa e libera pedidos
- precisa saber o que fazer agora, o que está atrasado e o que sai primeiro
- depende de sinalização clara por etapa e canal
- sofre quando pedido chega incompleto, muda demais ou perde prioridade

## 7. Jobs to be done

**Gestão**
- Quando a operação fica cheia, quero entender onde está o gargalo para agir antes que o atraso vire cancelamento.
- Quando comparo canais, quero ver impacto operacional e financeiro para decidir onde priorizar esforço e promoções.
- Quando ajusto cardápio, preço ou combo, quero refletir isso sem quebrar a operação.

**Frente de loja**
- Quando recebo um pedido no balcão ou mesa, quero lançar e cobrar rápido para não formar fila.
- Quando o cliente pede retirada ou faz alteração, quero corrigir sem retrabalho e sem confundir a cozinha.
- Quando entram pedidos de vários canais ao mesmo tempo, quero saber o status real de cada um sem trocar de tela.

**Cozinha e expedição**
- Quando há muitos pedidos simultâneos, quero ver a ordem de preparo mais importante para cumprir promessa.
- Quando um pedido está atrasando, quero ser alertado cedo para priorizar ou avisar a frente.
- Quando um pedido fica pronto, quero encaminhá-lo para expedição/retirada com confirmação simples e rastreável.

## 8. Escopo do MVP

O MVP deve resolver o núcleo operacional, não toda a gestão do restaurante.

### MVP
- PDV para:
  - balcão
  - salão básico
  - retirada
- Cadastro operacional de cardápio:
  - produtos
  - categorias
  - adicionais
  - combos simples
  - observações
- Gestão unificada de pedidos em tempo real:
  - todos os pedidos entram em uma fila única
  - identificação por canal
  - status operacional padronizado
- Painel único de operação:
  - visão consolidada dos pedidos ativos
  - ordenação por tempo prometido e criticidade
  - filtros por canal, etapa e atraso
- Tempo prometido como entidade central:
  - todo pedido deve ter promessa de preparo/entrega/retirada
  - sistema exibe risco de atraso antes de romper SLA
- Cozinha e expedição:
  - KDS ou impressão por praça/etapa
  - avanço simples de status
  - separação entre "em preparo", "pronto", "aguardando retirada/entrega", "finalizado"
- Delivery integrado em nível inicial:
  - ingestão de pedidos de marketplaces/parceiros suportados
  - padronização de status no painel único
  - confirmação operacional de aceite/preparo/pronto
- Caixa e relatórios básicos:
  - abertura e fechamento de caixa
  - vendas por canal
  - cancelamentos
  - tempo médio por etapa
- CRM básico:
  - cadastro simples de cliente
  - histórico básico de pedidos
  - cupons simples
- Operação mobile:
  - uso viável em tablet/celular para acompanhamento operacional e expedição

### MVP+
- Regras de priorização configuráveis por canal
- Ajuste automático de promessa com base em carga operacional
- Painel de alertas de atraso e exceção
- Visão de margem bruta por canal considerando taxas parametrizadas
- Mais automações de expedição e retirada
- Configurações guiadas para reduzir dependência de suporte

## 9. Fora de escopo

Para manter foco e prazo, ficam fora do MVP:
- roteirização própria de entregas
- frota própria e despacho avançado
- CRM avançado e automações complexas
- programa robusto de fidelidade
- marketing omnichannel
- BI financeiro completo ou contábil
- gestão de estoque profunda
- compras, fiscal e ERP completo
- autoatendimento, totem ou kiosk
- módulo enterprise para multiunidade complexo
- recomendação preditiva avançada baseada em IA

## 10. Diferencial estratégico

O diferencial do produto é a **orquestração operacional unificada por canal e promessa de entrega**.

Isso significa:
- pedidos de qualquer origem entram em uma mesma lógica operacional
- o sistema decide prioridade com base em tempo prometido, estágio do pedido e contexto do canal
- cozinha, expedição e frente de loja operam na mesma fila
- a promessa deixa de ser informativa e passa a comandar a operação
- a gestão acompanha impacto operacional e financeiro por canal

O produto não compete só por feature parity. Compete por reduzir caos, proteger SLA e dar controle de margem.

## 11. Requisitos funcionais

### 11.1 Cadastro e configuração
- Permitir cadastro de produtos, categorias, adicionais e combos.
- Permitir regras básicas de preço por item e adicional.
- Permitir ativar/desativar item sem excluir histórico.
- Permitir associar itens a praças ou estações de preparo.
- Permitir parametrizar tempo base de preparo por item/categoria.
- Permitir configurar taxas por canal para visão gerencial.

### 11.2 PDV
- Criar pedido de balcão, mesa e retirada.
- Adicionar, remover e editar itens antes da finalização.
- Registrar observações por item e por pedido.
- Fechar pedido com formas de pagamento básicas.
- Reabrir ou cancelar pedido conforme permissão.
- Minimizar cliques para lançamento de pedido em pico.

### 11.3 Integração de canais
- Receber pedidos externos em tempo real quando integração estiver disponível.
- Padronizar pedidos externos no mesmo modelo interno de operação.
- Identificar origem do pedido de forma visível.
- Registrar falhas de integração e pedidos pendentes de atenção.
- Evitar duplicidade de pedido recebido por canal.

### 11.4 Orquestração operacional
- Todo pedido deve nascer com:
  - canal
  - horário de entrada
  - tempo prometido
  - prioridade operacional calculada
- O painel deve ordenar pedidos por risco operacional, não apenas por horário.
- O cálculo de prioridade deve considerar no MVP:
  - tempo prometido
  - estágio atual
  - canal
  - atraso potencial
- O sistema deve destacar:
  - pedidos em risco
  - pedidos atrasados
  - pedidos bloqueados por exceção
- Alterações críticas de pedido devem gerar atualização clara para cozinha/expedição.

### 11.5 Painel único de operação
- Exibir todos os pedidos ativos em uma única visão.
- Permitir filtros rápidos por:
  - canal
  - etapa
  - atraso
  - praça
- Permitir ações rápidas de:
  - aceitar
  - iniciar preparo
  - marcar pronto
  - despachar/liberar retirada
  - finalizar
- Exibir relógio operacional por pedido:
  - tempo decorrido
  - tempo prometido
  - desvio da promessa

### 11.6 Cozinha e expedição
- Permitir KDS e/ou impressão por praça.
- Exibir pedidos por estágio operacional.
- Sinalizar prioridade e risco de atraso visualmente.
- Permitir confirmação simples de avanço de etapa.
- Exigir confirmação final antes de liberar pedido para retirada/entrega.
- Registrar horário de cada mudança de status.

### 11.7 Caixa e relatórios
- Abertura e fechamento de caixa por operador/turno.
- Relatório básico de vendas por canal.
- Relatório de cancelamentos e motivo.
- Relatório operacional com:
  - tempo médio até preparo
  - tempo médio até pronto
  - tempo médio até entrega/retirada
  - taxa de atraso
- Dashboard gerencial inicial com foco operacional, não contábil.

### 11.8 Clientes e promoções
- Cadastro simples de cliente com telefone/nome.
- Histórico básico de pedidos.
- Aplicação de cupom simples.
- Regras promocionais complexas ficam para depois.

### 11.9 Permissões e auditoria
- Perfis mínimos:
  - gestão
  - caixa/frente
  - cozinha/expedição
- Registrar eventos críticos:
  - cancelamento
  - alteração de pedido
  - mudança manual de promessa
  - fechamento/reabertura

## 12. Requisitos não funcionais

- Alta estabilidade em operação de pico.
- Baixo tempo de resposta nas ações principais do PDV e do painel.
- Fluxos principais devem funcionar bem em tablet e desktop.
- Interface deve priorizar legibilidade, contraste e estados claros.
- Sistema deve tolerar falhas temporárias de integração, com reprocessamento controlado.
- Logs mínimos para rastreabilidade operacional.
- Controle de acesso por perfil.
- Persistência confiável de eventos de pedido e status.
- Arquitetura preparada para operação near real-time.
- Onboarding e configuração inicial devem ser simples o suficiente para pequena operação.
- Linguagem e fluxos adaptados à realidade operacional brasileira.

## 13. Fluxos principais

### 13.1 Pedido no balcão/salão
1. Operador inicia pedido.
2. Seleciona canal e contexto: mesa, balcão ou retirada.
3. Adiciona itens, adicionais e observações.
4. Sistema calcula tempo prometido inicial.
5. Pedido é confirmado e entra na fila unificada.
6. Cozinha recebe instrução por KDS/impressão.
7. Pedido avança por preparo > pronto > entregue/finalizado.

### 13.2 Pedido vindo de delivery
1. Pedido entra por integração.
2. Sistema normaliza dados e cria pedido interno.
3. Pedido recebe tempo prometido e prioridade.
4. Painel único exibe o pedido junto aos demais canais.
5. Operação acompanha aceite, preparo, pronto e expedição.
6. Gestão e frente visualizam risco de atraso no mesmo painel.

### 13.3 Priorização em pico
1. Vários pedidos entram em sequência.
2. Sistema ordena fila por tempo prometido e risco.
3. Operação visualiza claramente o que deve sair primeiro.
4. Pedidos em risco mudam de estado visual antes do atraso.
5. Exceções são tratadas sem perder contexto do restante da fila.

### 13.4 Retirada e expedição
1. Pedido pronto é enviado para área de retirada/expedição.
2. Operador confirma conferência.
3. Sistema registra horário de liberação.
4. Pedido muda para status final correspondente.
5. Caso haja atraso ou problema, pedido pode entrar em exceção com motivo.

## 14. Métricas de sucesso

### Métricas de produto e operação
- Redução da taxa de pedidos atrasados.
- Redução da taxa de cancelamento por falha operacional.
- Redução do tempo médio entre entrada do pedido e início do preparo.
- Redução do tempo médio total por pedido em canais críticos.
- Redução de reimpressão e retrabalho operacional.
- Aumento da taxa de pedidos operados sem intervenção manual extraordinária.

### Métricas de adoção
- % de pedidos operados pelo painel único
- % de pedidos com tracking completo de status
- uso recorrente do painel pela frente de loja e cozinha
- % de estabelecimentos com canais ativos no fluxo unificado

### Métricas gerenciais
- vendas por canal
- taxa de atraso por canal
- taxa de cancelamento por canal
- margem bruta estimada por canal no MVP+

### Metas iniciais sugeridas para piloto
- 90%+ dos pedidos ativos visíveis no painel único
- redução de 20% no atraso operacional em operações piloto
- redução de 15% em cancelamentos ligados à execução
- 95%+ de mudança de status registrada corretamente nos pedidos do piloto

## 15. Riscos e dependências

### Riscos
- Complexidade de integração com marketplaces e parceiros.
- Diferenças operacionais relevantes entre tipos de restaurante.
- Resistência de equipe acostumada a processos manuais ou sistemas legados.
- Excesso de escopo no MVP por tentar cobrir toda a operação.
- Promessa de tempo mal calibrada gerar perda de confiança no sistema.
- UX ruim em pico comprometer adoção mesmo com boa arquitetura.

### Dependências
- disponibilidade e qualidade das APIs/parceiros de integração
- definição clara do modelo de status operacional unificado
- desenho de experiência para pico com validação em campo
- infraestrutura para atualização em tempo real
- piloto com restaurantes que tenham operação multicanal real
- definição de hardware suportado para KDS/impressão/mobile

## 16. Roadmap sugerido em fases

### Fase 0: Descoberta e validação operacional
- mapear jornadas reais de gestão, frente e cozinha
- validar modelo de fila única e estados operacionais
- testar conceito de tempo prometido com operadores
- definir recorte inicial de restaurante-alvo

### Fase 1: MVP operacional
- PDV básico para balcão, salão e retirada
- cadastro de cardápio, combos simples e adicionais
- painel único de operação
- status unificado de pedidos
- KDS/impressão
- caixa e relatórios básicos
- operação mobile básica

### Fase 2: Delivery unificado
- integrações prioritárias de canais
- pedidos externos dentro da mesma fila
- tratamento de exceções de integração
- indicadores por canal
- estabilização do fluxo de pico

### Fase 3: MVP+
- priorização configurável por canal
- alertas operacionais e risco de atraso
- promessa dinâmica baseada em carga
- visão de margem por canal
- melhorias de configuração autônoma

### Fase 4: Expansão
- mais canais e integrações
- multiunidade
- automações mais sofisticadas
- inteligência preditiva de operação e promessa

## 17. Questões em aberto

- Quais integrações de delivery entram primeiro no recorte real do MVP?
- O MVP terá foco em restaurante de balcão, casual dining, pizzaria, dark kitchen ou um recorte mais específico?
- O tempo prometido será manual, parametrizado ou parcialmente calculado desde o início?
- Qual nível de automação é aceitável no MVP sem comprometer confiança da operação?
- KDS será obrigatório no MVP ou impressão cobre o piloto inicial?
- Qual hardware mínimo será oficialmente suportado?
- O módulo de salão no MVP precisa incluir conta por mesa, separação e transferência, ou ficará em fluxo simplificado?
- Qual profundidade de caixa/relatórios é suficiente sem puxar o produto para ERP?
- Como será tratada a operação sem internet ou com integração instável?
- Quais métricas serão usadas como critério de go/no-go após o piloto?
