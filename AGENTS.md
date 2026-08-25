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

- `src/app/(sidebar-shell)/` — route group holding **every** page on the site: the homepage, `/about`, and all five case studies. Its `layout.tsx` renders the skip link, `MobileTopBar`, `HomeSidebar`, and `MobileFooter` exactly once, so they persist as the same DOM node across client-side navigation instead of remounting per page (see DESIGN.md's Sidebar Shell Layout section for why this matters). Each page under it returns only its own content column. `(sidebar-shell)` is invisible in the URL — only the file location moved, routes are unaffected. `/case-studies-deck` is the one route outside this group: a self-contained full-viewport presentation route with no shared chrome.
- `src/app/(sidebar-shell)/layout.tsx` — the shared shell. A client component (`usePathname`) so it can compute `bioAs` (`"h1"` on `/` and `/about`, `"p"` everywhere else) and `activeNav` (`"resume"` on `/about`, `"works"` everywhere else) and pass them into `HomeSidebar`. Pages themselves stay Server Components — passing them as `children` into a client layout is a normal, supported RSC pattern.
- `src/components/home-sidebar.tsx` — the persistent identity sidebar: name/role lockup, the bio statement (the page's `h1` on `/` and `/about`, a plain `p` elsewhere), the "based in / working with" tool sentence, `/ Works` / `/ Resume` nav, contact links, and copyright. `md:fixed` to the viewport's left edge, `hidden` below `md` (mobile gets `MobileTopBar`/`MobileFooter` instead). Every page using it must offset its own content with `md:pl-[368px] lg:pl-[384px]` since `fixed` removes it from document flow.
- `src/components/contact-glyph.tsx` — outline mail/LinkedIn/GitHub glyphs (`stroke="currentColor"`) used by the sidebar and mobile top bar. Distinct from `ToolIcon`'s brand-colored badges.
- `src/components/mobile-top-bar.tsx`, `src/components/mobile-footer.tsx` — mobile-only (`md:hidden`) replacements for the sidebar, rendered once by the shared layout. `MobileTopBar` is an intentional client leaf (its menu is a real dialog) — its collapsed bar and expanded panel are one always-mounted element (not conditionally mounted), which is what makes its expand/collapse and icon crossfade transitions actually animate instead of popping. See DESIGN.md's Mobile Top Bar section.
- `src/components/case-study-back-link.tsx` — fixed "back to the portfolio grid" link, `md`+ only, called individually by each of the five case study pages (not part of the shared layout).
- `src/app/(sidebar-shell)/about/page.tsx` — resume-style About page: hero, credentials strip, experience list, and skills chips built from the site owner's actual résumé content. Its own `<h1>` is `md:hidden` — the sidebar's bio statement is the real `h1` at `md`+. Linked from the sidebar's "/ Resume" link, indexed, and included in the sitemap.
- `src/app/case-studies-deck/page.tsx` — presentation route with an initial case-study chooser and interactive GoRight and Arrowhead Transit slide sequences.
- `src/app/(sidebar-shell)/case-studies/*/page.tsx` — five case study pages: Forty5Park, Uber Suite, Github's Security Findings, GoRight, Arrowhead Transit. All share the same sidebar shell; they differ only in which content components they use — see Case Study Patterns below.
- `src/components/` — shared, flat component files. `case-studies-deck.tsx` is an intentional client leaf because keyboard and button controls change the active slide. Avoid nested component folders unless the project structure changes substantially.
- `src/lib/site.ts` — canonical site URL, site name, shared description, author entity, and the `expertise` list used by `Person` schema.
- `src/lib/case-studies.ts` — the single source of truth for the five case studies plus the `caseStudyMetadata()` helper. The homepage grid and `app/sitemap.ts` both read this array, so a project cannot appear on the homepage while missing from the sitemap.
- `src/app/robots.ts` and `src/app/sitemap.ts` — Next.js metadata routes that generate `/robots.txt` and `/sitemap.xml`.
- `src/app/opengraph-image.tsx` — generated site-wide share card via `next/og` `ImageResponse`.
- `src/app/globals.css` — Tailwind v4 `@theme inline` design tokens plus global focus, motion, and font-rendering rules.
- `DESIGN.md` — design-system documentation. Update it whenever tokens, core component styles, interaction rules, accessibility conventions, or responsive behavior change.
- `.storybook/` — Storybook configuration. Stories live beside shared components as `src/components/*.stories.tsx`.

There is no `SiteHeader`, `SiteFooter`, `CaseStudyHeader`, `EditorialSidebar`, `CaseStudyNext`, or `social-icon.tsx` anymore — all were deleted once every route moved onto the sidebar shell above. Don't look for them; rebuild from the shell pattern instead if a future page needs something equivalent.

## Responsive Convention

Use the three-tier breakpoint system that matches the Figma frames where available:

- Base mobile `<768px`: 24px page padding (`px-6`).
- Tablet `md`, 768–1023px: 40px page padding (`md:px-10`).
- Desktop `lg`, 1024px+: 64px page padding (`lg:px-16`).

When Figma provides desktop, tablet, and mobile frames, inspect each independently. Do not assume a desktop frame scales uniformly.

Shared components may expose override props such as `aspectClassName`, `roundedClassName`, `mdGapClassName`, and `maxWidthClassName` because individual case studies deviate by breakpoint. Re-check the target page before generalizing values.

Breakpoint gotcha: when a flex row switches to `flex-row` at one breakpoint, child width or `flex-1` overrides must switch at the same breakpoint. If the child waits until a later breakpoint, it can keep claiming full width and force wrapping.

Full-bleed gotcha: a `-mx-6` (or similar) negative-margin breakout only expands a child to the true full viewport width if the child's own `width` stays `auto`. Explicit `w-full` fixes it at `width: 100%` of the *parent's* content box — and when that parent is a `flex flex-col` container (as most page-content wrappers on this site are), a flex item's stretch sizing doesn't grow to absorb the negative margin the way plain block flow would, so the breakout child ends up ~2x the margin narrower than the viewport (a real gap on both edges) instead of truly edge-to-edge. Caught live on the homepage's mobile card grid: fix is to drop the unconditional `w-full` and reapply it only at the breakpoint where the negative margin itself is canceled (e.g. `md:w-full` alongside `md:mx-0`).

## Design System

Use `DESIGN.md` as the source of truth for:

- Color, radius, typography, and motion tokens.
- Global styles such as focus rings, reduced motion, and font rendering.
- Component rules for chips, project cards, callouts, case-study figures, and editorial sections.
- Accessibility expectations.

Current high-level design choices:

- Dark base: `dark-primary` background, `stroke-dark` borders, `gray-dark` low-emphasis strokes.
- Three-tier variable font system via `next/font`: Space Grotesk (headings), Noto Sans (body/links), JetBrains Mono (labels/chips/captions/meta) — except every component under the sidebar system (`HomeSidebar`, `MobileTopBar`, `CaseStudyCard`, the homepage's mobile hero block) is JetBrains Mono end-to-end, headings and prose included. See DESIGN.md's Typography section for the full rule and which components opt in.
- Chips keep a 4px `rounded-token` radius, and so do `CaseStudyCard`, `HomeSidebar`, and `MobileTopBar`'s surfaces. Everything else (callouts, results boxes) stays `rounded-none`. See `DESIGN.md`'s Radius Tokens section for the full rule.
- Fluid display type for large headings; readable minimum text size is 14px.
- Body copy should not use very light weights. Use 400 for body text and 500 for small labels.
- Home project cards (`CaseStudyCard`) stack image-then-content at every breakpoint: full-bleed and sharp below `md`, a `bg-stroke-dark` surface with `rounded-token` corners at `md`+. Thumbnails are `aspect-video` (16:9) so the crop stays identical across breakpoints. See DESIGN.md's `CaseStudyCard` section.
- Case-study callouts and results boxes should fill their container width and align content left. Do not cap callout paragraph width unless the design explicitly calls for a centered editorial quote.
- Case-study text/image content columns use `items-center` on the parent with every child `w-full max-w-[*]` (text at 720px, images at 1280px) — the `items-center` half is required to actually center a narrower, definite-width flex child; `items-stretch` (the default) won't do it on its own.

## Typography

- Headings and short display statements use `text-balance`.
- Long paragraphs use `text-pretty`.
- Use real semantic headings: page title `h1`, major sections `h2`, item/card/decision titles `h3`.
- Body prose line-length caps use `ch` units when a cap is desired. Do not apply a `70ch` cap inside callout/result boxes that are meant to fill the whole box.
- Avoid one-off arbitrary font sizes unless there is a clear visual reason. Prefer tokens from `globals.css`.

## Homepage Copy Pattern

The redesign moved this copy out of a large hero statement and into `HomeSidebar`'s narrow column, at the sidebar's `text-body-h3 text-white/70` scale rather than the old `text-body-h1`. It's still a plain icon-labeled tool list — no chip borders or background — just smaller and set as **plain inline text flow inside one `<p>`** (not a `flex flex-wrap` container), so the browser can wrap at any normal word boundary instead of stranding a lone comma or "and" at the start of a wrapped line:

`Based in Colombia, working globally with` `[icon] Figma` `,` `[icon] Claude Code` `and` `[icon] Codex`

Each tool name pairs a decorative `ToolIcon` (sized `size-3` here, down from the old `size-3.5`) with its label inside one `inline-flex` span, so the icon never separates from its name when the line wraps. The comma and connector words like `and` are ordinary text nodes, not flex items — only each icon+label pairing gets its own `inline-flex`. Keep the visible label as the accessible name — the icon wrapper stays `aria-hidden` and does not get a redundant accessible name of its own. Same pattern for the mobile-only duplicate of this sentence in `page.tsx`'s hero block.

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
- `/about` started as an unlinked, noindex WIP page (same treatment as `/case-studies-deck`) while its content was drafted. Once the homepage linked to it, both the `robots` override and the sitemap exclusion were removed — it is now indexed and listed in `sitemap.ts`. The only in-page link to it is the "/ Resume" nav item in `HomeSidebar` (`md`+) / the mobile top bar (below `md`) — there is no separate site-wide header nav. If a future page follows the same draft-first pattern, remember to flip both when it goes live.
- There is no "next case study" link at the foot of each page anymore (the old `CaseStudyNext` component was deleted) — the persistent `/ Works` sidebar link covers the onward path back to the index instead.
- Homepage card titles are `h3`, so `(sidebar-shell)/page.tsx` carries an `sr-only` `h2` ("Selected Case Studies (N)") next to the card grid to keep the outline from jumping `h1` → `h3`. The `h1` itself lives inside `HomeSidebar`, not directly in `page.tsx`. If a visible section heading is ever added, remove the `sr-only` one rather than having both.
- Same pattern on `/about`: its stats block writes its own `h3` item titles inline (it does not use `CaseStudyPointsGrid`), which on case-study pages always sit below a visible `h2`. About has no section heading above its stats block, so it carries its own `sr-only` `h2` ("Highlights") for the same reason.
- `siteDescription` and `expertise` (`src/lib/site.ts`) are kept in sync with the About page's bio by hand — there is no shared source. About is the more detailed, authoritative account (specific years, named employers), so when the two drift, update `site.ts` to match About rather than the reverse.
- Each case study carries its ship year in `caseStudies` (`year`). It drives the visible `CaseStudyYear` block, `article:published_time`, and `datePublished` in structured data. Year-only precision is deliberate — do not invent a month or day.
- `CaseStudyJsonLd` emits per-case-study `CreativeWork` schema whose `author` and `isPartOf` reference the `@id`s from the root layout's graph, so one Person and one WebSite resolve across the page. `CreativeWork` over `Article` on purpose: these are portfolio pieces, and Article rich results would not apply.
- Outbound identity links live in `profiles` (`src/lib/site.ts`) and feed `Person.sameAs`. Add a real visible link alongside any new entry — an actual link is a stronger entity signal than `sameAs` alone.
- `author.email`, `author.linkedIn`, and `author.github` are the single source for contact links. Do not re-hardcode these URLs in components.
- Sitemap `lastModified` intentionally uses build time, not `year`: `lastmod` describes when the page changed, not when the project shipped.
- Every page must resolve to exactly one real `<h1>` in the served HTML — not zero, not two. This is easy to violate by accident on this system specifically: `/` and `/about` each have a mobile-only duplicate block *and* the sidebar's own statement, toggled by `hidden`/`md:hidden` rather than actually removed from the DOM, so a naive "give each its own `<h1>`" instinct ships two real headings at once (verified live with `curl` — a browser screenshot alone won't catch this, since only one is ever visible at a given viewport). The fix: exactly one `<h1>` — `sr-only`, not `hidden`/`display:none`, so it survives in the accessibility tree at every breakpoint — with every visual duplicate demoted to a `<p>`. See `home-sidebar.tsx`'s doc comment and DESIGN.md's Homepage Sidebar section for the full mechanism.
- `CaseStudyJsonLd` also emits a two-level `BreadcrumbList` (Home → case study) alongside its `CreativeWork` script, using the same `siteUrl`/`caseStudy.href` data already in `case-studies.ts` — two levels because the site itself is two levels deep (case studies sit directly off `/`, there's no `/case-studies` index route).
- Case-study meta descriptions should stay in the 150–160 character range (checked live, not just visually — Google truncates well before 200). Arrowhead Transit, Github's Security Findings, and Uber Suite originally ran 172–209 characters; trimmed without changing their meaning.
- Still outstanding from the SEO audit: homepage/showcase-case-study content depth (Forty5Park, Uber Suite, and Github's Security Findings run ~200 words each vs. GoRight/Arrowhead's ~700–800) and all AEO work (question-phrased headings, FAQ content and schema). About's headings are declarative ("Where I've worked") rather than question-phrased — converting a couple plus adding a small FAQ section is the next highest-leverage AEO move. Each needs facts, narrative details, or a voice decision only the site owner can supply — do not invent case-study specifics or FAQ answers.

## Accessibility Conventions

- Every page's `<main>` must have `id="main-content"`.
- `(sidebar-shell)/layout.tsx` renders a `.skip-link` as its first child, shared by every page in the group. `/case-studies-deck`, the one route outside it, has its own standalone `.skip-link` inside `CaseStudiesDeck` instead.
- Global focus is handled in `globals.css` for `a:focus-visible` and `button:focus-visible`. Do not add per-element focus overrides unless a specific component needs a different visible treatment.
- Global reduced-motion handling in `globals.css` neutralizes transitions and animations under `prefers-reduced-motion: reduce`.
- `ProjectImage` requires real `alt` text. `CaseStudyFigure` may fall back to its caption when the visible caption already describes the image.
- Do not claim accessibility compliance from screenshots alone. For visual QA, check layout, focus affordance, text contrast risk, text reflow, and reduced-motion behavior where relevant.

## Interaction And Motion

- Text links dim on hover to `text-white/60` and active press to `text-white/40` with `transition-colors duration-200`.
- Case-study card images zoom to `scale-105` on hover with `duration-500 ease-out`.
- `CaseStudyCard` border shifts from `stroke-dark` to `gray-dark` and adds `hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)]` at `md` and up, where the card has a visible border box; it's borderless on mobile. `active:scale-[0.99]` press applies at every breakpoint.
- `CaseStudyCard`'s forward arrow slides in and fades in on hover (`-translate-x-1` → `translate-x-0`, `opacity-0` → `opacity-100`).
- `.animate-fade-up` is a zero-JS page-load animation: 12px translateY + opacity, 700ms `cubic-bezier(0.16, 1, 0.3, 1)`, `both` fill mode.
- Every top-level content section on a page should carry `.animate-fade-up`, and every page's sections should cascade in, not fade up as one flat block. `.stagger-section` (globals.css) gives every direct `.animate-fade-up` child of a wrapper an incrementing delay by DOM position (60ms steps, capped at 420ms) — apply it to a page's outer content wrapper when that page's sections are flat siblings (every case study). For a page with sections nested two levels deep (`/about`'s Experience/Skills blocks), hand-assign `[animation-delay:Nms]` in the same 60ms steps instead — see DESIGN.md's Page-Load Stagger section for the full mechanism and why nesting two `.animate-fade-up` elements in an ancestor/descendant relationship must be avoided.
- Persistent navigation chrome (`HomeSidebar`, `MobileTopBar`, `MobileFooter`, `CaseStudyBackLink`) never carries `.animate-fade-up` — it reads as static structure, not loading content. Only page content animates.

## Case Study Patterns

Every case study is on the shared `(sidebar-shell)` system now — the migration is complete, so all five pages get `HomeSidebar`/`MobileTopBar`/`MobileFooter` from the shell layout for free and differ only in which content components they use.

Forty5Park, Uber Suite, and Github's Security Findings (simple/showcase) use `ProjectImage` and plain content sections, centered at `max-w-[720px]` for text and `max-w-[1280px]` for images (see the Design System section above for the `items-center` gotcha).

GoRight and Arrowhead Transit (editorial) use a dedicated set of content components instead, matching Figma's `case-study-desktop` frame (node 339:596):

- `CaseStudyProjectHeader` — title/role/tools/year/intro. No subtitle under the title (Figma has no equivalent).
- `CaseStudySectionHeading`
- `CaseStudyPointsGrid` — stacks vertically (`flex-col`), not a multi-column grid; Figma has no side-by-side version anywhere on the page.
- `CaseStudyCallout`
- `CaseStudyStatement`
- `CaseStudyDecisionBlock` — text-only; each one is followed by its own full-width `CaseStudyFigure` stacked directly below it, not laid out side-by-side.
- `CaseStudyFigure`
- `CaseStudyImagePair`

No divider lines between sections on either page — Figma has none; spacing alone carries the separation, matching every other page on this system.

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
