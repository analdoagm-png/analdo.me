export function CaseStudyPointsGrid({
  items,
}: {
  items: { number: string; title: string; description: string }[];
}) {
  return (
    <div className="flex w-full flex-col items-start gap-12 md:flex-row">
      {items.map((item) => (
        <div
          key={item.number}
          className="flex w-full flex-col items-start gap-2 md:flex-1 md:min-w-0"
        >
          <p className="text-body-h1 text-white" aria-hidden="true">
            {item.number}
          </p>
          <h3 className="w-full text-heading-h5 text-white">{item.title}</h3>
          <p className="w-full text-body-h2 text-white/70">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
