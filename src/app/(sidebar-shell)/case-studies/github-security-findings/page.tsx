import { caseStudyMetadata } from "@/lib/case-studies";
import { CaseStudyJsonLd } from "@/components/case-study-json-ld";
import { CaseStudyBackLink } from "@/components/case-study-back-link";
import { CaseStudyProjectHeader } from "@/components/case-study-project-header";
import { CaseStudySectionHeading } from "@/components/case-study-section-heading";
import { CaseStudyFigure } from "@/components/case-study-figure";
import { CaseStudyGallery } from "@/components/case-study-gallery";

export const metadata = caseStudyMetadata({
  href: "/case-studies/github-security-findings",
  title: "Github's Security Findings UX Showcase",
  description:
    "GH's Security Findings helps CTOs and managers track alerts, notify the right stakeholders, and guide issues to resolution through one streamlined workflow.",
});

/**
 * Fifth and last case study on the six-part format — see GoRight's own doc
 * comment for the full rationale. Like Forty5Park and Uber Suite, this
 * page previously ran a lighter "intro / approach / results" shape with no
 * Role/Tools row; both are added here from detail the site owner supplied
 * for this pass (client project, staff product designer, Figma).
 *
 * No `CaseStudyDecisionBlock` on this page, same reasoning as Forty5Park
 * and Uber Suite — the real material is one continuous workflow design
 * (see "Project Scope and Design") plus one real tension (see
 * "Challenges"), not a series of discrete named decisions.
 *
 * "Challenges" keeps the exec-vs-manager tension the previous version's
 * "Approach" section already named — confirmed as the genuine hard problem
 * rather than replaced — fleshed out with how the layered-view system
 * actually resolved it. Its figure (the vulnerability detail view) is a
 * deliberate callback to "01 Overview"'s figure (the org-wide findings
 * table): the two images together are the exec/manager altitude
 * difference the section describes, without needing a two-image gallery
 * to say so twice.
 *
 * "The Final Phase" stays qualitative — no hard usage numbers were
 * available for this project, so this page doesn't invent one.
 */
export default function GithubSecurityFindingsCaseStudy() {
  return (
    <>
      <CaseStudyBackLink />
      <div className="stagger-section flex flex-col items-center gap-12 px-6 pt-24 pb-16 md:gap-16 md:p-12 md:pt-24 lg:p-16 lg:pl-[384px]">
        <CaseStudyProjectHeader
          title="Github&rsquo;s Security Findings"
          role="Staff Product Designer"
          tools="Figma"
          year={2025}
        />

        {/* 01 — Overview */}
        <div className="flex w-full max-w-[720px] flex-col items-start gap-8">
          <CaseStudySectionHeading
            number="01"
            eyebrow="Overview"
            title="One workflow, from a raw alert to a resolved finding"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            Github&rsquo;s Security Findings helps CTOs and engineering
            managers ensure code security and reliability by tracking
            alerts, notifying the right stakeholders, and guiding issues to
            resolution. I joined as staff product designer on this client
            project, designing in Figma.
          </p>
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            Security alerts are only useful if they reach the right person
            at the right time. Most teams deal with noisy dashboards,
            unclear ownership, and no clear path from alert to resolution.
          </p>
        </div>
        <CaseStudyFigure
          src="/images/github-security/project-image-1.png"
          caption="The findings overview — total findings and SLA status across every service."
          aspect="3360/3188"
          priority
        />

        {/* 02 — Pain Points */}
        <div className="flex w-full max-w-[720px] flex-col items-start gap-8 border-t border-stroke-dark pt-16 md:pt-20 lg:pt-24">
          <CaseStudySectionHeading
            number="02"
            eyebrow="Pain Points"
            title="Noisy dashboards, and no record of who owned what"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            Security dashboards were noisy by default — every finding
            surfaced with the same visual weight, regardless of severity
            or who was actually responsible for it. A CTO scanning for
            organizational risk saw the exact same view as a manager who
            needed to fix one specific vulnerability today.
          </p>
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            Nothing in the existing tooling tracked a finding from the
            moment it was flagged to the moment it was actually resolved.
            Issues could sit unassigned indefinitely, with no clear record
            of who owned them or what happened next.
          </p>
        </div>

        {/* 03 — Project Scope and Design */}
        <div className="flex w-full max-w-[720px] flex-col items-start gap-8 border-t border-stroke-dark pt-16 md:pt-20 lg:pt-24">
          <CaseStudySectionHeading
            number="03"
            eyebrow="Project Scope and Design"
            title="A workflow, not just a dashboard"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            I designed the workflow end to end — from how a finding first
            surfaces, through assigning ownership, to the remediation
            steps that actually resolve it. Every screen had to answer the
            same question: whose job is this right now, and what do they
            need to do next.
          </p>
        </div>
        <CaseStudyGallery
          items={[
            {
              src: "/images/github-security/project-image-3.png",
              alt: "Security Findings risk-selection step in the remediation workflow, listing CVEs by risk score.",
              caption: "Remediation — selecting which CVEs to address, ranked by risk score.",
              aspect: "1680/1805",
            },
            {
              src: "/images/github-security/project-image-4.png",
              alt: "Security Findings exception-creation dialog for flagging a finding as a false positive or accepted risk.",
              caption: "Exceptions — flagging a finding as a false positive or an accepted risk.",
              aspect: "1680/1110",
            },
          ]}
        />

        {/* 04 — Challenges */}
        <div className="flex w-full max-w-[720px] flex-col items-start gap-8 border-t border-stroke-dark pt-16 md:pt-20 lg:pt-24">
          <CaseStudySectionHeading
            number="04"
            eyebrow="Challenges"
            title="Designing one product for two different altitudes"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            The hardest part was designing for two genuinely different
            users inside the same product: executives who need a
            high-level health signal across the whole organization, and
            managers who need to act on one specific alert right now. A
            dashboard built for the executive view buried the specific
            alert a manager needed; a dashboard built for taking action
            gave an executive no sense of overall risk. I built a layered
            view system instead of picking one audience over the other —
            the same underlying data, surfaced at the altitude each role
            actually needed, so an executive could see organizational
            health at a glance and a manager could drop straight into the
            one finding they were responsible for.
          </p>
        </div>
        <CaseStudyFigure
          src="/images/github-security/project-image-2.png"
          caption="The manager altitude — one vulnerability, its severity, impact, and a recommended resolution."
          aspect="1680/1110"
        />

        {/* 05 — Strategic Contributions */}
        <div className="flex w-full max-w-[720px] flex-col items-start gap-8 border-t border-stroke-dark pt-16 md:pt-20 lg:pt-24">
          <CaseStudySectionHeading
            number="05"
            eyebrow="Strategic Contributions"
            title="What I owned, start to finish"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            My role covered the full workflow design — the alert-tracking
            model, the layered executive and manager views, the assignment
            and accountability system, and the remediation flow through to
            resolution, all designed in Figma.
          </p>
        </div>

        {/* 06 — The Final Phase */}
        <div className="flex w-full max-w-[720px] flex-col items-start gap-8 border-t border-stroke-dark pt-16 md:pt-20 lg:pt-24">
          <CaseStudySectionHeading
            number="06"
            eyebrow="The Final Phase"
            title="Good security UX is invisible until something goes wrong"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            Engineering managers gained a clear line of sight from alert to
            resolution — no more dropped issues or unclear ownership.
          </p>
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            There&rsquo;s no adoption number I can point to here — the
            real change was structural: security workflows that used to
            stall on ambiguity now move through a defined, accountable
            process, whether you&rsquo;re the executive checking overall
            health or the manager closing out one finding.
          </p>
        </div>
        <CaseStudyFigure
          src="/images/github-security/project-image-5.png"
          caption="A completed remediation, exported once resolved."
        />
        <CaseStudyGallery
          items={[
            {
              src: "/images/github-security/project-image-6.png",
              alt: "Security Findings activity feed showing recent exceptions and status changes.",
              caption: "Activity feed — recent exceptions and status changes.",
              aspect: "2880/1800",
            },
            {
              src: "/images/github-security/project-image-7.png",
              alt: "Security Findings audit trail showing risk history by section and question.",
              caption: "Audit trail — risk history by section and question.",
              aspect: "2880/1800",
            },
            {
              src: "/images/github-security/project-image-8.png",
              alt: "Security Findings full audit table showing every tracked finding and its resolution status.",
              caption: "The full audit table — every tracked finding and its resolution status.",
              aspect: "3360/2400",
              span: true,
            },
          ]}
        />
      </div>

      {/*
        No CaseStudyNext on this page — dropped for the new sidebar design,
        matching every other case study. The persistent "/ Works" sidebar
        link covers the onward path back to the index.
      */}
      <CaseStudyJsonLd currentHref="/case-studies/github-security-findings" />
    </>
  );
}
