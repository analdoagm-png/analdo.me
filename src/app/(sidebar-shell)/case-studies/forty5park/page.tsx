import { caseStudyMetadata } from "@/lib/case-studies";
import { CaseStudyJsonLd } from "@/components/case-study-json-ld";
import { ProjectImage } from "@/components/project-image";

export const metadata = caseStudyMetadata({
  href: "/case-studies/forty5park",
  title: "Forty5Park Real Estate AI Platform",
  description:
    "AI-powered platform for real estate companies to manage acquisitions, forecast property valuations up to a year ahead, and benchmark against sector peers.",
});

/**
 * The shell (skip link, MobileTopBar, HomeSidebar, MobileFooter) lives in
 * `(sidebar-shell)/layout.tsx` now — this page only returns its own content
 * column plus `CaseStudyJsonLd`, a sibling since it renders no visible
 * markup of its own.
 *
 * Centered layout, per Figma's `main-content` frame (node 333:451):
 * `items-center` on the content column, with every text element `w-full
 * max-w-[720px]` and every image `w-full max-w-[1280px]`. `w-full` is what
 * makes the boxes *scale down* to fill whatever room is actually available
 * once the sidebar and page padding are subtracted — at tablet widths
 * that's well under 720px, so the whole column shrinks with the viewport
 * rather than staying pinned at a fixed 720px (which would either overflow
 * or force horizontal scrolling). `max-w` is what stops them growing past
 * Figma's spec once there's enough room, and `items-center` on the parent
 * is what centers the (now width-capped) column within the wider content
 * area rather than leaving it flush against the sidebar's edge.
 *
 * The YEAR meta and intro/section text blocks are written inline here
 * rather than through `CaseStudyYear`/`CaseStudyIntroBlock`/
 * `CaseStudySectionBlock` — those are shared with Uber Suite and Github's
 * Security Findings, which haven't moved to this iteration yet, and editing
 * them in place would change those pages' typography too.
 */
export default function Forty5ParkCaseStudy() {
  return (
    <>
      <div className="flex flex-col items-center gap-12 px-6 pt-24 pb-16 md:gap-16 md:p-12 md:pl-[368px] lg:p-16 lg:pl-[384px]">
        <h1 className="w-full max-w-[720px] animate-fade-up text-balance font-mono text-heading-h3 font-bold text-white md:text-heading-h1">
          Forty5Park
        </h1>

        <div className="flex w-full max-w-[720px] flex-col items-start">
          <p className="font-mono text-body-h3 text-white/70 uppercase tracking-[0.05em]">
            Year
          </p>
          <time dateTime="2026" className="font-mono text-body-h2 text-white">
            2026
          </time>
        </div>

        {/*
          Single stacked column, not the old CaseStudyIntroBlock's
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

        <div className="w-full max-w-[1280px]">
          <ProjectImage
            src="/images/forty5park/project-image-1.png"
            alt="Forty5Park map view showing acquisition targets plotted across active real estate markets, with a filterable list in the sidebar."
            roundedClassName="rounded-token"
            priority
          />
        </div>
        <div className="w-full max-w-[1280px]">
          <ProjectImage
            src="/images/forty5park/project-image-2.png"
            alt="Forty5Park map view with a market highlights panel summarizing recent deal activity."
            roundedClassName="rounded-token"
          />
        </div>

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

        <div className="w-full max-w-[1280px]">
          <ProjectImage
            src="/images/forty5park/project-image-3.png"
            alt="Forty5Park map zoomed into a metro area, showing clustered deal density markers."
            roundedClassName="rounded-token"
          />
        </div>
        <div className="w-full max-w-[1280px]">
          <ProjectImage
            src="/images/forty5park/project-image-4.png"
            alt="Forty5Park property valuation heatmap, showing forecasted values by neighborhood across a metro area."
            roundedClassName="rounded-token"
          />
        </div>
        <div className="w-full max-w-[1280px]">
          <ProjectImage
            src="/images/forty5park/project-image-5.png"
            alt="Forty5Park portfolio view comparing multiple acquisitions side by side with key financial metrics."
            roundedClassName="rounded-token"
          />
        </div>
        <div className="w-full max-w-[1280px]">
          <ProjectImage
            src="/images/forty5park/project-image-6.png"
            alt="Forty5Park saved-analysis session list."
            roundedClassName="rounded-token"
          />
        </div>
        <div className="w-full max-w-[1280px]">
          <ProjectImage
            src="/images/forty5park/project-image-7.png"
            alt="Forty5Park property detail view showing unit mix and rent data for a prospective acquisition."
            roundedClassName="rounded-token"
          />
        </div>

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

      {/*
        No CaseStudyNext on this page — dropped for the new sidebar design.
        The persistent "/ Works" link already covers the onward path back
        to the index; revisit if/when more case studies move to this system
        and a real "next" affordance is wanted again.
      */}
      <CaseStudyJsonLd currentHref="/case-studies/forty5park" />
    </>
  );
}
