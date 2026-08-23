/**
 * Bordered callout box. `rounded-none`, not `rounded-token`: Figma's
 * Callout node has no radius, matching the rest of the site's "images
 * round, text/border surfaces don't" rule under this system — the same
 * reasoning `CaseStudyCard` and `ProjectImage` follow, just the other way
 * around.
 */
export function CaseStudyCallout({ children }: { children: string }) {
  return (
    <div className="flex w-full max-w-[720px] animate-fade-up items-start justify-start rounded-none border border-gray-dark p-8">
      <p className="w-full text-pretty font-mono text-body-h1 text-white">{children}</p>
    </div>
  );
}
