# Glass Box — design contract

The portfolio is an observable, running system. Every claim traces back to evidence.
Outside is the product (paper). Inside is the system (ink). Read this before adding any UI.

Plan of record: `reports/Award level animated portfolio plan.md`.

## Colour

| Token | Value | Role |
|---|---|---|
| `--paper` | `#EDECE8` | Default surface |
| `--paper-2` | `#E3E2DD` | Recessed panels, image wells |
| `--ink` | `#111214` | Text on paper; background of "internals" (Ask console, case-study insides, footer) |
| `--ink-2` | `#1B1C1F` | Raised surfaces on ink |
| `--graphite` | `#5B5D63` | Secondary text on paper (≈5.6:1) |
| `--fog` | `#A7A9AE` | Secondary text on ink |
| `--signal` | `#2B3FE0` | Links, focus ring, trace head, active chip — on paper |
| `--signal-ink` | `#8C9BFF` | Same roles on ink |
| `--live` | `#188A49` | Only for a status that a real check produced. Always paired with text. |

One accent. No gradients on text. No glass, no aurora, no glow.

## Type

- **Host Grotesk** (variable 300–800) for everything a person wrote. Hierarchy comes from size and weight, not from switching families.
- **IBM Plex Mono** (400/500) only for data a machine produced: clocks, latency, URLs, status codes, model names.
- The Urdu name داؤد احمد is an SVG path (`components/UrduMark.tsx`), never a web font.
- Display: tight tracking (`-0.05em`), line-height ≤ 0.9. Body: 16–18px / 1.6.
- No all-caps mono eyebrows, no "01 / 02 / 03" section numbers.

## Motion

- One motif: **the trace** — a hairline that draws down the page as you read, with a signal-blue head. Headings arrive as a token stream.
- Durations: 150ms hover/focus · 280ms UI · 600ms reveals · intro ≤ 1.2s, first visit per session, skippable.
- Eases: `power3.out` default · `aperture` = `0.76,0,0.24,1` for wipes · `none` for anything scrubbed.
- Animate only `transform`, `opacity`, `clip-path`. Never `filter: blur()`.
- Tiers, decided before first paint (`data-motion` on `<html>`):
  - `full` — fine pointer, ≥768px, >2 cores and >2 GB: everything, Lenis smooth wheel, x-ray lens.
  - `lite` — touch, small screens, Save-Data, ≤2 cores or ≤2 GB: no pinning, no Lenis, shorter reveals.
  - `reduced` — `prefers-reduced-motion` or the site's Motion toggle: no movement, final states only.
- Text must be readable in server HTML before any JS runs. Never start the hero at `opacity: 0`.

## Content rules

- Every number, credential and client fact must be true and traceable. Nothing typed that a machine should measure.
- Banned phrases: "I build digital experiences", "Selected works", "Engineered value", "Passionate developer",
  "Turning ideas into reality", "let's talk.", and anything that could sit unchanged on someone else's site.
- Client copy (their slogans) may appear inside screenshots only.
- Client financial data never appears. Dashboards use seeded demo data and say so.

## Banned UI

Emoji icons · glass panels · aurora blobs · default bento grids · status dots without a real check ·
custom cursors that hide the native one · autoplaying sound · counters that animate made-up numbers.
