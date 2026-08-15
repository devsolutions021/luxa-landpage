/**
 * THESIS — A página é a prancheta de um técnico, e o time é o Tocantins.
 * A copy fala de montar equipes, identificar talentos e transformar potencial
 * em resultado; a página empresta essa gramática: o traço da jogada que se
 * desenha sozinho, a escalação numerada, o número da camisa. Recusa o arranjo
 * padrão da categoria — hero em degradê seguido de grade de cards iguais.
 *
 * OWN-WORLD — Uma coluna d'água contínua, amostrada pixel a pixel do banner
 * oficial: verde-escuro embaixo, azul-noite no fim. A cor entra como luz
 * (halo radial ancorado), nunca como preenchimento chapado. Cada seção troca
 * uma variável, `--luz`: ciano na abertura, laranja na trajetória, verde na
 * virada, amarelo na convocação. Archivo variável condensado faz o lettering
 * esportivo sem precisar de uma segunda família.
 *
 * STORY — O eleitor vê a peça oficial e entende cargo e número; conhece a
 * trajetória e o método; atravessa a virada do futebol para o Tocantins; e sai
 * pelo Instagram do Time do Luxemburgo.
 *
 * FIRST VIEWPORT — O banner da campanha como placa, a chamada de abertura ao
 * lado e o número 200 aceso em amarelo.
 */

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import { ContatoFlutuante } from "./components/ContatoFlutuante";
import { Hero } from "./components/Hero";
import { Rodape } from "./components/Rodape";
import { Sobre } from "./components/Sobre";
import { Time } from "./components/Time";
import { Virada } from "./components/Virada";

export function App() {
  return (
    // domAnimation carrega só o essencial do motion (~18 kB a menos que o pacote inteiro).
    <LazyMotion features={domAnimation} strict>
      {/* `reducedMotion="user"` desliga deslocamento, escala e clip de toda a
          página quando o sistema pede movimento reduzido — a regra CSS global
          não alcança o que o motion anima por JS. A opacidade continua, então
          nenhuma informação some. */}
      <MotionConfig reducedMotion="user">
        <a
          href="#conheca"
          className="rotulo sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-amarelo focus:px-6 focus:py-3 focus:text-fundo"
        >
          Ir para o conteúdo
        </a>

        {/* A coluna d'água sustenta a página inteira: um só degradê, do
            verde-escuro do banner até o azul-noite do rodapé. */}
        <div className="agua">
          <Hero />

          <main>
            <Sobre />
            <Virada />
            <Time />
          </main>
        </div>

        <Rodape />
        <ContatoFlutuante />
      </MotionConfig>
    </LazyMotion>
  );
}
