import { CaseStudyFigure } from "@/components/case-study-figure";

export function CaseStudyDecisionBlock({
  label,
  title,
  description,
  figureSrc,
  figureCaption,
  figureAspect,
  figureAspectClassName,
  figureRoundedClassName,
  reverseOnDesktop = false,
  mdGapClassName = "md:gap-16",
  figureCaptionHiddenAtDesktop = false,
}: {
  label: string;
  title: string;
  description: string;
  figureSrc: string;
  figureCaption: string;
  figureAspect?: string;
  figureAspectClassName?: string;
  figureRoundedClassName?: string;
  reverseOnDesktop?: boolean;
  mdGapClassName?: string;
  figureCaptionHiddenAtDesktop?: boolean;
}) {
  return (
    <div
      className={`flex w-full flex-col items-start gap-6 lg:items-start lg:gap-12 ${mdGapClassName} ${
        reverseOnDesktop ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      <div className="flex w-full flex-col items-start gap-2 animate-fade-up lg:w-[400px] lg:shrink-0">
        <p className="text-body-h3 text-white">{label}</p>
        <h3 className="w-full text-balance text-heading-h5 text-white">
          {title}
        </h3>
        <p className="w-full text-pretty text-body-h2 text-white/70">
          {description}
        </p>
      </div>
      <div className="w-full lg:flex-1 lg:min-w-0">
        <CaseStudyFigure
          src={figureSrc}
          caption={figureCaption}
          aspect={figureAspect}
          aspectClassName={figureAspectClassName}
          roundedClassName={figureRoundedClassName}
          captionClassName={`text-white/70 lg:text-white${figureCaptionHiddenAtDesktop ? " lg:hidden" : ""}`}
        />
      </div>
    </div>
  );
}
