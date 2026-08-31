import { CaseStudyZoomableImage } from "@/components/case-study-zoomable-image";

/**
 * A grid of captioned figures — the six-part case study format's answer to
 * a cluster of related images (raw process artifacts, a set of finalized
 * screens) that don't each carry enough weight to justify their own
 * standalone `CaseStudyFigure`, but are still real, distinct evidence worth
 * showing rather than picking just one.
 *
 * Two columns from `md` up, one column below it — unlike `CaseStudyFigure`,
 * items keep their own natural aspect ratio (`aspect` per item, no forced
 * crop) since these are heterogeneous artifacts (portrait sitemaps next to
 * wide flowcharts), not a set of same-shaped product screenshots. `span`
 * lets one item run the full grid width at `md`+ — used for a hero-ish
 * artifact in an otherwise-odd-numbered gallery (e.g. a 2-up pair followed
 * by one wide diagram) rather than leaving a lopsided empty cell.
 *
 * Every case study on the six-part format uses this now. Each item's image
 * is `CaseStudyZoomableImage` — click-to-expand at `md`+, same as
 * `CaseStudyFigure`. This component itself stays a Server Component; only
 * the zoomable leaf is a client component.
 */
export function CaseStudyGallery({
  items,
}: {
  items: {
    src: string;
    alt: string;
    caption: string;
    aspect: string;
    span?: boolean;
  }[];
}) {
  return (
    <div className="grid w-full max-w-[1280px] grid-cols-1 items-start gap-8 md:grid-cols-2">
      {items.map((item, index) => (
        <div
          key={item.src}
          className={`flex w-full animate-fade-up flex-col items-start gap-2 ${
            item.span ? "md:col-span-2" : ""
          }`}
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <CaseStudyZoomableImage
            src={item.src}
            alt={item.alt}
            caption={item.caption}
            aspect={item.aspect}
            sizes="(min-width: 768px) 50vw, 100vw"
          />
          <p className="w-full text-center font-mono text-body-h3 text-white/70">
            {item.caption}
          </p>
        </div>
      ))}
    </div>
  );
}
