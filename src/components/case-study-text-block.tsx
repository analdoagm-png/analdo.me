export function CaseStudyIntroBlock({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <div className="flex w-full flex-col items-start gap-6 md:flex-row md:gap-20">
      <p className="text-body-h2 text-white md:w-[480px] md:shrink-0">
        {label}
      </p>
      <p className="text-body-h1 text-white/70 md:flex-1">{description}</p>
    </div>
  );
}

export function CaseStudySectionBlock({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex w-full flex-col items-start gap-6 md:flex-row md:gap-20">
      <p className="text-heading-h4 text-white md:flex-1">{title}</p>
      <p className="text-body-h1 text-white/70 md:flex-1">{description}</p>
    </div>
  );
}
