import type { Locale } from '@lord-of-the-ipsum/core'

interface Props {
  locale: Locale
  onChange: (locale: Locale) => void
}

const FLAGS: { locale: Locale; src: string; label: string }[] = [
  { locale: 'pt-br', src: '/images/flags/brazil.png',   label: 'Português (BR)' },
  { locale: 'de',    src: '/images/flags/germany.png',  label: 'Deutsch' },
  { locale: 'es',    src: '/images/flags/spain.png',    label: 'Español' },
  { locale: 'en',    src: '/images/flags/usa.png',      label: 'English' },
]

export function LanguagePicker({ locale, onChange }: Props) {
  return (
    <div
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: '0.4rem 0.9rem',
        background: 'rgba(38, 77, 114, 0.75)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '9999px',
        border: '1px solid rgba(212, 175, 55, 0.25)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.35)',
      }}
    >
      {FLAGS.map((flag, i) => (
        <div key={flag.locale} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          {i > 0 && (
            <span
              style={{
                color: 'rgba(212, 175, 55, 0.55)',
                fontSize: '0.7rem',
                lineHeight: 1,
                userSelect: 'none',
                fontWeight: 300,
              }}
            >
              |
            </span>
          )}
          <button
            type="button"
            onClick={() => onChange(flag.locale)}
            title={flag.label}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              opacity: locale === flag.locale ? 1 : 0.45,
              transform: locale === flag.locale ? 'scale(1.18)' : 'scale(1)',
              transition: 'opacity 0.2s ease, transform 0.2s ease',
              outline: 'none',
              borderRadius: '3px',
            }}
            onMouseEnter={(e) => {
              if (locale !== flag.locale) {
                e.currentTarget.style.opacity = '0.75'
                e.currentTarget.style.transform = 'scale(1.08)'
              }
            }}
            onMouseLeave={(e) => {
              if (locale !== flag.locale) {
                e.currentTarget.style.opacity = '0.45'
                e.currentTarget.style.transform = 'scale(1)'
              }
            }}
          >
            <img
              src={flag.src}
              alt={flag.label}
              style={{
                width: '1.75rem',
                height: '1.2rem',
                objectFit: 'cover',
                borderRadius: '3px',
                display: 'block',
                boxShadow: locale === flag.locale ? '0 0 6px rgba(212,175,55,0.5)' : 'none',
              }}
            />
          </button>
        </div>
      ))}
    </div>
  )
}
