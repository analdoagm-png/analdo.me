import type { Metadata } from "next";
import { CaseStudyCard } from "@/components/case-study-card";
import { ContactGlyph } from "@/components/contact-glyph";
import { ToolIcon } from "@/components/tool-icon";
import { bioStatement } from "@/components/home-sidebar";
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
        The real `<h1>` for this page is HomeSidebar's own sr-only
        heading (present at every breakpoint) — this paragraph is a
        purely visual duplicate for viewports where the sidebar itself
        is hidden, not a second heading. See home-sidebar.tsx's doc
        comment for why: two real h1s used to ship in the DOM at once
        here, confirmed with a live curl audit.

        `stagger-section` on this wrapper (not the page root — see the
        card grid below for why) cascades its own 3 children in on load;
        the wrapper itself stays unanimated so its own opacity doesn't
        compound with each child's (see globals.css's `.stagger-section`
        comment for why that pairing is avoided).
      */}
      <div className="stagger-section flex flex-col gap-6 md:hidden">
        <p className="w-full animate-fade-up text-pretty font-mono text-body-h2 text-white">
          {bioStatement}
        </p>
        <p className="w-full animate-fade-up text-balance font-mono text-body-h2 text-white/70">
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
        <div className="flex animate-fade-up flex-col gap-4">
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

          `w-full` only from `md:` up, not unconditionally: this div's
          ancestors are `flex flex-col` containers, and a flex item with an
          explicit `width: 100%` sizes against its flex container's content
          box — the `-mx-6` negative margin shifts its left edge but the
          negative margin math that would normally also expand a block
          box's width never runs, since the width isn't `auto`. Below `md`
          that left the grid ~48px narrower than the viewport (visible as a
          gap on both sides of the mobile cards, caught in a live visual
          check) instead of truly full-bleed. Leaving width unset below
          `md` lets the negative margin resolve it to the real full
          viewport width; `md:w-full` restores the old behavior once
          `md:mx-0` cancels the negative margin anyway, where it's correct.

          `md:max-w-[1280px]`: this system's standard page-container cap
          (see DESIGN.md), applied here so the two-column card grid stops
          growing past it on very large monitors — otherwise `lg:grid-cols-2`
          stretches each card (and its 16:9 image) oversized once the
          available content width well exceeds 1280px. Left-aligned rather
          than centered, matching how every other element in this
          sidebar-offset content column sits flush with the sidebar rather
          than floating in the middle of the remaining viewport width.
          `md:` scoped for the same reason `w-full` is: below `md` the grid
          is full-bleed and unconstrained by design.
        */}
        <div className="-mx-6 grid grid-cols-1 gap-6 md:mx-0 md:w-full md:max-w-[1280px] lg:grid-cols-2 lg:gap-8">
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
              // 240ms base offset continues the page's top-to-bottom
              // cascade after the mobile hero block's own 3-item stagger
              // (0/60/120ms, see the wrapper above) — without it, this
              // grid's per-card stagger would start racing the hero's
              // reveal from the same t=0, rather than reading as the
              // page's next stagger step.
              style={{ animationDelay: `${240 + index * 70}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
