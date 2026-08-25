import type { Metadata } from "next";
import Link from "next/link";
import { Chip } from "@/components/chip";
import { ToolIcon } from "@/components/tool-icon";
import { siteName, titleTemplate } from "@/lib/site";

const aboutDescription =
  "Analdo Gomez is a Senior Product Designer with 14+ years building B2B software for fintech, retirement, and SaaS — specializing in design systems.";

/**
 * `openGraph`/`twitter` are set explicitly here, unlike most routes: Next
 * doesn't deep-merge `openGraph`, so a route that omits it inherits the root
 * layout's object verbatim — title, description, and url included. Without
 * this override, sharing `/about` showed the homepage's card. The generated
 * `opengraph-image` file convention still applies automatically; only the
 * text fields need restating.
 */
export const metadata: Metadata = {
  title: "About",
  description: aboutDescription,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "profile",
    siteName,
    title: titleTemplate.replace("%s", "About"),
    description: aboutDescription,
    url: "/about",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: titleTemplate.replace("%s", "About"),
    description: aboutDescription,
  },
};

const inlineLinkStyles =
  "font-mono text-white underline decoration-white/30 underline-offset-2 [text-decoration-thickness:from-font] [text-underline-position:from-font] transition-colors duration-200 hover:text-white/60 active:text-white/40";

/**
 * The shell (skip link, MobileTopBar, HomeSidebar, MobileFooter) lives in
 * this route group's `layout.tsx` now — this page only returns its own
 * content column.
 *
 * No Figma frame exists for this page specifically, so its structure is
 * extrapolated from the established pattern rather than matched to a
 * spec — flag for review if a real About/Resume frame shows up later.
 *
 * This page writes its own stats grid and section headings inline rather
 * than reusing `CaseStudyPointsGrid`/`CaseStudySectionHeading` — those are
 * shared with GoRight and Arrowhead Transit, and editing them in place
 * would change those pages' typography too.
 *
 * The stats row is the one exception to the 720px text measure: three
 * compact number+description blocks read better with the extra width a
 * multi-column row gets, so it's capped at `max-w-[1280px]` instead, the
 * same measure `ProjectImage`s use elsewhere on this system.
 *
 * The real `<h1>` for this page is `HomeSidebar`'s own `sr-only` heading
 * (present at every breakpoint, holding the shared `bioStatement` text,
 * not this page's own copy below) — the `md:hidden` heading right below is
 * a purely visual mobile duplicate, demoted to a `<p>` for exactly that
 * reason. See `home-sidebar.tsx`'s doc comment: this page used to ship two
 * real, differently-worded `<h1>` elements in the DOM at once (this page's
 * own statement and the sidebar's), confirmed with a live curl audit.
 *
 * Load-in stagger uses hand-assigned `[animation-delay:Nms]` in 60ms
 * steps (0, 60, 120, 180, 240, 300 — intro, stats, Experience heading,
 * Experience list, Skills heading, Skills chips) rather than
 * globals.css's `.stagger-section` nth-child mechanism: that mechanism
 * only staggers a container's *direct* children, and this page's
 * Experience/Skills blocks nest their animated heading and their animated
 * content two levels deep inside an unanimated wrapper (see
 * `.stagger-section`'s own comment for why that wrapper stays
 * unanimated — its children already carry the fade). `.stagger-section`
 * is a better fit for the case-study pages, whose sections are flatter
 * (direct siblings of one wrapper) — see those pages instead.
 */
export default function AboutPage() {
  return (
    <div className="flex flex-col items-center gap-12 px-6 pt-24 pb-16 md:gap-16 md:p-12 md:pl-[368px] lg:p-16 lg:pl-[384px]">
      <div className="flex w-full max-w-[720px] animate-fade-up flex-col items-start gap-6">
        <p className="font-mono text-body-h3 text-white/70 uppercase tracking-[0.05em]">
          About
        </p>
        {/*
          md:hidden: a purely visual mobile duplicate of the sidebar's own
          identity statement — the sidebar itself (and its sr-only h1) is
          hidden below md, so mobile needs its own visible copy here. Not a
          heading: HomeSidebar's sr-only h1 is this page's one real h1 at
          every breakpoint (see home-sidebar.tsx's doc comment).
        */}
        <p className="w-full text-balance font-mono text-heading-h3 font-bold text-white md:hidden">
          Product designer who builds systems B2B teams can ship
          straight to code.
        </p>
        {/*
          Explicit "X is Y" definition sentence, not just a fact fragment —
          reuses `aboutDescription`'s own wording (name, role, years) so
          AI answer engines extracting this page's core claim have it in
          visible body copy, not only in <meta name="description">.
        */}
        <p className="w-full text-pretty font-mono text-body-h2 text-white/70">
          Analdo Gomez is a Senior Product Designer with 14+ years
          designing intuitive, data-driven products for fintech,
          retirement, and SaaS clients — based in Colombia, working with
          teams across the US.
        </p>
      </div>

      {/*
        The three stat items below render h3 titles, which would
        otherwise follow this h1 directly — sr-only h2 keeps the
        document outline valid (h1 -> h2 -> h3) without introducing new
        visible copy this page doesn't need.

        Spec-sheet rows (number + description on one baseline, separated
        by border-b) rather than a stacked list — deliberately mirrors the
        Experience section's own border-b/pb-8 row rhythm right below this
        block, so the two lists read as one consistent system instead of
        two different layout languages on the same page. The number
        column is a fixed width so the description's left edge lines up
        identically across all three rows regardless of digit count
        ("3" vs "200+").
      */}
      <h2 className="sr-only">Highlights</h2>
      <div className="flex w-full max-w-[720px] animate-fade-up flex-col gap-8 [animation-delay:60ms]">
        <div className="flex w-full items-baseline gap-6 border-b border-stroke-dark pb-8 md:gap-8">
          <h3 className="w-[72px] shrink-0 font-mono text-heading-h3 font-bold text-white md:w-[110px]">
            14+
          </h3>
          <p className="flex-1 text-pretty font-mono text-body-h2 text-white/70">
            Years designing B2B products for fintech, retirement, and
            SaaS clients
          </p>
        </div>
        <div className="flex w-full items-baseline gap-6 border-b border-stroke-dark pb-8 md:gap-8">
          <h3 className="w-[72px] shrink-0 font-mono text-heading-h3 font-bold text-white md:w-[110px]">
            3
          </h3>
          <p className="flex-1 text-pretty font-mono text-body-h2 text-white/70">
            Design systems built and scaled from the ground up
          </p>
        </div>
        <div className="flex w-full items-baseline gap-6 md:gap-8">
          <h3 className="w-[72px] shrink-0 font-mono text-heading-h3 font-bold text-white md:w-[110px]">
            200+
          </h3>
          <p className="flex-1 text-pretty font-mono text-body-h2 text-white/70">
            Components shipped in the Merlin Design System for GoRight
          </p>
        </div>
      </div>

      <div className="flex w-full max-w-[720px] flex-col items-start gap-8">
        <div className="flex w-full animate-fade-up flex-col items-start [animation-delay:120ms]">
          <p className="w-full font-mono text-body-h3 text-white/70 uppercase tracking-[0.05em]">
            Experience
          </p>
          <h2 className="w-full text-balance font-mono text-heading-h3 font-bold text-white">
            Where I&rsquo;ve worked
          </h2>
        </div>

        <div className="flex w-full animate-fade-up flex-col items-start gap-8 [animation-delay:180ms]">
          <div className="flex w-full flex-col items-start gap-2 border-b border-stroke-dark pb-8">
            <div className="flex w-full flex-col items-start justify-between gap-1 md:flex-row md:items-baseline">
              <h3 className="text-balance font-mono text-heading-h5 font-bold text-white">
                Senior Product Designer — Monks{" "}
                <span className="text-white/50">(formerly Zemoga)</span>
              </h3>
              <p className="shrink-0 font-mono text-body-h3 text-white/50">
                May 2021 – Jun 2026
              </p>
            </div>
            <p className="font-mono text-body-h3 text-white/50">
              Colombia · Remote, US clients
            </p>
            <p className="w-full text-pretty font-mono text-body-h2 text-white/70">
              Owned the Morningstar Plan Advantage platform end to end,
              built custom configurations that supported three enterprise
              deals, and advised the Morningstar Design System team. Led
              design for{" "}
              <Link href="/case-studies/forty5park" className={inlineLinkStyles}>
                Forty5Park
              </Link>{" "}
              and{" "}
              <Link href="/case-studies/goright" className={inlineLinkStyles}>
                GoRight
              </Link>
              , including the 200+ component Merlin Design System.
            </p>
          </div>

          <div className="flex w-full flex-col items-start gap-2 border-b border-stroke-dark pb-8">
            <div className="flex w-full flex-col items-start justify-between gap-1 md:flex-row md:items-baseline">
              <h3 className="text-balance font-mono text-heading-h5 font-bold text-white">
                Senior Product Designer — FullStack Labs
              </h3>
              <p className="shrink-0 font-mono text-body-h3 text-white/50">
                Oct 2017 – May 2021
              </p>
            </div>
            <p className="font-mono text-body-h3 text-white/50">
              Colombia / US · Remote
            </p>
            <p className="w-full text-pretty font-mono text-body-h2 text-white/70">
              Partnered with Uber to design{" "}
              <Link href="/case-studies/uber-suite" className={inlineLinkStyles}>
                Uber Suite
              </Link>
              , an all-in-one internal toolset for company-wide
              communication and engagement. Served as sole product
              designer for the Benjamin West platform, including its
              custom design system.
            </p>
          </div>

          <div className="flex w-full flex-col items-start gap-2">
            <div className="flex w-full flex-col items-start justify-between gap-1 md:flex-row md:items-baseline">
              <h3 className="text-balance font-mono text-heading-h5 font-bold text-white">
                Technical Lead &amp; UX/UI Designer — Ideaware
              </h3>
              <p className="shrink-0 font-mono text-body-h3 text-white/50">
                Nov 2011 – Oct 2017
              </p>
            </div>
            <p className="font-mono text-body-h3 text-white/50">
              Colombia / US · Remote
            </p>
            <p className="w-full text-pretty font-mono text-body-h2 text-white/70">
              Led multidisciplinary teams of designers and developers
              across client projects spanning health, real estate,
              interior design, architecture, e-commerce, and
              transportation.
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full max-w-[720px] flex-col items-start gap-8">
        <div className="flex w-full animate-fade-up flex-col items-start [animation-delay:240ms]">
          <p className="w-full font-mono text-body-h3 text-white/70 uppercase tracking-[0.05em]">
            Skills
          </p>
          <h2 className="w-full text-balance font-mono text-heading-h3 font-bold text-white">
            What I bring to a team
          </h2>
        </div>

        <div className="flex w-full animate-fade-up flex-col items-start gap-6 [animation-delay:300ms]">
          <div className="flex flex-col items-start gap-3">
            <p className="font-mono text-body-h3 text-white/70 uppercase tracking-[0.05em]">
              Design
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Chip label="Product design" />
              <Chip label="UX/UI design" />
              <Chip label="Design systems" />
              <Chip label="User research" />
              <Chip label="Usability testing" />
              <Chip label="Accessibility" />
              <Chip label="Dev handoff" />
            </div>
          </div>

          <div className="flex flex-col items-start gap-3">
            <p className="font-mono text-body-h3 text-white/70 uppercase tracking-[0.05em]">
              Front-end &amp; tools
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <Chip label="Figma" icon={<ToolIcon name="figma" />} />
              <Chip label="Claude Code" icon={<ToolIcon name="claude" />} />
              <Chip label="Codex" icon={<ToolIcon name="codex" />} />
              <Chip label="GitHub" icon={<ToolIcon name="github" />} />
              <Chip label="Storybook" icon={<ToolIcon name="storybook" />} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
