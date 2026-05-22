# The Lord of the Ipsum

A Lord of the Rings-inspired Lorem Ipsum generator.

## Setup

Requires **Node.js 18+** and **pnpm 9+**.

```bash
# Install pnpm if you don't have it
npm install -g pnpm

# Install all workspace dependencies
pnpm install

# Start the web app (dev server)
pnpm dev
```

The app will be available at **http://localhost:5173**

## Project Structure

```
apps/
  web/              ← React + Vite web app

packages/
  core/             ← generateLorem() engine (TypeScript)
  datasets/         ← Phrase datasets (EN + PT-BR)
```

## Usage (core package)

```ts
import { generateLorem } from '@lord-of-the-ipsum/core'

// Basic
const result = generateLorem()

// Advanced
const result = generateLorem({
  locale: 'en',          // 'en' | 'pt-br'
  theme: 'mordor',       // epic | mordor | shire | battle | forest | wizard | humor | ancient
  character: 'sauron',   // general | gandalf | aragorn | frodo | sam | legolas | gimli | sauron
  tone: 'dark',          // cinematic | poetic | dark | heroic | funny
  paragraphs: true,
  paragraphCount: 3,
  sentencesPerParagraph: 3,
  seed: 'barad-dur',     // deterministic output
  formatting: 'none',    // none | uppercase | quotes | markdown
})

console.log(result.text)
console.log(result.seed)   // reuse for same output
```

## Build

```bash
# Build the core package
pnpm --filter core build

# Build the web app
pnpm --filter web build
```
