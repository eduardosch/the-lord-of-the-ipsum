import { createRng, randomSeed } from './rng.js'
import { resolvePool } from './dataset.js'
import { applyFormatting } from './formatter.js'
import type { GenerateOptions, GenerateResult } from './types.js'

const DEFAULTS: Required<GenerateOptions> = {
  locale: 'en',
  theme: 'epic',
  character: 'general',
  tone: 'cinematic',
  sentences: 5,
  paragraphs: false,
  paragraphCount: 1,
  sentencesPerParagraph: 3,
  seed: '',
  formatting: 'none',
}

/**
 * Core generator pipeline:
 * input → validate → resolve dataset → seeded random selection → formatting → output
 */
export function generateLorem(options: GenerateOptions = {}): GenerateResult {
  // 1. Resolve options with defaults
  const seed = options.seed || randomSeed()
  const opts: Required<GenerateOptions> = { ...DEFAULTS, ...options, seed }

  // 2. Create deterministic RNG from seed
  const rng = createRng(seed)

  // 3. Resolve phrase pool
  const pool = resolvePool(opts.locale, opts.theme, opts.character)

  // 4. Shuffle pool and pick sentences (avoid immediate repeats)
  const shuffled = rng.shuffle(pool)
  const totalSentences = opts.paragraphs
    ? opts.paragraphCount * opts.sentencesPerParagraph
    : opts.sentences

  const picked: string[] = []
  for (let i = 0; i < totalSentences; i++) {
    picked.push(shuffled[i % shuffled.length])
  }

  // 5. Apply tone modifier (influences selection weighting via additional shuffles)
  let sentences = applyTone(picked, opts.tone, rng)

  // 6. Apply formatting
  sentences = applyFormatting(sentences, opts.formatting)

  // 7. Build paragraph structure
  let paragraphList: string[]
  if (opts.paragraphs) {
    paragraphList = []
    for (let p = 0; p < opts.paragraphCount; p++) {
      const start = p * opts.sentencesPerParagraph
      const end = start + opts.sentencesPerParagraph
      paragraphList.push(sentences.slice(start, end).join(' '))
    }
  } else {
    paragraphList = [sentences.join(' ')]
  }

  const text = paragraphList.join('\n\n')

  return {
    text,
    paragraphs: paragraphList,
    sentences,
    seed,
    options: opts,
  }
}

/**
 * Applies tone-based transformations.
 * These are lightweight text mutations rather than separate datasets,
 * keeping the bundle small while still varying the feel of the output.
 */
function applyTone(sentences: string[], tone: string, rng: ReturnType<typeof createRng>): string[] {
  switch (tone) {
    case 'dark':
      // Prefix some sentences with doom-laden openers
      return sentences.map((s) => {
        if (rng.next() > 0.6) {
          const openers = [
            'In the shadow of doom, ',
            'Where hope has long since perished, ',
            'Beneath a sky of ash, ',
            'In the age of sorrow, ',
          ]
          return rng.pick(openers) + s.charAt(0).toLowerCase() + s.slice(1)
        }
        return s
      })

    case 'heroic':
      return sentences.map((s) => {
        if (rng.next() > 0.6) {
          const closers = [
            ' And so the age of heroes was not yet done.',
            ' For the free peoples would not yield.',
            ' Such was the courage of the West.',
            ' And the world took notice.',
          ]
          return s + rng.pick(closers)
        }
        return s
      })

    case 'poetic':
      return sentences.map((s) => {
        // Wrap some sentences in em-dash asides
        if (rng.next() > 0.7) {
          const words = s.split(' ')
          const mid = Math.floor(words.length / 2)
          const aside = rng.pick(['and the world was changed', 'as the stars bore witness', 'and the ages wept'])
          return words.slice(0, mid).join(' ') + ` — ${aside} — ` + words.slice(mid).join(' ')
        }
        return s
      })

    case 'funny':
      return sentences.map((s) => {
        if (rng.next() > 0.65) {
          const quips = [
            ' (This was not, in hindsight, the wisest of decisions.)',
            ' Nobody had mentioned anything about this in the brochure.',
            ' Elevenses seemed very far away.',
            ' The Gaffer would never have approved.',
            ' Second breakfast felt like a distant dream.',
          ]
          return s + rng.pick(quips)
        }
        return s
      })

    case 'cinematic':
    default:
      return sentences
  }
}
