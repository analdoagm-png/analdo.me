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
- Use `next/font` from the root layout for fonts. This project uses a three-tier system, each loaded as a variable Google font with `display: "swap"` and explicit fallbacks, applied sitewide: Space Grotesk (`--font-space-grotesk`) for heading-scale text, Noto Sans (`--font-noto-sans`) as the body/default voice, and JetBrains Mono (`--font-jetbrains-mono`) for labels/chips/captions/meta text. See DESIGN.md's Typography section for exactly which tokens and components use which.

## Structure

- `src/app/page.tsx` — redesigned homepage: a persistent identity sidebar (`HomeSidebar`) beside a single-column `CaseStudyCard` grid for all 5 projects. No `SiteHeader`/`SiteFooter` — the page renders its own skip link, and below `md` a standalone top bar (Resume link + social icons) stands in for the sidebar's own copies of both, which are hidden at that width to avoid duplicating them in the DOM.
- `src/components/home-sidebar.tsx` — homepage-only identity block: name/role lockup, the page's `h1`, the "based in / working with" tool sentence, a Resume link, social icons, and copyright. Icons and Resume are `hidden md:flex`/`md:inline-block` since mobile shows them in `page.tsx`'s top bar instead.
- `src/components/social-icon.tsx` — outline mail/LinkedIn/GitHub glyphs (`stroke="currentColor"`) used by the homepage sidebar and mobile top bar. Distinct from `ToolIcon`'s brand-colored badges.
- `src/app/about/page.tsx` — resume-style About page: hero, credentials strip, experience list, and skills chips built from the site owner's actual résumé content. Linked from the homepage's "Resume" link (in `HomeSidebar` and the mobile top bar), indexed, and included in the sitemap.
- `src/app/case-studies-deck/page.tsx` — presentation route with an initial case-study chooser and interactive GoRight and Arrowhead Transit slide sequences.
- `src/app/case-studies/*/page.tsx` — five case study pages: Forty5Park, Uber Suite, Github's Security Findings (showcase, use `CaseStudyHeader`), GoRight, Arrowhead Transit (editorial, use `EditorialSidebar`/`EditorialMobileBar` instead — see Case Study Patterns below).
- `src/components/case-study-editorial-sidebar.tsx` — `EditorialSidebar` (desktop, `lg`+) and `EditorialMobileBar` (below `lg`) — the persistent identity sidebar used by GoRight and Arrowhead Transit in place of `CaseStudyHeader`.
- `src/components/` — shared, flat component files. `case-studies-deck.tsx` is an intentional client leaf because keyboard and button controls change the active slide. Avoid nested component folders unless the project structure changes substantially.
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
- Three-tier variable font system via `next/font`: Space Grotesk (headings), Noto Sans (body/links), JetBrains Mono (labels/chips/captions/meta).
- Sharp corners everywhere except chips: chips keep a 4px `rounded-token` radius; every card, image, and callout is `rounded-none`. See `DESIGN.md`'s Radius Tokens section for the full rule.
- Fluid display type for large headings; readable minimum text size is 14px.
- Body copy should not use very light weights. Use 400 for body text and 500 for small labels.
- Home project cards use stronger titles (`text-heading-h4`), calmer descriptions (`text-body-h3 text-white/68`), and light chips (`border-white/15 bg-white/[0.04] text-white/72`). Cards stack (image on top, no border, edge-to-edge) below `md`; at `md` and up they switch to a horizontal split — image `flex-1`/`self-stretch` on one side, content on the other — inside a `border-stroke-dark` box.
- Case-study callouts and results boxes should fill their container width and align content left. Do not cap callout paragraph width unless the design explicitly calls for a centered editorial quote.
- `SiteFooter` centers its copyright and links on mobile, then uses its left/right desktop alignment from `md` upward.

## Typography

- Headings and short display statements use `text-balance`.
- Long paragraphs use `text-pretty`.
- Use real semantic headings: page title `h1`, major sections `h2`, item/card/decision titles `h3`.
- Body prose line-length caps use `ch` units when a cap is desired. Do not apply a `70ch` cap inside callout/result boxes that are meant to fill the whole box.
- Avoid one-off arbitrary font sizes unless there is a clear visual reason. Prefer tokens from `globals.css`.

## Homepage Copy Pattern

The redesign moved this copy out of a large hero statement and into `HomeSidebar`'s narrow column, at the sidebar's `text-body-h3 text-white/70` scale rather than the old `text-body-h1`. It's still a plain icon-labeled tool list — no chip borders or background — just smaller and always wrapping (`flex flex-wrap`, no separate mobile/`md` stacking behavior, since the sidebar column is narrow at every breakpoint):

`Based in Colombia, working globally with` `[icon] Figma` `,` `[icon] Claude Code` `and` `[icon] Codex`

Each tool name pairs a decorative `ToolIcon` (sized `size-3` here, down from the old `size-3.5`) with its label inside one `inline-flex` item, so the icon never separates from its name when the line wraps. The comma is its own flex item. Connector words such as `and` are also standalone flex items. Keep the visible label as the accessible name — the icon wrapper stays `aria-hidden` and does not get a redundant accessible name of its own.

The page's `h1` is a separate element above this line — the "Over a decade solving complex B2B problems..." statement, now rendered as compact `text-body-h3` sidebar copy rather than a large display heading. It stays the semantic `h1` (matching every other page's "descriptive statement is the h1" convention) even though it's visually small here.

Tool chips (used on `/about`, not the homepage) may pass a decorative `ToolIcon` into `Chip`. Keep the visible label as the accessible name and do not add a redundant accessible name to the SVG.

## SEO And Metadata

- `metadataBase` is set once in `src/app/layout.tsx` from `siteUrl`. Every relative Open Graph image path resolves against it, so do not hardcode absolute URLs in page metadata.
- The root layout carries the site-wide `openGraph` and `twitter` defaults plus a `Person` + `WebSite` JSON-LD `@graph`. `Person` is the primary entity and `WebSite` references it as `publisher`, so engines resolve one entity rather than two.
- JSON-LD is injected with `dangerouslySetInnerHTML` and must keep the `.replace(/</g, "\\u003c")` escape from the Next.js JSON-LD guide.
- Case study pages must build metadata through `caseStudyMetadata()` rather than hand-writing an `openGraph` block. Next.js replaces `openGraph` wholesale instead of deep-merging with the layout, which is why the helper repeats `siteName` and `locale`. The helper throws at build time for an unregistered `href`.
- The same wholesale-replace rule applies to any route without a metadata helper: if a page defines `title`/`description` but omits `openGraph`/`twitter` entirely, it inherits the root layout's `openGraph`/`twitter` object verbatim — including the layout's `url`, so shared links point at `/`. `/about` shipped this way and had to be fixed with an explicit override. Any new standalone route (not a case study) needs the same treatment: set `openGraph.title`/`description`/`url` and `twitter.title`/`description` by hand, resolving the title through `titleTemplate.replace("%s", title)`. The generated `opengraph-image` file convention still applies automatically — no need to set `images`.
- The generated `opengraph-image.tsx` renders through satori, which supports flexbox only. Every container with more than one child needs an explicit `display: "flex"`.
- Case-study share cards intentionally use each project's real cover image; only the site-wide card is generated type.
- Titles use the root layout's `title.template` (`titleTemplate` in `src/lib/site.ts`). Child routes therefore pass only the descriptive part and must **not** repeat "Analdo Gomez" — doing so renders the name twice. Keep each resolved title inside 60 characters.
- The template applies to `title` but not to `openGraph.title`, so `caseStudyMetadata()` resolves it manually with `titleTemplate.replace("%s", title)`. Do not hardcode the suffix.
- Canonical URLs are declared **per route**, never in the root layout. Metadata is shallow-merged, so a layout-level canonical would be silently inherited by every route that forgets to override it, pointing them all at `/`.
- `/case-studies-deck` is presentation-only: excluded from the sitemap, marked `robots: { index: false, follow: true }`, and still canonicalised to itself.
- `/about` started as an unlinked, noindex WIP page (same treatment as `/case-studies-deck`) while its content was drafted. Once the homepage linked to it, both the `robots` override and the sitemap exclusion were removed — it is now indexed and listed in `sitemap.ts`. The homepage's only in-page link to it is the "Resume" link in `HomeSidebar` (`md`+) / the mobile top bar (below `md`) — there is no longer a `SiteHeader` nav rendering it on every page. If a future page follows the same draft-first pattern, remember to flip both when it goes live.
- `CaseStudyNext` renders the onward link at the foot of each case study, wrapping around `caseStudies` order so no page dead-ends. It sits outside `<main>` as its own `nav` landmark.
- Homepage card titles are `h3`, so `page.tsx` carries an `sr-only` `h2` ("Selected work") next to the card grid to keep the outline from jumping `h1` → `h3`. The `h1` itself lives inside `HomeSidebar`, not directly in `page.tsx`. If a visible section heading is ever added, remove the `sr-only` one rather than having both.
- Same pattern on `/about`: `CaseStudyPointsGrid` renders `h3` item titles, which on case-study pages always sit below a visible `h2`. About has no section heading above its stats block, so it carries its own `sr-only` `h2` ("Highlights") for the same reason.
- `siteDescription` and `expertise` (`src/lib/site.ts`) are kept in sync with the About page's bio by hand — there is no shared source. About is the more detailed, authoritative account (specific years, named employers), so when the two drift, update `site.ts` to match About rather than the reverse.
- Each case study carries its ship year in `caseStudies` (`year`). It drives the visible `CaseStudyYear` block, `article:published_time`, and `datePublished` in structured data. Year-only precision is deliberate — do not invent a month or day.
- `CaseStudyJsonLd` emits per-case-study `CreativeWork` schema whose `author` and `isPartOf` reference the `@id`s from the root layout's graph, so one Person and one WebSite resolve across the page. `CreativeWork` over `Article` on purpose: these are portfolio pieces, and Article rich results would not apply.
- Outbound identity links live in `profiles` (`src/lib/site.ts`) and feed `Person.sameAs`. Add a real visible link alongside any new entry — an actual link is a stronger entity signal than `sameAs` alone.
- `author.email`, `author.linkedIn`, and `author.github` are the single source for contact links. Do not re-hardcode these URLs in components.
- Sitemap `lastModified` intentionally uses build time, not `year`: `lastmod` describes when the page changed, not when the project shipped.
- Still outstanding from the SEO audit: homepage content depth and all AEO work (question-phrased headings, FAQ content and schema). About's headings are declarative ("Where I've worked") rather than question-phrased — converting a couple plus adding a small FAQ section is the next highest-leverage AEO move. Each needs facts only the site owner has.

## Accessibility Conventions

- Every page's `<main>` must have `id="main-content"`.
- `CaseStudyHeader` renders a `.skip-link` as its first child. The homepage and the two editorial case studies have no shared header, so each renders its own standalone `.skip-link` as the first element in its returned JSX instead.
- Global focus is handled in `globals.css` for `a:focus-visible` and `button:focus-visible`. Do not add per-element focus overrides unless a specific component needs a different visible treatment.
- Global reduced-motion handling in `globals.css` neutralizes transitions and animations under `prefers-reduced-motion: reduce`.
- `ProjectImage` requires real `alt` text. `CaseStudyFigure` may fall back to its caption when the visible caption already describes the image.
- Do not claim accessibility compliance from screenshots alone. For visual QA, check layout, focus affordance, text contrast risk, text reflow, and reduced-motion behavior where relevant.

## Interaction And Motion

- Text links dim on hover to `text-white/60` and active press to `text-white/40` with `transition-colors duration-200`.
- Case-study card images zoom to `scale-105` on hover with `duration-500 ease-out`.
- `CaseStudyCard` border shifts from `stroke-dark` to `gray-dark` and adds `hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]` at `md` and up, where the card has a visible border box; it's borderless on mobile. `active:scale-[0.99]` press applies at every breakpoint.
- Card arrows slide in on hover using the same visual language as the back arrow in `CaseStudyHeader`.
- `.animate-fade-up` is a zero-JS page-load animation: 12px translateY + opacity, 700ms `cubic-bezier(0.16, 1, 0.3, 1)`, `both` fill mode.
- Use small server-rendered stagger delays for side-by-side mapped items only. Sequential content blocks do not need individual staggering.

## Case Study Patterns

Simple/showcase case studies (Forty5Park, Uber Suite, Github's Security Findings) use `CaseStudyHeader`, content sections, and `ProjectImage`.

Editorial case studies (GoRight, Arrowhead Transit) use a different page chrome from every other route, on top of their own content components:

- `CaseStudyProjectHeader`
- `CaseStudySectionHeading`
- `CaseStudyPointsGrid`
- `CaseStudyCallout`
- `CaseStudyStatement`
- `CaseStudyDecisionBlock`
- `CaseStudyFigure`
- `CaseStudyImagePair`

Instead of `CaseStudyHeader`, they use `EditorialSidebar`/`EditorialMobileBar` (`src/components/case-study-editorial-sidebar.tsx`) — a persistent identity sidebar inspired by the homepage's `HomeSidebar` (Figma node 268:1037; adapted, not a literal port — see the component's own doc comment and DESIGN.md's Editorial Sidebar section for what changed and why). Both pages render their own skip link (no shared header to provide one) and drop `SiteFooter` (the sidebar's own copyright covers that role, matching the homepage). `CaseStudyNext` still renders after `</main>` as its own full-width band, unaffected by the sidebar.

For callouts/results boxes, align content left and let text fill the available width. This was fixed on GoRight and Arrowhead after browser annotations showed centered or capped text felt misplaced.

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
