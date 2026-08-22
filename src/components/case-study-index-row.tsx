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
 * One row of the homepage's editorial index — a text-forward alternative to
 * `CaseStudyCard`'s full image grid, so all five projects can read as one
 * scannable list instead of a few large cards. The thumbnail reuses
 * `CaseStudyNext`'s flush, unrounded idiom (just smaller) rather than
 * inventing a new image treatment: still the sitewide `outline` for depth,
 * still no padding or rounding.
 *
 * The whole row is a single `Link`, like `CaseStudyCard` and `CaseStudyNext`.
 * Unlike those, hover here adds a faint full-row background tint on top of
 * the existing image-zoom and arrow-slide idioms — a list row needs its own
 * "this is clickable" cue since, unlike a card, it has no resting ring or
 * shadow to catch the eye.
 */
export function CaseStudyIndexRow({
  index,
  href,
  image,
  title,
  description,
  chips,
  priority = false,
  style,
}: {
  index: number;
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
      className="group flex w-full animate-fade-up items-center gap-4 py-5 transition-colors duration-200 hover:bg-white/[0.03] md:gap-6 md:py-6 lg:gap-8"
    >
      <span
        aria-hidden="true"
        className="hidden shrink-0 font-mono text-body-h3 text-white/40 sm:block"
      >
        {String(index).padStart(2, "0")}
      </span>

      <span className="relative h-16 w-24 shrink-0 overflow-hidden outline outline-1 -outline-offset-1 outline-white/10 md:h-20 md:w-28 lg:h-24 lg:w-32">
        {/*
          Decorative: the link already contains the title and description, so
          real alt text here would make the accessible name say the project
          name three times. Same reasoning as CaseStudyCard and CaseStudyNext.
        */}
        <Image
          src={image}
          alt=""
          aria-hidden="true"
          fill
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(min-width: 1024px) 128px, (min-width: 768px) 112px, 96px"
        />
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-1.5 md:gap-2">
        <span className="flex items-center gap-2.5">
          <h3 className="truncate text-balance text-heading-h5 text-white">
            {title}
          </h3>
          <span
            className="hidden shrink-0 -translate-x-1 text-white/80 opacity-0 transition-[opacity,translate] duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100 md:inline-flex"
            aria-hidden="true"
          >
            <ArrowForwardIcon />
          </span>
        </span>
        <p className="line-clamp-1 text-pretty text-body-h2 text-white/68 md:line-clamp-2">
          {description}
        </p>
        <span className="hidden flex-wrap items-center gap-2 pt-1 md:flex">
          {chips.map((chip) => (
            <Chip key={chip} label={chip} size="sm" />
          ))}
        </span>
      </span>
    </Link>
  );
}
