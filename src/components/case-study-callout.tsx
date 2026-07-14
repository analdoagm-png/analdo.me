export function CaseStudyCallout({ children }: { children: string }) {
  return (
    <div className="flex w-full animate-fade-up items-start justify-start rounded-xl border border-gray-dark p-8">
      <p className="w-full text-pretty text-body-h1 text-white">{children}</p>
    </div>
  );
}
