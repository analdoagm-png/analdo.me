import Image from "next/image";

export function CaseStudyFigure({
  src,
  alt,
  caption,
  aspect = "2880/1800",
  aspectClassName,
  captionClassName = "text-white/70",
  gapClassName = "gap-2",
  roundedClassName = "rounded-xl",
  priority = false,
}: {
  src: string;
  alt?: string;
  caption: string;
  aspect?: string;
  aspectClassName?: string;
  captionClassName?: string;
  gapClassName?: string;
  roundedClassName?: string;
  priority?: boolean;
}) {
  return (
    <div className={`flex w-full flex-col items-start ${gapClassName}`}>
      <div
        className={`relative w-full overflow-hidden bg-stroke-dark ${roundedClassName} ${aspectClassName ?? ""}`}
        style={
          aspectClassName
            ? undefined
            : { aspectRatio: aspect.replace("/", " / ") }
        }
      >
        <Image
          src={src}
          alt={alt ?? caption}
          fill
          className="object-cover"
          sizes="(min-width: 1280px) 1280px, 100vw"
          priority={priority}
        />
      </div>
      <p className={`w-full text-center text-body-h3 ${captionClassName}`}>
        {caption}
      </p>
    </div>
  );
}
