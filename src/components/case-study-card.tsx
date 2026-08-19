import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Chip } from "@/components/chip";

function ArrowForwardIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M4 11v2h12l-5.5 5.5 1.42 1.42L19.84 12l-7.92-7.92L10.5 5.5 16 11H4z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Below `md` the card is full-bleed per the mobile design: no padding frame
 * and no resting ring, so the image runs edge to edge and the card reads as a
 * section of the page rather than a floating surface. The padded, ringed card
 * (and its hover lift) returns at `md` and up. The image keeps its own 1px
 * outline at every breakpoint.
 */
export function CaseStudyCard({
  href,
  image,
  title,
  description,
  chips,
  priority = false,
  style,
}: {
  href: string;
  image: string;
  title: string;
  description: string;
  chips: string[];
  priority?: boolean;
  style?: CSSProperties;
}) {
  return (
    <Link
      href={href}
      style={style}
      className="group flex w-full flex-col gap-6 rounded-token-xl bg-dark-primary animate-fade-up transition-[scale,box-shadow] duration-200 ease-out active:scale-[0.99] md:p-2 md:shadow-[0_0_0_1px_oklch(1_0_0/0.08)] md:hover:shadow-[0_0_0_1px_oklch(1_0_0/0.13),0_8px_24px_oklch(0_0_0/0.35)]"
    >
      <div className="relative h-[220px] w-full overflow-hidden rounded-none outline outline-1 -outline-offset-1 outline-white/10 md:h-[240px] lg:h-[280px]">
        <Image
          src={image}
          alt={`${title} project thumbnail`}
          fill
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
      <div className="flex w-full flex-col gap-3 px-6 pb-5 md:px-5">
        <div className="flex items-center gap-2.5">
          <h3 className="text-balance text-heading-h5 text-white md:text-heading-h4">
            {title}
          </h3>
          <span
            className="inline-flex -translate-x-1 text-white/80 opacity-0 transition-[opacity,translate] duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100"
            aria-hidden="true"
          >
            <ArrowForwardIcon />
          </span>
        </div>
        <p className="text-pretty text-body-h2 text-white/68">
          {description}
        </p>
        <div className="flex flex-wrap items-start gap-2 pt-1">
          {chips.map((chip) => (
            <Chip key={chip} label={chip} />
          ))}
        </div>
      </div>
    </Link>
  );
}
