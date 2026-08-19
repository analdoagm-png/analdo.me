import Image from "next/image";
import { ImageZoom } from "@/components/image-zoom";

/**
 * The framed product-image box used across the case studies.
 *
 * The image sits on a 24px mat inside the frame. That padding is applied to
 * the `<Image>` itself rather than to the wrapper: a `fill` image is
 * absolutely positioned against the wrapper's *padding* box, so padding there
 * would not inset it at all. Padding on the replaced element does inset it,
 * because `object-fit` resolves against the element's content box.
 *
 * `zoomable` wraps the frame in `ImageZoom`, which expands it into a lightbox
 * on click at `md` and up and renders nothing extra below that. Pass
 * `zoomable={false}` for an image that is decorative or already small.
 *
 * The `group-hover` here pairs with the `group` on `ImageZoom`'s trigger: the
 * mat lifts one step on hover, and that is the entire hover treatment. When
 * the frame is not zoomable there is no `group` ancestor, so the utility is
 * simply inert rather than needing a conditional.
 */
export function ProjectImage({
  src,
  alt,
  aspect = "2880/1800",
  aspectClassName,
  priority = false,
  zoomable = true,
}: {
  src: string;
  alt: string;
  aspect?: string;
  aspectClassName?: string;
  priority?: boolean;
  zoomable?: boolean;
}) {
  const frame = (
    <div
      className={`relative w-full overflow-hidden rounded-none bg-stroke-dark outline outline-1 -outline-offset-1 outline-white/10 transition-colors duration-200 group-hover:bg-stroke-lift ${aspectClassName ?? ""} animate-fade-up ${priority ? "[animation-delay:200ms]" : ""}`}
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
        className="object-cover p-6"
        sizes="(min-width: 1280px) 1280px, 100vw"
        priority={priority}
      />
    </div>
  );

  if (!zoomable) return frame;

  return (
    <ImageZoom src={src} alt={alt}>
      {frame}
    </ImageZoom>
  );
}
