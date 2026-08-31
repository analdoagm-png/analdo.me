/**
 * Section eyebrow + heading. Figma's editorial frame originally specified
 * a 24px medium-weight eyebrow here (`text-overline`); a typography pass
 * that aligned every case study's prose to `/about`'s system replaced it
 * with `/about`'s own small uppercase-tracked mono label instead — the
 * same style `CaseStudyProjectHeader`'s ROLE/TOOLS/YEAR row and every
 * section eyebrow on `/about` already use ("Experience", "Skills"). This
 * makes the eyebrow style consistent across every page on the system
 * rather than editorial pages using one size and everything else another.
 *
 * `number` is optional and off by default — plain "EYEBROW" text, unchanged
 * for every existing caller (About, Forty5Park). The six-part case study
 * format (GoRight, Arrowhead Transit) passes it to render "01" ahead of the
 * label in a muted `text-white/42` tabular-nums style, since that format is
 * a genuine chronological walkthrough and the number encodes real sequence
 * — not a decorative marker on a page whose sections aren't ordered that
 * way.
 */
export function CaseStudySectionHeading({
  number,
  eyebrow,
  title,
}: {
  number?: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex w-full max-w-[720px] animate-fade-up flex-col items-start">
      <p className="flex w-full items-baseline gap-3 font-mono text-body-h3 text-white/70 uppercase tracking-[0.05em]">
        {number ? (
          <span className="text-white/42 tabular-nums" aria-hidden="true">
            {number}
          </span>
        ) : null}
        {eyebrow}
      </p>
      <h2 className="w-full text-balance font-mono text-heading-h3 font-bold text-white">
        {title}
      </h2>
    </div>
  );
}
