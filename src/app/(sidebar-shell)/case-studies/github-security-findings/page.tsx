import { caseStudyMetadata } from "@/lib/case-studies";
import { CaseStudyJsonLd } from "@/components/case-study-json-ld";
import { CaseStudyBackLink } from "@/components/case-study-back-link";
import { ProjectImage } from "@/components/project-image";

export const metadata = caseStudyMetadata({
  href: "/case-studies/github-security-findings",
  title: "Github's Security Findings UX Showcase",
  description:
    "GH's Security Findings helps CTOs and managers track alerts, notify the right stakeholders, and guide issues to resolution through one streamlined workflow.",
});

/**
 * The shell (skip link, MobileTopBar, HomeSidebar, MobileFooter) lives in
 * `(sidebar-shell)/layout.tsx` now — this page only returns its own content
 * column plus `CaseStudyJsonLd`. See Forty5Park's own comments for the full
 * layout rationale (centered `items-center` column, `w-full max-w-[720px]`
 * text / `w-full max-w-[1280px]` images, inline YEAR/intro/section text, no
 * `CaseStudyNext`).
 *
 * All five case studies — this one plus Forty5Park, Uber Suite, GoRight,
 * and Arrowhead Transit — are on this system now.
 *
 * Per-image `aspect` overrides are carried over unchanged from the old
 * version — several of this project's screenshots are portrait or
 * near-square, not the component's `2880/1800` default.
 *
 * `.stagger-section` on the content column (see globals.css / Forty5Park)
 * cascades every direct animated child in on load, by DOM position.
 */
export default function GithubSecurityFindingsCaseStudy() {
  return (
    <>
      <CaseStudyBackLink />
      <div className="stagger-section flex flex-col items-center gap-12 px-6 pt-24 pb-16 md:gap-16 md:p-12 md:pl-[368px] lg:p-16 lg:pl-[384px]">
        <h1 className="w-full max-w-[720px] animate-fade-up text-balance font-mono text-heading-h3 font-bold text-white md:text-heading-h1">
          Github&rsquo;s Security Findings
        </h1>

        <div className="flex w-full max-w-[720px] animate-fade-up flex-col items-start">
          <p className="font-mono text-body-h3 text-white/70 uppercase tracking-[0.05em]">
            Year
          </p>
          <time dateTime="2025" className="font-mono text-body-h2 text-white">
            2025
          </time>
        </div>

        <div className="flex w-full max-w-[720px] animate-fade-up flex-col gap-6">
          <p className="text-pretty font-mono text-body-h2 font-bold text-white">
            GH&rsquo;s Security Findings helps CTOs and managers ensure
            code security and reliability by tracking alerts, notifying
            the right stakeholders, and guiding issues to resolution
            through a clear, streamlined workflow.
          </p>
          <p className="text-pretty font-mono text-body-h2 text-white/70">
            Security alerts are only useful if they reach the right person
            at the right time. Most teams deal with noisy dashboards,
            unclear ownership, and no clear path from alert to resolution.
            I redesigned GitHub&rsquo;s Security Findings to solve exactly
            that — giving CTOs and engineering managers a workflow that
            tracks issues, assigns accountability, and drives closure.
          </p>
        </div>

        <ProjectImage
          src="/images/github-security/project-image-1.png"
          alt="Security Findings overview table showing total findings and SLA status metrics across services."
          aspect="3360/3188"
          roundedClassName="rounded-token"
          priority
        />
        <ProjectImage
          src="/images/github-security/project-image-2.png"
          alt="Security Findings detail view for a specific vulnerability, showing severity, impact, and a recommended resolution."
          aspect="1680/1110"
          roundedClassName="rounded-token"
        />

        <div className="flex w-full max-w-[720px] animate-fade-up flex-col gap-6">
          <h2 className="text-balance font-mono text-heading-h5 font-bold text-white">
            From noise to ownership
          </h2>
          <p className="text-pretty font-mono text-body-h2 text-white/70">
            The hardest part was designing for two distinct users:
            executives who need a high-level health signal, and managers
            who need to act on specific alerts. I created a layered view
            system that serves both without compromise.
          </p>
        </div>

        <ProjectImage
          src="/images/github-security/project-image-3.png"
          alt="Security Findings risk-selection step in the remediation workflow, listing CVEs by risk score."
          aspect="1680/1805"
          roundedClassName="rounded-token"
        />
        <ProjectImage
          src="/images/github-security/project-image-4.png"
          alt="Security Findings exception-creation dialog for flagging a finding as a false positive or accepted risk."
          aspect="1680/1110"
          roundedClassName="rounded-token"
        />
        <ProjectImage
          src="/images/github-security/project-image-5.png"
          alt="Security Findings job status screen showing a completed remediation export."
          roundedClassName="rounded-token"
        />
        <ProjectImage
          src="/images/github-security/project-image-6.png"
          alt="Security Findings activity feed showing recent exceptions and status changes."
          roundedClassName="rounded-token"
        />
        <ProjectImage
          src="/images/github-security/project-image-7.png"
          alt="Security Findings audit trail showing risk history by section and question."
          roundedClassName="rounded-token"
        />
        <ProjectImage
          src="/images/github-security/project-image-8.png"
          alt="Security Findings full audit table showing every tracked finding and its resolution status."
          aspect="3360/2400"
          roundedClassName="rounded-token"
        />

        <div className="flex w-full max-w-[720px] animate-fade-up flex-col gap-6">
          <h2 className="text-balance font-mono text-heading-h5 font-bold text-white">
            Good security UX is invisible until something goes wrong
          </h2>
          <p className="text-pretty font-mono text-body-h2 text-white/70">
            Engineering managers gained a clear line of sight from alert to
            resolution — no more dropped issues or unclear ownership.
            Security workflows that used to stall now move through a
            defined, accountable process.
          </p>
        </div>
      </div>

      {/*
        No CaseStudyNext on this page — dropped for the new sidebar design,
        matching Forty5Park and Uber Suite. The persistent "/ Works" sidebar
        link covers the onward path back to the index.
      */}
      <CaseStudyJsonLd currentHref="/case-studies/github-security-findings" />
    </>
  );
}
