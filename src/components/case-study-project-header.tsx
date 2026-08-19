import { CaseStudyYear } from "@/components/case-study-year";
import { CaseStudyMetaLabel } from "@/components/case-study-meta-label";

export function CaseStudyProjectHeader({
  title,
  subtitle,
  role,
  tools,
  year,
  intro,
}: {
  title: string;
  subtitle: string;
  role: string;
  tools: string;
  year: number;
  intro: string;
}) {
  return (
    <div className="flex w-full flex-col items-start gap-6 animate-fade-up">
      <div className="flex w-full flex-col items-start">
        <h1 className="w-full text-balance text-heading-h3 text-white md:text-heading-h1">
          {title}
        </h1>
        <p className="w-full text-overline text-white/70 md:text-project-subtitle">
          {subtitle}
        </p>
      </div>

      <div className="flex w-full flex-col items-start gap-4 md:flex-row md:gap-12">
        <div className="flex flex-col items-start gap-2">
          <CaseStudyMetaLabel>Role</CaseStudyMetaLabel>
          <p className="font-mono text-body-h2 text-white">{role}</p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <CaseStudyMetaLabel>Tools</CaseStudyMetaLabel>
          <p className="font-mono text-body-h2 text-white">{tools}</p>
        </div>
        <CaseStudyYear year={year} />
      </div>

      <p className="w-full text-pretty text-body-h2 text-white md:text-body-h1 lg:max-w-[70ch]">
        {intro}
      </p>
    </div>
  );
}
