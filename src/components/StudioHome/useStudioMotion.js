import { useEffect } from 'react'

// Progressive enhancement: content is visible even without JavaScript or motion.
export default function useStudioMotion(rootRef) {
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    let observer
    const animations = new Set()
    const stop = () => {
      observer?.disconnect()
      animations.forEach(animation => animation.cancel())
      animations.clear()
    }
    const start = () => {
      stop()
      if (preference.matches || !('IntersectionObserver' in window)) return
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          const animation = entry.target.animate([
            { opacity: .35, transform: 'translateY(30px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ], { duration: 650, easing: 'cubic-bezier(.2,.7,.2,1)' })
          animations.add(animation)
          animation.onfinish = () => animations.delete(animation)
          observer.unobserve(entry.target)
        })
      }, { threshold: .12 })
      root.querySelectorAll('[data-studio-reveal]').forEach(element => observer.observe(element))
    }
    start()
    preference.addEventListener('change', start)
    return () => { stop(); preference.removeEventListener('change', start) }
  }, [rootRef])
}
