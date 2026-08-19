/**
 * The one label style for case-study meta (Role / Tools / Year), shared by
 * `CaseStudyProjectHeader` and `CaseStudyYear` so the editorial and showcase
 * pages can't drift apart.
 *
 * Plain uppercase mono, no pill: these labels used to be `Chip size="sm"`,
 * but a bordered pill reads as a tag — something with a value of its own —
 * when it's really just naming the line underneath it. Same treatment as
 * About's `DESIGN` / `FRONT-END & TOOLS` group labels.
 */
export function CaseStudyMetaLabel({ children }: { children: string }) {
  return (
    <p className="font-mono text-body-h3 tracking-[0.05em] text-white/70 uppercase">
      {children}
    </p>
  );
}
