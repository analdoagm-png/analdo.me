import type { Metadata } from "next";
import { CaseStudiesDeck } from "@/components/case-studies-deck";
import { siteName, titleTemplate } from "@/lib/site";

const deckDescription =
  "A presentation-ready walkthrough of the GoRight Merlin Platform and Arrowhead Transit Intranet case studies.";

const deckTitle = "Case Study Decks";

/**
 * Presentation-only route: its slides duplicate the case-study pages and render
 * client-side, so it is kept out of the index and the sitemap while staying
 * followable. The name suffix comes from the root layout's title template.
 *
 * `openGraph`/`twitter` are restated here for the same reason `/about` restates
 * them: Next replaces `openGraph` wholesale instead of deep-merging, so a route
 * that omits it inherits the layout's object verbatim — including `url: "/"`,
 * which would preview this link as the homepage. Noindex doesn't help here;
 * sharing the deck link is the whole point of the route.
 */
export const metadata: Metadata = {
  title: deckTitle,
  description: deckDescription,
  alternates: {
    canonical: "/case-studies-deck",
  },
  openGraph: {
    type: "website",
    siteName,
    title: titleTemplate.replace("%s", deckTitle),
    description: deckDescription,
    url: "/case-studies-deck",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: titleTemplate.replace("%s", deckTitle),
    description: deckDescription,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function CaseStudiesDeckPage() {
  return <CaseStudiesDeck />;
}
