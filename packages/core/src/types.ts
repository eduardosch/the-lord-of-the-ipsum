export type Locale = 'en' | 'pt-br' | 'de' | 'es'

export type Theme =
  | 'epic'
  | 'mordor'
  | 'shire'
  | 'battle'
  | 'forest'
  | 'wizard'
  | 'humor'
  | 'ancient'

export type Character =
  | 'general'
  | 'gandalf'
  | 'aragorn'
  | 'frodo'
  | 'sam'
  | 'legolas'
  | 'gimli'
  | 'sauron'

export type Tone =
  | 'cinematic'
  | 'poetic'
  | 'dark'
  | 'heroic'
  | 'funny'

export type Formatting =
  | 'none'
  | 'uppercase'
  | 'quotes'
  | 'markdown'

export interface GenerateOptions {
  /** Language of the output. Default: 'en' */
  locale?: Locale
  /** Thematic flavour of the text. Default: 'epic' */
  theme?: Theme
  /** Character voice to prioritise. Default: 'general' */
  character?: Character
  /** Tone modifier applied to phrase selection. Default: 'cinematic' */
  tone?: Tone
  /** Number of sentences to generate. Default: 5 */
  sentences?: number
  /** Wrap sentences into paragraphs. Default: false */
  paragraphs?: boolean
  /** Number of paragraphs (used when paragraphs: true). Default: 1 */
  paragraphCount?: number
  /** Sentences per paragraph (used when paragraphs: true). Default: 3 */
  sentencesPerParagraph?: number
  /** Seed string for deterministic output. Default: random */
  seed?: string
  /** Output formatting. Default: 'none' */
  formatting?: Formatting
}

export interface GenerateResult {
  text: string
  paragraphs: string[]
  sentences: string[]
  seed: string
  options: Required<GenerateOptions>
}
