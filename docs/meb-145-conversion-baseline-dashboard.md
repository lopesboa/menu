# MEB-145 - Baseline e dashboard de conversao

## Objetivo

Publicar um baseline rastreavel do funil principal da landing e deixar claro como o dashboard inicial de conversao deve ser montado no PostHog.

## Escopo entregue no frontend

- ativacao do PostHog em `preview` e `staging` via `VITE_PUBLIC_POSTHOG_ENABLED=true`, sem depender apenas de `production`;
- documentacao do baseline inicial do funil da landing;
- checklist de publicacao para evitar experimento sem linha de base.

## Funil obrigatorio

1. `page_viewed`
2. `cta_clicked`
3. `demo_opened`
4. `demo_started`
5. `demo_submitted`
6. `demo_success`
7. `register_started`
8. `register_completed`

## Segmentacoes minimas do dashboard

- por `page`;
- por `landing_variant`;
- por `cta_position`;
- por `utm_source`;
- por `utm_medium`;
- por `utm_campaign`.

## Cards recomendados no dashboard

### Visao executiva

- sessoes com `page_viewed` na `home`;
- taxa `cta_clicked -> register_started`;
- taxa `demo_opened -> demo_success`;
- taxa `register_started -> register_completed`;
- distribuicao por `cta_position`;
- distribuicao por `utm_source`.

### Saude do payload

- percentual de eventos com `cta_label` preenchido;
- percentual de eventos com `cta_position` preenchido;
- percentual de eventos com `landing_variant` preenchido;
- percentual de eventos com `utm_source` preenchido quando houver campanha;
- quebra de `demo_submitted` e `demo_success` por `units`.

## Template do baseline

Preencher apos a primeira janela estavel de coleta em producao.

| Campo | Valor |
| --- | --- |
| Periodo analisado | A definir |
| Janela minima | 7 dias ou 200 sessoes qualificadas |
| Pagina | `home` |
| Variante | `control` |
| Owner | Growth + Marketing |
| Dashboard URL | A publicar no PostHog |
| Observacoes | Registrar mudancas de copy, CTA ou performance ocorridas no periodo |

## Checklist de publicacao

- [ ] ambiente com `VITE_PUBLIC_POSTHOG_KEY` e `VITE_PUBLIC_POSTHOG_HOST` configurados;
- [ ] `VITE_PUBLIC_POSTHOG_ENABLED=true` em preview/staging para QA antes do deploy;
- [ ] eventos obrigatorios validados na ordem correta;
- [ ] propriedades obrigatorias validadas com payload consistente;
- [ ] dashboard criado no PostHog com os cards minimos;
- [ ] baseline registrado com periodo e observacoes;
- [ ] nenhuma mudanca de hero, CTA, prova ou SEO publicada sem comparar contra esse baseline.

## Limite desta entrega

Os valores reais do baseline e a URL final do dashboard dependem de acesso ao projeto do PostHog e nao podem ser publicados apenas a partir do codigo do repositorio.
