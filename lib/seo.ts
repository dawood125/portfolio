import { experience, profile, SITE_URL } from "./content";

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** The canonical Person entity — every other schema points back to it by @id. */
export const personSchema = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: profile.name,
  alternateName: profile.nameUrdu,
  url: SITE_URL,
  image: `${SITE_URL}/media/og-portrait.jpg`,
  jobTitle: "Full-Stack & GenAI Developer",
  description:
    "Full-stack developer (React, Next.js, Node.js, Laravel) with applied GenAI. Builds POS and inventory systems, websites, Shopify stores and RAG assistants for clients in Pakistan, Japan and India.",
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  address: { "@type": "PostalAddress", addressLocality: "Sheikhupura", addressRegion: "Punjab", addressCountry: "PK" },
  worksFor: { "@type": "Organization", name: experience[0].org },
  alumniOf: { "@type": "CollegeOrUniversity", name: "University of the Punjab" },
  award: `${profile.credential.title}, HEC / NCEAC Generative AI Training (${profile.credential.year})`,
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    name: "Generative AI Application Developer Certificate",
    credentialCategory: "certificate",
    recognizedBy: { "@type": "Organization", name: "HEC / NCEAC" },
    identifier: profile.credential.certificateId,
  },
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Express",
    "Laravel",
    "MongoDB",
    "MySQL",
    "SQLite",
    "Electron",
    "Shopify",
    "Retrieval-augmented generation",
    "Pinecone",
    "Groq",
  ],
  sameAs: [profile.github, profile.linkedin],
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: SITE_URL,
  name: "Dawood Ahmed — Full-Stack & GenAI Developer",
  inLanguage: "en",
  publisher: { "@id": PERSON_ID },
  about: { "@id": PERSON_ID },
};

export const breadcrumbs = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${SITE_URL}${it.path}` })),
});

export const graph = (...nodes: object[]) => ({ "@context": "https://schema.org", "@graph": nodes });

/** Search-snippet length: cut at a word boundary, ≤ 158 characters. */
export function snippet(text: string, max = 158) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}
