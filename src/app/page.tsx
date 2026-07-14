import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CaseStudyCard } from "@/components/case-study-card";
import { Chip } from "@/components/chip";

const caseStudies = [
  {
    href: "/case-studies/goright",
    image: "/images/goright.png",
    title: "GoRight",
    description:
      "Replaced GoRight's inconsistent web/mobile dispatch tool with one live system — 4 of 5 beta transportation companies stayed on as paying customers.",
    chips: ["Case Study", "Dispatch", "Desktop", "Mobile"],
  },
  {
    href: "/case-studies/arrowhead-transit",
    image: "/images/arrowhead-transit.png",
    title: "Arrowhead Transit",
    description:
      "Rebuilt Arrowhead Transit's single-file Access database into a live dispatch platform, extending booking and tracking across web and mobile.",
    chips: ["Case Study", "Dispatch", "Desktop"],
  },
  {
    href: "/case-studies/forty5park",
    image: "/images/forty5park.png",
    title: "Forty5Park",
    description:
      "AI-powered platform for real estate companies to manage acquisitions, forecast property valuations using machine learning, and streamline due diligence workflows.",
    chips: ["Showcase", "Real Estate", "AI", "Desktop"],
  },
  {
    href: "/case-studies/uber-suite",
    image: "/images/uber-suite.png",
    title: "Uber Suite",
    description:
      "An all-in-one internal toolset for Uber, streamlining communication, boosting employee engagement, and simplifying operations across global teams.",
    chips: ["Showcase", "Enterprise", "Desktop", "Mobile"],
  },
  {
    href: "/case-studies/github-security-findings",
    image: "/images/github-security.png",
    title: "Github's Security Findings",
    description:
      "GH's Security Findings helps CTOs and managers ensure code security and reliability by tracking alerts, vulnerabilities, and dependency risks across repositories.",
    chips: ["Showcase", "Security", "Desktop"],
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="main-content" className="flex-1">
        <section className="mx-auto w-full max-w-[1280px] px-6 pt-12 pb-16 md:px-10 md:pt-16 lg:px-16 lg:pt-40">
          <div className="flex flex-col items-start gap-6">
            <h1 className="w-full animate-fade-up text-balance text-heading-h4 text-white md:text-heading-h2 lg:max-w-[884px]">
              Over a decade of solving complex B2B problems with clear
              thinking, fewer steps, and better outcomes.
            </h1>
            <div className="flex flex-wrap items-center gap-2 animate-fade-up [animation-delay:100ms]">
              <p className="text-body-h1 text-white/70">
                Based in Colombia, working globally with
              </p>
              <span className="inline-flex items-center">
                <Chip label="Figma" />
                <span className="text-body-h1 text-white/70">,</span>
              </span>
              <Chip label="Claude" />
              <span className="text-body-h1 text-white/70">&</span>
              <Chip label="Codex" />
            </div>
            <div className="flex flex-wrap items-start gap-6 animate-fade-up [animation-delay:200ms]">
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
        </section>

        <section className="mx-auto w-full max-w-[1280px] px-6 pb-16 md:px-10 lg:px-16">
          <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            {caseStudies.map((cs, index) => (
              <CaseStudyCard
                key={cs.href}
                {...cs}
                priority={index === 0}
                style={{ animationDelay: `${index * 70}ms` }}
              />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
