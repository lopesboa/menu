# MEB-143 - Funil principal de demo e ROI

## Objetivo

Corrigir os dois pontos mais sensiveis do funil principal da landing:

- pedido de demo com fluxo funcional, estado de sucesso, erro e fallback;
- simulador de ROI com calculo real, feedback imediato e CTA coerente.

## Escopo frontend

- transformar `src/components/sections/sales.tsx` em um formulario funcional;
- validar os campos minimos para primeiro contato: `nome`, `email`, `restaurante`, `WhatsApp`, `unidades`;
- exibir estado de carregamento, erro e sucesso no modal de demo;
- integrar com o endpoint final `POST /marketing/demo-requests`;
- manter fallback seguro por e-mail ou WhatsApp apenas quando a API nao estiver configurada no ambiente;
- transformar `src/components/sections/roi/show-roi.tsx` em simulador interativo;
- garantir que o CTA final do ROI leve para cadastro sem depender de modal inexistente.

## Dependencia de backend

Para o fluxo de demo ser realmente concluido dentro do produto, o frontend precisa de um endpoint publico de captura de lead.

### Dependencia necessaria

- endpoint HTTP para receber pedidos de demo da landing;
- autenticacao compativel com o site publico, sem exigir sessao autenticada;
- resposta sincrona simples para sucesso/erro;
- contrato minimo com os campos:
  - `name`
  - `email`
  - `restaurantName`
  - `whatsapp`
  - `units`
  - `origin`
  - `submittedAt`

### Contrato final

- metodo: `POST`
- rota: `/marketing/demo-requests`
- request body:

```json
{
  "name": "Ana Souza",
  "email": "ana@restaurante.com.br",
  "restaurantName": "Sabor da Vila",
  "whatsapp": "(11) 99999-9999",
  "units": "1 a 2 unidades",
  "origin": "https://menubao.com.br/",
  "submittedAt": "2026-03-20T12:00:00.000Z"
}
```

- success response:

```json
{
  "ok": true,
  "requestId": "123e4567-e89b-12d3-a456-426614174000",
  "message": "Pedido recebido"
}
```

- error response:

```json
{
	"detail": "Campo obrigatorio ausente",
	"errorCode": "validation_error",
	"status": 400,
	"title": "Bad Request",
	"type": "https://example.com/errors/validation-error",
	"requestId": "123e4567-e89b-12d3-a456-426614174000"
}
```

## Criterios de aceite frontend

- modal de demo aceita os campos minimos e bloqueia envio invalido;
- envio mostra loading durante a solicitacao;
- sucesso confirma o recebimento e informa o proximo passo em pt-BR;
- erro orienta nova tentativa sem travar o usuario;
- quando `VITE_APP_SERVER_URL` e `VITE_API_KEY` estiverem configurados, o modal envia para `/marketing/demo-requests`;
- se a API nao estiver configurada no ambiente, o fluxo usa fallback configuravel por `mailto` ou WhatsApp;
- simulador de ROI atualiza resultados quando o usuario move os controles;
- CTA do ROI leva para `/register` sem abrir modal quebrado;
- comportamento funciona em desktop e mobile.

## Criterios de aceite backend

- endpoint aceita requisicao publica da landing com CORS configurado para o dominio do marketing;
- validacao garante campos obrigatorios e rejeita payload invalido com erro legivel;
- sucesso retorna `2xx` apenas quando o pedido foi persistido ou encaminhado ao CRM;
- falha operacional retorna `5xx` com mensagem segura para log/observabilidade;
- payload fica disponivel para operacao comercial em CRM, e-mail transacional ou fila interna;
- endpoint suporta volume basico de campanhas sem rate limit agressivo para trafego legitimo.

## Observacoes

- o endpoint final de captura ja existe em `/marketing/demo-requests`;
- o fallback de `VITE_PUBLIC_DEMO_EMAIL` ou `VITE_PUBLIC_DEMO_WHATSAPP` continua util para ambientes sem API configurada;
- analytics do funil continuam fora deste ticket e seguem em `MEB-144`.
