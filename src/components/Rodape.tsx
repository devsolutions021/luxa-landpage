import { candidato, contato, propaganda, suplentes } from "@/data/site";
import { FaixaCores, IconeInstagram, Reveal } from "./ui";

/**
 * O rodapé fecha a página com a assinatura da campanha: o lettering, o número,
 * a chapa completa e os dizeres obrigatórios de propaganda eleitoral.
 */
export function Rodape() {
  return (
    <footer className="relative bg-noite">
      <FaixaCores />

      <div className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-20">
          {/* Lettering da campanha, remontado em tipografia. */}
          <Reveal>
            <p className="rotulo text-branco/60">Vote</p>

            <p className="display mt-4 text-[clamp(1.05rem,3vw,1.5rem)] tracking-[0.34em] text-branco/85">
              Vanderlei
            </p>

            <p className="display mt-1 text-[clamp(2.6rem,10vw,5rem)] text-branco">
              Lu<span className="text-laranja">x</span>emburgo
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <span className="rotulo rounded-md bg-verde px-3.5 py-1.5 text-fundo">
                {candidato.cargo}
              </span>
              <span className="numeral text-[clamp(2.6rem,8vw,3.6rem)] text-amarelo">
                {candidato.numero}
              </span>
            </div>

            <ul className="mt-8 space-y-1.5">
              {suplentes.map((s) => (
                <li key={s.nome} className="text-[0.95rem] text-branco/70">
                  <span className="rotulo text-branco/52">{s.ordem}</span>{" "}
                  <span className="font-[700] text-branco/90">{s.nome}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="rotulo text-branco/60">Canal oficial</p>

            <a
              href={contato.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram oficial da campanha, perfil ${contato.perfil}`}
              className="group mt-4 inline-flex items-center gap-3 text-[clamp(1.1rem,3vw,1.4rem)] font-[700] text-branco transition-colors duration-300 hover:text-amarelo"
            >
              <IconeInstagram className="size-6 shrink-0" />
              <span className="underline decoration-amarelo/50 decoration-2 underline-offset-[6px] transition-colors duration-300 group-hover:decoration-amarelo">
                {contato.perfil}
              </span>
            </a>

            <p className="rotulo mt-10 text-branco/60">Contato</p>

            <a
              href={`mailto:${contato.email}`}
              className="mt-3 inline-block text-[1.02rem] text-branco/85 underline decoration-amarelo/45 decoration-1 underline-offset-[6px] transition-colors duration-300 hover:text-amarelo hover:decoration-amarelo"
            >
              {contato.email}
            </a>

            <p className="corpo mt-6 text-[0.95rem]">
              {candidato.estado} · Campanha ao {candidato.cargo}
            </p>
          </Reveal>
        </div>

        {/* Dizeres obrigatórios da Justiça Eleitoral. */}
        <div className="mt-16 border-t border-branco/10 pt-8">
          <p className="rotulo text-branco/60">Propaganda eleitoral</p>

          <address className="mt-4 max-w-[62ch] text-[0.88rem] leading-[1.75] text-branco/60 not-italic">
            <span className="block text-branco/78">{propaganda.comite}</span>
            {propaganda.partido && (
              <span className="block">{propaganda.partido}</span>
            )}
            <span className="block">CNPJ {propaganda.cnpj}</span>
            {propaganda.endereco && (
              <span className="block">{propaganda.endereco}</span>
            )}
          </address>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-branco/10 pt-8">
          <p className="rotulo text-branco/52">
            {candidato.nome} · {candidato.numero}
          </p>
          <p className="rotulo text-branco/52">{candidato.slogan}</p>
        </div>
      </div>
    </footer>
  );
}
