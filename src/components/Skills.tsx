import { useMemo, useState } from 'react'
import { SKILL_FILTERS, SKILL_ITEMS, type SkillCategory } from '../data/portfolio'
import { useLocale } from '../i18n/LocaleContext'
import { useInView } from '../hooks/useInView'
import { Reveal } from './Reveal'

const CATEGORY_TONE: Record<Exclude<SkillCategory, 'All'>, string> = {
  Languages: '#ff6b00',
  Frontend: '#1b4f8a',
  Backend: '#7c3aed',
  Databases: '#db2777',
  Cloud: '#0284c7',
  Security: '#b91c1c',
}

function SkillCard({ skill }: { skill: (typeof SKILL_ITEMS)[number] }) {
  const tone = CATEGORY_TONE[skill.category]
  const darkMarks = new Set(['#F7DF1E', '#61DAFB', '#FFCA28', '#88CE02'])
  const markColor = darkMarks.has(skill.color) ? '#0c1219' : '#fff'
  const { ref, inView } = useInView<HTMLElement>()

  return (
    <article ref={ref} className="skill-card group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div
            className="skill-card-mark"
            style={{ background: skill.color, color: markColor }}
            aria-hidden
          >
            {skill.mark}
          </div>
          <div className="min-w-0">
            <h3 className="truncate font-display text-base font-semibold text-ink sm:text-lg">
              {skill.name}
            </h3>
            <span className="skill-card-badge" style={{ color: tone, background: `${tone}18` }}>
              {skill.category}
            </span>
          </div>
        </div>
        <p className="shrink-0 text-sm font-semibold tabular-nums" style={{ color: tone }}>
          {skill.level}%
        </p>
      </div>

      <div
        className="skill-card-bar"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={skill.level}
        aria-label={`${skill.name} proficiency`}
      >
        <span
          style={{
            width: `${skill.level}%`,
            background: tone,
            transform: inView ? 'scaleX(1)' : 'scaleX(0)',
          }}
        />
      </div>
    </article>
  )
}

export function Skills() {
  const { t } = useLocale()
  const [active, setActive] = useState<SkillCategory>('All')
  const [query, setQuery] = useState('')

  const counts = useMemo(() => {
    const map = new Map<SkillCategory, number>()
    map.set('All', SKILL_ITEMS.length)
    for (const filter of SKILL_FILTERS) {
      if (filter === 'All') continue
      map.set(filter, SKILL_ITEMS.filter((skill) => skill.category === filter).length)
    }
    return map
  }, [])

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return SKILL_ITEMS.filter((skill) => {
      const matchesCategory = active === 'All' || skill.category === active
      const matchesQuery = !needle || skill.name.toLowerCase().includes(needle)
      return matchesCategory && matchesQuery
    })
  }, [active, query])

  return (
    <section id="skills" className="section-pad border-t border-line bg-ink-soft/50">
      <div className="container-page">
        <Reveal className="mb-10 max-w-3xl">
          <p className="eyebrow">{t.skills.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t.skills.title}
          </h2>
          <p className="mt-4 text-mist">{t.skills.subtitle}</p>
          <p className="mt-2 text-sm text-mist/80">{t.skills.levelGuide}</p>
        </Reveal>

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {SKILL_FILTERS.map((filter) => {
              const isActive = active === filter
              return (
                <button
                  key={filter}
                  type="button"
                  className={isActive ? 'filter-chip-active' : 'filter-chip'}
                  onClick={() => setActive(filter)}
                >
                  {filter}
                  <span className="ml-1 opacity-60">{counts.get(filter) ?? 0}</span>
                </button>
              )
            })}
          </div>
          <label className="block w-full max-w-xs">
            <span className="sr-only">{t.skills.search}</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.skills.search}
              className="w-full rounded-full border border-line bg-white px-4 py-2.5 text-sm text-ink outline-none transition focus:border-accent focus:shadow-[0_0_0_4px_rgba(255,107,0,0.14)]"
            />
          </label>
        </div>

        {visible.length === 0 ? (
          <p className="text-mist">{t.skills.empty}</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
