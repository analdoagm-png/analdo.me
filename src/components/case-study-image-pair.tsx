import Image from "next/image";

export function CaseStudyImagePair({
  srcA,
  srcB,
}: {
  srcA: string;
  srcB: string;
}) {
  return (
    <div className="flex w-full flex-col items-start gap-6 md:flex-row md:gap-6 lg:gap-16">
      {[srcA, srcB].map((src) => (
        <div
          key={src}
          className="relative h-[240px] w-full overflow-hidden rounded-lg md:h-[400px] md:flex-1 md:min-w-0 lg:h-[683.688px]"
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      ))}
    </div>
  );
}
