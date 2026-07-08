export function CaseStudyCallout({ children }: { children: string }) {
  return (
    <div className="flex w-full items-center justify-center rounded-xl border border-gray-dark p-8">
      <p className="text-body-h1 text-white">{children}</p>
    </div>
  );
}
