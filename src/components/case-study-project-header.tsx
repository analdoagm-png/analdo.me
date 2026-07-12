export function CaseStudyProjectHeader({
  title,
  subtitle,
  role,
  tools,
  intro,
}: {
  title: string;
  subtitle: string;
  role: string;
  tools: string;
  intro: string;
}) {
  return (
    <div className="flex w-full flex-col items-start gap-6">
      <div className="flex w-full flex-col items-start">
        <h1 className="w-full text-heading-h3 text-white md:text-heading-h1">
          {title}
        </h1>
        <p className="w-full text-overline text-white/70 md:text-project-subtitle">
          {subtitle}
        </p>
      </div>

      <div className="flex w-full flex-col items-start gap-4 md:flex-row md:gap-12">
        <div className="flex flex-col items-start">
          <p className="text-body-h3 text-white/70">ROLE</p>
          <p className="text-body-h2 text-white">{role}</p>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-body-h3 text-white/70">TOOLS</p>
          <p className="text-body-h2 text-white">{tools}</p>
        </div>
      </div>

      <p className="w-full text-body-h2 text-white md:text-body-h1 lg:max-w-[720px]">
        {intro}
      </p>
    </div>
  );
}
