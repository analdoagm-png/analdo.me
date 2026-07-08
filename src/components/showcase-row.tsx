import Image from "next/image";
import Link from "next/link";

export function ShowcaseRow({
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
      className="flex w-full flex-col items-start gap-4 md:flex-row md:gap-8 lg:gap-16"
    >
      <div className="relative h-[180px] w-full overflow-hidden rounded-token md:h-[200px] md:w-[320px] md:flex-none lg:h-[315px] lg:w-auto lg:flex-1 lg:min-w-0">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, (min-width: 768px) 320px, 100vw"
        />
      </div>
      <div className="flex w-full flex-col gap-2 md:flex-1 md:min-w-0 md:justify-center lg:justify-start">
        <p className="text-heading-h5 text-white">{title}</p>
        <p className="text-body-h1 text-white/70">{description}</p>
      </div>
    </Link>
  );
}
