/**
 * Plain-CSS recreation of the "capability mapping" flowchart used in
 * GoRight's Challenges section — replaces `process-pair-2.png` (a ~150KB
 * Whimsical export, output at a fixed 746×952 raster size regardless of
 * viewport) with real markup that costs nothing to ship and stays crisp at
 * any size. Content-only change: same nodes,
 * same hierarchy (Asset Sensors → Merlin Analytics → Browser/Mobile →
 * Fleet/Operations Managers → each role's capability list), same caption.
 *
 * Recolored to the site's own dark, achromatic system (`bg-white/[0.06]`
 * cards, `border-white/15`, muted connecting lines) rather than copying the
 * original export's light background — a light card floating in an
 * otherwise all-dark case study read as an unstyled island. No new accent
 * color introduced for the "Merlin Analytics" node (the original's teal
 * fill); it's distinguished with a stronger fill/border instead, matching
 * the sitewide rule against project-specific accent colors.
 *
 * Every box-to-box connector is a fixed-height line with **zero gap**
 * around it (the parent stack uses `gap-0`, not a uniform `gap-*`) so the
 * line's own ends actually touch the boxes above/below it — a uniform
 * flex `gap` here would leave empty space on both sides of each line
 * instead of a connected arrow. The one deliberate exception is the
 * capability list under each manager node, which gets real spacing
 * (`mt-6`) since the original diagram doesn't connect those with a line
 * either — they're a loose grouping, not a hierarchy.
 *
 * Two columns from `md` up (mirroring the site's usual breakpoint for
 * branching layouts); a single stacked column below it, since two narrow
 * columns of capability labels ("Active Communication and Support") don't
 * have room to breathe at mobile widths. The branching split connector
 * (one line down from Merlin Analytics, a horizontal bar, two lines back
 * down into each branch) only renders at `md`+ for that reason — mobile
 * gets one plain line into its stacked branch order instead.
 *
 * `aria-hidden` on every connecting line (decorative) — the chart's real
 * content is exposed as an ordered, real list structure so it reads
 * sensibly without the visual, not just as a captioned image.
 */

function Node({
  children,
  emphasis = false,
}: {
  children: string;
  emphasis?: boolean;
}) {
  return (
    <div
      className={`w-full max-w-[220px] rounded-token border px-4 py-3 text-center font-mono text-body-h3 ${
        emphasis
          ? "border-white/30 bg-white/[0.12] font-bold text-white"
          : "border-white/15 bg-white/[0.06] text-white"
      }`}
    >
      {children}
    </div>
  );
}

function VLine({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`h-6 w-px self-center bg-white/15 ${className}`}
    />
  );
}

/** The one line down from Merlin Analytics, a horizontal bar, then one line back down into each branch — `md`+ only. */
function SplitConnector() {
  return (
    <div
      aria-hidden="true"
      className="relative hidden h-12 w-full md:block"
    >
      <div className="absolute top-0 left-1/2 h-1/2 w-px -translate-x-1/2 bg-white/15" />
      <div className="absolute inset-x-1/4 top-1/2 border-t border-white/15" />
      <div className="absolute top-1/2 left-1/4 h-1/2 w-px bg-white/15" />
      <div className="absolute top-1/2 right-1/4 h-1/2 w-px bg-white/15" />
    </div>
  );
}

function LeafList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 flex w-full max-w-[220px] flex-col gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-token border border-dashed border-white/20 px-3 py-2 text-center font-mono text-body-h3 text-white/70"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

export function GoRightCapabilityChart() {
  return (
    <figure className="flex w-full max-w-[1280px] animate-fade-up flex-col items-start gap-2">
      <div className="flex w-full flex-col items-center gap-0 rounded-token border border-stroke-dark bg-stroke-dark p-6 md:p-10">
        <Node>Asset Sensors</Node>
        <VLine />
        <Node emphasis>Merlin Analytics</Node>

        <SplitConnector />
        <VLine className="md:hidden" />

        <div className="grid w-full grid-cols-1 items-start justify-items-center gap-10 md:grid-cols-2">
          <div className="flex w-full flex-col items-center gap-0">
            <Node>Browser Based Platform</Node>
            <VLine />
            <Node>Fleet Managers</Node>
            <LeafList
              items={[
                "Budget Optimization",
                "Fleet Uptime/Downtime",
                "Geo Location Tracking",
                "Fleet Maintenance",
              ]}
            />
          </div>
          <div className="flex w-full flex-col items-center gap-0">
            <Node>Mobile Platform</Node>
            <VLine />
            <Node>Operations Managers</Node>
            <LeafList
              items={[
                "Fleet Availability",
                "Trip and Post-Trip Details",
                "Active Communication and Support",
                "Driver Roll Call",
              ]}
            />
          </div>
        </div>
      </div>
      <figcaption className="w-full text-center font-mono text-body-h3 text-white/70">
        Capability mapping — what a dispatcher can do versus what a
        technician can, across both platforms.
      </figcaption>
    </figure>
  );
}
