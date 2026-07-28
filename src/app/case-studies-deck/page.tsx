import type { Metadata } from "next";
import { CaseStudiesDeck } from "@/components/case-studies-deck";

export const metadata: Metadata = {
  title: "Case Study Decks | Analdo Gomez",
  description:
    "A presentation-ready walkthrough of the GoRight Merlin Platform and Arrowhead Transit Intranet case studies.",
};

export default function CaseStudiesDeckPage() {
  return <CaseStudiesDeck />;
}
