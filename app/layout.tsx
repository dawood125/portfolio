import type { Metadata, Viewport } from "next";
import { Host_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { profile, SITE_URL } from "@/lib/content";
import { tierScript } from "@/lib/motion";
import "./globals.css";

const sans = Host_Grotesk({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: "Dawood Ahmed — Full-Stack & GenAI Developer",
  description:
    "Dawood Ahmed builds the business systems clients run every day (Laravel, Next.js, MERN) and the AI that answers for them. Sheikhupura, Pakistan. Available for full-time and freelance work.",
  openGraph: {
    title: "Dawood Ahmed — Full-Stack & GenAI Developer",
    description: "Live client systems, applied GenAI, and a portfolio you can question.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#EDECE8",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  url: SITE_URL,
  name: profile.name,
  alternateName: profile.nameUrdu,
  jobTitle: "Full-Stack & GenAI Developer",
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Sheikhupura", addressCountry: "PK" },
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: ["Next.js", "React", "Laravel", "Node.js", "MongoDB", "MySQL", "RAG", "LangChain", "LangGraph"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: tierScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
