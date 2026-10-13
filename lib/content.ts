// Single source of truth for every fact on the site and in the Ask corpus.
// Rule (DESIGN.md): only facts Dawood can back up. Leave a field out rather than guess.
// Sources: Dawood's CV, his own case-study write-ups, the public GitHub repos (READMEs, package.json),
// and the live sites. The agency he co-founded is deliberately not named on this personal site.

/** Canonical origin. Must match Vercel's primary domain (www; the apex 308-redirects to it). */
export const SITE_URL = "https://www.dawoodahmed.dev";

export const profile = {
  name: "Dawood Ahmed",
  nameUrdu: "داؤد احمد",
  role: "Full-stack & GenAI developer",
  location: "Sheikhupura, near Lahore, Pakistan",
  timezone: "Asia/Karachi",
  tzLabel: "PKT · UTC+5",
  availability: "Available now — full-time (remote or on-site) and freelance",
  experience: "3+ years",
  projectsShipped: "25+",
  credential: {
    title: "Generative AI Application Developer — Top Performer",
    issuer: "HEC / NCEAC Generative AI Training Cohort 2, issued by UETIANS Lahore Endowment Foundation (USA)",
    year: 2026,
    certificateId: "068c44dd77b77ef2",
  },
  email: "dawood.bhatti8812@gmail.com",
  phone: "+92 326 1959755",
  whatsapp: "https://wa.me/923261959755",
  github: "https://github.com/dawood125",
  linkedin: "https://linkedin.com/in/dawood-ahmed-8953b63a2",
  cv: "/Dawood_Ahmed_CV.pdf",
  /**
   * 20-second intro: words by Dawood; animated character, video and voice generated with Veo 3 (Gemini) from his photo.
   * The avatar files are detected at build time (lib/intro-media.ts); without them the intro plays as a voice-over.
   */
  intro: {
    audio: "/media/intro/intro-voice.mp3",
    captions: "/media/intro/intro-captions.vtt",
    words: "/media/intro/intro-words.json",
    seconds: 20,
    disclosure: "AI-generated with Veo 3 from a photo of Dawood — the voice isn't his · words written by Dawood",
  },

  stack: {
    frontend: ["React", "Next.js (App Router, SSR)", "TypeScript", "Vite", "Tailwind CSS", "Electron (desktop)"],
    backend: ["Node.js", "Express", "Laravel 11/12 (Sanctum)", "REST APIs", "JWT auth & role checks", "WebSockets (Socket.io)"],
    data: ["MongoDB", "MySQL", "SQLite", "Pinecone (vector search)"],
    ai: ["RAG pipelines (custom chunking)", "Vector search (Pinecone)", "Embeddings", "OpenAI & Groq SDKs", "AI agent workflows", "n8n automation"],
    commerce: ["Shopify (custom themes)", "Stripe"],
    ship: ["GitHub Actions CI/CD", "VPS + PM2", "AWS EC2", "Azure VMs", "Azure DevOps"],
  },
} as const;

export const experience = [
  { role: "Full Stack Developer", org: "Techling", when: "Jun 2026 – present", note: "AI/ML-focused software house. Converted from a paid internship to full-time after evaluation (Oct 2026)." },
  { role: "Full Stack Developer", org: "Sky Waves Software House", when: "Apr 2026 – May 2026", note: "Laravel 12 + MySQL client projects, REST APIs and secure authentication." },
  { role: "Backend Developer Intern", org: "Sky Waves Software House", when: "Jan 2026 – Mar 2026", note: "Backend modules in Laravel and Node.js." },
  { role: "Freelance & client developer", org: "Independent", when: "Oct 2023 – present", note: "Client systems for businesses in Pakistan, Japan and India — see the case studies." },
  { role: "Junior Web Developer Intern", org: "RISS (Remote IT Services & Solutions)", when: "Jun 2023 – Nov 2023", note: "First professional work: training, then live client projects." },
  { role: "BS Information Technology", org: "University of the Punjab", when: "2022 – 2026", note: "Completed 2026. Final-year project: E-Masjid (backend)." },
] as const;

/* ------------------------------------------------------------------------------------------------
 * Case studies. Order = order on the site.
 * ---------------------------------------------------------------------------------------------- */

/** One horizontal band of the "Inspect" x-ray: what runs at that layer of the system. Facts only. */
export type ArchLayer = { layer: string; tech: string; does: string };

export type Work = {
  slug: string;
  name: string;
  /** Shorter name for the live board / matrix when it differs. */
  boardName?: string;
  kind: string;
  sector: string;
  /** Who it was for, as shown on the board. */
  client: string;
  location: string;
  year: string;
  status: "live" | "private" | "code" | "retired";
  role: string;
  stack: string[];
  links: { live?: string; host?: string; code?: string; note?: string };
  media: {
    image?: string;
    alt?: string;
    note?: string;
    video?: { av1: string; h264: string };
    gallery?: { src: string; alt: string; caption: string }[];
  };
  summary: string;
  problem: string;
  built: string[];
  decisions: { title: string; body: string }[];
  results: string[];
  quote?: { text: string; by: string };
  arch: ArchLayer[];
  /** Accent sampled from the client's own UI — used only inside its case study. */
  accent: string;
};

export const work: Work[] = [
  {
    slug: "aiwa-flow",
    name: "AIWA Flow",
    kind: "POS & inventory product",
    sector: "Distribution · fertilizer and FMCG",
    client: "Ibrahim Business Manager (online) · Gibs Distributor (desktop)",
    location: "Sheikhupura, Pakistan",
    year: "2026",
    status: "live",
    role: "Sole developer — product, code, deployment and installation",
    stack: ["React + TypeScript", "Vite", "Tailwind", "Node.js + Express", "SQLite (sql.js)", "Electron", "GitHub Actions → VPS"],
    links: {
      live: "https://ibrahim-solution.com/",
      host: "ibrahim-solution.com",
      code: "https://github.com/dawood125/Fertilizer-Inventory-Management-system",
      note: "The Gibs edition is an offline desktop install — demo on request.",
    },
    media: {
      image: "/media/work/aiwa-dashboard.webp",
      alt: "AIWA Flow dashboard: sales, expenses, profit, balances and stock alerts, shown with demo data",
      note: "Desktop edition, shown with demo data",
      gallery: [{ src: "/media/work/aiwa-login.webp", alt: "Ibrahim Business Manager sign-in page", caption: "The online edition at ibrahim-solution.com" }],
    },
    summary:
      "My own POS and inventory product. The same code runs online for Ibrahim Business Manager and as an offline desktop install at Gibs Distributor.",
    problem:
      "At Gibs Distributor, an FMCG distributor in Sheikhupura, stock lived in ledgers, every sale was a hand-written bill and shop debts were tracked on paper. Closing a day took hours, and there was no quick way to know what was in stock, who owed what, or whether the month had been profitable.",
    built: [
      "A fast POS counter screen for sales orders",
      "Stock with low- and out-of-stock alerts, updated automatically by purchases, sales and returns",
      "Master data for companies, brands, categories and products, with CSV product import",
      "Purchase orders, purchase returns, sales returns, suppliers and customer accounts",
      "Deliveries, routes and sales reps",
      "Expenses, profit reports and cash, bank, JazzCash and EasyPaisa balances",
      "One dashboard for sales, expenses, profit and pending payments, with PDF invoices",
      "An audit log of every change, and logins with role checks",
    ],
    decisions: [
      {
        title: "One codebase, two deployments",
        body: "The same React + Express app ships two ways: as an Electron desktop install that runs fully offline at Gibs, and as a web app on a VPS for Ibrahim Business Manager.",
      },
      {
        title: "The database is a file",
        body: "Everything is stored in SQLite through sql.js and saved to a single file, so a shop needs no database server and the desktop edition works without internet.",
      },
      {
        title: "Every change leaves a trail",
        body: "An audit log records who created, edited or deleted orders, stock, payments and cash entries — with the amounts involved.",
      },
      {
        title: "Money logic has tests",
        body: "Stock is held in product batches and drawn down oldest-first. Scripted test suites cover the batch logic, carton and unit pricing, opening balances and double-click protection.",
      },
      {
        title: "Deploys check themselves",
        body: "A push to main runs GitHub Actions: it connects to the server, builds, restarts the app under PM2 and fails the deploy if the health check doesn't answer.",
      },
    ],
    results: [
      "Hand-written registers and paper bills replaced by one system at Gibs Distributor.",
      "Stock, sales and payments managed from one dashboard.",
      "Live online for Ibrahim Business Manager.",
    ],
    quote: {
      text: "Before this, everything was in registers and handwritten bills and it was hard to keep track. Now managing the business is easy — stock, sales and payments are all in one place.",
      by: "Owner, Gibs Distributor · Sheikhupura",
    },
    arch: [
      { layer: "Interface", tech: "React + TypeScript", does: "POS counter, back office, dashboard and reports" },
      { layer: "API", tech: "Node.js + Express", does: "JWT logins, role checks, business rules, audit log" },
      { layer: "Data", tech: "SQLite via sql.js", does: "The whole database in one file — no server" },
      { layer: "Ships as", tech: "Electron · VPS + PM2", does: "Offline desktop at Gibs, web app for Ibrahim" },
    ],
    accent: "#B91C3C",
  },
  {
    slug: "sugarhills",
    name: "SugarHills Resort",
    kind: "Resort website & booking flow",
    sector: "Luxury hospitality",
    client: "Paid international client · Wayanad, Kerala, India",
    location: "Wayanad, Kerala, India",
    year: "2025",
    status: "live",
    role: "Sole developer — build and technical SEO",
    stack: ["React + TypeScript", "Vite", "Tailwind", "Node.js + Express", "MongoDB", "JWT"],
    links: { live: "https://sugarhills.in/", host: "sugarhills.in", note: "Client code is private." },
    media: {
      image: "/media/work/sugarhills.webp",
      alt: "SugarHills Resort homepage: “Wake up above the clouds.” over a misty hillside pool",
      video: { av1: "/media/work/sugarhills.av1.mp4", h264: "/media/work/sugarhills.h264.mp4" },
    },
    summary: "A cinematic site for a hilltop resort in Kerala that sells the stay — and that guests can find on their own.",
    problem:
      "The resort relied on third-party listings: guests found it through another platform's template, and the resort paid commission. It needed a site that sells the stay as well as its photographs do, and that guests can find on their own.",
    built: [
      "A photography-led homepage with an editorial serif",
      "Separate, linkable pages for cottages, experiences, offers, gallery and blog — each aimed at its own search terms",
      "A live availability flow and a booking call-to-action on every screen, connected to the resort's booking partner",
      "Enquiry handling",
      "An admin panel so the resort edits its own content",
      "Technical SEO: metadata, structured data and performance work",
    ],
    decisions: [
      { title: "One page per search", body: "Every cottage, experience and offer has its own page, so each can rank for what guests actually search for." },
      {
        title: "Book through the partner they already use",
        body: "The availability flow connects to the resort's existing booking partner instead of adding a second booking system to keep in sync.",
      },
      { title: "The site stays editable", body: "An admin panel behind JWT authentication lets the resort update its own content." },
    ],
    results: ["Strong search performance, as reported by the resort.", "Kept on for ongoing development."],
    quote: { text: "The SEO is performing well, and we're continuing to work with them on what comes next.", by: "Management, SugarHills Resort" },
    arch: [
      { layer: "Interface", tech: "React + TypeScript · Tailwind", does: "Cottages, experiences, offers, booking calls-to-action" },
      { layer: "API", tech: "Node.js + Express · JWT", does: "Content, enquiries and the authenticated admin" },
      { layer: "Data", tech: "MongoDB", does: "Cottages, offers, gallery, posts, enquiries" },
      { layer: "Booking", tech: "Resort's booking partner", does: "Live availability, one source of truth" },
    ],
    accent: "#1F4D3A",
  },
  {
    slug: "bikks",
    name: "BIKKS Trading",
    kind: "Bilingual machinery & vehicle catalogue",
    sector: "Heavy equipment",
    client: "Dealer in Japan · trading across Japan and Pakistan",
    location: "Japan",
    year: "2025",
    status: "live",
    role: "Sole developer",
    stack: ["React", "Vite", "Japanese / English"],
    links: { live: "https://biks.online/", host: "biks.online", note: "Client code is private." },
    media: {
      image: "/media/work/biks.webp",
      alt: "BIKKS Trading homepage with a featured vehicle and the Japanese / English language switcher",
      video: { av1: "/media/work/biks.av1.mp4", h264: "/media/work/biks.h264.mp4" },
    },
    summary: "A bilingual catalogue for a machinery dealer in Japan that turns browsing into qualified enquiries.",
    problem:
      "Stock changed weekly, buyers spoke different languages, and every sale began as a conversation. The dealer needed a catalogue their own team could update, in Japanese and English, that turned browsing into qualified enquiries.",
    built: [
      "A Japanese / English site with a language switcher on every page",
      "A filterable catalogue showing year, hours or mileage and fuel type",
      "A featured-stock carousel",
      "Quote and enquiry routing through the channels the market uses, including LINE and direct contact",
      "Listing management, so the team adds stock and marks it sold",
    ],
    decisions: [
      { title: "Two languages on every page", body: "The language switcher is on every page, so a buyer never lands somewhere they can't read." },
      { title: "Enquiries go where buyers already are", body: "Quote requests route through the channels this market uses, including LINE, as well as direct contact." },
      { title: "The team owns the stock list", body: "Listing management lets staff add machines and mark them sold without a developer." },
    ],
    results: ["The team keeps stock current without developer help.", "The owner referred another business in the same trade."],
    quote: { text: "The website genuinely works for our business.", by: "Owner, BIKKS Trading" },
    arch: [
      { layer: "Interface", tech: "React + Vite · JA / EN", does: "Catalogue, filters, featured stock" },
      { layer: "Enquiries", tech: "LINE + direct contact", does: "Quote requests routed to the sales team" },
      { layer: "Listings", tech: "Listing management", does: "Staff add stock and mark it sold" },
    ],
    accent: "#8C1D24",
  },
  {
    slug: "diversity",
    name: "DIVERSITY",
    kind: "Shopify store for workspace gear",
    sector: "D2C ecommerce",
    client: "Premium workspace brand · Pakistan",
    location: "Pakistan",
    year: "2025",
    status: "live",
    role: "Sole developer — custom Shopify theme",
    stack: ["Shopify", "Custom Liquid theme", "WhatsApp support"],
    links: { live: "https://diversity.pk/", host: "diversity.pk" },
    media: {
      image: "/media/work/diversity.webp",
      alt: "DIVERSITY storefront: “Your desk and everything around it!” over a dark, warm desk setup",
      video: { av1: "/media/work/diversity.av1.mp4", h264: "/media/work/diversity.h264.mp4" },
    },
    summary: "A custom Shopify theme for a premium desk-setup store, rebuilt around how people actually shop for a workspace.",
    problem:
      "DIVERSITY sells across ten categories of desk gear, and a generic theme made the catalogue feel like a warehouse. The store needed to feel premium, help shoppers build a whole setup, and earn the trust of first-time online buyers.",
    built: [
      "A custom Shopify theme with a dark, warm look that matches the product photography",
      "Collections rebuilt around setup, cables, organisation, lighting and ergonomics",
      "Merchandising and product-page design",
      "Trust signals at the decision points: reviews, a money-back guarantee and nationwide delivery",
      "A WhatsApp entry point for questions before buying",
    ],
    decisions: [
      { title: "Collections built around a desk", body: "The catalogue is grouped the way people plan a setup, not the way a warehouse stores stock." },
      { title: "Trust where people decide", body: "Reviews, the guarantee and delivery promises sit exactly where first-time buyers hesitate." },
      { title: "WhatsApp first", body: "Pakistani shoppers like to ask before they buy, so WhatsApp is always one tap away." },
    ],
    results: ["A premium storefront the brand can merchandise without a developer.", "A catalogue structure that scales to new categories."],
    arch: [
      { layer: "Interface", tech: "Custom Shopify theme", does: "Dark, warm storefront and product pages" },
      { layer: "Catalogue", tech: "Shopify collections", does: "Setup, cables, organisation, lighting, ergonomics" },
      { layer: "Support", tech: "WhatsApp", does: "Questions answered before purchase" },
    ],
    accent: "#B4802E",
  },
  {
    slug: "neuraldesk",
    name: "NeuralDesk",
    kind: "Multi-tenant AI customer-support platform",
    sector: "Applied GenAI",
    client: "Personal project · code on GitHub",
    location: "—",
    year: "2026",
    status: "code",
    role: "Sole developer",
    stack: ["Next.js", "TypeScript", "Node.js + Express", "MongoDB", "Pinecone", "OpenAI embeddings", "Groq", "Socket.io"],
    links: { code: "https://github.com/dawood125/rag-customer-support-agent" },
    media: {},
    summary:
      "A multi-tenant support platform: each business uploads its own documents, and an AI agent answers its customers from them — citing the source — in a chat widget it can embed anywhere.",
    problem:
      "Support teams answer the same questions from policies scattered across PDFs and Word files. A general chatbot doesn't know a business's own rules; NeuralDesk answers from the documents each business gives it, and shows where the answer came from.",
    built: [
      "A RAG pipeline built from scratch: PDF and Word ingestion with custom chunking",
      "OpenAI embeddings stored and searched in Pinecone",
      "Answers generated with Groq that cite their source documents",
      "Role-based, multi-tenant access for admins, agents and customers",
      "Real-time chat over Socket.io and an embeddable support widget",
      "A visual automation flow builder",
    ],
    decisions: [
      {
        title: "No framework in the middle",
        body: "Ingestion, chunking, embedding, retrieval and answering are written directly — no LangChain — so every step can be inspected and tuned.",
      },
      { title: "Every answer shows its source", body: "Replies cite the documents they came from, so an agent or a customer can check them." },
      { title: "One knowledge base per business", body: "Each tenant's documents, conversations and users are kept separate, with admin, agent and customer roles." },
    ],
    results: [
      "Code on GitHub.",
      "The Ask console on this site uses the same idea at a smaller scale: answers grounded in documents, with the sources shown.",
    ],
    arch: [
      { layer: "Ingest", tech: "pdf-parse · mammoth · custom chunking", does: "PDF and Word files split into passages" },
      { layer: "Embed", tech: "OpenAI embeddings → Pinecone", does: "Passages stored as vectors per tenant" },
      { layer: "Answer", tech: "Groq", does: "A reply grounded in the retrieved passages, with citations" },
      { layer: "Deliver", tech: "Socket.io · embeddable widget", does: "Live chat on any website" },
    ],
    accent: "#2B3FE0",
  },
  {
    slug: "e-masjid",
    name: "E-Masjid",
    kind: "Mosque management platform · final-year project",
    sector: "Community",
    client: "BS IT final-year project · University of the Punjab",
    location: "Sheikhupura, Pakistan",
    year: "2025–26",
    status: "retired",
    role: "Backend developer · team of two (frontend: Haris Ehsan)",
    stack: ["Node.js", "Express", "MongoDB (Mongoose)", "JWT (httpOnly cookie)", "Stripe (test mode)", "Resend", "PM2 + Caddy"],
    links: {
      code: "https://github.com/dawood125/E-Masjid-System",
      note: "The demo server retires in October 2026; the code and full documentation stay on GitHub.",
    },
    media: {
      image: "/media/work/emasjid.webp",
      alt: "E-Masjid home page: “Connect. Pray. Give back.” with prayer times and donation totals",
      note: "Recorded from the live demo server",
      video: { av1: "/media/work/emasjid.av1.mp4", h264: "/media/work/emasjid.h264.mp4" },
    },
    summary:
      "My BS IT final-year project: a platform that helps local mosques run donations, prayer times, events, nikah bookings and community fund requests.",
    problem:
      "Local mosques run donations, events and requests for financial help on paper and by word of mouth. The project put a mosque's daily work in one place — with each mosque's data kept strictly separate.",
    built: [
      "Roles: a manager over several masjids, an admin per masjid, committee members and community users",
      "Isolation: an admin can't see or change another masjid's data — enforced everywhere in the backend",
      "Registration with a 6-digit email code, donations (Stripe test mode), prayer times, events and nikah bookings",
      "A committee vote on every fund request, with email notifications for votes and decisions",
      "Auth with a JWT in an httpOnly cookie and bcrypt-hashed passwords",
      "Deployed on a server behind Caddy, run with PM2",
    ],
    decisions: [
      { title: "Isolation first", body: "An admin's access is limited to their own masjid throughout the backend, so one mosque's records never reach another's." },
      { title: "A committee, not one person", body: "Fund requests go to the masjid's committee for a vote; every vote and final decision is emailed." },
      { title: "Tokens out of reach", body: "The JWT lives in an httpOnly cookie, where page scripts can't read it." },
    ],
    results: [
      "Built and defended as a BS IT final-year project, supervised by Mr. Muhammad Kamran.",
      "Code, proposal, SRS and SDS are public on GitHub.",
    ],
    arch: [
      { layer: "Interface", tech: "React + Vite (frontend by Haris Ehsan)", does: "Community, admin and committee screens" },
      { layer: "API", tech: "Node.js + Express", does: "Roles, per-masjid isolation, voting, email" },
      { layer: "Data", tech: "MongoDB + Mongoose", does: "Masjids, users, donations, events, requests" },
      { layer: "Ops", tech: "PM2 + Caddy · Stripe · Resend", does: "Server, payments (test) and email" },
    ],
    accent: "#1E6B47",
  },
];

export const workBySlug = (slug: string) => work.find((w) => w.slug === slug);

/** Client systems with a public URL — checked live by lib/status.ts and shown on the home board. */
export type LiveSystem = {
  slug: string;
  name: string;
  kind: string;
  client: string;
  year: string;
  stack: string[];
  url: string;
  host: string;
  image: string;
  video?: { av1: string; h264: string };
  imageNote?: string;
  summary: string;
  arch: ArchLayer[];
  href: string;
};

export const liveSystems: LiveSystem[] = work
  .filter((w) => w.links.live && w.media.image)
  .map((w) => ({
    slug: w.slug,
    name: w.boardName ?? w.name,
    kind: w.kind,
    client: w.client,
    year: w.year,
    stack: w.stack,
    url: w.links.live!,
    host: w.links.host ?? new URL(w.links.live!).host,
    image: w.media.image!,
    video: w.media.video,
    imageNote: w.media.note,
    summary: w.summary,
    arch: w.arch,
    href: `/work/${w.slug}`,
  }));

/** Verbatim client words (full sentences only, unchanged), linked to their case study. */
export const quotes = work.filter((w) => w.quote).map((w) => ({ slug: w.slug, name: w.name, ...w.quote! }));

// Smaller projects — the archive. Facts from the CV and the public repos.
export const codeProjects = [
  { slug: "jarvis", name: "Jarvis AI Assistant", stack: ["Node.js", "Groq API", "Windows automation"], url: "https://github.com/dawood125/Jarvis-ai-assistant", summary: "Windows desktop assistant that opens apps, manages files and runs tasks from natural language, using Groq for fast responses." },
  { slug: "linkedin-automation", name: "LinkedIn Content Automation Hub", stack: ["n8n", "Next.js", "MongoDB", "Recharts", "WhatsApp API", "LinkedIn API"], url: "https://github.com/dawood125/linkedin-content-automation-hub", summary: "n8n workflow with a Next.js dashboard: pulls raw data from MongoDB, an AI agent drafts a post and image, a WhatsApp message asks for approval, then it publishes to LinkedIn." },
  { slug: "freelancehub", name: "FreelanceHub", stack: ["React", "Node.js", "Express", "MongoDB", "Stripe", "AWS EC2", "GitHub Actions"], url: "https://github.com/dawood125/freelancehub", summary: "Fiverr-style marketplace with real-time chat and Stripe payments, deployed to AWS EC2 through a GitHub Actions pipeline." },
  { slug: "employee-system", name: "Employee Management System", stack: ["React", "Node.js", "Express", "MongoDB", "JWT"], url: "https://github.com/dawood125/employee-management-system", summary: "MERN employee and task management with JWT auth and role-based access control." },
  { slug: "laravel-inventory", name: "Inventory Management System (Laravel)", stack: ["Laravel 12", "Sanctum", "React", "TypeScript", "Tailwind", "Recharts", "Vite"], summary: "React/TypeScript dashboard for products, orders, stock and reports on a Laravel 12 REST API with Sanctum auth." },
  { slug: "offlow", name: "Offlow (company project)", stack: ["Next.js", "React", "Figma"], summary: "Next.js App Router frontend built from Figma designs as part of professional work." },
] as const;

/* ------------------------------------------------------------------------------------------------
 * Inside AIWA Flow. Nodes, flow and "ships as" come from the public repo (src/pages, server/,
 * electron/, .github/workflows/deploy.yml) and the case study.
 * ---------------------------------------------------------------------------------------------- */
export type AiwaNode = {
  id: string;
  label: string;
  tech: string;
  lane: "interface" | "core" | "data";
  does: string;
};

export const aiwa = {
  nodes: [
    { id: "pos", label: "POS counter", tech: "React + TypeScript", lane: "interface", does: "Counter staff ring up sales orders for shops and customers." },
    { id: "office", label: "Back office", tech: "React + TypeScript", lane: "interface", does: "Purchasing and returns, suppliers, customers, deliveries, routes and sales reps." },
    { id: "reports", label: "Dashboard & reports", tech: "React + TypeScript", lane: "interface", does: "Sales, expenses and profit; cash, bank, JazzCash and EasyPaisa balances; pending payments; PDF invoices." },
    { id: "api", label: "REST API", tech: "Node.js + Express", lane: "core", does: "JWT logins and role checks, validation, and the business rules for every order, payment and return." },
    { id: "stock", label: "Stock & audit", tech: "Batches · audit log", lane: "core", does: "Stock is drawn from product batches oldest-first, and every change is written to the audit log with the amounts." },
    { id: "db", label: "Database", tech: "SQLite · sql.js", lane: "data", does: "The whole database in one file on the machine — nothing extra to install at the shop." },
  ] satisfies AiwaNode[],
  edges: [
    { from: "pos", to: "api" },
    { from: "office", to: "api" },
    { from: "api", to: "stock" },
    { from: "stock", to: "db" },
    { from: "db", to: "reports" },
  ],
  /** One sale, traced through the system. Each step lights the node it happens in. */
  flow: [
    { node: "pos", text: "A sale is rung up at the POS counter." },
    { node: "api", text: "The Express API checks the login and role, then validates the order." },
    { node: "stock", text: "Stock is drawn from the oldest batch first, and the change is written to the audit log." },
    { node: "db", text: "Everything is saved to the SQLite file." },
    { node: "reports", text: "Sales, cash and any low-stock warning show up on the dashboard." },
  ],
  ships: [
    { label: "Desktop app", tech: "Electron", where: "Gibs Distributor", does: "Installed on site, runs fully offline." },
    { label: "Web app", tech: "VPS + PM2 · GitHub Actions", where: "Ibrahim Business Manager", does: "Online; every deploy is health-checked." },
  ],
};

/* ------------------------------------------------------------------------------------------------
 * Stack × project matrix. Every dot is checked against the project's code or case study.
 * ---------------------------------------------------------------------------------------------- */
export type SkillGroup = "Frontend" | "Backend" | "Data" | "AI" | "Ship" | "Commerce";
export const matrix = {
  projects: [
    { slug: "aiwa-flow", short: "AIWA Flow" },
    { slug: "sugarhills", short: "SugarHills" },
    { slug: "bikks", short: "BIKKS" },
    { slug: "diversity", short: "DIVERSITY" },
    { slug: "neuraldesk", short: "NeuralDesk" },
    { slug: "e-masjid", short: "E-Masjid" },
    { slug: "linkedin-automation", short: "LinkedIn hub" },
    { slug: "freelancehub", short: "FreelanceHub" },
    { slug: "jarvis", short: "Jarvis" },
  ],
  skills: [
    { name: "React", group: "Frontend", in: ["aiwa-flow", "sugarhills", "bikks", "neuraldesk", "linkedin-automation", "freelancehub"] },
    { name: "Next.js", group: "Frontend", in: ["neuraldesk", "linkedin-automation"] },
    { name: "TypeScript", group: "Frontend", in: ["aiwa-flow", "sugarhills", "neuraldesk"] },
    { name: "Electron desktop", group: "Frontend", in: ["aiwa-flow"] },
    { name: "Node.js / Express", group: "Backend", in: ["aiwa-flow", "sugarhills", "neuraldesk", "e-masjid", "freelancehub", "jarvis"] },
    { name: "JWT auth & roles", group: "Backend", in: ["aiwa-flow", "sugarhills", "neuraldesk", "e-masjid"] },
    { name: "Real-time (Socket.io)", group: "Backend", in: ["neuraldesk"] },
    { name: "SQLite", group: "Data", in: ["aiwa-flow"] },
    { name: "MongoDB", group: "Data", in: ["sugarhills", "neuraldesk", "e-masjid", "linkedin-automation", "freelancehub"] },
    { name: "RAG · OpenAI embeddings · Pinecone", group: "AI", in: ["neuraldesk"] },
    { name: "Groq LLM API", group: "AI", in: ["neuraldesk", "jarvis"] },
    { name: "n8n AI workflows", group: "AI", in: ["linkedin-automation"] },
    { name: "GitHub Actions CI/CD", group: "Ship", in: ["aiwa-flow", "freelancehub"] },
    { name: "Server deploys (VPS / EC2)", group: "Ship", in: ["aiwa-flow", "e-masjid", "freelancehub"] },
    { name: "Technical SEO", group: "Ship", in: ["sugarhills"] },
    { name: "Shopify themes", group: "Commerce", in: ["diversity"] },
    { name: "Stripe payments", group: "Commerce", in: ["e-masjid", "freelancehub"] },
  ] satisfies { name: string; group: SkillGroup; in: string[] }[],
};

/* ------------------------------------------------------------------------------------------------
 * Seasons — the career as a request waterfall. Dates from the CV.
 * ---------------------------------------------------------------------------------------------- */
export const seasons = {
  from: "2022-07",
  to: "2026-12",
  rows: [
    // CV gives years only for the degree; the bar is drawn with approximate (dashed) ends.
    { label: "BS Information Technology", org: "University of the Punjab", start: "2022-10", end: "2026-06", kind: "study", approx: true },
    { label: "Junior Web Developer (intern)", org: "RISS", start: "2023-06", end: "2023-11", kind: "work" },
    { label: "Freelance & client work", org: "Independent", start: "2023-10", end: null, kind: "work" },
    { label: "Backend Developer (intern)", org: "Sky Waves Software House", start: "2026-01", end: "2026-03", kind: "work" },
    { label: "Full Stack Developer", org: "Sky Waves Software House", start: "2026-04", end: "2026-05", kind: "work" },
    { label: "Full Stack Developer · intern → full-time (Oct 2026)", org: "Techling", start: "2026-06", end: null, kind: "work" },
  ] as { label: string; org: string; start: string; end: string | null; kind: "work" | "study"; approx?: boolean }[],
  /** Point events dated to the month (rendered as dashed markers). */
  marks: [] as { at: string; label: string }[],
  /** Things shipped in a year, without a month: shown as notes under the chart, linked to their case studies. */
  shipped: [
    { year: "2025", items: [{ label: "SugarHills Resort", slug: "sugarhills" }, { label: "BIKKS Trading", slug: "bikks" }, { label: "DIVERSITY", slug: "diversity" }] },
    {
      year: "2026",
      items: [
        { label: "AIWA Flow — at two distributors", slug: "aiwa-flow" },
        { label: "NeuralDesk", slug: "neuraldesk" },
        { label: "E-Masjid (final-year project)", slug: "e-masjid" },
        { label: "HEC / NCEAC Generative AI — Top Performer" },
      ],
    },
  ] as { year: string; items: { label: string; slug?: string }[] }[],
};
