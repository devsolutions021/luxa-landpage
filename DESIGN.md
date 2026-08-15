# Design

Mundo visual de `sites/vanderlei-luxemburgo`. Produto e verdade factual vivem em `../../PRODUCT.md`
(que descreve o projeto irmão) e no cabeçalho de [`src/data/site.ts`](src/data/site.ts).

## O mundo

**A prancheta de um técnico, e o time é o Tocantins.**

A copy do cliente fala de montar equipes, identificar talentos, cobrar, decidir e transformar
potencial em resultado. A página empresta essa gramática em vez de ilustrá-la: o traço que um
técnico desenha na prancheta, a escalação numerada, o número da camisa. Nenhuma bola, nenhum
gramado — o clichê de futebol é justamente o que este mundo recusa.

O espaço é uma **coluna d'água contínua**, amostrada pixel a pixel de `assets/BANNER-INICIAL.png`:
o azul-esverdeado do lago de Palmas descendo até o azul-noite. A peça oficial da campanha abre a
página como placa, e o degradê ao redor dela é a mesma água — por isso ela assenta em vez de flutuar.

A cor entra como **luz**, nunca como preenchimento chapado: halo radial ancorado num ponto, sempre
atrás do conteúdo. O que este mundo recusa: hero em degradê seguido de grade de cards iguais;
borda colorida à esquerda de card; texto com gradiente; vidro como enfeite.

## Cor

Estratégia: **uma água escura contínua, acento por luz.** Todas as tintas foram amostradas do
banner oficial com `ffmpeg` — nenhuma foi escolhida no olho.

| Token | Valor | Papel | Origem no banner |
|---|---|---|---|
| `--color-fundo` | `#03202a` | base escura | rodapé da peça |
| `--color-noite` | `#041729` | fim da página, rodapé | topo escurecido |
| `--color-mar` | `#063a5e` | elevação, meio da coluna | meio da água |
| `--color-amarelo` | `#ffd600` | **ação primária**, número | o "VOTE" |
| `--color-laranja` | `#ff601a` | trajetória, o "X" da marca | traço do `LU✕EMBURGO` |
| `--color-verde` | `#40b557` | a virada, selo do cargo | selo "SENADOR" |
| `--color-ciano` | `#007ea9` | abertura, água iluminada | coluna d'água |
| `--color-azul` | `#1170aa` | faixa de cores | faixa de ícones |

**A variável `--luz`.** Cada seção define `--luz` uma única vez; halo, traço da jogada, rótulo,
número da escalação e barra do rótulo leem dali. A página atravessa ciano (abertura) → laranja
(trajetória) → verde (virada) → amarelo (convocação). Trocar a cor de uma seção é trocar um valor.

**Contraste medido no pixel renderizado**, não estimado no token: corpo de texto entre 7,3:1 e
10,6:1; o pior caso da página é o painel de vidro da virada, em 6,5:1. O amarelo é forte demais
para ficar atrás de texto corrido — na seção de convocação o halo foi empurrado para a base, longe
da leitura.

## Tipografia

Uma só superfamília: **Archivo variável** (Omnibus-Type), eixos `wght 100..900` e `wdth 62..125`,
auto-hospedada em `src/assets/fonts` (latin + latin-ext, ~176 kB). O eixo de largura faz o
lettering esportivo condensado do material impresso sem precisar de uma segunda família.

| Papel | Ajuste |
|---|---|
| Display | `wght 800`, `wdth 84`, tracking `-0.012em`, `line-height 0.93`, caixa alta |
| Número | `wght 800`, `wdth 108`, tracking `-0.04em`, `skewX(-8deg)` |
| Rótulo | `wght 700`, `wdth 88`, `0.72rem`, tracking `0.22em`, caixa alta |
| Fechamento | `wght 700`, `wdth 96`, tracking `-0.018em` |
| Texto | `wght 400`, `line-height 1.72`, medida 62ch, branco/78 |

**A inclinação vive só no número.** `skewX(-8deg)` é livery esportiva, e aparece exclusivamente
no `200` — na chamada da abertura, no selo do retrato, na marca d'água e no rodapé. Não existe
itálico falso em nenhum outro lugar da página.

> **Armadilha conhecida.** O `transform` que o motion escreve inline apaga o `skewX` da classe
> `numeral`. Todo número animado fica dentro de um invólucro: o motion move o invólucro, a
> inclinação mora no filho. Mesma regra vale para `clip-path`, que recorta o border-box e cortaria
> o selo pendurado para fora do retrato.

## Estrutura

- **Raio:** `16px` (suave) · `28px` (placa) · `44px` (campo). Canto vivo não existe no sistema.
- **Fio:** `1px` translúcido (`branco/12` a `branco/13`).
- **Profundidade:** elevação por sombra com deslocamento e desfoque reais, mais um fio interno de
  `1px` no topo — o objeto captando a luz de cima.
- **Vidro:** `backdrop-filter: blur(14px)` só onde a peça precisa recolher o halo que está atrás
  dela. Não é enfeite.
- **Fundo:** o halo é o **único** elemento de fundo. Sem malha de linhas, sem textura, sem ruído.
- **A faixa de cores:** as cinco tintas da faixa de ícones do material impresso, reconstruídas em
  CSS puro (sem ícone, sem raster). Fecham a abertura e abrem o rodapé, como a borda de uma peça
  de campanha.

## Movimento

Momento autoral único: **o traço da jogada.** Uma linha pontilhada se desenha sozinha da esquerda
para a direita e termina numa seta — a jogada saindo do futebol e chegando no Tocantins. Aparece
uma vez só, na virada, que é exatamente onde a copy faz esse giro.

- **Biblioteca:** `motion` com `LazyMotion` + `domAnimation` (~18 kB a menos que o pacote inteiro),
  em modo `strict` — só `m.*`, nunca `motion.*`.
- **Entrada:** `Reveal` sobe 22px e revela, uma vez, `0.62s`. `RevealGroup` escalona em `75ms`.
- **Abertura:** a placa oficial abre por `clip-path` em `1.1s`; as linhas do texto sobem em
  cascata; o `200` entra por escala em `0.72s` de atraso — o último elemento a acender.
- **Retrato:** `clip-path` abrindo de cima, `1s`.
- **Marca d'água:** o `200` da convocação desliza `12% → -12%` com o scroll (`useScroll` +
  `useTransform`). Profundidade sem nenhum elemento novo na tela.
- **Halo:** `respira` — 8s, 0.72 → 1 de opacidade. É a única animação em laço.
- **Curva:** `cubic-bezier(0.16, 1, 0.3, 1)` em tudo. Sem bounce, sem elástico.
- **Controles:** o botão sobe `2px` no hover e cresce a própria sombra; `active:scale(0.98)`.
- **`prefers-reduced-motion: reduce`:** `<MotionConfig reducedMotion="user">` desliga deslocamento,
  escala e clip em toda a página — a regra CSS global não alcança o que o motion anima por JS. A
  opacidade continua, então nenhuma informação some. Verificado com a mídia emulada: o traço vira
  uma linha pontilhada estática e todo o conteúdo aparece.

## Acessibilidade

Foco visível em `3px` amarelo com deslocamento — nunca `outline: none`. Alvos de toque ≥ 44px
(botões têm 56px de altura mínima). `aria-label` em todo link de rede e no contato flutuante, com
nome do candidato e perfil. Os números da escalação são `aria-hidden` — são ordinais decorativos
dentro de um `<ol>`, que já carrega a ordem. Ordem do DOM igual à ordem visual em todos os
breakpoints: nenhuma coluna troca de lado, justamente para não criar essa divergência. Link "Ir
para o conteúdo" como primeiro foco da página. A cor nunca é o único portador de informação.
