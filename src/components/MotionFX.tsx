import { useRef, type MouseEvent, type ReactNode, type CSSProperties } from 'react'

interface MagneticButtonProps {
  href: string
  className?: string
  children: ReactNode
  strength?: number
}

/** Matheus-style magnetic CTA — button follows the pointer slightly. */
export function MagneticButton({
  href,
  className = '',
  children,
  strength = 0.28,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)

  function onMove(event: MouseEvent<HTMLAnchorElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2
    el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`
  }

  function onLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate3d(0, 0, 0)'
  }

  return (
    <a
      ref={ref}
      href={href}
      className={`btn-magnetic ${className}`}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </a>
  )
}

interface SpotlightProps {
  className?: string
  children: ReactNode
  style?: CSSProperties
}

/** Mouse-follow spotlight overlay like Matheus project cards. */
export function SpotlightSurface({ className = '', children, style }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null)

  function onMove(event: MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100
    el.style.setProperty('--mx', `${x}%`)
    el.style.setProperty('--my', `${y}%`)
  }

  return (
    <div
      ref={ref}
      className={`spotlight-surface ${className}`}
      style={style}
      onMouseMove={onMove}
    >
      <div className="project-spotlight" aria-hidden />
      {children}
    </div>
  )
}
