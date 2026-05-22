import type { Formatting } from './types.js'

export function applyFormatting(sentences: string[], formatting: Formatting): string[] {
  switch (formatting) {
    case 'uppercase':
      return sentences.map((s) => s.toUpperCase())

    case 'quotes':
      return sentences.map((s) => `"${s}"`)

    case 'markdown':
      return sentences.map((s, i) => {
        if (i === 0) return `**${s}**`
        if (i % 4 === 0) return `> ${s}`
        return s
      })

    case 'none':
    default:
      return sentences
  }
}
