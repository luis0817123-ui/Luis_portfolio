import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Projects } from './components/Projects'
import { Work } from './components/Work'
import { Education } from './components/Education'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Seo } from './components/Seo'
import { AmbientLayer } from './components/AmbientLayer'
import { LocaleProvider } from './i18n/LocaleContext'
import { useSmoothScroll } from './hooks/useSmoothScroll'

function AppShell() {
  useSmoothScroll()

  return (
    <div className="relative min-h-svh overflow-x-hidden bg-snow">
      <Seo />
      <AmbientLayer />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Work />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <LocaleProvider>
      <AppShell />
    </LocaleProvider>
  )
}
