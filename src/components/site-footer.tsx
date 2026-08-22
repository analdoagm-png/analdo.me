import { contactLinks } from "@/lib/site";
import { ContactIcon } from "@/components/contact-icon";

/**
 * Icon-only contact links at every breakpoint (24x24 boxes around 16px
 * glyphs) — previously the labels reappeared from `md` up; now the footer
 * stays this compact everywhere, matching the mobile design's density
 * instead of switching to a labelled row at `md`.
 *
 * The labels stay in the DOM as `sr-only` rather than being swapped for
 * `aria-label`, so each link keeps its accessible name. `before:-inset-2`
 * widens the touch target to 40px without affecting layout, at every
 * breakpoint now that there's no wider labelled row to make it unnecessary.
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
              className="relative inline-flex items-center justify-center gap-2 p-1 font-mono text-body-h2 text-white transition-colors duration-200 before:absolute before:-inset-2 before:content-[''] hover:text-white/60 active:text-white/40"
            >
              <span aria-hidden="true" className="flex size-4 shrink-0 items-center justify-center">
                <ContactIcon name={icon} />
              </span>
              <span className="sr-only">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
