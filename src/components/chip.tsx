export function Chip({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-gray-dark bg-stroke-dark px-3 py-1 text-body-h3 whitespace-nowrap text-white/75">
      {label}
    </span>
  );
}
