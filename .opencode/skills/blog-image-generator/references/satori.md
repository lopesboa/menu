# Restrições do Satori

Satori não abre uma página HTML. Ele converte uma árvore JSX pura e estática em
SVG usando um motor próprio de layout baseado em Yoga.

## JSX

- Use componentes puros e sem estado.
- Não use hooks, efeitos, contexto, portais ou `dangerouslySetInnerHTML`.
- Use apenas elementos visuais estáticos.
- Defina `display: "flex"` nos containers com múltiplos filhos.
- Imagens precisam de largura e altura explícitas.

## CSS

Use o subconjunto suportado:

- Flexbox, incluindo direção, alinhamento, wrap e gap.
- Posição relativa ou absoluta.
- Tamanhos, margens, padding, bordas e border radius.
- Tipografia, line height, letter spacing e text alignment.
- Backgrounds sólidos, gradientes e imagens.
- Transformações 2D, opacity, overflow hidden e box shadow.

Evite:

- Grid.
- `calc()`.
- Transformações 3D.
- `z-index`. A ordem do JSX determina a pintura.
- `<style>`, `<link>` e `<script>`.
- Recursos externos durante a renderização.
- WOFF2. Use TTF, OTF ou WOFF.

## Texto e fontes

Todo texto exige uma fonte registrada nas opções de renderização. O renderer do
projeto carrega Inter localmente nos pesos 400, 600 e 700.

Satori não oferece todos os recursos avançados de tipografia de um navegador.
Prefira linhas curtas, espaçamento explícito e verificação visual do resultado.

## SVG para PNG

Satori retorna uma string SVG. O renderer usa `@resvg/resvg-js` para gerar PNG
sem iniciar Chromium. Os dois formatos são mantidos para publicação e edição.
