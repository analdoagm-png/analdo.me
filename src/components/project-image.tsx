import Image from "next/image";

/**
 * `priority` only controls the real `next/image` loading hint now — it used
 * to also add a one-off `[animation-delay:200ms]` to this element's own
 * fade-in, but that was a narrow special case (the first/priority image
 * got a considered delay; every other image on the same page fired at
 * 0ms, with no stagger between them at all). Each page now wraps its
 * content in `.stagger-section` (see globals.css), which gives every
 * direct child — image wrappers included — a real page-position-based
 * delay, superseding this component's own one-off logic entirely.
 *
 * `max-w-[1280px]` lives on this root now, matching `CaseStudyFigure` and
 * `CaseStudyImagePair`'s own self-contained width — every call site used
 * to wrap this component in an identical `<div className="w-full
 * max-w-[1280px]">`, which was pure duplication *and* meant the actual
 * animated element sat one level below the page's direct children, where
 * `.stagger-section`'s nth-child matching can't reach it. Call sites now
 * render `<ProjectImage />` directly as a page-level sibling — no wrapper
 * div needed.
 */
export function ProjectImage({
  src,
  alt,
  aspect = "2880/1800",
  aspectClassName,
  roundedClassName = "rounded-none",
  priority = false,
}: {
  src: string;
  alt: string;
  aspect?: string;
  aspectClassName?: string;
  roundedClassName?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative w-full max-w-[1280px] animate-fade-up overflow-hidden bg-stroke-dark ${roundedClassName} ${aspectClassName ?? ""}`}
      style={
        aspectClassName
          ? undefined
          : { aspectRatio: aspect.replace("/", " / ") }
      }
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(min-width: 1280px) 1280px, 100vw"
        priority={priority}
      />
    </div>
  );
}
