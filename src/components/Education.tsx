import { EDUCATION } from '../data/portfolio'
import { useLocale } from '../i18n/LocaleContext'
import { Reveal } from './Reveal'

export function Education() {
  const { t } = useLocale()

  return (
    <section id="education" className="section-pad border-t border-line bg-snow">
      <div className="container-page">
        <Reveal className="mb-10 max-w-2xl">
          <p className="eyebrow">{t.education.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t.education.title}
          </h2>
        </Reveal>

        <div className="grid gap-5">
          {EDUCATION.map((item, index) => (
            <Reveal key={item.id} delayMs={index * 80}>
              <article className="surface surface-active rounded-2xl p-6 sm:p-8">
                <p className="text-sm text-mist">{item.period}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-ink">{item.degree}</h3>
                <p className="mt-1 text-accent">{item.school}</p>
                <p className="mt-4 max-w-3xl text-mist">{item.note}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
