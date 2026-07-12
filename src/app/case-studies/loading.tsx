export default function CaseStudyLoading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-dark-primary">
      <div
        className="size-2 animate-pulse rounded-full bg-white/40"
        aria-hidden="true"
      />
      <span className="sr-only">Loading case study…</span>
    </div>
  );
}
