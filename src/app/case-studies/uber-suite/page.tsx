import type { Metadata } from "next";
import { CaseStudyHeader } from "@/components/case-study-header";
import { SiteFooter } from "@/components/site-footer";
import {
  CaseStudyIntroBlock,
  CaseStudySectionBlock,
} from "@/components/case-study-text-block";
import { ProjectImage } from "@/components/project-image";

export const metadata: Metadata = {
  title: "Uber Suite — Analdo Gomez",
  description:
    "An all-in-one internal toolset for Uber, streamlining communication, boosting employee engagement, and enabling fast, AI-driven knowledge discovery across the organization.",
};

export default function UberSuiteCaseStudy() {
  return (
    <>
      <CaseStudyHeader />

      <main className="flex-1">
        <section className="mx-auto flex w-full max-w-[1280px] flex-col items-start gap-12 px-6 pt-16 pb-16 md:gap-16 md:px-16">
          <h1 className="w-full text-[32px] leading-[1.15] font-semibold text-white md:text-heading-h1">
            Uber Suite
          </h1>

          <CaseStudyIntroBlock
            label="An all-in-one internal toolset for Uber, streamlining communication, boosting employee engagement, and enabling fast, AI-driven knowledge discovery across the organization."
            description="At Uber's scale, internal communication breaks down fast — information gets siloed, announcements go unread, and finding institutional knowledge becomes a full-time job. I designed Uber Suite to consolidate that experience: one toolset for company-wide communication, employee engagement, and AI-assisted knowledge discovery."
          />

          <ProjectImage
            src="/images/uber-suite/project-image-1.png"
            aspect="3200/3274"
            priority
          />
          <ProjectImage
            src="/images/uber-suite/project-image-2.png"
            aspect="3840/2800"
          />

          <CaseStudySectionBlock
            title="One surface, many teams"
            description="The problem wasn't a lack of tools — it was too many disconnected ones. My focus was on reducing cognitive load for employees navigating across teams, so I built around a unified navigation model and surfaced relevant content based on role and context."
          />

          <ProjectImage src="/images/uber-suite/project-image-3.png" />
          <ProjectImage
            src="/images/uber-suite/project-image-4.png"
            aspect="2880/2560"
          />
          <ProjectImage src="/images/uber-suite/project-image-5.png" />
          <ProjectImage src="/images/uber-suite/project-image-6.png" />
          <ProjectImage src="/images/uber-suite/project-image-7.png" />

          <CaseStudySectionBlock
            title="Scale changes everything about how people communicate"
            description="Consolidating fragmented internal tools into one surface reduced the time employees spent context-switching and surfaced relevant information faster. Adoption came naturally because the tool fit how people already worked."
          />
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
