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

export function Aurora() {
  return <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
}

export function CursorGlow() {
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const dot = document.createElement('div')
    dot.className = 'cursor-dot'
    const ring = document.createElement('div')
    ring.className = 'cursor-ring'
    document.body.append(dot, ring)
    document.body.classList.add('has-custom-cursor')

    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let ringX = mouseX
    let ringY = mouseY

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`
    }
    const onOver = (e) => {
      const hoverable = e.target.closest('a, button, input, select, textarea, .tilt')
      ring.classList.toggle('active', !!hoverable)
    }
    let frame
    const tick = () => {
      ringX += (mouseX - ringX) * 0.18
      ringY += (mouseY - ringY) * 0.18
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`
      frame = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    frame = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(frame)
      dot.remove()
      ring.remove()
      document.body.classList.remove('has-custom-cursor')
    }
  }, [])
  return null
}
