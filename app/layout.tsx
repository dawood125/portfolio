import type { Metadata, Viewport } from "next";
import { Host_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_URL } from "@/lib/content";
import { graph, personSchema, websiteSchema } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import { tierScript } from "@/lib/motion";
import { getBuildInfo } from "@/lib/build-info";
import Header from "@/components/Header";
import SmoothScroll from "@/components/SmoothScroll";
import SiteFooter from "@/components/SiteFooter";
import TrackClicks from "@/components/TrackClicks";
import RouteEffects from "@/components/RouteEffects";
import "./globals.css";

const sans = Host_Grotesk({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: { default: "Dawood Ahmed — Full-Stack & GenAI Developer", template: "%s" },
  description:
    "Dawood Ahmed is a full-stack & GenAI developer in Pakistan building live business systems (Next.js, Node.js, Laravel) and RAG assistants. Open to work.",
  applicationName: "Dawood Ahmed",
  authors: [{ name: "Dawood Ahmed", url: SITE_URL }],
  creator: "Dawood Ahmed",
  category: "technology",
  openGraph: {
    title: "Dawood Ahmed — Full-Stack & GenAI Developer",
    description: "Live client systems, applied GenAI, and a portfolio you can question.",
    type: "profile",
    siteName: "Dawood Ahmed",
    locale: "en_US",
    url: SITE_URL,
    firstName: "Dawood",
    lastName: "Ahmed",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dawood Ahmed — Full-Stack & GenAI Developer",
    description: "Live client systems, applied GenAI, and a portfolio you can question.",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

export const viewport: Viewport = {
  themeColor: "#EDECE8",
};

const jsonLd = graph(personSchema, websiteSchema);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: tierScript }} />
        <JsonLd data={jsonLd} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SmoothScroll />
        <Header />
        {children}
        <SiteFooter build={getBuildInfo()} />
        <TrackClicks />
        <RouteEffects />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
