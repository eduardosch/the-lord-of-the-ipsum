import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { FormState } from '../App'
import type { Theme, Character, Tone, Formatting } from '@lord-of-the-ipsum/core'

interface Props {
  form: FormState
  onChange: (form: FormState) => void
  onGenerate: (overrides?: Partial<FormState>) => void
  isGenerating: boolean
}

const THEME_VALUES: Theme[] = ['epic', 'mordor', 'shire', 'battle', 'forest', 'wizard', 'humor', 'ancient']
const CHARACTER_VALUES: Character[] = ['general', 'gandalf', 'aragorn', 'frodo', 'sam', 'legolas', 'gimli', 'sauron']
const TONE_VALUES: Tone[] = ['cinematic', 'poetic', 'dark', 'heroic', 'funny']
const FORMATTING_VALUES: Formatting[] = ['none', 'uppercase', 'quotes', 'markdown']

const PRESET_OVERRIDES: { key: 'funny' | 'tolkien' | 'prophecy' | 'mordor'; overrides: Partial<FormState> }[] = [
  { key: 'funny',    overrides: { theme: 'humor',   tone: 'funny',    character: 'sam' } },
  { key: 'tolkien',  overrides: { theme: 'epic',    tone: 'poetic',   character: 'general' } },
  { key: 'prophecy', overrides: { theme: 'ancient', tone: 'cinematic', character: 'gandalf' } },
  { key: 'mordor',   overrides: { theme: 'mordor',  tone: 'dark',     character: 'sauron' } },
]

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-gold-light)' }}>
      {children}
    </label>
  )
}

export function GeneratorForm({ form, onChange, onGenerate, isGenerating }: Props) {
  const { t } = useTranslation()
  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    onChange({ ...form, [key]: value })

  return (
    <div
      className="w-full max-w-3xl mx-auto text-center relative z-20 p-8 md:p-12"
      style={{
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(4px)',
        borderRadius: '1.5rem',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <h2 className="text-xl md:text-2xl mb-6 leading-tight uppercase font-headline font-bold" style={{ color: '#fff' }}>
        {t('form.title')}
      </h2>

      <div className="space-y-8 text-left">
        {/* Selectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>{t('form.theme')}</Label>
            <select value={form.theme} onChange={(e) => set('theme', e.target.value as Theme)}>
              {THEME_VALUES.map((v) => <option key={v} value={v}>{t(`themes.${v}`)}</option>)}
            </select>
          </div>

          <div>
            <Label>{t('form.characterVoice')}</Label>
            <select value={form.character} onChange={(e) => set('character', e.target.value as Character)}>
              {CHARACTER_VALUES.map((v) => <option key={v} value={v}>{t(`characters.${v}`)}</option>)}
            </select>
          </div>

          <div>
            <Label>{t('form.tone')}</Label>
            <select value={form.tone} onChange={(e) => set('tone', e.target.value as Tone)}>
              {TONE_VALUES.map((v) => <option key={v} value={v}>{t(`tones.${v}`)}</option>)}
            </select>
          </div>

          <div>
            <Label>{t('form.formatting')}</Label>
            <select value={form.formatting} onChange={(e) => set('formatting', e.target.value as Formatting)}>
              {FORMATTING_VALUES.map((v) => <option key={v} value={v}>{t(`formattings.${v}`)}</option>)}
            </select>
          </div>

        </div>

        {/* Sliders */}
        <div className="space-y-6">
          {/* Paragraph mode toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              role="switch"
              aria-checked={form.paragraphs}
              onClick={() => set('paragraphs', !form.paragraphs)}
              className="relative w-10 h-5 rounded-full transition-colors flex-shrink-0"
              style={{ background: form.paragraphs ? 'var(--color-gold)' : 'rgba(169,169,169,0.3)' }}
            >
              <span
                className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform"
                style={{ transform: form.paragraphs ? 'translateX(20px)' : 'translateX(0)' }}
              />
            </button>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-gold-light)' }}>
              {t('form.paragraphMode')}
            </span>
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

        {/* Preset buttons */}
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          {PRESET_OVERRIDES.map((p) => (
            <button
              key={p.key}
              type="button"
              onClick={() => { onChange({ ...form, ...p.overrides }); onGenerate(p.overrides) }}
              className="px-4 py-2 text-[10px] font-bold uppercase transition-colors"
              style={{
                borderRadius: '9999px',
                border: '1px solid rgba(242,202,80,0.3)',
                color: 'var(--color-gold-light)',
                background: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-gold-light)'
                e.currentTarget.style.color = '#0f1e3c'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'var(--color-gold-light)'
              }}
            >
              {t(`form.presets.${p.key}`)}
            </button>
          ))}
        </div>

        {/* Generate button */}
        <div className="flex justify-center pt-2">
          <motion.button
            type="button"
            onClick={() => onGenerate()}
            disabled={isGenerating}
            whileTap={{ scale: 0.95 }}
            className="font-bold py-4 px-16 text-xl uppercase disabled:opacity-60 transition-colors"
            style={{
              borderRadius: '9999px',
              background: 'var(--color-gold-light)',
              color: '#0f1e3c',
              borderBottom: '4px solid rgba(0,0,0,0.2)',
              boxShadow: '0 4px 24px rgba(242,202,80,0.3)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#facc15' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--color-gold-light)' }}
          >
            {isGenerating ? t('form.forging') : t('form.generate')}
          </motion.button>
        </div>
      </div>
    </div>
  )
}

function SliderField({ label, value, min, max, onChange }: {
  label: string; value: number; min: number; max: number; onChange: (v: number) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--color-gold-light)' }}>
          {label}
        </span>
        <span className="font-bold text-white">{value}</span>
      </div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  )
}
