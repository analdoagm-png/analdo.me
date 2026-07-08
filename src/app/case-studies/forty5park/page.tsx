import type { Metadata } from "next";
import { CaseStudyHeader } from "@/components/case-study-header";
import { SiteFooter } from "@/components/site-footer";
import {
  CaseStudyIntroBlock,
  CaseStudySectionBlock,
} from "@/components/case-study-text-block";
import { ProjectImage } from "@/components/project-image";

export const metadata: Metadata = {
  title: "Forty5Park — Analdo Gomez",
  description:
    "AI-powered platform for real estate companies to manage acquisitions, forecast property valuations up to a year ahead, and benchmark against sector peers.",
};

export default function Forty5ParkCaseStudy() {
  return (
    <>
      <CaseStudyHeader />

      <main className="flex-1">
        <section className="mx-auto flex w-full max-w-[1280px] flex-col items-start gap-12 px-6 pt-16 pb-16 md:gap-16 md:px-16 md:pt-40">
          <h1 className="max-w-[884px] text-[32px] leading-[1.15] font-semibold text-white md:text-heading-h1">
            Forty5Park
          </h1>

          <CaseStudyIntroBlock
            label="AI-powered platform for real estate companies to manage acquisitions, forecast property valuations up to a year ahead, and benchmark against sector peers."
            description="Real estate acquisitions involve dozens of variables, yet most teams still rely on spreadsheets and gut instinct. I designed Forty5Park to replace that friction — a single platform where acquisition managers can evaluate deals, forecast valuations up to a year ahead, and benchmark properties against sector peers, all without switching tools."
          />

          <ProjectImage src="/images/forty5park/project-image-1.png" />
          <ProjectImage src="/images/forty5park/project-image-2.png" />

          <CaseStudySectionBlock
            title="Designing for the deal, not the data"
            description="The core challenge was making complex financial data feel actionable, not overwhelming. I structured the interface around decision points: what does a manager need to know right now to move a deal forward? That question drove every screen."
          />

          <ProjectImage src="/images/forty5park/project-image-3.png" />
          <ProjectImage src="/images/forty5park/project-image-4.png" />
          <ProjectImage src="/images/forty5park/project-image-5.png" />
          <ProjectImage src="/images/forty5park/project-image-6.png" />
          <ProjectImage src="/images/forty5park/project-image-7.png" />

          <CaseStudySectionBlock
            title="Complexity handled, decisions simplified"
            description="Acquisition teams went from juggling spreadsheets across tools to evaluating and progressing deals inside a single platform. Faster decisions, fewer gaps, and a process that scales as the portfolio grows."
          />
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
