import Link from "next/link";
import { ContactGlyph } from "@/components/contact-glyph";
import { ToolIcon } from "@/components/tool-icon";
import { author } from "@/lib/site";

const navLinkStyles = "font-mono text-body-h3 transition-colors duration-200";
const contactLinkStyles =
  "inline-flex items-center gap-2 font-mono text-body-h3 text-white transition-colors duration-200 hover:text-white/60 active:text-white/40";

/**
 * Homepage-only (`/` is its only caller) persistent left column at `md` and
 * up — mobile gets its own top bar + inline hero instead (see
 * `MobileTopBar` and `page.tsx`), so this component is `hidden md:flex` at
 * the call site rather than stacking full-width below `md` the way it used
 * to. That's a real behavior change from this branch's previous 3-tier
 * stack-then-sidebar layout: the new Figma tablet frame already shows the
 * sidebar as a fixed side column, not a stacked block, so the cutover now
 * happens at `md` instead of `lg`.
 *
 * Every piece of text in here is mono per this iteration's system-wide
 * change (prose included, not just labels/nav — see DESIGN.md's Typography
 * section). `w-80` (320px) matches the Figma sidebar's literal width,
 * unlike the previous `lg:w-72` (288px), which was tuned against an older,
 * narrower Figma frame that's no longer the source of truth.
 */
export function HomeSidebar({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex animate-fade-up flex-col gap-10 border border-stroke-dark p-8 ${className}`}
    >
      <div className="flex flex-col gap-2">
        <p className="font-mono text-body-h1 font-bold text-white">Analdo Gomez</p>
        <p className="font-mono text-body-h3 font-normal text-white/70">
          Senior Product Designer
        </p>
      </div>

      <h1 className="w-full text-pretty font-mono text-body-h2 text-white">
        Over a decade solving complex B2B problems with design systems built
        to ship straight to code, and clearer paths to better outcomes.
      </h1>

      {/*
        Plain inline text flow (not flex/flex-wrap items) so the browser's
        normal line-breaking can wrap at any word boundary, including inside
        the leading clause — see the equivalent note on `main`'s homepage
        hero for why a flex-row-of-chunks structure strands short trailing
        words instead.
      */}
      <p className="w-full text-balance font-mono text-body-h2 text-white/70">
        Based in Colombia, working globally with{" "}
        <span className="inline-flex items-center gap-1 align-middle">
          <span aria-hidden="true" className="flex size-3 shrink-0 items-center justify-center">
            <ToolIcon name="figma" />
          </span>
          Figma
        </span>
        ,{" "}
        <span className="inline-flex items-center gap-1 align-middle">
          <span aria-hidden="true" className="flex size-3 shrink-0 items-center justify-center">
            <ToolIcon name="claude" />
          </span>
          Claude Code
        </span>{" "}
        and{" "}
        <span className="inline-flex items-center gap-1 align-middle">
          <span aria-hidden="true" className="flex size-3 shrink-0 items-center justify-center">
            <ToolIcon name="codex" />
          </span>
          Codex
        </span>
      </p>

      {/*
        "/ Works" always renders active (bold, full white) since this
        component only ever mounts on "/" — no usePathname/client-component
        conversion needed. It duplicates the identity lockup's destination
        the same deliberate way `main`'s SiteHeader "Home" link duplicates
        its own lockup. "Works" isn't a real route; it names the homepage's
        role as the work index, matching the Figma copy literally.
      */}
      <nav aria-label="Primary" className="flex flex-col gap-4">
        <Link href="/" className={`${navLinkStyles} font-bold text-white`}>
          / Works
        </Link>
        <Link
          href="/about"
          className={`${navLinkStyles} font-normal text-white/70 hover:text-white active:text-white/50`}
        >
          / Resume
        </Link>
      </nav>

      <div className="flex flex-col gap-4">
        <a href={`mailto:${author.email}`} target="_blank" className={contactLinkStyles}>
          <span aria-hidden="true" className="flex size-4 shrink-0 items-center justify-center">
            <ContactGlyph name="mail" />
          </span>
          Contact me
        </a>
        <a href={author.linkedIn} target="_blank" className={contactLinkStyles}>
          <span aria-hidden="true" className="flex size-4 shrink-0 items-center justify-center">
            <ContactGlyph name="linkedin" />
          </span>
          LinkedIn
        </a>
        <a href={author.github} target="_blank" className={contactLinkStyles}>
          <span aria-hidden="true" className="flex size-4 shrink-0 items-center justify-center">
            <ContactGlyph name="github" />
          </span>
          GitHub
        </a>
      </div>

      {/*
        Figma specs 12px here, but that's under the site's established 14px
        minimum readable size (see DESIGN.md's Typography rules) — bumped to
        text-body-h3 (14px) rather than copied literally.
      */}
      <p className="font-mono text-body-h3 text-white/70">© Analdo Gomez / 2026</p>
    </div>
  );
}
