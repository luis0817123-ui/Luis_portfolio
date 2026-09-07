import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

type CanvasMode = 'ember' | 'particles' | 'blueprint'

interface CanvasFxProps {
  mode?: CanvasMode
  className?: string
}

function mulberry32(seed: number) {
  let t = seed >>> 0
  return () => {
    t = (t + 1831565813) >>> 0
    let r = t
    r = Math.imul(r ^ (r >>> 15), r | 1)
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

/** Animated background canvas inspired by Matheus portfolio (ember / particles / blueprint). */
export function CanvasFx({ mode = 'ember', className = '' }: CanvasFxProps) {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    if (!canvas || reduced) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const dpr = Math.min(1.5, window.devicePixelRatio || 1)
    let width = 0
    let height = 0
    let raf = 0
    let running = true
    let visible = true

    type Blob = { x: number; y: number; radius: number; opacity: number; hueShift: number }
    type Vein = {
      points: { x: number; y: number }[]
      width: number
      phase: number
      phaseSpeed: number
      hotspots: { t: number; intensity: number; phase: number; speed: number }[]
      sparks: { progress: number; speed: number; size: number }[]
    }
    type Ember = {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      life: number
      maxLife: number
      hue: number
    }
    type Star = { x: number; y: number; size: number; twinklePhase: number; twinkleSpeed: number; brightness: number }
    type Node = { x: number; y: number; size: number; rotation: number; rotationSpeed: number; phase: number }

    let blobs: Blob[] = []
    let veins: Vein[] = []
    let embers: Ember[] = []
    let stars: Star[] = []
    let nodes: Node[] = []

    function resize() {
      const parent = canvas!.parentElement
      width = parent?.clientWidth || window.innerWidth
      height = parent?.clientHeight || window.innerHeight
      canvas!.width = Math.floor(width * dpr)
      canvas!.height = Math.floor(height * dpr)
      canvas!.style.width = `${width}px`
      canvas!.style.height = `${height}px`
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      seed()
    }

    function seed() {
      const rand = mulberry32(mode === 'ember' ? 1337 : mode === 'particles' ? 7777 : 2024)
      blobs = []
      veins = []
      embers = []
      stars = []
      nodes = []

      if (mode === 'ember' || mode === 'particles') {
        const blobCount = Math.min(60, Math.max(20, Math.floor((width * height) / 30000)))
        for (let i = 0; i < blobCount; i++) {
          blobs.push({
            x: rand() * width,
            y: rand() * height,
            radius: 60 + rand() * 180,
            opacity: 0.12 + rand() * 0.16,
            hueShift: (rand() - 0.5) * 20,
          })
        }
      }

      if (mode === 'ember') {
        const veinCount = Math.min(7, Math.max(3, Math.floor(height / 280)))
        for (let i = 0; i < veinCount; i++) {
          let x = rand() * width
          let y = -40 + rand() * height
          const points = [{ x, y }]
          const segments = 5 + Math.floor(rand() * 5)
          const drift = (rand() - 0.5) * 0.6
          for (let s = 0; s < segments; s++) {
            x += (drift + (rand() - 0.5) * 0.8) * (60 + rand() * 80)
            y += 80 + rand() * 140
            points.push({ x, y })
          }
          const hotspots = Array.from({ length: 2 + Math.floor(rand() * 3) }, () => ({
            t: 0.12 + rand() * 0.76,
            intensity: 0.6 + rand() * 0.6,
            phase: rand() * Math.PI * 2,
            speed: 0.4 + rand() * 0.8,
          }))
          const sparks = Array.from({ length: 1 + Math.floor(rand() * 3) }, () => ({
            progress: rand(),
            speed: 0.0008 + rand() * 0.0014,
            size: 1.4 + rand() * 1.6,
          }))
          veins.push({
            points,
            width: 1.2 + rand() * 1.8,
            phase: rand() * Math.PI * 2,
            phaseSpeed: 0.6 + rand() * 0.6,
            hotspots,
            sparks,
          })
        }

        const emberCount = Math.min(90, Math.max(36, Math.floor((width * height) / 18000)))
        for (let i = 0; i < emberCount; i++) {
          embers.push({
            x: rand() * width,
            y: rand() * height,
            vx: (rand() - 0.5) * 0.22,
            vy: -(0.18 + rand() * 0.55),
            size: 0.6 + rand() * 1.6,
            life: rand() * 320,
            maxLife: 240 + rand() * 320,
            hue: 14 + rand() * 26,
          })
        }
      }

      if (mode === 'particles') {
        const starCount = Math.min(220, Math.max(80, Math.floor((width * height) / 8000)))
        for (let i = 0; i < starCount; i++) {
          stars.push({
            x: rand() * width,
            y: rand() * height,
            size: 0.5 + rand() * 1.3,
            twinklePhase: rand() * Math.PI * 2,
            twinkleSpeed: 0.25 + rand() * 1.2,
            brightness: 0.35 + rand() * 0.6,
          })
        }
        const emberCount = Math.min(130, Math.max(60, Math.floor((width * height) / 12000)))
        for (let i = 0; i < emberCount; i++) {
          embers.push({
            x: rand() * width,
            y: rand() * height,
            vx: (rand() - 0.5) * 0.15,
            vy: -(0.22 + rand() * 0.7),
            size: 0.7 + rand() * 1.5,
            life: rand() * 280,
            maxLife: 200 + rand() * 320,
            hue: 14 + rand() * 28,
          })
        }
      }

      if (mode === 'blueprint') {
        const spacing = 220
        const cols = Math.ceil(width / spacing)
        const rows = Math.ceil(height / spacing)
        for (let c = 0; c < cols; c++) {
          for (let r = 0; r < rows; r++) {
            if (rand() > 0.7) continue
            nodes.push({
              x: (c + 0.5) * spacing + (rand() - 0.5) * spacing * 0.4,
              y: (r + 0.5) * spacing + (rand() - 0.5) * spacing * 0.4,
              size: 12 + rand() * 26,
              rotation: rand() * Math.PI * 2,
              rotationSpeed: (rand() - 0.5) * 0.0035,
              phase: rand() * Math.PI * 2,
            })
          }
        }
      }
    }

    function drawEmber(now: number) {
      ctx!.clearRect(0, 0, width, height)
      const glow = ctx!.createRadialGradient(width * 0.72, height * 0.5, 0, width * 0.72, height * 0.5, Math.max(width, height) * 0.8)
      glow.addColorStop(0, 'rgba(255, 110, 30, 0.08)')
      glow.addColorStop(0.5, 'rgba(255, 60, 0, 0.025)')
      glow.addColorStop(1, 'rgba(255, 60, 0, 0)')
      ctx!.fillStyle = glow
      ctx!.fillRect(0, 0, width, height)

      for (const blob of blobs) {
        const g = ctx!.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius)
        g.addColorStop(0, `rgba(${220 + blob.hueShift}, 90, 40, ${blob.opacity * 0.35})`)
        g.addColorStop(0.55, `rgba(${180 + blob.hueShift}, 50, 20, ${blob.opacity * 0.18})`)
        g.addColorStop(1, 'rgba(255, 60, 0, 0)')
        ctx!.fillStyle = g
        ctx!.beginPath()
        ctx!.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2)
        ctx!.fill()
      }

      for (const vein of veins) {
        vein.phase += 0.013 * vein.phaseSpeed
        const pulse = 0.55 + ((Math.sin(vein.phase) + 1) / 2) * 0.35
        ctx!.lineCap = 'round'
        ctx!.lineJoin = 'round'
        ctx!.strokeStyle = `rgba(255, 90, 0, ${pulse * 0.18})`
        ctx!.lineWidth = vein.width * 8
        ctx!.beginPath()
        ctx!.moveTo(vein.points[0].x, vein.points[0].y)
        for (let i = 1; i < vein.points.length - 1; i++) {
          const mx = (vein.points[i].x + vein.points[i + 1].x) / 2
          const my = (vein.points[i].y + vein.points[i + 1].y) / 2
          ctx!.quadraticCurveTo(vein.points[i].x, vein.points[i].y, mx, my)
        }
        ctx!.lineTo(vein.points[vein.points.length - 1].x, vein.points[vein.points.length - 1].y)
        ctx!.stroke()
        ctx!.strokeStyle = `rgba(255, 140, 40, ${pulse * 0.55})`
        ctx!.lineWidth = vein.width * 3.2
        ctx!.stroke()
        ctx!.strokeStyle = `rgba(255, 220, 160, ${pulse})`
        ctx!.lineWidth = vein.width
        ctx!.stroke()

        for (const hot of vein.hotspots) {
          hot.phase += 0.018 * hot.speed
          const idx = Math.floor(hot.t * (vein.points.length - 1))
          const frac = hot.t * (vein.points.length - 1) - idx
          const a = vein.points[idx]
          const b = vein.points[Math.min(idx + 1, vein.points.length - 1)]
          const x = a.x + (b.x - a.x) * frac
          const y = a.y + (b.y - a.y) * frac
          const intensity = hot.intensity * (0.5 + Math.sin(hot.phase) * 0.5)
          const g = ctx!.createRadialGradient(x, y, 0, x, y, 48)
          g.addColorStop(0, `rgba(255, 220, 130, ${intensity * 0.9})`)
          g.addColorStop(0.4, `rgba(255, 110, 30, ${intensity * 0.4})`)
          g.addColorStop(1, 'rgba(255, 60, 0, 0)')
          ctx!.fillStyle = g
          ctx!.beginPath()
          ctx!.arc(x, y, 48, 0, Math.PI * 2)
          ctx!.fill()
        }

        for (const spark of vein.sparks) {
          spark.progress += spark.speed * 60
          if (spark.progress > 1) spark.progress = 0
          const pos = spark.progress * (vein.points.length - 1)
          const idx = Math.floor(pos)
          const frac = pos - idx
          const a = vein.points[idx]
          const b = vein.points[Math.min(idx + 1, vein.points.length - 1)]
          const x = a.x + (b.x - a.x) * frac
          const y = a.y + (b.y - a.y) * frac
          const g = ctx!.createRadialGradient(x, y, 0, x, y, spark.size * 6)
          g.addColorStop(0, 'rgba(255, 235, 180, 1)')
          g.addColorStop(0.4, 'rgba(255, 140, 40, 0.7)')
          g.addColorStop(1, 'rgba(255, 60, 0, 0)')
          ctx!.fillStyle = g
          ctx!.beginPath()
          ctx!.arc(x, y, spark.size * 6, 0, Math.PI * 2)
          ctx!.fill()
        }
      }

      for (const ember of embers) {
        ember.life += 1
        ember.x += ember.vx
        ember.y += ember.vy
        if (ember.life > ember.maxLife || ember.y < -10) {
          ember.x = Math.random() * width
          ember.y = height + 10
          ember.life = 0
        }
        const alpha = 1 - ember.life / ember.maxLife
        ctx!.fillStyle = `hsla(${ember.hue}, 100%, 60%, ${alpha * 0.85})`
        ctx!.beginPath()
        ctx!.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2)
        ctx!.fill()
      }

      void now
    }

    function drawParticles() {
      ctx!.clearRect(0, 0, width, height)
      for (const star of stars) {
        star.twinklePhase += 0.02 * star.twinkleSpeed
        const alpha = star.brightness * (0.45 + Math.sin(star.twinklePhase) * 0.35)
        ctx!.fillStyle = `rgba(255, 150, 80, ${alpha})`
        ctx!.beginPath()
        ctx!.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx!.fill()
      }
      for (const ember of embers) {
        ember.life += 1
        ember.x += ember.vx + Math.sin(ember.life * 0.04) * 0.2
        ember.y += ember.vy
        if (ember.life > ember.maxLife || ember.y < -10) {
          ember.x = Math.random() * width
          ember.y = height + 8
          ember.life = 0
        }
        const alpha = 1 - ember.life / ember.maxLife
        ctx!.fillStyle = `hsla(${ember.hue}, 100%, 62%, ${alpha * 0.8})`
        ctx!.beginPath()
        ctx!.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2)
        ctx!.fill()
      }
    }

    function drawBlueprint() {
      ctx!.clearRect(0, 0, width, height)
      ctx!.strokeStyle = 'rgba(255, 107, 0, 0.08)'
      ctx!.lineWidth = 1
      for (let x = 0; x < width; x += 48) {
        ctx!.beginPath()
        ctx!.moveTo(x, 0)
        ctx!.lineTo(x, height)
        ctx!.stroke()
      }
      for (let y = 0; y < height; y += 48) {
        ctx!.beginPath()
        ctx!.moveTo(0, y)
        ctx!.lineTo(width, y)
        ctx!.stroke()
      }

      for (const node of nodes) {
        node.rotation += node.rotationSpeed
        node.phase += 0.02
        const pulse = 0.35 + ((Math.sin(node.phase) + 1) / 2) * 0.45
        ctx!.save()
        ctx!.translate(node.x, node.y)
        ctx!.rotate(node.rotation)
        ctx!.strokeStyle = `rgba(255, 107, 0, ${pulse})`
        ctx!.lineWidth = 1.4
        ctx!.strokeRect(-node.size / 2, -node.size / 2, node.size, node.size)
        ctx!.beginPath()
        ctx!.arc(0, 0, node.size * 0.22, 0, Math.PI * 2)
        ctx!.stroke()
        ctx!.restore()
      }

      ctx!.strokeStyle = 'rgba(255, 107, 0, 0.12)'
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < 220) {
            ctx!.globalAlpha = 1 - dist / 220
            ctx!.beginPath()
            ctx!.moveTo(a.x, a.y)
            ctx!.lineTo(b.x, b.y)
            ctx!.stroke()
          }
        }
      }
      ctx!.globalAlpha = 1
    }

    function frame(now: number) {
      if (!running || !visible) {
        raf = requestAnimationFrame(frame)
        return
      }
      if (mode === 'ember') drawEmber(now)
      else if (mode === 'particles') drawParticles()
      else drawBlueprint()
      raf = requestAnimationFrame(frame)
    }

    resize()
    const onResize = () => resize()
    window.addEventListener('resize', onResize)

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible = entry.isIntersecting
      },
      { threshold: 0.01 },
    )
    if (canvas.parentElement) io.observe(canvas.parentElement)

    raf = requestAnimationFrame(frame)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      io.disconnect()
    }
  }, [mode, reduced])

  if (reduced) return null

  return <canvas ref={ref} className={`canvas-bg ${className}`.trim()} aria-hidden />
}
