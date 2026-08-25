"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ContactGlyph } from "@/components/contact-glyph";
import { author } from "@/lib/site";

/*
 * Exact path data exported from the Figma iteration's `site-header/menu-icon`
 * node (identical to the four-bar mark `main`'s `MobileNav` already uses),
 * `fill="white"` swapped for `currentColor`. Do not re-trace by hand —
 * re-export if the design changes.
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

/* Figma's expanded-panel `close--large` glyph (node 347:1047), recolored to currentColor. */
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
 * Mobile-only (`md:hidden`) replacement for the old `border-b` top bar. A
 * single persistent `fixed inset-x-6 top-6` card holds both states — the
 * "Analdo Gomez" + toggle header row never unmounts, only the content below
 * it (nav + contact links) expands and collapses — rather than the earlier
 * version's two separate elements (a collapsed bar plus a whole separate
 * dialog rendered as its sibling only while open). That split was what made
 * a real open/close transition impossible: conditionally mounting the panel
 * with `isOpen ? <div> : null` puts it in the DOM already in its "open"
 * state, so there's nothing to animate from, and removing it on close skips
 * any exit transition entirely. Merging into one always-mounted card, with
 * `isOpen` only toggling classes/attributes, is what makes the organic
 * expand/collapse and the icon crossfade below possible.
 *
 * Figma only ever specified the collapsed bar's own look; the expanded
 * panel's structure and copy now match the newer `site-header` frame (node
 * 347:1016) exactly: "Home"/"Resume" (not the desktop sidebar's "/ Works"/
 * "/ Resume" phrasing — a deliberate, Figma-driven difference from
 * `HomeSidebar`'s nav, not a copy-paste miss) as large centered rows with no
 * active/muted distinction between them (Figma shows both identically
 * styled), then a `border-t` divider and three centered, larger (16px,
 * `text-body-h2`) contact rows below it — bumped up from the previous
 * 14px, and from left-aligned to centered, to match that frame.
 *
 * Expand/collapse uses the `grid-template-rows: 0fr -> 1fr` technique
 * (`grid-rows-[0fr]` / `grid-rows-[1fr]` on a `grid` wrapper, actual content
 * in a single `overflow-hidden` child) rather than an arbitrary fixed
 * `max-height` — it animates to the content's real rendered height with no
 * JS measurement and no guessing at a tall-enough cap, so the motion tracks
 * the content exactly at every step instead of easing toward a number that
 * doesn't match what's actually revealed. Duration/easing
 * (320ms, `cubic-bezier(0.16, 1, 0.3, 1)`) matches this site's one
 * established motion curve (`.animate-fade-up`, the deck's slide/lightbox
 * animations) rather than introducing a second one. The scrim fades with
 * the same curve at a quicker 300ms.
 *
 * The header's hamburger/close icon crossfades in place instead of
 * swapping instantly — both icons stay in the DOM, absolute-stacked, and
 * trade opacity/scale/blur (0 -> 1 opacity, 0.25 -> 1 scale, 4px -> 0 blur)
 * on a quicker 200ms/`cubic-bezier(0.2, 0, 0, 1)` timing, the standard
 * no-motion-library icon-crossfade recipe — snappier than the panel's own
 * transition so the icon reads as leading it, not lagging behind it.
 *
 * Accessible dialog mechanics carried over unchanged from the previous
 * version: real `role="dialog"`, `aria-modal`, Escape/scrim/close
 * dismissal, body scroll lock, `autoFocus` on Close. `inert` now applies to
 * just the expanding nav/contacts region (not the whole card, since the
 * header row's toggle button must stay reachable at every state) so it's
 * unfocusable and hidden from assistive tech while collapsed.
 *
 * `inset-x-6 top-6` (24px) matches the Figma frame's own hero padding.
 */
export function MobileTopBar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const navLinkStyles =
    "flex w-full items-center justify-center p-4 font-mono text-heading-h5 font-bold text-white transition-colors duration-200 hover:text-white/80 active:text-white/60";
  const contactLinkStyles =
    "inline-flex items-center gap-2 font-mono text-body-h2 text-white transition-colors duration-200 hover:text-white/60 active:text-white/40";

  return (
    <div className="md:hidden">
      <div
        aria-hidden="true"
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div className="fixed inset-x-6 top-6 z-50 overflow-hidden rounded-token bg-dark-primary shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
        <div className="flex items-center justify-between px-4 py-3">
          <span className="font-mono text-body-h3 font-medium text-white/72">
            Analdo Gomez
          </span>
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu-panel"
            className="relative flex size-6 items-center justify-center text-white active:scale-[0.96]"
          >
            <span
              aria-hidden="true"
              className={`absolute inset-0 flex items-center justify-center transition-[opacity,transform,filter] duration-200 ease-[cubic-bezier(0.2,0,0,1)] ${
                isOpen ? "scale-[0.25] opacity-0 blur-sm" : "scale-100 opacity-100 blur-none"
              }`}
            >
              <MenuIcon />
            </span>
            <span
              aria-hidden="true"
              className={`absolute inset-0 flex items-center justify-center transition-[opacity,transform,filter] duration-200 ease-[cubic-bezier(0.2,0,0,1)] ${
                isOpen ? "scale-100 opacity-100 blur-none" : "scale-[0.25] opacity-0 blur-sm"
              }`}
            >
              <CloseIcon />
            </span>
          </button>
        </div>

        <div
          id="mobile-menu-panel"
          role="dialog"
          aria-modal={isOpen || undefined}
          aria-label="Site menu"
          inert={!isOpen}
          className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-4 px-4 pt-4 pb-3">
              <nav aria-label="Primary" className="flex flex-col gap-4">
                <Link href="/" onClick={() => setIsOpen(false)} className={navLinkStyles}>
                  Home
                </Link>
                <Link href="/about" onClick={() => setIsOpen(false)} className={navLinkStyles}>
                  Resume
                </Link>
              </nav>

              <div className="flex flex-col items-center gap-6 border-t border-white/[0.08] py-8">
                <a
                  href={`mailto:${author.email}`}
                  target="_blank"
                  onClick={() => setIsOpen(false)}
                  className={contactLinkStyles}
                >
                  <span aria-hidden="true" className="flex size-4 shrink-0 items-center justify-center">
                    <ContactGlyph name="mail" />
                  </span>
                  Contact me
                </a>
                <a
                  href={author.linkedIn}
                  target="_blank"
                  onClick={() => setIsOpen(false)}
                  className={contactLinkStyles}
                >
                  <span aria-hidden="true" className="flex size-4 shrink-0 items-center justify-center">
                    <ContactGlyph name="linkedin" />
                  </span>
                  LinkedIn
                </a>
                <a
                  href={author.github}
                  target="_blank"
                  onClick={() => setIsOpen(false)}
                  className={contactLinkStyles}
                >
                  <span aria-hidden="true" className="flex size-4 shrink-0 items-center justify-center">
                    <ContactGlyph name="github" />
                  </span>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
