import Image from "next/image";

export function ProjectImage({
  src,
  aspect = "2880/1800",
  aspectClassName,
  roundedClassName = "rounded-lg",
}: {
  src: string;
  aspect?: string;
  aspectClassName?: string;
  roundedClassName?: string;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden ${roundedClassName} ${aspectClassName ?? ""}`}
      style={
        aspectClassName
          ? undefined
          : { aspectRatio: aspect.replace("/", " / ") }
      }
    >
      <Image
        src={src}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
    </div>
  );
}
