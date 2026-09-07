import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { usePointerGlow } from '../hooks/usePointerGlow'

/** Global mouse glow + soft cursor ring (Matheus-style ambient pointer FX). */
export function AmbientLayer() {
  const reduced = usePrefersReducedMotion()
  const point = usePointerGlow()
  const [visible, setVisible] = useState(false)
  const trailRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (reduced) return
    setVisible(true)
  }, [reduced])

  useEffect(() => {
    const canvas = trailRef.current
    if (!canvas || reduced) return
    if (window.matchMedia('(hover: none)').matches) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const dpr = Math.min(1.5, window.devicePixelRatio || 1)
    let raf = 0
    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    const trail: { x: number; y: number; life: number }[] = []

    function resize() {
      canvas!.width = Math.floor(window.innerWidth * dpr)
      canvas!.height = Math.floor(window.innerHeight * dpr)
      canvas!.style.width = `${window.innerWidth}px`
      canvas!.style.height = `${window.innerHeight}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function onMove(event: PointerEvent) {
      mx = event.clientX
      my = event.clientY
      trail.push({ x: mx, y: my, life: 1 })
      if (trail.length > 28) trail.shift()
    }

    function frame() {
      ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight)
      for (let i = 0; i < trail.length; i++) {
        const p = trail[i]
        p.life *= 0.9
        const alpha = p.life * 0.35
        const size = 3 + i * 0.35
        const g = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 4)
        g.addColorStop(0, `rgba(255, 140, 40, ${alpha})`)
        g.addColorStop(1, 'rgba(255, 60, 0, 0)')
        ctx!.fillStyle = g
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, size * 4, 0, Math.PI * 2)
        ctx!.fill()
      }
      while (trail.length && trail[0].life < 0.04) trail.shift()

      const ring = ctx!.createRadialGradient(mx, my, 0, mx, my, 26)
      ring.addColorStop(0, 'rgba(255, 180, 80, 0.22)')
      ring.addColorStop(1, 'rgba(255, 60, 0, 0)')
      ctx!.fillStyle = ring
      ctx!.beginPath()
      ctx!.arc(mx, my, 26, 0, Math.PI * 2)
      ctx!.fill()

      raf = requestAnimationFrame(frame)
    }

    resize()
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', resize)
    }
  }, [reduced])

  if (reduced) return null

  return (
    <>
      <div
        className="site-mouse-glow"
        style={{
          opacity: visible ? 1 : 0,
          background: `radial-gradient(560px circle at ${point.x}% ${point.y}%, rgba(255,107,0,0.16), transparent 55%)`,
        }}
        aria-hidden
      />
      <canvas ref={trailRef} className="site-cursor-trail" aria-hidden />
      <div
        className="site-cursor"
        style={{
          transform: `translate3d(calc(${point.x}vw - 50%), calc(${point.y}vh - 50%), 0)`,
        }}
        aria-hidden
      />
    </>
  )
}
