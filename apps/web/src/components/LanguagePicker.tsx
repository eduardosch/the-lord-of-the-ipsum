import type { Locale } from '@lord-of-the-ipsum/core'

interface Props {
  locale: Locale
  onChange: (locale: Locale) => void
}

const FLAGS: { locale: Locale; src: string; label: string }[] = [
  { locale: 'pt-br', src: '/images/flags/brazil.png',  label: 'Português (BR)' },
  { locale: 'de',    src: '/images/flags/germany.png', label: 'Deutsch' },
  { locale: 'es',    src: '/images/flags/spain.png',   label: 'Español' },
  { locale: 'en',    src: '/images/flags/usa.png',     label: 'English' },
]

export function LanguagePicker({ locale, onChange }: Props) {
  return (
    <div className="language-picker">
      {FLAGS.map((flag, i) => (
        <div key={flag.locale} className="language-picker__item">
          {i > 0 && <span className="language-picker__divider">|</span>}
          <button
            type="button"
            onClick={() => onChange(flag.locale)}
            title={flag.label}
            className={`language-picker__btn${locale === flag.locale ? ' language-picker__btn--active' : ''}`}
          >
            <img src={flag.src} alt={flag.label} className="language-picker__flag" />
          </button>
        </div>
      ))}
    </div>
  )
}
