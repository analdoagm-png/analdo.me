export function SiteFooter() {
  return (
    <footer className="w-full">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 px-6 py-12 md:flex-row md:items-start md:gap-4 md:px-16 md:py-16">
        <p className="text-body-h2 text-white/70 md:flex-1">
          © Analdo Gomez / 2026
        </p>
        <a
          href="mailto:analdoagm@gmail.com?subject="
          target="_blank"
          className="text-body-h2 text-white"
        >
          / Contact me
        </a>
        <a
          href="https://www.linkedin.com/in/analdo-gomez-17768a3b"
          target="_blank"
          className="text-body-h2 text-white"
        >
          / LinkedIn
        </a>
      </div>
    </footer>
  );
}
