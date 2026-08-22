# Design System

This document is the living design-system reference for `analdo.me`. Keep it updated whenever tokens, shared component styling, responsive rules, or accessibility patterns change.

## Principles

- Quiet, editorial portfolio for a senior product designer.
- Dark canvas, restrained contrast, and generous spacing.
- Real product imagery carries the work; avoid decorative fillers.
- Components should feel precise and usable, not ornamental.
- Accessibility and visual polish are part of the same system: readable type, visible focus, motion safety, and clear hierarchy.

## Source Files

- Global tokens and global styles: `src/app/globals.css`
- Font setup: `src/app/layout.tsx`
- Homepage cards: `src/components/case-study-card.tsx`
- Sidebar/identity block, shared by the homepage and case studies on the new system: `src/components/home-sidebar.tsx`
- Mobile top bar + menu, mobile footer: `src/components/mobile-top-bar.tsx`, `src/components/mobile-footer.tsx`
- Contact icons for the new system: `src/components/contact-glyph.tsx` (distinct from `src/components/social-icon.tsx`, which `case-study-editorial-sidebar.tsx` still uses — see the Homepage Sidebar / Mobile Top Bar sections)
- Chips: `src/components/chip.tsx`
- Editorial callouts: `src/components/case-study-callout.tsx`
- Case study images and figures: `src/components/project-image.tsx`, `src/components/case-study-figure.tsx`

## Color Tokens

Defined in `src/app/globals.css` under `@theme inline`.

| Token | Value | Usage |
| --- | --- | --- |
| `--color-dark-primary` | `#121212` | Site background and card base |
| `--color-stroke-dark` | `#282828` | Default borders and subtle surfaces |
| `--color-gray-dark` | `#535353` | Elevated border/hover accents |

Common opacity usage:

- Primary text: `text-white`
- Secondary text: `text-white/70` or nearby values such as `text-white/68`
- Chip text: `text-white/72`
- Chip border: `border-white/15`
- Chip fill: `bg-white/[0.04]`

## Radius Tokens

Chips, skip-links, `MobileTopBar`'s bar/panel, `HomeSidebar`, and — as of the
second homepage iteration — `CaseStudyCard`'s `md`+ surface and image all
round to the same `rounded-token` (4px). Everything else sitewide (callouts,
results boxes, the previous card treatment) stays sharp (`rounded-none`).
This is a partial reversal of the original all-sharp-except-chips rule,
scoped to the homepage redesign: the new Figma pass rounds cards/images to
match chips rather than keeping them sharp.

| Token | Value | Usage |
| --- | --- | --- |
| `--radius-token` | `4px` | Chips, skip-links, and — since the second homepage iteration — `CaseStudyCard`, `HomeSidebar`, `MobileTopBar` |
| `--radius-token-lg` | `0px` | Unused — kept at 0 for any future mid-size surface |
| `--radius-token-xl` | `0px` | Unused outside the homepage now that `CaseStudyCard` moved to `rounded-token` |

Elsewhere on the site (case-study pages, `/about`, callouts, results boxes)
the original sharp-corners rule still applies — this change is scoped to the
homepage-only redesign pass, not a sitewide flip. Below `md`, `CaseStudyCard`
stays sharp regardless (`rounded-none`), matching its own full-bleed mobile
treatment — see its own section below.

## Typography

Three-tier system, all via `next/font/google` in `src/app/layout.tsx`, each a
variable font loaded with `subsets: ["latin"]`, `display: "swap"`, and
explicit fallbacks (no `weight` array needed — arbitrary CSS font-weight
values interpolate across each family's variable range, same as the previous
single-font setup did):

| Role | Family | CSS variable | Fallback |
| --- | --- | --- | --- |
| Heading | Space Grotesk | `--font-space-grotesk` | `ui-sans-serif, system-ui, sans-serif` |
| Body / links | Noto Sans | `--font-noto-sans` | `ui-sans-serif, system-ui, sans-serif` |
| Labels / chips / captions / meta | JetBrains Mono | `--font-jetbrains-mono` | `ui-monospace, Menlo, Consolas, monospace` |

This replaced an earlier single-family Inconsolata-everywhere setup. The
three variables feed `@theme inline` in `globals.css` as `--font-heading`,
`--font-sans` (Tailwind's body/default slot — Noto Sans is the site's base
voice, applied to `body`), and `--font-mono` (Tailwind's built-in mono slot,
available as the `font-mono` utility).

**Font-family is never baked into a shared size token** — `text-body-h3`, for
example, is used for both genuine prose (the homepage sidebar's `h1`
statement, card descriptions) and short labels (`Chip`, `CaseStudyYear`'s
`YEAR` caption, About's date/location lines). Baking a family into that one
size class would force both uses into the same voice. Instead:

- Every heading-scale utility (`text-heading-h1` through `h5`,
  `text-project-subtitle`, and `text-overline`) gets `font-family:
  var(--font-heading)` in `globals.css`, in `@layer base` so a `font-mono` at
  the call site still wins (utilities is the later layer). This used to be
  unlayered — which beat every layered utility regardless of specificity and
  silently ignored `font-mono` on any heading-scale element — until the
  homepage redesign below needed the override and exposed the gotcha.
  `text-overline` is included deliberately: it's the same element that
  upgrades to `text-project-subtitle` at `md` in `CaseStudyProjectHeader`, so
  both must share a family or that one piece of copy would visibly swap
  typefaces at the breakpoint.
- Everything else defaults to Noto Sans (the `body` element's font-family),
  which is correct for prose and for interactive text links (`Resume`,
  `Back to portfolio`, `Contact me`/`LinkedIn`/`GitHub`, deck buttons) — the
  working rule is **links stay body voice, static labels get mono**.
  Genuinely mono contexts opt in explicitly with the `font-mono` utility at
  the call site: `Chip`, `CaseStudyYear`'s `YEAR` caption,
  `CaseStudyProjectHeader`'s `ROLE`/`TOOLS` captions,
  `CaseStudyDecisionBlock`'s label, `CaseStudyNext`'s "Next case study"
  eyebrow, `CaseStudyFigure`'s caption, About's job-date/location lines and
  `DESIGN`/`FRONT-END & TOOLS` group labels, the two case-study closing
  pull-quote attribution lines, and the deck's `SlideEyebrow`, platform-view
  captions, HUD slide counter, and lightbox caption.

Global rendering:

- `font-feature-settings: "kern" 1, "liga" 1, "calt" 1`
- `text-rendering: optimizeLegibility`

**Homepage-only exception (second iteration):** the new Figma pass for `/`
is JetBrains Mono end-to-end — headings and prose included, not just labels.
This is scoped to the homepage's own components (`HomeSidebar`,
`MobileTopBar`, `CaseStudyCard`, and the mobile-only hero block in
`page.tsx`), applied with explicit `font-mono` at each call site rather than
by repointing the global `--font-sans`/`--font-heading` tokens — those stay
Space Grotesk/Noto Sans for every other route (`/about`, all five case
studies), since this redesign pass is homepage-only. Do not read this as a
sitewide typography change; it's a local override, the same mechanism as any
other `font-mono` opt-in, just applied more broadly within one page's own
components than elsewhere on the site.

### Type Tokens

| Token | Size | Line Height | Weight | Font | Notes |
| --- | --- | --- | --- | --- | --- |
| `text-heading-h1` | `clamp(2.5rem, 2.1rem + 1.25vw, 3rem)` | `1.12` | `600` | Heading | Page-level display |
| `text-heading-h2` | `clamp(2rem, 1.72rem + 0.9vw, 2.5rem)` | `1.18` | `600` | Heading | Large section statements |
| `text-heading-h3` | `clamp(1.75rem, 1.6rem + 0.5vw, 2rem)` | `1.25` | `600` | Heading | Case-study page titles on mobile / section emphasis |
| `text-project-subtitle` | `clamp(1.5rem, 1.2rem + 0.95vw, 2rem)` | `1.25` | `400` | Heading | Case-study subtitles |
| `text-overline` | `clamp(1.125rem, 1rem + 0.45vw, 1.5rem)` | `1.35` | `500` | Heading | Eyebrows/section labels |
| `text-heading-h4` | `1.5rem` | `1.3` | `600` | Heading | Card titles and compact headings |
| `text-heading-h5` | `1.25rem` | `1.4` | `600` | Heading | Small headings |
| `text-body-h1` | `1.125rem` | `1.65` | `400` | Body (default) | Large body copy |
| `text-body-h2` | `1rem` | `1.6` | `400` | Body (default) | Default body copy |
| `text-body-h3` | `0.875rem` | `1.5` | `500` | Body by default, `font-mono` where used as a label | Labels, chips, captions, and some small prose — see above |

"Font" above is the token's *default* — `text-body-h3` is the one size that
genuinely serves both voices depending on where it's used, per the rule
above.

Rules:

- Minimum readable UI text is 14px (`text-body-h3`).
- Avoid `font-light` or 300-weight body copy.
- Use `text-balance` for headings and short display statements.
- Use `text-pretty` for paragraphs.
- Use semantic heading elements, not styled paragraphs.

## Layout And Breakpoints

Page containers use `max-w-[1280px]`.

Standard page padding:

- Mobile: `px-6`
- Tablet: `md:px-10`
- Desktop: `lg:px-16`

Standard visual QA widths:

- Mobile: `390px`
- Tablet: `768px`
- Desktop: `1440px`

### Header

There is no shared `SiteHeader` anymore — it was homepage-only and was removed once the redesigned homepage stopped using it (see Homepage Sidebar below). `CaseStudyHeader` is used by `/about` and the three showcase case studies (Forty5Park, Uber Suite, Github's Security Findings). It wraps its "Back to portfolio" link in `<nav aria-label="Case study">`. The two editorial case studies (GoRight, Arrowhead Transit) use neither `SiteHeader` nor `CaseStudyHeader` — see Editorial Sidebar below.

### Homepage Sidebar

File: `src/components/home-sidebar.tsx`

Rebuilt for a second Figma iteration (mobile + tablet frames, desktop
specified as "an extension of tablet"), then generalized to a second caller
once the Forty5Park case study moved to the same system. Holds: name/role
lockup (plain text, not a link), the bio statement, the "based in / working
with" tool sentence, a `/ Works` (→ `/`) / `/ Resume` (→ `/about`) nav pair,
contact links (`ContactGlyph` + label), and a `© Analdo Gomez / 2026` line —
all `font-mono`, per the Typography section's homepage-only(-and-onward)
exception above.

**Shared with case-study pages, via a prop, not a second component.** The
bio statement is the homepage's own `h1` there, but a case-study page's `h1`
is the project title — a page can only have one — so callers pass
`bioAs="h1" | "p"` (default `"h1"`, so the homepage call site is unchanged).
This replaces what the old (pre-redesign) system did with two separate
components, `HomeSidebar` and `EditorialSidebar` — see Case Study Sidebar
below for why the *editorial* case studies (GoRight, Arrowhead) still use
the old one for now.

**`md:fixed`, not `sticky` or a stacked block.** `md:fixed md:inset-y-0
md:left-0 md:w-80` (320px) pins the sidebar flush to the viewport's
top/left/bottom edges at every scroll position — a true app-shell rail, not
a scroll-until-it-hits-the-top column (an earlier pass here used `sticky`;
verify against this file if you find stale references elsewhere). Below
`md`, it's `hidden` entirely; each page renders its own top-bar-plus-inline-
content mobile treatment instead (see Mobile Top Bar below).

Because `fixed` removes the sidebar from document flow, **every page using
it must offset its own content**: `md:pl-[368px] lg:pl-[384px]` (320px
sidebar + that tier's own gutter) on the content wrapper, and `md:pl-80` on
any full-width element below `<main>` that would otherwise run underneath
the sidebar (e.g. `CaseStudyNext` — see its own section). This is manual
per page, not automatic, since the sidebar and its content aren't siblings
in a flex/grid relationship anymore.

`border-r border-stroke-dark` (not a full box): flush against the
viewport's own edges, a full border would double up on the frame. Reads as
a structural divider, matching how borders are used sitewide.
`overflow-y-auto` guards against a viewport short enough that the sidebar's
own content doesn't fit.

`/ Works` always renders active (bold, full white) on every page this
mounts on — no `usePathname` check or client-component conversion. Every
Figma frame that includes this sidebar (homepage, both case-study types)
shows the identical static state, read as intentional: "Works" names the
homepage's role as the work index, and every page carrying this sidebar is
either that index or a piece of the work it indexes.

The Figma sidebar's copyright is 12px; kept at `text-body-h3` (14px) instead
— the site's established minimum readable size — rather than copied
literally.

### Mobile Top Bar

File: `src/components/mobile-top-bar.tsx`

Mobile-only (`md:hidden`) replacement for the previous static `border-b`
bar: a `fixed inset-x-6 top-6` bar reading "Analdo Gomez" plus a menu
toggle, `rounded-token`, `bg-dark-primary`, the same
`shadow-[0_0_0_1px_rgba(255,255,255,0.08)]` resting ring `CaseStudyCard`
uses at `md`+. `inset-x-6 top-6` (24px) matches the Figma frame's own hero
padding, not `main`'s `MobileNav` 16px pill inset — the two are separately
specced, not a copy of one another.

Figma only supplies the bar's collapsed state; the expanded menu (nav +
contact links) is this component's own design, but reuses the same
accessible dialog mechanics `main`'s `MobileNav` established: real
`role="dialog"` + `aria-modal`, dismissible via the × button, Escape, or the
`bg-black/50` scrim, body scroll locked while open, `autoFocus` on the Close
button. An intentional client leaf, the branch's second one after
`CaseStudiesDeck`.

The menu icon is the exact path data exported from the new Figma iteration's
`site-header/menu-icon` node — which turned out to be the identical four-bar
mark `main`'s `MobileNav` already uses — recoloured to `currentColor`. Do
not re-trace by hand; re-export if the design changes.

The page's own `pt-24` (see Homepage Sidebar above) is tuned to this bar's
height (24px inset + ~48px bar + breathing room) so mobile content clears
it, the same idea as `main`'s `pt-20`-for-`MobileNav` convention, just a
different number for a differently-sized bar.

### Mobile Footer

File: `src/components/mobile-footer.tsx`

Mobile-only (`md:hidden`) copyright + icon-only social row for pages on the
new sidebar system — `HomeSidebar`'s own copyright line covers the same
role from `md` up, so this never renders alongside it. Extracted out of the
homepage's `page.tsx` once Forty5Park needed the identical block; both call
it now rather than each keeping their own copy.

### Case Study Sidebar (new system)

Forty5Park is the first case study moved to the redesigned sidebar —
`HomeSidebar bioAs="p"` plus `MobileTopBar`/`MobileFooter`, the exact same
components the homepage uses, not a dedicated case-study sidebar component.
Its own page comments explain why: the surrounding text blocks (YEAR meta,
intro statement, section headings) are written inline in
`case-studies/forty5park/page.tsx` rather than through the shared
`CaseStudyYear`/`CaseStudyIntroBlock`/`CaseStudySectionBlock` components,
since those are still used by Uber Suite and Github's Security Findings
(not yet moved to this system) and editing them in place would change those
pages' typography too.

Two structural things worth carrying forward to the next case study moved
to this system:

- **Text caps at `max-w-[720px]`, stacked in a single column** — the title,
  YEAR meta, and every paragraph/heading pair. This replaced an early
  attempt that copied `CaseStudyIntroBlock`/`CaseStudySectionBlock`'s
  `md:flex-row` side-by-side split literally; the actual Figma frame has no
  such split, just a single reading column, and the side-by-side version
  read as cramped once corrected.
- **Images opt into `roundedClassName="rounded-token"`** on each
  `ProjectImage` call (that prop already existed, unused elsewhere on this
  branch until now) rather than changing `ProjectImage`'s own default —
  which stays `rounded-none` for every other case study's images.
- **`CaseStudyNext` needs a manual `md:pl-80` wrapper** on any page using
  the fixed sidebar, since the sidebar isn't a flex/grid sibling of
  anything below `</main>` — see Homepage Sidebar above.

### Editorial Sidebar

File: `src/components/case-study-editorial-sidebar.tsx` (`EditorialSidebar` + `EditorialMobileBar`)

GoRight and Arrowhead Transit use a persistent identity sidebar instead of `CaseStudyHeader`, inspired by `HomeSidebar` and the Figma wireframe at node 268:1037 — adapted, not a literal port, per that node's own "don't copy exactly" brief. Two real differences from `HomeSidebar` drove the adaptation rather than reuse:

- The bio statement here is a plain `<p>`, never the page's `h1` — each case study's own title (in `CaseStudyProjectHeader`) owns that role, and a page can only have one `h1`.
- The name/role lockup is a real `<Link href="/">` (with its own hover/active dim, since it isn't a single-tone element `text-white/60` alone would cover) and a separate "← Back to portfolio" link sits above it, reusing `CaseStudyHeader`'s exact arrow-icon-and-slide treatment — this page isn't the homepage, so it needs an explicit way back, which the wireframe itself didn't show.

Responsive split, `lg`-only for the full sidebar rather than `HomeSidebar`'s three-tier stack: below `lg`, `EditorialMobileBar` renders a compact `border-b border-stroke-dark` bar with just the back link (matching `CaseStudyHeader`'s existing mobile/tablet treatment); `EditorialSidebar` itself is `hidden lg:flex`. The wireframe only supplied a desktop frame, and stacking the full bio/tools/icons block above a long case study's own title on a phone would push real content too far down — content should lead there, not identity.

At `lg`, `EditorialSidebar` is `lg:sticky lg:top-16 lg:w-72`, matching `HomeSidebar`'s exact sticky/width treatment (see above) for consistency between the two sidebar-based layouts. The page wrapper (`mx-auto max-w-[1280px] ... lg:flex-row lg:gap-12 lg:p-16`) also matches the homepage's padding scale rather than the site's standard case-study padding, since both are the same "sidebar layout family" — distinct from the simpler single-column showcase-case-study/`/about` family that keeps `CaseStudyHeader` and the sitewide `px-6 md:px-10 lg:px-16` scale.

Both editorial pages drop `SiteFooter` — the sidebar's own `© 2026` line covers that role, same reasoning as the homepage. `CaseStudyNext` still renders after `</main>`, full-width and unaffected by the sidebar, exactly as on every other case study page.

### CaseStudyYear

File: `src/components/case-study-year.tsx`

A `YEAR` label at `text-body-h3 text-white/70` above the year at `text-body-h2 text-white`, reusing the `ROLE`/`TOOLS` grammar. Renders a real `<time dateTime>` element so the date is machine readable.

`CaseStudyProjectHeader` places it as the third column of its meta row (ROLE / TOOLS / YEAR). The three showcase pages, which have no meta row, place it directly under their `h1`. Every case study shows a year — keep it that way when adding new work.

### CaseStudyNext

File: `src/components/case-study-next.tsx`

The onward link closing every case study. A full-width `border-t border-stroke-dark` band holding a `text-body-h3 text-white/70` "Next case study" eyebrow above the project name at `text-heading-h4`, with the next project's cover image bleeding edge-to-edge on the right. The arrow reuses the `CaseStudyCard` idiom — hidden at rest, sliding in from `-translate-x-1` on hover — and the whole block dims with `hover:opacity-70` / `active:opacity-50` because it mixes two text tones; the image also zooms to `scale-105` on hover, the same `CaseStudyCard` idiom.

Deliberate exception to the site's standard `px-6 md:px-10 lg:px-16` page padding: only the text side carries the responsive `pl-*` inset (`pl-6 md:pl-10 lg:pl-16`) — the image thumbnail has no right-side padding or rounding, so it sits flush against the `max-w-[1280px]` container's own right edge. This is the one image treatment on the site that isn't padded and rounded; it was chosen deliberately as a more editorial, image-forward closing beat, distinct from every other framed image. A `min-h-28 md:min-h-32 lg:min-h-40` floor on the text column keeps the image band a reasonable height even when the project title is short and wouldn't otherwise stretch the row.

It renders between `</main>` and `SiteFooter` on the pages that still use a footer (the three showcase case studies and `/about`), outside `main`, as its own `nav` landmark. The homepage and the two editorial case studies have no `SiteFooter` — their own sidebar's `© 2026` line covers that role instead, but `CaseStudyNext` still renders on the editorial pages.

### Share Cards

The site-wide Open Graph card is generated at build time by `src/app/opengraph-image.tsx` (1200×630) and uses the deck's own restraint: `#121212` canvas, white headline, `#ffffffb3` kicker, `#ffffff66` domain. Case studies override it with their real project cover image, since actual product imagery outperforms a generated type card for specific work.

### Footer

The shared `SiteFooter` centers its copyright and link group on mobile. From `md` upward it returns to a horizontal, left/right-aligned layout. Keep these elements as plain text links with the global focus treatment. Its Storybook references include a fluid story and pinned 390px, 768px, and 1440px states so this alignment change remains visible in component review.

Vertical padding is `py-6` (24px top/bottom) at every breakpoint — deliberately not scaled up at `lg`, so the footer's height stays identical between tablet and desktop. Only horizontal padding follows the standard `px-6`/`md:px-10`/`lg:px-16` scale.

### Storybook

Storybook is the isolated component reference for the portfolio. Its stories live beside shared components in `src/components/` and load the same global tokens and Tailwind styles as the app. Keep the canvas dark (`#121212`) so component contrast and hierarchy are assessed in their intended context.

Document component variants that affect responsive behavior, content length, icon use, or accessibility. Storybook's viewport toolbar mirrors the portfolio's 390px, 768px, and 1440px review widths; use fluid stories to inspect any of those sizes. Pin dedicated reference stories to each width when a component changes layout across breakpoints.

Review the accessibility add-on's Canvas results as part of component QA. The current reference stories cover `Chip`, `CaseStudyCard`, `CaseStudyHeader` (`case-study-header.stories.tsx` — `SiteHeader` was removed along with its story once the redesigned homepage stopped using it), and `SiteFooter`.

## Components

### Chip

File: `src/components/chip.tsx`

Current style:

```tsx
rounded-token border border-white/15 bg-white/[0.04] px-3 py-1.5 text-body-h3 whitespace-nowrap text-white/72
```

Use chips for concise metadata only. Keep them light; they should support the hierarchy rather than compete with titles.

The shared component supports an optional 14px decorative icon. Use this only when a chip identifies a product or tool and the visible text label supplies its accessible name. About's skills chips (Figma, Claude Code, Codex, GitHub, Storybook) use their corresponding brand marks; project metadata chips stay text-only.

The homepage's tool sentence intentionally does not use `Chip` — see Homepage Sidebar Copy below for that pattern.

### CaseStudyCard

File: `src/components/case-study-card.tsx`

Rebuilt for the second homepage iteration (see Homepage Sidebar below) to
match a new Figma pass: stacked image-then-content at every breakpoint
(replacing the previous `md:flex-row` side-by-side split), and every text
element explicit `font-mono` — this iteration makes card copy mono too, not
just labels.

- Entire card is a `Link`.
- Below `md`: no card surface — image is full-bleed and sharp
  (`rounded-none`), content sits directly on the page background with 24px
  horizontal padding. Matches the Figma mobile card node, which has no
  background or border of its own.
- `md` and up: a `bg-stroke-dark` surface with `p-6` on every side,
  `rounded-token` (4px) on both the card and the image. This iteration's
  cards and images round to match chips — a reversal of the sharp-corners
  rule the rest of the site (and this branch's own previous card) used.
  Image height is a fixed `h-[220px]` at every breakpoint, not a
  content-driven `md:self-stretch` row like the previous version.
- Hover (`md`+): shadow strengthens from a 1px ring to a firmer one, image
  zooms `scale-105`.
- Active: `scale-[0.99]` at every breakpoint.
- Title: `font-mono text-heading-h5 font-bold` — `font-bold` overrides the
  token's own 600 weight since the Figma spec is explicitly 700 here.
- Description: `font-mono text-body-h2 md:text-body-h3 text-white/70` — a
  real step down in size at `md`, matching the Figma tablet card's smaller
  14px copy vs. the mobile card's 16px.
- The homepage drops the leading type chip ("Case Study"/"Showcase") from
  every card for this iteration — `page.tsx` passes `chips.slice(1)`, since
  `lib/case-studies.ts`'s `chips[0]` is always that tag. The underlying data
  keeps it; only the homepage's render of it changes.

Card title hierarchy should be stronger than body copy. Avoid making body text as large or visually loud as the title.

### CaseStudiesDeck

File: `src/components/case-studies-deck.tsx`

The presentation route is a focused dark, full-viewport experience at `/case-studies-deck`. It opens with two image-led case-study choices before entering either deck. The control is a deliberately isolated client component because the active slide changes with buttons and keyboard keys.

- Keep the base canvas `dark-primary` with only white-opacity hierarchy; do not introduce a project-specific accent color.
- Use the same 24px, 40px, and 64px responsive page padding as the rest of the portfolio.
- Slides use real case-study imagery, large editorial type, and sparse borders rather than dashboards or dense card layouts.
- Controls support buttons plus Left/Right Arrow, Page Up/Page Down, Home, and End keys. The first and final slide return to the chooser through their controls.
- There is no persistent header or footer bar. All chrome for an active deck is consolidated into two floating elements so slide content can use the full viewport: a 2px progress bar fixed to the top edge (`bg-white/10` track, `bg-white` fill sized to `(slideIndex + 1) / slideKinds.length`, animated with `transition-[width] duration-300`), and a single control cluster fixed to the bottom-right corner (`bottom-6 right-6`, scaling to `lg:bottom-16 lg:right-16` with the standard responsive padding steps) holding the slide counter, "Choose a case study", the conditional "View full case study" link, and Previous/Next. Neither renders on the chooser screen — there is nothing to show progress on or navigate between until a project is selected.
- Process and platform visuals expand into a full-viewport lightbox. The image button must retain descriptive alternative text, the visible caption names the view, and Escape, the close button, or the scrim close the lightbox.
- Additional platform-view slides follow the main platform slide. They show only enough views to orient the audience; larger examination belongs in the lightbox. Each thumbnail carries a visible `text-body-h3 text-white/70` caption naming the view below it, in addition to the lightbox label, so the grid reads without requiring a click.
- The closing slide is an intentional centered pull-quote (`text-center`, `mx-auto`), distinct from the earlier "design move" statement slide's left-aligned layout. It is also the largest type in the deck (`clamp(3.4rem,9vw,9rem)`). This is deliberate: the ending should read as the bigger of the two big-statement beats, not a repeat of the midpoint.
- Process and platform-view images that are dark UI screenshots get a `border border-white/10` frame so they hold a visible edge against the dark deck canvas instead of blending into it.
- Every `SlideEyebrow` (kicker) renders its label above a small `h-px w-8 bg-white/35` rule. This is a system-wide component, not a one-off: it applies to every slide kind and the chooser screen, giving the deck a consistent quiet "kicker + rule" mark without introducing any new color.
- The "two decisions" slide's 2-up grid carries a `lg:divide-x lg:divide-white/15` hairline between the two cards (with matching `lg:px-6 lg:first:pl-0 lg:last:pr-0` padding on each), mirroring the same divide-x/px idiom already used on the results slide's stat row. Reserved for slides that are genuinely a two-panel comparison — not a general card-grid treatment.
- The process slide's image grid carries a plain `0{n}` index caption under each thumbnail, in the same `text-heading-h5 text-white/42` treatment as the problem slide's numbered list. This ties the two numbered/sequential moments in the deck together visually without inventing new caption copy.
- Results numerals are sized at `clamp(2.25rem,4.2vw,4.5rem)` — large enough to read as the dominant element in each stat tile, but still clearly subordinate to the section headline above the row.
- Slide transitions are direction- and weight-aware, not one blanket animation. The wrapping slide `<div>` always carries `.animate-deck-slide` (280ms fade, default forward variant translating in from the right) plus a modifier class computed from navigation state:
  - `.deck-enter-back` when the visitor moved backward (Previous, Left Arrow, Page Up, or Home), translating in from the left instead. This gives Next/Previous real spatial continuity — forward and backward feel like opposite directions through the same space, not a single generic fade.
  - `.deck-enter-statement` on the deck's two big-idea beats only (`signal` and `close`), overriding direction: a slower 380ms entrance with more vertical travel (14px) and a subtle 0.985→1 scale, so those two beats land with more weight than a routine content slide regardless of which way the visitor navigated in from.
  - Neither modifier uses spring/bounce easing; both share the same `cubic-bezier(0.16, 1, 0.3, 1)` ease-out-expo as the rest of the site's motion.
- Within a slide, primary groups and repeated grid items enter with a 420ms fade-and-rise transition, staggered at 60ms intervals. Apply the `deck-stagger` class only to repeated content grids so supporting items reveal in order without animating every nested element.
- The "two decisions" slide's 2-up grid uses `deck-stagger-converge` instead of `deck-stagger`: the first card reveals in from the left, the second from the right, on the same 420ms/120ms-180ms timing. This is a narrative-specific choice — reserved for the one slide where the content literally is two choices meeting in the middle — not a general-purpose replacement for `deck-stagger`.
- The image lightbox fades its scrim in (`.animate-lightbox-scrim`, 200ms opacity) and its media container in with a subtle scale (`.animate-lightbox-media`, 260ms, 0.97→1), rather than appearing instantly, matching the same ease-out-expo curve.
- Maintain the global focus ring and reduced-motion behavior. Navigation is functional without hover and does not depend on animation. The global `prefers-reduced-motion: reduce` rule in `globals.css` zeroes every animation/transition duration site-wide, including all deck and lightbox variants above, with no per-component opt-out needed.

### CaseStudyCallout

File: `src/components/case-study-callout.tsx`

Current style:

```tsx
flex w-full animate-fade-up items-start justify-start rounded-none border border-gray-dark p-8
```

Inner paragraph:

```tsx
w-full text-pretty text-body-h1 text-white
```

Callouts and results boxes should fill the available width and align left. Do not center or cap the paragraph unless the block is intentionally a centered pull quote.

### Results Boxes

GoRight and Arrowhead results boxes follow the callout rule:

- Container: full width, left aligned.
- Title: full-width `text-heading-h5`.
- Body: full-width `text-body-h2`, upgraded at larger breakpoints as needed.
- No `max-w-[70ch]` cap inside these boxes.

## Motion

Global animation:

```css
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

`.animate-fade-up` uses `700ms cubic-bezier(0.16, 1, 0.3, 1) both`.

Use motion for page-load presence only. Do not add scroll-triggered motion without changing the architecture intentionally.

Reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Focus And Accessibility

Global focus:

```css
a:focus-visible,
button:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.7);
  outline-offset: 4px;
  border-radius: 2px;
}
```

Every page must include:

- `main#main-content`
- Header skip link targeting `#main-content`
- Real headings in logical order
- Real image alt text for meaningful images

## Homepage Sidebar Copy

This copy lives in `HomeSidebar` now (see the Homepage Sidebar component section above), not in a large hero — the redesign dropped the old hero-statement treatment entirely. Current tool sentence — plain text, not `Chip`:

`Based in Colombia, working globally with` `[icon] Figma` `,` `[icon] Claude Code` `and` `[icon] Codex`

Each tool name is a decorative `ToolIcon` (`size-3`) plus its label in one `inline-flex` item at `text-body-h3 text-white/70` — no border, no background, matching the surrounding sentence rather than standing apart as a tag. The comma is a separate flex item. The whole line is `flex flex-wrap` at every breakpoint (no mobile-stack/`md`-row split) since the sidebar column is narrow everywhere, not just on mobile.

## Documentation Upkeep

When changing the visual system:

1. Update `src/app/globals.css` for token/source changes.
2. Update this file when component styles, tokens, or rules change.
3. Update `AGENTS.md` when the change affects future implementation behavior.
