import type { ReactNode } from "react";

export function Chip({
  label,
  icon,
}: {
  label: string;
  icon?: ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-body-h3 whitespace-nowrap text-white/72">
      {icon ? (
        <span aria-hidden="true" className="flex size-3.5 shrink-0 items-center justify-center">
          {icon}
        </span>
      ) : null}
      {label}
    </span>
  );
}
