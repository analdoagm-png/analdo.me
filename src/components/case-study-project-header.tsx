import { CaseStudyYear } from "@/components/case-study-year";

/**
 * Title + ROLE/TOOLS/YEAR meta row + intro statement, matching Figma's
 * editorial `case-study-desktop` frame (node 339:596) — including dropping
 * the project subtitle ("Merlin Platform", "Intranet") the old version
 * rendered under the title, which Figma's title node has no equivalent for.
 *
 * `max-w-[720px] w-full`, matching every other text block on this system —
 * the parent page's `items-center` column centers it once there's more
 * room than that.
 *
 * The intro paragraph is plain `text-body-h2 text-white/70` — a deliberate
 * departure from Figma's own bold heading-scale treatment here, made as
 * part of a typography pass that aligned every case study's prose to
 * `/about`'s system: that page's own intro sentence (and every paragraph
 * on it) uses this exact quiet, non-bold style regardless of role, and
 * case studies previously stood out as the one place on the site where an
 * intro paragraph got louder treatment than the rest of the page's prose.
 *
 * `intro` is optional as of the six-part case study format (GoRight,
 * Arrowhead Transit): that format opens straight into a numbered "01
 * Overview" section instead, which carries the same scene-setting role
 * this paragraph used to — rendering both would say the same thing twice
 * in a row. The three showcase case studies still pass `intro` and are
 * unaffected.
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
  intro?: string;
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

      {intro ? (
        <p className="w-full text-pretty font-mono text-body-h2 text-white/70">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
