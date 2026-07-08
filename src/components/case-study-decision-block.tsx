import { CaseStudyFigure } from "@/components/case-study-figure";

export function CaseStudyDecisionBlock({
  label,
  title,
  description,
  figureSrc,
  figureCaption,
  figureAspect,
  figureAspectClassName,
  reverseOnDesktop = false,
}: {
  label: string;
  title: string;
  description: string;
  figureSrc: string;
  figureCaption: string;
  figureAspect?: string;
  figureAspectClassName?: string;
  reverseOnDesktop?: boolean;
}) {
  return (
    <div
      className={`flex w-full flex-col items-start gap-6 md:gap-16 lg:items-start lg:gap-12 ${
        reverseOnDesktop ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      <div className="flex w-full flex-col items-start gap-2 lg:w-[400px] lg:shrink-0">
        <p className="text-body-h3 text-white">{label}</p>
        <p className="w-full text-heading-h5 text-white">{title}</p>
        <p className="w-full text-body-h2 text-white/70">{description}</p>
      </div>
      <div className="w-full lg:flex-1 lg:min-w-0">
        <CaseStudyFigure
          src={figureSrc}
          caption={figureCaption}
          aspect={figureAspect}
          aspectClassName={figureAspectClassName}
          captionClassName="text-white/70 lg:text-white"
        />
      </div>
    </div>
  );
}
