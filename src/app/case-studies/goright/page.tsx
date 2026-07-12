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
import { CaseStudyImagePair } from "@/components/case-study-image-pair";
import { ProjectImage } from "@/components/project-image";

export const metadata: Metadata = {
  title: "GoRight — Analdo Gomez",
  description:
    "GoRight's on-road technicians were calling their supervisors just to confirm where to go next — I rebuilt Merlin as one consistent system, live on both ends.",
};

function Divider() {
  return <div className="h-px w-full bg-gray-dark" />;
}

export default function GoRightCaseStudy() {
  return (
    <>
      <CaseStudyHeader />

      <main id="main-content" className="flex-1">
        <section className="mx-auto flex w-full max-w-[1280px] flex-col items-start gap-6 p-6 md:gap-16 md:px-10 md:py-16 lg:p-16">
          <CaseStudyProjectHeader
            title="GoRight"
            subtitle="Merlin Platform"
            role="Lead Product Designer"
            tools="Figma, Whimsical, Notion, Airtable"
            intro="GoRight's on-road technicians were calling their supervisors just to confirm where to go next — the mobile app had no real-time updates, and its patterns didn't match the desktop tool managers used to track them. I rebuilt Merlin as one consistent system, live on both ends."
          />

          <CaseStudyFigure
            src="/images/goright/exhibit.png"
            caption="Exhibit A — staging.protaskit.com, before GoRight had a brand or a consistent pattern. Desktop and mobile spoke different visual languages."
            aspect="2000/1235"
            gapClassName="gap-4 lg:gap-16"
            priority
          />

          <Divider />

          <div className="flex w-full flex-col items-start gap-12">
            <CaseStudySectionHeading
              eyebrow="The Problem"
              title="Three gaps that kept the field on the phone"
            />
            <CaseStudyPointsGrid
              items={[
                {
                  number: "1.",
                  title: "Two products, two languages",
                  description:
                    "Desktop and mobile ran inconsistent web patterns. The mismatch showed up as a daily surge in support calls.",
                },
                {
                  number: "2.",
                  title: "Blind without a phone call",
                  description:
                    "The mobile app had no real-time updates, so technicians called their supervisors just to confirm a location or next step.",
                },
                {
                  number: "3.",
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

          <Divider />

          <CaseStudyStatement
            lead="So I rebuilt Merlin around a single, live signal — "
            emphasis="everyone sees the same status, at the same time."
          />

          <Divider />

          <div className="flex w-full flex-col items-start gap-6">
            <CaseStudySectionHeading
              eyebrow="The Decisions"
              title="Three calls that shaped how it actually got used"
            />
            <p className="w-full text-body-h2 text-white md:text-body-h1 lg:max-w-[720px]">
              The brief was parity, progression, accessibility, immediate
              value. Getting there took a few specific calls — including one
              where the right move was reversing course.
            </p>
          </div>

          <CaseStudyDecisionBlock
            label="Decision"
            title="Caught a KPI-heavy homepage before it shipped"
            description="An early home screen led with performance metrics — clean, but it buried the one thing technicians actually opened the app for. Workshop notes flagged it directly: a KPI-first homepage risked confusing users trying to find their tasks. I rebalanced the layout so tasks led and KPIs supported, not the other way around."
            figureSrc="/images/goright/decision-1-figure.png"
            figureCaption="From product ideation — the KPI-first homepage under review"
            figureAspect="102/67"
            figureAspectClassName="aspect-[102/67] lg:aspect-[2048/1122]"
          />

          <CaseStudyDecisionBlock
            label="Decision"
            title="Walked back an over-engineered navigation"
            description="A more elaborate navigation structure made it into a workshop round — and made things worse. The note is blunt: navigation is getting crowded, group related sections, go back to the previous version. I did. Not every iteration is progress, and this one wasn't."
            figureSrc="/images/goright/decision-2-figure.png"
            figureCaption="From product ideation — the reversal, documented in the moment"
            figureAspect="714/469"
            reverseOnDesktop
          />

          <CaseStudyDecisionBlock
            label="Decision"
            title="Branched the journey for how technicians actually respond"
            description="Dispatch software tends to assume instant acceptance. Ours didn't: the on-road breakdown journey explicitly branches for a technician going now versus going later, with a notification either way — because that's the real choice a technician makes, not an edge case to design around."
            figureSrc="/images/goright/decision-3-figure.png"
            figureCaption="User journey — assigning a supplier and technician through arrival"
            figureAspect="714/469"
          />

          <CaseStudyDecisionBlock
            label="Constraint"
            title="Made accessibility a testable criterion, not a checklist"
            description="Contrast levels got monitored and tested, not eyeballed. Language got a legibility pass. Sounds that could disrupt a technician mid-task got cut. None of this shows up in a screenshot — it shows up in who can actually use the app in the field."
            figureSrc="/images/goright/decision-4-figure.png"
            figureCaption="Audit findings — tracked by section, question, and type"
            figureAspect="714/469"
            reverseOnDesktop
          />

          <Divider />

          <div className="flex w-full flex-col items-start gap-6">
            <CaseStudySectionHeading
              eyebrow="How I Got There"
              title="Audit, workshops, a journey map — then screens"
            />
            <p className="w-full text-body-h2 text-white md:text-body-h1 lg:max-w-[720px]">
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
          />

          <div className="hidden w-full flex-col items-start gap-16 lg:flex">
            <ProjectImage
              src="/images/goright/process-extra-1.png"
              alt="Workshop board with sticky notes and phone mockups from a product ideation session."
              aspect="2880/1800"
            />
            <ProjectImage
              src="/images/goright/process-extra-2.png"
              alt="Hand-drawn wireframe sketch annotated during a product ideation workshop."
              aspect="2880/1800"
            />
          </div>

          <Divider />

          <div className="flex w-full flex-col items-start gap-6">
            <CaseStudySectionHeading
              eyebrow="The Platform"
              title="What managers and technicians see now"
            />
            <p className="w-full text-body-h2 text-white md:text-body-h1 lg:max-w-[720px]">
              One dashboard, branded and live — task counts, submitted vs.
              received, reports, and activity, all in the same system
              technicians report into.
            </p>
          </div>

          <div className="flex w-full flex-col items-start gap-16 lg:hidden">
            <ProjectImage
              src="/images/goright/platform-compact-1.png"
              alt="Merlin dashboard showing task counts and submitted-versus-received activity."
              aspect="24/23"
            />
            <ProjectImage
              src="/images/goright/platform-compact-2.png"
              alt="Merlin task list table showing on-road jobs by status."
              aspect="6/5"
            />
            <ProjectImage
              src="/images/goright/platform-compact-3.png"
              alt="Merlin task detail view showing live route tracking on a map."
              aspect="6/5"
            />
          </div>

          <div className="hidden w-full flex-col items-start gap-16 lg:flex">
            <ProjectImage
              src="/images/goright/platform-desktop-1.png"
              alt="Merlin dashboard showing task counts and submitted-versus-received activity."
              aspect="2880/2760"
            />
            <ProjectImage
              src="/images/goright/platform-desktop-2.png"
              alt="Merlin task list table showing on-road jobs by status."
              aspect="2880/2400"
            />
            <ProjectImage
              src="/images/goright/platform-desktop-3.png"
              alt="Merlin task detail view showing live route tracking on a map."
              aspect="2880/2400"
            />
            <ProjectImage
              src="/images/goright/platform-desktop-4.png"
              alt="Merlin desktop view showing a technician's assigned task queue."
              aspect="2880/1800"
            />
            <ProjectImage
              src="/images/goright/platform-desktop-5.png"
              alt="Merlin desktop view showing live route tracking for an active dispatch."
              aspect="2880/1800"
            />
          </div>

          <Divider />

          <div className="flex w-full flex-col items-start gap-6">
            <CaseStudySectionHeading eyebrow="Results" title="What changed after beta" />
          </div>

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

          <div className="flex w-full flex-col items-center gap-4 rounded-xl border border-gray-dark p-8">
            <p className="w-full text-heading-h5 text-white">
              Technicians stopped calling it in.
            </p>
            <p className="w-full text-body-h2 text-white/70 md:text-body-h1">
              Status lives in one place now — a technician&rsquo;s next
              task, a manager&rsquo;s overview, and a report at the end of
              the week all pull from the same live signal. Beta testers
              stuck around instead of walking away, and real-time tracking
              opened doors the original brief never asked for. That&rsquo;s
              what the rebrand was actually building toward — not new
              colors, a system people stop having to route around.
            </p>
          </div>

          <p className="w-full text-center text-body-h3 text-white/70 md:text-body-h2">
            ROLE — Lead Product Designer, from requirements gathering
            through this iteration of the Merlin platform.
            <br className="hidden lg:block" /> Ideation workshops and
            journey mapping conducted with technicians, stakeholders, and
            on-road managers.
          </p>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
