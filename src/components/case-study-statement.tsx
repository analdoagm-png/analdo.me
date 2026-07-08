export function CaseStudyStatement({
  lead,
  emphasis,
}: {
  lead: string;
  emphasis: string;
}) {
  return (
    <div className="flex w-full items-center justify-center py-8 lg:py-16">
      <p className="w-full text-center text-[40px] leading-[48px] tracking-[0.8px] text-white md:max-w-[600px] lg:max-w-[657px]">
        <span className="font-normal">{lead}</span>
        <span className="font-semibold">{emphasis}</span>
      </p>
    </div>
  );
}
