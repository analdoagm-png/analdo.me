import { caseStudyMetadata } from "@/lib/case-studies";
import { HomeSidebar } from "@/components/home-sidebar";
import { MobileTopBar } from "@/components/mobile-top-bar";
import { MobileFooter } from "@/components/mobile-footer";
import { CaseStudyNext } from "@/components/case-study-next";
import { CaseStudyJsonLd } from "@/components/case-study-json-ld";
import { ProjectImage } from "@/components/project-image";

export const metadata = caseStudyMetadata({
  href: "/case-studies/forty5park",
  title: "Forty5Park Real Estate AI Platform",
  description:
    "AI-powered platform for real estate companies to manage acquisitions, forecast property valuations up to a year ahead, and benchmark against sector peers.",
});

/**
 * First case study on the new sidebar system (see DESIGN.md's Homepage
 * Sidebar / Case Study Sidebar sections) — mobile keeps a top-bar-plus-
 * inline-content layout, `md` and up gets the fixed `HomeSidebar` rail.
 * `bioAs="p"` since this page's own `h1` is "Forty5Park", not the sidebar's
 * bio statement.
 *
 * The YEAR meta and intro/section text blocks are written inline here
 * rather than through `CaseStudyYear`/`CaseStudyIntroBlock`/
 * `CaseStudySectionBlock` — those are shared with Uber Suite and Github's
 * Security Findings, which haven't moved to this iteration yet, and editing
 * them in place would change those pages' typography too. Once more case
 * studies move to this system, this repeated pattern is a good candidate to
 * extract into its own shared component.
 */
export default function Forty5ParkCaseStudy() {
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
        <HomeSidebar bioAs="p" className="hidden md:fixed md:inset-y-0 md:left-0 md:flex md:w-80" />

        <div className="flex flex-col gap-12 px-6 pt-24 pb-16 md:gap-16 md:p-12 md:pl-[368px] lg:p-16 lg:pl-[384px]">
          <h1 className="max-w-[720px] animate-fade-up text-balance font-mono text-heading-h3 font-bold text-white md:text-heading-h1">
            Forty5Park
          </h1>

          <div className="flex max-w-[720px] flex-col items-start">
            <p className="font-mono text-body-h3 text-white/70 uppercase tracking-[0.05em]">
              Year
            </p>
            <time dateTime="2026" className="font-mono text-body-h2 text-white">
              2026
            </time>
          </div>

          {/*
            Single stacked column capped at 720px — matching Figma's actual
            text-column width — not the old CaseStudyIntroBlock's
            side-by-side md:flex-row split, which this page doesn't use.
          */}
          <div className="flex w-full max-w-[720px] animate-fade-up flex-col gap-6 [animation-delay:100ms]">
            <p className="text-pretty font-mono text-body-h2 font-bold text-white">
              AI-powered platform for real estate companies to manage
              acquisitions, forecast property valuations up to a year ahead,
              and benchmark against sector peers.
            </p>
            <p className="text-pretty font-mono text-body-h2 text-white/70">
              Real estate acquisitions involve dozens of variables, yet most
              teams still rely on spreadsheets and gut instinct. I designed
              Forty5Park to replace that friction — a single platform where
              acquisition managers can evaluate deals, forecast valuations
              up to a year ahead, and benchmark properties against sector
              peers, all without switching tools.
            </p>
          </div>

          <ProjectImage
            src="/images/forty5park/project-image-1.png"
            alt="Forty5Park map view showing acquisition targets plotted across active real estate markets, with a filterable list in the sidebar."
            roundedClassName="rounded-token"
            priority
          />
          <ProjectImage
            src="/images/forty5park/project-image-2.png"
            alt="Forty5Park map view with a market highlights panel summarizing recent deal activity."
            roundedClassName="rounded-token"
          />

          <div className="flex w-full max-w-[720px] animate-fade-up flex-col gap-6">
            <h2 className="text-balance font-mono text-heading-h5 font-bold text-white">
              Designing for the deal, not the data
            </h2>
            <p className="text-pretty font-mono text-body-h2 text-white/70">
              The core challenge was making complex financial data feel
              actionable, not overwhelming. I structured the interface
              around decision points: what does a manager need to know right
              now to move a deal forward? That question drove every screen.
            </p>
          </div>

          <ProjectImage
            src="/images/forty5park/project-image-3.png"
            alt="Forty5Park map zoomed into a metro area, showing clustered deal density markers."
            roundedClassName="rounded-token"
          />
          <ProjectImage
            src="/images/forty5park/project-image-4.png"
            alt="Forty5Park property valuation heatmap, showing forecasted values by neighborhood across a metro area."
            roundedClassName="rounded-token"
          />
          <ProjectImage
            src="/images/forty5park/project-image-5.png"
            alt="Forty5Park portfolio view comparing multiple acquisitions side by side with key financial metrics."
            roundedClassName="rounded-token"
          />
          <ProjectImage
            src="/images/forty5park/project-image-6.png"
            alt="Forty5Park saved-analysis session list."
            roundedClassName="rounded-token"
          />
          <ProjectImage
            src="/images/forty5park/project-image-7.png"
            alt="Forty5Park property detail view showing unit mix and rent data for a prospective acquisition."
            roundedClassName="rounded-token"
          />

          <div className="flex w-full max-w-[720px] animate-fade-up flex-col gap-6">
            <h2 className="text-balance font-mono text-heading-h5 font-bold text-white">
              Complexity handled, decisions simplified
            </h2>
            <p className="text-pretty font-mono text-body-h2 text-white/70">
              Acquisition teams went from juggling spreadsheets across tools
              to evaluating and progressing deals inside a single platform.
              Faster decisions, fewer gaps, and a process that scales as the
              portfolio grows.
            </p>
          </div>
        </div>
      </main>

      {/*
        md:pl-80 clears the fixed sidebar (320px = w-80) the same way the
        main content column does — CaseStudyNext is shared with every other
        case study, so the offset is applied on a wrapper here rather than
        inside the component itself.
      */}
      <div className="md:pl-80">
        <CaseStudyNext currentHref="/case-studies/forty5park" />
      </div>

      <CaseStudyJsonLd currentHref="/case-studies/forty5park" />
      <MobileFooter />
    </>
  );
}
