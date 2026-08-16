# Vanderlei Luxemburgo 200 — landing page

Landing de campanha ao Senado pelo Tocantins. Página única, estática, sem back-end e sem coleta de
dados pessoais. O único destino é o Instagram oficial da campanha.

O mundo visual está em [`DESIGN.md`](DESIGN.md). Todo o texto está em
[`src/data/site.ts`](src/data/site.ts).

## Stack

| Peça | Escolha | Por quê |
| --- | --- | --- |
| Build | Vite 7 + React 19 + TypeScript | build de ~0,7s, HMR instantâneo |
| CSS | Tailwind v4 (plugin nativo do Vite) | sem PostCSS, tokens da campanha em `@theme` |
| Animação | `motion` com `LazyMotion` + `domAnimation`, modo `strict` | ~18 kB a menos que o pacote inteiro |
| Ícones | SVG inline em `src/components/ui.tsx` | dois ícones não pagam uma biblioteca |
| Roteamento | nenhum | página única — router seria peso morto |

## Rodando

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

O dev server também sobe pelo preview do Claude Code, na porta 5185
(entrada `vanderlei-luxemburgo` em `../../.claude/launch.json`).

## Conteúdo

Todo o texto veio da copy do cliente e está reproduzido **palavra por palavra**. Nada foi
resumido, reescrito ou completado. Duas frases recebem tratamento tipográfico sem mudar a copy:

- `"É preciso montar bons times, identificar talentos, planejar, cobrar, ouvir e tomar decisões."`
  é diagramada como escalação numerada de 01 a 06.
- `"No futebol, …"` / `"Na política, …"` têm as duas primeiras palavras destacadas como entrada de
  parágrafo, no par de painéis da virada.

Cargo, número, estado e a chapa completa (Jair Júnior e Daniel Walison) vieram do banner oficial em
[`assets/BANNER-INICIAL.png`](assets/BANNER-INICIAL.png).

## Propaganda eleitoral

O rodapé carrega os dizeres da Justiça Eleitoral, vindos da consulta ao registro do comitê:

- **Razão social** — Eleição 2026 Vanderlei Luxemburgo da Silva Senador
- **CNPJ** — 68.499.810/0001-78 (aberto em 10/08/2026, natureza jurídica "Candidato a Cargo
  Político Eletivo")

`partido` e `endereco` existem em `propaganda` ([`src/data/site.ts`](src/data/site.ts)) como campos
**opcionais**. Preenchidos, viram linha no rodapé sozinhos; vazios, não existem na página. Não há
texto de espera à vista do eleitor em lugar nenhum.

## Imagens

O cliente entregou uma peça só: `BANNER-INICIAL.png`, 1218×1210. Tudo em `public/img/` foi derivado
dela com `ffmpeg` + `cwebp` e o original ficou preservado em `assets/`, fora do build.

| Arquivo | Como foi feito | Peso |
| --- | --- | --- |
| `banner.webp` / `banner-760.webp` | a peça inteira, WebP q80, servida por `srcset` | 134 kB / 62 kB |
| `retrato.webp` / `retrato-380.webp` | recorte `506×778` em `(712, 308)` | 58 kB / 32 kB |
| `og.jpg` | faixa `1218×640` em `(0, 390)`, reescalada para 1200×630 | 206 kB |

O recorte do retrato não é arbitrário: o texto do banner termina exatamente em `y=307` e o cabelo
começa em `y=308` (medido pixel a pixel), e a bandeira do Tocantins acaba em `x=711`. Fora dessa
janela sobra lettering do banner dentro do retrato.

O banner é o elemento LCP e está pré-carregado no `index.html` com `fetchpriority="high"`.

## Performance

Primeira visita, gzip: **~100 kB de JS** (60 kB são o React, num chunk separado para não invalidar
o cache em deploys de texto), 6,6 kB de CSS, 176 kB de fontes e 62 kB da peça do herói.

- Fontes: Archivo variável em WOFF2, dois subsets (latin e latin-ext) com `unicode-range`.
- Nada de biblioteca de ícones.
- `prefers-reduced-motion` desliga todo o movimento, inclusive o que o motion anima por JS.

## Estrutura

```
src/
  data/site.ts        # TODO o conteúdo num lugar só
  components/
    ui.tsx            # Reveal, RevealGroup, traço da jogada, botões, ícones, faixa
    Hero.tsx          # abertura: a peça oficial + a chamada
    Sobre.tsx         # conheça o Luxa: retrato, destaque, escalação
    Virada.tsx        # agora, o time é o Tocantins
    Time.tsx          # faça parte do time + CTA do Instagram
    Rodape.tsx        # marca, chapa, canal oficial, propaganda eleitoral
    ContatoFlutuante.tsx
  assets/fonts/       # Archivo variável em WOFF2
public/img/           # imagens derivadas do banner
assets/               # original entregue pelo cliente (não entra no build)
```
