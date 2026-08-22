"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ContactGlyph } from "@/components/contact-glyph";
import { author } from "@/lib/site";

/*
 * Exact path data exported from the new Figma iteration's
 * `site-header/menu-icon` node (identical to the four-bar mark `main`'s
 * `MobileNav` already uses), `fill="white"` swapped for `currentColor`. Do
 * not re-trace by hand — re-export if the design changes.
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
 * Mobile-only (`md:hidden`) replacement for the old `border-b` top bar: a
 * full-width bar reading "Analdo Gomez" + a menu toggle, `fixed` at the top
 * of the viewport (per the Figma frame's collapsed state, which is inline
 * in the hero — fixed is a deliberate addition so it stays reachable while
 * the case-study list scrolls, the same reasoning `main`'s `MobileNav` pill
 * follows). Figma only supplies the collapsed state; the expanded menu
 * (nav + contact links) is this component's own design, reusing the same
 * accessible dialog mechanics `main`'s `MobileNav` established — real
 * `role="dialog"`, `aria-modal`, Escape/scrim/close dismissal, body scroll
 * lock, `autoFocus` on Close — since that pattern is proven, not because
 * this branch already had `MobileNav` to copy from (it doesn't; this is a
 * new component).
 *
 * `inset-x-6 top-6` (24px) matches the Figma frame's own hero padding
 * exactly, rather than `main`'s 16px pill inset — the two components are
 * differently specced, not a copy of one another.
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

  return (
    <div className="md:hidden">
      <div
        inert={isOpen}
        className="fixed inset-x-6 top-6 z-50 flex items-center justify-between rounded-token bg-dark-primary px-4 py-3 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]"
      >
        <span className="font-mono text-body-h3 font-medium text-white/72">
          Analdo Gomez
        </span>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          aria-expanded={isOpen}
          className="flex size-6 items-center justify-center text-white transition-[color,scale] duration-200 ease-out active:scale-[0.96]"
        >
          <MenuIcon />
        </button>
      </div>

      {isOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-50 bg-black/50 transition-opacity duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="fixed inset-x-6 top-6 flex flex-col items-end gap-6 rounded-token bg-dark-primary p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] transition-[opacity,scale] duration-200 ease-out"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              autoFocus
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="relative flex size-6 items-center justify-center text-white transition-[color,scale] duration-200 ease-out before:absolute before:-inset-2 before:content-[''] active:scale-[0.96]"
            >
              <CloseIcon />
            </button>

            <nav aria-label="Primary" className="flex w-full flex-col items-start gap-4">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="font-mono text-body-h1 font-bold text-white transition-colors duration-200 hover:text-white/70 active:text-white/50"
              >
                / Works
              </Link>
              <Link
                href="/about"
                onClick={() => setIsOpen(false)}
                className="font-mono text-body-h1 font-normal text-white/70 transition-colors duration-200 hover:text-white active:text-white/50"
              >
                / Resume
              </Link>
            </nav>

            <div className="flex w-full flex-col items-start gap-4 border-t border-white/[0.08] pt-6">
              <a
                href={`mailto:${author.email}`}
                target="_blank"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center gap-2 font-mono text-body-h3 text-white transition-colors duration-200 hover:text-white/60 active:text-white/40"
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
                className="inline-flex items-center gap-2 font-mono text-body-h3 text-white transition-colors duration-200 hover:text-white/60 active:text-white/40"
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
                className="inline-flex items-center gap-2 font-mono text-body-h3 text-white transition-colors duration-200 hover:text-white/60 active:text-white/40"
              >
                <span aria-hidden="true" className="flex size-4 shrink-0 items-center justify-center">
                  <ContactGlyph name="github" />
                </span>
                GitHub
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
