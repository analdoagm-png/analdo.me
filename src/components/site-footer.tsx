export function SiteFooter() {
  return (
    <footer className="w-full border-t border-stroke-dark">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-4 px-6 py-6 text-center md:flex-row md:items-center md:px-10 md:text-left lg:items-start lg:px-16 lg:py-16 lg:h-40">
        <p className="w-full text-body-h2 text-white/70 md:w-auto md:flex-1">
          © Analdo Gomez / 2026
        </p>
        <div className="flex shrink-0 items-center justify-center gap-4">
          <a
            href="mailto:analdoagm@gmail.com?subject="
            target="_blank"
            className="text-body-h2 text-white transition-colors duration-200 hover:text-white/60 active:text-white/40"
          >
            / Contact me
          </a>
          <a
            href="https://www.linkedin.com/in/analdo-gomez-17768a3b"
            target="_blank"
            className="text-body-h2 text-white transition-colors duration-200 hover:text-white/60 active:text-white/40"
          >
            / LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
