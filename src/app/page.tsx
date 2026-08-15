import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CaseStudyCard } from "@/components/case-study-card";
import { ToolIcon } from "@/components/tool-icon";
import type { Metadata } from "next";
import { caseStudies } from "@/lib/case-studies";
import { author } from "@/lib/site";

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
        <section className="mx-auto w-full max-w-[1280px] px-6 pt-12 pb-16 md:px-10 md:pt-16 lg:px-16 lg:pt-40">
          <div className="flex flex-col items-start gap-6">
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
            <p className="w-full animate-fade-up text-balance text-body-h1 text-white/70 [animation-delay:100ms]">
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
            <div className="flex flex-wrap items-start gap-6 animate-fade-up [animation-delay:200ms]">
              <a
                href={`mailto:${author.email}`}
                target="_blank"
                className="text-body-h2 text-white transition-colors duration-200 hover:text-white/60 active:text-white/40"
              >
                / Contact me
              </a>
              <a
                href={author.linkedIn}
                target="_blank"
                className="text-body-h2 text-white transition-colors duration-200 hover:text-white/60 active:text-white/40"
              >
                / LinkedIn
              </a>
              <a
                href={author.github}
                target="_blank"
                className="text-body-h2 text-white transition-colors duration-200 hover:text-white/60 active:text-white/40"
              >
                / GitHub
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1280px] px-6 pb-16 md:px-10 lg:px-16">
          {/*
            Card titles are h3, so this names the section and keeps the document
            outline from jumping h1 → h3. Visually hidden to leave the minimal
            hero-then-grid layout untouched.
          */}
          <h2 className="sr-only">Selected work</h2>
          <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            {caseStudies.map((cs, index) => (
              <CaseStudyCard
                key={cs.href}
                {...cs}
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
