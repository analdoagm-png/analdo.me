import type { Metadata } from "next";
import { CaseStudyCard } from "@/components/case-study-card";
import { HomeSidebar } from "@/components/home-sidebar";
import { MobileTopBar } from "@/components/mobile-top-bar";
import { ContactGlyph } from "@/components/contact-glyph";
import { ToolIcon } from "@/components/tool-icon";
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
      {/*
        The redesigned homepage has no SiteHeader, so it renders its own
        skip link as the page's first element, matching the same treatment
        SiteHeader/CaseStudyHeader give every other route.
      */}
      <a
        href="#main-content"
        className="skip-link rounded-token border border-stroke-dark bg-dark-primary px-4 py-2 font-mono text-body-h2 text-white"
      >
        Skip to content
      </a>

      {/*
        Mobile-only (md:hidden internally): a fixed top bar, replacing the
        old static border-b bar. See MobileTopBar for why it's fixed instead
        of inline like the Figma frame's own collapsed state.
      */}
      <MobileTopBar />

      <main id="main-content" className="flex-1">
        {/*
          pt-24 on mobile clears the fixed MobileTopBar (24px inset + ~48px
          bar height + breathing room); md/lg drop back to the padding
          scale's own p-12/p-16, which is plenty since the bar doesn't exist
          there. md:items-start keeps the sidebar from being stretched to
          the grid's height, which its own md:sticky needs room to work.
        */}
        <div className="flex flex-col gap-8 px-6 pt-24 pb-8 md:flex-row md:items-start md:gap-12 md:p-12 lg:gap-16 lg:p-16">
          <HomeSidebar className="hidden md:sticky md:top-12 md:flex md:w-80 md:shrink-0" />

          <div className="flex w-full flex-col gap-8 md:flex-1">
            {/*
              Mobile-only hero content. HomeSidebar covers this same content
              from md up (name/role, statement, tool sentence, contact
              links) — kept out of the DOM twice by scoping this block to
              md:hidden rather than hiding pieces of HomeSidebar itself.
            */}
            <div className="flex flex-col gap-6 md:hidden">
              <h1 className="w-full text-pretty font-mono text-body-h2 text-white">
                Over a decade solving complex B2B problems with design
                systems built to ship straight to code, and clearer paths to
                better outcomes.
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

            {/*
              No horizontal padding below `md` — mobile cards run full-bleed
              to the viewport edges (see CaseStudyCard). Standard grid gap
              resumes, and reflows lg:grid-cols-2, once the sidebar is a real
              side column at md.
            */}
            <div className="-mx-6 grid w-full grid-cols-1 gap-6 md:mx-0 lg:grid-cols-2 lg:gap-8">
              {/*
                Card titles are h3, so this names the section and keeps the
                document outline from jumping h1 (in HomeSidebar, or the
                mobile-only h1 above) -> h3.
              */}
              <h2 className="sr-only">Selected work</h2>
              {caseStudies.map((cs, index) => (
                <CaseStudyCard
                  key={cs.href}
                  href={cs.href}
                  image={cs.image}
                  title={cs.title}
                  // Drops the leading "Case Study"/"Showcase" type tag for
                  // this iteration — chips[0] in every entry, see
                  // lib/case-studies.ts. The underlying data keeps it for
                  // other consumers (sitemap, a future case-study-page pass).
                  chips={cs.chips.slice(1)}
                  description={cs.description}
                  priority={index === 0}
                  style={{ animationDelay: `${index * 70}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/*
        Mobile-only footer: copyright + icon-only social links, matching the
        Figma frame's separate site-footer node. md and up, HomeSidebar's
        own copyright line covers this role instead (see the current
        redesign/homepage-v2 docs on why no SiteFooter is rendered here).
      */}
      <div className="flex items-center justify-between border-t border-stroke-dark px-6 py-6 md:hidden">
        <p className="font-mono text-body-h2 text-white/70">© Analdo Gomez / 2026</p>
        <div className="flex items-center gap-4">
          <a
            href={`mailto:${author.email}`}
            target="_blank"
            aria-label="Email"
            className="flex size-6 items-center justify-center text-white transition-colors duration-200 hover:text-white/60 active:text-white/40"
          >
            <span className="flex size-4 items-center justify-center">
              <ContactGlyph name="mail" />
            </span>
          </a>
          <a
            href={author.linkedIn}
            target="_blank"
            aria-label="LinkedIn"
            className="flex size-6 items-center justify-center text-white transition-colors duration-200 hover:text-white/60 active:text-white/40"
          >
            <span className="flex size-4 items-center justify-center">
              <ContactGlyph name="linkedin" />
            </span>
          </a>
          <a
            href={author.github}
            target="_blank"
            aria-label="GitHub"
            className="flex size-6 items-center justify-center text-white transition-colors duration-200 hover:text-white/60 active:text-white/40"
          >
            <span className="flex size-4 items-center justify-center">
              <ContactGlyph name="github" />
            </span>
          </a>
        </div>
      </div>
    </>
  );
}
