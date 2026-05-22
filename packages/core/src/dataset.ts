import { en } from '@lord-of-the-ipsum/datasets/en'
import { ptBr } from '@lord-of-the-ipsum/datasets/pt-br'
import { de } from '@lord-of-the-ipsum/datasets/de'
import { es } from '@lord-of-the-ipsum/datasets/es'
import type { Locale, Theme, Character } from './types.js'

type ThemeData = Record<string, string[]>
type LocaleData = Record<string, ThemeData>

const DATASETS: Record<Locale, LocaleData> = {
  en: en as unknown as LocaleData,
  'pt-br': ptBr as unknown as LocaleData,
  de: de as unknown as LocaleData,
  es: es as unknown as LocaleData,
}

/**
 * Resolves the phrase pool for a given locale/theme/character combination.
 * Falls back gracefully: character → general → any available pool.
 */
export function resolvePool(
  locale: Locale,
  theme: Theme,
  character: Character,
): string[] {
  const dataset = DATASETS[locale]
  const themeData: ThemeData = dataset[theme] ?? dataset['epic']

  // Try exact character match first
  if (themeData[character] && themeData[character].length > 0) {
    // Merge character phrases with general phrases for variety
    const general = themeData['general'] ?? []
    return [...themeData[character], ...general]
  }

  // Fall back to general
  if (themeData['general'] && themeData['general'].length > 0) {
    return themeData['general']
  }

  // Last resort: flatten all available phrases in the theme
  return Object.values(themeData).flat()
}
