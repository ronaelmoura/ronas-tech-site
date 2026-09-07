import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

// This app is server-rendered; useLayoutEffect warns during SSR, so fall
// back to a no-op-on-server effect there and only run the real layout
// effect once hydrated in the browser.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReduced()) return undefined
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true })
    lenis.on('scroll', ScrollTrigger.update)
    const onTick = (time) => { lenis.raf(time * 1000) }
    gsap.ticker.add(onTick)
    gsap.ticker.lagSmoothing(0)
    return () => {
      gsap.ticker.remove(onTick)
      lenis.destroy()
    }
  }, [])
}

// O módulo de movimento é carregado depois da hidratação. Quando ele
// demora demais (rede lenta, aparelho fraco), animar o que o visitante já
// está lendo causaria um "pisca" — nesses casos o conteúdo simplesmente
// fica como está.
const LATE_LOAD_MS = 1500
const loadedLate = () => performance.now() > LATE_LOAD_MS

export function useScrollReveals() {
  useIsomorphicLayoutEffect(() => {
    if (prefersReduced()) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'))
      return undefined
    }
    // Só prepara o que ainda está abaixo da dobra: o que já foi pintado
    // nunca é escondido para depois reaparecer.
    const pending = [...document.querySelectorAll('.reveal')].filter(
      (element) => element.getBoundingClientRect().top > window.innerHeight * 0.88,
    )
    if (!pending.length) return undefined
    const ctx = gsap.context(() => {
      gsap.set(pending, { autoAlpha: 0, y: 42, scale: 0.96, skewY: 2 })
      ScrollTrigger.batch(pending, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => gsap.to(batch, {
          autoAlpha: 1, y: 0, scale: 1, skewY: 0,
          duration: 0.9, ease: 'power3.out', stagger: 0.08,
        }),
      })
    })
    return () => ctx.revert()
  }, [])
}

export function useHeroIntro() {
  useIsomorphicLayoutEffect(() => {
    // O hero já está visível no HTML: se o módulo chegou tarde, animar
    // agora significaria apagar e redesenhar o que o visitante está lendo.
    if (prefersReduced() || loadedLate()) return undefined
    let failSafe
    const ctx = gsap.context(() => {
      // A entrada do hero usa só transformações, nunca opacidade: o texto
      // do hero é o elemento de LCP da home e animá-lo em opacidade adiava
      // a maior pintura em mais de um segundo.
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } })
        .from('.hero-eyebrow-anim', { y: 20 })
        .from('.hero-mask h1', { yPercent: 115 }, '-=0.55')
        .from('.hero-desc-anim', { y: 24 }, '-=0.55')
        .from('.hero-actions-anim', { y: 20 }, '-=0.5')
        .from('.hero-visual-anim', { scale: 0.94, y: 30, duration: 1.1 }, '-=0.85')
      // If the ticker ever stalls (throttled tab, blocked script, slow
      // device) this jumps straight to the finished state so the hero
      // never gets stuck invisible.
      failSafe = setTimeout(() => tl.progress(1), 3000)
    })
    return () => { clearTimeout(failSafe); ctx.revert() }
  }, [])
}

export function usePopReveal(options = {}) {
  const ref = useRef(null)
  useIsomorphicLayoutEffect(() => {
    if (prefersReduced() || !ref.current) return undefined
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { autoAlpha: 0, y: 60, rotateX: 6, scale: 0.94, transformPerspective: 900 },
        {
          autoAlpha: 1, y: 0, rotateX: 0, scale: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 82%' },
          ...options,
        },
      )
    })
    return () => ctx.revert()
  }, [options])
  return ref
}
