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
    <div className="result-card">
      <div className="result-card__inner">
        {result && (
          <div className="result-card__badges">
            <span className="result-card__badge result-card__badge--seed">Seed: {result.seed}</span>
            <span className="result-card__badge result-card__badge--meta">
              {result.options.theme} · {result.options.character} · {result.options.tone}
            </span>
          </div>
        )}

        <div className="result-card__text">
          {result ? (
            result.paragraphs.map((para, i) => (
              <p key={i} className="result-card__paragraph">{para}</p>
            ))
          ) : (
            <p className="result-card__empty">{t('result.empty')}</p>
          )}
        </div>
      </div>

      <div className="result-card__actions">
        <button
          className="result-card__btn result-card__btn--primary"
          onClick={onCopy}
          disabled={!result}
        >
          {copied ? t('result.copied') : t('result.copy')}
        </button>
        <button
          className="result-card__btn result-card__btn--secondary"
          onClick={onExportJson}
          disabled={!result}
        >
          {t('result.exportJson')}
        </button>
        <button
          className="result-card__btn result-card__btn--secondary"
          onClick={onExportTxt}
          disabled={!result}
        >
          {t('result.exportTxt')}
        </button>
      </div>

      <div className="result-card__shadow">
        <div className="result-card__shadow-ellipse" />
      </div>
    </div>
  )
}
