import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-stroke-dark bg-dark-primary">
      <a
        href="#main-content"
        className="skip-link rounded-token border border-stroke-dark bg-dark-primary px-4 py-2 text-body-h2 text-white"
      >
        Skip to content
      </a>
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-6 py-4 md:px-10 lg:px-16"
      >
        {/*
          The name is two-tone, so its spans would override a parent text-colour
          change. It dims with opacity instead to keep the tonal relationship.
          Below `md` the role drops to its own line and the separator hides with
          it — at that width there isn't room to keep the lockup on one line next
          to the nav links without wrapping mid-word. Flex items are always
          blockified, which trims leading/trailing space inside a text node, so
          the gap around the separator comes from `gap` rather than literal
          spaces in the string. text-balance on the role is a narrow-viewport
          safety net: below ~340px the nav links (shrink-0) squeeze the lockup
          enough that "Senior Product Designer" itself wraps to a second line —
          balance keeps that split even instead of stranding "Designer" alone.
        */}
        <Link
          href="/"
          className="flex flex-col text-body-h2 transition-opacity duration-200 hover:opacity-60 active:opacity-40 md:flex-row md:items-baseline md:gap-1.5"
        >
          <span className="text-white">Analdo Gomez</span>
          <span className="hidden text-white/70 md:inline">/</span>
          <span className="text-balance text-white/70">Senior Product Designer</span>
        </Link>
        <div className="flex shrink-0 items-center gap-4 md:gap-6">
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
  );
}
