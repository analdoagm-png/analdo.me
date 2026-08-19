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
- Use `next/font` from the root layout for fonts. This project uses a **two-family system split by function, not by scale**: Noto Sans (`--font-noto-sans`) is everything you read, JetBrains Mono (`--font-jetbrains-mono`) is everything you operate or scan. Both are variable Google fonts with `display: "swap"` and explicit fallbacks. Space Grotesk was retired when this landed — the heading tier is Noto Sans now. See DESIGN.md's Typography section for the full table, including the two deliberate Noto Sans exceptions (`SiteHeader`'s identity lockup, and inline links inside prose).

## Structure

- `src/app/page.tsx` — homepage hero, icon-labeled tool subtext, contact links, and one unified `CaseStudyCard` grid for all 5 projects.
- `src/app/about/page.tsx` — resume-style About page: hero, credentials strip, experience list, and skills chips built from the site owner's actual résumé content. Linked from `SiteHeader`'s "Resume" link, indexed, and included in the sitemap.
- `src/app/case-studies-deck/page.tsx` — presentation route with an initial case-study chooser and interactive GoRight and Arrowhead Transit slide sequences.
- `src/app/case-studies/*/page.tsx` — five case study pages: Forty5Park, Uber Suite, Github's Security Findings, GoRight, Arrowhead Transit.
- `src/components/` — shared, flat component files. `case-studies-deck.tsx`, `mobile-nav.tsx` and `image-zoom.tsx` are intentional client leaves — the deck because keyboard and button controls change the active slide, `MobileNav` because it toggles a fixed pill/expandable menu and locks body scroll while open, `ImageZoom` because it opens a lightbox on click (at `md` and up only) and closes on Escape. `SiteHeader` itself stays a server component and renders `MobileNav` as a child. Avoid nested component folders unless the project structure changes substantially.
- `src/lib/site.ts` — canonical site URL, site name, shared description, author entity, and the `expertise` list used by `Person` schema.
- `src/lib/case-studies.ts` — the single source of truth for the five case studies plus the `caseStudyMetadata()` helper. The homepage grid and `app/sitemap.ts` both read this array, so a project cannot appear on the homepage while missing from the sitemap.
- `src/app/robots.ts` and `src/app/sitemap.ts` — Next.js metadata routes that generate `/robots.txt` and `/sitemap.xml`.
- `src/app/opengraph-image.tsx` — generated site-wide share card via `next/og` `ImageResponse`.
- `src/app/globals.css` — Tailwind v4 `@theme inline` design tokens plus global focus, motion, and font-rendering rules.
- `DESIGN.md` — design-system documentation. Update it whenever tokens, core component styles, interaction rules, accessibility conventions, or responsive behavior change.
- `.storybook/` — Storybook configuration. Stories live beside shared components as `src/components/*.stories.tsx`.

## Responsive Convention

Use the three-tier breakpoint system that matches the Figma frames where available:

- Base mobile `<768px`: 24px page padding (`px-6`).
- Tablet `md`, 768–1023px: 40px page padding (`md:px-10`).
- Desktop `lg`, 1024px+: 64px page padding (`lg:px-16`).

When Figma provides desktop, tablet, and mobile frames, inspect each independently. Do not assume a desktop frame scales uniformly.

All seven routes now use the three tiers. The three showcase case studies had drifted to `px-6 md:px-16` — 64px gutters from 768px up, with no `lg` step — which made them 24px narrower than the rest of the site on a tablet. Check this when adding a page.

Shared components may expose override props such as `aspectClassName`, `roundedClassName`, `mdGapClassName`, and `maxWidthClassName` because individual case studies deviate by breakpoint. Re-check the target page before generalizing values.

Breakpoint gotcha: when a flex row switches to `flex-row` at one breakpoint, child width or `flex-1` overrides must switch at the same breakpoint. If the child waits until a later breakpoint, it can keep claiming full width and force wrapping.

**Mobile nav clearance:** every route that renders `SiteHeader` must give its first section `pt-20` (80px) below `md`, then step back down to its own `md:pt-*`. `MobileNav`'s pill is `fixed` and ends at 64px from the top, so 80px keeps content clear of it with 16px to spare. All seven such routes (homepage, `/about`, five case studies) carry this; a new route needs it too. `/case-studies-deck` is exempt — it renders its own `<main>` without `SiteHeader`, so there is no pill to clear.

Keep the mobile and `md` top padding on the **same `pt-*` axis** (`pt-20 md:pt-16`), never a shorthand plus an override (`p-6 … md:py-16` alongside `pt-20`). Tailwind orders padding utilities by property specificity — `p` → `py` → `pt` — independently of the order written in the class attribute, so a base `pt-20` would otherwise beat `md:py-16` and leak the mobile value into every larger breakpoint.

## Design System

Use `DESIGN.md` as the source of truth for:

- Color, radius, typography, and motion tokens.
- Global styles such as focus rings, reduced motion, and font rendering.
- Component rules for chips, project cards, callouts, case-study figures, and editorial sections.
- Accessibility expectations.

Current high-level design choices:

- Dark base: `dark-primary` background, `stroke-dark` borders, `gray-dark` low-emphasis strokes.
- Two-family variable font system via `next/font`: Noto Sans (headings, body, prose) and JetBrains Mono (nav, standalone links, chips, meta labels and values, counters, deck controls).
- Sharp corners everywhere except chips: chips keep a 4px `rounded-token` radius; every card, image, and callout is `rounded-none`. See `DESIGN.md`'s Radius Tokens section for the full rule.
- Fluid display type for large headings; readable minimum text size is 14px.
- Body copy should not use very light weights. Use 400 for body text and 500 for small labels.
- Home project cards use stronger titles (`text-heading-h4`), calmer descriptions (`text-body-h2 text-white/68`), and light chips (`border-white/15 bg-white/[0.04] text-white/72`).
- Case-study callouts and results boxes should fill their container width and align content left. Do not cap callout paragraph width unless the design explicitly calls for a centered editorial quote.
- `SiteFooter` is one `justify-between` row at every breakpoint (copyright left, links right); below `md` its contact links are icon-only, with the label kept as `sr-only` (not `aria-label`) and restored by `md:not-sr-only`. See DESIGN.md's Footer section.

## Typography

- Headings and short display statements use `text-balance`.
- Long paragraphs use `text-pretty`.
- Use real semantic headings: page title `h1`, major sections `h2`, item/card/decision titles `h3`.
- Body prose line-length caps use `ch` units when a cap is desired. Do not apply a `70ch` cap inside callout/result boxes that are meant to fill the whole box.
- Avoid one-off arbitrary font sizes unless there is a clear visual reason. Prefer tokens from `globals.css`.

## Homepage Copy Pattern

The hero subtext reads as a text group followed by a plain icon-labeled tool list — no chip borders or background, just text at the same size and color as the surrounding sentence (`text-body-h1 text-white/70`). They stack on mobile and become one wrapping row at `md`:

`Based in Colombia, working globally with` `[icon] Figma` `,` `[icon] Claude Code` `and` `[icon] Codex`

Each tool name pairs a decorative `ToolIcon` with its label inside one `inline-flex` item, so the icon never separates from its name when the line wraps. The comma is its own flex item so `gap-2` gives equal space on both sides. Connector words such as `and` are also standalone flex items. Keep the visible label as the accessible name — the icon wrapper stays `aria-hidden` and does not get a redundant accessible name of its own.

The intro paragraph ("Based in Colombia, working globally with") carries `text-balance` so its mobile line break doesn't strand a short word like "with" alone on its own line — the browser balances it into two even lines instead.

Tool chips may pass a decorative `ToolIcon` into `Chip`. Keep the visible label as the accessible name and do not add a redundant accessible name to the SVG.

The `Contact me` / `LinkedIn` / `GitHub` row below the hero (and its `SiteFooter` counterpart) follows the same icon-plus-label idiom via `ContactIcon` (`src/components/contact-icon.tsx`), replacing an earlier plain `/ ` text prefix. Unlike `ToolIcon`'s fixed brand colors, every `ContactIcon` draws with `currentColor` so it dims together with the link text on hover/active. That row is a vertical stack below `md` (`flex-col gap-4`) and the wrapping horizontal row described above from `md` up (`md:flex-row md:flex-wrap md:gap-6`) — a mobile-only tweak, not a change to the row's desktop/tablet behavior.

Directly above the `h1`, the hero also carries a mobile-only (`md:hidden`) copy of `SiteHeader`'s name/role lockup — plain stacked text, not a link, with a `font-semibold` name. This exists because `SiteHeader`'s own bar is now `md:`-and-up only (`MobileNav` covers mobile navigation instead, and its collapsed pill only shows the current page's label, not the name/role) — see DESIGN.md's Header and MobileNav sections. This lockup is homepage-only for now; `/about` and the case-study pages don't yet have an equivalent mobile identity treatment.

Mobile homepage also runs the case-study cards **full-bleed** (no section padding, no card padding or resting ring below `md`) and steps the hero's top padding **up** to `pt-20` to clear the floating nav pill, then back down to `md:pt-16`. The tool sentence is 16px on mobile (`text-body-h2 md:text-body-h1`). Card copy is inset 24px on mobile (`px-6 md:px-5`) to line up with the page gutter, and card titles drop to `text-heading-h5` below `md` so they don't tie with the `h1`, which is itself `text-heading-h4` (24px) at that width. See DESIGN.md's `CaseStudyCard` and Homepage Hero Copy sections.

## SEO And Metadata

- `metadataBase` is set once in `src/app/layout.tsx` from `siteUrl`. Every relative Open Graph image path resolves against it, so do not hardcode absolute URLs in page metadata.
- The root layout carries the site-wide `openGraph` and `twitter` defaults plus a `Person` + `WebSite` JSON-LD `@graph`. `Person` is the primary entity and `WebSite` references it as `publisher`, so engines resolve one entity rather than two.
- JSON-LD is injected with `dangerouslySetInnerHTML` and must keep the `.replace(/</g, "\\u003c")` escape from the Next.js JSON-LD guide.
- Case study pages must build metadata through `caseStudyMetadata()` rather than hand-writing an `openGraph` block. Next.js replaces `openGraph` wholesale instead of deep-merging with the layout, which is why the helper repeats `siteName` and `locale`. The helper throws at build time for an unregistered `href`.
- The same wholesale-replace rule applies to any route without a metadata helper: if a page defines `title`/`description` but omits `openGraph`/`twitter` entirely, it inherits the root layout's `openGraph`/`twitter` object verbatim — including the layout's `url`, so shared links point at `/`. `/about` shipped this way and had to be fixed with an explicit override. Any new standalone route (not a case study) needs the same treatment: set `openGraph.title`/`description`/`url` and `twitter.title`/`description` by hand, resolving the title through `titleTemplate.replace("%s", title)`. The generated `opengraph-image` file convention still applies automatically — no need to set `images`.
- The generated `opengraph-image.tsx` renders through satori, which supports flexbox only. Every container with more than one child needs an explicit `display: "flex"`.
- That card's headline is `shareHeadline` (`src/lib/site.ts`), written for the card and kept under ~60 characters. It is deliberately **not** `siteDescription`: the meta description runs 150–160 characters for search results, and reusing it here wrapped to six lines, overflowed the 630px canvas mid-word, and rendered on top of the domain line. Anything put in that slot needs to fit two lines at display size.
- `/case-studies-deck` restates `openGraph`/`twitter` for the same reason `/about` does. Being `noindex` does not exempt a route from this: an inherited `url: "/"` makes a pasted deck link preview as the homepage, and sharing that link is the route's entire purpose.
- Case-study share cards intentionally use each project's real cover image; only the site-wide card is generated type.
- Titles use the root layout's `title.template` (`titleTemplate` in `src/lib/site.ts`). Child routes therefore pass only the descriptive part and must **not** repeat "Analdo Gomez" — doing so renders the name twice. Keep each resolved title inside 60 characters.
- The template applies to `title` but not to `openGraph.title`, so `caseStudyMetadata()` resolves it manually with `titleTemplate.replace("%s", title)`. Do not hardcode the suffix.
- Canonical URLs are declared **per route**, never in the root layout. Metadata is shallow-merged, so a layout-level canonical would be silently inherited by every route that forgets to override it, pointing them all at `/`.
- `/case-studies-deck` is presentation-only: excluded from the sitemap, marked `robots: { index: false, follow: true }`, and still canonicalised to itself.
- `/about` started as an unlinked, noindex WIP page (same treatment as `/case-studies-deck`) while its content was drafted. Once `SiteHeader` linked to it, both the `robots` override and the sitemap exclusion were removed — it is now indexed and listed in `sitemap.ts`. If a future page follows the same draft-first pattern, remember to flip both when it goes live.
- `CaseStudyNext` renders the onward link at the foot of each case study, wrapping around `caseStudies` order so no page dead-ends. It sits outside `<main>` as its own `nav` landmark.
- Homepage card titles are `h3`, so `page.tsx` carries an `sr-only` `h2` ("Selected work") to keep the outline from jumping `h1` → `h3`. If a visible section heading is ever added, remove the `sr-only` one rather than having both.
- Same pattern on `/about`: `CaseStudyPointsGrid` renders `h3` item titles, which on case-study pages always sit below a visible `h2`. About has no section heading above its stats block, so it carries its own `sr-only` `h2` ("Highlights") for the same reason.
- `siteDescription` and `expertise` (`src/lib/site.ts`) are kept in sync with the About page's bio by hand — there is no shared source. About is the more detailed, authoritative account (specific years, named employers), so when the two drift, update `site.ts` to match About rather than the reverse.
- Each case study carries its ship year in `caseStudies` (`year`). It drives the visible `CaseStudyYear` block, `article:published_time`, and `datePublished` in structured data. Year-only precision is deliberate — do not invent a month or day. `"2022"` is valid reduced-precision ISO 8601, though some consumers expect a full date and may drop the field; that trade is accepted rather than fabricating a January placeholder.
- `CaseStudyJsonLd` emits per-case-study `CreativeWork` schema whose `author` and `isPartOf` reference the `@id`s from the root layout's graph, so one Person and one WebSite resolve across the page. `CreativeWork` over `Article` on purpose: these are portfolio pieces, and Article rich results would not apply.
- Outbound identity links live in `profiles` (`src/lib/site.ts`) and feed `Person.sameAs`. Add a real visible link alongside any new entry — an actual link is a stronger entity signal than `sameAs` alone.
- `author.email`, `author.linkedIn`, and `author.github` are the single source for contact links. Do not re-hardcode these URLs in components.
- Sitemap `lastModified` intentionally uses build time, not `year`: `lastmod` describes when the page changed, not when the project shipped.
- Still outstanding from the SEO audit: homepage content depth and all AEO work (question-phrased headings, FAQ content and schema). About's headings are declarative ("Where I've worked") rather than question-phrased — converting a couple plus adding a small FAQ section is the next highest-leverage AEO move. Each needs facts only the site owner has.

## Accessibility Conventions

- Every page's `<main>` must have `id="main-content"`.
- `SiteHeader` renders a `.skip-link` as its first child, unconditionally at every breakpoint. It's the one shared header for every route — the old `CaseStudyHeader` was removed once `SiteHeader` gained a "Home" link and took over its job. Below `md`, `SiteHeader`'s own bar renders nothing (`hidden md:block`) and `MobileNav` takes over as a fixed pill + expandable menu — see DESIGN.md's Header and MobileNav sections.
- `MobileNav`'s expanded menu is a real dialog: `role="dialog" aria-modal="true"`, `autoFocus` on its Close button, dismissible via the × button, Escape, or the scrim, and locks `document.body` scroll while open (restored on close) since it sits over an otherwise-scrollable page. The collapsed pill stays mounted underneath (the opaque panel covers it, which is what makes the open/close animation continuous) and carries `inert` so its links stay out of the tab order while covered.
- `MobileNav`'s pill has no padding of its own — the label link and menu toggle each own their share so the whole pill is active area, giving the toggle a full 48×48 target and the label the pill's full height. Keep it that way: an active link with dead padding around it is the thing this structure exists to avoid.
- Global focus is handled in `globals.css` for `a:focus-visible` and `button:focus-visible`. Do not add per-element focus overrides unless a specific component needs a different visible treatment.
- Global reduced-motion handling in `globals.css` neutralizes transitions and animations under `prefers-reduced-motion: reduce`.
- `ProjectImage` requires real `alt` text. `CaseStudyFigure` may fall back to its caption when the visible caption already describes the image. Images *inside* a titled link are the opposite case: `CaseStudyCard` and `CaseStudyNext` both use `alt=""` with `aria-hidden`, since the link already contains the title and description and real alt text there makes the accessible name repeat the project name three times.
- Do not claim accessibility compliance from screenshots alone. For visual QA, check layout, focus affordance, text contrast risk, text reflow, and reduced-motion behavior where relevant.

## Interaction And Motion

- Text links dim on hover to `text-white/60` and active press to `text-white/40` with `transition-colors duration-200`.
- Case-study card images zoom to `scale-105` on hover with `duration-500 ease-out`.
- `CaseStudyCard` gets its hover depth from `box-shadow` alone (no border — see DESIGN.md's Elevation section), strengthening from a 1px ring to a ring plus ambient lift on hover, and presses with `active:scale-[0.99]`.
- Card arrows slide in on hover — hidden at rest, sliding in from `-translate-x-1` — an idiom `CaseStudyNext` reuses for its own onward-link arrow. Both transition exactly `[opacity,translate]`, never `transition-all`.
- Case-study images sit on a 24px mat inside their frame and expand into a lightbox on click at `md` and up. Their only hover treatment is the mat lifting `stroke-dark` → `stroke-lift`; the image itself does not move, unlike `CaseStudyCard`'s. See DESIGN.md's Image Frames And Zoom section, especially the note about why the padding goes on the image and not the wrapper.
- Every product image (`CaseStudyCard`, `ProjectImage`, `CaseStudyFigure`, `CaseStudyImagePair`, `CaseStudyNext`'s thumbnail, the deck's `DeckImage`) carries a sitewide `outline outline-1 -outline-offset-1 outline-white/10` on its wrapper for consistent depth — see DESIGN.md's Image Outlines section. `outline` over `border` deliberately, since it never adds layout width.
- `.animate-fade-up` is a zero-JS page-load animation: 12px translateY + opacity, 700ms `cubic-bezier(0.16, 1, 0.3, 1)`, `both` fill mode.
- Use small server-rendered stagger delays for side-by-side mapped items only. Sequential content blocks do not need individual staggering.
- The deck's control-cluster buttons and lightbox `Close` button add `active:scale-[0.96]` on top of their color transition, for tactile press feedback on the deck's primary, frequently-clicked controls. The lightbox also plays a 150ms reverse fade/scale on close instead of unmounting instantly, so the exit mirrors (a little softer than) its own entrance — see DESIGN.md's `CaseStudiesDeck` section.
- `MobileNav`'s toggle and close buttons follow the same `active:scale-[0.96]` convention. Its menu does **not** simply fade in: the panel grows out of the collapsed pill's own corner (`transform-origin: top right`, 300ms scale `0.92 → 1`) and collapses back into it on close (150ms), with `.menu-stagger` settling the panel's three groups in behind that growth — see DESIGN.md's `MobileNav` section.
- Icons traced by hand drift from the design. `MobileNav`'s menu and close glyphs are the exact path data exported from Figma via `exportAsync({ format: "SVG_STRING" })`, recoloured to `currentColor`; re-export rather than redraw when a design changes.

## Case Study Patterns

Every page — homepage, `/about`, and all five case studies — uses the same shared `SiteHeader` (see DESIGN.md's Header section). There is no separate case-study-only header component anymore; `CaseStudyHeader` was removed once `SiteHeader` gained a "Home" link and could cover both jobs.

Simple/showcase case studies (Forty5Park, Uber Suite, Github's Security Findings) use `SiteHeader`, content sections, and `ProjectImage`.

Editorial case studies such as GoRight and Arrowhead additionally use:

- `CaseStudyProjectHeader`
- `CaseStudyMetaLabel`
- `ImageZoom` (via `ProjectImage`/`CaseStudyFigure`)
- `CaseStudySectionHeading`
- `CaseStudyPointsGrid`
- `CaseStudyCallout`
- `CaseStudyStatement`
- `CaseStudyDecisionBlock`
- `CaseStudyFigure`
- `CaseStudyImagePair`

For callouts/results boxes, align content left and let text fill the available width. This was fixed on GoRight and Arrowhead after browser annotations showed centered or capped text felt misplaced.

Case-study meta labels (`ROLE` / `TOOLS` / `YEAR`) use the shared `CaseStudyMetaLabel` — plain uppercase mono, no pill — on both the editorial and showcase pages, since `CaseStudyYear` is shared by both. `Chip size="sm"` is now `CaseStudyDecisionBlock`'s label only: a decision label is a category the block belongs to, so it earns a pill, while Role/Tools/Year only name the line beneath them. `Chip`'s default (`size="md"`) stays reserved for the homepage `CaseStudyCard` tags and About's skills chips — see DESIGN.md's Chip section for the full size table.

## Verification

Before handing off layout or design changes:

- Run `npm run lint`.
- Run `npm run build` when touching shared components, app routes, Next config, font loading, or global CSS.
- Run `git diff --check`.
- For visual changes, check at least mobile `390px`, tablet `768px`, and desktop `1440px`. Headless Chrome at `/Applications/Google Chrome.app/Contents/MacOS/Google Chrome` works for screenshots when the in-app browser bridge is unreliable.
- Keep previews local unless the user explicitly asks to push, deploy, or open a PR.

## Storybook

- Run `npm run storybook` for the local component workshop at port `6006`.
- Run `npm run build-storybook` before handing off Storybook configuration or story changes.
- Import `src/app/globals.css` through `.storybook/preview.tsx`; do not duplicate tokens in story-only styles.
- Keep stories scoped to shared component states and use the real `public/` assets through the configured static directory. Do not restore generated starter stories.
- Use the accessibility add-on in the Canvas to review issues as components and stories change.
- Configure Storybook's viewport toolbar with the portfolio review widths: 390px mobile, 768px tablet, and 1440px desktop. When a component changes across breakpoints, add a fluid story plus pinned stories for these three widths.

## Git

- The project has previously pushed directly to `main` for small verified changes, but do not push unless the user asks.
- The worktree may contain user-approved in-progress design edits. Never revert unrelated changes.
