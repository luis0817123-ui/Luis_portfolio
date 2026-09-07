import { PROFILE } from '../data/portfolio'
import { useLocale } from '../i18n/LocaleContext'
import { MagneticButton } from './MotionFX'
import { CanvasFx } from './CanvasFx'
import { assetUrl } from '../data/portfolio'

export function Hero() {
  const { t } = useLocale()

  return (
    <section id="top" className="hero relative isolate min-h-[100svh] overflow-hidden">
      <div className="hero-bg" aria-hidden>
        <video
          className="hero-bg-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={assetUrl('/video/hero-bg.mp4')} type="video/mp4" />
        </video>
        <div className="hero-bg-overlay" />
        <div className="hero-orbs">
          <span className="orb orb-1" />
          <span className="orb orb-2" />
          <span className="orb orb-3" />
        </div>
        <CanvasFx mode="ember" />
      </div>

      <div className="container-page relative z-[1] flex min-h-[100svh] flex-col justify-center pb-16 pt-28 lg:pb-20 lg:pt-24">
        <div className="grid items-end gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="animate-rise text-xs font-semibold tracking-[0.22em] text-accent uppercase">
              {t.hero.location}
            </p>
            <h1 className="animate-rise-delay-1 mt-5 font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-balance text-white sm:text-5xl lg:text-[4rem]">
              {PROFILE.name}
            </h1>
            <p className="animate-rise-delay-1 mt-4 text-lg font-medium tracking-wide text-white/85 sm:text-xl">
              {t.hero.title}
            </p>
            <p className="animate-rise-delay-2 mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
              {t.hero.headline}
            </p>

            <div className="animate-rise-delay-2 mt-8 flex flex-wrap gap-3">
              <MagneticButton href="#projects" className="btn-primary">
                {t.hero.ctaProjects}
              </MagneticButton>
              <MagneticButton href="#contact" className="btn-ghost-light">
                {t.hero.ctaContact}
              </MagneticButton>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-white/15 pt-8">
              {t.hero.highlights.map((item) => (
                <div key={item.label}>
                  <dt className="text-[0.7rem] tracking-wide text-white/45 uppercase">{item.label}</dt>
                  <dd className="mt-1 font-display text-base font-semibold text-white sm:text-lg">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-sm animate-float">
            <div
              className="pointer-events-none absolute -inset-4 rounded-full bg-gradient-to-br from-accent/35 via-transparent to-warm/25 blur-sm"
              aria-hidden
            />
            <div className="absolute inset-1 animate-orbit rounded-full border border-dashed border-white/25" />
            <div className="absolute inset-3 rounded-full border border-accent/35 animate-pulse-ring" />

            <div className="relative mx-auto aspect-square overflow-hidden rounded-full border-[5px] border-white/90 shadow-[0_28px_70px_rgba(0,0,0,0.35)]">
              <img
                src={PROFILE.avatar}
                alt={`${PROFILE.name} — professional portrait`}
                className="h-full w-full object-cover object-[center_18%] transition duration-700 hover:scale-105"
                width={720}
                height={720}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
