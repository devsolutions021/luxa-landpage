import * as m from "motion/react-m";
import { candidato, sobre } from "@/data/site";
import { Reveal, RevealGroup, Rotulo, itemVariants } from "./ui";

export function Sobre() {
  return (
    <section
      id="conheca"
      className="relative overflow-hidden py-20 lg:py-32"
      style={{ ["--luz" as string]: "var(--color-laranja)" }}
    >
      <div
        aria-hidden="true"
        className="halo respira pointer-events-none absolute inset-x-[-25%] top-[6%] h-[62%] opacity-70"
        style={{ ["--halo-x" as string]: "22%", ["--halo-y" as string]: "36%" }}
      />

      <div className="relative mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <Rotulo>{sobre.rotulo}</Rotulo>
        </Reveal>

        <Reveal as="h2" delay={0.06} className="display mt-6 max-w-[18ch] text-[clamp(1.9rem,5.4vw,3.4rem)]">
          {sobre.titulo}
        </Reveal>

        {/* Retrato e trajetória lado a lado. O retrato foi recortado da peça
            oficial, então a água do fundo dele continua a da página. */}
        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:gap-16">
          <figure className="relative mx-auto w-full max-w-[340px] lg:sticky lg:top-16 lg:mx-0 lg:max-w-[400px]">
            {/* O clip fica no invólucro da imagem: se ficasse na figure, ele
                cortaria o selo do número, que fica pendurado para fora. */}
            <m.div
              className="overflow-hidden rounded-[var(--radius-placa)] shadow-[0_36px_80px_-38px_rgba(0,0,0,0.85)] ring-1 ring-branco/12"
              initial={{ opacity: 0, clipPath: "inset(14% 0 0 0)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src="/img/retrato.webp"
                srcSet="/img/retrato-380.webp 380w, /img/retrato.webp 506w"
                sizes="(min-width: 1024px) 400px, min(84vw, 340px)"
                width={506}
                height={778}
                loading="lazy"
                decoding="async"
                alt={`Retrato de ${candidato.nome}`}
                className="block h-auto w-full"
              />
            </m.div>

            {/* Número da camisa, montado sobre a quina do retrato. */}
            <div className="absolute -right-2 -bottom-5 flex items-center gap-2.5 rounded-full bg-amarelo px-5 py-2 text-fundo shadow-[0_18px_40px_-18px_rgba(0,0,0,0.9)] sm:-right-4">
              <span className="rotulo">{candidato.cargo}</span>
              <span className="numeral text-[1.8rem]">{candidato.numero}</span>
            </div>
          </figure>

          <div>
            <div className="space-y-5">
              {sobre.abertura.map((paragrafo, i) => (
                <Reveal as="p" key={paragrafo} delay={i * 0.06} className="corpo">
                  {paragrafo}
                </Reveal>
              ))}
            </div>

            {/* O coração do texto sai do parágrafo e vira peça. */}
            <Reveal className="mt-12">
              <blockquote className="relative border-l-[3px] pl-6" style={{ borderColor: "var(--luz)" }}>
                <p className="fechamento text-[clamp(1.35rem,3.6vw,2rem)] text-branco">
                  {sobre.destaque}
                </p>
              </blockquote>
            </Reveal>

            {/* A escalação: a frase do cliente lida como ficha de time. */}
            <div className="mt-12">
              <Reveal>
                <p className="rotulo text-branco/62">{sobre.metodo.lead}</p>
              </Reveal>

              <RevealGroup
                as="ol"
                className="mt-5 grid border-t border-branco/12 sm:grid-cols-2"
              >
                {sobre.metodo.itens.map((item, i) => (
                  <m.li
                    key={item}
                    variants={itemVariants}
                    className="flex items-baseline gap-4 border-b border-branco/12 py-4 sm:odd:border-r sm:odd:border-r-branco/12 sm:odd:pr-6 sm:even:pl-6"
                  >
                    <span
                      className="numeral shrink-0 text-[1.15rem] tabular-nums"
                      style={{ color: "var(--luz)" }}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="fechamento text-[1.05rem] text-branco/92">
                      {item}
                    </span>
                  </m.li>
                ))}
              </RevealGroup>
            </div>

            <div className="mt-12 space-y-5">
              {sobre.fecho.map((paragrafo, i) => (
                <Reveal as="p" key={paragrafo} delay={i * 0.05} className="corpo">
                  {paragrafo}
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
