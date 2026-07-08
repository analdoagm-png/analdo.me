import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CaseStudyCard } from "@/components/case-study-card";
import { ShowcaseRow } from "@/components/showcase-row";

const featuredCaseStudies = [
  {
    href: "/case-studies/arrowhead-transit",
    image: "/images/arrowhead-transit.png",
    title: "Arrowhead Transit",
    description:
      "Rebuilt Arrowhead Transit's single-file Access database into a live dispatch platform, extending booking horizon from 2-3 days to 2+ weeks.",
  },
  {
    href: "/case-studies/goright",
    image: "/images/goright.png",
    title: "GoRight",
    description:
      "Replaced GoRight's inconsistent web/mobile dispatch tool with one live system — 4 of 5 beta transportation companies stayed on as testers.",
  },
];

const showcaseCaseStudies = [
  {
    href: "/case-studies/forty5park",
    image: "/images/forty5park.png",
    title: "Forty5Park",
    description:
      "AI-powered platform for real estate companies to manage acquisitions, forecast property valuations up to a year ahead, and benchmark against sector peers.",
  },
  {
    href: "/case-studies/uber-suite",
    image: "/images/uber-suite.png",
    title: "Uber Suite",
    description:
      "An all-in-one internal toolset for Uber, streamlining communication, boosting employee engagement, and enabling fast, AI-driven knowledge discovery across the organization.",
  },
  {
    href: "/case-studies/github-security-findings",
    image: "/images/github-security.png",
    title: "Github's Security Findings",
    description:
      "GH's Security Findings helps CTOs and managers ensure code security and reliability by tracking alerts, notifying the right stakeholders, and guiding issues to resolution through a clear, streamlined workflow.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto w-full max-w-[1280px] px-6 pt-16 pb-12 md:px-16 md:pt-40 md:pb-16">
          <div className="flex flex-col items-start gap-6">
            <h1 className="max-w-[884px] text-[32px] leading-[1.15] font-semibold text-white md:text-heading-h2">
              Over a decade of solving complex B2B problems with clear
              thinking, fewer steps, and better outcomes.
            </h1>
            <p className="max-w-[599px] text-body-h1 text-white/70">
              Based in Colombia, working globally.
            </p>
            <div className="flex flex-wrap items-start gap-6">
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
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-12 px-6 pb-16 md:gap-16 md:px-16 md:pb-16">
          <h2 className="w-full text-heading-h5 text-white">Case Studies</h2>

          <div className="flex w-full flex-col gap-12 md:flex-row md:gap-16">
            {featuredCaseStudies.map((cs) => (
              <CaseStudyCard key={cs.href} {...cs} />
            ))}
          </div>

          <div className="h-px w-full bg-gray-dark" />

          <h2 className="w-full text-heading-h5 text-white">Showcase</h2>

          <div className="flex w-full flex-col gap-12 md:gap-16">
            {showcaseCaseStudies.map((cs) => (
              <ShowcaseRow key={cs.href} {...cs} />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
