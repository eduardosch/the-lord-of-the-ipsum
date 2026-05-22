import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { generateLorem } from '@lord-of-the-ipsum/core'
import type { Theme, Character, Tone, Locale, Formatting, GenerateResult } from '@lord-of-the-ipsum/core'
import { downloadFile } from './helpers/download'
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

const FLOAT_CHARS = {
  legolas: '/images/legolas.png',
  frodo:   '/images/frodo.png',
  gandalf: '/images/gandalf.png',
  gimli:   '/images/orc.png',
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
    downloadFile(result.text, `lord-of-the-ipsum-${result.seed}.txt`, 'text/plain')
  }, [result])

  const handleExportJson = useCallback(() => {
    if (!result) return
    const data = { seed: result.seed, options: result.options, paragraphs: result.paragraphs, sentences: result.sentences }
    downloadFile(JSON.stringify(data, null, 2), `lord-of-the-ipsum-${result.seed}.json`, 'application/json')
  }, [result])

  return (
    <div className="app">
      <LanguagePicker
        locale={form.locale}
        onChange={(locale) => { setForm(f => ({ ...f, locale })); i18n.changeLanguage(locale) }}
      />
      <main className="app__main">
        <Header />

        <section className="app__section">
          <div className="app__river-path" />

          <div className="app__float app__float--legolas">
            <img alt="Legolas" src={FLOAT_CHARS.legolas} />
          </div>
          <div className="app__float app__float--frodo">
            <img alt="Frodo" src={FLOAT_CHARS.frodo} />
          </div>

          <GeneratorForm
            form={form}
            onChange={setForm}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
          />

          <div className="app__float app__float--gandalf">
            <img alt="Gandalf" src={FLOAT_CHARS.gandalf} />
          </div>
          <div className="app__float app__float--gimli">
            <img alt="Gimli" src={FLOAT_CHARS.gimli} />
          </div>

          {/* Desktop: always visible with placeholder */}
          <div className="app__result-desktop">
            <motion.div
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
          </div>

          {/* Mobile: only shown after first generate */}
          <div className="app__result-mobile">
            <AnimatePresence>
              {result && (
                <motion.div
                  key="mobile-result"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                >
                  <ResultCard
                    result={result}
                    copied={copied}
                    onCopy={handleCopy}
                    onExportTxt={handleExportTxt}
                    onExportJson={handleExportJson}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
