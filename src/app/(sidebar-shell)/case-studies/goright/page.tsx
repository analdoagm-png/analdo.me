import { caseStudyMetadata } from "@/lib/case-studies";
import { CaseStudyJsonLd } from "@/components/case-study-json-ld";
import { CaseStudyBackLink } from "@/components/case-study-back-link";
import { CaseStudyProjectHeader } from "@/components/case-study-project-header";
import { CaseStudySectionHeading } from "@/components/case-study-section-heading";
import { CaseStudyDecisionBlock } from "@/components/case-study-decision-block";
import { CaseStudyFigure } from "@/components/case-study-figure";
import { CaseStudyGallery } from "@/components/case-study-gallery";
import { GoRightCapabilityChart } from "@/components/goright-capability-chart";

export const metadata = caseStudyMetadata({
  href: "/case-studies/goright",
  title: "GoRight Dispatch Platform Case Study",
  description:
    "GoRight's on-road technicians were calling their supervisors just to confirm where to go next — I rebuilt Merlin as one consistent system, live on both ends.",
});

/**
 * First case study on the six-part format ("Overview" / "Pain Points" /
 * "Project Scope and Design" / "Challenges" / "Strategic Contributions" /
 * "The Final Phase"), replacing the previous showcase-style shape ("The
 * Problem" / "The Decisions" / "How I Got There" / "The Platform" /
 * "Results"). Piloted first as a standalone HTML draft modeled on Ben
 * Brignell's Nordhealth case study, then implemented here once the tone
 * and structure were approved. See AGENTS.md's Case Study Patterns section
 * for the full rationale — this is currently the only pattern GoRight and
 * Arrowhead Transit use; the three showcase case studies (Forty5Park, Uber
 * Suite, Github's Security Findings) are unaffected.
 *
 * Real structural differences from the previous version of this page:
 * - `CaseStudySectionHeading` now takes a `number` prop ("01"–"06"),
 *   rendered ahead of the eyebrow in muted `text-white/42` — a genuine
 *   sequence marker, since this format is a chronological walkthrough
 *   rather than a grouped, non-sequential set of sections.
 * - `CaseStudyCallout` and `CaseStudyStatement` are gone from this page —
 *   both were showcase-register "flourish" components (a bordered pull
 *   quote, a big rhetorical statement) that read as ad copy against this
 *   format's plainer, more explanatory prose. Neither component has any
 *   other caller left, so both were deleted from the codebase rather than
 *   left orphaned.
 * - `CaseStudyPointsGrid` (the numbered "The Problem"/"Results" list) is
 *   also gone from this page, replaced by plain prose paragraphs — but the
 *   component itself is NOT deleted, since `/about` still uses it.
 * - `CaseStudyImagePair` (the old fixed-height 2-image row) is gone too,
 *   replaced by the new `CaseStudyGallery` below. It has no other caller,
 *   so it was deleted.
 * - New `CaseStudyGallery` component: a responsive grid of captioned
 *   figures, each keeping its own natural aspect ratio rather than a
 *   forced crop. Used twice here — the raw process artifacts in "Project
 *   Scope and Design", and the finalized screens in "The Final Phase".
 * - `CaseStudyDecisionBlock` dropped its "Decision"/"Constraint" eyebrow
 *   chip — see that component's own doc comment. One of the four original
 *   decision blocks (the navigation walkback) moved wholesale into
 *   "Challenges" rather than staying in "Project Scope and Design", so it
 *   isn't shown twice.
 * - `CaseStudyProjectHeader` no longer receives an `intro` — "01 Overview"
 *   opens with that same scene-setting role instead.
 * - A thin `border-stroke-dark` divider now sits above every numbered
 *   section (except the first). This is a deliberate, scoped reversal of
 *   the "no divider lines" rule documented in DESIGN.md's Case Study
 *   Sidebar section — that rule was written for the previous grouped
 *   format; this format's sections are a real numbered sequence, and the
 *   divider reinforces that the way the numbers themselves do.
 *
 * `.stagger-section` on the content column still cascades every direct
 * animated child in on load, by DOM position. Each numbered section's own
 * heading+lead-paragraph wrapper is deliberately left unanimated itself
 * (matching the established convention — see globals.css's
 * `.stagger-section` comment) since its children (`CaseStudySectionHeading`,
 * each `<p>`) already carry their own `.animate-fade-up`.
 */
export default function GoRightCaseStudy() {
  return (
    <>
      <CaseStudyBackLink />
      <div className="stagger-section flex flex-col items-center gap-12 px-6 pt-24 pb-16 md:gap-16 md:p-12 md:pt-24 lg:p-16 lg:pl-[384px]">
        <CaseStudyProjectHeader
          title="GoRight"
          role="Lead Product Designer"
          tools="Figma, Whimsical, Notion, Airtable"
          year={2022}
        />

        {/* 01 — Overview */}
        <div className="flex w-full max-w-[720px] flex-col items-start gap-8">
          <CaseStudySectionHeading
            number="01"
            eyebrow="Overview"
            title="A dispatch platform built as two products, made into one"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            GoRight builds dispatch software for roadside assistance —
            sending technicians to broken-down vehicles and coordinating
            that work between dispatchers and the technicians on the road.
            Before this project, Merlin, GoRight&rsquo;s dispatch platform,
            had been built as two separate products: a desktop tool for
            dispatchers and a mobile app for technicians, developed
            independently on inconsistent patterns with no shared visual
            language between them.
          </p>
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            I led the redesign of both as one connected system — from an
            audit of the existing platform through this shipped iteration,
            across research, ideation workshops, journey mapping, and UI
            design.
          </p>
        </div>
        <CaseStudyFigure
          src="/images/goright/exhibit.png"
          caption="Merlin before this project — desktop and mobile spoke different visual languages."
          aspect="2000/1235"
          priority
        />

        {/* 02 — Pain Points */}
        <div className="flex w-full max-w-[720px] flex-col items-start gap-8 border-t border-stroke-dark pt-16 md:pt-20 lg:pt-24">
          <CaseStudySectionHeading
            number="02"
            eyebrow="Pain Points"
            title="Two problems, one on each side of the platform"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            The initial audit surfaced two connected problems. On the
            dispatcher side, desktop and mobile ran on inconsistent
            patterns, which showed up as a steady, daily increase in
            support calls. On the technician side, the mobile app had no
            real-time updates, so confirming a location or a next step
            meant calling a dispatcher directly rather than checking the
            app. Getting a simple overview of on-road activity meant
            checking several disconnected tools and combining the results
            by hand.
          </p>
        </div>

        {/* 03 — Project Scope and Design */}
        <div className="flex w-full max-w-[720px] flex-col items-start gap-8 border-t border-stroke-dark pt-16 md:pt-20 lg:pt-24">
          <CaseStudySectionHeading
            number="03"
            eyebrow="Project Scope and Design"
            title="Audit, workshops, a journey map — then three decisions"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            I started with an audit of the existing platform, then ran a
            series of ideation workshops with technicians, dispatchers, and
            on-road managers. Those sessions mapped the navigation, the
            feature set, and the breakdown journey before a single screen
            was wireframed for either product. Three decisions from that
            process shaped how the platform actually got used.
          </p>
        </div>

        <CaseStudyGallery
          items={[
            {
              src: "/images/goright/process-extra-1.png",
              alt: "Workshop board with sticky notes and phone mockups from a product ideation session.",
              caption:
                "An early ideation workshop — sticky notes and phone mockups mapping the on-road experience.",
              aspect: "2048/1684",
            },
            {
              src: "/images/goright/process-extra-2.png",
              alt: "Hand-drawn wireframe sketch annotated during a product ideation workshop.",
              caption:
                "An early hand-drawn wireframe, annotated during a workshop session.",
              aspect: "1197/1122",
            },
            {
              src: "/images/goright/process-pair-1.png",
              alt: "Sitemap diagram mapping navigation and permission boundaries for the Merlin platform.",
              caption:
                "Sitemap — navigation and permission boundaries across desktop and mobile.",
              aspect: "1210/1554",
            },
            {
              src: "/images/goright/process-wide.png",
              alt: "User journey flowchart mapping the on-road breakdown process, from dispatch to arrival.",
              caption: "The on-road breakdown journey, from dispatch to arrival.",
              aspect: "2048/1025",
            },
          ]}
        />

        <CaseStudyDecisionBlock
          title="Leading with tasks, not KPIs"
          description="An early version of the homepage led with performance metrics. It looked clean on its own, but testing it with real technicians made the problem obvious: a KPI-first homepage buried the one thing they'd actually opened the app for — their tasks. I rebalanced the layout so tasks led and KPIs supported them, rather than the other way around."
        />
        <CaseStudyFigure
          src="/images/goright/decision-1-figure.png"
          caption="The KPI-first homepage under review, before the rebalance."
          aspect="2048/1122"
        />

        <CaseStudyDecisionBlock
          title="Designing for how technicians actually respond"
          description="Dispatch software tends to assume a technician accepts a job instantly. In practice, that's not how the work happens, so the breakdown journey branches explicitly for a technician going to a job now versus later, with a notification either way — a real choice technicians make, not an edge case to design around."
        />
        <CaseStudyFigure
          src="/images/goright/decision-3-figure.png"
          caption="The breakdown journey, branching for how technicians actually respond."
          aspect="2048/1057"
        />

        <CaseStudyDecisionBlock
          title="Testing accessibility instead of eyeballing it"
          description="Contrast levels were monitored and tested rather than checked by eye. Copy went through a legibility pass. Any sound that could interrupt a technician mid-task was removed. None of that shows up in a screenshot — it shows up in who can actually use the app in the field."
        />
        <CaseStudyFigure
          src="/images/goright/decision-4-figure.png"
          caption="Accessibility audit findings, tracked by section, question, and type."
          aspect="2048/1025"
        />

        {/* 04 — Challenges */}
        <div className="flex w-full max-w-[720px] flex-col items-start gap-8 border-t border-stroke-dark pt-16 md:pt-20 lg:pt-24">
          <CaseStudySectionHeading
            number="04"
            eyebrow="Challenges"
            title="Building a shared system where there wasn't one"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            The deeper challenge behind this project wasn&rsquo;t a screen
            — it was that dispatchers and technicians didn&rsquo;t share a
            system to begin with. Status updates happened by phone and
            radio, which meant nothing was logged and nothing stayed
            visible after the fact. A dispatcher&rsquo;s view of a job and
            a technician&rsquo;s view of the same job could genuinely
            disagree, because each side was working from whatever
            they&rsquo;d last been told rather than from a shared record.
            Building Merlin as a real connected intranet meant designing
            role-based access from the ground up — not adding a filter to
            one shared view, but deciding, screen by screen, what a
            dispatcher needed to see and act on versus what a technician
            did.
          </p>
        </div>
        <GoRightCapabilityChart />
        <p className="w-full max-w-[720px] animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
          The clearest sign that structure hadn&rsquo;t caught up with that
          intent came later, in a workshop review of a more elaborate
          navigation. It made things worse: more depth, less clarity, and
          workshop notes flagged it directly as overcrowded. Fixing it
          meant grouping related sections and walking back to a simpler
          version the team had already moved past — treating a finished
          round of design as a mistake rather than defending it because it
          existed.
        </p>
        <CaseStudyFigure
          src="/images/goright/decision-2-figure.png"
          caption="The navigation reversal, documented in the workshop notes."
          aspect="2048/579"
        />

        {/* 05 — Strategic Contributions */}
        <div className="flex w-full max-w-[720px] flex-col items-start gap-8 border-t border-stroke-dark pt-16 md:pt-20 lg:pt-24">
          <CaseStudySectionHeading
            number="05"
            eyebrow="Strategic Contributions"
            title="What I owned, start to finish"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            My role covered the full arc of this iteration: auditing the
            existing platform, facilitating the ideation workshops, mapping
            the navigation and the breakdown journey, and designing the UI
            for both products using GoRight&rsquo;s component library and
            design tokens. I worked directly with technicians, dispatchers,
            and on-road managers throughout the process, rather than
            validating finished designs with them after the fact.
          </p>
        </div>

        {/* 06 — The Final Phase */}
        <div className="flex w-full max-w-[720px] flex-col items-start gap-8 border-t border-stroke-dark pt-16 md:pt-20 lg:pt-24">
          <CaseStudySectionHeading
            number="06"
            eyebrow="The Final Phase"
            title="One connected system, closing the original gap"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            Merlin now runs as one connected system instead of two. A
            technician&rsquo;s next task, a dispatcher&rsquo;s overview,
            and a weekly report all pull from the same live signal —
            closing the exact gap that used to send technicians straight
            to the phone.
          </p>
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            In beta, four of the five participating transportation
            companies stayed on as testers after launch. The real-time
            tracking built to solve the visibility problem also opened a
            path the original brief hadn&rsquo;t asked for:
            geo-localization as a standalone, monetizable feature.
          </p>
        </div>
        <CaseStudyFigure
          src="/images/goright/platform-desktop-4.png"
          caption="Merlin today — a technician's task queue, live."
          aspect="2880/1800"
        />
        <CaseStudyGallery
          items={[
            {
              src: "/images/goright/platform-desktop-1.png",
              alt: "Merlin dashboard showing task counts and submitted-versus-received activity.",
              caption: "Dashboard — task counts, submitted vs. received, and activity.",
              aspect: "2880/2760",
            },
            {
              src: "/images/goright/platform-desktop-2.png",
              alt: "Merlin task list table showing on-road jobs by status.",
              caption: "Task list — on-road jobs by status.",
              aspect: "2880/2400",
            },
            {
              src: "/images/goright/platform-desktop-3.png",
              alt: "Merlin task detail view showing live route tracking on a map.",
              caption: "Task detail — live route tracking on a map.",
              aspect: "2880/2400",
            },
            {
              src: "/images/goright/platform-desktop-5.png",
              alt: "Merlin desktop view showing live route tracking for an active dispatch.",
              caption: "Live tracking — an active dispatch in progress.",
              aspect: "2880/1800",
            },
          ]}
        />
      </div>

      <CaseStudyJsonLd currentHref="/case-studies/goright" />
    </>
  );
}
