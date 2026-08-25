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
import { ProjectImage } from "@/components/project-image";

export const metadata = caseStudyMetadata({
  href: "/case-studies/arrowhead-transit",
  title: "Arrowhead Transit Dispatch Case Study",
  description:
    "Arrowhead Transit books 100+ healthcare rides a day — I replaced a single-file Access database with a live dispatch platform everyone could see at once.",
});

/**
 * Second (and last) editorial case study moved to the new sidebar system —
 * see GoRight's own comments for the full rationale (no subtitle, stacked
 * points instead of a 3-up grid, decision blocks followed by a stacked
 * figure instead of a side-by-side layout, no divider lines, no
 * `CaseStudyNext`). Both editorial case studies now share the exact same
 * rebuilt components as GoRight.
 *
 * `.stagger-section` on the content column (see globals.css / GoRight)
 * cascades every direct animated child in on load, by DOM position.
 */
export default function ArrowheadTransitCaseStudy() {
  return (
    <>
      <CaseStudyBackLink />
      <div className="stagger-section flex flex-col items-center gap-12 px-6 pt-24 pb-16 md:gap-16 md:p-12 md:pl-[368px] lg:p-16 lg:pl-[384px]">
        <CaseStudyProjectHeader
          title="Arrowhead Transit"
          role="Lead Product Designer"
          tools="Figma, Whimsical, Notion, Airtable"
          year={2019}
          intro="Arrowhead Transit books more than 100 healthcare transport rides a day — every one of them scheduled through a single Access database file, copied by hand between desks. I replaced it with a live dispatch platform dispatchers, drivers, and billing could all see at once."
        />

        <CaseStudyFigure
          src="/images/arrowhead-transit/exhibit.png"
          caption="Exhibit A — the entire operation, in one Access file. No login. No history. No way to work outside the office."
          aspect="2880/1800"
          priority
        />

        <div className="flex w-full max-w-[720px] flex-col items-start gap-8">
          <CaseStudySectionHeading
            eyebrow="The Problem"
            title="Three ways the system worked against the people who depended on it"
          />
          <CaseStudyPointsGrid
            items={[
              {
                number: "01",
                title: "One file, one desk",
                description:
                  "The entire schedule lived in a local Access database — copied by hand between computers, with no login and no way to work outside the office.",
              },
              {
                number: "02",
                title: "Every leg, typed twice",
                description:
                  "Dispatchers entered each ride manually, one leg at a time. The workflow was slow enough that planning more than two or three days out was rare.",
              },
              {
                number: "03",
                title: "Dispatch by phone call",
                description:
                  "With no online platform, every schedule change meant a phone call — or a paper form a driver filled out on the road and handed in later.",
              },
            ]}
          />
        </div>

        <CaseStudyCallout>
          Arrowhead Transit&rsquo;s core job is getting healthcare
          patients to appointments. A scheduling system only one person
          could see at a time wasn&rsquo;t just inconvenient — it was
          risk sitting in a spreadsheet.
        </CaseStudyCallout>

        <CaseStudyStatement
          lead="So I rebuilt the system of record — "
          emphasis="as a platform everyone could see at once."
          maxWidthClassName="md:max-w-[600px] lg:max-w-[657px]"
        />

        <div className="flex w-full max-w-[720px] flex-col items-start gap-6">
          <CaseStudySectionHeading
            eyebrow="The Decisions"
            title="Three calls that shaped how it actually got used"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h1 text-white">
            The brief was simple — replace the database, cut manual
            entry, connect drivers and dispatch. Getting there took a
            few specific, and occasionally uncomfortable, calls.
          </p>
        </div>

        <CaseStudyDecisionBlock
          label="Decision"
          title="Read-only, except where it mattered"
          description="Drivers needed live visibility into logs, routes, and trip details — but editing rights on that data belonged to dispatch. I scoped the driver view to read-only, with one exception: odometer and time entries on billing, the two fields only a driver on-site could actually verify."
        />
        <CaseStudyFigure
          src="/images/arrowhead-transit/decision-1-figure.png"
          caption="From the sitemap — permission boundaries by role"
          aspect="2048/1122"
        />

        <CaseStudyDecisionBlock
          label="Decision"
          title="One queue for every outside referral"
          description="Ride referrals were arriving from multiple insurance and referral sources — Laserfiche, Novus — entirely outside the old system. Dispatchers were hunting them down by hand. I gave every external referral one landing point: an Incoming Trips queue, visible the moment a request comes in."
        />
        <CaseStudyFigure
          src="/images/arrowhead-transit/decision-2-figure.png"
          caption="Queue management UI overview"
          aspect="2880/1800"
        />

        <CaseStudyDecisionBlock
          label="Constraint"
          title="Borrowed the design system, on purpose"
          description="This ran on a nonprofit's timeline, not a greenfield brand budget. Instead of building a bespoke visual system, I adapted my studio's existing framework to Arrowhead Transit's brand — trading a fully custom look for the weeks that went into the actual workflows instead."
        />
        <CaseStudyFigure
          src="/images/arrowhead-transit/decision-3-figure.png"
          caption="Studio design system, adapted — not rebuilt from zero"
          aspect="2048/1122"
        />

        <div className="flex w-full max-w-[720px] flex-col items-start gap-6">
          <CaseStudySectionHeading
            eyebrow="How I Got There"
            title="Audit, interviews, flows — then screens"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h1 text-white">
            I started with a design audit of the existing tool, then
            sat down with dispatchers to walk through their day-to-day.
            Those conversations became golden-path flows and a sitemap
            defining who could see and edit what, wireframed before a
            single screen was designed.
          </p>
        </div>

        <ProjectImage
          src="/images/arrowhead-transit/process-1.png"
          alt="Design audit table comparing requirements against design impact for the dispatch workflow."
          aspect="2048/669"
          roundedClassName="rounded-token"
        />
        <ProjectImage
          src="/images/arrowhead-transit/process-2.png"
          alt="Sitemap table defining view and edit permissions by role."
          aspect="2048/467"
          roundedClassName="rounded-token"
        />
        <ProjectImage
          src="/images/arrowhead-transit/process-3.png"
          alt="Golden-path flowchart mapping a ride from booking through dispatch to completion."
          aspectClassName="aspect-[2048/1025] lg:aspect-[2048/1079]"
          roundedClassName="rounded-token"
        />

        <div className="flex w-full max-w-[720px] flex-col items-start gap-6">
          <CaseStudySectionHeading
            eyebrow="The Platform"
            title="What dispatch, drivers, and billing actually see now"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h1 text-white">
            One dashboard replaced the Access file — trips this week,
            incoming referrals, and available drivers, all live.
          </p>
        </div>

        <ProjectImage
          src="/images/arrowhead-transit/platform-1.png"
          alt="Arrowhead Transit dashboard showing this week's trips and available drivers."
          aspectClassName="aspect-[8/5] lg:aspect-[2048/1623]"
          roundedClassName="rounded-token"
        />
        <ProjectImage
          src="/images/arrowhead-transit/platform-2.png"
          alt="Arrowhead Transit incoming referrals queue showing new ride requests."
          aspectClassName="aspect-[8/5] lg:aspect-[2048/945]"
          roundedClassName="rounded-token"
        />
        <ProjectImage
          src="/images/arrowhead-transit/platform-3.png"
          alt="Arrowhead Transit trip detail view with a live route map."
          aspectClassName="aspect-[8/5] lg:aspect-[2048/1165]"
          roundedClassName="rounded-token"
        />
        <ProjectImage
          src="/images/arrowhead-transit/platform-4.png"
          alt="Arrowhead Transit driver tracking view showing an active route on a map."
          aspectClassName="aspect-[8/5] lg:aspect-[2048/1357]"
          roundedClassName="rounded-token"
        />

        <div className="flex w-full max-w-[720px] flex-col items-start gap-8">
          <CaseStudySectionHeading
            eyebrow="Results"
            title="What changed, operationally"
          />
          <CaseStudyPointsGrid
            items={[
              {
                number: "1.",
                title: "2–3 days → 2+ weeks",
                description: "Booking horizon dispatchers could plan against",
              },
              {
                number: "2.",
                title: "Real-time",
                description:
                  "Driver tracking replaced phone-and-SMS check-ins",
              },
              {
                number: "3.",
                title: "Mostly automated",
                description:
                  "Manual entry, largely eliminated from the workflow",
              },
            ]}
          />
        </div>

        <div className="flex w-full max-w-[720px] animate-fade-up flex-col items-start gap-4 rounded-none border border-gray-dark p-8">
          <p className="w-full text-balance font-mono text-heading-h5 font-bold text-white">
            The database is gone.
          </p>
          <p className="w-full text-pretty font-mono text-body-h1 text-white/70">
            Dispatchers plan two weeks out instead of two or three days.
            Drivers show up in the system instead of on a paper form.
            Referrals land in one queue instead of three separate
            inboxes. That&rsquo;s the point of replacing a spreadsheet
            with a platform — not a prettier screen, but a system a
            rural transit network can actually run on.
          </p>
        </div>

        <p className="w-full max-w-[720px] animate-fade-up text-pretty text-center font-mono text-body-h2 text-white/70">
          ROLE — Lead Product Designer, product ideation through design
          &amp; development handoff. Handoff documented in Notion and
          prototyped in Figma for the engineering team.
        </p>
      </div>

      <CaseStudyJsonLd currentHref="/case-studies/arrowhead-transit" />
    </>
  );
}
