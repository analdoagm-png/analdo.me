export function CaseStudyPointsGrid({
  items,
}: {
  items: { number: string; title: string; description: string }[];
}) {
  return (
    <div className="flex w-full flex-col items-start gap-12 md:flex-row">
      {items.map((item, index) => (
        <div
          key={item.number}
          className="flex w-full flex-col items-start gap-2 animate-fade-up md:flex-1 md:min-w-0"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <p className="text-body-h1 text-white" aria-hidden="true">
            {item.number}
          </p>
          <h3 className="w-full text-balance text-heading-h5 text-white">
            {item.title}
          </h3>
          <p className="w-full text-pretty text-body-h2 text-white/70">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
