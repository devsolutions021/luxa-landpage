import { useRef } from "react";
import * as m from "motion/react-m";
import { useScroll, useTransform, useReducedMotion } from "motion/react";
import { candidato, contato, time } from "@/data/site";
import { BotaoPrimario, IconeInstagram, Reveal, Rotulo } from "./ui";

export function Time() {
  const secao = useRef<HTMLElement>(null);
  const semMovimento = useReducedMotion();

  // O número da camisa ao fundo desliza mais devagar que o conteúdo:
  // profundidade sem nenhum elemento novo na tela.
  const { scrollYProgress } = useScroll({
    target: secao,
    offset: ["start end", "end start"],
  });
  const deslocaNumero = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  return (
    <section
      id="time"
      ref={secao}
      className="relative overflow-hidden py-20 lg:py-32"
      style={{ ["--luz" as string]: "var(--color-amarelo)" }}
    >
      {/* Luz baixa e deslocada: o amarelo ilumina a base da seção, longe do
          texto corrido, para não comer o contraste da leitura. */}
      <div
        aria-hidden="true"
        className="halo respira pointer-events-none absolute inset-x-[-20%] bottom-[-16%] h-[62%] opacity-35"
        style={{ ["--halo-x" as string]: "72%", ["--halo-y" as string]: "70%" }}
      />

      {/* O 200 como número de camisa, em marca d'água. O motion move o
          invólucro; a inclinação mora no filho, senão o transform a apagaria. */}
      <m.div
        aria-hidden="true"
        className="pointer-events-none absolute top-[8%] -right-6 select-none sm:-right-10"
        style={semMovimento ? undefined : { y: deslocaNumero }}
      >
        <span className="numeral block text-[clamp(12rem,30vw,26rem)] text-branco/[0.05]">
          {candidato.numero}
        </span>
      </m.div>

      <div className="relative mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <Rotulo>{time.rotulo}</Rotulo>
        </Reveal>

        <Reveal as="h2" delay={0.06} className="display mt-6 max-w-[16ch] text-[clamp(2rem,6vw,3.8rem)]">
          {time.titulo}
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-16">
          <div className="space-y-5">
            {time.paragrafos.map((paragrafo, i) => (
              <Reveal as="p" key={paragrafo} delay={i * 0.06} className="corpo">
                {paragrafo}
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.14}>
            <div className="superficie rounded-[var(--radius-placa)] p-8 sm:p-10">
              <p className="fechamento text-[clamp(1.3rem,3.2vw,1.8rem)] text-branco">
                {time.fechamento}
              </p>

              <div className="mt-8">
                <BotaoPrimario
                  href={contato.instagram}
                  aria-label={`${time.acao} — perfil ${contato.perfil} de ${candidato.nome}`}
                  className="w-full sm:w-auto"
                >
                  <IconeInstagram className="size-5 shrink-0" />
                  {time.acao}
                </BotaoPrimario>

                <p className="rotulo mt-4 text-branco/62">{contato.perfil}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
