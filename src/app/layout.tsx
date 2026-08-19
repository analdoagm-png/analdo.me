import type { Metadata } from "next";
import { Noto_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import {
  author,
  expertise,
  profiles,
  siteDescription,
  siteName,
  siteTitle,
  siteUrl,
  titleTemplate,
} from "@/lib/site";
import "./globals.css";

/**
 * Two-family type system, split by function rather than by scale: Noto Sans
 * is everything you read (headings, prose, descriptions), JetBrains Mono is
 * everything you operate or scan (nav, standalone links, chips, meta labels
 * and values, counters). This replaced a three-tier setup whose display face
 * was Space Grotesk — see DESIGN.md's Typography section. Both are variable
 * Google fonts, so no `weight` array is passed; arbitrary CSS font-weight
 * values interpolate across each family's variable range.
 */
const notoSans = Noto_Sans({
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  display: "swap",
  fallback: ["ui-monospace", "Menlo", "Consolas", "monospace"],
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

/**
 * No `alternates.canonical` here on purpose: metadata is shallow-merged, so a
 * canonical set at the layout level would be inherited by every child route
 * that forgets to override it. Each route declares its own.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: titleTemplate,
  },
  description: siteDescription,
  openGraph: {
    type: "website",
    siteName,
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

/**
 * `Person` is the primary entity for a portfolio site; `WebSite` points back at
 * it as publisher so search and AI engines resolve one entity, not two.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: author.name,
      jobTitle: author.jobTitle,
      description: siteDescription,
      url: siteUrl,
      email: `mailto:${author.email}`,
      address: {
        "@type": "PostalAddress",
        addressCountry: author.country,
      },
      knowsAbout: expertise,
      sameAs: profiles,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${notoSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-dark-primary">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
