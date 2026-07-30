import type { Metadata } from "next";
import { CaseStudiesDeck } from "@/components/case-studies-deck";

/**
 * Presentation-only route: its slides duplicate the case-study pages and render
 * client-side, so it is kept out of the index and the sitemap while staying
 * followable. The name suffix comes from the root layout's title template.
 */
export const metadata: Metadata = {
  title: "Case Study Decks",
  description:
    "A presentation-ready walkthrough of the GoRight Merlin Platform and Arrowhead Transit Intranet case studies.",
  alternates: {
    canonical: "/case-studies-deck",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CaseStudiesDeckPage() {
  return <CaseStudiesDeck />;
}
