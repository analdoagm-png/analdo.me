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
      <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-4 px-6 py-4 md:px-16">
        <Link
          href="/"
          className="flex items-center gap-3 text-white"
        >
          <ArrowBackIcon />
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
