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

- `src/app/page.tsx` — home page: hero (headline, chip-tagged subtext, contact links) +
  a single unified `CaseStudyCard` grid for all 5 projects (no more featured/showcase
  split — that two-tier layout was replaced when the home page was redesigned around
  Figma's card + chip pattern)
- `src/app/case-studies/*/page.tsx` — 5 case study pages: Forty5Park, Uber Suite,
  Github's Security Findings, GoRight, Arrowhead Transit
- `src/components/` — shared, flat (non-nested) component files. `Chip` is a small shared
  primitive (pill badge — `stroke-dark` bg, `gray-dark` border, bold 12px label) used in
  both the hero and every case-study card's tag row. Two structural patterns exist for
  case study pages:
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

On dense components (home page cards), mobile drops one step down the type scale from
desktop (e.g. title `heading-h5` on mobile → `heading-h4` from `md` up; description
`body-h2` on mobile → `body-h1` from `md` up) rather than reusing the desktop size at a
smaller viewport — check per-component whether this step-down is warranted, don't assume
it's global.

Gotcha: when a flex row switches to `flex-row` at one breakpoint (e.g. `md`) but a child's
`flex-1`/width override is only set at a later breakpoint (e.g. `lg`), that child still
claims full width in between and forces the row to wrap. Set the width override on the
same breakpoint the row layout changes, not a later one (`site-footer.tsx` fixed:
copyright text needs `md:flex-1` alongside `md:flex-row`, not `lg:flex-1`).

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
- Home page redesign (matching a Figma update to the `page-home` frame): replaced the
  featured/showcase two-tier layout with one `CaseStudyCard` grid (1 col on mobile/tablet,
  2 col from `lg`) carrying a tag `Chip` row per project; added the same chips to the hero
  subtext; added `--radius-token-xl` (12px) for the card corner radius, following the
  existing `radius/N` → `radius-token*` naming from Figma variables. No dedicated
  tablet/mobile Figma frame existed for this new grid (unlike the footer's explicit
  breakpoint symbols) — the responsive behavior was extrapolated from the site's existing
  3-tier convention and eyeballed against content-cramping at each width, not pixel-matched
  to a source frame
- Footer fix: added the `border-t border-stroke-dark` top border from the updated Figma
  footer component, and fixed a tablet-width wrap bug (see the flex-1/breakpoint gotcha
  above)
- Pushed directly to `main` (commit `406aae0`) after browser-verifying all three
  breakpoints — no PR for this change
