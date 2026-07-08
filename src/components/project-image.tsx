import Image from "next/image";

export function ProjectImage({
  src,
  aspect = "2880/1800",
}: {
  src: string;
  aspect?: string;
}) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-lg"
      style={{ aspectRatio: aspect.replace("/", " / ") }}
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
