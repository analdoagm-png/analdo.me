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
 */
export function CaseStudyNext({ currentHref }: { currentHref: string }) {
  const next = getNextCaseStudy(currentHref);

  return (
    <nav
      aria-label="Next case study"
      className="w-full border-t border-stroke-dark"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 py-10 md:px-10 md:py-12 lg:px-16">
        <Link
          href={next.href}
          className="group flex flex-col items-start gap-2 transition-opacity duration-200 hover:opacity-70 active:opacity-50"
        >
          <span className="text-body-h3 text-white/70">Next case study</span>
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
        </Link>
      </div>
    </nav>
  );
}
