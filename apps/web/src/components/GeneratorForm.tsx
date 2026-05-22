import { motion } from 'framer-motion'
import type { FormState } from '../App'
import type { Theme, Character, Tone, Formatting } from '@lord-of-the-ipsum/core'

interface Props {
  form: FormState
  onChange: (form: FormState) => void
  onGenerate: (overrides?: Partial<FormState>) => void
  isGenerating: boolean
}

const THEMES: { value: Theme; label: string }[] = [
  { value: 'epic', label: 'Epic' },
  { value: 'mordor', label: 'Mordor' },
  { value: 'shire', label: 'The Shire' },
  { value: 'battle', label: 'Battle' },
  { value: 'forest', label: 'Forest' },
  { value: 'wizard', label: 'Wizard' },
  { value: 'humor', label: 'Humor' },
  { value: 'ancient', label: 'Ancient' },
]

const CHARACTERS: { value: Character; label: string }[] = [
  { value: 'general', label: 'General' },
  { value: 'gandalf', label: 'Gandalf' },
  { value: 'aragorn', label: 'Aragorn' },
  { value: 'frodo', label: 'Frodo' },
  { value: 'sam', label: 'Samwise' },
  { value: 'legolas', label: 'Legolas' },
  { value: 'gimli', label: 'Gimli' },
  { value: 'sauron', label: 'Sauron' },
]

const TONES: { value: Tone; label: string }[] = [
  { value: 'cinematic', label: 'Cinematic' },
  { value: 'poetic', label: 'Poetic' },
  { value: 'dark', label: 'Dark' },
  { value: 'heroic', label: 'Heroic' },
  { value: 'funny', label: 'Funny' },
]


const FORMATTINGS: { value: Formatting; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'uppercase', label: 'Uppercase' },
  { value: 'quotes', label: 'Quotes' },
  { value: 'markdown', label: 'Markdown' },
]

const PRESETS: { label: string; overrides: Partial<FormState> }[] = [
  { label: 'Generate Funny', overrides: { theme: 'humor', tone: 'funny', character: 'sam' } },
  { label: 'Like Tolkien',   overrides: { theme: 'epic', tone: 'poetic', character: 'general' } },
  { label: 'Ancient Prophecy', overrides: { theme: 'ancient', tone: 'cinematic', character: 'gandalf' } },
  { label: 'Like Mordor',    overrides: { theme: 'mordor', tone: 'dark', character: 'sauron' } },
]

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--color-gold-light)' }}>
      {children}
    </label>
  )
}

export function GeneratorForm({ form, onChange, onGenerate, isGenerating }: Props) {
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
      <h2 className="text-3xl md:text-4xl mb-6 leading-tight uppercase font-headline font-bold" style={{ color: '#fff' }}>
        Customize Your Quest
      </h2>

      <div className="space-y-8 text-left">
        {/* Selectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Theme</Label>
            <select value={form.theme} onChange={(e) => set('theme', e.target.value as Theme)}>
              {THEMES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          <div>
            <Label>Character Voice</Label>
            <select value={form.character} onChange={(e) => set('character', e.target.value as Character)}>
              {CHARACTERS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>

          <div>
            <Label>Tone</Label>
            <select value={form.tone} onChange={(e) => set('tone', e.target.value as Tone)}>
              {TONES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>

          <div>
            <Label>Formatting</Label>
            <select value={form.formatting} onChange={(e) => set('formatting', e.target.value as Formatting)}>
              {FORMATTINGS.map((f) => <option key={f.value} value={f.value}>{f.label}</option>)}
            </select>
          </div>

          <div>
            <Label>Seed (optional)</Label>
            <input
              type="text"
              placeholder="e.g. mordor, shire, barad-dur…"
              value={form.seed}
              onChange={(e) => set('seed', e.target.value)}
            />
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
              Paragraph Mode
            </span>
          </div>

          {form.paragraphs ? (
            <>
              <SliderField label="Paragraphs" value={form.paragraphCount} min={1} max={8}
                onChange={(v) => set('paragraphCount', v)} />
              <SliderField label="Sentences per Paragraph" value={form.sentencesPerParagraph} min={1} max={8}
                onChange={(v) => set('sentencesPerParagraph', v)} />
            </>
          ) : (
            <SliderField label="Sentences" value={form.sentences} min={1} max={15}
              onChange={(v) => set('sentences', v)} />
          )}
        </div>

        {/* Preset buttons */}
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          {PRESETS.map((p) => (
            <button
              key={p.label}
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
              {p.label}
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
            {isGenerating ? 'Forging…' : 'Generate'}
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
