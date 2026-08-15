import * as m from "motion/react-m";
import { abertura, candidato } from "@/data/site";
import { BotaoContorno, FaixaCores, IconeSeta } from "./ui";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Entrada em cascata das linhas do bloco de texto. */
const sobe = (delay: number) => ({
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: EASE, delay },
});

export function Hero() {
  return (
    <header
      id="topo"
      className="relative overflow-hidden"
      style={{ ["--luz" as string]: "var(--color-ciano)" }}
    >
      {/* A luz da água, atrás de tudo. Único elemento de fundo da seção. */}
      <div
        aria-hidden="true"
        className="halo respira pointer-events-none absolute inset-x-[-15%] top-[-30%] h-[120%]"
        style={{ ["--halo-x" as string]: "34%", ["--halo-y" as string]: "46%" }}
      />

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 px-5 pt-6 pb-16 sm:px-8 sm:pt-10 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1fr)] lg:gap-16 lg:px-12 lg:pt-16 lg:pb-20">
        {/* A peça oficial da campanha, apresentada como placa — o primeiro
            elemento da página, como pediu a copy. */}
        <m.div
          className="relative mx-auto w-full max-w-[560px] lg:max-w-none"
          initial={{ opacity: 0, clipPath: "inset(0 0 12% 0)", y: 18 }}
          animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)", y: 0 }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <div className="overflow-hidden rounded-[var(--radius-placa)] shadow-[0_40px_90px_-40px_rgba(0,0,0,0.85)] ring-1 ring-branco/12">
            <img
              src="/img/banner.webp"
              srcSet="/img/banner-760.webp 760w, /img/banner.webp 1218w"
              sizes="(min-width: 1024px) 620px, min(92vw, 560px)"
              width={1218}
              height={1210}
              fetchPriority="high"
              decoding="async"
              alt={`Peça oficial da campanha: o nosso time é o Tocantins. Vote ${candidato.nome}, ${candidato.cargo}, ${candidato.numero}.`}
              className="block h-auto w-full"
            />
          </div>
        </m.div>

        {/* Bloco de abertura */}
        <div className="lg:pb-4">
          <m.p
            className="rotulo text-branco/70"
            {...sobe(0.12)}
          >
            {candidato.cargo} · {candidato.estado}
          </m.p>

          <m.h1
            className="display mt-5 text-[clamp(2.1rem,7.4vw,4.1rem)]"
            {...sobe(0.2)}
          >
            {abertura.titulo}
          </m.h1>

          <div className="mt-7 space-y-4">
            <m.p className="corpo" {...sobe(0.32)}>
              {abertura.linhas[0]}
            </m.p>
            <m.p
              className="fechamento text-[clamp(1.05rem,2.4vw,1.35rem)] text-branco"
              {...sobe(0.4)}
            >
              {abertura.linhas[1]}
            </m.p>
          </div>

          {/* A chamada do banner, remontada em tipografia viva:
              a frase à esquerda, o número da camisa à direita. */}
          <m.div
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-5"
            {...sobe(0.5)}
          >
            <p className="display max-w-[16ch] text-[clamp(1.35rem,3.4vw,1.9rem)] text-amarelo">
              Luxemburgo para Senador!
            </p>

            <div className="flex items-center gap-3 rounded-full bg-amarelo px-6 py-2.5 text-fundo shadow-[0_16px_40px_-16px_rgba(255,214,0,0.6)]">
              <span className="rotulo">Vote</span>
              {/* O invólucro anima; a inclinação do número mora na classe de
                  dentro, senão o transform do motion apagaria o skew. */}
              <m.span
                className="block"
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: EASE, delay: 0.72 }}
              >
                <span className="numeral block text-[clamp(2rem,5vw,2.6rem)]">
                  {candidato.numero}
                </span>
              </m.span>
            </div>
          </m.div>

          <m.div className="mt-9" {...sobe(0.6)}>
            <BotaoContorno href="#conheca">
              Conheça o {candidato.apelido}
              <IconeSeta className="size-5 rotate-90 transition-transform duration-300 ease-[var(--ease-jogo)] group-hover:translate-y-0.5" />
            </BotaoContorno>
          </m.div>
        </div>
      </div>

      {/* A faixa fecha a abertura: é a borda de baixo da peça, colada. */}
      <FaixaCores />
    </header>
  );
}
