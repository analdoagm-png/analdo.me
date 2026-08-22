import { caseStudyMetadata } from "@/lib/case-studies";
import { HomeSidebar } from "@/components/home-sidebar";
import { MobileTopBar } from "@/components/mobile-top-bar";
import { MobileFooter } from "@/components/mobile-footer";
import { CaseStudyJsonLd } from "@/components/case-study-json-ld";
import { ProjectImage } from "@/components/project-image";

export const metadata = caseStudyMetadata({
  href: "/case-studies/uber-suite",
  title: "Uber Suite Internal Tooling Showcase",
  description:
    "An all-in-one internal toolset for Uber, streamlining communication, boosting employee engagement, and enabling fast, AI-driven knowledge discovery across the organization.",
});

/**
 * Second case study moved to the new sidebar system, following Forty5Park
 * exactly — see that page's own comments for the full rationale (centered
 * `items-center` column, `w-full max-w-[720px]` text / `w-full
 * max-w-[1280px]` images, inline YEAR/intro/section text rather than the
 * shared `CaseStudyYear`/`CaseStudyIntroBlock`/`CaseStudySectionBlock`
 * since Github's Security Findings hasn't moved yet, no `CaseStudyNext`).
 *
 * Per-image `aspect` overrides are carried over unchanged from the old
 * version — several of this project's screenshots are portrait or
 * near-square, not the component's `2880/1800` default.
 */
export default function UberSuiteCaseStudy() {
  return (
    <>
      <a
        href="#main-content"
        className="skip-link rounded-token border border-stroke-dark bg-dark-primary px-4 py-2 font-mono text-body-h2 text-white"
      >
        Skip to content
      </a>

      <MobileTopBar />

      <main id="main-content" className="flex-1">
        <HomeSidebar
          bioAs="p"
          activeNav="works"
          className="hidden md:fixed md:inset-y-0 md:left-0 md:flex md:w-80"
        />

        <div className="flex flex-col items-center gap-12 px-6 pt-24 pb-16 md:gap-16 md:p-12 md:pl-[368px] lg:p-16 lg:pl-[384px]">
          <h1 className="w-full max-w-[720px] animate-fade-up text-balance font-mono text-heading-h3 font-bold text-white md:text-heading-h1">
            Uber Suite
          </h1>

          <div className="flex w-full max-w-[720px] flex-col items-start">
            <p className="font-mono text-body-h3 text-white/70 uppercase tracking-[0.05em]">
              Year
            </p>
            <time dateTime="2018" className="font-mono text-body-h2 text-white">
              2018
            </time>
          </div>

          <div className="flex w-full max-w-[720px] animate-fade-up flex-col gap-6 [animation-delay:100ms]">
            <p className="text-pretty font-mono text-body-h2 font-bold text-white">
              An all-in-one internal toolset for Uber, streamlining
              communication, boosting employee engagement, and enabling fast,
              AI-driven knowledge discovery across the organization.
            </p>
            <p className="text-pretty font-mono text-body-h2 text-white/70">
              At Uber&rsquo;s scale, internal communication breaks down fast
              — information gets siloed, announcements go unread, and
              finding institutional knowledge becomes a full-time job. I
              designed Uber Suite to consolidate that experience: one
              toolset for company-wide communication, employee engagement,
              and AI-assisted knowledge discovery.
            </p>
          </div>

          <div className="w-full max-w-[1280px]">
            <ProjectImage
              src="/images/uber-suite/project-image-1.png"
              alt="Uber Search results screen showing employee profile cards for a company-wide people search."
              aspect="3200/3274"
              roundedClassName="rounded-token"
              priority
            />
          </div>
          <div className="w-full max-w-[1280px]">
            <ProjectImage
              src="/images/uber-suite/project-image-2.png"
              alt="Uber Suite release plan form for configuring a company-wide announcement rollout."
              aspect="3840/2800"
              roundedClassName="rounded-token"
            />
          </div>

          <div className="flex w-full max-w-[720px] animate-fade-up flex-col gap-6">
            <h2 className="text-balance font-mono text-heading-h5 font-bold text-white">
              One surface, many teams
            </h2>
            <p className="text-pretty font-mono text-body-h2 text-white/70">
              The problem wasn&rsquo;t a lack of tools — it was too many
              disconnected ones. My focus was on reducing cognitive load for
              employees navigating across teams, so I built around a unified
              navigation model and surfaced relevant content based on role
              and context.
            </p>
          </div>

          <div className="w-full max-w-[1280px]">
            <ProjectImage
              src="/images/uber-suite/project-image-3.png"
              alt="Uber Suite dashboard showing recent announcements and release management tools."
              roundedClassName="rounded-token"
            />
          </div>
          <div className="w-full max-w-[1280px]">
            <ProjectImage
              src="/images/uber-suite/project-image-4.png"
              alt="Uber Suite mobile app screens showing team member profiles and a department page."
              aspect="2880/2560"
              roundedClassName="rounded-token"
            />
          </div>
          <div className="w-full max-w-[1280px]">
            <ProjectImage
              src="/images/uber-suite/project-image-5.png"
              alt="Uber Suite messaging tool showing a contextual list of users and channels."
              roundedClassName="rounded-token"
            />
          </div>
          <div className="w-full max-w-[1280px]">
            <ProjectImage
              src="/images/uber-suite/project-image-6.png"
              alt="Uber Suite messaging tool showing channel search and multi-user selection."
              roundedClassName="rounded-token"
            />
          </div>
          <div className="w-full max-w-[1280px]">
            <ProjectImage
              src="/images/uber-suite/project-image-7.png"
              alt="Uber Suite messaging thread showing a conversation between team members."
              roundedClassName="rounded-token"
            />
          </div>

          <div className="flex w-full max-w-[720px] animate-fade-up flex-col gap-6">
            <h2 className="text-balance font-mono text-heading-h5 font-bold text-white">
              Scale changes everything about how people communicate
            </h2>
            <p className="text-pretty font-mono text-body-h2 text-white/70">
              Consolidating fragmented internal tools into one surface
              reduced the time employees spent context-switching and
              surfaced relevant information faster. Adoption came naturally
              because the tool fit how people already worked.
            </p>
          </div>
        </div>
      </main>

      {/*
        No CaseStudyNext on this page — dropped for the new sidebar design,
        matching Forty5Park. The persistent "/ Works" sidebar link covers
        the onward path back to the index.
      */}
      <CaseStudyJsonLd currentHref="/case-studies/uber-suite" />
      <MobileFooter />
    </>
  );
}
