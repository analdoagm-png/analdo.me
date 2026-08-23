/**
 * Section eyebrow + heading, matching Figma's editorial frame exactly:
 * a 24px medium-weight eyebrow (not the small uppercase-tracking mono
 * label used for ROLE/TOOLS/meta elsewhere), then a 32px bold title.
 * `text-overline` is the closest existing token to that 24px eyebrow
 * weight/size, reused here rather than introducing a one-off value.
 */
export function CaseStudySectionHeading({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="flex w-full max-w-[720px] animate-fade-up flex-col items-start">
      <p className="w-full font-mono text-overline font-medium text-white/70">{eyebrow}</p>
      <h2 className="w-full text-balance font-mono text-heading-h3 font-bold text-white">
        {title}
      </h2>
    </div>
  );
}
