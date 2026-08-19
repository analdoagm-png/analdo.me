import type { ReactNode } from "react";

/**
 * `md` is the original size: homepage `CaseStudyCard` metadata tags and
 * About's skills chips. `sm` is the smaller variant, now used only by
 * `CaseStudyDecisionBlock`'s per-block label — same border/fill/font system,
 * tighter padding. Text size never shrinks between the two: `text-body-h3`
 * is already the site's 14px minimum readable size.
 *
 * A chip means "this is a tag with a value of its own". Role/Tools/Year used
 * `sm` too until they moved to `CaseStudyMetaLabel`, since those labels only
 * name the line beneath them rather than carrying a value.
 */
const sizeClasses = {
  md: "gap-1.5 px-3 py-1.5",
  sm: "gap-1 px-2 py-1",
} as const;

const iconSizeClasses = {
  md: "size-3.5",
  sm: "size-3",
} as const;

export function Chip({
  label,
  icon,
  size = "md",
}: {
  label: string;
  icon?: ReactNode;
  size?: "sm" | "md";
}) {
  return (
    <span
      className={`inline-flex items-center rounded-token border border-white/15 bg-white/[0.04] font-mono text-body-h3 whitespace-nowrap text-white/72 ${sizeClasses[size]}`}
    >
      {icon ? (
        <span
          aria-hidden="true"
          className={`flex shrink-0 items-center justify-center ${iconSizeClasses[size]}`}
        >
          {icon}
        </span>
      ) : null}
      {label}
    </span>
  );
}
