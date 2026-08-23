import type { Metadata } from "next";
import { Space_Grotesk, Noto_Sans, JetBrains_Mono } from "next/font/google";
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
 * Three-tier type system (replaces the old single-family Inconsolata setup):
 * Space Grotesk for display/heading-scale text, Noto Sans for reading body
 * copy and links, JetBrains Mono for labels/chips/captions/meta. All three
 * are variable Google fonts, so — like the previous Inconsolata setup — no
 * `weight` array is passed; arbitrary CSS font-weight values interpolate
 * across each family's variable range.
 */
const spaceGrotesk = Space_Grotesk({
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

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
      className={`${spaceGrotesk.variable} ${notoSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
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
