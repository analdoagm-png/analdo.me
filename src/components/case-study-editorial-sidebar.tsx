import Link from "next/link";
import { SocialIcon } from "@/components/social-icon";
import { ToolIcon } from "@/components/tool-icon";
import { author } from "@/lib/site";

const linkStyles =
  "text-white transition-colors duration-200 hover:text-white/60 active:text-white/40";

function ArrowBackIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Persistent identity sidebar for the two editorial case studies (GoRight,
 * Arrowhead Transit) — inspired by the homepage's `HomeSidebar` layout
 * (Figma node 268:1037), not a literal port. Desktop-only (`lg`+): below
 * that, `case-studies/*\/page.tsx` renders a compact "Back to portfolio" bar
 * instead, matching `CaseStudyHeader`'s existing mobile/tablet treatment
 * rather than pushing the full bio block above the case study content.
 *
 * Unlike `HomeSidebar`, this is never the page's `h1` source (the case
 * study's own title owns that in `CaseStudyProjectHeader`), so the bio
 * statement here is a plain `<p>`, and the name/role lockup is a real link
 * back to `/` since this page isn't the homepage.
 */
export function EditorialSidebar({ className = "" }: { className?: string }) {
  return (
    <div className={`hidden animate-fade-up flex-col items-start gap-6 lg:flex ${className}`}>
      <Link
        href="/"
        className={`group flex items-center gap-3 ${linkStyles}`}
      >
        <span className="inline-flex transition-transform duration-200 group-hover:-translate-x-0.5 group-active:-translate-x-1">
          <ArrowBackIcon />
        </span>
        <span className="text-body-h3">Back to portfolio</span>
      </Link>

      <Link href="/" className="group flex flex-col items-start">
        <p className="text-heading-h4 text-white transition-colors duration-200 group-hover:text-white/60 group-active:text-white/40">
          Analdo Gomez
        </p>
        <p className="text-heading-h5 text-white/70 transition-colors duration-200 group-hover:text-white/50 group-active:text-white/30">
          Senior Product Designer
        </p>
      </Link>

      <p className="w-full text-pretty text-body-h1 text-white">
        Over a decade solving complex B2B problems with design systems built
        to ship straight to code, and clearer paths to better outcomes.
      </p>

      <div className="flex flex-wrap items-center gap-x-1 gap-y-1 text-body-h3 text-white/70">
        <span>Based in Colombia, working globally with</span>
        <span className="inline-flex items-center gap-1">
          <span
            aria-hidden="true"
            className="flex size-3 shrink-0 items-center justify-center"
          >
            <ToolIcon name="figma" />
          </span>
          Figma
        </span>
        <span>,</span>
        <span className="inline-flex items-center gap-1">
          <span
            aria-hidden="true"
            className="flex size-3 shrink-0 items-center justify-center"
          >
            <ToolIcon name="claude" />
          </span>
          Claude Code
        </span>
        <span>and</span>
        <span className="inline-flex items-center gap-1">
          <span
            aria-hidden="true"
            className="flex size-3 shrink-0 items-center justify-center"
          >
            <ToolIcon name="codex" />
          </span>
          Codex
        </span>
      </div>

      <div className="flex items-center gap-4">
        <a
          href={`mailto:${author.email}`}
          target="_blank"
          aria-label="Email"
          className={linkStyles}
        >
          <span className="flex size-6 items-center justify-center">
            <SocialIcon name="mail" />
          </span>
        </a>
        <a
          href={author.linkedIn}
          target="_blank"
          aria-label="LinkedIn"
          className={linkStyles}
        >
          <span className="flex size-6 items-center justify-center">
            <SocialIcon name="linkedin" />
          </span>
        </a>
        <a
          href={author.github}
          target="_blank"
          aria-label="GitHub"
          className={linkStyles}
        >
          <span className="flex size-6 items-center justify-center">
            <SocialIcon name="github" />
          </span>
        </a>
      </div>

      <p className="text-body-h2 text-white/70">© 2026</p>
    </div>
  );
}

/**
 * Compact "Back to portfolio" bar for below `lg`, where `EditorialSidebar`
 * hides itself rather than stacking its full bio block above the case
 * study's own title — matching `CaseStudyHeader`'s existing mobile/tablet
 * treatment instead of pushing content down on smaller screens.
 */
export function EditorialMobileBar() {
  return (
    <div className="w-full border-b border-stroke-dark px-6 py-4 lg:hidden">
      <Link
        href="/"
        className={`group inline-flex items-center gap-3 ${linkStyles}`}
      >
        <span className="inline-flex transition-transform duration-200 group-hover:-translate-x-0.5 group-active:-translate-x-1">
          <ArrowBackIcon />
        </span>
        <span className="text-body-h3">Back to portfolio</span>
      </Link>
    </div>
  );
}
