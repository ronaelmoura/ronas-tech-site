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

export function useScrollReveals() {
  useIsomorphicLayoutEffect(() => {
    if (prefersReduced()) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'))
      return undefined
    }
    const ctx = gsap.context(() => {
      gsap.set('.reveal', { autoAlpha: 0, y: 42, scale: 0.96, skewY: 2 })
      ScrollTrigger.batch('.reveal', {
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
    if (prefersReduced()) return undefined
    let failSafe
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } })
        .from('.hero-eyebrow-anim', { y: 20, autoAlpha: 0 })
        .from('.hero-mask h1', { yPercent: 115 }, '-=0.55')
        .from('.hero-desc-anim', { y: 24, autoAlpha: 0 }, '-=0.55')
        .from('.hero-actions-anim', { y: 20, autoAlpha: 0 }, '-=0.5')
        .from('.hero-visual-anim', { autoAlpha: 0, scale: 0.94, y: 30, duration: 1.1 }, '-=0.85')
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
