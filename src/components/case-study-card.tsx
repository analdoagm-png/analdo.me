import Image from "next/image";
import Link from "next/link";
import { Chip } from "@/components/chip";

export function CaseStudyCard({
  href,
  image,
  title,
  description,
  chips,
  priority = false,
}: {
  href: string;
  image: string;
  title: string;
  description: string;
  chips: string[];
  priority?: boolean;
}) {
  return (
    <Link
      href={href}
      className="group flex w-full flex-col gap-6 rounded-token-xl border border-stroke-dark bg-dark-primary p-2"
    >
      <div className="relative h-[220px] w-full overflow-hidden rounded-token md:h-[240px] lg:h-[280px]">
        <Image
          src={image}
          alt={`${title} project thumbnail`}
          fill
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
      <div className="flex w-full flex-col gap-4 px-4 pb-4">
        <h3 className="text-heading-h5 text-white md:text-heading-h4">
          {title}
        </h3>
        <p className="text-body-h2 text-white/70 md:text-body-h1">
          {description}
        </p>
        <div className="flex flex-wrap items-start gap-2">
          {chips.map((chip) => (
            <Chip key={chip} label={chip} />
          ))}
        </div>
      </div>
    </Link>
  );
}
