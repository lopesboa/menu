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
2. Dor operacional (retrabalho, erros, lentidao)
3. Solucao concreta (integracoes + recursos)
4. Prova com contexto (depoimentos e ROI com base temporal)
5. Oferta e proximo passo (Pricing + CTA)

## Taxonomia de CTA

Use sempre labels por intencao. Nao misturar intents com o mesmo texto.

- Cadastro: `Criar conta gratis`
- Demo: `Ver demonstracao`
- Comercial: `Falar com especialista`
- Simulacao: `Calcular seu ROI estimado`
- Acao final no modal: `Quero agendar minha demo`

## Termos recomendados

- `operacao`, `pedido`, `estoque`, `atendimento`, `turno`, `horario de pico`
- `dados reportados`, `estimativa`, `base`, `periodo`

## Termos a evitar

- `revolucionario`, `magico`, `garantido`, `zero risco`
- claims sem contexto temporal/metodologico

## Checklist de revisao de copy

- [ ] Texto em pt-BR e sem termos ambiguos.
- [ ] Beneficio principal entendido em ate 5 segundos na Hero.
- [ ] CTA com intencao unica e label consistente.
- [ ] Toda metrica/claim possui contexto minimo (base + periodo) ou esta marcada como estimativa.
- [ ] Pricing responde objecoes basicas (fit, risco, suporte).
- [ ] Modal de demo comunica valor + proximo passo + privacidade.

## Mapeamento de secoes

- `src/components/sections/hero.tsx`: promessa + CTA principal
- `src/components/sections/integrations.tsx`: ganho operacional por integracao
- `src/components/sections/features.tsx`: beneficios por persona
- `src/components/sections/testimonial.tsx`: prova social contextualizada
- `src/components/sections/roi/index.tsx`: estimativas com premissas
- `src/components/sections/pricing.tsx`: decisao sem friccao
- `src/components/sections/sales.tsx`: conversao de demo com baixa friccao
