import { caseStudyMetadata } from "@/lib/case-studies";
import { CaseStudyJsonLd } from "@/components/case-study-json-ld";
import { CaseStudyBackLink } from "@/components/case-study-back-link";
import { CaseStudyProjectHeader } from "@/components/case-study-project-header";
import { CaseStudySectionHeading } from "@/components/case-study-section-heading";
import { CaseStudyPointsGrid } from "@/components/case-study-points-grid";
import { CaseStudyCallout } from "@/components/case-study-callout";
import { CaseStudyStatement } from "@/components/case-study-statement";
import { CaseStudyDecisionBlock } from "@/components/case-study-decision-block";
import { CaseStudyFigure } from "@/components/case-study-figure";
import { CaseStudyImagePair } from "@/components/case-study-image-pair";
import { ProjectImage } from "@/components/project-image";

export const metadata = caseStudyMetadata({
  href: "/case-studies/goright",
  title: "GoRight Dispatch Platform Case Study",
  description:
    "GoRight's on-road technicians were calling their supervisors just to confirm where to go next — I rebuilt Merlin as one consistent system, live on both ends.",
});

/**
 * First editorial case study moved to the new sidebar system, matching
 * Figma's `case-study-desktop` frame (node 339:596) — the shell (skip
 * link, MobileTopBar, HomeSidebar, MobileFooter) lives in
 * `(sidebar-shell)/layout.tsx`, this page returns only its own content
 * column plus `CaseStudyJsonLd`.
 *
 * Real structural differences from the pre-redesign version, all matched
 * to Figma rather than carried over:
 * - No project subtitle ("Merlin Platform") under the title — Figma's
 *   title node has no equivalent.
 * - "The Problem" and "Results" are stacked single columns (via the
 *   rebuilt `CaseStudyPointsGrid`), not a 3-up `md:flex-row` grid.
 * - Each decision is its own text block (`CaseStudyDecisionBlock`, now
 *   text-only) followed by a full-width `CaseStudyFigure` stacked below
 *   it — not the old side-by-side `lg:flex-row` layout.
 * - No divider lines between sections — Figma has none; generous spacing
 *   alone carries the separation, matching every other page on this
 *   system.
 * - "The Problem" points use "01"/"02"/"03"; "Results" uses "1."/"2."/"3."
 *   — Figma genuinely uses both styles in the same page, not an
 *   inconsistency to normalize away.
 *
 * No `CaseStudyNext` — dropped for this system, matching the three
 * showcase case studies.
 *
 * `.stagger-section` on the content column (see globals.css / Forty5Park)
 * cascades every direct animated child in on load, by DOM position. Every
 * shared component used here (`CaseStudyProjectHeader`, `CaseStudyFigure`,
 * `CaseStudyCallout`, `CaseStudyStatement`, `CaseStudyDecisionBlock`)
 * already carries its own `.animate-fade-up` on its own root, so this page
 * needed no other changes to participate. The plain wrapper divs around a
 * `CaseStudySectionHeading` + `CaseStudyPointsGrid`/image group are
 * deliberately left unanimated themselves (see `.stagger-section`'s own
 * comment for why) — their children already carry the fade.
 *
 * The three inline lead paragraphs under "The Decisions" / "How I Got
 * There" / "The Platform" (and the closing statement box's body copy) run
 * `text-body-h2 text-white/70` — a typography pass brought them down from
 * a louder `text-body-h1 text-white` to match `/about`'s one consistent
 * quiet prose size/color, used there regardless of a paragraph's role.
 */
export default function GoRightCaseStudy() {
  return (
    <>
      <CaseStudyBackLink />
      <div className="stagger-section flex flex-col items-center gap-12 px-6 pt-24 pb-16 md:gap-16 md:p-12 md:pl-[368px] lg:p-16 lg:pl-[384px]">
        <CaseStudyProjectHeader
          title="GoRight"
          role="Lead Product Designer"
          tools="Figma, Whimsical, Notion, Airtable"
          year={2022}
          intro="GoRight's on-road technicians were calling their supervisors just to confirm where to go next — the mobile app had no real-time updates, and its patterns didn't match the desktop tool managers used to track them. I rebuilt Merlin as one consistent system, live on both ends."
        />

        <CaseStudyFigure
          src="/images/goright/exhibit.png"
          caption="Exhibit A — staging.protaskit.com, before GoRight had a brand or a consistent pattern. Desktop and mobile spoke different visual languages."
          aspect="2000/1235"
          priority
        />

        <div className="flex w-full max-w-[720px] flex-col items-start gap-8">
          <CaseStudySectionHeading
            eyebrow="The Problem"
            title="Three gaps that kept the field on the phone"
          />
          <CaseStudyPointsGrid
            items={[
              {
                number: "01",
                title: "Two products, two languages",
                description:
                  "Desktop and mobile ran inconsistent web patterns. The mismatch showed up as a daily surge in support calls.",
              },
              {
                number: "02",
                title: "Blind without a phone call",
                description:
                  "The mobile app had no real-time updates, so technicians called their supervisors just to confirm a location or next step.",
              },
              {
                number: "03",
                title: "A view, scattered across apps",
                description:
                  "Getting a simple overview of on-road status meant juggling multiple tools and manually stitching reports together.",
              },
            ]}
          />
        </div>

        <CaseStudyCallout>
          GoRight&rsquo;s business is dispatching people to broken-down
          vehicles, fast. Every one of those gaps meant more time on the
          phone and less time on the road — for the exact team the
          platform exists to support.
        </CaseStudyCallout>

        <CaseStudyStatement
          lead="So I rebuilt Merlin around a single, live signal — "
          emphasis="everyone sees the same status, at the same time."
        />

        <div className="flex w-full max-w-[720px] flex-col items-start gap-6">
          <CaseStudySectionHeading
            eyebrow="The Decisions"
            title="Three calls that shaped how it actually got used"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            The brief was parity, progression, accessibility, immediate
            value. Getting there took a few specific calls — including one
            where the right move was reversing course.
          </p>
        </div>

        <CaseStudyDecisionBlock
          label="Decision"
          title="Caught a KPI-heavy homepage before it shipped"
          description="An early home screen led with performance metrics — clean, but it buried the one thing technicians actually opened the app for. Workshop notes flagged it directly: a KPI-first homepage risked confusing users trying to find their tasks. I rebalanced the layout so tasks led and KPIs supported, not the other way around."
        />
        <CaseStudyFigure
          src="/images/goright/decision-1-figure.png"
          caption="From product ideation — the KPI-first homepage under review"
          aspect="102/67"
          aspectClassName="aspect-[102/67] lg:aspect-[2048/1122]"
        />

        <CaseStudyDecisionBlock
          label="Decision"
          title="Walked back an over-engineered navigation"
          description="A more elaborate navigation structure made it into a workshop round — and made things worse. The note is blunt: navigation is getting crowded, group related sections, go back to the previous version. I did. Not every iteration is progress, and this one wasn't."
        />
        <CaseStudyFigure
          src="/images/goright/decision-2-figure.png"
          caption="From product ideation — the reversal, documented in the moment"
          aspect="714/469"
        />

        <CaseStudyDecisionBlock
          label="Decision"
          title="Branched the journey for how technicians actually respond"
          description="Dispatch software tends to assume instant acceptance. Ours didn't: the on-road breakdown journey explicitly branches for a technician going now versus going later, with a notification either way — because that's the real choice a technician makes, not an edge case to design around."
        />
        <CaseStudyFigure
          src="/images/goright/decision-3-figure.png"
          caption="User journey — assigning a supplier and technician through arrival"
          aspect="714/469"
        />

        <CaseStudyDecisionBlock
          label="Constraint"
          title="Made accessibility a testable criterion, not a checklist"
          description="Contrast levels got monitored and tested, not eyeballed. Language got a legibility pass. Sounds that could disrupt a technician mid-task got cut. None of this shows up in a screenshot — it shows up in who can actually use the app in the field."
        />
        <CaseStudyFigure
          src="/images/goright/decision-4-figure.png"
          caption="Audit findings — tracked by section, question, and type"
          aspect="714/469"
        />

        <div className="flex w-full max-w-[720px] flex-col items-start gap-6">
          <CaseStudySectionHeading
            eyebrow="How I Got There"
            title="Audit, workshops, a journey map — then screens"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            I audited the existing platform, then ran product ideation
            workshops with technicians, stakeholders, and on-road
            managers. Those sessions mapped the navigation, the
            capability set, and the breakdown journey before a single
            screen was wireframed for desktop or mobile.
          </p>
        </div>

        <CaseStudyImagePair
          srcA="/images/goright/process-pair-1.png"
          altA="Sitemap diagram mapping navigation and permission boundaries for the Merlin platform."
          srcB="/images/goright/process-pair-2.png"
          altB="Flowchart mapping the capability set across desktop and mobile roles."
        />

        <ProjectImage
          src="/images/goright/process-wide.png"
          alt="User journey flowchart for the on-road breakdown process, from dispatch to arrival."
          aspect="2048/1025"
          roundedClassName="rounded-token"
        />

        <div className="hidden w-full max-w-[1280px] flex-col items-start gap-16 lg:flex">
          <ProjectImage
            src="/images/goright/process-extra-1.png"
            alt="Workshop board with sticky notes and phone mockups from a product ideation session."
            aspect="2880/1800"
            roundedClassName="rounded-token"
          />
          <ProjectImage
            src="/images/goright/process-extra-2.png"
            alt="Hand-drawn wireframe sketch annotated during a product ideation workshop."
            aspect="2880/1800"
            roundedClassName="rounded-token"
          />
        </div>

        <div className="flex w-full max-w-[720px] flex-col items-start gap-6">
          <CaseStudySectionHeading
            eyebrow="The Platform"
            title="What managers and technicians see now"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            One dashboard, branded and live — task counts, submitted vs.
            received, reports, and activity, all in the same system
            technicians report into.
          </p>
        </div>

        <div className="flex w-full max-w-[1280px] flex-col items-start gap-16 lg:hidden">
          <ProjectImage
            src="/images/goright/platform-compact-1.png"
            alt="Merlin dashboard showing task counts and submitted-versus-received activity."
            aspect="24/23"
            roundedClassName="rounded-token"
          />
          <ProjectImage
            src="/images/goright/platform-compact-2.png"
            alt="Merlin task list table showing on-road jobs by status."
            aspect="6/5"
            roundedClassName="rounded-token"
          />
          <ProjectImage
            src="/images/goright/platform-compact-3.png"
            alt="Merlin task detail view showing live route tracking on a map."
            aspect="6/5"
            roundedClassName="rounded-token"
          />
        </div>

        <div className="hidden w-full max-w-[1280px] flex-col items-start gap-16 lg:flex">
          <ProjectImage
            src="/images/goright/platform-desktop-1.png"
            alt="Merlin dashboard showing task counts and submitted-versus-received activity."
            aspect="2880/2760"
            roundedClassName="rounded-token"
          />
          <ProjectImage
            src="/images/goright/platform-desktop-2.png"
            alt="Merlin task list table showing on-road jobs by status."
            aspect="2880/2400"
            roundedClassName="rounded-token"
          />
          <ProjectImage
            src="/images/goright/platform-desktop-3.png"
            alt="Merlin task detail view showing live route tracking on a map."
            aspect="2880/2400"
            roundedClassName="rounded-token"
          />
          <ProjectImage
            src="/images/goright/platform-desktop-4.png"
            alt="Merlin desktop view showing a technician's assigned task queue."
            aspect="2880/1800"
            roundedClassName="rounded-token"
          />
          <ProjectImage
            src="/images/goright/platform-desktop-5.png"
            alt="Merlin desktop view showing live route tracking for an active dispatch."
            aspect="2880/1800"
            roundedClassName="rounded-token"
          />
        </div>

        <div className="flex w-full max-w-[720px] flex-col items-start gap-8">
          <CaseStudySectionHeading eyebrow="Results" title="What changed after beta" />
          <CaseStudyPointsGrid
            items={[
              {
                number: "1.",
                title: "4 of 5",
                description:
                  "Beta transportation companies that agreed to continue as testers",
              },
              {
                number: "2.",
                title: "New revenue path",
                description:
                  "Geo-localization and real-time tracking opened doors to new features and stronger monetization",
              },
              {
                number: "3.",
                title: "One system, both platforms",
                description:
                  "A single component library replaced divergent mobile and desktop patterns",
              },
            ]}
          />
        </div>

        <div className="flex w-full max-w-[720px] animate-fade-up flex-col items-start gap-4 rounded-none border border-gray-dark p-8">
          <p className="w-full text-balance font-mono text-heading-h5 font-bold text-white">
            Technicians stopped calling it in.
          </p>
          <p className="w-full text-pretty font-mono text-body-h2 text-white/70">
            Status lives in one place now — a technician&rsquo;s next
            task, a manager&rsquo;s overview, and a report at the end of
            the week all pull from the same live signal. Beta testers
            stuck around instead of walking away, and real-time tracking
            opened doors the original brief never asked for. That&rsquo;s
            what the rebrand was actually building toward — not new
            colors, a system people stop having to route around.
          </p>
        </div>

        <p className="w-full max-w-[720px] animate-fade-up text-pretty text-center font-mono text-body-h2 text-white/70">
          ROLE — Lead Product Designer, from requirements gathering
          through this iteration of the Merlin platform. Ideation
          workshops and journey mapping conducted with technicians,
          stakeholders, and on-road managers.
        </p>
      </div>

      <CaseStudyJsonLd currentHref="/case-studies/goright" />
    </>
  );
}
