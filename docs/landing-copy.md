# Landing Copy Guide

## Objetivo

Padronizar a voz da landing, reduzir ambiguidades de CTA e manter consistencia de copy em todas as secoes.

## Voz e tom

- Clareza acima de criatividade.
- Frases curtas, foco em resultado operacional.
- Linguagem direta para contexto de restaurante.
- Evitar promessas absolutas (usar "estimativa", "dados reportados", "pode variar").

## Estrutura narrativa da landing

1. Promessa clara (Hero)
2. ICP explicito acima da dobra (quem atende e em qual contexto)
3. Dor operacional (retrabalho, erros, lentidao)
4. Solucao concreta (integracoes + recursos)
5. Prova com contexto e fonte verificavel
6. Oferta e proximo passo (Pricing + CTA)

## Prioridades atuais de conversao

1. Corrigir qualquer CTA ou modal que nao conclua uma jornada real.
2. Deixar um CTA principal por intencao e por contexto visual.
3. Explicar em ate 5 segundos: para quem e, qual ganho principal e qual proximo passo.
4. Substituir sinais genericos de confianca por prova verificavel.
5. Reduzir friccao de captura: menos campos, menos duvida, mais contexto de privacidade e retorno.

## Above the fold

- A hero deve responder imediatamente: `o que e`, `para quem e` e `por que agir agora`.
- O subtitulo deve trazer 2 ou 3 ganhos concretos, nao apenas categoria de produto.
- O CTA principal deve ser unico e visivel sem scroll em desktop e mobile.
- Se existir CTA secundario, ele nao pode competir com a acao principal.
- A prova inicial precisa aparecer acima da dobra ou no primeiro scroll curto.
- Mock, logo ou depoimento sem lastro real deve ser removido ou marcado como placeholder interno, nunca publicado.

## Taxonomia de CTA

Use sempre labels por intencao. Nao misturar intents com o mesmo texto.

- Cadastro: `Criar conta gratis`
- Demo: `Ver demonstracao`
- Comercial: `Falar com especialista`
- Simulacao: `Calcular seu ROI estimado`
- Acao final no modal: `Quero agendar minha demo`

### Regras de uso

- Nao reutilizar o mesmo CTA para intents diferentes.
- Todo CTA precisa levar a um destino funcional, medivel e coerente com a copy ao redor.
- CTA de ROI nao pode abrir fluxo quebrado ou modal inexistente.
- CTA comercial deve explicar o que acontece depois do clique.

## Prova e confianca

- Priorizar screenshot real, caso real, numero com periodo e fonte, logo autorizado e depoimento atribuivel.
- Evitar logos ilustrativos, prova social vaga ou frases sem referencia operacional.
- Toda claim deve informar base minima: `periodo`, `origem` ou `condicao de estimativa`.
- Se a prova ainda nao estiver validada por comercial/legal, nao usar na landing publica.

## Captura de lead

- Formularios de demo devem pedir apenas o necessario para o primeiro contato.
- Ordem preferida: `nome`, `WhatsApp ou email`, `restaurante` e no maximo um campo de qualificacao.
- Todo modal precisa ter estado de sucesso, erro, fallback e expectativa de retorno.
- Texto de privacidade deve reduzir friccao, sem juridiquese.
- Se a jornada principal for cadastro self-serve, a demo deve funcionar como alternativa, nao como bloqueio.

## SEO landing pages

- Cada pagina por segmento, integracao ou caso de uso deve ter promessa propria.
- Nao duplicar a home com troca superficial de palavras-chave.
- Toda pagina SEO precisa de CTA coerente com a intencao da busca.
- Interlinking deve conectar home, paginas de segmento, integracoes e conversao.

## Termos recomendados

- `operacao`, `pedido`, `estoque`, `atendimento`, `turno`, `horario de pico`
- `dados reportados`, `estimativa`, `base`, `periodo`

## Termos a evitar

- `revolucionario`, `magico`, `garantido`, `zero risco`
- claims sem contexto temporal/metodologico

## Checklist de revisao de copy

- [ ] Texto em pt-BR e sem termos ambiguos.
- [ ] Beneficio principal entendido em ate 5 segundos na Hero.
- [ ] ICP e contexto operacional claros acima da dobra.
- [ ] CTA com intencao unica e label consistente.
- [ ] CTA leva para fluxo funcional e medivel.
- [ ] Existe prova verificavel acima da dobra ou no primeiro scroll.
- [ ] Toda metrica/claim possui contexto minimo (base + periodo) ou esta marcada como estimativa.
- [ ] Pricing responde objecoes basicas (fit, risco, suporte).
- [ ] Modal de demo comunica valor + proximo passo + privacidade.
- [ ] Paginas SEO possuem promessa, prova e CTA especificos para a intencao alvo.

## Mapeamento de secoes

- `src/components/sections/hero.tsx`: promessa + CTA principal
- `src/components/sections/integrations.tsx`: ganho operacional por integracao
- `src/components/sections/features.tsx`: beneficios por persona
- `src/components/sections/testimonial.tsx`: prova social contextualizada
- `src/components/sections/roi/index.tsx`: estimativas com premissas
- `src/components/sections/pricing.tsx`: decisao sem friccao
- `src/components/sections/sales.tsx`: conversao de demo com baixa friccao
- `src/components/layout/navbar.tsx`: CTA persistente e hierarquia de navegacao
- `src/app/routes/home/index.tsx`: ordem narrativa e continuidade do funil
- `src/app/routes/index.ts`: rotas publicas e futuras landings SEO
