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
      className="flex w-full flex-col gap-4 md:flex-row md:items-start md:gap-16"
    >
      <div className="relative h-[220px] w-full overflow-hidden rounded-token md:h-[315px] md:flex-1 md:min-w-0">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>
      <div className="flex w-full flex-col gap-2 md:flex-1 md:min-w-0">
        <p className="text-heading-h5 text-white">{title}</p>
        <p className="text-body-h1 text-white/70">{description}</p>
      </div>
    </Link>
  );
}
