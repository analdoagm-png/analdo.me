import { CaseStudyYear } from "@/components/case-study-year";

/**
 * Title + ROLE/TOOLS/YEAR meta row + intro statement, matching Figma's
 * editorial `case-study-desktop` frame (node 339:596) exactly — including
 * dropping the project subtitle ("Merlin Platform", "Intranet") the old
 * version rendered under the title, which Figma's title node has no
 * equivalent for.
 *
 * `max-w-[720px] w-full`, matching every other text block on this system —
 * the parent page's `items-center` column centers it once there's more
 * room than that.
 */
export function CaseStudyProjectHeader({
  title,
  role,
  tools,
  year,
  intro,
}: {
  title: string;
  role: string;
  tools: string;
  year: number;
  intro: string;
}) {
  return (
    <div className="flex w-full max-w-[720px] animate-fade-up flex-col items-start gap-6">
      <h1 className="w-full text-balance font-mono text-heading-h3 font-bold text-white md:text-heading-h1">
        {title}
      </h1>

      <div className="flex w-full flex-col items-start gap-4 md:flex-row md:gap-12">
        <div className="flex flex-col items-start">
          <p className="font-mono text-body-h3 text-white/70 uppercase tracking-[0.05em]">
            Role
          </p>
          <p className="font-mono text-body-h2 text-white">{role}</p>
        </div>
        <div className="flex flex-col items-start">
          <p className="font-mono text-body-h3 text-white/70 uppercase tracking-[0.05em]">
            Tools
          </p>
          <p className="font-mono text-body-h2 text-white">{tools}</p>
        </div>
        <CaseStudyYear year={year} />
      </div>

      {/*
        leading-[1.5]: text-heading-h5's own 1.4 line-height sits exactly
        at (not above) the floor for text that wraps 3+ lines — this intro
        routinely does on mobile at bold weight. A typography audit flagged
        the zero headroom; bumping to 1.5 here matches the rest of this
        page's body copy without touching text-heading-h5's own (mostly
        short, non-wrapping) uses elsewhere.
      */}
      <p className="w-full text-pretty font-mono text-heading-h5 font-bold leading-[1.5] text-white">
        {intro}
      </p>
    </div>
  );
}
