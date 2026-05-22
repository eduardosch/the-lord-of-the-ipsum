import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { FormState } from '../App'
import type { Theme, Character, Tone } from '@lord-of-the-ipsum/core'
import { SliderField } from './SliderField'

interface Props {
  form: FormState
  onChange: (form: FormState) => void
  onGenerate: (overrides?: Partial<FormState>) => void
  isGenerating: boolean
}

type Length = 'short' | 'medium' | 'long'

const LENGTH_CONFIG: Record<Length, Pick<FormState, 'paragraphs' | 'paragraphCount' | 'sentencesPerParagraph' | 'sentences'>> = {
  short:  { paragraphs: false, sentences: 3,  paragraphCount: 1, sentencesPerParagraph: 2 },
  medium: { paragraphs: true,  sentences: 5,  paragraphCount: 2, sentencesPerParagraph: 3 },
  long:   { paragraphs: true,  sentences: 5,  paragraphCount: 4, sentencesPerParagraph: 4 },
}

const THEME_VALUES: Theme[] = ['epic', 'mordor', 'shire', 'battle', 'forest', 'wizard', 'humor', 'ancient']
const CHARACTER_VALUES: Character[] = ['general', 'gandalf', 'aragorn', 'frodo', 'sam', 'legolas', 'gimli', 'sauron']
const TONE_VALUES: Tone[] = ['cinematic', 'poetic', 'dark', 'heroic', 'funny']

const PRESET_OVERRIDES: { key: 'funny' | 'tolkien' | 'prophecy' | 'mordor'; overrides: Partial<FormState> }[] = [
  { key: 'funny',    overrides: { theme: 'humor',   tone: 'funny',    character: 'sam' } },
  { key: 'tolkien',  overrides: { theme: 'epic',    tone: 'poetic',   character: 'general' } },
  { key: 'prophecy', overrides: { theme: 'ancient', tone: 'cinematic', character: 'gandalf' } },
  { key: 'mordor',   overrides: { theme: 'mordor',  tone: 'dark',     character: 'sauron' } },
]

export function GeneratorForm({ form, onChange, onGenerate, isGenerating }: Props) {
  const { t } = useTranslation()
  const [length, setLength] = useState<Length>('medium')

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    onChange({ ...form, [key]: value })

  const applyLength = (l: Length) => {
    setLength(l)
    onChange({ ...form, ...LENGTH_CONFIG[l] })
  }

  return (
    <div className="generator-form">
      <h2 className="generator-form__title">{t('form.title')}</h2>

      <div className="generator-form__body">

        {/* Preset buttons */}
        <div className="generator-form__presets">
          {PRESET_OVERRIDES.map((p) => (
            <button
              key={p.key}
              type="button"
              className="generator-form__preset-btn"
              onClick={() => { onChange({ ...form, ...p.overrides }); onGenerate(p.overrides) }}
            >
              {t(`form.presets.${p.key}`)}
            </button>
          ))}
        </div>

        {/* Desktop-only configs */}
        <div className="generator-form__configs">
          <div className="separator generator-form__divider">
            {t('form.orCustomize')}
          </div>

          <div className="generator-form__selects">
            <div className="generator-form__select-group">
              <label className="generator-form__label">{t('form.theme')}</label>
              <select value={form.theme} onChange={(e) => set('theme', e.target.value as Theme)}>
                {THEME_VALUES.map((v) => <option key={v} value={v}>{t(`themes.${v}`)}</option>)}
              </select>
            </div>
            <div className="generator-form__select-group">
              <label className="generator-form__label">{t('form.characterVoice')}</label>
              <select value={form.character} onChange={(e) => set('character', e.target.value as Character)}>
                {CHARACTER_VALUES.map((v) => <option key={v} value={v}>{t(`characters.${v}`)}</option>)}
              </select>
            </div>
            <div className="generator-form__select-group">
              <label className="generator-form__label">{t('form.tone')}</label>
              <select value={form.tone} onChange={(e) => set('tone', e.target.value as Tone)}>
                {TONE_VALUES.map((v) => <option key={v} value={v}>{t(`tones.${v}`)}</option>)}
              </select>
            </div>
          </div>

          <div className="generator-form__paragraph-controls">
            <div className="generator-form__toggle-row">
              <button
                type="button"
                role="switch"
                aria-checked={form.paragraphs}
                className={`generator-form__toggle${form.paragraphs ? ' generator-form__toggle--on' : ''}`}
                onClick={() => set('paragraphs', !form.paragraphs)}
              >
                <span className={`generator-form__toggle-thumb${form.paragraphs ? ' generator-form__toggle-thumb--on' : ''}`} />
              </button>
              <span className="generator-form__toggle-label">{t('form.paragraphMode')}</span>
            </div>

            {form.paragraphs ? (
              <>
                <SliderField label={t('form.paragraphs')} value={form.paragraphCount} min={1} max={8}
                  onChange={(v) => set('paragraphCount', v)} />
                <SliderField label={t('form.sentencesPerParagraph')} value={form.sentencesPerParagraph} min={1} max={8}
                  onChange={(v) => set('sentencesPerParagraph', v)} />
              </>
            ) : (
              <SliderField label={t('form.sentences')} value={form.sentences} min={1} max={15}
                onChange={(v) => set('sentences', v)} />
            )}
          </div>
        </div>

        {/* Generate button */}
        <motion.button
          type="button"
          className="generator-form__generate-btn"
          onClick={() => onGenerate()}
          disabled={isGenerating}
          whileTap={{ scale: 0.97 }}
        >
          {isGenerating ? t('form.forging') : t('form.generate')}
        </motion.button>
      </div>
    </div>
  )
}
