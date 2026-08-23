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
 * Stacked image-then-content card (replaces the old `md:flex-row`
 * side-by-side layout), matching the new Figma iteration:
 *
 * - Below `md`: no card surface at all — image runs full-bleed and sharp
 *   (`rounded-none`), content sits directly on the page background with
 *   24px horizontal padding. Matches the Figma mobile frame's
 *   `case-study-card` node, which has no background or border of its own.
 * - `md` and up: a `bg-stroke-dark` card surface with 24px padding on every
 *   side, `rounded-token` (4px) on both the card and the image — this
 *   iteration's cards and images round to match chips, reversing the old
 *   sharp-corners-everywhere rule (see DESIGN.md).
 * - Thumbnail is `aspect-video` (16:9), not a fixed pixel height — a fixed
 *   height combined with a fluid card width meant the effective crop ratio
 *   drifted at every breakpoint (much wider/shorter at a 2-up desktop grid
 *   than at a full-bleed mobile card), so the same source image was cropped
 *   very differently depending on viewport. A real aspect ratio keeps that
 *   crop identical everywhere.
 *
 * Every text element is explicit `font-mono` per this iteration's
 * typography change; none of it can rely on inherited family the way body
 * copy normally would, since prose is mono here too, not just labels.
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
      className="group flex w-full animate-fade-up flex-col gap-6 transition-[scale,box-shadow] duration-200 ease-out active:scale-[0.99] md:gap-5 md:rounded-token md:bg-stroke-dark md:p-6 md:shadow-[0_0_0_1px_rgba(255,255,255,0.08)] md:hover:shadow-[0_0_0_1px_rgba(255,255,255,0.15)]"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-none outline outline-1 -outline-offset-1 outline-white/10 md:rounded-token">
        <Image
          src={image}
          alt={`${title} project thumbnail`}
          fill
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
      </div>
      <div className="flex w-full flex-col gap-4 px-6 pb-6 md:px-0 md:pb-0">
        <div className="flex w-full flex-col gap-3">
          <div className="flex items-center gap-2.5">
            <h3 className="text-balance font-mono text-heading-h5 font-bold text-white">
              {title}
            </h3>
            <span
              className="inline-flex -translate-x-1 text-white/80 opacity-0 transition-[opacity,translate] duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100"
              aria-hidden="true"
            >
              <ArrowForwardIcon />
            </span>
          </div>
          <p className="text-pretty font-mono text-body-h2 text-white/70 md:text-body-h3">
            {description}
          </p>
        </div>
        <div className="flex flex-wrap items-start gap-2">
          {chips.map((chip, index) =>
            index === 0 ? (
              // The leading tag is always the "Case Study"/"Showcase" type
              // (see lib/case-studies.ts) — shown below `md` (mobile Figma
              // frame keeps it) and hidden from `md` up (tablet Figma frame
              // drops it). A real per-breakpoint disagreement in the
              // source design, not an oversight.
              <span key={chip} className="md:hidden">
                <Chip label={chip} />
              </span>
            ) : (
              <Chip key={chip} label={chip} />
            ),
          )}
        </div>
      </div>
    </Link>
  );
}
