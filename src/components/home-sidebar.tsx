import Link from "next/link";
import { SocialIcon } from "@/components/social-icon";
import { ToolIcon } from "@/components/tool-icon";
import { author } from "@/lib/site";

const linkStyles =
  "text-white transition-colors duration-200 hover:text-white/60 active:text-white/40";

/**
 * Homepage-only identity block: name/role lockup, the site's descriptive h1,
 * the "based in / working with" line, a Resume link, social icons, and the
 * copyright — restyled to the redesign's narrow sidebar column. Icons and the
 * Resume link are hidden below `md`; on mobile that same content lives in the
 * separate top bar in `page.tsx` instead, so it isn't duplicated in the DOM.
 */
export function HomeSidebar({ className = "" }: { className?: string }) {
  return (
    <div className={`flex animate-fade-up flex-col items-start gap-6 ${className}`}>
      <div className="flex flex-col items-start">
        <p className="text-heading-h4 text-white">Analdo Gomez</p>
        <p className="text-heading-h5 text-white/70">Senior Product Designer</p>
      </div>

      <h1 className="w-full text-pretty text-body-h1 text-white">
        Over a decade solving complex B2B problems with design systems built
        to ship straight to code, and clearer paths to better outcomes.
      </h1>

      {/*
        Plain inline text flow (not flex/flex-wrap items) so the browser's
        normal line-breaking can wrap at any word boundary, including inside
        the leading clause. flex-wrap items would each occupy a whole flex
        line, so once "...working globally with" alone was wider than the
        sidebar column, "with" got stranded on its own line before the tool
        list started on a third. text-balance then evens out the two
        resulting lines instead of leaving a short trailing line.
      */}
      <p className="w-full text-balance text-body-h3 text-white/70">
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

      <Link href="/about" className={`hidden text-body-h3 md:inline-block ${linkStyles}`}>
        Resume
      </Link>

      <div className="hidden items-center gap-4 md:flex">
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
