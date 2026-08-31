import { caseStudyMetadata } from "@/lib/case-studies";
import { CaseStudyJsonLd } from "@/components/case-study-json-ld";
import { CaseStudyBackLink } from "@/components/case-study-back-link";
import { CaseStudyProjectHeader } from "@/components/case-study-project-header";
import { CaseStudySectionHeading } from "@/components/case-study-section-heading";
import { CaseStudyFigure } from "@/components/case-study-figure";
import { CaseStudyGallery } from "@/components/case-study-gallery";

export const metadata = caseStudyMetadata({
  href: "/case-studies/forty5park",
  title: "Forty5Park Real Estate AI Platform",
  description:
    "AI-powered platform for real estate companies to manage acquisitions, forecast property valuations up to a year ahead, and benchmark against sector peers.",
});

/**
 * Third case study on the six-part format — see GoRight's own doc comment
 * for the full rationale and the shared-component changes that came with
 * it. Forty5Park, Uber Suite, and Github's Security Findings previously
 * ran ~200 words each on a lighter "intro / approach / results" shape
 * (see each page's prior doc comment in git history); this pass brings
 * them onto the same six-part structure as GoRight and Arrowhead Transit,
 * with real additional detail supplied by the site owner rather than
 * invented to fill the shape out.
 *
 * Unlike GoRight and Arrowhead Transit, this project has no legacy tool to
 * contrast against — it's a greenfield build, not a replacement — so "01
 * Overview" opens on the platform itself rather than a "before" exhibit,
 * and there's no discrete named "Decision" sub-blocks in "Project Scope
 * and Design": the real material here is one continuous design approach
 * (structuring around decision points), not a series of separate calls.
 * `CaseStudyDecisionBlock` isn't used on this page for that reason — it's
 * an honest gap, not an oversight.
 *
 * "Challenges" covers the one real hard problem the site owner named:
 * reconciling three independently-updating kinds of complexity (predictive
 * valuation modeling, geolocation data, live market analytics) into one
 * interface without burying the actual acquisition decision underneath
 * them.
 *
 * "The Final Phase" stays qualitative on purpose — the site owner had no
 * hard adoption numbers to share for this project, unlike GoRight's "4 of
 * 5 beta companies" figure, so this page doesn't invent one.
 */
export default function Forty5ParkCaseStudy() {
  return (
    <>
      <CaseStudyBackLink />
      <div className="stagger-section flex flex-col items-center gap-12 px-6 pt-24 pb-16 md:gap-16 md:p-12 md:pt-24 lg:p-16 lg:pl-[384px]">
        <CaseStudyProjectHeader
          title="Forty5Park"
          role="Staff Product Designer"
          tools="Figma, Claude Code"
          year={2026}
        />

        {/* 01 — Overview */}
        <div className="flex w-full max-w-[720px] flex-col items-start gap-8">
          <CaseStudySectionHeading
            number="01"
            eyebrow="Overview"
            title="An AI platform built to replace spreadsheets and gut instinct"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            Forty5Park is an AI-powered platform built for real estate
            companies — helping acquisition teams evaluate deals, forecast
            property valuations up to a year ahead, and benchmark
            properties against sector peers. I joined as staff product
            designer, working in Figma and, for parts of the build,
            directly in Claude Code.
          </p>
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            Real estate acquisitions involve dozens of variables —
            location, unit mix, market trends, forecasted returns — yet
            most teams were still evaluating them across spreadsheets and
            instinct rather than one connected view.
          </p>
        </div>
        <CaseStudyFigure
          src="/images/forty5park/project-image-1.png"
          caption="Forty5Park's map view — acquisition targets plotted across active markets, with a filterable list alongside."
          priority
        />

        {/* 02 — Pain Points */}
        <div className="flex w-full max-w-[720px] flex-col items-start gap-8 border-t border-stroke-dark pt-16 md:pt-20 lg:pt-24">
          <CaseStudySectionHeading
            number="02"
            eyebrow="Pain Points"
            title="One deal, evaluated across a dozen disconnected sources"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            Acquisition teams were juggling multiple disconnected tools —
            spreadsheets for financial modeling, separate resources for
            market data, no single place to forecast a property&rsquo;s
            value or see how it stacked up against comparable deals. Every
            acquisition decision meant manually pulling numbers together
            from different sources before a team could even start
            evaluating whether a deal was worth pursuing.
          </p>
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            Forecasting a property&rsquo;s value a year out, or
            benchmarking it against comparable deals, wasn&rsquo;t
            something most teams could do quickly — it meant assembling
            market data by hand, project by project, rather than seeing it
            inside the same view as the deal itself.
          </p>
        </div>

        {/* 03 — Project Scope and Design */}
        <div className="flex w-full max-w-[720px] flex-col items-start gap-8 border-t border-stroke-dark pt-16 md:pt-20 lg:pt-24">
          <CaseStudySectionHeading
            number="03"
            eyebrow="Project Scope and Design"
            title="Designing for the deal, not the underlying data"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            The core design challenge was making complex financial and
            market data feel actionable rather than overwhelming. I
            structured the interface around decision points — what does an
            acquisition manager actually need to know right now to move a
            deal forward — rather than around the underlying data model,
            and that question shaped every screen from the map view down
            to a single property&rsquo;s detail page.
          </p>
        </div>
        <CaseStudyGallery
          items={[
            {
              src: "/images/forty5park/project-image-2.png",
              alt: "Forty5Park map view with a market highlights panel summarizing recent deal activity.",
              caption: "Market highlights — a summary panel surfacing recent deal activity.",
              aspect: "2880/1800",
            },
            {
              src: "/images/forty5park/project-image-3.png",
              alt: "Forty5Park map zoomed into a metro area, showing clustered deal density markers.",
              caption: "Zoomed into a single metro area, showing deal density by cluster.",
              aspect: "2880/1800",
            },
          ]}
        />

        {/* 04 — Challenges */}
        <div className="flex w-full max-w-[720px] flex-col items-start gap-8 border-t border-stroke-dark pt-16 md:pt-20 lg:pt-24">
          <CaseStudySectionHeading
            number="04"
            eyebrow="Challenges"
            title="Three kinds of real-time complexity, one coherent screen"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            The genuinely hard part of this project wasn&rsquo;t any single
            screen — it was reconciling three different kinds of real-time
            complexity into one interface: predictive valuation modeling,
            geolocation data across active markets, and live market
            analytics, all updating independently. Any one of those could
            carry a dashboard on its own; showing all three together
            without burying the acquisition decision underneath them was
            the actual design problem. The fix was the same decision-point
            framing from Project Scope and Design, applied more strictly
            here — every predictive number and every map layer had to earn
            its place by answering a specific question a manager would
            actually ask, or it didn&rsquo;t make the screen.
          </p>
        </div>
        <CaseStudyFigure
          src="/images/forty5park/project-image-4.png"
          caption="Predictive valuation — a heatmap forecasting property values by neighborhood."
        />

        {/* 05 — Strategic Contributions */}
        <div className="flex w-full max-w-[720px] flex-col items-start gap-8 border-t border-stroke-dark pt-16 md:pt-20 lg:pt-24">
          <CaseStudySectionHeading
            number="05"
            eyebrow="Strategic Contributions"
            title="What I owned, start to finish"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            My role covered the platform&rsquo;s design end to end — from
            structuring the core interaction model around decision points,
            through UI design for the map, forecasting, and portfolio
            views. Claude Code was part of the actual workflow here, not
            just implementation after the fact — moving between design and
            working code let me test how the AI-driven data actually
            behaved in the interface, rather than designing against a
            static mockup of it.
          </p>
        </div>

        {/* 06 — The Final Phase */}
        <div className="flex w-full max-w-[720px] flex-col items-start gap-8 border-t border-stroke-dark pt-16 md:pt-20 lg:pt-24">
          <CaseStudySectionHeading
            number="06"
            eyebrow="The Final Phase"
            title="One platform, in place of a stack of spreadsheets"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            Acquisition teams moved from juggling spreadsheets across
            disconnected tools to evaluating and progressing deals inside a
            single platform — one place to see a property, its forecasted
            value, and how it compares to the market.
          </p>
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            The result isn&rsquo;t a number I can point to — it&rsquo;s a
            workflow that used to take multiple tools and now takes one,
            with the AI-driven forecasting and geolocation data built into
            the same view a manager already uses to make the call.
          </p>
        </div>
        <CaseStudyGallery
          items={[
            {
              src: "/images/forty5park/project-image-5.png",
              alt: "Forty5Park portfolio view comparing multiple acquisitions side by side with key financial metrics.",
              caption: "Portfolio comparison — multiple acquisitions evaluated side by side.",
              aspect: "2880/1800",
            },
            {
              src: "/images/forty5park/project-image-6.png",
              alt: "Forty5Park saved-analysis session list.",
              caption: "Saved analysis sessions, for returning to a deal in progress.",
              aspect: "2880/1800",
            },
            {
              src: "/images/forty5park/project-image-7.png",
              alt: "Forty5Park property detail view showing unit mix and rent data for a prospective acquisition.",
              caption: "Property detail — unit mix and rent data for a prospective acquisition.",
              aspect: "2880/1800",
              span: true,
            },
          ]}
        />
      </div>

      {/*
        No CaseStudyNext on this page — dropped for the new sidebar design.
        The persistent "/ Works" link already covers the onward path back
        to the index.
      */}
      <CaseStudyJsonLd currentHref="/case-studies/forty5park" />
    </>
  );
}
