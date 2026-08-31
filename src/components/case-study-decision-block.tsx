/**
 * Title + description for one named sub-decision inside a "Project Scope
 * and Design" or "Challenges" section. Text-only — callers render a
 * `CaseStudyFigure` themselves right after this component as its own
 * sibling, not passed in as a prop.
 *
 * Dropped the old "Decision"/"Constraint" eyebrow label as part of the
 * six-part case study format's plainer register (see AGENTS.md's Case
 * Study Patterns section) — that chip read as a taxonomy the reader didn't
 * need; the `h3` title now carries the same information in plain language
 * ("Read-only, except where it mattered" rather than "Decision" + a
 * separate title line). Safe to simplify since GoRight and Arrowhead
 * Transit are this component's only two callers.
 */
export function CaseStudyDecisionBlock({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex w-full max-w-[720px] animate-fade-up flex-col items-start gap-3">
      <h3 className="w-full text-balance font-mono text-heading-h5 font-bold text-white">
        {title}
      </h3>
      <p className="w-full text-pretty font-mono text-body-h2 text-white/70">
        {description}
      </p>
    </div>
  );
}
