/**
 * Label + title + description for one "Decision"/"Constraint" block.
 * Text-only now — the old version paired this with a `CaseStudyFigure`
 * inline, side-by-side at `lg` (`reverseOnDesktop` flipping which side).
 * Figma's actual structure (node 339:801/339:805 for the first decision,
 * repeated per decision) is simpler: this text block, then a full-width
 * `CaseStudyFigure` stacked directly below it as its own sibling — no
 * side-by-side layout at any breakpoint. Callers render the figure
 * themselves right after this component instead of passing figure props
 * into it.
 */
export function CaseStudyDecisionBlock({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex w-full max-w-[720px] animate-fade-up flex-col items-start gap-2">
      <p className="font-mono text-body-h3 text-white">{label}</p>
      <h3 className="w-full text-balance font-mono text-heading-h5 font-bold text-white">
        {title}
      </h3>
      <p className="w-full text-pretty font-mono text-body-h2 text-white/70">
        {description}
      </p>
    </div>
  );
}
