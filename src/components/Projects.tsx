import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react'
import { PROJECTS } from '../data/portfolio'
import { useLocale } from '../i18n/LocaleContext'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { Reveal } from './Reveal'
import { SpotlightSurface } from './MotionFX'
import { CanvasFx } from './CanvasFx'

const AUTO_MS = 4200

function wrapOffset(i: number, index: number, total: number) {
  let delta = i - index
  const half = Math.floor(total / 2)
  if (delta > half) delta -= total
  if (delta < -half) delta += total
  return delta
}

export function Projects() {
  const { t } = useLocale()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduced = usePrefersReducedMotion()
  const touchStart = useRef<number | null>(null)
  const total = PROJECTS.length
  const active = PROJECTS[index]

  const go = useCallback(
    (dir: 1 | -1) => {
      setIndex((current) => (current + dir + total) % total)
    },
    [total],
  )

  const goTo = useCallback((next: number) => {
    setIndex(next)
  }, [])

  useEffect(() => {
    if (reduced || paused) return
    const id = window.setInterval(() => go(1), AUTO_MS)
    return () => window.clearInterval(id)
  }, [go, index, paused, reduced])

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) setPaused(true)
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const section = document.getElementById('projects')
      if (!section) return
      const rect = section.getBoundingClientRect()
      const inView = rect.top < window.innerHeight && rect.bottom > 0
      if (!inView) return
      if (event.key === 'ArrowRight') go(1)
      if (event.key === 'ArrowLeft') go(-1)
      if (event.key === ' ') {
        event.preventDefault()
        setPaused((value) => !value)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    touchStart.current = event.clientX
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    if (touchStart.current == null) return
    const delta = event.clientX - touchStart.current
    touchStart.current = null
    if (Math.abs(delta) < 48) return
    go(delta < 0 ? 1 : -1)
  }

  function openProject(url: string) {
    if (url.startsWith('#')) {
      window.location.hash = url
      return
    }
    window.open(url, '_blank', 'noreferrer')
  }

  return (
    <section
      id="projects"
      className="section-pad relative overflow-x-hidden border-t border-line bg-snow"
    >
      <CanvasFx mode="blueprint" className="opacity-55" />
      <div className="hero-orbs opacity-40" aria-hidden>
        <span className="orb orb-2" />
        <span className="orb orb-3" />
      </div>

      <div className="container-page relative z-[1]">
        <Reveal className="mb-10 max-w-2xl">
          <p className="eyebrow">{t.projects.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t.projects.title}
          </h2>
          <p className="mt-4 text-mist">{t.projects.subtitle}</p>
        </Reveal>
      </div>

      <div
        className="coverflow-stage relative z-[1] select-none"
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          touchStart.current = null
        }}
      >
        {PROJECTS.map((project, i) => {
          const offset = wrapOffset(i, index, total)
          const side = offset === 0 ? 'center' : offset < 0 ? 'left' : 'right'
          const hidden = Math.abs(offset) > 2

          return (
            <article
              key={project.id}
              className={`coverflow-card is-${side} ${hidden ? 'is-hidden' : ''}`}
              style={{
                ['--offset' as string]: String(offset),
                zIndex: 20 - Math.abs(offset),
              }}
              aria-hidden={offset !== 0}
            >
              <SpotlightSurface className="h-full w-full">
                <button
                  type="button"
                  className="coverflow-hit"
                  onClick={() => (offset === 0 ? openProject(project.url) : goTo(i))}
                  aria-label={offset === 0 ? `Open ${project.title}` : `Show ${project.title}`}
                  tabIndex={hidden ? -1 : 0}
                >
                  <img
                    src={project.image}
                    alt={`${project.title} website screenshot`}
                    className="coverflow-image"
                    loading={Math.abs(offset) <= 1 ? 'eager' : 'lazy'}
                  />
                  <div className="coverflow-shade" aria-hidden />
                </button>
              </SpotlightSurface>
            </article>
          )
        })}
        <div className="coverflow-fade coverflow-fade-left" aria-hidden />
        <div className="coverflow-fade coverflow-fade-right" aria-hidden />
      </div>

      <div className="container-page relative z-[1] mt-7">
        <div className="flex items-center justify-center gap-3">
          <button type="button" className="coverflow-btn" aria-label="Previous project" onClick={() => go(-1)}>
            <Chevron dir="left" />
          </button>
          <button type="button" className="coverflow-btn" aria-label="Next project" onClick={() => go(1)}>
            <Chevron dir="right" />
          </button>
          <button
            type="button"
            className="coverflow-btn"
            aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
            aria-pressed={paused}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? <PlayIcon /> : <PauseIcon />}
          </button>
        </div>

        {active ? (
          <div key={active.id} className="animate-rise mx-auto mt-8 max-w-3xl text-center">
            <p className="font-display text-sm font-semibold tabular-nums text-mist">
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </p>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              {active.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mist sm:text-base">{active.summary}</p>
            <p className="mt-3 hidden text-sm leading-relaxed text-mist/90 sm:block">{active.description}</p>
            <ul className="mt-5 flex flex-wrap justify-center gap-2">
              {active.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md bg-ink-soft px-2.5 py-1 text-xs font-medium text-accent transition hover:-translate-y-0.5 hover:bg-accent/10"
                >
                  {tech}
                </li>
              ))}
            </ul>
            <a
              href={active.url}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex text-sm font-semibold text-accent transition hover:translate-x-1 hover:text-accent-soft"
            >
              {t.projects.open}
              <span aria-hidden className="ml-1">
                →
              </span>
            </a>
          </div>
        ) : null}
      </div>
    </section>
  )
}

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden>
      <path
        d={dir === 'left' ? 'M12.5 4.5 7 10l5.5 5.5' : 'M7.5 4.5 13 10l-5.5 5.5'}
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden>
      <rect x="5.5" y="4.5" width="3" height="11" rx="0.8" />
      <rect x="11.5" y="4.5" width="3" height="11" rx="0.8" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor" aria-hidden>
      <path d="M7 5.2v9.6l8-4.8-8-4.8Z" />
    </svg>
  )
}
