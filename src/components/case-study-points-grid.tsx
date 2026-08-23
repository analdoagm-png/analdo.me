/**
 * A stacked column of numbered points — Figma's "The Problem" and "Results"
 * sections (node 339:596) both use this exact shape: number, bold title,
 * gray description, repeated vertically at `gap-12`. This replaced an
 * `md:flex-row` 3-up grid the pre-redesign version used; Figma has no
 * multi-column version of this pattern anywhere.
 *
 * `number` is passed as literal text rather than derived, since the two
 * sections that use this use two different numbering styles in Figma
 * itself — "01"/"02"/"03" for Problem, "1."/"2."/"3." for Results — not an
 * inconsistency to normalize away.
 */
export function CaseStudyPointsGrid({
  items,
}: {
  items: { number: string; title: string; description: string }[];
}) {
  return (
    <div className="flex w-full max-w-[720px] flex-col items-start gap-12">
      {items.map((item, index) => (
        <div
          key={item.number}
          className="flex w-full animate-fade-up flex-col items-start gap-2"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <p className="font-mono text-body-h1 text-white" aria-hidden="true">
            {item.number}
          </p>
          <h3 className="w-full text-balance font-mono text-heading-h5 font-bold text-white">
            {item.title}
          </h3>
          <p className="w-full text-pretty font-mono text-body-h2 text-white/70">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
