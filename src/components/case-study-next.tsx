import Image from "next/image";
import Link from "next/link";
import { getNextCaseStudy } from "@/lib/case-studies";

function ArrowForwardIcon() {
  return (
    <svg
      width="20"
      height="20"
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
 * Onward link at the foot of every case study. Wraps around the list, so each
 * page passes crawl equity to the next instead of dead-ending at the footer.
 *
 * Deliberate exception to the site's standard left/right page padding: the
 * thumbnail bleeds flush to the max-w-[1280px] container's own right edge, so
 * only the text side carries the responsive `pl-*` inset. This is the one
 * place on the site an image isn't padded and rounded — see DESIGN.md.
 */
export function CaseStudyNext({ currentHref }: { currentHref: string }) {
  const next = getNextCaseStudy(currentHref);

  return (
    <nav
      aria-label="Next case study"
      className="w-full border-t border-stroke-dark"
    >
      <div className="mx-auto w-full max-w-[1280px]">
        <Link
          href={next.href}
          className="group flex w-full items-stretch gap-6 transition-opacity duration-200 hover:opacity-70 active:opacity-50 lg:gap-10"
        >
          <span className="flex min-h-28 flex-1 flex-col justify-center gap-2 py-10 pl-6 md:min-h-32 md:py-12 md:pl-10 lg:min-h-40 lg:pl-16">
            <span className="font-mono text-body-h3 text-white/70">
              Next case study
            </span>
            <span className="flex items-center gap-2.5">
              <span className="text-balance text-heading-h4 text-white">
                {next.title}
              </span>
              <span
                className="inline-flex -translate-x-1 text-white/80 opacity-0 transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:opacity-100"
                aria-hidden="true"
              >
                <ArrowForwardIcon />
              </span>
            </span>
          </span>
          <span className="relative w-2/5 shrink-0 overflow-hidden md:w-72 lg:w-80">
            <Image
              src={next.image}
              alt=""
              aria-hidden="true"
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(min-width: 1024px) 320px, (min-width: 768px) 288px, 40vw"
            />
          </span>
        </Link>
      </div>
    </nav>
  );
}
