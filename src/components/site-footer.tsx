import { author } from "@/lib/site";
import { ContactIcon } from "@/components/contact-icon";

export function SiteFooter() {
  return (
    <footer className="w-full border-t border-stroke-dark">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-4 px-6 py-6 text-center md:flex-row md:items-center md:px-10 md:text-left lg:px-16">
        <p className="w-full text-body-h2 text-white/70 md:w-auto md:flex-1">
          © Analdo Gomez / 2026
        </p>
        <div className="flex shrink-0 items-center justify-center gap-4">
          <a
            href={`mailto:${author.email}`}
            target="_blank"
            className="inline-flex items-center gap-2 text-body-h2 text-white transition-colors duration-200 hover:text-white/60 active:text-white/40"
          >
            <span aria-hidden="true" className="flex size-4 shrink-0 items-center justify-center">
              <ContactIcon name="mail" />
            </span>
            Contact me
          </a>
          <a
            href={author.linkedIn}
            target="_blank"
            className="inline-flex items-center gap-2 text-body-h2 text-white transition-colors duration-200 hover:text-white/60 active:text-white/40"
          >
            <span aria-hidden="true" className="flex size-4 shrink-0 items-center justify-center">
              <ContactIcon name="linkedin" />
            </span>
            LinkedIn
          </a>
          <a
            href={author.github}
            target="_blank"
            className="inline-flex items-center gap-2 text-body-h2 text-white transition-colors duration-200 hover:text-white/60 active:text-white/40"
          >
            <span aria-hidden="true" className="flex size-4 shrink-0 items-center justify-center">
              <ContactIcon name="github" />
            </span>
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
