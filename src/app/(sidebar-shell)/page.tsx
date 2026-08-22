import type { Metadata } from "next";
import { CaseStudyCard } from "@/components/case-study-card";
import { ContactGlyph } from "@/components/contact-glyph";
import { ToolIcon } from "@/components/tool-icon";
import { caseStudies } from "@/lib/case-studies";
import { author } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

/**
 * The shell (skip link, MobileTopBar, HomeSidebar, MobileFooter) lives in
 * this route group's `layout.tsx` now — this page only returns its own
 * content column, the same way every other page on this system does.
 */
export default function Home() {
  return (
    <div className="flex flex-col gap-8 px-6 pt-24 pb-8 md:p-12 md:pl-[368px] lg:p-16 lg:pl-[384px]">
      {/*
        Mobile-only hero content. HomeSidebar covers this same content
        from md up (name/role, statement, tool sentence, contact
        links) — kept out of the DOM twice by scoping this block to
        md:hidden rather than hiding pieces of HomeSidebar itself.
      */}
      <div className="flex flex-col gap-6 md:hidden">
        <h1 className="w-full text-pretty font-mono text-body-h2 text-white">
          Over a decade solving complex B2B problems with design systems
          built to ship straight to code, and clearer paths to better
          outcomes.
        </h1>
        <p className="w-full text-balance font-mono text-body-h2 text-white/70">
          Based in Colombia, working globally with{" "}
          <span className="inline-flex items-center gap-1 align-middle">
            <span
              aria-hidden="true"
              className="flex size-3 shrink-0 items-center justify-center"
            >
              <ToolIcon name="figma" />
            </span>
            Figma
          </span>
          ,{" "}
          <span className="inline-flex items-center gap-1 align-middle">
            <span
              aria-hidden="true"
              className="flex size-3 shrink-0 items-center justify-center"
            >
              <ToolIcon name="claude" />
            </span>
            Claude Code
          </span>{" "}
          and{" "}
          <span className="inline-flex items-center gap-1 align-middle">
            <span
              aria-hidden="true"
              className="flex size-3 shrink-0 items-center justify-center"
            >
              <ToolIcon name="codex" />
            </span>
            Codex
          </span>
        </p>
        <div className="flex flex-col gap-4">
          <a
            href={`mailto:${author.email}`}
            target="_blank"
            className="inline-flex items-center gap-2 font-mono text-body-h2 text-white transition-colors duration-200 hover:text-white/60 active:text-white/40"
          >
            <span
              aria-hidden="true"
              className="flex size-4 shrink-0 items-center justify-center"
            >
              <ContactGlyph name="mail" />
            </span>
            Contact me
          </a>
          <a
            href={author.linkedIn}
            target="_blank"
            className="inline-flex items-center gap-2 font-mono text-body-h2 text-white transition-colors duration-200 hover:text-white/60 active:text-white/40"
          >
            <span
              aria-hidden="true"
              className="flex size-4 shrink-0 items-center justify-center"
            >
              <ContactGlyph name="linkedin" />
            </span>
            LinkedIn
          </a>
          <a
            href={author.github}
            target="_blank"
            className="inline-flex items-center gap-2 font-mono text-body-h2 text-white transition-colors duration-200 hover:text-white/60 active:text-white/40"
          >
            <span
              aria-hidden="true"
              className="flex size-4 shrink-0 items-center justify-center"
            >
              <ContactGlyph name="github" />
            </span>
            GitHub
          </a>
        </div>
      </div>

      <div className="flex w-full flex-col gap-8">
        {/*
          Card titles are h3, so this names the section and keeps the
          document outline from jumping h1 (in HomeSidebar, or the
          mobile-only h1 above) -> h3. sr-only at every breakpoint —
          the tablet Figma frame has a visible "SELECTED CASE STUDIES
          (N)" label here, but it was removed by request.
        */}
        <h2 className="sr-only">Selected Case Studies ({caseStudies.length})</h2>

        {/*
          No horizontal padding below `md` — mobile cards run full-bleed
          to the viewport edges (see CaseStudyCard). Standard grid gap
          resumes, and reflows lg:grid-cols-2, once the sidebar is a real
          side column at md.
        */}
        <div className="-mx-6 grid w-full grid-cols-1 gap-6 md:mx-0 lg:grid-cols-2 lg:gap-8">
          {caseStudies.map((cs, index) => (
            <CaseStudyCard
              key={cs.href}
              href={cs.href}
              image={cs.image}
              title={cs.title}
              // The leading "Case Study"/"Showcase" type tag is
              // included below `md` (mobile Figma frame keeps it) and
              // dropped from `md` up (tablet Figma frame doesn't show
              // it) — CaseStudyCard hides chips[0] itself with
              // `md:hidden` rather than this call site slicing the
              // array, since the two breakpoints genuinely disagree.
              chips={cs.chips}
              description={cs.description}
              priority={index === 0}
              style={{ animationDelay: `${index * 70}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
