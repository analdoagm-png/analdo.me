import Image from "next/image";

/**
 * `rounded-token` (not `rounded-none`) and `max-w-[1280px] w-full` on the
 * root, matching every other image on this system — see `CaseStudyFigure`.
 */
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
    <div className="flex w-full max-w-[1280px] flex-col items-start gap-6 md:flex-row md:gap-6 lg:gap-16">
      {[
        { src: srcA, alt: altA },
        { src: srcB, alt: altB },
      ].map(({ src, alt }, index) => (
        <div
          key={src}
          className="relative h-[240px] w-full animate-fade-up overflow-hidden rounded-token bg-stroke-dark md:h-[400px] md:flex-1 md:min-w-0 lg:h-[683.688px]"
          style={{ animationDelay: `${index * 80}ms` }}
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
