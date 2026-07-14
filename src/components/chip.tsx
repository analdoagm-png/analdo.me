export function Chip({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-body-h3 whitespace-nowrap text-white/72">
      {label}
    </span>
  );
}
