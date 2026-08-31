"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

function subscribeToDesktopQuery(callback: () => void) {
  const query = window.matchMedia("(min-width: 768px)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getDesktopQuerySnapshot() {
  return window.matchMedia("(min-width: 768px)").matches;
}

function getDesktopQueryServerSnapshot() {
  return false;
}

/**
 * Wraps a single case-study image (used by both `CaseStudyFigure` and
 * `CaseStudyGallery`) with click-to-expand behavior — desktop and tablet
 * only (`md`+, 768px). Below that, this renders the same image with no
 * interactive wrapper at all: no button, no tabIndex, nothing in the a11y
 * tree to tab to. That's not a CSS-only `hidden` trick (`pointer-events-none`
 * would still leave a focusable, semantically-real button on mobile) — it's
 * a real branch, gated by `useSyncExternalStore` against
 * `matchMedia("(min-width: 768px)")`. `getServerSnapshot` always returns
 * `false`, so server-rendered and pre-hydration markup is always the plain,
 * non-interactive version — intentional progressive enhancement, not a
 * hydration mismatch — and the trigger only ever appears once the client
 * confirms the viewport actually matches.
 *
 * The expanded view is a **portal into `document.body`**, not a plain
 * nested `fixed` div. Every image on this system sits inside an
 * `.animate-fade-up` ancestor (`CaseStudyFigure`'s root, or a
 * `CaseStudyGallery` item's root), and `animation-fill-mode: both` means
 * that ancestor keeps applying the entrance keyframe's final
 * `transform: translateY(0)` forever after the animation completes — it
 * never actually clears to `transform: none`. A non-`none` transform on an
 * ancestor creates a new containing block for any `position: fixed`
 * descendant, which would silently pin the lightbox to that ancestor's own
 * box instead of the viewport. Portaling to `document.body` sidesteps the
 * problem at the source rather than working around it per call site.
 *
 * Reuses the deck's existing lightbox motion (`.animate-lightbox-scrim` /
 * `.animate-lightbox-media`, defined once in globals.css) and interaction
 * model (Escape closes, clicking the scrim closes, `autoFocus` on Close,
 * focus returns to the trigger on close) — one lightbox language sitewide,
 * not a second bespoke one just for case studies. Body scroll locks while
 * open, matching `MobileTopBar`'s own overlay.
 */
export function CaseStudyZoomableImage({
  src,
  alt,
  caption,
  aspect = "2880/1800",
  aspectClassName,
  roundedClassName = "rounded-token",
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  aspect?: string;
  aspectClassName?: string;
  roundedClassName?: string;
  sizes: string;
  priority?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const canZoom = useSyncExternalStore(
    subscribeToDesktopQuery,
    getDesktopQuerySnapshot,
    getDesktopQueryServerSnapshot,
  );

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const close = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  const frameStyle = aspectClassName
    ? undefined
    : { aspectRatio: aspect.replace("/", " / ") };
  const frameClassName = `relative w-full overflow-hidden bg-stroke-dark ${roundedClassName} ${aspectClassName ?? ""}`;

  const thumbnail = (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      sizes={sizes}
      priority={priority}
    />
  );

  if (!canZoom) {
    return (
      <div className={frameClassName} style={frameStyle}>
        {thumbnail}
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        onClick={() => setIsOpen(true)}
        aria-label={`Expand image: ${alt}`}
        className={`group ${frameClassName} cursor-zoom-in`}
        style={frameStyle}
      >
        {thumbnail}
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/25 group-hover:opacity-100">
          <span className="flex size-10 items-center justify-center rounded-full bg-black/60 text-white">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 3H5a2 2 0 0 0-2 2v4" />
              <path d="M15 3h4a2 2 0 0 1 2 2v4" />
              <path d="M9 21H5a2 2 0 0 1-2-2v-4" />
              <path d="M15 21h4a2 2 0 0 0 2-2v-4" />
            </svg>
          </span>
        </span>
      </button>

      {isOpen
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-label={caption ? `${caption} — larger view` : "Larger view"}
              className="animate-lightbox-scrim fixed inset-0 z-50 flex items-center justify-center bg-black/88 p-6 md:p-10 lg:p-16"
              onClick={close}
            >
              <div
                className="animate-lightbox-media flex h-full w-full max-w-[1600px] flex-col gap-4"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-center justify-between gap-5">
                  {caption ? (
                    <p className="font-mono text-body-h3 text-white/70">
                      {caption}
                    </p>
                  ) : (
                    <span />
                  )}
                  <button
                    type="button"
                    autoFocus
                    onClick={close}
                    className="whitespace-nowrap rounded-token border border-white/22 px-3 py-1.5 text-body-h3 text-white transition-colors duration-200 hover:border-white/45 hover:text-white/70 active:text-white/40"
                  >
                    Close
                  </button>
                </div>
                <div className="relative min-h-0 flex-1 overflow-hidden rounded-token-xl bg-[#181818]">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="100vw"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
