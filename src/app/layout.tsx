import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Analdo Gomez / Senior Product Designer",
  description:
    "Over a decade of solving complex B2B problems with clear thinking, fewer steps, and better outcomes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-dark-primary">
        {children}
      </body>
    </html>
  );
}
