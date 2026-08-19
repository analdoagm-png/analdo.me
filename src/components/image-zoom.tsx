"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Click-to-expand wrapper for case-study imagery. An intentional client leaf —
 * same justification as `MobileNav` and `CaseStudiesDeck`: opening an overlay
 * and closing it on Escape is real interaction. The framed image itself is
 * still server-rendered and passed in as `children`, so this component adds
 * behaviour without moving any markup to the client.
 *
 * Desktop and tablet only. Below `md` there is no meaningful room to expand
 * into, so the image renders untouched — not as a button that does nothing.
 * `canZoom` starts false and is set after mount, which means the server output
 * is the non-interactive version and also the correct no-JS fallback.
 *
 * Hovering the trigger lifts the frame's mat one step (`group-hover` on the
 * frame in `ProjectImage`) and nothing else — no scale, no image movement.
 * The image is the content; the mount around it is what responds.
 *
 * Motion, dismissal and chrome deliberately match the deck's lightbox
 * (`case-studies-deck.tsx`): the same `animate-lightbox-*` keyframes, a close
 * button, Escape, and a scrim click.
 */
export function ImageZoom({
  src,
  alt,
  children,
}: {
  src: string;
  alt: string;
  children: React.ReactNode;
}) {
  const [canZoom, setCanZoom] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");

    // Closing here rather than in a separate effect keeps the "viewport
    // shrank past md while the overlay was open" case inside the external
    // subscription that caused it, instead of a state-driven cascade.
    const sync = () => {
      setCanZoom(query.matches);
      if (!query.matches) {
        setIsOpen(false);
        setIsClosing(false);
      }
    };

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const close = () => {
    setIsClosing(true);
    closeTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      closeTimeoutRef.current = null;
      // Return focus to the image that opened the overlay.
      triggerRef.current?.focus();
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

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

  if (!canZoom) return <>{children}</>;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`Open larger view: ${alt}`}
        className="group block w-full cursor-zoom-in"
      >
        {children}
      </button>

      {isOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Larger image view"
          onClick={close}
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/88 p-6 md:p-10 lg:p-16 ${
            isClosing ? "animate-lightbox-scrim-exit" : "animate-lightbox-scrim"
          }`}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className={`flex h-full w-full max-w-[1600px] flex-col gap-4 ${
              isClosing ? "animate-lightbox-media-exit" : "animate-lightbox-media"
            }`}
          >
            <div className="flex items-center justify-end">
              <button
                type="button"
                autoFocus
                onClick={close}
                className="rounded-token border border-white/22 px-3 py-1.5 font-mono text-body-h3 text-white transition-[color,border-color,scale] duration-200 ease-out hover:border-white/45 hover:text-white/70 active:scale-[0.96] active:text-white/40"
              >
                Close
              </button>
            </div>
            {/*
              The 24px mat is padding on the image itself, not the wrapper: a
              `fill` image is absolutely positioned against the wrapper's
              padding box, so padding there would not inset it. Padding on the
              replaced element does, because object-fit resolves against its
              content box. Same technique as `ProjectImage`'s frame.
            */}
            <div className="relative min-h-0 flex-1 overflow-hidden bg-stroke-dark">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="100vw"
                className="object-contain p-6"
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
