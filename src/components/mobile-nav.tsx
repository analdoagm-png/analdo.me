"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ContactIcon } from "@/components/contact-icon";
import { author } from "@/lib/site";

/**
 * The collapsed pill's label names the page you're currently on, so it reads
 * "Resume" on `/about` rather than always saying "Home". Case-study routes
 * have no short label that fits the pill (titles run as long as "Github's
 * Security Findings"), so they fall back to Home, where the label doubles as
 * the way back out.
 */
const pillLabels: Record<string, string> = {
  "/": "Home",
  "/about": "Resume",
};

function usePillTarget() {
  const pathname = usePathname();
  const label = pillLabels[pathname ?? "/"];

  return label ? { label, href: pathname } : { label: "Home", href: "/" };
}

/*
 * Both glyphs are the exact path data exported from the Figma nodes (a
 * four-bar menu mark and a filled X), with `fill="white"` swapped for
 * `currentColor` so they inherit the button's colour transitions. Do not
 * re-trace these by hand — re-export from Figma if the design changes.
 */
function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 4.5H3V6H21V4.5Z" fill="currentColor" />
      <path d="M21 18H3V19.5H21V18Z" fill="currentColor" />
      <path d="M21 9H3V10.5H21V9Z" fill="currentColor" />
      <path d="M21 13.5H3V15H21V13.5Z" fill="currentColor" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M13.0606 12L19.5 5.56058L18.4394 4.5L12 10.9394L5.56072 4.5L4.5 5.56058L10.9394 12L4.5 18.4394L5.56072 19.5L12 13.0606L18.4394 19.5L19.5 18.4394L13.0606 12Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Mobile-only nav: a small fixed pill (Home + menu toggle) that replaces
 * `SiteHeader`'s full bar below `md`, plus the expandable menu it opens.
 * Intentional client leaf for the same reason `CaseStudiesDeck` is — button
 * and Escape-key interaction change what's on screen. `SiteHeader` (a server
 * component) renders this alongside its own desktop/tablet markup.
 *
 * Both the pill and the panel take their geometry straight from Figma:
 * `rounded-token` (4px), a flat `dark-primary` fill, and depth from the same
 * `0 0 0 1px oklch(1 0 0 / 0.08)` ring `CaseStudyCard` rests at — no border
 * and no backdrop blur.
 */
export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const pill = usePillTarget();

  const close = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 150);
  };

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const contactLinks = [
    { href: `mailto:${author.email}`, icon: "mail" as const, label: "Contact me" },
    { href: author.linkedIn, icon: "linkedin" as const, label: "LinkedIn" },
    { href: author.github, icon: "github" as const, label: "GitHub" },
  ];

  return (
    <div className="md:hidden">
      {/*
        The pill stays mounted while the menu is open rather than unmounting.
        The panel shares its corner, radius, fill and ring and is opaque, so
        it covers the pill exactly — which is what makes the open read as the
        pill expanding and the close as the panel collapsing back into it,
        with no gap where the scrim would flash through. `inert` keeps the
        covered links out of the tab order and unclickable meanwhile.
      */}
      {/*
        The pill carries no padding of its own — each child owns its share, so
        every pixel of the pill is either the label link or the menu toggle
        rather than dead space. The child paddings still add up to the spec's
        106x48 pill with symmetric 16px insets and a 16px gap between label
        and glyph (16+34+8 | 8+24+16), and `items-stretch` gives the label the
        toggle's full 48px height.
      */}
      <div
        inert={isOpen}
        className="fixed top-4 right-4 z-50 flex items-stretch rounded-token bg-dark-primary shadow-[0_0_0_1px_oklch(1_0_0/0.08)]"
      >
        <Link
          href={pill.href}
          className="flex items-center pr-2 pl-4 font-mono text-body-h3 text-white/72 transition-colors duration-200 hover:text-white active:text-white/50"
        >
          {pill.label}
        </Link>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          aria-expanded={isOpen}
          className="flex items-center py-3 pr-4 pl-2 text-white transition-[color,scale] duration-200 ease-out hover:text-white/70 active:scale-[0.96]"
        >
          <MenuIcon />
        </button>
      </div>

      {isOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className={`fixed inset-0 z-50 bg-black/50 ${isClosing ? "animate-menu-scrim-exit" : "animate-menu-scrim"}`}
          onClick={close}
        >
          <div
            className={`fixed inset-x-4 top-4 flex flex-col items-end gap-4 rounded-token bg-dark-primary py-3 pr-4 pl-3 shadow-[0_0_0_1px_oklch(1_0_0/0.08)] ${isClosing ? "animate-menu-panel-exit" : "animate-menu-panel menu-stagger"}`}
            onClick={(event) => event.stopPropagation()}
          >
            {/*
              Layout box stays exactly 24px so it lands on the spec's
              right-edge alignment and keeps the panel's 16px gaps intact; the
              ::before expands the hit area to 40px without affecting layout.
            */}
            <button
              type="button"
              autoFocus
              onClick={close}
              aria-label="Close menu"
              className="relative flex size-6 items-center justify-center text-white transition-[color,scale] duration-200 ease-out before:absolute before:-inset-2 before:content-[''] hover:text-white/70 active:scale-[0.96]"
            >
              <CloseIcon />
            </button>

            <nav aria-label="Primary" className="flex w-full flex-col gap-4">
              <Link
                href="/"
                onClick={close}
                className="w-full px-4 py-4 text-center text-heading-h5 font-bold leading-[1.6] text-white transition-colors duration-200 hover:text-white/70 active:text-white/50"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={close}
                className="w-full px-4 py-4 text-center text-heading-h5 font-bold leading-[1.6] text-white transition-colors duration-200 hover:text-white/70 active:text-white/50"
              >
                Resume
              </Link>
            </nav>

            <div className="flex w-full flex-col items-center gap-6 border-t border-white/[0.08] py-8">
              {contactLinks.map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  onClick={close}
                  className="inline-flex items-center gap-2 text-body-h2 text-white transition-colors duration-200 hover:text-white/60 active:text-white/40"
                >
                  <span aria-hidden="true" className="flex size-4 shrink-0 items-center justify-center">
                    <ContactIcon name={icon} />
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
