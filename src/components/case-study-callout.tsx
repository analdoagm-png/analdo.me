/**
 * Bordered callout box. `rounded-none`, not `rounded-token`: Figma's
 * Callout node has no radius, matching the rest of the site's "images
 * round, text/border surfaces don't" rule under this system — the same
 * reasoning `CaseStudyCard` and `ProjectImage` follow, just the other way
 * around.
 *
 * Inner paragraph is `text-body-h2`, not the larger `text-body-h1` this
 * used to run at — a typography pass normalized every case study prose
 * size down to `/about`'s one consistent 16px body size. Kept at full
 * `text-white` (not `/70`) rather than muting it: the border box is
 * already the thing that sets this text apart from surrounding prose, so
 * dropping opacity too would double up the same signal.
 */
export function CaseStudyCallout({ children }: { children: string }) {
  return (
    <div className="flex w-full max-w-[720px] animate-fade-up items-start justify-start rounded-none border border-gray-dark p-8">
      <p className="w-full text-pretty font-mono text-body-h2 text-white">{children}</p>
    </div>
  );
}
