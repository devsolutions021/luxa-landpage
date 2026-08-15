import { virada } from "@/data/site";
import { Reveal, TracoJogada } from "./ui";

/**
 * A virada: do futebol para o Tocantins. É aqui que o traço da jogada faz o
 * trabalho — ele sai de um lado e chega no outro enquanto o eleitor lê.
 */
export function Virada() {
  return (
    <section
      className="relative overflow-hidden py-20 lg:py-32"
      style={{ ["--luz" as string]: "var(--color-verde)" }}
    >
      <div
        aria-hidden="true"
        className="halo respira pointer-events-none absolute inset-x-[-15%] top-[10%] h-[70%] opacity-80"
        style={{ ["--halo-x" as string]: "62%", ["--halo-y" as string]: "44%" }}
      />

      <div className="relative mx-auto max-w-[1080px] px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[520px]">
          <TracoJogada />
        </div>

        <Reveal as="h2" className="display mt-6 text-center text-[clamp(2.1rem,7vw,4.2rem)]">
          {virada.titulo}
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-placa)] bg-branco/12 sm:grid-cols-2">
          {virada.paragrafos.map((p, i) => (
            <Reveal key={p.lead} delay={i * 0.1} className="superficie flex h-full flex-col gap-3 rounded-none p-8 sm:p-10">
              <p
                className="rotulo"
                style={{ color: p.tinta }}
              >
                {p.lead}
              </p>
              <p className="fechamento text-[clamp(1.15rem,2.6vw,1.5rem)] text-branco/92">
                {p.resto}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
