# Fantasy Ipsum Generator

## Technical Specification & Implementation Plan

---

# 1. Overview

Fantasy Ipsum Generator is a procedural lorem ipsum platform inspired by epic fantasy worlds.

The platform generates:
- Epic fantasy paragraphs
- Character-based text
- Dark/Mordor style text
- Humorous fantasy text
- Procedural storytelling snippets

The project includes:
- Web App
- NPM Package
- REST API
- React Hook
- Vue Composable
- Dataset Engine
- Seeded Random Generator

---

# 2. Goals

## Main Goals

- Generate fantasy lorem ipsum text
- Provide deterministic output using seeds
- Support multiple themes and tones
- Allow filtering by character/style
- Export generated content
- Provide SDKs for frontend frameworks
- Offer public API usage

---

# 3. Tech Stack

## Frontend

- React
- TypeScript
- Vite
- TailwindCSS
- shadcn/ui
- Framer Motion

## Backend

- Node.js
- Fastify
- Express (optional adapter)

## Package

- TypeScript
- tsup
- ESM + CJS builds

## Testing

- Vitest
- Playwright

---

# 4. Monorepo Structure

```txt
apps/
  web/
  api/

packages/
  core/
  react/
  vue/
  datasets/

tooling/
```

---

# 5. Core Features

## Text Generation

Generate:
- sentences
- paragraphs
- procedural fantasy content

## Deterministic Seed

Same seed always returns same output.

Example:

```ts
generateLorem({
  seed: 'mordor'
})
```

---

# 6. Dataset Structure

## EN Dataset

```json
{
  "epic": {
    "gandalf": [],
    "aragorn": [],
    "general": []
  }
}
```

## PT-BR Dataset

```json
{
  "epic": {
    "gandalf": [],
    "aragorn": [],
    "general": []
  }
}
```

---

# 7. Themes

```ts
type Theme =
  | 'epic'
  | 'mordor'
  | 'shire'
  | 'battle'
  | 'forest'
  | 'wizard'
  | 'humor'
  | 'ancient'
```

---

# 8. Characters

```ts
type Character =
  | 'general'
  | 'gandalf'
  | 'aragorn'
  | 'frodo'
  | 'sam'
  | 'legolas'
  | 'gimli'
  | 'sauron'
```

---

# 9. Tones

```ts
type Tone =
  | 'cinematic'
  | 'poetic'
  | 'dark'
  | 'heroic'
  | 'funny'
```

---

# 10. Generator API

## Basic

```ts
generateLorem()
```

## Advanced

```ts
generateLorem({
  locale: 'en',
  theme: 'mordor',
  character: 'sauron',
  tone: 'dark',
  sentences: 10,
  paragraph: true,
  seed: 'barad-dur'
})
```

---

# 11. Core Generator Architecture

## Pipeline

```txt
input
  -> validate
  -> resolve dataset
  -> apply filters
  -> seeded random
  -> formatting
  -> output
```

---

# 12. Seed Engine

## Requirements

- Deterministic
- Lightweight
- Browser compatible

## Suggested Libraries

- seedrandom
- pure custom RNG

---

# 13. UI Features

- Theme Select
- Character Select
- Tone Select
- Language Select
- Seed Input
- Sentence Slider
- Paragraph Toggle
- Generate Button
- Copy Button
- Export Button

---

# 14. API Endpoints

## GET /generate

Query params:
- theme
- character
- tone
- locale
- seed

Example:

```txt
/api/generate?theme=mordor&tone=dark
```

---

# 15. Future Features

- AI-assisted phrase generation
- RPG mode
- Story mode
- Character dialogue mode
- Procedural lore generator
- VSCode extension
- Figma plugin

---

# 16. License

MIT
