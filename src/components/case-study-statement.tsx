export function CaseStudyStatement({
  lead,
  emphasis,
  maxWidthClassName = "md:max-w-[600px] lg:max-w-[657px]",
}: {
  lead: string;
  emphasis: string;
  maxWidthClassName?: string;
}) {
  return (
    <div className="flex w-full max-w-[720px] flex-col items-center">
      <div className="flex w-full items-center justify-center md:hidden">
        <p className="w-full animate-fade-up text-balance font-mono text-heading-h5 font-bold text-white">
          {lead}
          {emphasis}
        </p>
      </div>
      <div className="hidden w-full items-center justify-center py-8 md:flex lg:py-16">
        <p
          className={`w-full animate-fade-up text-balance text-center font-mono text-heading-h2 text-white ${maxWidthClassName}`}
        >
          <span className="font-normal">{lead}</span>
          <span className="font-bold">{emphasis}</span>
        </p>
      </div>
    </div>
  );
}
