/**
 * Section eyebrow + heading. Figma's editorial frame originally specified
 * a 24px medium-weight eyebrow here (`text-overline`); a typography pass
 * that aligned every case study's prose to `/about`'s system replaced it
 * with `/about`'s own small uppercase-tracked mono label instead — the
 * same style `CaseStudyProjectHeader`'s ROLE/TOOLS/YEAR row and every
 * section eyebrow on `/about` already use ("Experience", "Skills"). This
 * makes the eyebrow style consistent across every page on the system
 * rather than editorial pages using one size and everything else another.
 */
export function CaseStudySectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex w-full max-w-[720px] animate-fade-up flex-col items-start">
      <p className="w-full font-mono text-body-h3 text-white/70 uppercase tracking-[0.05em]">
        {eyebrow}
      </p>
      <h2 className="w-full text-balance font-mono text-heading-h3 font-bold text-white">
        {title}
      </h2>
    </div>
  );
}
