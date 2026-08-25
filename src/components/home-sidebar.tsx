import Link from "next/link";
import { ContactGlyph } from "@/components/contact-glyph";
import { ToolIcon } from "@/components/tool-icon";
import { author } from "@/lib/site";

const navLinkStyles = "font-mono text-body-h3 transition-colors duration-200";
const contactLinkStyles =
  "inline-flex items-center gap-2 font-mono text-body-h3 text-white transition-colors duration-200 hover:text-white/60 active:text-white/40";

/**
 * Single source of truth for the bio statement text, so `page.tsx`'s mobile
 * duplicate can import it instead of carrying its own hand-copied string
 * that could drift from this one. See the component doc comment below for
 * why this text now also appears in a dedicated `sr-only` heading rather
 * than directly tagging this component's own visible paragraph.
 */
export const bioStatement =
  "Over a decade solving complex B2B problems with design systems built to ship straight to code, and clearer paths to better outcomes.";

/**
 * Persistent left column at `md` and up, shared by the homepage and (as of
 * the Forty5Park pass) case-study pages using the new sidebar system —
 * mobile gets its own top bar + inline hero instead (see `MobileTopBar` and
 * each page's own mobile block).
 *
 * No `.animate-fade-up` on this component, by explicit request: navigation
 * chrome should read as static structure, not content that "loads in" —
 * only the page content inside `{children}` (in `(sidebar-shell)/layout.tsx`)
 * gets an entrance transition. `MobileTopBar` and `MobileFooter` follow the
 * same rule for the same reason (all three are rendered once by the shared
 * layout and never remount on navigation, so this was never about avoiding
 * a repeat-on-navigation glitch — it's a static-chrome-vs-animated-content
 * split, not a de-dup fix).
 *
 * `CaseStudyBackLink` (each case study's own fixed "Back" link) follows
 * this same rule too, even though it isn't hoisted into the shared layout
 * and does remount per case study page: an entrance fade there would
 * replay on every case-study-to-case-study navigation, which is exactly
 * the kind of persistent-chrome flicker the sidebar-shell layout exists to
 * avoid elsewhere.
 *
 * `bioAs` exists for that reuse, but no longer picks the tag on this
 * component's own visible statement paragraph — that stays a plain `<p>`
 * unconditionally now (see below for why). On `/` and `/about`
 * (`bioAs="h1"`), it instead renders one additional `sr-only` `<h1>` as a
 * sibling of the whole sidebar, holding `bioStatement`. Case studies pass
 * `bioAs="p"` and skip that extra heading entirely — their own project
 * title is the real `h1` there.
 *
 * The extra heading exists as its own sibling, outside the sidebar's own
 * `hidden md:flex` root div, specifically so it survives being visually
 * hidden below `md` (a `display: none` element drops out of the
 * accessibility tree, not just the visual layout — an `h1` trapped inside
 * `md:hidden` would mean screen-reader users on narrower viewports see no
 * `h1` on the page at all, and the reverse is equally true for `md:hidden`
 * content past that width). `sr-only` (clip-based hiding) keeps it in both
 * the DOM and the accessibility tree at every breakpoint instead, while
 * staying invisible to sighted users everywhere, matching the same pattern
 * this component's own `/ Works` and `/ Resume` pages use for `sr-only`
 * section headings (see `(sidebar-shell)/page.tsx` and `about/page.tsx`).
 *
 * Before this, `/` and `/about` both shipped **two** real `<h1>` elements
 * in the served HTML at once — one in this component's own statement
 * (rendered as `<h1>` when `bioAs="h1"`), one in each page's separate
 * `md:hidden` mobile duplicate — since Tailwind's `hidden`/`md:hidden`
 * toggle only ever hides one of the two per viewport, never removes either
 * from the DOM. A live audit caught this: verified with `curl` against
 * production, not just source inspection, since responsive Tailwind
 * classes make this exact bug invisible when only rendered.
 *
 * `fixed inset-y-0 left-0` (set at the call site, not here — see `page.tsx`)
 * rather than `sticky`: a true app-shell rail flush to the viewport's top
 * and bottom edges, always in view regardless of scroll position, not a
 * scroll-until-it-hits-the-top sticky column. Because `fixed` takes the
 * sidebar out of the document flow entirely, `page.tsx`'s content column
 * carries its own `md:pl-*` offset (320px sidebar width + the page's own
 * gutter) to keep from sitting underneath it — there's no flex/gap
 * relationship between the two anymore.
 *
 * `overflow-y-auto` guards against a viewport short enough that the
 * sidebar's own content (identity, statement, nav, contact links,
 * copyright) doesn't fit — rather than letting it clip or push past the
 * viewport bottom, which a `fixed` full-height element can't otherwise
 * resolve on its own.
 *
 * Border is `border-r` only, not a full box: flush against the viewport's
 * own top/left/bottom edges, a full border would just double up on top of
 * the viewport frame. `border-r` reads as a structural divider between rail
 * and content, matching how borders are used sitewide (dividers, not card
 * outlines) rather than as a floating panel's own edge.
 *
 * Every piece of text in here is mono per this iteration's system-wide
 * change (prose included, not just labels/nav — see DESIGN.md's Typography
 * section). `w-80` (320px) matches the Figma sidebar's literal width,
 * unlike the previous `lg:w-72` (288px), which was tuned against an older,
 * narrower Figma frame that's no longer the source of truth.
 *
 * `activeNav` marks which nav link reads as current. This component stays a
 * plain server component — `bioAs`/`activeNav` are computed once, from
 * `usePathname`, by `(sidebar-shell)/layout.tsx` (the client component that
 * renders this once for every route) and passed down as props, rather than
 * each page deriving them itself. "works" is the homepage and every case
 * study (a case study is a piece of the work "Works" indexes); "resume" is
 * `/about` only.
 */
export function HomeSidebar({
  className = "",
  bioAs = "h1",
  activeNav = "works",
}: {
  className?: string;
  bioAs?: "h1" | "p";
  activeNav?: "works" | "resume";
}) {
  return (
    <>
      {bioAs === "h1" && <h1 className="sr-only">{bioStatement}</h1>}
      <div
        className={`flex flex-col gap-10 overflow-y-auto border-r border-stroke-dark p-8 ${className}`}
      >
        <div className="flex flex-col gap-2">
          <p className="font-mono text-body-h1 font-bold text-white">Analdo Gomez</p>
          <p className="font-mono text-body-h3 font-normal text-white/70">
            Senior Product Designer
          </p>
        </div>

        <p className="w-full text-pretty font-mono text-body-h2 text-white">
          {bioStatement}
        </p>

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

        <nav aria-label="Primary" className="flex flex-col gap-4">
          <Link
            href="/"
            aria-current={activeNav === "works" ? "page" : undefined}
            className={
              activeNav === "works"
                ? `${navLinkStyles} font-bold text-white`
                : `${navLinkStyles} font-normal text-white/70 hover:text-white active:text-white/50`
            }
          >
            / Works
          </Link>
          <Link
            href="/about"
            aria-current={activeNav === "resume" ? "page" : undefined}
            className={
              activeNav === "resume"
                ? `${navLinkStyles} font-bold text-white`
                : `${navLinkStyles} font-normal text-white/70 hover:text-white active:text-white/50`
            }
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

          mt-auto: pushes this to the bottom of the sidebar's fixed-height
          column instead of sitting immediately under the contact links,
          without touching the flex gap between every other child.
        */}
        <p className="mt-auto font-mono text-body-h3 text-white/70">© Analdo Gomez / 2026</p>
      </div>
    </>
  );
}
