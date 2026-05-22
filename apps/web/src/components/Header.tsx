import { useTranslation } from 'react-i18next'

export function Header() {
  const { t } = useTranslation()
  return (
    <header className="header">
      <h1 className="header__title">The Lord of the Ipsum</h1>
      <p className="header__tagline">{t('header.tagline')}</p>
    </header>
  )
}
