/**
 * Deterministic seeded pseudo-random number generator.
 * Uses a simple mulberry32 algorithm — lightweight, browser-compatible,
 * and produces consistent output for the same seed string.
 */

function hashSeed(seed: string): number {
  let h = 0x12345678
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 0x9e3779b9)
    h = (h << 13) | (h >>> 19)
  }
  return h >>> 0
}

export function createRng(seed: string) {
  let state = hashSeed(seed)

  return {
    /** Returns a float in [0, 1) */
    next(): number {
      state |= 0
      state = (state + 0x6d2b79f5) | 0
      let z = Math.imul(state ^ (state >>> 15), 1 | state)
      z = (z ^ (z + Math.imul(z ^ (z >>> 7), 61 | z))) >>> 0
      return (z ^ (z >>> 14)) / 4294967296
    },

    /** Returns a random integer in [0, max) */
    nextInt(max: number): number {
      return Math.floor(this.next() * max)
    },

    /** Picks a random element from an array */
    pick<T>(arr: T[]): T {
      return arr[this.nextInt(arr.length)]
    },

    /** Shuffles an array in-place using Fisher-Yates */
    shuffle<T>(arr: T[]): T[] {
      const a = [...arr]
      for (let i = a.length - 1; i > 0; i--) {
        const j = this.nextInt(i + 1)
        ;[a[i], a[j]] = [a[j], a[i]]
      }
      return a
    },
  }
}

export type Rng = ReturnType<typeof createRng>

/** Generates a random seed string when none is provided */
export function randomSeed(): string {
  return Math.random().toString(36).slice(2, 10)
}
