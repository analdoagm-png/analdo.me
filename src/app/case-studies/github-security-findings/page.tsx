import type { Metadata } from "next";
import { CaseStudyHeader } from "@/components/case-study-header";
import { SiteFooter } from "@/components/site-footer";
import {
  CaseStudyIntroBlock,
  CaseStudySectionBlock,
} from "@/components/case-study-text-block";
import { ProjectImage } from "@/components/project-image";

export const metadata: Metadata = {
  title: "Github's Security Findings — Analdo Gomez",
  description:
    "GH's Security Findings helps CTOs and managers ensure code security and reliability by tracking alerts, notifying the right stakeholders, and guiding issues to resolution through a clear, streamlined workflow.",
};

export default function GithubSecurityFindingsCaseStudy() {
  return (
    <>
      <CaseStudyHeader />

      <main id="main-content" className="flex-1">
        <section className="mx-auto flex w-full max-w-[1280px] flex-col items-start gap-12 px-6 pt-16 pb-16 md:gap-16 md:px-16">
          <h1 className="w-full text-heading-h3 text-white md:text-heading-h1">
            Github&rsquo;s Security Findings
          </h1>

          <CaseStudyIntroBlock
            label="GH’s Security Findings helps CTOs and managers ensure code security and reliability by tracking alerts, notifying the right stakeholders, and guiding issues to resolution through a clear, streamlined workflow."
            description="Security alerts are only useful if they reach the right person at the right time. Most teams deal with noisy dashboards, unclear ownership, and no clear path from alert to resolution. I redesigned GitHub's Security Findings to solve exactly that — giving CTOs and engineering managers a workflow that tracks issues, assigns accountability, and drives closure."
          />

          <ProjectImage
            src="/images/github-security/project-image-1.png"
            alt="Security Findings overview table showing total findings and SLA status metrics across services."
            aspect="3360/3188"
            priority
          />
          <ProjectImage
            src="/images/github-security/project-image-2.png"
            alt="Security Findings detail view for a specific vulnerability, showing severity, impact, and a recommended resolution."
            aspect="1680/1110"
          />

          <CaseStudySectionBlock
            title="From noise to ownership"
            description="The hardest part was designing for two distinct users: executives who need a high-level health signal, and managers who need to act on specific alerts. I created a layered view system that serves both without compromise."
          />

          <ProjectImage
            src="/images/github-security/project-image-3.png"
            alt="Security Findings risk-selection step in the remediation workflow, listing CVEs by risk score."
            aspect="1680/1805"
          />
          <ProjectImage
            src="/images/github-security/project-image-4.png"
            alt="Security Findings exception-creation dialog for flagging a finding as a false positive or accepted risk."
            aspect="1680/1110"
          />
          <ProjectImage
            src="/images/github-security/project-image-5.png"
            alt="Security Findings job status screen showing a completed remediation export."
          />
          <ProjectImage
            src="/images/github-security/project-image-6.png"
            alt="Security Findings activity feed showing recent exceptions and status changes."
          />
          <ProjectImage
            src="/images/github-security/project-image-7.png"
            alt="Security Findings audit trail showing risk history by section and question."
          />
          <ProjectImage
            src="/images/github-security/project-image-8.png"
            alt="Security Findings full audit table showing every tracked finding and its resolution status."
            aspect="3360/2400"
          />

          <CaseStudySectionBlock
            title="Good security UX is invisible until something goes wrong"
            description="Engineering managers gained a clear line of sight from alert to resolution — no more dropped issues or unclear ownership. Security workflows that used to stall now move through a defined, accountable process."
          />
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
