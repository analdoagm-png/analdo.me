import { contactLinks } from "@/lib/site";
import { ContactIcon } from "@/components/contact-icon";

/**
 * Icon-only contact links on mobile *and* desktop, with the labelled row
 * kept only at `md` (tablet): `sr-only` (mobile) → `md:not-sr-only`
 * (tablet) → `lg:sr-only` (desktop) toggles the label off, on, then off
 * again as the three tiers step up. Mobile is unchanged from its original
 * behaviour; only the `lg` end is new — a labelled row read as too wide
 * next to the wider `lg` gutters, so desktop drops back to icon-only same
 * as mobile.
 *
 * The labels stay in the DOM as `sr-only` rather than being swapped for
 * `aria-label`, so each link keeps its accessible name at every breakpoint,
 * and the markup stays one element instead of splitting into conditional
 * branches. The 24px icon box reproduces the design's spacing exactly, so
 * the touch target is widened to 40px with `before:absolute before:-inset-2`
 * (no layout effect) whenever the row is icon-only (mobile and `lg`), and
 * dropped at `md` where the visible label already makes the target large
 * enough. 40px rather than a full 44px is deliberate: the design's 16px
 * gaps put adjacent centers 40px apart, so anything larger would make
 * neighbouring hit areas overlap.
 *
 * Both the copyright line and the links sit in the mono voice: the links are
 * controls, the copyright is scannable meta text, and mono keeps the one row
 * reading as a single register.
 */
export function SiteFooter() {
  return (
    <footer className="w-full border-t border-stroke-dark">
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-6 py-6 md:px-10 lg:px-16">
        <p className="font-mono text-body-h2 text-white/70">© Analdo Gomez / 2026</p>
        <div className="flex shrink-0 items-center gap-4">
          {contactLinks.map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              className="relative inline-flex items-center justify-center gap-2 p-1 font-mono text-body-h2 text-white transition-colors duration-200 before:absolute before:-inset-2 before:content-[''] hover:text-white/60 active:text-white/40 md:p-0 md:before:content-none lg:p-1 lg:before:content-['']"
            >
              <span aria-hidden="true" className="flex size-4 shrink-0 items-center justify-center">
                <ContactIcon name={icon} />
              </span>
              <span className="sr-only md:not-sr-only lg:sr-only">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
