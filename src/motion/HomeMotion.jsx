import { Aurora, CursorGlow, ScrollProgress } from './effects'
import { useHeroIntro, useScrollReveals, useSmoothScroll } from './scroll'

// Todo o sistema de movimento da home (GSAP + Lenis) vive neste módulo,
// que é carregado sob demanda depois da hidratação — assim o pacote
// principal não carrega ~150 KB de animação antes do conteúdo aparecer.
function HomeMotion() {
  useSmoothScroll()
  useScrollReveals()
  useHeroIntro()
  return <><Aurora /><CursorGlow /><ScrollProgress /></>
}

export default HomeMotion
