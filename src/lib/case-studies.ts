import type { Metadata } from "next";
import { siteName, titleTemplate } from "@/lib/site";

export type CaseStudy = {
  href: string;
  image: string;
  title: string;
  description: string;
  chips: string[];
  /** Year the work shipped. Year-only on purpose — no invented month or day. */
  year: number;
};

/**
 * Single source of truth for the homepage card grid and `app/sitemap.ts`, so a
 * new case study cannot be listed on the homepage but missing from the sitemap.
 */
export const caseStudies: CaseStudy[] = [
  {
    href: "/case-studies/goright",
    image: "/images/goright.png",
    title: "GoRight",
    description:
      "Replaced GoRight's inconsistent web/mobile dispatch tool with one live system — 4 of 5 beta transportation companies stayed on as paying customers.",
    chips: ["Case Study", "Dispatch", "Desktop", "Mobile"],
    year: 2022,
  },
  {
    href: "/case-studies/arrowhead-transit",
    image: "/images/arrowhead-transit.png",
    title: "Arrowhead Transit",
    description:
      "Rebuilt Arrowhead Transit's single-file Access database into a live dispatch platform, extending booking and tracking across web and mobile.",
    chips: ["Case Study", "Dispatch", "Desktop"],
    year: 2019,
  },
  {
    href: "/case-studies/forty5park",
    image: "/images/forty5park.png",
    title: "Forty5Park",
    description:
      "AI-powered platform for real estate companies to manage acquisitions, forecast property valuations using machine learning, and streamline due diligence workflows.",
    chips: ["Showcase", "Real Estate", "AI", "Desktop"],
    year: 2026,
  },
  {
    href: "/case-studies/uber-suite",
    image: "/images/uber-suite.png",
    title: "Uber Suite",
    description:
      "An all-in-one internal toolset for Uber, streamlining communication, boosting employee engagement, and simplifying operations across global teams.",
    chips: ["Showcase", "Enterprise", "Desktop", "Mobile"],
    year: 2018,
  },
  {
    href: "/case-studies/github-security-findings",
    image: "/images/github-security.png",
    title: "Github's Security Findings",
    description:
      "GH's Security Findings helps CTOs and managers ensure code security and reliability by tracking alerts, vulnerabilities, and dependency risks across repositories.",
    chips: ["Showcase", "Security", "Desktop"],
    year: 2025,
  },
];

/**
 * Looks up a case study by route. Throws at build time rather than returning
 * undefined, so a typo'd `href` fails the build loudly instead of silently
 * shipping a page with no share image or structured data.
 */
export function getCaseStudy(href: string): CaseStudy {
  const caseStudy = caseStudies.find((entry) => entry.href === href);

  if (!caseStudy) {
    throw new Error(`No case study registered for "${href}"`);
  }

  return caseStudy;
}

/**
 * Builds per-case-study metadata so all five pages share one Open Graph and
 * Twitter Card shape, using the project's existing cover image as the share
 * card. Next.js replaces `openGraph` wholesale rather than deep-merging it with
 * the root layout, so `siteName` and `locale` are repeated here on purpose.
 */
export function caseStudyMetadata({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}): Metadata {
  const caseStudy = getCaseStudy(href);

  // The root layout's title template applies to `title`, but not to
  // `openGraph.title`, so resolve it here rather than hardcoding the suffix.
  const socialTitle = titleTemplate.replace("%s", title);

  return {
    title,
    description,
    alternates: {
      canonical: href,
    },
    openGraph: {
      type: "article",
      siteName,
      title: socialTitle,
      description,
      url: href,
      locale: "en_US",
      publishedTime: String(caseStudy.year),
      images: [
        {
          url: caseStudy.image,
          alt: `${caseStudy.title} case study cover image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
    },
  };
}

/**
 * Next case study in `caseStudies` order, wrapping around at the end so every
 * case study has an onward link and none of them is a crawl dead end.
 */
export function getNextCaseStudy(href: string): CaseStudy {
  const index = caseStudies.findIndex((entry) => entry.href === href);

  if (index === -1) {
    throw new Error(`No case study registered for "${href}"`);
  }

  return caseStudies[(index + 1) % caseStudies.length];
}
