import { LANGUAGES, PROFILE } from '../data/portfolio'
import { useLocale } from '../i18n/LocaleContext'
import { Reveal } from './Reveal'
import { CanvasFx } from './CanvasFx'

export function About() {
  const { t } = useLocale()

  return (
    <section id="about" className="relative section-pad overflow-hidden border-t border-line bg-snow">
      <CanvasFx mode="particles" className="opacity-80" />
      <div className="container-page relative z-[1] grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">{t.about.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t.about.title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-mist">{t.about.lead}</p>

          <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-line bg-panel shadow-[0_20px_50px_rgba(12,18,25,0.08)]">
            <img
              src={PROFILE.avatar}
              alt={`${PROFILE.name} — professional portrait`}
              className="aspect-[4/5] w-full object-cover object-[center_15%]"
              width={720}
              height={900}
            />
          </div>

          <ul className="mt-6 flex flex-wrap gap-2">
            {LANGUAGES.map((lang) => (
              <li
                key={lang.name}
                className="rounded-full border border-line bg-white/80 px-3 py-1.5 text-sm text-ink backdrop-blur-sm"
              >
                {lang.name}
                <span className="text-mist"> · {lang.level}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delayMs={80} className="space-y-6">
          {t.about.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 32)} className="text-base leading-relaxed text-mist sm:text-lg">
              {paragraph}
            </p>
          ))}

          <div className="grid gap-4 pt-2 sm:grid-cols-3">
            {t.about.traits.map((trait) => (
              <div key={trait.label} className="border-t border-line pt-4">
                <p className="text-xs tracking-wide text-accent uppercase">{trait.label}</p>
                <p className="mt-2 font-display text-base font-semibold text-ink">{trait.value}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
