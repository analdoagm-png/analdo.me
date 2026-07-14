<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project: analdo.me — Personal Portfolio

Personal portfolio site for Analdo Gomez, Senior Product Designer. The site was built from the Figma source file `portfolio-sourcefile` (`fileKey ti7TCH6aLLutT4OIAvSQec`) and should stay visually close to that source while respecting the responsive and accessibility conventions below.

Keep this file and `DESIGN.md` updated as the project changes. `AGENTS.md` is the working guidance for future agents; `DESIGN.md` is the design-system reference.

## Stack

- Next.js 16 App Router, TypeScript, Tailwind CSS v4.
- All pages are Server Components. Do not add client-side state, forms, data fetching, or scroll observers without a real architecture reason.
- Use `next/image` for project images from `public/images/`.
- Use `next/font` from the root layout for fonts. This project uses DM Sans as a variable Google font with `display: "swap"` and explicit fallbacks.

## Structure

- `src/app/page.tsx` — homepage hero, chip-tagged subtext, contact links, and one unified `CaseStudyCard` grid for all 5 projects.
- `src/app/case-studies/*/page.tsx` — five case study pages: Forty5Park, Uber Suite, Github's Security Findings, GoRight, Arrowhead Transit.
- `src/components/` — shared, flat component files. Avoid nested component folders unless the project structure changes substantially.
- `src/app/globals.css` — Tailwind v4 `@theme inline` design tokens plus global focus, motion, and font-rendering rules.
- `DESIGN.md` — design-system documentation. Update it whenever tokens, core component styles, interaction rules, accessibility conventions, or responsive behavior change.

## Responsive Convention

Use the three-tier breakpoint system that matches the Figma frames where available:

- Base mobile `<768px`: 24px page padding (`px-6`).
- Tablet `md`, 768–1023px: 40px page padding (`md:px-10`).
- Desktop `lg`, 1024px+: 64px page padding (`lg:px-16`).

When Figma provides desktop, tablet, and mobile frames, inspect each independently. Do not assume a desktop frame scales uniformly.

Shared components may expose override props such as `aspectClassName`, `roundedClassName`, `mdGapClassName`, and `maxWidthClassName` because individual case studies deviate by breakpoint. Re-check the target page before generalizing values.

Breakpoint gotcha: when a flex row switches to `flex-row` at one breakpoint, child width or `flex-1` overrides must switch at the same breakpoint. If the child waits until a later breakpoint, it can keep claiming full width and force wrapping.

## Design System

Use `DESIGN.md` as the source of truth for:

- Color, radius, typography, and motion tokens.
- Global styles such as focus rings, reduced motion, and font rendering.
- Component rules for chips, project cards, callouts, case-study figures, and editorial sections.
- Accessibility expectations.

Current high-level design choices:

- Dark base: `dark-primary` background, `stroke-dark` borders, `gray-dark` low-emphasis strokes.
- DM Sans variable font, optimized through `next/font`.
- Fluid display type for large headings; readable minimum text size is 14px.
- Body copy should not use very light weights. Use 400 for body text and 500 for small labels.
- Home project cards use stronger titles (`text-heading-h4`), calmer descriptions (`text-body-h2 text-white/68`), and light chips (`border-white/15 bg-white/[0.04] text-white/72`).
- Case-study callouts and results boxes should fill their container width and align content left. Do not cap callout paragraph width unless the design explicitly calls for a centered editorial quote.

## Typography

- Headings and short display statements use `text-balance`.
- Long paragraphs use `text-pretty`.
- Use real semantic headings: page title `h1`, major sections `h2`, item/card/decision titles `h3`.
- Body prose line-length caps use `ch` units when a cap is desired. Do not apply a `70ch` cap inside callout/result boxes that are meant to fill the whole box.
- Avoid one-off arbitrary font sizes unless there is a clear visual reason. Prefer tokens from `globals.css`.

## Homepage Copy Pattern

The hero subtext currently reads as a flex row with chips:

`Based in Colombia, working globally with` `Figma` `,` `Claude` `and` `Codex`

The comma is its own flex item so the parent `gap-2` gives equal space on both sides. Connector words such as `and` are also standalone flex items. If punctuation needs to hug a chip in a future design, wrap the chip and punctuation in one `inline-flex` item; do not leave hugging punctuation bare.

## Accessibility Conventions

- Every page's `<main>` must have `id="main-content"`.
- `SiteHeader` and `CaseStudyHeader` render a `.skip-link` as their first child.
- Global focus is handled in `globals.css` for `a:focus-visible` and `button:focus-visible`. Do not add per-element focus overrides unless a specific component needs a different visible treatment.
- Global reduced-motion handling in `globals.css` neutralizes transitions and animations under `prefers-reduced-motion: reduce`.
- `ProjectImage` requires real `alt` text. `CaseStudyFigure` may fall back to its caption when the visible caption already describes the image.
- Do not claim accessibility compliance from screenshots alone. For visual QA, check layout, focus affordance, text contrast risk, text reflow, and reduced-motion behavior where relevant.

## Interaction And Motion

- Text links dim on hover to `text-white/60` and active press to `text-white/40` with `transition-colors duration-200`.
- Case-study card images zoom to `scale-105` on hover with `duration-500 ease-out`.
- `CaseStudyCard` border shifts from `stroke-dark` to `gray-dark`, adds `hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]`, and presses with `active:scale-[0.99]`.
- Card arrows slide in on hover using the same visual language as the back arrow in `CaseStudyHeader`.
- `.animate-fade-up` is a zero-JS page-load animation: 12px translateY + opacity, 700ms `cubic-bezier(0.16, 1, 0.3, 1)`, `both` fill mode.
- Use small server-rendered stagger delays for side-by-side mapped items only. Sequential content blocks do not need individual staggering.

## Case Study Patterns

Simple case studies use `CaseStudyHeader`, content sections, and `ProjectImage`.

Editorial case studies such as GoRight and Arrowhead use:

- `CaseStudyProjectHeader`
- `CaseStudySectionHeading`
- `CaseStudyPointsGrid`
- `CaseStudyCallout`
- `CaseStudyStatement`
- `CaseStudyDecisionBlock`
- `CaseStudyFigure`
- `CaseStudyImagePair`

For callouts/results boxes, align content left and let text fill the available width. This was fixed on GoRight and Arrowhead after browser annotations showed centered or capped text felt misplaced.

## Verification

Before handing off layout or design changes:

- Run `npm run lint`.
- Run `npm run build` when touching shared components, app routes, Next config, font loading, or global CSS.
- Run `git diff --check`.
- For visual changes, check at least mobile `390px`, tablet `768px`, and desktop `1440px`. Headless Chrome at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` works for screenshots when the in-app browser bridge is unreliable.
- Keep previews local unless the user explicitly asks to push, deploy, or open a PR.

## Git

- The project has previously pushed directly to `main` for small verified changes, but do not push unless the user asks.
- The worktree may contain user-approved in-progress design edits. Never revert unrelated changes.
