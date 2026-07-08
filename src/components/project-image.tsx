import Image from "next/image";

export function ProjectImage({ src }: { src: string }) {
  return (
    <div className="relative aspect-[2880/1800] w-full overflow-hidden rounded-lg">
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
