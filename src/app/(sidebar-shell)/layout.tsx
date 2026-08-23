"use client";

import { usePathname } from "next/navigation";
import { HomeSidebar } from "@/components/home-sidebar";
import { MobileTopBar } from "@/components/mobile-top-bar";
import { MobileFooter } from "@/components/mobile-footer";

/**
 * Shared shell for every route on the site — homepage, About, and all five
 * case studies, including GoRight and Arrowhead Transit now that they've
 * moved off the old `EditorialSidebar` system onto this one (the route
 * group is invisible in the URL, so `/about` and `/case-studies/goright`
 * are unaffected — only the file location moved). Only `/case-studies-deck`
 * sits outside this group, as a self-contained full-viewport presentation
 * route with no shared header/footer chrome of its own kind.
 *
 * This exists specifically so `HomeSidebar` and `MobileTopBar` don't
 * remount on navigation between these routes. Before this layout, every
 * page rendered its own copy of both — visually identical, but each a
 * distinct component instance from React's perspective, since Next.js
 * unmounts a route's entire tree on navigation unless the shared part
 * lives in a common ancestor layout. That remount replayed the sidebar's
 * own `animate-fade-up` entrance and produced a visible jump/flash every
 * time you clicked between "/ Works" and "/ Resume". Hoisting the sidebar
 * here means it's the same DOM node across every navigation within this
 * group — Next.js layouts persist by design — so it never re-animates or
 * flashes; only `{children}` (each page's own content) unmounts and
 * remounts, which is exactly where the per-page `animate-fade-up` content
 * transitions should keep firing.
 *
 * `bioAs`/`activeNav` are derived from the pathname here (making this a
 * client component) rather than passed by each page, since the sidebar no
 * longer lives inside any individual page to receive them as props.
 * "works" is active in every case except `/about`; the bio statement is the
 * page's own `h1` on `/` and `/about` — both are "about Analdo himself"
 * pages, so the sidebar's identity statement can carry the h1 role for
 * both rather than each page restating a variant of it. Each of those two
 * pages still needs its own mobile-only (`md:hidden`) duplicate `h1`,
 * since the sidebar itself is hidden below `md` — see `page.tsx` and
 * `about/page.tsx`. Every case study keeps `bioAs="p"`: its own project
 * title is the real `h1` there.
 */
export default function SidebarShellLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const bioAs = pathname === "/" || pathname === "/about" ? "h1" : "p";
  const activeNav = pathname === "/about" ? "resume" : "works";

  return (
    <>
      <a
        href="#main-content"
        className="skip-link rounded-token border border-stroke-dark bg-dark-primary px-4 py-2 font-mono text-body-h2 text-white"
      >
        Skip to content
      </a>

      <MobileTopBar />

      <main id="main-content" className="flex-1">
        <HomeSidebar
          bioAs={bioAs}
          activeNav={activeNav}
          className="hidden md:fixed md:inset-y-0 md:left-0 md:flex md:w-80"
        />
        {children}
      </main>

      <MobileFooter />
    </>
  );
}
