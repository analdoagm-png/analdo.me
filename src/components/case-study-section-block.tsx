/**
 * Two-column section row: an h2 beside its supporting paragraph. Same shape
 * as `CaseStudyIntroBlock`, but the left column is a real section heading.
 */
export function CaseStudySectionBlock({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex w-full flex-col items-start gap-6 animate-fade-up md:flex-row md:gap-20">
      <h2 className="text-balance text-heading-h4 text-white md:flex-1">
        {title}
      </h2>
      <p className="text-pretty text-body-h1 text-white/70 md:flex-1">
        {description}
      </p>
    </div>
  );
}
