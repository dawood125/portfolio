import type { Metadata } from "next";
import { Anton, Instrument_Serif, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Anton({ subsets: ["latin"], weight: ["400"], variable: "--font-display" });
const serifIt = Instrument_Serif({ subsets: ["latin"], weight: ["400"], style: ["italic", "normal"], variable: "--font-serifit" });
const body = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Dawood Ahmed — Full-Stack Developer (MERN · Next.js · Laravel · GenAI)",
  description:
    "Dawood Ahmed ships live business systems with Laravel API range and applied GenAI. 3+ years, 25+ projects, 4 live sites, NCEAC Top Performer 2026. Available Q4 2026, Lahore PK · remote worldwide.",
  metadataBase: new URL("https://dawoodahmed.dev"),
  openGraph: {
    title: "Dawood Ahmed — Full-Stack Developer shipping live systems",
    description: "MERN · Next.js · Laravel · GenAI — 4 live sites, 25+ projects.",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Dawood Ahmed — Full-Stack Developer", description: "Live systems + AI agents." },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Dawood Ahmed",
      jobTitle: "Full Stack Developer",
      email: "mailto:dawood.bhatti8812@gmail.com",
      address: { "@type": "PostalAddress", addressLocality: "Sheikhupura", addressCountry: "PK" },
      sameAs: ["https://github.com/dawood125", "https://linkedin.com/in/dawood-ahmed-8953b63a2"],
      knowsAbout: ["React", "Next.js", "Laravel", "Node.js", "RAG", "LangChain"],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${serifIt.variable} ${body.variable} ${mono.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
