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
- Chips: `src/components/chip.tsx`
- Case-study meta labels: `src/components/case-study-meta-label.tsx`
- Editorial callouts: `src/components/case-study-callout.tsx`
- Case study images and figures: `src/components/project-image.tsx`, `src/components/case-study-figure.tsx`, `src/components/image-zoom.tsx`
- Contact link icons: `src/components/contact-icon.tsx`

## Color Tokens

Defined in `src/app/globals.css` under `@theme inline`.

| Token | Value | Usage |
| --- | --- | --- |
| `--color-dark-primary` | `#121212` | Site background and card base |
| `--color-stroke-dark` | `#282828` | Default borders and subtle surfaces |
| `--color-gray-dark` | `#535353` | Elevated border/hover accents |
| `--color-stroke-lift` | `#333333` | Hover state of a zoomable image frame's mat |

Every framed image sits on `stroke-dark`, including the deck's slide imagery
and its lightbox. The deck used to use two hardcoded greys of its own
(`#1a1a1a`, `#181818`) that were in neither this table nor the token file —
three near-identical darks for one job. Use the token.

Common opacity usage:

- Primary text: `text-white`
- Secondary text: `text-white/70` or nearby values such as `text-white/68`
- Chip text: `text-white/72`
- Chip border: `border-white/15`
- Chip fill: `bg-white/[0.04]`

## Radius Tokens

Deliberate system: chips are the only rounded surface on the site. Every other
framed element — project cards, images, callouts, results boxes — is sharp
(`rounded-none`), a considered pairing with the type system's mono-labeled
metadata layer rather than a leftover default.

| Token | Value | Usage |
| --- | --- | --- |
| `--radius-token` | `4px` | Chips, skip links, `MobileNav`'s pill and panel |

There is exactly **one** radius token, and every sharp surface says so with
`rounded-none` at the call site. Two zero-valued tokens
(`--radius-token-lg`, `--radius-token-xl`) used to exist alongside it, which
meant the site had three different ways to spell "no radius" — the deck
cluster said it one way, cards another, everything else a third. They were
removed; do not reintroduce a zero-valued token.

Chips, skip links, and `MobileNav`'s pill and panel are the complete set of
4px surfaces; there is no large-radius exception anywhere on the site. (An
earlier revision of `MobileNav` used a one-off `rounded-[16px]`; that was
wrong and has been corrected.)

## Elevation

`CaseStudyCard` gets its hover/rest depth entirely from `box-shadow`, not a
border: `shadow-[0_0_0_1px_oklch(1_0_0/0.08)]` at rest, strengthening to a
1px ring plus an ambient lift (`0_0_0_1px_oklch(1_0_0/0.13),0_8px_24px_oklch(0_0_0/0.35)`)
on hover, transitioning `box-shadow`/`scale` only. This replaced an earlier
`border-stroke-dark` → `border-gray-dark` hover swap: a border communicating
depth (rather than layout structure, like the header/footer dividers) reads
better as a shadow, and shadows survive being placed over anything other
than the flat `#121212` canvas. Borders stay everywhere they mark real
structure — dividers (`SiteHeader`, `SiteFooter`, `CaseStudyNext`), the
`CaseStudyCallout`/results-box frame, and the deck's floating control
cluster (see `CaseStudiesDeck` below, which pairs its structural border with
its own ambient shadow since it's a floating overlay, not a resting card).

## Image Outlines

Every framed product image — `CaseStudyCard`, `ProjectImage`,
`CaseStudyFigure`, `CaseStudyImagePair`, the `CaseStudyNext` thumbnail, and
the deck's `DeckImage` — carries a subtle `outline outline-1
-outline-offset-1 outline-white/10` on its wrapping (`overflow-hidden`)
element. This is a dark-only site, so the outline is always the white
variant; there's no light-mode branch to maintain. `outline` was chosen over
`border` specifically because it never affects layout at any offset, and
`-outline-offset-1` draws the ring just inside the image edge so it hugs the
frame's corner instead of sitting outside it — this is also why it applies
cleanly to the `CaseStudyNext` thumbnail, which is deliberately unpadded and
unrounded (see its own section) but still gets the same depth ring. Never
use a tinted white (e.g. a warm or cool near-white) here — it reads as dirt
on the image edge, not depth. The deck previously gave dark-UI-screenshot
images a one-off `border border-white/10`; that's now covered by
`DeckImage`'s own default outline, so the special case was removed.

### Image Frames And Zoom

File: `src/components/project-image.tsx`, `src/components/image-zoom.tsx`

`ProjectImage` is the framed product-image box used across the case studies,
and `CaseStudyFigure` is that same component plus a caption (as a real
`<figure>`/`<figcaption>` — it used to rebuild the wrapper by hand, so every
change to the image treatment had to be made twice).

**The 24px mat.** The image sits inset 24px inside its frame, so the frame
reads as a mount around the screenshot rather than a crop of it. That padding
goes on the `<Image>` element, *not* on the wrapper — a `fill` image is
absolutely positioned against the wrapper's **padding box**, so padding there
does nothing at all. Padding on the replaced element does inset it, because
`object-fit` resolves against its content box. The same technique is used in
the zoom overlay. Keep the mat at 24px at every breakpoint; if it ever needs
to shrink on mobile, change it in both places together.

**Hover.** The frame's mat lifts one step, `stroke-dark` → `stroke-lift`, over
`transition-colors duration-200`. That is the *entire* hover treatment: no
scale on the frame, no zoom on the image. The image is the content and holds
still; the mount around it is what acknowledges the pointer — which also
keeps this distinct from `CaseStudyCard`, where the image itself zooms because
the whole card is the link. There is no `active:` press state either; the
lightbox opening is the feedback.

The `group-hover` lives on the frame in `ProjectImage` and pairs with the
`group` on `ImageZoom`'s trigger. A non-zoomable frame has no `group`
ancestor, so the utility is simply inert rather than needing a conditional.

**Click to expand.** `ImageZoom` wraps the frame and opens it in a lightbox on
click. Deliberately **`md` and up only**: below that there is no room to
expand into, so it renders the image untouched rather than a button that does
nothing. `canZoom` starts `false` and is set from `matchMedia` after mount, so
the server output is the non-interactive version and also the correct no-JS
fallback; if the viewport crosses back under `md` while the overlay is open,
the `matchMedia` listener closes it.

`ImageZoom` is an intentional client leaf, the third on the site after
`CaseStudiesDeck` and `MobileNav`. The framed image itself stays
server-rendered and is passed in as `children`, so the component adds
behaviour without moving markup to the client. Its motion, chrome and
three-way dismissal (Close button, Escape, scrim) deliberately match the
deck's lightbox and reuse the same `animate-lightbox-*` keyframes; it also
returns focus to the image that opened it.

Pass `zoomable={false}` for an image that is decorative or too small to
benefit. `CaseStudyImagePair` is not zoomable and has no mat — it is a
side-by-side pair with fixed heights and its own cropping behaviour.

## Typography

Two-family system, split by **function rather than by scale**. Both are
variable Google fonts loaded via `next/font/google` in `src/app/layout.tsx`
with `subsets: ["latin"]`, `display: "swap"`, and explicit fallbacks (no
`weight` array — arbitrary CSS font-weight values interpolate across each
family's variable range):

| Role | Family | CSS variable | Fallback |
| --- | --- | --- | --- |
| Everything you read | Noto Sans | `--font-noto-sans` | `ui-sans-serif, system-ui, sans-serif` |
| Everything you operate or scan | JetBrains Mono | `--font-jetbrains-mono` | `ui-monospace, Menlo, Consolas, monospace` |

This replaced a three-tier system whose display face was Space Grotesk (which
itself replaced a single-family Inconsolata setup). Space Grotesk is retired:
the heading tier is now Noto Sans, and the site's typographic personality
comes from where mono appears, not from a third family.

The two variables feed `@theme inline` in `globals.css` as `--font-sans`
(Tailwind's body/default slot, applied to `body`) and `--font-mono`
(Tailwind's built-in mono slot, available as the `font-mono` utility).
`--font-heading` is kept as its own token even though it currently resolves
to Noto Sans as well, so the heading tier states its family rather than
inheriting it and a future display face is a one-line change.

### The rule

**Prose is Noto Sans. Interface is JetBrains Mono.** The split is about what
a piece of text *does*, not how big it is:

| Noto Sans | JetBrains Mono |
| --- | --- |
| Every heading, `h1` through `h5` | `SiteHeader`'s Home / Resume nav links |
| Body copy, intros, card descriptions | `MobileNav`'s pill label, panel nav links, and contact links |
| Case-study prose and pull-quotes | The hero and `SiteFooter` contact rows, plus the footer copyright |
| Inline links inside running text | Chips, `CaseStudyMetaLabel`, and the Role/Tools/Year **values** |
| `SiteHeader`'s name/role lockup | Figure captions, `CaseStudyNext`'s eyebrow, About's date/location and group labels |
| About's stat figures (they're display headings) | The deck's control cluster, slide counter, platform captions, and lightbox chrome |

Two deliberate exceptions on the Noto Sans side, both worth keeping:

- **The name/role lockup** in `SiteHeader` is a link, but it reads as
  identity, not as a control — and a monospaced personal name reads like a
  filename.
- **Inline links inside prose** (About's Forty5Park / GoRight mentions) stay
  in the body voice. Swapping families mid-sentence breaks the line far more
  than it signals interactivity. Mono is for links that stand alone as
  controls.

Family is never baked into a shared size token. `text-body-h3`, for example,
serves both genuine prose and interface labels, so every mono context opts in
explicitly with the `font-mono` utility at the call site.

The heading-scale utilities (`text-heading-h1` through `h5`,
`text-project-subtitle`, `text-overline`) get `font-family: var(--font-heading)`
from a rule in `globals.css` that lives **in `@layer base`**. That placement
matters: the rule used to be unlayered, which beat every layered utility
regardless of specificity and silently ignored `font-mono` on any
heading-scale element — including `MobileNav`'s panel links, which are nav
controls sized with `text-heading-h5`. In `@layer base` the utilities layer
wins, so a call-site family override works.

Global rendering:

- `font-feature-settings: "kern" 1, "liga" 1, "calt" 1`
- `text-rendering: optimizeLegibility`

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
| `text-body-h3` | `0.875rem` | `1.5` | `500` | Body by default, `font-mono` in every interface context | Labels, chips, captions, and some small prose — see above |

"Font" above is the token's *default*. "Heading" and "Body (default)" both
resolve to Noto Sans today; the distinction is which token they read from.
`text-body-h3` is the one size that genuinely serves both voices depending on
where it's used, per the rule above.

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

`SiteHeader` is the single shared header for every route (homepage, `/about`, and all five case studies — it replaced the old `CaseStudyHeader`, which only the case-study pages used and which showed a "Back to portfolio" link instead of a real nav). Its own bar — the name/role lockup linking to `/`, plus "Home" and "Resume" nav links, wrapped in `<nav aria-label="Primary">` — is now **`md:` and up only** (`hidden md:block` on the `<header>`). Because the lockup is two-tone (`text-white` name, `text-white/70` role), a parent text-colour change would be overridden by the child spans, so this one link dims with `transition-opacity` + `hover:opacity-60` / `active:opacity-40` instead of the standard colour dim. Keep the colour-based rule for all single-tone text links, including "Home" and "Resume".

The `Home` and `Resume` links are `font-mono` — they're controls, and the type system splits by function. The lockup stays in the body voice even though it's a link too: it reads as identity, and a monospaced personal name reads like a filename.

`Home` deliberately duplicates the lockup's destination (`/`) rather than replacing it — the lockup reads as branding, "Home" as an explicit nav item, a common and intentional pairing rather than redundancy. On the homepage itself, clicking "Home" is a harmless no-op to the same page.

Below `md`, `SiteHeader` renders nothing of its own — `MobileNav` (see below) takes over navigation entirely as a fixed pill + expandable menu. The skip-link is the one thing `SiteHeader` still renders unconditionally at every breakpoint, ahead of both the desktop `<header>` and `MobileNav`, since it's a keyboard/screen-reader affordance independent of which nav chrome is visible.

Since the mobile bar no longer exists, the name/role lockup no longer appears on mobile at every route the way it used to — only the homepage carries it now, moved into its own hero (see Homepage Hero Copy below). `/about` and the five case-study pages currently have no equivalent mobile identity lockup; that's a known gap to revisit, not an oversight, since the Figma spec driving this change only covered the homepage.

### MobileNav

File: `src/components/mobile-nav.tsx`

The mobile (`<md`) counterpart to `SiteHeader`'s bar: a small fixed pill in the top-right corner (`fixed top-4 right-4`) holding a page-label link and a menu-toggle button, which expands into a full nav menu. An intentional client leaf for the same reason `CaseStudiesDeck` is one — `SiteHeader` itself stays a server component and renders `MobileNav` as a child. Geometry below is taken directly from the Figma spec and verified against computed styles in the browser; keep it that way rather than eyeballing screenshots.

- **Collapsed pill** (106×48, symmetric 16px insets): `rounded-token bg-dark-primary` with depth from `shadow-[0_0_0_1px_oklch(1_0_0/0.08)]` — the same resting ring `CaseStudyCard` uses. Deliberately **not** the deck cluster's `border border-white/15` + ambient-shadow + `backdrop-blur` formula: this is a resting surface on the flat canvas, not an overlay floating above slide imagery, so it takes the card's ring instead.
- **Pill label**: names the page you're on — "Home" on `/`, "Resume" on `/about` (`pillLabels` + `usePathname`). Case-study routes have no short label that fits the pill, so they fall back to "Home", where the label doubles as the way back out. Styled as `font-mono text-body-h3 text-white/72` — the same treatment as `Chip` text — and brightens to full white on hover (the dimmed-rest convention the deck's "Choose a case study" uses), rather than the standard dim-on-hover for full-white links.
- **Pill hit areas**: the pill itself carries **no padding**; the label link and the toggle each own their share (`pr-2 pl-4` and `py-3 pr-4 pl-2`), with `items-stretch` giving the shorter label the toggle's full 48px height. Every pixel of the pill therefore belongs to one of the two controls — no dead space around an active link — while the child paddings still sum to the spec's symmetric 16px insets and 16px label-to-glyph gap.
- **Expanded panel** (358 wide, `fixed inset-x-4 top-4`): same `rounded-token`, `bg-dark-primary` and ring as the pill; `flex flex-col items-end gap-4` with `pt-3 pr-4 pb-3 pl-3`. Children: a 24px `Close` (×) button, then `Home`/`Resume` as 330×64 centered rows (`font-mono text-heading-h5 font-bold leading-[1.6]` — the spec's 700 at 20/32, so the token's own 600/1.4 is overridden; the family is mono because these are nav controls, not the spec's now-retired display face), then a `border-t border-white/[0.08]` contact group at `py-8 gap-6` reusing `ContactIcon` exactly as the hero and footer do.
- **Icons**: the four-bar menu mark and the filled × are the **exact path data exported from Figma**, with `fill="white"` swapped for `currentColor`. Do not re-trace them by hand — re-export if the design changes. (Note the menu glyph is four bars, not the usual three.)
- **Dismissal**: the × button, Escape, or tapping the `bg-black/50` scrim — matching the deck lightbox's three-way-dismiss convention. Opening the menu locks `document.body` scroll (restored on close) since, unlike the deck's fixed-viewport lightbox, the underlying page here is normally scrollable.
- **Motion**: the panel *grows out of the pill's own corner* rather than cross-fading in as an unrelated surface. `.animate-menu-panel` sets `transform-origin: top right` and scales `0.92 → 1` over 300ms, with opacity fully in by 40% of the duration; `.animate-menu-panel-exit` reverses it in 150ms so the close reads as the panel collapsing back into the pill. `.menu-stagger` settles the three panel groups in behind that growth (40/100/160ms), and is applied on enter only so nothing replays while closing. Scrim uses `.animate-menu-scrim` (200ms) / `-exit` (150ms). All share the site's `cubic-bezier(0.16, 1, 0.3, 1)`.
- **The pill stays mounted while the menu is open** rather than unmounting. Because the panel shares its corner, radius, fill and ring and is opaque, it covers the pill exactly — which is what makes the growth/collapse read continuously instead of flashing scrim through that corner mid-animation. The covered pill carries `inert` so its links stay out of the tab order and unclickable meanwhile.
- Both the toggle and close buttons add `active:scale-[0.96]` alongside their color transition, matching the deck's button press-feedback convention. The 24px close button expands its hit area to 40px with `before:absolute before:-inset-2` so the layout box stays exactly 24px and the panel's 16px gaps are preserved.

### CaseStudyMetaLabel

File: `src/components/case-study-meta-label.tsx`

The one label style for case-study meta — `ROLE`, `TOOLS`, `YEAR` — shared by
`CaseStudyProjectHeader` and `CaseStudyYear` so the editorial and showcase
pages can't drift apart:

```tsx
font-mono text-body-h3 tracking-[0.05em] text-white/70 uppercase
```

Plain uppercase mono, **no pill**. These were `Chip size="sm"` until the
two-family type system landed; a bordered pill reads as a tag carrying a
value of its own, when these labels only name the line underneath. Same
treatment as About's `DESIGN` / `FRONT-END & TOOLS` group labels, so the two
places on the site that label a group of facts now match.

The value beneath each label is `font-mono text-body-h2 text-white`, and the
label-to-value gap is `gap-2`. Both label and value are mono because the
whole meta row is scannable data, not prose — see the Typography rule above.

### CaseStudyYear

File: `src/components/case-study-year.tsx`

A `CaseStudyMetaLabel` reading `Year` above the year at `font-mono
text-body-h2 text-white`, reusing the `ROLE`/`TOOLS` grammar. Renders a real
`<time dateTime>` element so the date is machine readable.

`CaseStudyProjectHeader` places it as the third column of its meta row (ROLE /
TOOLS / YEAR). The three showcase pages, which have no meta row, place it
directly under their `h1` — which is how the label change reaches those pages
too. Every case study shows a year — keep it that way when adding new work.

### CaseStudyNext

File: `src/components/case-study-next.tsx`

The onward link closing every case study. A full-width `border-t border-stroke-dark` band holding a `text-body-h3 text-white/70` "Next case study" eyebrow above the project name at `text-heading-h4`, with the next project's cover image bleeding edge-to-edge on the right. The arrow reuses the `CaseStudyCard` idiom — hidden at rest, sliding in from `-translate-x-1` on hover — and the whole block dims with `hover:opacity-70` / `active:opacity-50` because it mixes two text tones; the image also zooms to `scale-105` on hover, the same `CaseStudyCard` idiom.

Deliberate exception to the site's standard `px-6 md:px-10 lg:px-16` page padding: only the text side carries the responsive `pl-*` inset (`pl-6 md:pl-10 lg:pl-16`) — the image thumbnail has no right-side padding or rounding, so it sits flush against the `max-w-[1280px]` container's own right edge. This is the one image treatment on the site that isn't padded and rounded; it was chosen deliberately as a more editorial, image-forward closing beat, distinct from every other framed image. A `min-h-28 md:min-h-32 lg:min-h-40` floor on the text column keeps the image band a reasonable height even when the project title is short and wouldn't otherwise stretch the row.

It renders between `</main>` and `SiteFooter`, outside `main`, as its own `nav` landmark.

### Share Cards

The site-wide Open Graph card is generated at build time by `src/app/opengraph-image.tsx` (1200×630) and uses the deck's own restraint: `#121212` canvas, white headline, `#ffffffb3` kicker, `#ffffff66` domain. Case studies override it with their real project cover image, since actual product imagery outperforms a generated type card for specific work.

### Footer

The shared `SiteFooter` is a single `justify-between` row at **every** breakpoint: copyright left, contact links right. It no longer stacks and centers on mobile — per the mobile design it stays one compact 74px-tall row, which is why the earlier `flex-col items-center text-center` mobile branch (and its `md:` overrides) is gone. Keep these elements as plain text links with the global focus treatment. Its Storybook references include a fluid story and pinned 390px, 768px, and 1440px states so this layout stays visible in component review.

The three contact links (`Contact me`, `LinkedIn`, `GitHub`) each pair a 16px decorative `ContactIcon` with their label in one `inline-flex items-center gap-2` item — the same icon component and pattern used by the homepage hero's contact row. This replaced an earlier plain `/ ` text prefix. Every `ContactIcon` draws with `currentColor` (unlike `ToolIcon`'s fixed brand colors) specifically so the icon dims in step with the link text on hover/active instead of staying a flat color while the text around it changes.

**Mobile and desktop (`lg`) are icon-only; `md` (tablet) is the labelled row.** 24×24 boxes around the 16px glyph, `gap-4` apart. The visible label is not removed but hidden with `sr-only`, restored by `md:not-sr-only`, then hidden again by `lg:sr-only`; keep it that way rather than switching to `aria-label`, so each link keeps its accessible name and the markup stays one element across breakpoints instead of three conditional branches. The 24px box reproduces the design's spacing exactly, so the touch target is widened to 40px with `before:absolute before:-inset-2` (no layout effect) whenever the row is icon-only, and dropped at `md` (`md:p-0 md:before:content-none`, re-enabled at `lg:p-1 lg:before:content-['']`) where the visible label already makes the target large enough. 40px rather than a full 44px is deliberate: the design's 16px gaps put adjacent centers 40px apart, so anything larger would make neighbouring hit areas overlap.

Desktop dropping back to icon-only is a deliberate departure from the original mobile-vs-everything-else split: at `lg`'s wider gutters a labelled row read as unnecessarily wide next to the copyright line, so `lg` now matches mobile's density instead of tablet's. Tablet is unchanged and still shows the labelled row.

Both the copyright line and the three links are `font-mono`: the links are controls and the copyright is scannable meta text, so the whole row reads in one register. See the Typography rule above.

Vertical padding is `py-6` (24px top/bottom) at every breakpoint — deliberately not scaled up at `lg`, so the footer's height stays identical between tablet and desktop. Only horizontal padding follows the standard `px-6`/`md:px-10`/`lg:px-16` scale.

### Storybook

Storybook is the isolated component reference for the portfolio. Its stories live beside shared components in `src/components/` and load the same global tokens and Tailwind styles as the app. Keep the canvas dark (`#121212`) so component contrast and hierarchy are assessed in their intended context.

Document component variants that affect responsive behavior, content length, icon use, or accessibility. Storybook's viewport toolbar mirrors the portfolio's 390px, 768px, and 1440px review widths; use fluid stories to inspect any of those sizes. Pin dedicated reference stories to each width when a component changes layout across breakpoints.

Review the accessibility add-on's Canvas results as part of component QA. The current reference stories cover `Chip`, `CaseStudyCard`, `Header`, and `SiteFooter`.

## Components

### Chip

File: `src/components/chip.tsx`

Current style:

```tsx
rounded-token border border-white/15 bg-white/[0.04] px-3 py-1.5 text-body-h3 whitespace-nowrap text-white/72
```

Use chips for concise metadata only. Keep them light; they should support the hierarchy rather than compete with titles.

The shared component supports an optional 14px decorative icon. Use this only when a chip identifies a product or tool and the visible text label supplies its accessible name. About's skills chips (Figma, Claude Code, Codex, GitHub, Storybook) use their corresponding brand marks; project metadata chips stay text-only.

The homepage's tool sentence intentionally does not use `Chip` — see Homepage Hero Copy below for that pattern.

**Sizes:** `Chip` takes a `size` prop, `"md"` (default) or `"sm"`. Both share the same border/fill/font/color; only padding (and the icon slot) scale down — `text-body-h3` never shrinks further, since it's already the site's 14px minimum readable size.

- `md` — homepage `CaseStudyCard` metadata tags (`gap-1.5 px-3 py-1.5`). This is the size shown in the example above.
- `sm` — `CaseStudyDecisionBlock`'s per-block label (`Decision`, `Constraint`, …), and nothing else (`gap-1 px-2 py-1`). `CaseStudyProjectHeader`'s `Role`/`Tools` and `CaseStudyYear`'s `Year` labels used this size too until they moved to `CaseStudyMetaLabel` — see below. The dividing line is what the label *is*: a decision label is a category the block belongs to, so it earns a pill; Role/Tools/Year only name the line beneath them, and a pill there reads as a tag with a value of its own.

### CaseStudyCard

File: `src/components/case-study-card.tsx`

On this branch the homepage uses `CaseStudyIndexRow` (below) instead — this
component is kept for its Storybook reference and as the candidate to
reinstate if the editorial-index direction isn't the one that ships.

Current structure:

- Entire card is a `Link`.
- Card: `rounded-token-xl bg-dark-primary`, with `md:p-2` and depth from `box-shadow` (see Elevation above), not a border.
- **Below `md` the card is full-bleed**: no padding frame and no resting ring, so the image runs edge to edge and the card reads as a section of the page rather than a floating surface. The homepage's card section drops its horizontal padding to match (`pb-16 md:px-10 lg:px-16`). The padded, ringed card and its hover lift return at `md` and up (`md:p-2 md:shadow-… md:hover:shadow-…`). The image keeps its own 1px outline at every breakpoint.
- Hover (`md`+): shadow strengthens to a firmer ring plus an ambient lift, image zooms.
- Active: `scale-[0.99]` at every breakpoint.
- Image: fixed responsive height (`220px`, `md:240px`, `lg:280px`) with contained `object-cover`, wrapped in the standard image outline (see Image Outlines above).
- Content: `gap-3 px-6 pb-5 md:px-5` — 24px inset on mobile so card copy lines up with the page's own 24px gutter rather than sitting 8px tighter than it.
- Title: `text-heading-h5 md:text-heading-h4` (20px mobile, 24px from `md`). The mobile step-down exists because the homepage `h1` is *also* `text-heading-h4` (24px) below `md` — identical token, size and weight — so leaving the card titles at 24px left no hierarchy between the page heading and five card headings. At `md`+ the `h1` becomes `text-heading-h2` (32–40px), so the step already exists there and the card title stays 24px. This is a deliberate deviation from the Figma mobile frame, which has card titles at 24px.
- Description: `text-body-h2 text-white/68`.
- Tags: chip row with `gap-2 pt-1`.

Card title hierarchy should be stronger than body copy. Avoid making body text as large or visually loud as the title.

### CaseStudyIndexRow

File: `src/components/case-study-index-row.tsx`

The homepage's current project list: a text-forward, single-column
alternative to `CaseStudyCard`'s image grid, so all five projects read above
or near the fold as one scannable index instead of a couple of large cards.

- Entire row is a `Link`, styled the same way as `CaseStudyCard` and
  `CaseStudyNext`.
- Rows sit in a `flex flex-col divide-y divide-stroke-dark` list with a
  `border-t border-stroke-dark` on the wrapper closing off the first row —
  the list uses the same divider token the deck's two-panel slides use for
  `divide-x`, just on the other axis.
- Thumbnail: `w-28 md:w-40 lg:w-48` (112/160/192px), `self-stretch`ed to the
  row's full content height rather than a fixed height of its own — flush
  and unrounded, reusing `CaseStudyNext`'s existing thumbnail treatment at
  list scale rather than inventing a new image style. Same sitewide
  `outline outline-1 -outline-offset-1 outline-white/10`, same
  `group-hover:scale-105` zoom.
- Row inset: `py-2` (8px) top and bottom, the same 8px on every breakpoint.
  Because the thumbnail stretches to the row's content height, that 8px is
  also the only gap between the image and the row's divider above and
  below it — the image reads as nearly edge-to-edge within its row. A
  `min-h-28 md:min-h-32 lg:min-h-40` floor (copied from `CaseStudyNext`'s
  own text column) keeps the thumbnail a healthy size even on the rows
  whose own text content is short, mobile especially, where chips are
  hidden.
- No index number. An earlier pass had a mono `01`–`05` counter ahead of the
  thumbnail; removed since the row order alone already communicates
  sequence and the number added a column without adding information.
- Title: `text-heading-h5`, one line (`truncate`) so row height stays
  constant regardless of project name length.
- Description: `line-clamp-1` below `md`, `line-clamp-2` from `md` up — a
  row is denser than a card, so the description is deliberately terser than
  `CaseStudyCard`'s uncapped one.
- Chips (`Chip size="sm"`) and the hover arrow are both `hidden` below `md`;
  a narrow row has room for a title and one line of description only.
- Hover: unlike `CaseStudyCard`, a row has no resting shadow or ring to read
  as clickable, so hover adds a full-row `hover:bg-white/[0.03]` tint on top
  of the existing image-zoom and arrow-slide idioms.
- The homepage section drops its `sr-only` "Selected work" `h2` in to keep
  the same h1 → h2 → h3 outline as the grid version; row titles stay `h3`.

### CaseStudiesDeck

File: `src/components/case-studies-deck.tsx`

The presentation route is a focused dark, full-viewport experience at `/case-studies-deck`. It opens with two image-led case-study choices before entering either deck. The control is a deliberately isolated client component because the active slide changes with buttons and keyboard keys.

- Keep the base canvas `dark-primary` with only white-opacity hierarchy; do not introduce a project-specific accent color.
- Use the same 24px, 40px, and 64px responsive page padding as the rest of the portfolio.
- Slides use real case-study imagery, large editorial type, and sparse borders rather than dashboards or dense card layouts.
- Controls support buttons plus Left/Right Arrow, Page Up/Page Down, Home, and End keys. The first and final slide return to the chooser through their controls.
- There is no persistent header or footer bar. All chrome for an active deck is consolidated into two floating elements so slide content can use the full viewport: a 2px progress bar fixed to the top edge (`bg-white/10` track, `bg-white` fill sized to `(slideIndex + 1) / slideKinds.length`, animated with `transition-[width] duration-300`), and a single control cluster fixed to the bottom-right corner (`bottom-6 right-6`, scaling to `lg:bottom-16 lg:right-16` with the standard responsive padding steps) holding the slide counter, "Choose a case study", the conditional "View full case study" link, and Previous/Next. Neither renders on the chooser screen — there is nothing to show progress on or navigate between until a project is selected. The cluster pairs its `border border-white/15` with an ambient `shadow-[0_8px_24px_oklch(0_0_0/0.35)]`, since it's a floating overlay sitting on top of varying slide imagery rather than a resting card — the border keeps a crisp legible edge and the shadow gives it the lift a border alone can't.
- The control cluster carries `font-mono` on its wrapper, so the counter, `Choose a case study`, `View full case study`, and `Previous`/`Next` all inherit it — the cluster is nothing but controls. The lightbox's `Close` button sets it directly.
- Every button in the control cluster (`Choose a case study`, `Previous`/`Choose`, `Next`/`Choose another`) and the lightbox's `Close` button add `active:scale-[0.96]` alongside their existing color transition, so the deck's primary, repeatedly-clicked controls get tactile press feedback and not just a color swap.
- Process and platform visuals expand into a full-viewport lightbox. The image button must retain descriptive alternative text, the visible caption names the view, and Escape, the close button, or the scrim close the lightbox. Closing plays a short (150ms) reverse of the open animation — the scrim fades out and the media scales back down to `0.97` — instead of vanishing instantly; the media stays mounted for that duration (an `isMediaClosing` flag swaps in the exit animation classes, then the actual unmount follows on a matching timeout) so the exit is never a harder cut than the entrance.
- Additional platform-view slides follow the main platform slide. They show only enough views to orient the audience; larger examination belongs in the lightbox. Each thumbnail carries a visible `text-body-h3 text-white/70` caption naming the view below it, in addition to the lightbox label, so the grid reads without requiring a click.
- The closing slide is an intentional centered pull-quote (`text-center`, `mx-auto`), distinct from the earlier "design move" statement slide's left-aligned layout. It is also the largest type in the deck (`clamp(3.4rem,9vw,9rem)`). This is deliberate: the ending should read as the bigger of the two big-statement beats, not a repeat of the midpoint.
- `DeckImage` carries the standard sitewide image outline (see Image Outlines above) by default, which now covers what used to be a one-off `border border-white/10` on dark-UI-screenshot process/platform images.
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

## Homepage Hero Copy

Current tool sentence — plain text, not `Chip`:

`Based in Colombia, working globally with` `[icon] Figma` `,` `[icon] Claude Code` `and` `[icon] Codex`

Each tool name is a decorative `ToolIcon` plus its label in one `inline-flex` item at `text-body-h1 text-white/70` — no border, no background, matching the surrounding sentence rather than standing apart as a tag. The comma is a separate flex item so it has equal spacing on both sides. Keep that spacing behavior unless the design asks punctuation to hug a tool name.

The intro paragraph carries `text-balance` so mobile's line break lands evenly instead of stranding a short trailing word like "with" alone on its own line.

Below the intro, the `Contact me` / `LinkedIn` / `GitHub` row follows the same icon-plus-label idiom as the tool sentence: a 16px decorative `ContactIcon` (`src/components/contact-icon.tsx`) inside an `aria-hidden` wrapper, paired with the visible label in one `inline-flex items-center gap-2` link. This replaced a plain `/ ` text prefix on each link. `ContactIcon` differs from `ToolIcon` in one deliberate way — every icon draws with `fill`/`stroke="currentColor"` instead of a fixed brand color, so the icon dims together with the link text on hover/active rather than sitting at a flat brightness while the text around it changes tone. `SiteFooter`'s matching contact row uses the same component and pattern; see its own section. Both rows are `font-mono` — they're standalone controls, unlike the tool sentence above them, which is prose and stays in the body voice. That contrast between the two adjacent rows is the clearest demonstration of the type rule on the site.

Below `md`, this row is a vertical stack (`flex flex-col gap-4`) rather than the wrapping horizontal row it is at `md` and up (`md:flex-row md:flex-wrap md:items-start md:gap-6`) — a deliberate mobile-only layout tweak, not a universal change to the pattern.

Above the `h1`, mobile (`<md`) also carries its own copy of the name/role lockup (`Analdo Gomez` / `Senior Product Designer`, stacked, matching `SiteHeader`'s two-tone treatment) directly in the hero, hidden at `md:` and up. This exists because `SiteHeader`'s own bar — which used to carry the lockup at every breakpoint — is now `md:`-and-up only (see the Header section above); `MobileNav` replaces it below `md` but only shows the page label, not the name/role, so the homepage repeats it here instead so mobile visitors still get an identity intro. The name is `font-semibold` per the mobile spec, unlike the header bar's regular-weight lockup.

Two more mobile-only deltas from the same spec:

- The hero's top padding is `pt-20` (80px) below `md`, then steps **down** to `md:pt-16` (64px). Larger-on-mobile is deliberate: on mobile the hero has to clear the floating `MobileNav` pill, whereas at `md` a real header bar sits above it instead.
- The tool sentence is `text-body-h2` (16px) on mobile and `md:text-body-h1` (18px) from `md` up. The spec's 165% line-height is kept only at `md`+, where `text-body-h1` already carries it; mobile inherits `text-body-h2`'s 1.6, a sub-pixel-per-line difference that isn't worth an arbitrary `leading-` override.

## Documentation Upkeep

When changing the visual system:

1. Update `src/app/globals.css` for token/source changes.
2. Update this file when component styles, tokens, or rules change.
3. Update `AGENTS.md` when the change affects future implementation behavior.
