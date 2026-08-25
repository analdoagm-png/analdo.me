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
- Contact icons: `src/components/contact-glyph.tsx` — the site's only icon set now that `social-icon.tsx` is gone (see Case Study Sidebar section)
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

**Mono-for-prose now covers the whole `(sidebar-shell)` system, not just the
homepage.** This started as a homepage-only exception (`HomeSidebar`,
`MobileTopBar`, `CaseStudyCard`, the mobile hero block) in an earlier Figma
pass, but every route that followed — `/about` and all five case studies —
adopted the identical pattern: `font-mono` on body prose, not just labels,
applied explicitly at each call site rather than by repointing the global
`--font-sans`/`--font-heading` tokens. A typography audit confirmed this
directly (23 of 28 component/page files under `(sidebar-shell)` pair
`font-mono` with body-text-scale classes) after this doc's earlier
"homepage-only, every other route stays Space Grotesk/Noto Sans" framing
was found to no longer match the code. The one route that genuinely still
runs the original proportional-font system is `/case-studies-deck` — a
separate presentation route outside `(sidebar-shell)` entirely, not
described by anything in this section. Read this as: mono-for-prose is this
system's actual voice everywhere except the deck, not a homepage-local
override — `--font-sans`/`--font-heading` are unchanged (still Noto
Sans/Space Grotesk) because the opt-in stays per-call-site `font-mono`
rather than a token repoint, which is what keeps the deck unaffected.

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

There is no shared `SiteHeader`, `CaseStudyHeader`, or `SiteFooter` anymore — all three were homepage/case-study-era components, and all three were deleted once every route moved to the new sidebar system (see Case Study Sidebar below for the full list of what was removed and when). Every route's chrome is now `(sidebar-shell)/layout.tsx` — see Sidebar Shell Layout below.

### Sidebar Shell Layout

File: `src/app/(sidebar-shell)/layout.tsx`

**Every route on the site** — the homepage, `/about`, and all five case
studies — lives inside this route group now, sharing one `layout.tsx` that
renders the skip link, `MobileTopBar`, `HomeSidebar`, and `MobileFooter`
exactly once. `(sidebar-shell)` is a route group: the parentheses are
invisible in the URL, so `/about` and `/case-studies/goright` are
unaffected — only the file location moved. Each page under it (`page.tsx`,
`about/page.tsx`, `case-studies/goright/page.tsx`, etc.) now returns *only*
its own content column; the shell is no longer duplicated per page. Only
`/case-studies-deck` sits outside this group — a self-contained
full-viewport presentation route with no header/footer chrome of its own
kind to share.

**Why this exists.** Before this layout, every page independently rendered
its own copy of `HomeSidebar`/`MobileTopBar` — visually identical across
routes, but a distinct component instance each time from React's
perspective, since Next.js unmounts a route's whole tree on navigation
unless the shared part lives in a common ancestor layout. That remount
replayed the sidebar's `animate-fade-up` entrance and produced a visible
jump every time you clicked between `/ Works` and `/ Resume`. A shared
layout is the actual fix, not a CSS one: `{children}` (each page's content)
still unmounts and remounts on navigation — so per-page `animate-fade-up`
content transitions keep firing exactly as before — but `HomeSidebar` and
`MobileTopBar`, rendered once in the layout, are the same DOM node across
every navigation within the group and never re-animate or flash. (Verified
directly: tagging the sidebar's DOM node with a marker attribute before a
client-side navigation and confirming the same node — same marker — is
still there afterward, rather than a fresh one.)

**`bioAs`/`activeNav` are derived from `usePathname`, making this layout a
client component** — the sidebar no longer lives inside any individual
page to receive them as props. `bioAs` is `"h1"` on `/` **and** `/about`
(both are "about Analdo himself" pages, so the sidebar's identity statement
carries the `h1` role for both instead of each page restating a variant of
it — see Homepage Sidebar below for why `/about` moved to this too), `"p"`
everywhere else (a case-study page's `h1` is its own project title, not the
sidebar's bio statement). `activeNav` is `"resume"` only on `/about`,
`"works"` everywhere else — this replaced an earlier, incorrect assumption
that `/ Works` should always render active regardless of route (based on
every Figma frame showing the identical static state); the real
requirement is a genuine current-page indicator, confirmed by explicit
request. Server Components (every page under this layout) can still be
passed as `children` into a Client Component layout without themselves
becoming client components — this is a normal, supported React Server
Components pattern, not a workaround.

### Homepage Sidebar

File: `src/components/home-sidebar.tsx`

Rebuilt for a second Figma iteration (mobile + tablet frames, desktop
specified as "an extension of tablet"), then generalized to every page in
the `(sidebar-shell)` route group. Holds: name/role lockup (plain text, not
a link), the bio statement, the "based in / working with" tool sentence, a
`/ Works` (→ `/`) / `/ Resume` (→ `/about`) nav pair, contact links
(`ContactGlyph` + label), and a `© Analdo Gomez / 2026` line — all
`font-mono`, per the Typography section's exception above. It's rendered
exactly once, by `(sidebar-shell)/layout.tsx` — see that section for why,
and for where `bioAs`/`activeNav` actually come from now.

**`bioAs`**: `"h1" | "p"` (default `"h1"`). This no longer picks the tag on
the sidebar's own visible bio statement — that's always a plain `<p>` now.
On `/` and `/about` (`bioAs="h1"`), it instead adds one extra `sr-only`
`<h1>` as a sibling of the whole sidebar, holding the bio text (exported as
`bioStatement` from this file, so `page.tsx`'s mobile duplicate can import
it instead of hand-copying the string). Every case study passes `"p"` and
skips that extra heading — its own project title is the real `h1` there.

The `sr-only` heading has to live outside the sidebar's own `hidden
md:flex` root: `display: none` (what `hidden` sets) removes an element
from the accessibility tree, not just the visual layout, so an `h1` nested
inside that toggle would vanish from the page entirely at whichever
breakpoint hides it — not what "visually hidden but still a real heading"
is supposed to mean. `sr-only` (clip-based hiding) keeps it in the DOM and
the accessibility tree at every breakpoint while staying invisible to
sighted users everywhere, the same pattern already used for this system's
other `sr-only` section headings (`(sidebar-shell)/page.tsx`'s "Selected
Case Studies", `about/page.tsx`'s "Highlights").

This fixes a real bug a live audit caught: before it, `/` and `/about`
each shipped **two** actual `<h1>` elements in the served HTML at once —
one in the sidebar's own statement (when rendered as `<h1>`), one in each
page's separate `md:hidden` mobile duplicate — since a responsive
`hidden`/`md:hidden` toggle only ever hides one of the two per viewport,
it never removes either from the DOM. Verified with `curl` against
production, not just source inspection, since responsive Tailwind classes
make this exact bug invisible when only rendered in a browser. `About`'s
own former headline ("Product designer who builds systems...") is still
`md:hidden` there, but is now a `<p>` rather than a second `<h1>` — a
purely visual mobile duplicate, not a competing heading. This replaces
what the old (pre-redesign) system did with two separate components,
`HomeSidebar` and `EditorialSidebar` — `EditorialSidebar` is gone now that
every page shares this one instead (see Case Study Sidebar below).

**`activeNav`**: `"works" | "resume"` (default `"works"`), driving which
nav link renders bold/active (with `aria-current="page"`) versus muted.

**`md:fixed`, not `sticky` or a stacked block.** `md:fixed md:inset-y-0
md:left-0 md:w-80` (320px) pins the sidebar flush to the viewport's
top/left/bottom edges at every scroll position — a true app-shell rail, not
a scroll-until-it-hits-the-top column (an earlier pass here used `sticky`;
verify against this file if you find stale references elsewhere). Below
`md`, it's `hidden` entirely; `MobileTopBar` covers mobile instead (see
below).

Because `fixed` removes the sidebar from document flow, **every page using
it must offset its own content**: `md:pl-[368px] lg:pl-[384px]` (320px
sidebar + that tier's own gutter) on the content wrapper, and `md:pl-80` on
any full-width element that would otherwise run underneath the sidebar
(e.g. `CaseStudyNext` — see its own section). This is manual per page, not
automatic, since the sidebar and each page's content aren't siblings in a
flex/grid relationship.

`border-r border-stroke-dark` (not a full box): flush against the
viewport's own edges, a full border would double up on the frame. Reads as
a structural divider, matching how borders are used sitewide.
`overflow-y-auto` guards against a viewport short enough that the sidebar's
own content doesn't fit.

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

Figma now also specifies the expanded state (node 347:1016, `site-header`):
"Home"/"Resume" as large centered bold rows (`text-heading-h5 font-bold`,
no active/muted distinction between them — Figma shows both identically
styled, unlike `HomeSidebar`'s nav), then a `border-t` divider and three
centered 16px (`text-body-h2`, up from an earlier 14px) contact rows.
"Home"/"Resume" is a deliberate difference from `HomeSidebar`'s "/ Works"/
"/ Resume" phrasing — this frame's own copy, not a copy-paste miss.

Collapsed bar and expanded panel are **one always-mounted element**, not
two — the "Analdo Gomez" + toggle header row never unmounts; only the
content below it (nav + contacts) expands and collapses. An earlier version
rendered the expanded panel as a wholly separate element, conditionally
mounted with `isOpen ? <div> : null` — which put it in the DOM already in
its "open" state with nothing to animate from, and skipped any exit
transition entirely on close. Merging into one persistent card, with
`isOpen` only toggling classes/attributes, is what makes a real transition
possible: the content region expands/collapses via the
`grid-template-rows: 0fr -> 1fr` technique (`grid-rows-[0fr]` /
`grid-rows-[1fr]` on a `grid` wrapper, real content in a single
`overflow-hidden` child), which animates to the content's actual rendered
height with no JS measurement — 320ms, `cubic-bezier(0.16, 1, 0.3, 1)`,
this site's one established motion curve. The `bg-black/50` scrim (also
always mounted now, `pointer-events-none` and `opacity-0` while closed)
fades on the same curve at 300ms. `inert` applies to just that expanding
region now, not the whole card, since the header's toggle button must stay
reachable at every state.

The header's hamburger/close icon crossfades instead of swapping instantly:
both icons stay in the DOM, absolute-stacked in a `relative size-6` button,
trading opacity/scale/blur (0 → 1 opacity, 0.25 → 1 scale, 4px → 0 blur) on
a quicker 200ms/`cubic-bezier(0.2, 0, 0, 1)` timing — the standard
no-motion-library icon-crossfade recipe, deliberately snappier than the
panel's own transition so the icon reads as leading it. Accessible dialog
mechanics are unchanged from the original version: real `role="dialog"` +
`aria-modal`, dismissible via the × button, Escape, or the scrim, body
scroll locked while open, `autoFocus` on Close. An intentional client leaf,
the branch's second one after `CaseStudiesDeck`.

The menu icon is the exact path data exported from the Figma iteration's
`site-header/menu-icon` node — which turned out to be the identical four-bar
mark `main`'s `MobileNav` already uses — recoloured to `currentColor`. The
close icon is Figma's own `close--large` glyph (node 347:1047), same
treatment. Do not re-trace either by hand; re-export if the design changes.

Each page's own `pt-24` (see Homepage Sidebar above) is tuned to this bar's
height (24px inset + ~48px bar + breathing room) so mobile content clears
it, the same idea as `main`'s `pt-20`-for-`MobileNav` convention, just a
different number for a differently-sized bar. Like `HomeSidebar`, this is
rendered once by `(sidebar-shell)/layout.tsx` now, not duplicated per page.

### Mobile Footer

File: `src/components/mobile-footer.tsx`

Mobile-only (`md:hidden`) copyright + icon-only social row for pages on the
new sidebar system — `HomeSidebar`'s own copyright line covers the same
role from `md` up, so this never renders alongside it. Originally extracted
out of the homepage's `page.tsx` once Forty5Park needed the identical
block; now, like `HomeSidebar` and `MobileTopBar`, rendered once by
`(sidebar-shell)/layout.tsx` rather than called per page.

### Case Study Back Link

File: `src/components/case-study-back-link.tsx`

Fixed "back to the portfolio grid" affordance, `md`+ only, called
individually by all five case study pages (not rendered by the shared
layout — home and About don't need it). `hidden md:flex` below `md`: the
mobile top bar's own menu already has a "Home" link, and a second fixed
control in the same corner would duplicate it and risk overlapping
`MobileTopBar`.

Card treatment (`rounded-token`, `bg-dark-primary`, the same
`shadow-[0_0_0_1px_rgba(255,255,255,0.08)]` ring `MobileTopBar` and
`CaseStudyCard` use) so it reads as the same design language rather than a
one-off control. `top-8` matches `HomeSidebar`'s own `p-8` internal
padding — not responsive, so this isn't either — putting it at the same
height as the sidebar's "Analdo Gomez" name at every breakpoint.
`left-[368px]`/`lg:left-[384px]` matches every case study's own content
offset, so its left edge lines up with where the content column begins.
`fixed`, not inline, so it stays reachable while scrolling a case study of
any length — the same reasoning `HomeSidebar` and `MobileTopBar` already
use for their own persistent positioning.

### Case Study Sidebar (new system)

**Every case study is on the redesigned sidebar now — the migration is
complete.** All five (Forty5Park, Uber Suite, Github's Security Findings,
GoRight, Arrowhead Transit) live in the `(sidebar-shell)` route group along
with the homepage and `/about`, sharing `HomeSidebar`/`MobileTopBar`/
`MobileFooter` rather than a dedicated case-study sidebar component. There
is no page left on the old `CaseStudyHeader`/`EditorialSidebar`/
`SiteFooter`/`CaseStudyNext` system — all four of those components were
deleted (see their own note below) once GoRight and Arrowhead Transit, the
last two callers, moved off them.

Structural pattern shared by every page in the group:

- **`items-center` on the content column, with every child `w-full
  max-w-[*]`** — matches Figma's `main-content` frame exactly: text at
  `max-w-[720px]`, images at `max-w-[1280px]`. The `w-full` half is what
  makes these boxes actually *scale down* to fill the available width at
  tablet, where the content area is well under 720px once the sidebar and
  padding are subtracted, rather than staying pinned at a fixed measure.
  The `items-center` half is what centers the (width-capped) column within
  the wider content area — a definite-width flex item is **not** centered
  by `items-stretch` (the default) just because it's narrower than its
  container; that was a real bug in the first Forty5Park pass, caught by a
  direct Figma comparison and fixed after the fact.
- **Images round to `rounded-token`.** `ProjectImage`, `CaseStudyFigure`,
  and `CaseStudyImagePair` all default to it now — a real default change
  for the latter two (not just an opt-in prop), since after this migration
  every remaining caller wants it. `ProjectImage`'s own default is still an
  opt-in per call (`roundedClassName="rounded-token"`), since it has no
  other callers left to affect either way, but keeping it opt-in there
  cost nothing.
- **No `CaseStudyNext`.** Dropped entirely on every page, per explicit
  request — the persistent `/ Works` sidebar link covers the onward path
  back to the index instead. The component itself is deleted.
- **No divider lines between sections** on the two editorial pages —
  Figma's editorial frame (node 339:596) has none; generous spacing alone
  carries the separation, matching every other page on this system. The
  pre-redesign version's `Divider` (`h-px bg-gray-dark`) helper is gone.
- **Callouts and results boxes stay `rounded-none`.** Only photographic
  images round under this system — Figma's `Callout` node has no radius,
  so bordered text surfaces keep the sharp-corners rule that predates this
  redesign.
- Per-image `aspect` overrides carry over unchanged where a project's
  screenshots aren't the shared default — several of Uber Suite's,
  Github's Security Findings', and both editorial case studies' are
  portrait, near-square, or unusually wide banners.

**Editorial-specific corrections, found by comparing directly against
Figma's `case-study-desktop` frame (node 339:596) rather than carrying the
pre-redesign layout forward:**

- No project subtitle under the title (GoRight's "Merlin Platform",
  Arrowhead's "Intranet") — Figma's title node has no equivalent.
  `CaseStudyProjectHeader` dropped the `subtitle` prop entirely.
- "The Problem" and "Results" are a **stacked single column**
  (`CaseStudyPointsGrid`, rebuilt), not the pre-redesign `md:flex-row` 3-up
  grid — Figma has no multi-column version of this pattern anywhere on the
  page. "The Problem" numbers "01"/"02"/"03"; "Results" numbers
  "1."/"2."/"3." — a real inconsistency in Figma itself, not a copy error
  to normalize away, so both pages reproduce it as-is.
- Each "Decision"/"Constraint" is its own text block
  (`CaseStudyDecisionBlock`, now text-only) **followed by** a full-width
  `CaseStudyFigure` stacked directly below it — not the pre-redesign
  version's side-by-side `lg:flex-row` layout with `reverseOnDesktop`.
  Figma stacks every decision's text and figure as separate siblings, at
  every breakpoint.

`CaseStudyYear`'s value gained `font-mono` (was plain) — it renders inside
`CaseStudyProjectHeader`'s ROLE/TOOLS/YEAR row, which is now fully mono
like everything else on this system.

**Deleted as part of this migration** (all confirmed to have zero
remaining importers before removal): `case-study-header.tsx` (+ its
Storybook story), `site-footer.tsx` (+ its Storybook story),
`case-study-editorial-sidebar.tsx` (`EditorialSidebar` +
`EditorialMobileBar`), `case-study-next.tsx`, and `social-icon.tsx` (used
only by `EditorialSidebar`, so it went too). If a future page ever needs a
generic "back" link or a footer separate from the sidebar's own copyright
line, these are gone — rebuild rather than look for them.

### Share Cards

The site-wide Open Graph card is generated at build time by `src/app/opengraph-image.tsx` (1200×630) and uses the deck's own restraint: `#121212` canvas, white headline, `#ffffffb3` kicker, `#ffffff66` domain. Case studies override it with their real project cover image, since actual product imagery outperforms a generated type card for specific work.

### Footer

There is no shared `SiteFooter` component anymore — deleted along with its Storybook story once `/about`, its last caller, moved to the new sidebar system. `MobileFooter` (see Case Study Sidebar / Sidebar Shell Layout above) covers the equivalent role below `md` sitewide now; `HomeSidebar`'s own `© Analdo Gomez / 2026` line covers it from `md` up.

### Storybook

Storybook is the isolated component reference for the portfolio. Its stories live beside shared components in `src/components/` and load the same global tokens and Tailwind styles as the app. Keep the canvas dark (`#121212`) so component contrast and hierarchy are assessed in their intended context.

Document component variants that affect responsive behavior, content length, icon use, or accessibility. Storybook's viewport toolbar mirrors the portfolio's 390px, 768px, and 1440px review widths; use fluid stories to inspect any of those sizes. Pin dedicated reference stories to each width when a component changes layout across breakpoints.

Review the accessibility add-on's Canvas results as part of component QA. The current reference stories cover `Chip` and `CaseStudyCard` — `SiteHeader`'s, `CaseStudyHeader`'s, and `SiteFooter`'s stories were all removed along with their components as the site finished moving to the new sidebar system.

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

### Page-Load Stagger

Every page's content should cascade in on load, not fade up as one flat
block. `.stagger-section` (globals.css) gives every *direct child*
carrying `.animate-fade-up` an incrementing `animation-delay` by DOM
position — 60ms per step, capped at 420ms after the 8th child (content
below the fold has already finished animating by the time a reader
scrolls to it regardless of the exact delay, so extending the cascade
indefinitely on a long case study adds no real benefit past the first few
steps). Applied to the outer content wrapper on the homepage and all five
case studies — see any of those pages' own doc comments.

**Never nest two elements that are both `.animate-fade-up` in an
ancestor/descendant relationship.** Their opacities compose
multiplicatively and their `translateY`s add, reading as one softer,
slightly-off fade rather than two clean steps. A section wrapper whose
children already carry their own fade (a heading next to
`CaseStudyPointsGrid`, `CaseStudyImagePair`'s own 2-item stagger, the
homepage's `CaseStudyCard` grid) stays unanimated itself for this
reason — it simply won't get a `.stagger-section` delay (harmless, no
rule fires), and its children's own internal stagger stands alone as
that section's reveal.

`.stagger-section` only reaches *direct* children, which is why
`/about`'s Experience/Skills blocks (heading + content nested two levels
inside an unanimated wrapper) use hand-assigned `[animation-delay:Nms]`
in the same 60ms steps instead — see that page's own doc comment. Reach
for `.stagger-section` when a page's sections are flat (direct siblings
of one wrapper, true of every case study); hand-assign delays when they
aren't.

Persistent navigation chrome — `HomeSidebar`, `MobileTopBar`,
`MobileFooter`, each case study's `CaseStudyBackLink` — carries no
`.animate-fade-up` at all, by design: it should read as static structure,
not content that "loads in." Only `{children}` (the page content the
shared layout wraps) animates. See `home-sidebar.tsx`'s own doc comment
for the full reasoning, including why this holds even for
`CaseStudyBackLink`, which isn't part of the shared layout and does
remount per case study page.

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

Each tool name is a decorative `ToolIcon` (`size-3`) plus its label in one `inline-flex` item at `text-body-h3 text-white/70` — no border, no background, matching the surrounding sentence rather than standing apart as a tag. The sentence itself is **plain inline text flow inside one `<p>`**, not a `flex flex-wrap` container: the comma and connector word (`and`) are ordinary text nodes, not standalone flex items. Only each icon+label pairing gets its own `inline-flex` span. This is deliberate — a flex-row-of-chunks structure (comma and `and` as separate flex children) let the browser's line-breaking strand short trailing words like a lone "and" or "Codex" at the start of a wrapped line; plain inline flow lets it wrap at any normal word boundary instead. Same pattern, and same reasoning, for the mobile-only duplicate of this sentence in `page.tsx`'s hero block.

## Documentation Upkeep

When changing the visual system:

1. Update `src/app/globals.css` for token/source changes.
2. Update this file when component styles, tokens, or rules change.
3. Update `AGENTS.md` when the change affects future implementation behavior.
