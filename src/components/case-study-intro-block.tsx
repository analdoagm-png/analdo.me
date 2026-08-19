/**
 * Two-column intro row: a short lead statement beside a longer paragraph.
 * Used directly under the title on the showcase case studies.
 */
export function CaseStudyIntroBlock({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <div className="flex w-full flex-col items-start gap-6 animate-fade-up [animation-delay:100ms] md:flex-row md:gap-20">
      <p className="text-pretty text-body-h2 text-white md:flex-1">{label}</p>
      <p className="text-pretty text-body-h1 text-white/70 md:flex-1">
        {description}
      </p>
    </div>
  );
}
