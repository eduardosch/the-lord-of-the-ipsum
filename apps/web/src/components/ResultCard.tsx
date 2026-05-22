import { useTranslation } from 'react-i18next'
import type { GenerateResult } from '@lord-of-the-ipsum/core'

interface Props {
  result: GenerateResult | null
  copied: boolean
  onCopy: () => void
  onExportTxt: () => void
  onExportJson: () => void
}

export function ResultCard({ result, copied, onCopy, onExportTxt, onExportJson }: Props) {
  const { t } = useTranslation()
  return (
    <div className="mt-6 sm:mt-20 w-full max-w-3xl mx-auto">
      {/* Text card — always visible, fixed 500px, scrollable */}
      <div
        className="shadow-2xl relative"
        style={{
          background: 'rgba(50, 101, 132, 0.9)',
          backdropFilter: 'blur(8px)',
          borderRadius: '1.5rem',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {/* Badges row — only shown when there's a result */}
        {result && (
          <div className="flex flex-wrap gap-2 px-8 pt-6 pb-0">
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2 py-1"
              style={{
                borderRadius: '9999px',
                background: 'rgba(242,202,80,0.15)',
                border: '1px solid rgba(242,202,80,0.3)',
                color: 'var(--color-gold-light)',
              }}
            >
              Seed: {result.seed}
            </span>
            <span
              className="text-[10px] font-bold uppercase tracking-widest px-2 py-1"
              style={{
                borderRadius: '9999px',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(208,197,175,0.8)',
              }}
            >
              {result.options.theme} · {result.options.character} · {result.options.tone}
            </span>
          </div>
        )}

        {/* Scrollable text area */}
        <div
          className="overflow-y-auto px-6 sm:px-8 py-6 space-y-4 leading-relaxed"
          style={{ height: 'clamp(260px, 50vh, 500px)' }}
        >
          {result ? (
            result.paragraphs.map((para, i) => (
              <p key={i} className="font-body text-base leading-relaxed" style={{ color: '#fff' }}>
                {para}
              </p>
            ))
          ) : (
            <p
              className="font-body text-base italic"
              style={{ color: 'rgba(255,255,255,0.3)' }}
            >
              {t('result.empty')}
            </p>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <ActionButton primary onClick={onCopy} disabled={!result}>
          {copied ? t('result.copied') : t('result.copy')}
        </ActionButton>
        <ActionButton onClick={onExportJson} disabled={!result}>{t('result.exportJson')}</ActionButton>
        <ActionButton onClick={onExportTxt} disabled={!result}>{t('result.exportTxt')}</ActionButton>
      </div>

      {/* Decorative shadow ellipse — desktop only */}
      <div className="hidden sm:flex justify-center mt-2">
        <div className="w-60 h-4 rounded-full" style={{ background: 'rgba(0,0,0,0.4)' }} />
      </div>
    </div>
  )
}

function ActionButton({
  children, onClick, primary = false, disabled = false,
}: {
  children: React.ReactNode
  onClick: () => void
  primary?: boolean
  disabled?: boolean
}) {
  if (primary) {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className="w-full font-bold py-4 px-8 text-lg uppercase tracking-wide transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          borderRadius: '9999px',
          background: 'var(--color-gold-light)',
          color: '#0f1e3c',
          borderBottom: '4px solid rgba(0,0,0,0.2)',
          boxShadow: '0 4px 16px rgba(242,202,80,0.25)',
        }}
        onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = '#facc15' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-gold-light)' }}
      >
        {children}
      </button>
    )
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full font-bold py-4 px-8 text-lg uppercase tracking-wide transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
      style={{
        borderRadius: '9999px',
        background: 'rgba(255,255,255,0.1)',
        color: '#fff',
        border: '1px solid rgba(255,255,255,0.2)',
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = 'rgba(255,255,255,0.2)' }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
    >
      {children}
    </button>
  )
}
