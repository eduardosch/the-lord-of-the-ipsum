---
name: Arda Nocturne
colors:
  surface: '#16130b'
  surface-dim: '#16130b'
  surface-bright: '#3d392f'
  surface-container-lowest: '#110e07'
  surface-container-low: '#1f1b13'
  surface-container: '#231f17'
  surface-container-high: '#2d2a21'
  surface-container-highest: '#38342b'
  on-surface: '#eae1d4'
  on-surface-variant: '#d0c5af'
  inverse-surface: '#eae1d4'
  inverse-on-surface: '#343027'
  outline: '#99907c'
  outline-variant: '#4d4635'
  surface-tint: '#e9c349'
  primary: '#f2ca50'
  on-primary: '#3c2f00'
  primary-container: '#d4af37'
  on-primary-container: '#554300'
  inverse-primary: '#735c00'
  secondary: '#c7c6c6'
  on-secondary: '#2f3131'
  secondary-container: '#484949'
  on-secondary-container: '#b8b8b8'
  tertiary: '#bfcdff'
  on-tertiary: '#082b72'
  tertiary-container: '#97b0ff'
  on-tertiary-container: '#254188'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffe088'
  primary-fixed-dim: '#e9c349'
  on-primary-fixed: '#241a00'
  on-primary-fixed-variant: '#574500'
  secondary-fixed: '#e3e2e2'
  secondary-fixed-dim: '#c7c6c6'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#dbe1ff'
  tertiary-fixed-dim: '#b4c5ff'
  on-tertiary-fixed: '#00174b'
  on-tertiary-fixed-variant: '#27438a'
  background: '#16130b'
  on-background: '#eae1d4'
  surface-variant: '#38342b'
typography:
  headline-xl:
    fontFamily: Sora
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Sora
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  container-max: 1280px
---

## Brand & Style

This design system is built to evoke the weight and majesty of a high-fantasy epic, set against the backdrop of a Middle-earth twilight. The aesthetic is **Modern-Gothic**, blending the clarity of contemporary UI with the atmospheric depth of a cinematic fantasy world.

The visual language relies on a "deep-layered" approach. Instead of traditional shadows, depth is created through shifting shades of midnight blue and steel, accented by the glow of precious metals. The emotional response should be one of awe, reliability, and mystery—as if the user is interacting with an ancient artifact refined by modern craftsmanship.

Key stylistic pillars:
- **Atmospheric Depth:** Using the provided blues to create a hierarchical "mist" effect.
- **Luminous Accents:** Gold and Silver are used sparingly but with high impact, representing "starlight" or "enchantments."
- **Precision Typography:** High-character sans-serifs that maintain legibility while feeling carved or etched.

## Colors

The palette is anchored in the deep, cold blues of a mountain night, contrasted by the warmth of dwarven gold and elven silver.

- **The Deep (Background):** `#0F1E3C` is the foundation. All primary views emerge from this darkness.
- **The Keep (Container):** `#264D72` is used for large structural elements like sidebars, cards, and footers.
- **The Forge (Input/Forms):** `#326584` provides a tactile, slightly lighter surface for interactive text areas.
- **Mithril & Gold (Accents):** 
    - **Gold (`#D4AF37`):** Reserved for primary actions, critical highlights, and "divine" UI states.
    - **Deep Silver (`#A9A9A9`):** Used for secondary actions, borders, and subtle ornamentation.

**Contrast Strategy:** 
All body text must use `#F8FAFC` (Off-white) or `#EEDD82` (Pale Gold) to ensure WCAG AA compliance against the dark blue backgrounds.

## Typography

The typography pairings balance "Modern Fantasy" with "Utility."

**Sora (Headlines & Labels):** Chosen for its geometric precision and unique apertures. At large sizes, it feels architectural and "epic." It is used for all major headings and navigation labels (often in uppercase).

**Hanken Grotesk (Body & Content):** A sharp, contemporary sans-serif that ensures high readability for long-form lore or data. It stays neutral while supporting the "carved" aesthetic of the headlines.

**Scale & Rhythm:**
- Large headlines use a tighter letter-spacing to feel more impactful.
- Labels use a wider letter-spacing and uppercase styling to evoke runic inscriptions.

## Layout & Spacing

The layout philosophy is **Structural and Centered**, mimicking the organized symmetry of ancient citadels.

- **Grid System:** A 12-column fixed grid for desktop, transitioning to a single-column fluid layout for mobile.
- **Rhythm:** An 8px base unit drives all spacing. Containers should use generous internal padding (32px+) to maintain a feeling of "vastness."
- **Margins:** Desktop views should feature wide horizontal margins to keep content focused and "heroic" in the center of the screen.
- **Breakpoints:**
    - Mobile: Up to 599px (16px margins).
    - Tablet: 600px - 1023px (32px margins).
    - Desktop: 1024px+ (64px margins).

## Elevation & Depth

This design system avoids traditional "drop shadows" in favor of **Luminous Tonal Layering** and **Internal Glows**.

- **Surface Tiers:** Depth is indicated by color brightness. The "deeper" an object is in the hierarchy, the darker the blue. The "closer" it is to the user, the more the blue shifts toward the `#326584` range.
- **Beveling:** Instead of external shadows, use 1px inner borders of Deep Silver (`#A9A9A9`) at 20% opacity on the top and left edges to simulate light hitting a carved surface.
- **Ambient Glow:** Primary elements (Gold) use a soft outer glow (`box-shadow: 0 0 15px rgba(212, 175, 55, 0.3)`) rather than a black shadow, suggesting the item is a source of light.

## Shapes

The shape language is **Chiseled**. 

We use a "Soft" roundedness (0.25rem) to avoid the clinical feel of perfectly sharp corners, but we never use pill-shapes or high-radius circles. This creates a "cut stone" aesthetic.

- **Small Components (Buttons, Chips):** 4px radius.
- **Large Containers (Cards, Modals):** 8px radius.
- **Interactive States:** On hover, shapes do not get rounder; instead, their borders should illuminate.

## Components

### Buttons
- **Primary:** Background Gold (`#D4AF37`), Text Dark Blue (`#0F1E3C`). High-gloss finish.
- **Secondary:** Transparent background, 2px Deep Silver border, Text Off-white.
- **State Change:** On hover, primary buttons should "ignite" with a stronger gold glow.

### Input Fields
- **Surface:** Use `#326584`.
- **Border:** 1px solid Deep Silver at 30% opacity. 
- **Focus State:** Border transitions to Gold with a subtle inner glow.

### Cards & Containers
- **Main Container:** Background `#264D72`. 
- **Header:** Use a bottom-border of 1px Silver to separate titles from body content.
- **In-card lists:** Use alternating row backgrounds (slightly lighter/darker blue) rather than lines to maintain a "solid block" feel.

### Chips & Tags
- **Style:** Small, all-caps labels using the `label-sm` typography. 
- **Background:** Semi-transparent Silver or Gold depending on the importance of the tag.

### Separators
- **Design:** Instead of plain lines, use a thin horizontal rule with a small diamond or "rune" shape in the center to reinforce the high-fantasy theme.
