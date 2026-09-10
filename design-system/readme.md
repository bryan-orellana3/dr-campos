# Dr. David Campos — Design System

Sistema de diseño para la marca personal del **Dr. David Campos**: médico boliviano radicado en São Paulo, referente digital con ~3.9M de seguidores combinados, que hoy transfiere su sistema probado a otros médicos hispanohablantes a través del **Método 4C** (Constancia, Cercanía, Contenido, Conversión).

**Esencia de marca:** el mentor-practicante — la antítesis del gurú de marketing. No enseña teoría; enseña su rutina real y documentada, con promesas medidas y evidencia verificable. Equilibrio entre cercanía y rigor: habla "como en una cena familiar" sin perder autoridad científica. Palabras de marca: *método, constancia, evidencia, autoridad, transformación*. Rechaza: hacks, viralidad fácil, fama instantánea, marketing agresivo.

**Dirección visual pedida:** moderno, minimalista, elegante, fuertemente alineado a los azules del logo.

## Sources provided

- `uploads/PROP. LOGOSCAMPOS.png` — master logo on light canvas (photo orb + script "Dr." + gradient wordmark + EKG underline)
- `uploads/PROP.-LOGOSCAMPOSSIN-FONDO.png` — same logo, transparent background (cropped copy: `assets/logo.png`)
- `uploads/PROP. FONDO 1.png`, `PROP. FONDO 1 (1).png` (duplicate), `PROP. FONDO 2.png` — studio scene backgrounds: deep blue wall with neon cyan EKG line, content-creator shelf, giant phone, podcast mic
- Brand description text (no codebase, no Figma, no decks, no font files)

## CONTENT FUNDAMENTALS

- **Language:** Spanish (es-LA), addressed to fellow doctors. Second person **tú** — cercano pero profesional. First person singular when Dr. Campos speaks of his own routine ("mi rutina", "lo que yo hago cada mañana").
- **Tone:** mentor-practicante. Calm confidence, zero hype. Claims are always *measured and evidenced*: numbers, timeframes, "documentado", "verificable". Never "hazte viral", "explota tu Instagram", "secreto". Prefer "previsible", "sistema", "constancia".
- **Casing:** sentence case everywhere. UPPERCASE reserved for short eyebrow labels (MÉTODO 4C, PASO 1) and the wordmark itself. No title case.
- **Emoji:** none. The brand's warmth comes from wording, not decoration.
- **Numbers as proof:** "3.9M de seguidores", "sin agencias, sin equipo de producción", "4 pilares". Concrete > superlative.
- **Copy examples:**
  - Hero: "Presencia digital previsible. Sin burnout, sin perder seriedad."
  - Eyebrow: "MÉTODO 4C"
  - CTA: "Aplicar al programa" / "Ver el método" (verbs, no "¡YA!")
  - Proof: "Documentado paso a paso durante 4 años de práctica clínica."
  - Anti-gurú: "No es un hack. Es una rutina."

## VISUAL FOUNDATIONS

- **Color:** single-hue system. Deep clinical navy `#02325A` (autoridad) → royal `#0A5CA8` → sky `#4FA8E0` (cercanía), on cool off-white `#F6F8FB`. Cyan `#3ECDE8` is the **pulse accent** — reserved for the EKG motif and small live highlights, mostly on dark surfaces. Status colors exist but are desaturated and rare. No purple, no warm hues.
- **Gradients:** only the two brand gradients — the horizontal wordmark gradient (navy→sky, used on key headline words and the EKG rule) and the radial orb gradient (photo circle, avatars). Never full-page gradient washes.
- **Type:** Montserrat ExtraBold caps for display (matches wordmark), Source Sans 3 for body, **Brittany Signature** script for single accent words (mirrors the "Dr." flourish) — never full sentences. Display tracking slightly tight; eyebrow labels uppercase +0.14em.
- **Backgrounds:** light `--surface-page` by default; deep navy `--gradient-hero-dark` sections for hero/CTA moments, where the cyan EKG line and photo cutouts live. Studio photos (`assets/bg-studio-*.png`) may back dark hero sections with a navy protection overlay.
- **Signature motif — the pulse line:** a thin horizontal rule that carries one EKG heartbeat blip (see `PulseDivider` component). Use as section divider or under headline words, exactly like the logo underline. One blip, not a continuous waveform.
- **Cards:** white, `--radius-lg` (16px), 1px `--border-subtle`, `--shadow-sm` at rest → `--shadow-md` on hover. No colored left borders.
- **Corners:** 6/10/16/24px scale; pills (999px) for tags, badges, CTAs.
- **Shadows:** navy-tinted, soft, low. Cyan `--shadow-pulse` glow only on dark surfaces.
- **Motion:** calm and clinical — 140–400ms, `--ease-out`, fades and small translateY. No bounces, no spins, no parallax.
- **Hover:** buttons darken one step (blue-500 → royal-600); cards raise shadow; links underline. **Press:** darken + `transform: translateY(1px)`; no shrink-scale.
- **Transparency/blur:** rare; only a subtle `rgba(navy)` protection overlay on photography. No glassmorphism.
- **Imagery:** real photography of the doctor and his studio — cool blue grading, clinical-warm lighting. No stock metaphors, no illustration style established (don't invent one).
- **Layout:** 1120px container, generous whitespace (`--space-8/9` between sections), left-aligned text; centered only for hero/CTA moments.

## ICONOGRAPHY

- No icon set was provided in the sources. **Substitution:** [Lucide](https://lucide.dev) via CDN — 1.75px stroke, round caps, matches the thin EKG line weight. Use `stroke: currentColor`, sized 16–24px, in `--dc-royal-600` or `--text-muted`.
- No emoji, no unicode-as-icons. Numbers (1–4) set in Montserrat ExtraBold act as the "icon" for the 4C pillars.
- Logo files in `assets/` (see below). **Never redraw the logo**; use the PNGs. A light/knockout logo variant for dark backgrounds was NOT provided — on dark, use the isotype (`assets/isotipo.png`, the photo orb) plus the logotype "Dr. David Campos" type-set (script "Dr." + Montserrat ExtraBold caps), and request the official variant from the brand.

## Fonts — substitution flag

No font binaries were provided. `tokens/fonts.css` loads Google Fonts: **Montserrat** (wordmark-style display), **Source Sans 3** (body). The script "Dr." is officially **Brittany Signature** (commercial) — its binary was not provided, so **Sacramento** is the loaded fallback; `--font-script` already lists `'Brittany Signature'` first, so adding a real `@font-face` rule + file makes it exact everywhere. If the brand has licensed originals, replace that file with real `@font-face` rules.

## Index

- `styles.css` — global entry; imports everything under `tokens/`
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `effects.css`, `fonts.css`
- `assets/` — `logo.png` (transparent, tight-cropped), `isotipo.png` (photo orb only — the brand's isotype), `logo-on-light.png`, `logo-transparent-raw.png`, `bg-studio-shelf.png`, `bg-studio-mic.png`
- `guidelines/` — foundation specimen cards (Design System tab)
- `components/core/` — Button, IconButton, Badge, Tag, Card, Input, Select, Checkbox, Radio, Switch, Tabs, Dialog, Toast, Tooltip, PulseDivider, SectionHeading, StatCard
- `ui_kits/website/` — Método 4C landing page recreation (`index.html` + screens)
- `templates/` — (reserved for deck/page templates)
- `SKILL.md` — agent skill entry point

### Intentional additions
- **PulseDivider** — codifies the logo's EKG underline as a reusable rule. Core brand motif.
- **SectionHeading** — eyebrow + display heading + lede pattern used across brand surfaces.
- **StatCard** — evidence-first brand leans on numeric proof (3.9M, 4C, years documented).

No component inventory existed in the sources; the standard set above was authored from the brand foundations (flagged here per protocol).
