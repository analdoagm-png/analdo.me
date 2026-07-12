import Image from "next/image";

export function ProjectImage({
  src,
  alt,
  aspect = "2880/1800",
  aspectClassName,
  roundedClassName = "rounded-lg",
  priority = false,
}: {
  src: string;
  alt: string;
  aspect?: string;
  aspectClassName?: string;
  roundedClassName?: string;
  priority?: boolean;
}) {
  return (
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
        alt={alt}
        fill
        className="object-cover"
        sizes="(min-width: 1280px) 1280px, 100vw"
        priority={priority}
      />
    </div>
  );
}
