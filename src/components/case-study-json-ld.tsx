import { getCaseStudy } from "@/lib/case-studies";
import { siteUrl } from "@/lib/site";

/**
 * Per-case-study structured data. `CreativeWork` rather than `Article`: these
 * are portfolio pieces, not journalism, and Article rich results would not
 * apply. `author` and `isPartOf` point at the `@id`s declared by the root
 * layout's graph, so engines resolve one Person and one WebSite across the page.
 */
export function CaseStudyJsonLd({ currentHref }: { currentHref: string }) {
  const caseStudy = getCaseStudy(currentHref);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${siteUrl}${caseStudy.href}#case-study`,
    name: caseStudy.title,
    description: caseStudy.description,
    url: `${siteUrl}${caseStudy.href}`,
    image: `${siteUrl}${caseStudy.image}`,
    datePublished: String(caseStudy.year),
    inLanguage: "en",
    keywords: caseStudy.chips.join(", "),
    author: { "@id": `${siteUrl}/#person` },
    creator: { "@id": `${siteUrl}/#person` },
    isPartOf: { "@id": `${siteUrl}/#website` },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
