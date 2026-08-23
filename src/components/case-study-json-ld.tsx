import { getCaseStudy } from "@/lib/case-studies";
import { siteUrl } from "@/lib/site";

/**
 * Per-case-study structured data: `CreativeWork` plus a two-level
 * `BreadcrumbList` (Home → case study). `CreativeWork` rather than
 * `Article`: these are portfolio pieces, not journalism, and Article rich
 * results would not apply. `author` and `isPartOf` point at the `@id`s
 * declared by the root layout's graph, so engines resolve one Person and one
 * WebSite across the page.
 *
 * `BreadcrumbList` is two levels, not three, because the site's own
 * structure is two levels — case studies sit directly off `/` (there's no
 * `/case-studies` index route to name as a middle crumb; the homepage
 * itself is the "Works" index, per the persistent sidebar's `/ Works` link).
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

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: caseStudy.title,
        item: `${siteUrl}${caseStudy.href}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
