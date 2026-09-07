import { useEffect, useId, useState } from 'react'
import { NAV_IDS, PROFILE } from '../data/portfolio'
import { useLocale } from '../i18n/LocaleContext'
import { useScrollProgress } from '../hooks/useScrollProgress'
import { useScrollSpy } from '../hooks/useScrollSpy'

export function Header() {
  const { t, locale, setLocale } = useLocale()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const progress = useScrollProgress()
  const activeId = useScrollSpy([...NAV_IDS], 140)

  const links = NAV_IDS.map((id) => ({
    id,
    href: `#${id}`,
    label: t.nav[id],
  }))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [open])

  const ink = scrolled ? 'text-ink' : 'text-white'
  const mist = scrolled ? 'text-mist hover:text-ink' : 'text-white/70 hover:text-white'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-line bg-snow/90 shadow-sm backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-0.5 ${scrolled ? 'bg-ink-soft' : 'bg-white/10'}`}
        aria-hidden
      >
        <div
          className="h-full bg-accent transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="container-page flex h-16 items-center justify-between">
        <a href="#top" className={`font-display text-lg font-bold tracking-tight transition ${ink}`}>
          {PROFILE.brand}
          <span className="text-accent">.</span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {links.map((link) => {
            const isActive = activeId === link.id
            return (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link text-sm transition-colors ${
                  isActive ? `is-active font-semibold ${ink}` : mist
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {link.label}
              </a>
            )
          })}
          <div
            className={`flex overflow-hidden rounded-full border text-xs font-semibold ${
              scrolled ? 'border-line' : 'border-white/25'
            }`}
            role="group"
            aria-label="Language"
          >
            {(['en', 'es'] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLocale(code)}
                className={`px-2.5 py-1.5 uppercase transition ${
                  locale === code
                    ? 'bg-accent text-white'
                    : scrolled
                      ? 'text-mist hover:text-ink'
                      : 'text-white/70 hover:text-white'
                }`}
              >
                {code}
              </button>
            ))}
          </div>
          <a href="#contact" className="btn-primary !px-4 !py-2">
            {t.nav.hire}
          </a>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <div
            className={`flex overflow-hidden rounded-full border text-xs font-semibold ${
              scrolled ? 'border-line' : 'border-white/25'
            }`}
            role="group"
            aria-label="Language"
          >
            {(['en', 'es'] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLocale(code)}
                className={`px-2 py-1 uppercase ${
                  locale === code ? 'bg-accent text-white' : scrolled ? 'text-mist' : 'text-white/80'
                }`}
              >
                {code}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border ${
              scrolled ? 'border-line bg-white text-ink' : 'border-white/25 bg-white/10 text-white'
            }`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
          >
            <div className="flex w-4 flex-col gap-1.5" aria-hidden>
              <span
                className={`h-0.5 transition ${open ? 'translate-y-2 rotate-45' : ''} ${
                  scrolled ? 'bg-ink' : 'bg-white'
                }`}
              />
              <span
                className={`h-0.5 transition ${open ? 'opacity-0' : ''} ${
                  scrolled ? 'bg-ink' : 'bg-white'
                }`}
              />
              <span
                className={`h-0.5 transition ${open ? '-translate-y-2 -rotate-45' : ''} ${
                  scrolled ? 'bg-ink' : 'bg-white'
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div id={menuId} className="border-t border-line bg-snow/95 backdrop-blur-md lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2.5 text-sm ${
                  activeId === link.id
                    ? 'bg-ink-soft font-semibold text-ink'
                    : 'text-mist hover:bg-ink-soft hover:text-ink'
                }`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
