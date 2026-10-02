import { useEffect, useRef } from 'react'

export function ScrollProgress() {
  const barRef = useRef(null)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      const ratio = max > 0 ? h.scrollTop / max : 0
      if (barRef.current) barRef.current.style.transform = `scaleX(${ratio})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) }
  }, [])
  return <div className="scroll-progress" aria-hidden="true"><i ref={barRef} /></div>
}
