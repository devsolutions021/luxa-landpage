import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── ENTRADAS ────────────────────────────────────────────────────
   Tudo que entra sobe um pouco e revela, uma única vez. Sem bounce,
   sem elástico: a curva é sempre a mesma. */

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  y = 22,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "p" | "span" | "h2" | "h3";
  y?: number;
}) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -70px 0px" }}
      transition={{ duration: 0.62, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

/** Escalona os filhos sem precisar calcular delay item a item. */
export function RevealGroup({
  children,
  className,
  step = 0.075,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  step?: number;
  as?: "div" | "ul" | "ol";
}) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial="oculto"
      whileInView="mostra"
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -70px 0px" }}
      variants={{ oculto: {}, mostra: { transition: { staggerChildren: step } } }}
    >
      {children}
    </Tag>
  );
}

export const itemVariants = {
  oculto: { opacity: 0, y: 20 },
  mostra: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/* ─── O TRAÇO DA JOGADA ───────────────────────────────────────────
   Assinatura gráfica da página: a linha que um técnico desenha na
   prancheta. Ela se desenha sozinha quando entra na tela e termina numa
   seta — a jogada saindo do futebol e chegando no Tocantins. */

export function TracoJogada({
  className = "",
  invertido = false,
}: {
  className?: string;
  /** Espelha o traço para a esquerda, quando a seção inverte o lado. */
  invertido?: boolean;
}) {
  const semMovimento = useReducedMotion();

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 460 64"
      fill="none"
      preserveAspectRatio="none"
      className={`h-16 w-full ${invertido ? "-scale-x-100" : ""} ${className}`}
      style={{ color: "var(--luz)" }}
    >
      <m.path
        d="M2 52 C 92 52, 108 12, 196 12 S 336 54, 424 24"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray="1 14"
        initial={semMovimento ? undefined : { pathLength: 0, opacity: 0 }}
        whileInView={semMovimento ? undefined : { pathLength: 1, opacity: 0.75 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.3, ease: EASE }}
      />
      <m.path
        d="M408 12 L 430 23 L 410 38"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={semMovimento ? undefined : { opacity: 0, x: -10 }}
        whileInView={semMovimento ? undefined : { opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.45, ease: EASE, delay: 1.05 }}
      />
    </svg>
  );
}

/* ─── RÓTULO DE SEÇÃO ─────────────────────────────────────────────
   Traço curto + texto. O traço cresce da esquerda quando entra. */

export function Rotulo({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3.5">
      <m.span
        aria-hidden="true"
        className="block h-[3px] rounded-full"
        style={{ background: "var(--luz)" }}
        initial={{ width: 0 }}
        whileInView={{ width: 34 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.6, ease: EASE }}
      />
      <span className="rotulo text-branco/72">{children}</span>
    </div>
  );
}

/* ─── AÇÕES ───────────────────────────────────────────────────────
   O amarelo do "VOTE" é a única cor de ação primária da página. */

const baseBotao =
  "group inline-flex min-h-[3.5rem] items-center justify-center gap-3 rounded-full px-8 text-[0.95rem] font-[800] tracking-[0.04em] uppercase transition-[transform,box-shadow,background-color] duration-300 ease-[var(--ease-jogo)] active:scale-[0.98]";

export function BotaoPrimario({
  href,
  children,
  className = "",
  ...rest
}: {
  href: string;
  children: ReactNode;
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseBotao} bg-amarelo text-fundo shadow-[0_14px_38px_-14px_rgba(255,214,0,0.55)] hover:-translate-y-0.5 hover:bg-[#ffe14d] hover:shadow-[0_20px_50px_-14px_rgba(255,214,0,0.7)] ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}

export function BotaoContorno({
  href,
  children,
  className = "",
  ...rest
}: {
  href: string;
  children: ReactNode;
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">) {
  return (
    <a
      href={href}
      className={`${baseBotao} border border-branco/28 text-branco hover:-translate-y-0.5 hover:border-branco/50 hover:bg-branco/8 ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}

/* ─── ÍCONES ──────────────────────────────────────────────────────
   Traçados inline — uma biblioteca de ícones seria peso morto para três. */

export function IconeInstagram({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function IconeSeta({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M5 12h13m0 0-5.5-5.5M18 12l-5.5 5.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── FAIXA DE CORES ──────────────────────────────────────────────
   As cinco tintas da faixa de ícones do material impresso. Aparece nas
   emendas entre seções, como o rodapé de uma peça de campanha. */

export function FaixaCores({ className = "" }: { className?: string }) {
  return (
    <m.div
      aria-hidden="true"
      className={`faixa-cores h-1.5 w-full origin-left ${className}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.9, ease: EASE }}
    />
  );
}
