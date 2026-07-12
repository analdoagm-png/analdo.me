export function CaseStudyCallout({ children }: { children: string }) {
  return (
    <div className="flex w-full animate-fade-up items-center justify-center rounded-xl border border-gray-dark p-8">
      <p className="text-balance text-body-h1 text-white">{children}</p>
    </div>
  );
}
