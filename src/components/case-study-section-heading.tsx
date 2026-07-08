export function CaseStudySectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex w-full flex-col items-start">
      <p className="w-full text-overline text-white/70">{eyebrow}</p>
      <p className="w-full text-heading-h5 text-white md:text-heading-h3">
        {title}
      </p>
    </div>
  );
}
