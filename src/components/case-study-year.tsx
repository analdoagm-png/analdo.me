import { CaseStudyMetaLabel } from "@/components/case-study-meta-label";

/**
 * Labelled year for a case study, matching the Role/Tools grammar in
 * `CaseStudyProjectHeader`. Uses a real `<time>` element so the date is machine
 * readable, and year-only precision because that is all that is known.
 */
export function CaseStudyYear({ year }: { year: number }) {
  return (
    <div className="flex flex-col items-start gap-2">
      <CaseStudyMetaLabel>Year</CaseStudyMetaLabel>
      <time dateTime={String(year)} className="font-mono text-body-h2 text-white">
        {year}
      </time>
    </div>
  );
}
