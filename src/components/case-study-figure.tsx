import Image from "next/image";

export function CaseStudyFigure({
  src,
  caption,
  aspect = "2880/1800",
  aspectClassName,
  captionClassName = "text-white/70",
  gapClassName = "gap-2",
  roundedClassName = "rounded-xl",
}: {
  src: string;
  caption: string;
  aspect?: string;
  aspectClassName?: string;
  captionClassName?: string;
  gapClassName?: string;
  roundedClassName?: string;
}) {
  return (
    <div className={`flex w-full flex-col items-start ${gapClassName}`}>
      <div
        className={`relative w-full overflow-hidden ${roundedClassName} ${aspectClassName ?? ""}`}
        style={
          aspectClassName
            ? undefined
            : { aspectRatio: aspect.replace("/", " / ") }
        }
      >
        <Image src={src} alt="" fill className="object-cover" sizes="100vw" />
      </div>
      <p className={`w-full text-center text-body-h3 ${captionClassName}`}>
        {caption}
      </p>
    </div>
  );
}
