export function Chip({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-gray-dark bg-stroke-dark px-3 py-1 text-xs font-bold whitespace-nowrap text-white/70">
      {label}
    </span>
  );
}
