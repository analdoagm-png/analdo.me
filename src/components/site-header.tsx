import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";

/**
 * Desktop/tablet bar is `md:` and up only. Below `md`, this renders nothing
 * of its own — `MobileNav` (a client leaf, same pattern as `CaseStudiesDeck`)
 * takes over navigation as a fixed pill + expandable menu, and the identity
 * lockup that used to live in this bar on mobile has moved into the
 * homepage's own hero content instead. The skip-link stays unconditional so
 * keyboard/screen-reader users keep it at every breakpoint.
 */
export function SiteHeader() {
  return (
    <>
      <a
        href="#main-content"
        className="skip-link rounded-token border border-stroke-dark bg-dark-primary px-4 py-2 text-body-h2 text-white"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-50 hidden w-full border-b border-stroke-dark bg-dark-primary md:block">
        <nav
          aria-label="Primary"
          className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-10 py-4 lg:px-16"
        >
          {/*
            The name is two-tone, so its spans would override a parent text-colour
            change. It dims with opacity instead to keep the tonal relationship.
          */}
          <Link
            href="/"
            className="flex items-baseline gap-1.5 text-body-h2 transition-opacity duration-200 hover:opacity-60 active:opacity-40"
          >
            <span className="text-white">Analdo Gomez</span>
            <span className="text-white/70">/</span>
            <span className="text-white/70">Senior Product Designer</span>
          </Link>
          <div className="flex shrink-0 items-center gap-6">
            <Link
              href="/"
              className="text-body-h2 text-white transition-colors duration-200 hover:text-white/60 active:text-white/40"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-body-h2 text-white transition-colors duration-200 hover:text-white/60 active:text-white/40"
            >
              Resume
            </Link>
          </div>
        </nav>
      </header>

      <MobileNav />
    </>
  );
}
