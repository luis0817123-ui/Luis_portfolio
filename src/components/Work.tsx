import { EXPERIENCE } from '../data/portfolio'
import { useLocale } from '../i18n/LocaleContext'
import { Reveal } from './Reveal'

export function Work() {
  const { t } = useLocale()

  return (
    <section id="work" className="section-pad border-t border-line bg-ink-soft/60">
      <div className="container-page">
        <Reveal className="mb-12 max-w-2xl">
          <p className="eyebrow">{t.work.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t.work.title}
          </h2>
        </Reveal>

        <ol className="relative space-y-8 border-l border-line pl-6 sm:pl-8">
          {EXPERIENCE.map((job, index) => (
            <li key={job.id} className="relative">
              <span className="animate-dot absolute -left-[1.9rem] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-snow sm:-left-[2.4rem]" />
              <Reveal delayMs={index * 70}>
                <div className="surface surface-active rounded-2xl p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl font-semibold text-ink">{job.title}</h3>
                      <p className="mt-1 text-accent">
                        {job.company}
                        <span className="text-mist"> · {job.location}</span>
                      </p>
                    </div>
                    <p className="text-sm text-mist">{job.period}</p>
                  </div>
                  <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-mist sm:text-base">
                    {job.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {job.tech.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-line bg-ink-soft/80 px-2.5 py-1 text-xs text-mist"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
