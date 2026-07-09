import type { Metadata } from "next";
import { CaseStudyHeader } from "@/components/case-study-header";
import { SiteFooter } from "@/components/site-footer";
import { CaseStudyProjectHeader } from "@/components/case-study-project-header";
import { CaseStudySectionHeading } from "@/components/case-study-section-heading";
import { CaseStudyPointsGrid } from "@/components/case-study-points-grid";
import { CaseStudyCallout } from "@/components/case-study-callout";
import { CaseStudyStatement } from "@/components/case-study-statement";
import { CaseStudyDecisionBlock } from "@/components/case-study-decision-block";
import { CaseStudyFigure } from "@/components/case-study-figure";
import { ProjectImage } from "@/components/project-image";

export const metadata: Metadata = {
  title: "Arrowhead Transit — Analdo Gomez",
  description:
    "Arrowhead Transit books more than 100 healthcare transport rides a day — I replaced a single-file Access database with a live dispatch platform dispatchers, drivers, and billing could all see at once.",
};

function Divider() {
  return <div className="h-px w-full bg-gray-dark" />;
}

export default function ArrowheadTransitCaseStudy() {
  return (
    <>
      <CaseStudyHeader />

      <main className="flex-1">
        <section className="mx-auto flex w-full max-w-[1280px] flex-col items-start gap-6 p-6 md:gap-16 md:px-10 md:py-16 lg:p-16">
          <CaseStudyProjectHeader
            title="Arrowhead Transit"
            subtitle="Intranet"
            role="Lead Product Designer"
            tools="Figma, Whimsical, Notion, Airtable"
            intro="Arrowhead Transit books more than 100 healthcare transport rides a day — every one of them scheduled through a single Access database file, copied by hand between desks. I replaced it with a live dispatch platform dispatchers, drivers, and billing could all see at once."
          />

          <CaseStudyFigure
            src="/images/arrowhead-transit/exhibit.png"
            caption="Exhibit A — the entire operation, in one Access file. No login. No history. No way to work outside the office."
            aspect="2880/1800"
            gapClassName="gap-4 lg:gap-16"
            roundedClassName="rounded-lg lg:rounded-xl"
            priority
          />

          <Divider />

          <div className="flex w-full flex-col items-start gap-12 lg:gap-16">
            <CaseStudySectionHeading
              eyebrow="The Problem"
              title="Three ways the system worked against the people who depended on it"
            />
            <CaseStudyPointsGrid
              items={[
                {
                  number: "1.",
                  title: "One file, one desk",
                  description:
                    "The entire schedule lived in a local Access database — copied by hand between computers, with no login and no way to work outside the office.",
                },
                {
                  number: "2.",
                  title: "Every leg, typed twice",
                  description:
                    "Dispatchers entered each ride manually, one leg at a time. The workflow was slow enough that planning more than two or three days out was rare.",
                },
                {
                  number: "3.",
                  title: "Dispatch by phone call",
                  description:
                    "With no online platform, every schedule change meant a phone call — or a paper form a driver filled out on the road and handed in later.",
                },
              ]}
            />
          </div>

          <CaseStudyCallout>
            Arrowhead Transit&rsquo;s core job is getting healthcare patients
            to appointments. A scheduling system only one person could see
            at a time wasn&rsquo;t just inconvenient — it was risk sitting
            in a spreadsheet.
          </CaseStudyCallout>

          <Divider />

          <CaseStudyStatement
            lead="So I rebuilt the system of record — "
            emphasis="as a platform everyone could see at once."
            maxWidthClassName="md:max-w-[600px] lg:max-w-[944px]"
          />

          <Divider />

          <div className="flex w-full flex-col items-start gap-12 lg:gap-16">
            <div className="flex w-full flex-col items-start gap-6">
              <CaseStudySectionHeading
                eyebrow="The Decisions"
                title="Three calls that shaped how it actually got used"
              />
              <p className="w-full text-body-h2 text-white md:text-body-h1 lg:max-w-[720px]">
                The brief was simple — replace the database, cut manual
                entry, connect drivers and dispatch. Getting there took a
                few specific, and occasionally uncomfortable, calls.
              </p>
            </div>

            <CaseStudyDecisionBlock
              label="Decision"
              title="Read-only, except where it mattered"
              description="Drivers needed live visibility into logs, routes, and trip details — but editing rights on that data belonged to dispatch. I scoped the driver view to read-only, with one exception: odometer and time entries on billing, the two fields only a driver on-site could actually verify."
              figureSrc="/images/arrowhead-transit/decision-1-figure.png"
              figureCaption="From the sitemap — permission boundaries by role"
              figureAspect="2048/1122"
              mdGapClassName="md:gap-6"
            />

            <CaseStudyDecisionBlock
              label="Decision"
              title="One queue for every outside referral"
              description="Ride referrals were arriving from multiple insurance and referral sources — Laserfiche, Novus — entirely outside the old system. Dispatchers were hunting them down by hand. I gave every external referral one landing point: an Incoming Trips queue, visible the moment a request comes in."
              figureSrc="/images/arrowhead-transit/decision-2-figure.png"
              figureCaption="Queue management UI overview"
              figureAspect="2880/1800"
              figureRoundedClassName="rounded-lg lg:rounded-xl"
              figureCaptionHiddenAtDesktop
              mdGapClassName="md:gap-6"
              reverseOnDesktop
            />

            <CaseStudyDecisionBlock
              label="Constraint"
              title="Borrowed the design system, on purpose"
              description="This ran on a nonprofit's timeline, not a greenfield brand budget. Instead of building a bespoke visual system, I adapted my studio's existing framework to Arrowhead Transit's brand — trading a fully custom look for the weeks that went into the actual workflows instead."
              figureSrc="/images/arrowhead-transit/decision-3-figure.png"
              figureCaption="Studio design system, adapted — not rebuilt from zero"
              figureAspect="2048/1122"
              mdGapClassName="md:gap-6"
            />
          </div>

          <Divider />

          <div className="flex w-full flex-col items-start gap-12 lg:gap-16">
            <div className="flex w-full flex-col items-start gap-6">
              <CaseStudySectionHeading
                eyebrow="How I Got There"
                title="Audit, interviews, flows — then screens"
              />
              <p className="w-full text-body-h2 text-white md:text-body-h1 lg:max-w-[720px]">
                I started with a design audit of the existing tool, then sat
                down with dispatchers to walk through their day-to-day.
                Those conversations became golden-path flows and a sitemap
                defining who could see and edit what, wireframed before a
                single screen was designed.
              </p>
            </div>

            <ProjectImage
              src="/images/arrowhead-transit/process-1.png"
              aspect="2048/669"
              roundedClassName="rounded-xl"
            />
            <ProjectImage
              src="/images/arrowhead-transit/process-2.png"
              aspect="2048/467"
              roundedClassName="rounded-xl"
            />
            <ProjectImage
              src="/images/arrowhead-transit/process-3.png"
              aspectClassName="aspect-[2048/1025] lg:aspect-[2048/1079]"
              roundedClassName="rounded-xl lg:rounded-none"
            />
          </div>

          <Divider />

          <div className="flex w-full flex-col items-start gap-12 lg:gap-16">
            <div className="flex w-full flex-col items-start gap-6">
              <CaseStudySectionHeading
                eyebrow="The Platform"
                title="What dispatch, drivers, and billing actually see now"
              />
              <p className="w-full text-body-h2 text-white md:text-body-h1 lg:max-w-[720px]">
                One dashboard replaced the Access file — trips this week,
                incoming referrals, and available drivers, all live.
              </p>
            </div>

            <ProjectImage
              src="/images/arrowhead-transit/platform-1.png"
              aspectClassName="aspect-[8/5] lg:aspect-[2048/1623]"
              roundedClassName="rounded-lg lg:rounded-none"
            />
            <ProjectImage
              src="/images/arrowhead-transit/platform-2.png"
              aspectClassName="aspect-[8/5] lg:aspect-[2048/945]"
              roundedClassName="rounded-lg lg:rounded-none"
            />
            <ProjectImage
              src="/images/arrowhead-transit/platform-3.png"
              aspectClassName="aspect-[8/5] lg:aspect-[2048/1165]"
              roundedClassName="rounded-lg lg:rounded-none"
            />
            <ProjectImage
              src="/images/arrowhead-transit/platform-4.png"
              aspectClassName="aspect-[8/5] lg:aspect-[2048/1357]"
              roundedClassName="rounded-lg lg:rounded-none"
            />
          </div>

          <Divider />

          <div className="flex w-full flex-col items-start gap-12 lg:gap-16">
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

          <div className="flex w-full flex-col items-start gap-4 rounded-xl border border-gray-dark p-8">
            <p className="w-full text-heading-h5 text-white">
              The database is gone.
            </p>
            <p className="w-full text-body-h2 text-white/70 lg:text-body-h1">
              Dispatchers plan two weeks out instead of two or three days.
              Drivers show up in the system instead of on a paper form.
              Referrals land in one queue instead of three separate
              inboxes. That&rsquo;s the point of replacing a spreadsheet
              with a platform — not a prettier screen, but a system a
              rural transit network can actually run on.
            </p>
          </div>

          <p className="w-full text-center text-body-h3 text-white/70 lg:text-body-h2">
            ROLE — Lead Product Designer, product ideation through design
            &amp; development handoff.
            <br className="hidden lg:block" /> Handoff documented in
            Notion and prototyped in Figma for the engineering team.
          </p>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
