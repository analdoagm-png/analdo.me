import type { Metadata } from "next";
import Link from "next/link";
import { HomeSidebar } from "@/components/home-sidebar";
import { MobileTopBar } from "@/components/mobile-top-bar";
import { MobileFooter } from "@/components/mobile-footer";
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
 * Fourth page moved to the new sidebar system, after the three showcase
 * case studies — same components (`HomeSidebar bioAs="p"`, `MobileTopBar`,
 * `MobileFooter`), same `items-center` / `w-full max-w-[720px]` centered
 * column for prose. No Figma frame exists for this page specifically, so
 * its structure is extrapolated from the established pattern rather than
 * matched to a spec — flag for review if a real About/Resume frame shows up
 * later.
 *
 * `CaseStudyPointsGrid` and `CaseStudySectionHeading` (the old page's
 * stats-grid and section-heading components) are still shared with GoRight
 * and Arrowhead Transit, which haven't moved to this system — so, matching
 * the showcase case studies, this page writes its stats grid and section
 * headings inline rather than editing those components' typography.
 *
 * The stats row is the one exception to the 720px text measure: three
 * compact number+description blocks read better with the extra width a
 * multi-column row gets, so it's capped at `max-w-[1280px]` instead, the
 * same measure `ProjectImage`s use elsewhere on this system.
 */
export default function AboutPage() {
  return (
    <>
      <a
        href="#main-content"
        className="skip-link rounded-token border border-stroke-dark bg-dark-primary px-4 py-2 font-mono text-body-h2 text-white"
      >
        Skip to content
      </a>

      <MobileTopBar />

      <main id="main-content" className="flex-1">
        <HomeSidebar
          bioAs="p"
          activeNav="resume"
          className="hidden md:fixed md:inset-y-0 md:left-0 md:flex md:w-80"
        />

        <div className="flex flex-col items-center gap-12 px-6 pt-24 pb-16 md:gap-16 md:p-12 md:pl-[368px] lg:p-16 lg:pl-[384px]">
          <div className="flex w-full max-w-[720px] animate-fade-up flex-col items-start gap-6">
            <p className="font-mono text-body-h3 text-white/70 uppercase tracking-[0.05em]">
              About
            </p>
            <h1 className="w-full text-balance font-mono text-heading-h3 font-bold text-white md:text-heading-h1">
              Product designer who builds systems B2B teams can ship
              straight to code.
            </h1>
            <p className="w-full text-pretty font-mono text-body-h2 text-white/70">
              14+ years designing intuitive, data-driven products for
              fintech, retirement, and SaaS clients — based in Colombia,
              working with teams across the US.
            </p>
          </div>

          {/*
            The three stat items below render h3 titles, which would
            otherwise follow this h1 directly — sr-only h2 keeps the
            document outline valid (h1 -> h2 -> h3) without introducing new
            visible copy this page doesn't need.
          */}
          <h2 className="sr-only">Highlights</h2>
          <div className="flex w-full max-w-[720px] animate-fade-up flex-col items-start gap-8 [animation-delay:80ms]">
            <div className="flex w-full flex-col items-start gap-2">
              <h3 className="w-full text-balance font-mono text-heading-h3 font-bold text-white">
                14+
              </h3>
              <p className="w-full text-pretty font-mono text-body-h2 text-white/70">
                Years designing B2B products for fintech, retirement, and
                SaaS clients
              </p>
            </div>
            <div className="flex w-full flex-col items-start gap-2">
              <h3 className="w-full text-balance font-mono text-heading-h3 font-bold text-white">
                3
              </h3>
              <p className="w-full text-pretty font-mono text-body-h2 text-white/70">
                Design systems built and scaled from the ground up
              </p>
            </div>
            <div className="flex w-full flex-col items-start gap-2">
              <h3 className="w-full text-balance font-mono text-heading-h3 font-bold text-white">
                200+
              </h3>
              <p className="w-full text-pretty font-mono text-body-h2 text-white/70">
                Components shipped in the Merlin Design System for GoRight
              </p>
            </div>
          </div>

          <div className="flex w-full max-w-[720px] flex-col items-start gap-8">
            <div className="flex w-full animate-fade-up flex-col items-start">
              <p className="w-full font-mono text-body-h3 text-white/70 uppercase tracking-[0.05em]">
                Experience
              </p>
              <h2 className="w-full text-balance font-mono text-heading-h5 font-bold text-white">
                Where I&rsquo;ve worked
              </h2>
            </div>

            <div className="flex w-full animate-fade-up flex-col items-start gap-8">
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
            <div className="flex w-full animate-fade-up flex-col items-start">
              <p className="w-full font-mono text-body-h3 text-white/70 uppercase tracking-[0.05em]">
                Skills
              </p>
              <h2 className="w-full text-balance font-mono text-heading-h5 font-bold text-white">
                What I bring to a team
              </h2>
            </div>

            <div className="flex w-full animate-fade-up flex-col items-start gap-6">
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
      </main>

      <MobileFooter />
    </>
  );
}
