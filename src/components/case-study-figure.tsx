import Image from "next/image";

/**
 * `roundedClassName` now defaults to `rounded-token` (was `rounded-none`) —
 * Figma's figure images round to match chips/cards under this system, only
 * text/border surfaces (callouts, results boxes) stay sharp. `max-w-[1280px]
 * w-full` on the root matches every other image on this system, centering
 * within the page's `items-center` column once there's more room than that.
 */
export function CaseStudyFigure({
  src,
  alt,
  caption,
  aspect = "2880/1800",
  aspectClassName,
  captionClassName = "text-white/70",
  gapClassName = "gap-2",
  roundedClassName = "rounded-token",
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
    <div className={`flex w-full max-w-[1280px] flex-col items-start ${gapClassName}`}>
      <div
        className={`relative w-full overflow-hidden bg-stroke-dark ${roundedClassName} ${aspectClassName ?? ""} animate-fade-up ${priority ? "[animation-delay:200ms]" : ""}`}
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
      <p className={`w-full text-center font-mono text-body-h3 ${captionClassName}`}>
        {caption}
      </p>
    </div>
  );
}
