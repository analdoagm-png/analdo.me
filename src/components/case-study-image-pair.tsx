import Image from "next/image";

export function CaseStudyImagePair({
  srcA,
  altA,
  srcB,
  altB,
}: {
  srcA: string;
  altA: string;
  srcB: string;
  altB: string;
}) {
  return (
    <div className="flex w-full flex-col items-start gap-6 md:flex-row md:gap-6 lg:gap-16">
      {[
        { src: srcA, alt: altA },
        { src: srcB, alt: altB },
      ].map(({ src, alt }) => (
        <div
          key={src}
          className="relative h-[240px] w-full overflow-hidden rounded-lg bg-stroke-dark md:h-[400px] md:flex-1 md:min-w-0 lg:h-[683.688px]"
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      ))}
    </div>
  );
}
