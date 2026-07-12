@AGENTS.md

# Project: analdo.me — Personal Portfolio

A personal portfolio site for Analdo Gomez (Senior Product Designer), built from a Figma
source file (`portfolio-sourcefile`, fileKey `ti7TCH6aLLutT4OIAvSQec`) and implemented
1:1 in code.

## Stack

- Next.js 16 (App Router), TypeScript, Tailwind CSS v4
- All pages are Server Components — no client-side state, forms, or data fetching
- Images served via `next/image`, sourced from `public/images/`

## Structure

- `src/app/page.tsx` — home page (hero, case studies grid, showcase list)
- `src/app/case-studies/*/page.tsx` — 5 case study pages: Forty5Park, Uber Suite,
  Github's Security Findings, GoRight, Arrowhead Transit
- `src/components/` — shared, flat (non-nested) component files. Two structural
  patterns exist:
  - **Simple case studies** (Forty5Park, Uber Suite, Github's Security Findings):
    `CaseStudyHeader` + `CaseStudyIntroBlock`/`CaseStudySectionBlock` + `ProjectImage`
  - **Editorial case studies** (GoRight, Arrowhead Transit): a richer format using
    `CaseStudyProjectHeader`, `CaseStudySectionHeading`, `CaseStudyPointsGrid`,
    `CaseStudyCallout`, `CaseStudyStatement`, `CaseStudyDecisionBlock`, `CaseStudyFigure`,
    `CaseStudyImagePair` — with project meta (role/tools), numbered problem/decision/result
    sections, and alternating figure layouts
- `src/app/globals.css` — design tokens (`@theme inline`): colors, spacing, and a type
  scale (`heading-h1` through `heading-h5`, `body-h1` through `body-h3`, `overline`,
  `project-subtitle`) mapped directly from Figma variable names

## Responsive convention

Three-tier breakpoints matching dedicated Figma frames where they exist (not a guessed
binary split):
- **base** (mobile, <768px) — 24px padding
- **md** (tablet, 768–1023px) — 40px padding
- **lg** (desktop, 1024px+) — 64px padding

Several shared components expose override props (`aspectClassName`, `roundedClassName`,
`mdGapClassName`, `maxWidthClassName`, etc.) because individual case studies deviate from
each other at specific breakpoints — always re-check the actual Figma frame per page
rather than assuming a prior case study's values generalize.

## Figma workflow

Design pulled via the Figma Dev Mode MCP connector (`get_design_context`,
`get_variable_defs`, `download_assets`). When implementing a new page or reviewing
changes, fetch desktop **and** tablet **and** mobile frames independently — they are not
guaranteed to scale uniformly (e.g. GoRight's decision-block gaps, image counts, and
pull-quote styling all differ by breakpoint in non-obvious ways).

## Accessibility conventions (established in the design-polish pass)

These are now load-bearing patterns — follow them for any new page or component, not just
the ones touched so far:

- **Headings must be real tags.** Page title is `h1`, major sections (`CaseStudySectionHeading`,
  `CaseStudySectionBlock`) are `h2`, sub-items (`CaseStudyDecisionBlock` titles, points-grid
  item titles, home page card/row titles) are `h3`. Never style a heading-looking element as
  a plain `<p>` — screen-reader users navigate by heading list, and skipped/missing levels
  break that.
- **`ProjectImage`'s `alt` prop is required** (not optional, no default) — this is deliberate,
  so TypeScript fails the build if a new image is added without real alt text.
  `CaseStudyFigure`'s `alt` is optional and falls back to its `caption` prop, since the
  visible caption already describes the image.
- **Focus and motion are handled globally in `globals.css`**, not per-component:
  `a:focus-visible, button:focus-visible` gets a soft white outline (on-brand, not the
  browser-default blue), and `@media (prefers-reduced-motion: reduce)` neutralizes all
  transitions/animations site-wide. Don't add per-element `focus:` overrides unless a
  specific element genuinely needs to deviate.
- **Hover language is intentionally narrow**: plain text links dim to `text-white/60`
  (`transition-colors duration-200`); the case-study card/row images get a contained 5%
  zoom (`group-hover:scale-105 duration-500 ease-out`). Don't introduce a third hover
  pattern without a reason — restraint is the point.
- Every page's `<main>` has `id="main-content"`; `SiteHeader`/`CaseStudyHeader` render a
  `.skip-link` as their first child targeting it.

## Work completed so far

- Home page + all 5 case study pages built and verified responsive (desktop/tablet/mobile)
- Design tokens synced twice after `portfolio-sourcefile` was adjusted in Figma
  (line-heights, case study padding, intro block sizing)
- Sticky header/footer, GoRight statement mobile-simplification fix
- Image loading perf pass: `priority` on each page's first hero image, corrected `sizes`
  attribute to match the `max-w-[1280px]` container (was over-fetching on wide viewports)
- Design-polish pass (Vercel best-practices + WCAG + interactivity): consolidated arbitrary
  font values into design tokens; converted styled `<p>` headings to real `h1`/`h2`/`h3`
  site-wide; added a global focus-visible ring, skip-to-content link, and
  `prefers-reduced-motion` handling; wrote real alt text for all ~50 case-study images
  (`alt` is now a required prop on `ProjectImage`); added restrained hover states (link
  dim, card image zoom) and a zero-JS image-loading placeholder plus a minimal
  `case-studies/loading.tsx`
- All work merged to `main` via short-lived feature branches (no long-running branches)
