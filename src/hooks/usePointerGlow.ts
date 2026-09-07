import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export function usePointerGlow() {
  const reduced = usePrefersReducedMotion()
  const [point, setPoint] = useState({ x: 50, y: 40 })

  useEffect(() => {
    if (reduced) return

    const onMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 100
      const y = (event.clientY / window.innerHeight) * 100
      setPoint({ x, y })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduced])

  return point
}
