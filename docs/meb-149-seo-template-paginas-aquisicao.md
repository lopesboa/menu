# MEB-149 - Template SEO para paginas de aquisicao

## Objetivo

Criar uma estrutura reutilizavel para landings SEO de aquisicao, reduzindo retrabalho entre novas paginas de segmento, integracao e caso de uso.

## Escopo entregue

- rota publica de landings SEO em `src/app/routes/index.ts` usando o padrao `/solucoes/:landingSlug`;
- manifesto de rota em `src/app/routes/seo/manifest.ts` para manter path estavel;
- catalogo inicial de conteudo tipado em `src/app/routes/seo/data/acquisition-pages.ts`;
- template visual reutilizavel em `src/components/seo/acquisition-seo-template.tsx`;
- head SEO reutilizavel em `src/components/seo/seo-head.tsx` com canonical, Open Graph, Twitter e JSON-LD;
- instrumentacao analytics por landing em `src/app/routes/seo/acquisition-page.tsx` com `page` estavel no payload;
- interlinking inicial na navegacao e no footer apontando para a primeira landing publicada;
- inclusao da landing no `public/sitemap.xml`.

## Contrato do template

Cada entrada do catalogo precisa definir:

- `slug` e `page` (identificador estavel para analytics);
- bloco `seo` com `title`, `description`, `keywords` e `robots` opcional;
- hero com promessa, pontos de escaneabilidade (`supportingPoints`), nota de confianca (`trustNote`) e CTAs;
- bloco de aderencia (`fitProfile`) para qualificar ICP da landing;
- secoes de dor (`problems`), solucao (`solutions`) e prova (`proof`);
- fluxo de implantacao (`operationFlow`) para reduzir friccao de mudanca;
- faixa intermediaria de conversao (`ctaBand`) com reforco de CTA;
- FAQ com perguntas objetivas e respostas em pt-BR;
- `internalLinks` para interlinking com home e outras paginas.

## Regras de qualidade para novas paginas (MEB-150+)

- manter copy especifica para intencao de busca; nao duplicar home com troca superficial de keyword;
- preservar CTA principal orientado a cadastro (`Criar conta gratis`) e CTA secundario comercial;
- registrar prova com contexto minimo (`periodo` + `origem`);
- usar `SEOHead` com canonical dedicado por pagina;
- configurar `VITE_PUBLIC_SITE_URL` por ambiente para canonical/OG absolutos coerentes;
- adicionar a nova landing no `sitemap.xml`;
- garantir `cta_clicked`, `demo_opened` e `register_started` com `page` estavel no payload.

## Limite desta entrega

Este ticket entrega o template e a infraestrutura de SEO landing para escalar novos slugs.
O lote inicial de paginas por segmento/integracao/caso de uso segue no `MEB-150`.
