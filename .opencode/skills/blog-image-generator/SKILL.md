---
name: blog-image-generator
description: Use when the user asks to create blog images, article illustrations, Open Graph cards, social cards, capas de artigo, diagramas ou imagens para posts. Analisa conteúdo em pt-BR, cria JSX compatível com Satori na identidade Menu Bão e exporta SVG e PNG.
metadata:
  version: 1.0.0
---

# Gerador de imagens para blog

Crie imagens editoriais sob medida para artigos do Menu Bão. O objetivo não é
decorar o texto: cada imagem deve resumir, explicar ou tornar memorável uma
ideia importante do artigo.

## Antes de criar

1. Leia o artigo completo ou todo o material fornecido.
2. Identifique a promessa central, o público e os principais argumentos.
3. Consulte [references/visual-system.md](references/visual-system.md).
4. Consulte [references/satori.md](references/satori.md) antes de escrever JSX.
5. Procure composições existentes em `scripts/blog-images/compositions/` para
   evitar repetir metáforas ou layouts sem necessidade.

Pergunte apenas quando não for possível inferir o público, o objetivo do artigo
ou o significado de um dado essencial. Não peça ao usuário para escolher um
template.

## Estratégia visual

Crie sempre:

- Uma capa Open Graph de 1200 x 630.
- De uma a três imagens inline de 1200 x 675 quando elas realmente ajudarem a
  explicar processos, comparações, sistemas, decisões ou dados.

Não crie imagens inline para repetir parágrafos. Prefira:

- Fluxos para processos e sequências.
- Mapas de sistema para relações entre conceitos.
- Comparações para trade-offs ou antes/depois.
- Diagramas anotados para explicar interfaces e arquitetura.
- Uma metáfora visual específica para ideias abstratas.

A capa deve funcionar sem o resumo do artigo. Use pouco texto, uma hierarquia
forte e um elemento visual que represente a tese, não apenas um fundo abstrato.

## Processo obrigatório

1. Produza internamente um briefing com tese, tom, conceitos visuais e imagens
   necessárias.
2. Crie `scripts/blog-images/compositions/<slug>.tsx`.
3. Exporte a composição com `defineBlogImages` conforme
   `scripts/blog-images/compositions/satori-workflow.tsx`.
4. Reutilize tokens e primitives de `scripts/blog-images/brand.tsx`.
5. Use os templates em `scripts/blog-images/templates/` apenas como base. Adapte
   a composição ao argumento do artigo.
6. Escreva todo texto visível e todo alt text em português brasileiro.
7. Renderize com:

   ```bash
   pnpm blog:image -- scripts/blog-images/compositions/<slug>.tsx
   ```

8. Abra cada PNG gerado com a ferramenta de leitura de imagens.
9. Corrija clipping, contraste, alinhamento, excesso de texto ou ambiguidades e
   renderize novamente.
10. Informe os caminhos finais e os alt texts ao usuário.

## Regras editoriais

- Não invente números, resultados, depoimentos, logos ou telas de produto.
- Diferencie dados reais de exemplos ilustrativos.
- Preserve termos técnicos importantes, mas reduza frases longas.
- Evite clichês visuais de IA, foguetes, cérebros, robôs, lâmpadas e gradientes
  decorativos sem função semântica.
- Não use emojis como elemento visual principal.
- Não transforme todo artigo em uma coleção de cards de dashboard.
- Não copie o título inteiro quando uma versão mais curta comunica melhor.
- Não adicione logo, nome da marca, categoria, eyebrow ou badge editorial no
  topo da imagem. O contexto de publicação já identifica a origem.
- Use o símbolo da marca apenas quando a imagem for o próprio ícone, como
  favicon ou Apple Touch Icon, ou quando o usuário pedir explicitamente.
- Alt text descreve o significado da imagem, não todas as decisões estéticas.

## Critérios de qualidade

Antes de concluir, confirme:

- A imagem comunica uma ideia identificável em até três segundos.
- Capa e imagens inline parecem pertencer à mesma publicação.
- O título continua legível em uma miniatura.
- Nenhum texto encosta na margem de segurança.
- As imagens não dependem apenas de cor para comunicar diferenças.
- SVG, PNG e `manifest.json` foram gerados.
- O PNG possui exatamente as dimensões declaradas.
- A composição passou por inspeção visual.

## Saída

Os arquivos são escritos em `public/blog-images/<slug>/`:

```text
cover.svg
cover.png
inline-<conceito>.svg
inline-<conceito>.png
manifest.json
```

Mantenha o arquivo TSX da composição. Ele é a fonte editável e permite gerar
novas versões sem reconstruir a imagem do zero.

Para imagens institucionais ou outros ativos públicos do site, defina
`outputDirectory` na composição. O caminho é relativo a `public/`; por exemplo,
`outputDirectory: "assets"` escreve os arquivos em `public/assets/`.
