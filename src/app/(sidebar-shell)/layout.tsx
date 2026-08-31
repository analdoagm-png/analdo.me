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
 * pages still needs its own mobile/tablet-only (`lg:hidden`) duplicate
 * `h1`, since the sidebar itself is hidden below `lg` now — see `page.tsx`
 * and `about/page.tsx`. Every case study keeps `bioAs="p"`: its own project
 * title is the real `h1` there.
 *
 * `HomeSidebar` shows at `lg` (1024px) and up; `MobileTopBar`/`MobileFooter`
 * cover both mobile and tablet (below `lg`) with the same mobile navigation
 * pattern, rather than switching to the sidebar at `md` (768px) the way an
 * earlier pass did. Tablet used to get the desktop rail; it now gets the
 * same top bar + inline hero + footer as mobile, just at a wider viewport.
 * `MobileTopBar`'s card stays a fixed `inset-x-6` width rather than
 * growing with the viewport, so at the wide end of tablet (close to
 * 1024px) there's a visibly large gap between the "Analdo Gomez" label and
 * the menu toggle — a known, accepted tradeoff of reusing the mobile
 * component as-is rather than a tablet-tuned variant; revisit if it reads
 * as more than a minor cosmetic gap in practice.
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
          className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-80"
        />
        {children}
      </main>

      <MobileFooter />
    </>
  );
}
