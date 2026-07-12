import Link from "next/link";

function ArrowBackIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
        fill="currentColor"
      />
    </svg>
  );
}

export function CaseStudyHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-stroke-dark bg-dark-primary">
      <a
        href="#main-content"
        className="skip-link rounded-token border border-stroke-dark bg-dark-primary px-4 py-2 text-body-h2 text-white"
      >
        Skip to content
      </a>
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-6 py-4 md:px-10 lg:px-16">
        <Link
          href="/"
          className="group flex items-center gap-3 text-white transition-colors duration-200 hover:text-white/60 active:text-white/40"
        >
          <span className="inline-flex transition-transform duration-200 group-hover:-translate-x-0.5 group-active:-translate-x-1">
            <ArrowBackIcon />
          </span>
          <span className="text-body-h3">Back to portfolio</span>
        </Link>
        <p className="hidden text-body-h2 text-right md:block">
          <span className="text-white">Analdo Gomez</span>
          <span className="text-white/70"> / Senior Product Designer</span>
        </p>
      </div>
    </header>
  );
}
