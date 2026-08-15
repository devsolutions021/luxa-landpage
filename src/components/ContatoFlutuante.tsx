import { useEffect, useState } from "react";
import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";
import { contato, candidato } from "@/data/site";
import { IconeInstagram } from "./ui";

/**
 * Atalho para o único destino da página. Só aparece depois que o eleitor
 * passa da abertura — antes disso ele ainda não sabe para onde iria.
 * Some quando a seção de CTA entra em cena, para não competir com ela.
 */
export function ContatoFlutuante() {
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const alvo = document.getElementById("time");
    let passouAbertura = false;
    let chegouNoCta = false;

    const atualiza = () => setVisivel(passouAbertura && !chegouNoCta);

    const aoRolar = () => {
      passouAbertura = window.scrollY > window.innerHeight * 0.9;
      atualiza();
    };

    const observador = alvo
      ? new IntersectionObserver(
          ([entrada]) => {
            chegouNoCta = entrada.isIntersecting;
            atualiza();
          },
          { threshold: 0.15 },
        )
      : null;

    observador?.observe(alvo!);
    window.addEventListener("scroll", aoRolar, { passive: true });
    aoRolar();

    return () => {
      window.removeEventListener("scroll", aoRolar);
      observador?.disconnect();
    };
  }, []);

  return (
    <AnimatePresence>
      {visivel && (
        <m.a
          key="contato"
          href={contato.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Entrar para o time no Instagram, perfil ${contato.perfil} de ${candidato.nome}`}
          className="fixed right-4 bottom-4 z-40 inline-flex min-h-[3.25rem] items-center gap-2.5 rounded-full bg-amarelo px-5 text-[0.82rem] font-[800] tracking-[0.06em] text-fundo uppercase shadow-[0_18px_44px_-14px_rgba(0,0,0,0.8)] transition-transform duration-300 ease-[var(--ease-jogo)] hover:-translate-y-0.5 active:scale-[0.98] sm:right-6 sm:bottom-6"
          initial={{ opacity: 0, y: 18, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.94 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <IconeInstagram className="size-5 shrink-0" />
          Entrar para o time
        </m.a>
      )}
    </AnimatePresence>
  );
}
