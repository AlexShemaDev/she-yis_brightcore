# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # Node >= 22.12 required (Astro 6)
npm run dev          # http://localhost:4321
npm run build        # runs `astro check` first, then `astro build` -> dist/
npm run preview      # serves dist/; do not request it while a build is rewriting dist/
npx astro check      # type-check only
```

There is no linter and no test suite. Verification is `npm run build` (0 errors/warnings/hints) plus loading `/` and `/en/` in a real browser. TypeScript is pinned to 5.x because `@astrojs/check` does not accept 7.

## What this is

Bilingual (ES at `/`, EN at `/en/`) static landing for SHE - YIS BRIGHTCORE LLC, presenting its two products, **Neuremy** (medical study platform, neuremy.com) and **TopoQuizz** (medical quiz app, topoquizz.com). Brand source material lives in `context/` (brand manual PDF v3.0, SVG icons, circuit graphics); treat it as read-only input. The sibling repos in `~/Documents/devShema` (`Ratchet` = Neuremy's code, `TopoQuizz`, `TopoQuizz-Web`, `shemayisraelsrl`) were the source of product facts.

## Architecture

**The page is one "axis".** `Landing.astro` assembles seven sections in a fixed order; `CircuitRail` is a fixed vertical circuit with one node per section. The order in `sectionIds` (`src/config/site.ts`), the DOM order of the `data-section` elements, and the `i18n.rail.sections` labels must stay aligned: `motion.ts` maps rail node *i* to the *i*-th `[data-section]`.

**Animation contract (`src/scripts/motion.ts` is the only file that imports GSAP).** Components never animate; they expose `data-*` hooks (`data-reveal`, `data-reveal-item`, `data-draw`, `data-part`, `data-eco`, `data-bus`, `data-count`, `data-parallax`, `data-trace`) and motion.ts drives them. Rules that are easy to break:
- Initial hidden states live in `global.css` and apply only under `html.js:not(.no-motion)`. Nothing may be hidden without JS. If motion fails or has not set `html.motion-ready` within 5 s, `html.no-motion` reveals everything.
- `prefers-reduced-motion: reduce` must end in the final visible state (CSS override in `global.css`; `setup()` returns early after lighting static markers).
- Pinned "Ecosystem" section: motion.ts adds `.is-pinned` (steps stack in one grid cell, dots appear) and `.mark--intro` only on desktop with motion allowed. Without those classes the steps are a plain list and the symbol is fully drawn.
- Scroll-driven lines use a CSS variable (`--p`) tweened by GSAP and consumed with `scaleX/scaleY(var(--p))`.
- ScrollTriggers are created inside `gsap.matchMedia()` and reverted on `astro:before-swap`; init runs on `astro:page-load`. Astro's `ClientRouter` replaces `<html>` attributes on swap, so the inline head script re-adds `js` on `astro:after-swap`. Create the pin before other triggers so later positions include the pin spacing.
- `LogoMark.astro` keeps the manual's exact geometry; its `data-part` groups (`arms`, `stem`, `joints`, `nodes`, `shamash`, `links`, `halo`) and `data-draw` + `pathLength="1"` strokes are what motion.ts draws. Do not recolor, reshape or add shadows to the logo (manual p. 9).

**Content has two single sources.** Product facts live only in `src/data/products.ts` (`{es,en}` per field, with `// VERIFY` markers for unconfirmed claims). UI copy lives in `src/i18n/`: `es.ts` defines the `Dictionary` type (`typeof es`) and `en.ts` must satisfy it, so adding a key means adding it to both. Don't hardcode copy in components. Use `formatInteger` (`src/i18n/format.ts`) for numbers: `es-ES` omits thousands separators on 4-digit numbers unless `useGrouping: 'always'`.

## Responsive rules

- Breakpoints in use: `≤420` (compact header, stacked wordmark), `≤640` (module bus becomes a vertical list), `≤767` (rail shrinks, mobile layout), `≤860/900` (two-column sections stack, hamburger menu), `≤1080` (module bus 3 columns), `≥1600` and `≥2200` (`html` font-size 112.5 % / 131.25 %).
- Define sizes in `rem`, not `px`, wherever the layout should grow on large screens: `--maxw` is `74rem` and `--container` / `--rail-left` derive from it, so the rail stays aligned to the content column at any width.
- Minimums enforced by the audit: no horizontal overflow from 320 px up, interactive targets >= 44 px (the rail nodes get theirs from an invisible `::after`), rendered text >= 12 px.
- The pinned Ecosystem section needs width **and** height: `motion.ts` only pins when `(min-width: 768px) and (min-height: 640px)`. Short viewports (landscape phones, small laptops) get the plain stacked list; the hero switches back to two columns on `(max-height: 520px) and (orientation: landscape)`.
- Check responsive changes in a real browser at 320, 390, 768, 1024, 1440, 1920, 2560 and 844×390, with and without `prefers-reduced-motion`.

## Content and brand constraints

- The brand manual's sample services and figures (ciberseguridad, cloud, SLA 99.98 %, "128 sistemas", 42 ms) are fictitious placeholders; never use them as real content. Real capabilities come from the products and the group's technology unit description.
- Do not mention Shema Yisrael S.R.L. (explicit decision). Public product names are only "Neuremy" and "TopoQuizz"; never "Ratchet"/"Neurapp" or internal URLs (AWS App Runner, admin panels). Product screenshots must not show the old "Neurapp" name.
- Brand rules (manual pp. 11–19, 28): bg `#0A0E27`, max 2 colors per composition (product colors only inside their screenshots), glow only on nodes and interactive elements, IBM Plex Sans only, text contrast >= 4.5:1, never cyan text on white.
- Placeholders that must be replaced before publishing: `site` in `astro.config.mjs` (`she-yis-brightcore.example`) and `contactEmail` in `src/config/site.ts` (`contacto@example.com`). README.md has the full pre-publish checklist.
- In running copy, write the company name with non-breaking spaces (`SHE - YIS BRIGHTCORE LLC`).

## Gotchas

- Astro scoped `<style>` does not reach the root `<svg>` of a child component; style it with `:global(.class)` from the parent (see `Wordmark.astro`, `Hero.astro`).
- CSS `calc()` has no `%` operator: pass a precomputed variable instead (see `--o` in `ProductNeuremy.astro`).
- `npm audit` reports advisories fixed only in Astro 7, which requires Node >= 22.23.4 (local Node is 22.15). Astro 6 was chosen deliberately; upgrading is a decision for the user.
