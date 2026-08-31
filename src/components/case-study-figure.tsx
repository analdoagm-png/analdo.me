import { CaseStudyZoomableImage } from "@/components/case-study-zoomable-image";

/**
 * `roundedClassName` now defaults to `rounded-token` (was `rounded-none`) —
 * Figma's figure images round to match chips/cards under this system, only
 * text/border surfaces (callouts, results boxes) stay sharp. `max-w-[1280px]
 * w-full` on the root matches every other image on this system, centering
 * within the page's `items-center` column once there's more room than that.
 *
 * `.animate-fade-up` lives on this outer root (image + caption together),
 * not on the inner image div — a page's `.stagger-section` (see
 * globals.css) only assigns a delay to its *direct* children, and this
 * component's return value, not its inner image div, is what actually sits
 * at that position in a case study page. Putting it here also means the
 * caption now fades in with its image as one unit instead of appearing
 * statically while only the image above it animated. `priority` no longer
 * adds its own one-off animation delay for the same reason `ProjectImage`
 * dropped it: the page-level stagger supersedes it with a real
 * position-based delay instead of one hardcoded special case.
 *
 * The image itself is `CaseStudyZoomableImage` now, not a plain `next/image`
 * — click-to-expand at `md`+, see that component's own doc comment for the
 * full rationale. This component itself stays a Server Component; only the
 * zoomable leaf is a client component.
 */
export function CaseStudyFigure({
  src,
  alt,
  caption,
  aspect = "2880/1800",
  aspectClassName,
  captionClassName = "text-white/70",
  gapClassName = "gap-2",
  roundedClassName = "rounded-token",
  priority = false,
}: {
  src: string;
  alt?: string;
  caption: string;
  aspect?: string;
  aspectClassName?: string;
  captionClassName?: string;
  gapClassName?: string;
  roundedClassName?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`flex w-full max-w-[1280px] animate-fade-up flex-col items-start ${gapClassName}`}
    >
      <CaseStudyZoomableImage
        src={src}
        alt={alt ?? caption}
        caption={caption}
        aspect={aspect}
        aspectClassName={aspectClassName}
        roundedClassName={roundedClassName}
        sizes="(min-width: 1280px) 1280px, 100vw"
        priority={priority}
      />
      <p className={`w-full text-center font-mono text-body-h3 ${captionClassName}`}>
        {caption}
      </p>
    </div>
  );
}
