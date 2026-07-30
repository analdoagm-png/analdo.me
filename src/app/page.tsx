import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CaseStudyCard } from "@/components/case-study-card";
import { Chip } from "@/components/chip";
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
              Over a decade of solving complex B2B problems with clear
              thinking, fewer steps, and better outcomes.
            </h1>
            <div className="flex flex-col items-start gap-2 animate-fade-up [animation-delay:100ms] md:flex-row md:flex-wrap md:items-center">
              <p className="text-body-h1 text-white/70">
                Based in Colombia, working globally with
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <Chip label="Figma" icon={<ToolIcon name="figma" />} />
                <span className="text-body-h1 text-white/70">,</span>
                <Chip label="Claude" icon={<ToolIcon name="claude" />} />
                <span className="text-body-h1 text-white/70">and</span>
                <Chip label="Codex" icon={<ToolIcon name="codex" />} />
              </div>
            </div>
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
