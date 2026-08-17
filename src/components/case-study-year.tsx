import { Chip } from "@/components/chip";

/**
 * Labelled year for a case study, matching the Role/Tools chip grammar in
 * `CaseStudyProjectHeader`. Uses a real `<time>` element so the date is machine
 * readable, and year-only precision because that is all that is known.
 */
export function CaseStudyYear({ year }: { year: number }) {
  return (
    <div className="flex flex-col items-start gap-1.5">
      <Chip label="Year" size="sm" />
      <time dateTime={String(year)} className="text-body-h2 text-white">
        {year}
      </time>
    </div>
  );
}
