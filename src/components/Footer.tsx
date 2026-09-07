import { useLocale } from '../i18n/LocaleContext'

export function Footer() {
  const { t } = useLocale()

  return (
    <footer className="border-t border-line bg-snow py-10">
      <div className="container-page flex justify-center">
        <p className="text-sm text-mist">{t.footer.designed}</p>
      </div>
    </footer>
  )
}
