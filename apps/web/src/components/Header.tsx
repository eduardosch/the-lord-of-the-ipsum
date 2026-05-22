import { useTranslation } from 'react-i18next'

export function Header() {
  const { t } = useTranslation()
  return (
    <header className="text-center mb-16" style={{ color: 'var(--color-gold-light)' }}>
      <h1
        className="font-ringbearer tracking-tight text-5xl md:text-6xl"
        style={{ color: 'var(--color-gold-light)' }}
      >
        The Lord of the Ipsum
      </h1>
      <p
        className="mt-2 font-ringbearer text-sm tracking-widest"
        style={{ color: 'rgba(242,202,80,0.8)' }}
      >
        {t('header.tagline')}
      </p>
    </header>
  )
}
