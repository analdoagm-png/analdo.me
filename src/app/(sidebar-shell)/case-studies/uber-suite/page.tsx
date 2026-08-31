import { caseStudyMetadata } from "@/lib/case-studies";
import { CaseStudyJsonLd } from "@/components/case-study-json-ld";
import { CaseStudyBackLink } from "@/components/case-study-back-link";
import { CaseStudyProjectHeader } from "@/components/case-study-project-header";
import { CaseStudySectionHeading } from "@/components/case-study-section-heading";
import { CaseStudyFigure } from "@/components/case-study-figure";
import { CaseStudyGallery } from "@/components/case-study-gallery";

export const metadata = caseStudyMetadata({
  href: "/case-studies/uber-suite",
  title: "Uber Suite Internal Tooling Showcase",
  description:
    "An all-in-one internal toolset for Uber — streamlining communication, boosting employee engagement, and enabling fast, AI-driven knowledge discovery.",
});

/**
 * Fourth case study on the six-part format — see GoRight's own doc comment
 * for the full rationale. Like Forty5Park, this page previously ran a
 * lighter "intro / approach / results" shape with no Role/Tools row; both
 * are added here from detail the site owner supplied for this pass (agency
 * engagement, senior product designer, Figma).
 *
 * No `CaseStudyDecisionBlock` on this page, same reasoning as Forty5Park —
 * the real material is one continuous design-system constraint (see
 * "Challenges" below), not a series of discrete named decisions.
 *
 * "Challenges" covers the one real hard problem the site owner named: one
 * design system that had to scale across desktop/tablet/mobile *and*
 * across every team at Uber's own already-different tools and use cases —
 * grounded with a two-image gallery (desktop dashboard next to the mobile
 * app) rather than a single figure, since the challenge is literally about
 * the same system across different devices.
 *
 * "The Final Phase" stays qualitative — no hard adoption numbers were
 * available for this project, so this page doesn't invent one.
 */
export default function UberSuiteCaseStudy() {
  return (
    <>
      <CaseStudyBackLink />
      <div className="stagger-section flex flex-col items-center gap-12 px-6 pt-24 pb-16 md:gap-16 md:p-12 md:pt-24 lg:p-16 lg:pl-[384px]">
        <CaseStudyProjectHeader
          title="Uber Suite"
          role="Senior Product Designer"
          tools="Figma"
          year={2018}
        />

        {/* 01 — Overview */}
        <div className="flex w-full max-w-[720px] flex-col items-start gap-8">
          <CaseStudySectionHeading
            number="01"
            eyebrow="Overview"
            title="One internal toolset, designed to scale across every team at Uber"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            Uber Suite is an all-in-one internal toolset built for Uber,
            consolidating company-wide communication, employee engagement,
            and AI-assisted knowledge discovery into one experience. I
            worked on it as senior product designer through an agency
            engagement with Uber, designing in Figma.
          </p>
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            At Uber&rsquo;s scale, internal communication breaks down fast
            — information gets siloed, announcements go unread, and
            finding institutional knowledge becomes a full-time job.
          </p>
        </div>
        <CaseStudyFigure
          src="/images/uber-suite/project-image-1.png"
          caption="Uber Search — employee profile cards for a company-wide people search."
          aspect="3200/3274"
          priority
        />

        {/* 02 — Pain Points */}
        <div className="flex w-full max-w-[720px] flex-col items-start gap-8 border-t border-stroke-dark pt-16 md:pt-20 lg:pt-24">
          <CaseStudySectionHeading
            number="02"
            eyebrow="Pain Points"
            title="Too many tools, each with its own patterns and its own login"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            The problem wasn&rsquo;t a lack of tools — it was too many
            disconnected ones. Employees navigating across teams had to
            learn a different tool for messaging, a different one for
            announcements, a different one for finding a colleague or a
            department, each with its own patterns.
          </p>
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            Institutional knowledge was scattered the same way. An
            employee looking for a policy, a past announcement, or the
            right person to ask had no single place to start — just
            whichever tool happened to hold that particular piece of
            information, if they could remember which one.
          </p>
        </div>

        {/* 03 — Project Scope and Design */}
        <div className="flex w-full max-w-[720px] flex-col items-start gap-8 border-t border-stroke-dark pt-16 md:pt-20 lg:pt-24">
          <CaseStudySectionHeading
            number="03"
            eyebrow="Project Scope and Design"
            title="A unified navigation model, not a one-size-fits-all layout"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            My focus was reducing cognitive load for employees navigating
            across teams, so I built around a unified navigation model and
            surfaced relevant content based on role and context — rather
            than asking every team to adapt to one generic layout that
            fit none of them particularly well.
          </p>
        </div>
        <CaseStudyGallery
          items={[
            {
              src: "/images/uber-suite/project-image-2.png",
              alt: "Uber Suite release plan form for configuring a company-wide announcement rollout.",
              caption: "Release plan — configuring a company-wide announcement rollout.",
              aspect: "3840/2800",
            },
            {
              src: "/images/uber-suite/project-image-5.png",
              alt: "Uber Suite messaging tool showing a contextual list of users and channels.",
              caption: "Messaging — a contextual list of users and channels.",
              aspect: "2880/1800",
            },
          ]}
        />

        {/* 04 — Challenges */}
        <div className="flex w-full max-w-[720px] flex-col items-start gap-8 border-t border-stroke-dark pt-16 md:pt-20 lg:pt-24">
          <CaseStudySectionHeading
            number="04"
            eyebrow="Challenges"
            title="One system, every device, every team's own use case"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            The hardest constraint wasn&rsquo;t any single screen — it was
            building one design system that had to scale across every
            venue employees actually used it in: desktop, tablet, and
            mobile, each with real differences in how people worked. It
            also had to scale across every team at Uber, from ops to
            engineering to support, each with tools and use cases already
            embedded in their day. A rigid system would have broken the
            moment a team&rsquo;s workflow didn&rsquo;t match the
            template; a system with no shared spine wouldn&rsquo;t have
            felt like one product at all. It had to stay consistent enough
            to read as Uber Suite everywhere, and flexible enough that no
            team felt like they were working around it.
          </p>
        </div>
        <CaseStudyGallery
          items={[
            {
              src: "/images/uber-suite/project-image-3.png",
              alt: "Uber Suite dashboard showing recent announcements and release management tools.",
              caption: "The same system on desktop — announcements and release management.",
              aspect: "2880/1800",
            },
            {
              src: "/images/uber-suite/project-image-4.png",
              alt: "Uber Suite mobile app screens showing team member profiles and a department page.",
              caption: "The same system on mobile — team profiles and a department page.",
              aspect: "2880/2560",
            },
          ]}
        />

        {/* 05 — Strategic Contributions */}
        <div className="flex w-full max-w-[720px] flex-col items-start gap-8 border-t border-stroke-dark pt-16 md:pt-20 lg:pt-24">
          <CaseStudySectionHeading
            number="05"
            eyebrow="Strategic Contributions"
            title="What I owned, start to finish"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            As the agency-side senior product designer on this engagement,
            I was responsible for the interaction model and the design
            system itself — the patterns that had to hold up across
            desktop, tablet, and mobile, and across every team&rsquo;s own
            version of the product, not just the screens for one
            team&rsquo;s workflow.
          </p>
        </div>

        {/* 06 — The Final Phase */}
        <div className="flex w-full max-w-[720px] flex-col items-start gap-8 border-t border-stroke-dark pt-16 md:pt-20 lg:pt-24">
          <CaseStudySectionHeading
            number="06"
            eyebrow="The Final Phase"
            title="Scale changes everything about how people communicate"
          />
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            Consolidating fragmented internal tools into one surface
            reduced the time employees spent context-switching and
            surfaced relevant information faster.
          </p>
          <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white/70">
            There&rsquo;s no single number that captures it — the real
            result was a system that held together across every team and
            every device it needed to run on, without a separate version
            for each one. Adoption came naturally because the tool fit how
            people already worked, not the other way around.
          </p>
        </div>
        <CaseStudyGallery
          items={[
            {
              src: "/images/uber-suite/project-image-6.png",
              alt: "Uber Suite messaging tool showing channel search and multi-user selection.",
              caption: "Messaging — channel search and multi-user selection.",
              aspect: "2880/1800",
            },
            {
              src: "/images/uber-suite/project-image-7.png",
              alt: "Uber Suite messaging thread showing a conversation between team members.",
              caption: "Messaging — a conversation thread between team members.",
              aspect: "2880/1800",
            },
          ]}
        />
      </div>

      {/*
        No CaseStudyNext on this page — dropped for the new sidebar design,
        matching every other case study. The persistent "/ Works" sidebar
        link covers the onward path back to the index.
      */}
      <CaseStudyJsonLd currentHref="/case-studies/uber-suite" />
    </>
  );
}
