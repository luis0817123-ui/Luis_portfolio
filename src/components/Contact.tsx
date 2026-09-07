import { useState, type FormEvent } from 'react'
import { PROFILE } from '../data/portfolio'
import { useLocale } from '../i18n/LocaleContext'
import { Reveal } from './Reveal'

export function Contact() {
  const { t } = useLocale()
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const honeypot = String(data.get('company') || '').trim()
    if (honeypot) return

    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const subject = String(data.get('subject') || 'Portfolio inquiry').trim()
    const message = String(data.get('message') || '').trim()

    if (name.length < 2 || message.length < 8) {
      setError(t.contact.error)
      return
    }

    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)
    const mailto = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${body}`
    window.location.href = mailto
    setError('')
    setSent(true)
    form.reset()
  }

  return (
    <section id="contact" className="section-pad border-t border-line site-canvas">
      <div className="container-page grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">{t.contact.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t.contact.title}
          </h2>
          <p className="mt-4 max-w-md text-mist">{t.contact.lead}</p>
          <p className="mt-3 max-w-md text-sm text-mist/80">{t.contact.note}</p>

          <div className="mt-8 space-y-3 text-sm sm:text-base">
            <a
              href={`mailto:${PROFILE.email}`}
              className="block font-medium text-accent transition hover:text-accent-soft"
            >
              {PROFILE.email}
            </a>
            <p className="text-mist">{PROFILE.location}</p>
            <p className="text-mist">{PROFILE.availability}</p>
          </div>
        </Reveal>

        <Reveal delayMs={80}>
          <form
            onSubmit={onSubmit}
            className="surface surface-active rounded-2xl p-6 sm:p-8"
            noValidate={false}
          >
            <h3 className="font-display text-xl font-semibold text-ink">{t.contact.formTitle}</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="hidden">
                Company
                <input name="company" tabIndex={-1} autoComplete="off" />
              </label>
              <label className="block sm:col-span-1">
                <span className="mb-1.5 block text-sm text-mist">{t.contact.name}</span>
                <input
                  required
                  name="name"
                  autoComplete="name"
                  className="w-full rounded-xl border border-line bg-snow px-3.5 py-2.5 text-ink outline-none transition focus:border-accent focus:shadow-[0_0_0_4px_rgba(255,107,0,0.14)]"
                />
              </label>
              <label className="block sm:col-span-1">
                <span className="mb-1.5 block text-sm text-mist">{t.contact.email}</span>
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  className="w-full rounded-xl border border-line bg-snow px-3.5 py-2.5 text-ink outline-none transition focus:border-accent focus:shadow-[0_0_0_4px_rgba(255,107,0,0.14)]"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-sm text-mist">{t.contact.subject}</span>
                <input
                  name="subject"
                  className="w-full rounded-xl border border-line bg-snow px-3.5 py-2.5 text-ink outline-none transition focus:border-accent focus:shadow-[0_0_0_4px_rgba(255,107,0,0.14)]"
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-sm text-mist">{t.contact.message}</span>
                <textarea
                  required
                  name="message"
                  rows={5}
                  minLength={8}
                  className="w-full resize-y rounded-xl border border-line bg-snow px-3.5 py-2.5 text-ink outline-none transition focus:border-accent focus:shadow-[0_0_0_4px_rgba(255,107,0,0.14)]"
                />
              </label>
            </div>
            <button type="submit" className="btn-primary mt-6">
              {t.contact.send}
            </button>
            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
            {sent && <p className="mt-3 text-sm text-accent">{t.contact.sent}</p>}
          </form>
        </Reveal>
      </div>
    </section>
  )
}
