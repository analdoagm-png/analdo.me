import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CaseStudyCard } from "@/components/case-study-card";
import { CaseStudyIndexRow } from "@/components/case-study-index-row";
import { ToolIcon } from "@/components/tool-icon";
import { ContactIcon } from "@/components/contact-icon";
import type { Metadata } from "next";
import { caseStudies } from "@/lib/case-studies";
import { contactLinks } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="main-content" className="flex-1">
        {/*
          Mobile top padding (80px) is deliberately larger than tablet's, to
          clear the floating MobileNav pill; at `md` a real header bar sits
          above instead, so it steps back down to 64px.
        */}
        <section className="mx-auto w-full max-w-[1280px] px-6 pt-20 pb-16 md:px-10 md:pt-16 lg:px-16 lg:pt-40">
          <div className="flex flex-col items-start gap-6">
            {/*
              Mobile-only identity intro. SiteHeader's bar (which used to
              carry this lockup at every breakpoint) now only renders md and
              up — MobileNav's fixed pill replaces it below md and doesn't
              show the name/role, so the homepage's own hero carries it
              instead, directly above the h1.
            */}
            <div className="flex flex-col animate-fade-up md:hidden">
              <span className="text-body-h2 font-semibold text-white">Analdo Gomez</span>
              <span className="text-balance text-body-h2 text-white/70">
                Senior Product Designer
              </span>
            </div>
            <h1 className="w-full animate-fade-up text-balance text-heading-h4 text-white md:text-heading-h2 lg:max-w-[884px]">
              Over a decade solving complex B2B problems with design
              systems built to ship straight to code, and clearer paths to
              better outcomes.
            </h1>
            {/*
              Plain inline text flow (not a flex row of block-level chunks)
              so the browser's normal line-breaking can wrap at any word
              boundary, including between the leading clause and the tool
              list. The previous flex-col/md:flex-row structure wrapped the
              leading sentence and the tool list as two separate stacked
              chunks instead of one continuous line.
            */}
            <p className="w-full animate-fade-up text-balance text-body-h2 text-white/70 [animation-delay:100ms] md:text-body-h1">
              Based in Colombia, working globally with{" "}
              <span className="inline-flex items-center gap-1.5 align-middle">
                <span
                  aria-hidden="true"
                  className="flex size-3.5 shrink-0 items-center justify-center"
                >
                  <ToolIcon name="figma" />
                </span>
                Figma
              </span>
              ,{" "}
              <span className="inline-flex items-center gap-1.5 align-middle">
                <span
                  aria-hidden="true"
                  className="flex size-3.5 shrink-0 items-center justify-center"
                >
                  <ToolIcon name="claude" />
                </span>
                Claude Code
              </span>{" "}
              and{" "}
              <span className="inline-flex items-center gap-1.5 align-middle">
                <span
                  aria-hidden="true"
                  className="flex size-3.5 shrink-0 items-center justify-center"
                >
                  <ToolIcon name="codex" />
                </span>
                Codex
              </span>
            </p>
            <div className="flex flex-col gap-4 animate-fade-up [animation-delay:200ms] md:flex-row md:flex-wrap md:items-start md:gap-6">
              {contactLinks.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  className="inline-flex items-center gap-2 font-mono text-body-h2 text-white transition-colors duration-200 hover:text-white/60 active:text-white/40"
                >
                  <span aria-hidden="true" className="flex size-4 shrink-0 items-center justify-center">
                    <ContactIcon name={icon} />
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/*
          Mobile keeps the original CaseStudyCard grid unchanged (full-bleed,
          single column, no horizontal padding below `md`); the editorial
          index list only takes over from `md` up. Both grids render in the
          DOM and toggle with `md:hidden` / `hidden md:flex` rather than a
          client-side breakpoint check, so the page stays a server component
          with no hydration mismatch — the trade-off is that both sets of
          project images exist in the DOM at once, which is fine since only
          the first (`priority`) image of whichever grid is visible loads
          eagerly and the rest lazy-load.
        */}
        <section className="mx-auto w-full max-w-[1280px] pb-16 md:px-10 lg:px-16">
          {/*
            Row/card titles are h3, so this names the section and keeps the
            document outline from jumping h1 → h3. Visually hidden to leave
            the minimal hero-then-work layout untouched.
          */}
          <h2 className="sr-only">Selected work</h2>

          <div className="grid w-full grid-cols-1 gap-6 md:hidden">
            {caseStudies.map((cs, index) => (
              <CaseStudyCard
                key={cs.href}
                href={cs.href}
                image={cs.image}
                title={cs.title}
                description={cs.description}
                chips={cs.chips}
                priority={index === 0}
                style={{ animationDelay: `${index * 70}ms` }}
              />
            ))}
          </div>

          <div className="hidden w-full flex-col divide-y divide-stroke-dark border-t border-stroke-dark md:flex">
            {caseStudies.map((cs, index) => (
              <CaseStudyIndexRow
                key={cs.href}
                href={cs.href}
                image={cs.image}
                title={cs.title}
                description={cs.description}
                chips={cs.chips}
                priority={index === 0}
                style={{ animationDelay: `${index * 70}ms` }}
              />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
