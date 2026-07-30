/**
 * Labelled year for a case study, matching the ROLE/TOOLS grammar in
 * `CaseStudyProjectHeader`. Uses a real `<time>` element so the date is machine
 * readable, and year-only precision because that is all that is known.
 */
export function CaseStudyYear({ year }: { year: number }) {
  return (
    <div className="flex flex-col items-start">
      <p className="text-body-h3 text-white/70">YEAR</p>
      <time dateTime={String(year)} className="text-body-h2 text-white">
        {year}
      </time>
    </div>
  );
}
