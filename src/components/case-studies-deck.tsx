"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type ProjectKey = "goright" | "arrowhead";
type SlideKind =
  | "cover"
  | "problem"
  | "signal"
  | "decisions"
  | "process"
  | "platform"
  | "platform-views"
  | "results"
  | "close";

type Project = {
  key: ProjectKey;
  title: string;
  subtitle: string;
  role: string;
  route: string;
  thumbnailImage: string;
  thumbnailAlt: string;
  coverImage: string;
  coverAlt: string;
  intro: string;
  problemTitle: string;
  problems: Array<{ title: string; detail: string }>;
  signal: string;
  signalDetail: string;
  decisionTitle: string;
  decisions: Array<{ title: string; detail: string; image: string; alt: string }>;
  processTitle: string;
  processDetail: string;
  processImages: Array<{ src: string; alt: string }>;
  platformTitle: string;
  platformDetail: string;
  platformImage: string;
  platformAlt: string;
  platformViews: Array<{ src: string; alt: string; label: string }>;
  results: Array<{ value: string; detail: string }>;
  closingTitle: string;
  closingDetail: string;
};

const projects: Record<ProjectKey, Project> = {
  goright: {
    key: "goright",
    title: "GoRight",
    subtitle: "Merlin Platform",
    role: "Lead Product Designer",
    route: "/case-studies/goright",
    thumbnailImage: "/images/goright.png",
    thumbnailAlt: "GoRight Merlin Platform portfolio thumbnail.",
    coverImage: "/images/goright/exhibit.png",
    coverAlt:
      "Previous GoRight screens showing different desktop and mobile visual languages.",
    intro:
      "A field-service platform where technicians needed a live answer before making another phone call.",
    problemTitle: "Technicians could not see their next task",
    problems: [
      {
        title: "Two products, two languages",
        detail: "Desktop and mobile used inconsistent patterns, creating avoidable support calls.",
      },
      {
        title: "No live update on the road",
        detail: "Technicians called supervisors just to confirm a location or the next step.",
      },
      {
        title: "Status lived across tools",
        detail: "Managers pieced together on-road activity from multiple places and manual reports.",
      },
    ],
    signal: "One live signal, shared by everyone.",
    signalDetail:
      "Merlin gave technicians, managers, and reporting the same current status, instead of three versions of the truth.",
    decisionTitle: "The work was shaped by use, not just visual consistency",
    decisions: [
      {
        title: "Tasks lead. KPIs support.",
        detail:
          "An early KPI-heavy homepage hid the reason technicians opened the app. The layout was rebalanced around immediate tasks.",
        image: "/images/goright/decision-1-figure.png",
        alt: "Product ideation showing the KPI-first GoRight homepage under review.",
      },
      {
        title: "Navigation became simpler after testing.",
        detail:
          "A crowded navigation direction was reversed after workshops showed it made the product harder to scan.",
        image: "/images/goright/decision-2-figure.png",
        alt: "Workshop notes documenting the GoRight navigation reversal.",
      },
    ],
    processTitle: "Audit first. Workshop with the people on the road. Then design.",
    processDetail:
      "The information architecture, capability map, and breakdown journey were aligned before desktop and mobile screens were designed.",
    processImages: [
      {
        src: "/images/goright/process-pair-1.png",
        alt: "Merlin sitemap defining navigation and permission boundaries.",
      },
      {
        src: "/images/goright/process-pair-2.png",
        alt: "Capability map across desktop and mobile roles.",
      },
      {
        src: "/images/goright/process-wide.png",
        alt: "On-road breakdown journey from dispatch through arrival.",
      },
    ],
    platformTitle: "A live system for the whole operation",
    platformDetail:
      "Task counts, activity, reporting, and technician work now use one consistent product language and one source of status.",
    platformImage: "/images/goright/platform-desktop-1.png",
    platformAlt: "Merlin dashboard showing task counts and submitted versus received activity.",
    platformViews: [
      {
        src: "/images/goright/platform-desktop-2.png",
        alt: "Merlin task list showing on-road jobs by status.",
        label: "Task list",
      },
      {
        src: "/images/goright/platform-desktop-3.png",
        alt: "Merlin task detail view with live route tracking.",
        label: "Live task detail",
      },
      {
        src: "/images/goright/platform-desktop-4.png",
        alt: "Merlin technician task queue shown across mobile and desktop contexts.",
        label: "Technician task queue",
      },
      {
        src: "/images/goright/platform-desktop-5.png",
        alt: "Merlin task activity shown across mobile and desktop contexts.",
        label: "Mobile and desktop activity",
      },
    ],
    results: [
      {
        value: "4 of 5",
        detail: "Beta transportation companies agreed to continue as testers.",
      },
      {
        value: "New revenue path",
        detail: "Real-time tracking and geo-localization opened doors to additional capabilities.",
      },
      {
        value: "One system",
        detail: "A shared component library replaced divergent mobile and desktop patterns.",
      },
    ],
    closingTitle: "Technicians stopped calling it in.",
    closingDetail:
      "The rebrand delivered more than new colors. It made the live operational signal available to the people who needed it.",
  },
  arrowhead: {
    key: "arrowhead",
    title: "Arrowhead Transit",
    subtitle: "Intranet",
    role: "Lead Product Designer",
    route: "/case-studies/arrowhead-transit",
    thumbnailImage: "/images/arrowhead-transit.png",
    thumbnailAlt: "Arrowhead Transit Intranet portfolio thumbnail.",
    coverImage: "/images/arrowhead-transit/exhibit.png",
    coverAlt: "The previous Arrowhead Transit Access database interface.",
    intro:
      "A rural healthcare transit network replacing one shared Access file with a live dispatch platform.",
    problemTitle: "The entire operation depended on one file",
    problems: [
      {
        title: "One file, one desk",
        detail: "The schedule was copied by hand between computers, with no login or remote access.",
      },
      {
        title: "Every ride typed twice",
        detail: "Dispatchers manually entered each leg, which limited planning to a few days at a time.",
      },
      {
        title: "Changes moved by phone call",
        detail: "Drivers and dispatch had no shared online system for schedules or updates.",
      },
    ],
    signal: "One system of record, visible at once.",
    signalDetail:
      "Dispatch, drivers, and billing could act from the same live schedule instead of passing details through phones, paper, and files.",
    decisionTitle: "Every workflow was designed around the person who could act on it",
    decisions: [
      {
        title: "Read-only, except where drivers know best.",
        detail:
          "Drivers could view routes and logs, while only dispatch edited operations. Time and odometer fields stayed editable for the people on-site.",
        image: "/images/arrowhead-transit/decision-1-figure.png",
        alt: "Arrowhead Transit sitemap showing permission boundaries by role.",
      },
      {
        title: "External referrals got one landing place.",
        detail:
          "An Incoming Trips queue made outside referrals visible as they arrived, rather than leaving dispatch to hunt through multiple systems.",
        image: "/images/arrowhead-transit/decision-2-figure.png",
        alt: "Arrowhead Transit incoming trips queue management interface.",
      },
    ],
    processTitle: "Dispatchers' daily work became the design brief",
    processDetail:
      "A design audit and interviews led to golden-path flows and a sitemap that clarified who could see, edit, and act before screens were created.",
    processImages: [
      {
        src: "/images/arrowhead-transit/process-1.png",
        alt: "Design audit linking requirements to dispatch workflow impact.",
      },
      {
        src: "/images/arrowhead-transit/process-2.png",
        alt: "Sitemap defining Arrowhead Transit view and edit permissions.",
      },
      {
        src: "/images/arrowhead-transit/process-3.png",
        alt: "Golden-path flow from booking through dispatch and completion.",
      },
    ],
    platformTitle: "Dispatch, drivers, and billing now work in the same place",
    platformDetail:
      "One dashboard replaces the database file with a live view of this week's trips, incoming referrals, and available drivers.",
    platformImage: "/images/arrowhead-transit/platform-1.png",
    platformAlt: "Arrowhead Transit dashboard showing this week's trips and available drivers.",
    platformViews: [
      {
        src: "/images/arrowhead-transit/platform-2.png",
        alt: "Arrowhead Transit incoming referrals queue showing new ride requests.",
        label: "Incoming trips queue",
      },
      {
        src: "/images/arrowhead-transit/platform-3.png",
        alt: "Arrowhead Transit trip detail with a live route map.",
        label: "Trip detail",
      },
      {
        src: "/images/arrowhead-transit/platform-4.png",
        alt: "Arrowhead Transit driver tracking view with an active route.",
        label: "Driver tracking",
      },
    ],
    results: [
      {
        value: "2-3 days to 2+ weeks",
        detail: "Dispatchers gained a booking horizon they could plan against.",
      },
      {
        value: "Real-time",
        detail: "Driver tracking replaced phone and SMS check-ins.",
      },
      {
        value: "Mostly automated",
        detail: "Manual entry was largely eliminated from the workflow.",
      },
    ],
    closingTitle: "The database is gone.",
    closingDetail:
      "The new platform lets a rural transit network plan further ahead, see drivers in the system, and act on every referral in one queue.",
  },
};

const slideKinds: SlideKind[] = [
  "cover",
  "problem",
  "signal",
  "decisions",
  "process",
  "platform",
  "platform-views",
  "results",
  "close",
];

function DeckImage({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative min-w-0 overflow-hidden rounded-token-xl bg-[#1a1a1a] ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 90vw, 72vw"
        className="object-contain"
      />
    </div>
  );
}

function ExpandableImage({
  src,
  alt,
  label,
  className = "",
  wrapperClassName = "",
  onExpand,
}: {
  src: string;
  alt: string;
  label: string;
  className?: string;
  wrapperClassName?: string;
  onExpand: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onExpand}
      aria-label={`Open ${label} in a larger view`}
      className={`group block w-full min-w-0 text-left outline-none ${wrapperClassName}`}
    >
      <DeckImage
        src={src}
        alt={alt}
        className={`${className} transition-transform duration-500 ease-out group-hover:scale-[1.01] group-active:scale-[0.99]`}
      />
    </button>
  );
}

function SlideEyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-body-h3 font-medium text-white/58">{children}</p>;
}

function ProjectSlide({
  project,
  kind,
  onExpand,
}: {
  project: Project;
  kind: SlideKind;
  onExpand: (media: { src: string; alt: string; label: string }) => void;
}) {
  if (kind === "cover") {
    return (
      <div className="grid h-full items-center gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="flex max-w-xl flex-col items-start gap-5">
          <SlideEyebrow>{project.role}</SlideEyebrow>
          <div className="flex flex-col gap-2">
            <h1 className="text-balance text-[clamp(3rem,7vw,6.5rem)] font-semibold leading-[0.94] tracking-[-0.065em] text-white">
              {project.title}
            </h1>
            <p className="text-project-subtitle text-white/70">{project.subtitle}</p>
          </div>
          <p className="max-w-[32rem] text-pretty text-body-h1 text-white/72">{project.intro}</p>
        </div>
        <DeckImage
          src={project.coverImage}
          alt={project.coverAlt}
          priority
          className="aspect-[4/3] w-full lg:aspect-[16/10]"
        />
      </div>
    );
  }

  if (kind === "problem") {
    return (
      <div className="grid h-full items-center gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <div className="flex max-w-md flex-col gap-5">
          <SlideEyebrow>The problem</SlideEyebrow>
          <h2 className="text-balance text-[clamp(2.6rem,5.3vw,5.5rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-white">
            {project.problemTitle}
          </h2>
        </div>
        <div className="deck-stagger grid gap-0 divide-y divide-white/15 border-y border-white/15">
          {project.problems.map((problem, index) => (
            <div key={problem.title} className="grid gap-3 py-5 md:grid-cols-[3.5rem_1fr] md:gap-6 md:py-7">
              <p className="text-heading-h5 text-white/42">0{index + 1}</p>
              <div className="flex max-w-xl flex-col gap-2">
                <h3 className="text-heading-h4 text-white">{problem.title}</h3>
                <p className="text-pretty text-body-h2 text-white/68">{problem.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (kind === "signal") {
    return (
      <div className="flex h-full items-center">
        <div className="max-w-5xl">
          <SlideEyebrow>The design move</SlideEyebrow>
          <h2 className="mt-5 text-balance text-[clamp(3.2rem,8vw,8.5rem)] font-semibold leading-[0.91] tracking-[-0.075em] text-white">
            {project.signal}
          </h2>
          <p className="mt-8 max-w-2xl text-pretty text-body-h1 text-white/70 md:text-[1.35rem]">
            {project.signalDetail}
          </p>
        </div>
      </div>
    );
  }

  if (kind === "decisions") {
    return (
      <div className="flex h-full max-h-full flex-col justify-center gap-5 lg:gap-6">
        <div className="max-w-3xl">
          <SlideEyebrow>Two decisions</SlideEyebrow>
          <h2 className="mt-3 text-balance text-[clamp(2.25rem,4vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-white">
            {project.decisionTitle}
          </h2>
        </div>
        <div className="deck-stagger grid gap-5 lg:grid-cols-2 lg:gap-6">
          {project.decisions.map((decision) => (
            <figure key={decision.title} className="flex min-w-0 flex-col gap-4">
              <ExpandableImage
                src={decision.image}
                alt={decision.alt}
                label={decision.title}
                className="aspect-[16/10] w-full lg:h-[clamp(11rem,27vh,20rem)] lg:aspect-auto"
                onExpand={() => onExpand({ src: decision.image, alt: decision.alt, label: decision.title })}
              />
              <figcaption className="flex max-w-xl flex-col gap-1.5">
                <h3 className="text-heading-h5 text-white">{decision.title}</h3>
                <p className="text-pretty text-body-h2 text-white/65">{decision.detail}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    );
  }

  if (kind === "process") {
    return (
      <div className="grid h-full items-center gap-8 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
        <div className="flex max-w-md flex-col gap-5">
          <SlideEyebrow>How I got there</SlideEyebrow>
          <h2 className="text-balance text-[clamp(2.4rem,4.6vw,4.75rem)] font-semibold leading-[0.99] tracking-[-0.06em] text-white">
            {project.processTitle}
          </h2>
          <p className="text-pretty text-body-h1 text-white/68">{project.processDetail}</p>
        </div>
        <div className="deck-stagger grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
          {project.processImages.map((image, index) => (
            <ExpandableImage
              key={image.src}
              src={image.src}
              alt={image.alt}
              label={`Process view ${index + 1}`}
              className={
                index === 2
                  ? "aspect-[16/7] w-full lg:h-[clamp(6.5rem,15vh,12rem)] lg:aspect-auto"
                  : "aspect-[4/3] w-full lg:h-[clamp(7.5rem,17vh,14rem)] lg:aspect-auto"
              }
              wrapperClassName={index === 2 ? "sm:col-span-2" : ""}
              onExpand={() => onExpand({ src: image.src, alt: image.alt, label: `Process view ${index + 1}` })}
            />
          ))}
        </div>
      </div>
    );
  }

  if (kind === "platform") {
    return (
      <div className="grid h-full items-center gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-16">
        <ExpandableImage
          src={project.platformImage}
          alt={project.platformAlt}
          label={`${project.title} platform overview`}
          className="aspect-[16/10] w-full"
          onExpand={() =>
            onExpand({
              src: project.platformImage,
              alt: project.platformAlt,
              label: `${project.title} platform overview`,
            })
          }
        />
        <div className="flex max-w-md flex-col gap-5">
          <SlideEyebrow>The platform</SlideEyebrow>
          <h2 className="text-balance text-[clamp(2.4rem,4.5vw,4.75rem)] font-semibold leading-[0.99] tracking-[-0.06em] text-white">
            {project.platformTitle}
          </h2>
          <p className="text-pretty text-body-h1 text-white/68">{project.platformDetail}</p>
        </div>
      </div>
    );
  }

  if (kind === "platform-views") {
    return (
      <div className="flex h-full max-h-full flex-col justify-center gap-5 lg:gap-6">
        <div className="max-w-3xl">
          <SlideEyebrow>More platform views</SlideEyebrow>
          <h2 className="mt-3 text-balance text-[clamp(2.25rem,4vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-white">
            Explore the workflows in more detail.
          </h2>
        </div>
        <div
          className={`deck-stagger grid min-w-0 gap-4 sm:grid-cols-2 lg:gap-5 ${
            project.platformViews.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
          }`}
        >
          {project.platformViews.map((view) => (
            <figure key={view.src} className="min-w-0">
              <ExpandableImage
                src={view.src}
                alt={view.alt}
                label={view.label}
                className="aspect-[16/10] w-full lg:h-[clamp(9rem,24vh,17rem)] lg:aspect-auto"
                onExpand={() => onExpand(view)}
              />
            </figure>
          ))}
        </div>
      </div>
    );
  }

  if (kind === "results") {
    return (
      <div className="flex h-full flex-col justify-center gap-10 lg:gap-16">
        <div className="max-w-3xl">
          <SlideEyebrow>Results</SlideEyebrow>
          <h2 className="mt-3 text-balance text-[clamp(2.7rem,5.8vw,6rem)] font-semibold leading-[0.96] tracking-[-0.065em] text-white">
            The change showed up in how the operation could run.
          </h2>
        </div>
        <div className="deck-stagger grid gap-8 divide-y divide-white/15 border-y border-white/15 py-7 md:grid-cols-3 md:divide-x md:divide-y-0 md:py-0">
          {project.results.map((result) => (
            <div key={result.value} className="flex flex-col gap-3 py-3 md:px-7 md:py-8 first:md:pl-0 last:md:pr-0">
              <p className="text-balance text-[clamp(2rem,3.7vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.05em] text-white">
                {result.value}
              </p>
              <p className="text-pretty text-body-h2 text-white/68">{result.detail}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full items-center">
      <div className="max-w-5xl">
        <SlideEyebrow>Outcome</SlideEyebrow>
        <h2 className="mt-5 text-balance text-[clamp(3.2rem,8vw,8rem)] font-semibold leading-[0.91] tracking-[-0.075em] text-white">
          {project.closingTitle}
        </h2>
        <p className="mt-8 max-w-2xl text-pretty text-body-h1 text-white/70 md:text-[1.35rem]">
          {project.closingDetail}
        </p>
      </div>
    </div>
  );
}

export function CaseStudiesDeck() {
  const [projectKey, setProjectKey] = useState<ProjectKey | null>(null);
  const [slideIndex, setSlideIndex] = useState(0);
  const [activeMedia, setActiveMedia] = useState<{ src: string; alt: string; label: string } | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const project = projectKey ? projects[projectKey] : null;
  const slideKind = project ? slideKinds[slideIndex] : null;
  const isFirstSlide = slideIndex === 0;
  const isLastSlide = slideIndex === slideKinds.length - 1;

  const selectProject = (key: ProjectKey) => {
    setProjectKey(key);
    setSlideIndex(0);
  };

  const chooseAnotherProject = useCallback(() => {
    setProjectKey(null);
    setSlideIndex(0);
    setActiveMedia(null);
  }, []);

  const nextSlide = useCallback(() => {
    if (isLastSlide) {
      chooseAnotherProject();
      return;
    }

    setSlideIndex((current) => current + 1);
  }, [chooseAnotherProject, isLastSlide]);

  const previousSlide = useCallback(() => {
    if (isFirstSlide) {
      chooseAnotherProject();
      return;
    }

    setSlideIndex((current) => current - 1);
  }, [chooseAnotherProject, isFirstSlide]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!project || activeMedia) return;

      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        nextSlide();
      }

      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        previousSlide();
      }

      if (event.key === "Home") {
        event.preventDefault();
        setSlideIndex(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        setSlideIndex(slideKinds.length - 1);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeMedia, nextSlide, previousSlide, project]);

  useEffect(() => {
    if (!activeMedia) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveMedia(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [activeMedia]);

  useEffect(() => {
    headingRef.current?.focus();
  }, [projectKey, slideIndex]);

  return (
    <main id="main-content" className="h-[100dvh] w-full min-w-0 overflow-hidden bg-dark-primary text-white">
      <a className="skip-link rounded-token bg-white px-4 py-2 text-body-h3 text-dark-primary" href="#deck-content">
        Skip to presentation
      </a>

      <div className="flex h-full w-full min-w-0 flex-col overflow-hidden py-6 md:py-8 lg:py-10">
        <header className="flex w-full shrink-0 items-center justify-between gap-6 border-b border-white/12 px-6 pb-4 text-body-h3 text-white/62 md:px-10 md:pb-5 lg:px-16">
          <p>Analdo Gomez</p>
          {project ? (
            <button
              type="button"
              onClick={chooseAnotherProject}
              className="transition-colors duration-200 hover:text-white active:text-white/40"
            >
              Choose a case study
            </button>
          ) : (
            <p className="hidden sm:block">Selected case studies</p>
          )}
        </header>

        <div id="deck-content" className="flex min-h-0 w-full flex-1 px-6 py-8 md:px-10 md:py-10 lg:px-16 lg:py-12">
          {!project ? (
            <section className="flex h-full min-h-0 w-full min-w-0 flex-col justify-center" aria-labelledby="deck-chooser-title">
              <div className="min-w-0 max-w-3xl">
                <SlideEyebrow>Case study deck</SlideEyebrow>
                <h1
                  ref={headingRef}
                  id="deck-chooser-title"
                  tabIndex={-1}
                  className="mt-3 max-w-full text-balance text-[clamp(2.75rem,6vw,6rem)] font-semibold leading-[0.91] tracking-[-0.075em] outline-none"
                >
                  Choose a case study.
                </h1>
                <p className="mt-6 max-w-xl text-pretty text-body-h1 text-white/70">
                  Two operational systems rebuilt around clearer information, better decisions, and the people doing the work.
                </p>
              </div>

              <div className="mt-8 grid min-w-0 gap-6 lg:mt-10 lg:grid-cols-2 lg:gap-10">
                {(Object.values(projects) as Project[]).map((caseStudy) => (
                  <button
                    key={caseStudy.key}
                    type="button"
                    onClick={() => selectProject(caseStudy.key)}
                    className="group flex min-w-0 max-w-full flex-col items-start gap-5 text-left outline-none"
                  >
                    <DeckImage
                      src={caseStudy.thumbnailImage}
                      alt={caseStudy.thumbnailAlt}
                      className="aspect-[2/1] w-full transition-transform duration-500 ease-out group-hover:scale-[1.01] group-active:scale-[0.99]"
                    />
                    <span className="flex flex-col gap-1">
                      <span className="text-heading-h4 text-white transition-colors duration-200 group-hover:text-white/60 group-active:text-white/40">
                        {caseStudy.title}
                      </span>
                      <span className="text-body-h2 text-white/64">{caseStudy.subtitle}</span>
                    </span>
                  </button>
                ))}
              </div>
            </section>
          ) : (
            <section className="h-full min-h-0 w-full" aria-live="polite" aria-atomic="true" aria-labelledby="slide-title">
              <div className="flex h-full min-h-0 w-full items-stretch">
                <h2 id="slide-title" ref={headingRef} tabIndex={-1} className="sr-only outline-none">
                  {project.title}, slide {slideIndex + 1} of {slideKinds.length}
                </h2>
                <div key={`${project.key}-${slideIndex}`} className="h-full min-h-0 w-full overflow-hidden animate-deck-slide">
                  <ProjectSlide project={project} kind={slideKind!} onExpand={setActiveMedia} />
                </div>
              </div>
            </section>
          )}
        </div>

        {project ? (
          <footer className="flex w-full shrink-0 items-center justify-between gap-5 border-t border-white/12 px-6 pt-4 md:px-10 md:pt-5 lg:px-16">
            <p className="text-body-h3 text-white/58">
              {project.title} / {slideIndex + 1} of {slideKinds.length}
            </p>
            <div className="flex items-center gap-5 text-body-h3">
              {isLastSlide ? (
                <Link
                  href={project.route}
                  className="transition-colors duration-200 hover:text-white/60 active:text-white/40"
                >
                  View full case study
                </Link>
              ) : null}
              <button
                type="button"
                onClick={previousSlide}
                className="transition-colors duration-200 hover:text-white/60 active:text-white/40 disabled:cursor-not-allowed disabled:text-white/25"
              >
                {isFirstSlide ? "Choose" : "Previous"}
              </button>
              <button
                type="button"
                onClick={nextSlide}
                className="rounded-token border border-white/22 px-3 py-1.5 text-white transition-colors duration-200 hover:border-white/45 hover:text-white/70 active:text-white/40"
              >
                {isLastSlide ? "Choose another" : "Next"}
              </button>
            </div>
          </footer>
        ) : null}
      </div>

      {activeMedia ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${activeMedia.label} larger view`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/88 p-6 md:p-10 lg:p-16"
          onClick={() => setActiveMedia(null)}
        >
          <div
            className="flex h-full w-full max-w-[1600px] flex-col gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-5">
              <p className="text-body-h3 text-white/70">{activeMedia.label}</p>
              <button
                type="button"
                autoFocus
                onClick={() => setActiveMedia(null)}
                className="rounded-token border border-white/22 px-3 py-1.5 text-body-h3 text-white transition-colors duration-200 hover:border-white/45 hover:text-white/70 active:text-white/40"
              >
                Close
              </button>
            </div>
            <div className="relative min-h-0 flex-1 overflow-hidden rounded-token-xl bg-[#181818]">
              <Image
                src={activeMedia.src}
                alt={activeMedia.alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
