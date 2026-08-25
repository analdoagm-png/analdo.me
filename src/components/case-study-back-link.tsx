import Link from "next/link";

function ArrowBackIcon() {
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
        d="M20 11v2H8l5.5 5.5-1.42 1.42L4.16 12l7.92-7.92L13.5 5.5 8 11h12z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Fixed "back to the portfolio grid" affordance for case study pages,
 * `md`+ only — below `md` the sidebar is hidden anyway (`MobileTopBar`'s
 * own menu already has a "Home" link), so a second fixed control in the
 * same top-left corner would just duplicate it and risk overlapping the
 * mobile top bar. Card treatment (`rounded-token`, `bg-dark-primary`, same
 * `shadow-[0_0_0_1px_rgba(255,255,255,0.08)]` ring) matches `MobileTopBar`
 * and `CaseStudyCard`'s own resting state, so it reads as the same design
 * language rather than a one-off control.
 *
 * Position: `top-8` matches `HomeSidebar`'s own `p-8` internal padding, so
 * this sits at the same height as the sidebar's "Analdo Gomez" name at
 * every breakpoint (that padding isn't responsive, so neither is this).
 * `left-[368px]`/`lg:left-[384px]` matches every case study's own content
 * offset (`md:pl-[368px] lg:pl-[384px]` — 320px sidebar + that tier's
 * gutter), so its left edge lines up with where the content column itself
 * begins.
 *
 * `fixed`, not `sticky` or inline: stays reachable while scrolling a case
 * study of any length, the same reasoning `HomeSidebar` and `MobileTopBar`
 * already use for their own persistent positioning.
 */
export function CaseStudyBackLink() {
  return (
    <Link
      href="/"
      aria-label="Back to portfolio grid"
      className="fixed top-8 left-[368px] z-40 hidden items-center gap-2 rounded-token border border-stroke-dark bg-dark-primary px-4 py-2 font-mono text-body-h3 text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition-[color,box-shadow] duration-200 ease-out hover:text-white/70 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.15)] active:text-white/50 md:flex lg:left-[384px]"
    >
      <ArrowBackIcon />
      Back
    </Link>
  );
}
