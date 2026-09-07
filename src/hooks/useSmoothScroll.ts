import { useEffect } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Lightweight smooth-wheel scroll (Matheus uses Lenis; this avoids the extra dep
 * when registry installs fail, while keeping the same feel).
 */
export function useSmoothScroll() {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    let current = window.scrollY
    let target = window.scrollY
    let raf = 0
    let running = false

    function tick() {
      running = true
      current += (target - current) * 0.12
      if (Math.abs(target - current) < 0.35) {
        current = target
        window.scrollTo(0, current)
        running = false
        return
      }
      window.scrollTo(0, current)
      raf = requestAnimationFrame(tick)
    }

    function onWheel(event: WheelEvent) {
      if (event.ctrlKey) return
      event.preventDefault()
      target = Math.max(
        0,
        Math.min(
          document.documentElement.scrollHeight - window.innerHeight,
          target + event.deltaY,
        ),
      )
      if (!running) raf = requestAnimationFrame(tick)
    }

    function onScroll() {
      if (running) return
      current = window.scrollY
      target = window.scrollY
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
    }
  }, [reduced])
}
