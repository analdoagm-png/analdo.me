import Link from "next/link";
import type { Metadata } from "next";
import { CaseStudyCard } from "@/components/case-study-card";
import { HomeSidebar } from "@/components/home-sidebar";
import { SocialIcon } from "@/components/social-icon";
import { caseStudies } from "@/lib/case-studies";
import { author } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const mobileLinkStyles =
  "text-white transition-colors duration-200 hover:text-white/60 active:text-white/40";

export default function Home() {
  return (
    <>
      {/*
        The redesigned homepage has no SiteHeader, so it renders its own
        skip link as the page's first element, matching the same treatment
        SiteHeader/CaseStudyHeader give every other route.
      */}
      <a
        href="#main-content"
        className="skip-link rounded-token border border-stroke-dark bg-dark-primary px-4 py-2 text-body-h2 text-white"
      >
        Skip to content
      </a>

      {/*
        Mobile-only top bar: Resume link + social icons. HomeSidebar hides its
        own copies of both below `md` so this content isn't duplicated in the
        DOM — at `md` and up it lives inside the sidebar column instead.
      */}
      <div className="flex w-full items-center justify-between border-b border-stroke-dark px-6 py-4 md:hidden">
        <Link href="/about" className={`text-body-h2 ${mobileLinkStyles}`}>
          Resume
        </Link>
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${author.email}`}
            target="_blank"
            aria-label="Email"
            className={mobileLinkStyles}
          >
            <span className="flex size-6 items-center justify-center">
              <SocialIcon name="mail" />
            </span>
          </a>
          <a
            href={author.linkedIn}
            target="_blank"
            aria-label="LinkedIn"
            className={mobileLinkStyles}
          >
            <span className="flex size-6 items-center justify-center">
              <SocialIcon name="linkedin" />
            </span>
          </a>
          <a
            href={author.github}
            target="_blank"
            aria-label="GitHub"
            className={mobileLinkStyles}
          >
            <span className="flex size-6 items-center justify-center">
              <SocialIcon name="github" />
            </span>
          </a>
        </div>
      </div>

      <main id="main-content" className="flex-1">
        <div className="flex flex-col gap-8 px-6 py-8 md:gap-12 md:p-12 lg:flex-row lg:items-start lg:gap-12 lg:p-16">
          {/*
            Sticky only at `lg`, where the sidebar is actually a side column
            next to a taller scrolling grid (lg:items-start above keeps it
            from being stretched to match the grid's height, which sticky
            needs). At md and below it stacks above the grid instead, where
            sticking it would just freeze it over the cards as they scroll.

            lg:w-72 (288px) rather than the Figma frame's literal 264px: at
            264px the tool-sentence line has no wrapping that fits it on two
            lines — it needs three no matter how it's balanced. 288px is the
            narrowest round Tailwind width where it settles on two.
          */}
          <HomeSidebar className="lg:sticky lg:top-16 lg:w-72 lg:shrink-0" />

          {/*
            -mx-6 cancels the shared px-6 from the wrapper above so cards run
            edge-to-edge on mobile, matching the Figma mobile frame. md:mx-0
            lets the cards sit inset within the wrapper's own md:p-12/lg:p-16
            padding instead, matching the tablet/desktop frames.
          */}
          <div className="-mx-6 flex w-full flex-col gap-6 md:mx-0 lg:max-w-[840px] lg:flex-1">
            {/*
              Card titles are h3, so this names the section and keeps the
              document outline from jumping h1 (in HomeSidebar) -> h3.
            */}
            <h2 className="sr-only">Selected work</h2>
            {caseStudies.map((cs, index) => (
              <CaseStudyCard
                key={cs.href}
                {...cs}
                priority={index === 0}
                style={{ animationDelay: `${index * 70}ms` }}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
