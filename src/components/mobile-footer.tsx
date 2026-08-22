import { ContactGlyph } from "@/components/contact-glyph";
import { author } from "@/lib/site";

/**
 * Mobile-only (`md:hidden`) footer for pages using the new sidebar system —
 * copyright + icon-only social links, matching the Figma redesign's
 * separate `site-footer` node. From `md` up, `HomeSidebar`'s own copyright
 * line covers that role instead, so this never renders alongside it.
 *
 * Extracted out of the homepage's `page.tsx` once a second page
 * (Forty5Park) needed the identical block — first pass had it inline since
 * there was only one caller.
 */
export function MobileFooter() {
  return (
    <div className="flex items-center justify-between border-t border-stroke-dark px-6 py-6 md:hidden">
      <p className="font-mono text-body-h2 text-white/70">© Analdo Gomez / 2026</p>
      <div className="flex items-center gap-4">
        <a
          href={`mailto:${author.email}`}
          target="_blank"
          aria-label="Email"
          className="flex size-6 items-center justify-center text-white transition-colors duration-200 hover:text-white/60 active:text-white/40"
        >
          <span className="flex size-4 items-center justify-center">
            <ContactGlyph name="mail" />
          </span>
        </a>
        <a
          href={author.linkedIn}
          target="_blank"
          aria-label="LinkedIn"
          className="flex size-6 items-center justify-center text-white transition-colors duration-200 hover:text-white/60 active:text-white/40"
        >
          <span className="flex size-4 items-center justify-center">
            <ContactGlyph name="linkedin" />
          </span>
        </a>
        <a
          href={author.github}
          target="_blank"
          aria-label="GitHub"
          className="flex size-6 items-center justify-center text-white transition-colors duration-200 hover:text-white/60 active:text-white/40"
        >
          <span className="flex size-4 items-center justify-center">
            <ContactGlyph name="github" />
          </span>
        </a>
      </div>
    </div>
  );
}
