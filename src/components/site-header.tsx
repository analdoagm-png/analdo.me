import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-stroke-dark bg-dark-primary">
      <a
        href="#main-content"
        className="skip-link rounded-token border border-stroke-dark bg-dark-primary px-4 py-2 text-body-h2 text-white"
      >
        Skip to content
      </a>
      <div className="mx-auto w-full max-w-[1280px] px-6 py-4 md:px-10 lg:px-16">
        {/*
          The name is two-tone, so its spans would override a parent text-colour
          change. It dims with opacity instead to keep the tonal relationship.
        */}
        <Link
          href="/"
          className="inline-block text-body-h2 transition-opacity duration-200 hover:opacity-60 active:opacity-40"
        >
          <span className="text-white">Analdo Gomez</span>
          <span className="text-white/70"> / Senior Product Designer</span>
        </Link>
      </div>
    </header>
  );
}
