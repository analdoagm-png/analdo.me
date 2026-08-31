import { caseStudyMetadata } from "@/lib/case-studies";
import { CaseStudyJsonLd } from "@/components/case-study-json-ld";
import { CaseStudyBackLink } from "@/components/case-study-back-link";
import { CaseStudyProjectHeader } from "@/components/case-study-project-header";
import { CaseStudySectionHeading } from "@/components/case-study-section-heading";
import { CaseStudyDecisionBlock } from "@/components/case-study-decision-block";
import { CaseStudyFigure } from "@/components/case-study-figure";
import { CaseStudyGallery } from "@/components/case-study-gallery";

export const metadata = caseStudyMetadata({
  href: "/case-studies/arrowhead-transit",
  title: "Arrowhead Transit Dispatch Case Study",
  description:
    "Arrowhead Transit books 100+ healthcare rides a day — I replaced a single-file Access database with a live dispatch platform everyone could see at once.",
});

/**
 * Second case study on the six-part format — see GoRight's own doc comment
 * for the full rationale and the shared-component changes that came with
 * it (`CaseStudySectionHeading`'s `number` prop, the new `CaseStudyGallery`,
 * `CaseStudyDecisionBlock` dropping its eyebrow chip, `CaseStudyCallout` /
 * `CaseStudyStatement` / `CaseStudyImagePair` deleted as orphaned).
 *
 * One real asymmetry from GoRight, both driven by what this project
 * actually has rather than a formatting gap:
 * - "Project Scope and Design" keeps only one named decision (the
 *   Incoming Trips queue) — the other two original decisions (read-only
 *   driver permissions, borrowing the design system) moved wholesale into
 *   "Challenges" instead, since together they're this project's two real
 *   hard calls: one about trust, one about a nonprofit's budget and
 *   timeline. GoRight only had one decision (the nav walkback) that
 *   belonged in Challenges, so it kept three in Project Scope.
 * - Both `CaseStudyGallery` calls here pass three items instead of four,
 *   with the third carrying `span` so it runs full width under the first
 *   two rather than leaving a lopsided empty grid cell.
 */
export default function ArrowheadTransitCaseStudy() {
  return (
    <>
      <CaseStudyBackLink />
      <div className="stagger-section flex flex-col items-center gap-12 px-6 pt-24 pb-16 md:gap-16 md:p-12 md:pt-24 lg:p-16 lg:pl-[384px]">
        <CaseStudyProjectHeader
          title="Arrowhead Transit"
          role="Lead Product Designer"
          tools="Figma, Whimsical, Notion, Airtable"
          year={2019}
        />

        {/* 01 — Overview */}
        <div className="flex w-full max-w-[720px] flex-col items-start gap-8">
          <CaseStudySectionHeading
            number="01"
            eyebrow="Overview"
            title="A schedule that lived in one file, rebuilt as a platform everyone could see"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            Arrowhead Transit books more than 100 healthcare transport
            rides a day, connecting patients in a rural service area to
            their appointments. Before this project, the entire schedule
            lived in a single Access database file — copied by hand between
            desks, with no login and no way to work outside the office.
          </p>
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            I replaced it with a live dispatch platform dispatchers,
            drivers, and billing could all see at once — from a design
            audit of the existing tool through this shipped platform.
          </p>
        </div>
        <CaseStudyFigure
          src="/images/arrowhead-transit/exhibit.png"
          caption="The entire operation, in one Access file — no login, no history, no way to work outside the office."
          aspect="1738/1282"
          priority
        />

        {/* 02 — Pain Points */}
        <div className="flex w-full max-w-[720px] flex-col items-start gap-8 border-t border-stroke-dark pt-16 md:pt-20 lg:pt-24">
          <CaseStudySectionHeading
            number="02"
            eyebrow="Pain Points"
            title="A system that worked against the people who depended on it"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            The entire schedule lived in a single Access database file,
            copied by hand between desks. There was no login and no way to
            work outside the office, so dispatchers entered every ride
            manually, one leg at a time — a workflow slow enough that
            planning more than two or three days out was rare.
          </p>
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            Every schedule change meant a phone call, or a paper form a
            driver filled out on the road and handed in later. Referrals
            were also arriving from multiple insurance and referral sources
            — Laserfiche, Novus — entirely outside the system, so
            dispatchers were hunting new rides down by hand before they
            could even schedule them.
          </p>
        </div>

        {/* 03 — Project Scope and Design */}
        <div className="flex w-full max-w-[720px] flex-col items-start gap-8 border-t border-stroke-dark pt-16 md:pt-20 lg:pt-24">
          <CaseStudySectionHeading
            number="03"
            eyebrow="Project Scope and Design"
            title="Audit, interviews, a golden path — then one queue for referrals"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            I started with a design audit of the existing tool, then sat
            down with dispatchers to walk through their day-to-day. Those
            conversations became golden-path flows and a sitemap defining
            who could see and edit what, before a single screen was
            wireframed.
          </p>
        </div>

        <CaseStudyGallery
          items={[
            {
              src: "/images/arrowhead-transit/process-1.png",
              alt: "Design audit table comparing requirements against design impact for the dispatch workflow.",
              caption: "Design audit — comparing requirements against design impact.",
              aspect: "2048/669",
            },
            {
              src: "/images/arrowhead-transit/process-2.png",
              alt: "Sitemap table defining view and edit permissions by role.",
              caption: "Sitemap — view and edit permissions defined by role.",
              aspect: "2048/467",
            },
            {
              src: "/images/arrowhead-transit/process-3.png",
              alt: "Golden-path flowchart mapping a ride from booking through dispatch to completion.",
              caption: "The golden path — a ride from booking through dispatch to completion.",
              aspect: "2048/1079",
              span: true,
            },
          ]}
        />

        <CaseStudyDecisionBlock
          title="One queue for every outside referral"
          description="Ride referrals were arriving from multiple insurance and referral sources — Laserfiche, Novus — entirely outside the old system, and dispatchers were hunting them down by hand. I gave every external referral one landing point: an Incoming Trips queue, visible the moment a request comes in."
        />
        <CaseStudyFigure
          src="/images/arrowhead-transit/decision-2-figure.png"
          caption="The Incoming Trips queue, replacing three separate inboxes."
          aspect="2880/1800"
        />

        {/* 04 — Challenges */}
        <div className="flex w-full max-w-[720px] flex-col items-start gap-8 border-t border-stroke-dark pt-16 md:pt-20 lg:pt-24">
          <CaseStudySectionHeading
            number="04"
            eyebrow="Challenges"
            title="Two hard calls: who to trust, and what to build from scratch"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            One of the harder calls in this project was about trust, not
            technology. Drivers needed live visibility into logs, routes,
            and trip details, but editing rights on that data belonged to
            dispatch — a distinction that isn&rsquo;t a comfortable one to
            design for, since it tells a driver directly what they can and
            can&rsquo;t touch. I scoped the driver view to read-only, with
            one deliberate exception: odometer and time entries on billing,
            the two fields only a driver on-site could actually verify. The
            exception mattered as much as the rule — a system that trusted
            no one wouldn&rsquo;t have held up any better than one that
            trusted everyone.
          </p>
        </div>
        <CaseStudyFigure
          src="/images/arrowhead-transit/decision-1-figure.png"
          caption="Permission boundaries by role, from the sitemap."
          aspect="2048/1137"
        />
        <p className="w-full max-w-[720px] animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
          The other constraint was money and time, not people. This ran on
          a nonprofit&rsquo;s timeline, not a greenfield brand budget, and
          building a fully custom visual system from zero wasn&rsquo;t a
          realistic use of either. Instead, I adapted my studio&rsquo;s
          existing design system to Arrowhead Transit&rsquo;s brand — a
          deliberate trade of a fully bespoke look for the weeks that went
          into the actual workflows instead. It&rsquo;s a less flattering
          thing to put in a case study than an original brand system, but
          it was the right call for what this project actually needed.
        </p>
        <CaseStudyFigure
          src="/images/arrowhead-transit/decision-3-figure.png"
          caption="The studio's design system, adapted rather than rebuilt from zero."
          aspect="2048/2034"
        />

        {/* 05 — Strategic Contributions */}
        <div className="flex w-full max-w-[720px] flex-col items-start gap-8 border-t border-stroke-dark pt-16 md:pt-20 lg:pt-24">
          <CaseStudySectionHeading
            number="05"
            eyebrow="Strategic Contributions"
            title="What I owned, start to finish"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            My role covered the full arc of this project: the design
            audit, dispatcher interviews, golden-path flow mapping, sitemap
            and permission design, and UI design for the shipped platform —
            handed off to engineering through prototypes in Figma and
            documentation in Notion.
          </p>
        </div>

        {/* 06 — The Final Phase */}
        <div className="flex w-full max-w-[720px] flex-col items-start gap-8 border-t border-stroke-dark pt-16 md:pt-20 lg:pt-24">
          <CaseStudySectionHeading
            number="06"
            eyebrow="The Final Phase"
            title="One platform, replacing a database and a phone line"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            The Access file is gone. Dispatchers, drivers, and billing now
            work from one live platform instead of a local database file,
            a phone line, and a stack of paper forms.
          </p>
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            Dispatchers plan two weeks out instead of two or three days.
            Driver tracking replaced phone-and-SMS check-ins with
            real-time visibility. Referrals land in one queue instead of
            three separate inboxes, and manual entry is largely gone from
            the workflow.
          </p>
        </div>
        <CaseStudyFigure
          src="/images/arrowhead-transit/platform-1.png"
          caption="Arrowhead Transit today — trips this week, incoming referrals, and available drivers, all live."
          aspect="2048/1623"
        />
        <CaseStudyGallery
          items={[
            {
              src: "/images/arrowhead-transit/platform-2.png",
              alt: "Arrowhead Transit incoming referrals queue showing new ride requests.",
              caption: "Incoming referrals — every outside request in one queue.",
              aspect: "2048/945",
            },
            {
              src: "/images/arrowhead-transit/platform-3.png",
              alt: "Arrowhead Transit trip detail view with a live route map.",
              caption: "Trip detail — a live route on the map.",
              aspect: "2048/1165",
            },
            {
              src: "/images/arrowhead-transit/platform-4.png",
              alt: "Arrowhead Transit driver tracking view showing an active route on a map.",
              caption: "Driver tracking — an active route, in real time.",
              aspect: "2048/1357",
              span: true,
            },
          ]}
        />
      </div>

      <CaseStudyJsonLd currentHref="/case-studies/arrowhead-transit" />
    </>
  );
}
