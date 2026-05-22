import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { generateLorem } from '@lord-of-the-ipsum/core'
import type { Theme, Character, Tone, Locale, Formatting, GenerateResult } from '@lord-of-the-ipsum/core'
import { Header } from './components/Header'
import { GeneratorForm } from './components/GeneratorForm'
import { ResultCard } from './components/ResultCard'
import { Footer } from './components/Footer'
import { LanguagePicker } from './components/LanguagePicker'

export interface FormState {
  locale: Locale
  theme: Theme
  character: Character
  tone: Tone
  formatting: Formatting
  paragraphs: boolean
  paragraphCount: number
  sentencesPerParagraph: number
  sentences: number
  seed: string
}

const DEFAULT_FORM: FormState = {
  locale: 'pt-br',
  theme: 'epic',
  character: 'general',
  tone: 'cinematic',
  formatting: 'none',
  paragraphs: true,
  paragraphCount: 3,
  sentencesPerParagraph: 3,
  sentences: 5,
  seed: '',
}

// Floating character portraits shown around the form
const FLOAT_CHARS = {
  legolas: '/images/legolas.png',
  frodo:   '/images/frodo.png',
  gandalf: '/images/gandalf.png',
  gimli:   '/images/orc.png', // placeholder until a Gimli image is added
}

export default function App() {
  const { i18n } = useTranslation()
  const [form, setForm] = useState<FormState>(DEFAULT_FORM)
  const [result, setResult] = useState<GenerateResult | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleGenerate = useCallback((overrides?: Partial<FormState>) => {
    setIsGenerating(true)
    const opts = { ...form, ...overrides }
    setTimeout(() => {
      const res = generateLorem({
        locale: opts.locale,
        theme: opts.theme,
        character: opts.character,
        tone: opts.tone,
        formatting: opts.formatting,
        paragraphs: opts.paragraphs,
        paragraphCount: opts.paragraphCount,
        sentencesPerParagraph: opts.sentencesPerParagraph,
        sentences: opts.sentences,
        seed: opts.seed || undefined,
      })
      setResult(res)
      setIsGenerating(false)
    }, 300)
  }, [form])

  const handleCopy = useCallback(() => {
    if (!result) return
    navigator.clipboard.writeText(result.text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [result])

  const handleExportTxt = useCallback(() => {
    if (!result) return
    const blob = new Blob([result.text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `lord-of-the-ipsum-${result.seed}.txt`; a.click()
    URL.revokeObjectURL(url)
  }, [result])

  const handleExportJson = useCallback(() => {
    if (!result) return
    const data = { seed: result.seed, options: result.options, paragraphs: result.paragraphs, sentences: result.sentences }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `lord-of-the-ipsum-${result.seed}.json`; a.click()
    URL.revokeObjectURL(url)
  }, [result])

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden" style={{ background: '#0f1e3c' }}>
      <LanguagePicker locale={form.locale} onChange={(locale) => { setForm(f => ({ ...f, locale })); i18n.changeLanguage(locale) }} />
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-12 flex flex-col items-center relative z-10">
        <Header />

        {/* Generator section with river path + floating characters */}
        <section className="relative w-full flex flex-col items-center mb-20">
          {/* River path decorative background */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-[120%] opacity-80 -z-10"
            style={{
              top: '5rem',
              height: '1500px',
              background: '#264d72',
              borderRadius: '50% / 10%',
              transform: 'translateX(-50%) rotate(-3deg)',
            }}
          />

          {/* Top-right: Legolas */}
          <div
            className="absolute -right-10 top-0 w-32 md:w-48 hidden md:block transition-transform duration-300 hover:scale-110"
            style={{ filter: 'drop-shadow(0 10px 12px rgba(0,0,0,0.4))' }}
          >
            <img alt="Legolas" src={FLOAT_CHARS.legolas}
              className="rounded-full w-full aspect-square object-cover"
              style={{ border: '4px solid var(--color-gold-light)' }} />
          </div>

          {/* Top-left: Frodo */}
          <div
            className="absolute -left-10 top-20 w-32 md:w-44 hidden md:block transition-transform duration-300 hover:scale-110"
            style={{ filter: 'drop-shadow(0 10px 12px rgba(0,0,0,0.4))' }}
          >
            <img alt="Frodo" src={FLOAT_CHARS.frodo}
              className="rounded-full w-full aspect-square object-cover"
              style={{ border: '4px solid var(--color-gold-light)' }} />
          </div>

          {/* Form */}
          <GeneratorForm
            form={form}
            onChange={setForm}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />

          {/* Middle-right: Gandalf */}
          <div
            className="absolute -right-20 w-40 md:w-56 hidden md:block transition-transform duration-300 hover:scale-110"
            style={{ top: '700px', filter: 'drop-shadow(0 10px 12px rgba(0,0,0,0.4))' }}
          >
            <img alt="Gandalf" src={FLOAT_CHARS.gandalf}
              className="rounded-full w-full aspect-square object-cover"
              style={{ border: '4px solid var(--color-gold-light)' }} />
          </div>

          {/* Middle-left: Gimli */}
          <div
            className="absolute -left-16 w-24 md:w-32 hidden lg:block transition-transform duration-300 hover:scale-110"
            style={{ top: '800px', filter: 'drop-shadow(0 10px 12px rgba(0,0,0,0.4))' }}
          >
            <img alt="Gimli" src={FLOAT_CHARS.gimli}
              className="rounded-full w-full aspect-square object-cover"
              style={{ border: '4px solid var(--color-gold-light)' }} />
          </div>

          {/* Result card — always visible */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <ResultCard
              result={result}
              copied={copied}
              onCopy={handleCopy}
              onExportTxt={handleExportTxt}
              onExportJson={handleExportJson}
            />
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
