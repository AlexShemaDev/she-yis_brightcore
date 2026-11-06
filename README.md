# SHE - YIS BRIGHTCORE LLC — landing

Bilingual (ES `/`, EN `/en/`) static landing built with **Astro 6**, TypeScript (strict) and **GSAP + ScrollTrigger**.
Visual system from the brand manual in `context/Manual de marca/` (v3.0).

## Commands

| Command           | Action                                          |
| :---------------- | :---------------------------------------------- |
| `npm install`     | Install dependencies (Node ≥ 22.12)             |
| `npm run dev`     | Dev server at `localhost:4321`                  |
| `npm run build`   | Type-check (`astro check`) and build to `dist/` |
| `npm run preview` | Preview the production build                    |

## Concept

The page is one **axis**: a fixed vertical circuit with seven nodes (`CircuitRail`), one per section, echoing
the symbol's "seven lights, one axis". The trace fills with scroll progress and each node lights up as its
section is reached. Products (Neuremy, TopoQuizz) hang off the circuit; a pinned section assembles the symbol
step by step while telling the real flow of the ecosystem: learn → practice → measure.

## Structure

```
src/
  config/site.ts        company constants, contact email (placeholder), section ids
  data/products.ts      single source of product facts (ES/EN) — VERIFY items are marked
  i18n/                 es.ts defines the Dictionary type, en.ts must satisfy it
  components/           one component per responsibility; sections/ holds the 7 sections
  scripts/motion.ts     the ONLY file that uses GSAP; sections expose data-* hooks
  styles/               tokens.css (brand tokens) + global.css
  assets/               brand SVGs (C2PA metadata stripped) and product screenshots
```

## Motion

- Hooks: `data-reveal`, `data-reveal-item`, `data-draw`, `data-part`, `data-eco`, `data-bus`, `data-count`,
  `data-parallax`, `data-trace`.
- `prefers-reduced-motion: reduce` keeps the final state: no drawing, pin, parallax or counters.
- Without JavaScript nothing is hidden (hidden states only exist under `html.js`). If motion fails or does not
  start within 5 s, `html.no-motion` reveals everything.
- Language switching uses Astro's `ClientRouter`; `motion.ts` tears down on `astro:before-swap` and re-inits on
  `astro:page-load`, so ScrollTriggers are never duplicated.

## Before publishing

- [ ] Replace `site` in `astro.config.mjs` (currently `https://she-yis-brightcore.example`).
- [ ] Replace `contactEmail` in `src/config/site.ts` (currently `contacto@example.com`).
- [ ] Confirm product facts marked `VERIFY` in `src/data/products.ts`:
  TopoQuizz "+2,500 questions" (other sources say "more than 2,000"), Beta/Android vs iOS status.
- [ ] Confirm the screenshots in `src/assets/products/` are current.
- [ ] Add a 1200×630 `og:image` (not included yet).
- [ ] Confirm `https://topoquizz.com` and its `/privacy`, `/terms` links (could not be reached from the build machine).
