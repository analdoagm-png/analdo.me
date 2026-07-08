import Image from "next/image";
import Link from "next/link";

export function CaseStudyCard({
  href,
  image,
  title,
  description,
}: {
  href: string;
  image: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="flex w-full flex-col gap-4 md:flex-1 md:min-w-0"
    >
      <div className="relative h-[220px] w-full overflow-hidden rounded-token lg:h-[315px]">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <p className="text-heading-h5 text-white">{title}</p>
        <p className="text-body-h1 text-white/70">{description}</p>
      </div>
    </Link>
  );
}
