import type { Metadata } from "next";
import Link from "next/link";
import { CaseStudyHeader } from "@/components/case-study-header";
import { SiteFooter } from "@/components/site-footer";
import { CaseStudyPointsGrid } from "@/components/case-study-points-grid";
import { CaseStudySectionHeading } from "@/components/case-study-section-heading";
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
  "text-white underline decoration-white/30 underline-offset-2 [text-decoration-thickness:from-font] [text-underline-position:from-font] transition-colors duration-200 hover:text-white/60 active:text-white/40";

export default function AboutPage() {
  return (
    <>
      <CaseStudyHeader />

      <main id="main-content" className="flex-1">
        <section className="mx-auto flex w-full max-w-[1280px] flex-col items-start gap-12 px-6 pt-12 pb-16 md:gap-16 md:px-10 md:pt-16 lg:px-16 lg:pt-40">
          <div className="flex flex-col items-start gap-6">
            {/*
              `CaseStudyHeader` hides the name lockup below `md`, so this swaps
              the eyebrow for it on mobile rather than losing it — the role is
              dropped here since the h1 below already covers it. `md` and up
              keep the plain "About" eyebrow since the header already shows the
              full lockup there.
            */}
            <p className="animate-fade-up text-overline text-white md:hidden">
              Analdo Gomez
            </p>
            <p className="hidden animate-fade-up text-overline text-white/70 md:block">
              About
            </p>
            <h1 className="w-full animate-fade-up text-balance text-heading-h4 text-white md:text-heading-h2 lg:max-w-[884px]">
              Product designer who builds systems B2B teams can ship
              straight to code.
            </h1>
            <p className="w-full max-w-[65ch] animate-fade-up text-pretty text-body-h1 text-white/70 [animation-delay:100ms]">
              14+ years designing intuitive, data-driven products for
              fintech, retirement, and SaaS clients — based in Colombia,
              working with teams across the US.
            </p>
          </div>

          {/*
            CaseStudyPointsGrid renders h3 item titles, which on case-study
            pages always follow a visible h2 section heading. About has no
            section heading above the stats, so this sr-only h2 keeps the
            outline valid instead of jumping h1 -> h3.
          */}
          <h2 className="sr-only">Highlights</h2>
          <CaseStudyPointsGrid
            items={[
              {
                number: "1.",
                title: "14+",
                description:
                  "Years designing B2B products for fintech, retirement, and SaaS clients",
              },
              {
                number: "2.",
                title: "3",
                description:
                  "Design systems built and scaled from the ground up",
              },
              {
                number: "3.",
                title: "200+",
                description:
                  "Components shipped in the Merlin Design System for GoRight",
              },
            ]}
            showNumbers={false}
            titleClassName="text-heading-h3 md:text-heading-h2"
          />

          <div className="flex w-full flex-col items-start gap-8">
            <CaseStudySectionHeading
              eyebrow="Experience"
              title="Where I've worked"
            />

            <div className="flex w-full animate-fade-up flex-col items-start gap-8">
              <div className="flex w-full flex-col items-start gap-2 border-b border-stroke-dark pb-8">
                <div className="flex w-full flex-col items-start justify-between gap-1 md:flex-row md:items-baseline">
                  <h3 className="text-balance text-heading-h5 text-white">
                    Senior Product Designer — Monks{" "}
                    <span className="text-white/50">
                      (formerly Zemoga)
                    </span>
                  </h3>
                  <p className="shrink-0 font-mono text-body-h3 text-white/50">
                    May 2021 – Jun 2026
                  </p>
                </div>
                <p className="font-mono text-body-h3 text-white/50">
                  Colombia · Remote, US clients
                </p>
                <p className="w-full text-pretty text-body-h2 text-white/70">
                  Owned the Morningstar Plan Advantage platform end to end,
                  built custom configurations that supported three enterprise
                  deals, and advised the Morningstar Design System team. Led
                  design for{" "}
                  <Link
                    href="/case-studies/forty5park"
                    className={inlineLinkStyles}
                  >
                    Forty5Park
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/case-studies/goright"
                    className={inlineLinkStyles}
                  >
                    GoRight
                  </Link>
                  , including the 200+ component Merlin Design System.
                </p>
              </div>

              <div className="flex w-full flex-col items-start gap-2 border-b border-stroke-dark pb-8">
                <div className="flex w-full flex-col items-start justify-between gap-1 md:flex-row md:items-baseline">
                  <h3 className="text-balance text-heading-h5 text-white">
                    Senior Product Designer — FullStack Labs
                  </h3>
                  <p className="shrink-0 font-mono text-body-h3 text-white/50">
                    Oct 2017 – May 2021
                  </p>
                </div>
                <p className="font-mono text-body-h3 text-white/50">
                  Colombia / US · Remote
                </p>
                <p className="w-full text-pretty text-body-h2 text-white/70">
                  Partnered with Uber to design{" "}
                  <Link
                    href="/case-studies/uber-suite"
                    className={inlineLinkStyles}
                  >
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
                  <h3 className="text-balance text-heading-h5 text-white">
                    Technical Lead & UX/UI Designer — Ideaware
                  </h3>
                  <p className="shrink-0 font-mono text-body-h3 text-white/50">
                    Nov 2011 – Oct 2017
                  </p>
                </div>
                <p className="font-mono text-body-h3 text-white/50">
                  Colombia / US · Remote
                </p>
                <p className="w-full text-pretty text-body-h2 text-white/70">
                  Led multidisciplinary teams of designers and developers
                  across client projects spanning health, real estate,
                  interior design, architecture, e-commerce, and
                  transportation.
                </p>
              </div>
            </div>
          </div>

          <div className="flex w-full flex-col items-start gap-8">
            <CaseStudySectionHeading
              eyebrow="Skills"
              title="What I bring to a team"
            />

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
                  <Chip
                    label="Claude Code"
                    icon={<ToolIcon name="claude" />}
                  />
                  <Chip label="Codex" icon={<ToolIcon name="codex" />} />
                  <Chip label="GitHub" icon={<ToolIcon name="github" />} />
                  <Chip
                    label="Storybook"
                    icon={<ToolIcon name="storybook" />}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
