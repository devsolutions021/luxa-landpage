/**
 * Todo o conteúdo da página num lugar só.
 *
 * Regra herdada de ../../PRODUCT.md: nada aqui é inventado. Os textos são a
 * copy entregue pelo cliente, palavra por palavra. Os dados de identidade
 * (cargo, número, suplentes) vêm do banner oficial em `assets/`.
 * O que não foi informado fica marcado como pendência, nunca preenchido no chute.
 */

// ─── 1. IDENTIDADE ───────────────────────────────────────────────

export const candidato = {
  nome: "Vanderlei Luxemburgo",
  apelido: "Luxa",
  cargo: "Senador",
  numero: "200",
  estado: "Tocantins",
  // Do banner oficial: "O NOSSO TIME É O TOCANTINS!"
  slogan: "O nosso time é o Tocantins",
} as const;

export const suplentes = [
  { ordem: "Primeiro suplente", nome: "Jair Júnior" },
  { ordem: "Segundo suplente", nome: "Daniel Walison" },
] as const;

// O domínio canônico (https://vanderleiluxemburgo.com.br) mora no index.html,
// em canonical/og:url — é HTML estático, não lê daqui. Não duplicar: duas
// fontes para a mesma URL é uma que sai de sincronia.
export const contato = {
  instagram: "https://www.instagram.com/timedoluxemburgo/",
  perfil: "@timedoluxemburgo",
  email: "contato@vanderleiluxemburgo.com.br",
} as const;

// ─── 2. PROPAGANDA ELEITORAL ─────────────────────────────────────
// Dizeres exigidos pela Justiça Eleitoral, vindos da consulta ao registro do
// comitê: CNPJ aberto em 10/08/2026, natureza jurídica "Candidato a Cargo
// Político Eletivo". O CNPJ é o item que a propaganda na internet precisa
// carregar, e ele está aqui.
//
// `partido` e `endereco` são opcionais: se um dia forem preenchidos, viram
// linha no rodapé sozinhos. Vazios, simplesmente não existem na página —
// nada de texto de espera à vista do eleitor.

export const propaganda: {
  comite: string;
  cnpj: string;
  partido?: string;
  endereco?: string;
} = {
  comite: "Eleição 2026 Vanderlei Luxemburgo da Silva Senador",
  cnpj: "68.499.810/0001-78",
};

// ─── 3. ABERTURA ─────────────────────────────────────────────────

export const abertura = {
  titulo: "Quem sabe vencer, sabe fazer a diferença pelo Tocantins",
  linhas: [
    "Uma vida inteira liderando equipes, formando talentos, enfrentando pressão e buscando resultados.",
    "Agora, essa experiência está a serviço das pessoas.",
  ],
  chamada: "Luxemburgo para Senador! Vote 200!",
} as const;

// ─── 4. CONHEÇA O LUXA ───────────────────────────────────────────

export const sobre = {
  rotulo: "Conheça o Luxa",
  titulo: "Experiência, liderança e histórico de resultados.",
  abertura: [
    "Vanderlei Luxemburgo construiu uma das trajetórias mais conhecidas do futebol brasileiro.",
    "Foi treinador, gestor, líder de grandes equipes e responsável por conduzir diferentes gerações de atletas em ambientes onde resultado não é promessa: é obrigação.",
  ],
  // O coração do texto — sai do parágrafo e vira peça.
  destaque: "Ao longo da vida, aprendeu que ninguém vence sozinho.",
  // A frase "É preciso montar bons times, identificar talentos, planejar,
  // cobrar, ouvir e tomar decisões." lida como escalação, sem mudar a copy.
  metodo: {
    lead: "É preciso",
    itens: [
      "montar bons times",
      "identificar talentos",
      "planejar",
      "cobrar",
      "ouvir",
      "tomar decisões",
    ],
  },
  fecho: [
    "É essa experiência que Luxemburgo quer levar para o Senado.",
    "Porque o Tocantins precisa de alguém que saiba representar o estado, abrir portas, buscar oportunidades e trabalhar para transformar potencial em resultado.",
    "Quem passou a vida aprendendo a vencer sabe que resultado só aparece quando existe trabalho.",
    "E o Luxemburgo quer trabalhar para que o Tocantins tenha mais oportunidades, desenvolvimento e qualidade de vida para sua gente.",
  ],
} as const;

// ─── 5. AGORA, O TIME É O TOCANTINS ──────────────────────────────

// A copy é a mesma; o `lead` só marca as duas primeiras palavras de cada
// frase, que a tipografia trata como o antes e o depois da virada.
export const virada = {
  titulo: "Agora, o time é o Tocantins.",
  paragrafos: [
    {
      lead: "No futebol,",
      resto: "Luxa ajudou a construir equipes vencedoras.",
      tinta: "var(--color-laranja)",
    },
    {
      lead: "Na política,",
      resto: "o desafio é ainda maior: ajudar a construir um Tocantins mais forte para quem vive, trabalha, empreende e cria sua família aqui.",
      tinta: "var(--color-verde)",
    },
  ],
} as const;

// ─── 6. FAÇA PARTE DO TIME ───────────────────────────────────────

export const time = {
  rotulo: "Faça parte do time do Luxemburgo",
  titulo: "Todo grande resultado começa com um grande time.",
  paragrafos: [
    "Essa campanha não é feita por uma pessoa. É feita por quem acredita que o Tocantins pode avançar, crescer e ocupar o espaço que merece.",
    "Se você também acredita nisso, entre para o Time do Luxemburgo.",
    "Acompanhe a campanha, compartilhe nossas ideias e venha jogar junto com a gente.",
  ],
  fechamento: "O Tocantins é o nosso time. E essa partida, nós vamos jogar juntos.",
  acao: "Entrar para o time no Instagram",
} as const;
