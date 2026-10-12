// Single source of truth for every fact on the site and in the Ask corpus.
// Rule (DESIGN.md): only facts Dawood can back up. Leave a field out rather than guess.

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
  github: "https://github.com/dawood125",
  linkedin: "https://linkedin.com/in/dawood-ahmed-8953b63a2",
  cv: "/Dawood_Ahmed_CV.pdf",
  /**
   * 48-second intro: script by Dawood, voice cloned from his own 22-second recording, face animated from his photo.
   * The talking-avatar files are detected at build time (lib/intro-media.ts); without them the intro plays as a
   * voice-over on the living portrait.
   */
  intro: {
    audio: "/media/intro/intro-voice.mp3",
    captions: "/media/intro/intro-captions.vtt",
    words: "/media/intro/intro-words.json",
    seconds: 48,
    faceTool: "D-ID",
    voiceTool: "Fish Audio",
    voiceSampleSeconds: 22,
  },
  stack: {
    frontend: ["React", "Next.js (App Router, SSR)", "TypeScript", "Tailwind CSS"],
    backend: ["Node.js", "Express", "Laravel 11/12", "REST APIs", "JWT auth", "Event-driven design"],
    data: ["MongoDB", "MySQL"],
    ai: ["RAG", "LangChain", "LangGraph", "Vector embeddings", "AI agent workflows", "Groq API", "n8n"],
    cloud: ["AWS EC2", "Azure VMs", "Azure DevOps", "GitHub Actions CI/CD"],
  },
} as const;

export const experience = [
  { role: "Full Stack Developer", org: "Techling", when: "Jun 2026 – present", note: "AI/ML-focused software house. Converted from a paid internship to full-time after evaluation (Oct 2026)." },
  { role: "Full Stack Developer", org: "Sky Waves Software House", when: "Apr 2026 – May 2026", note: "Laravel 12 + MySQL client projects, REST APIs and secure authentication." },
  { role: "Backend Developer Intern", org: "Sky Waves Software House", when: "Jan 2026 – Mar 2026", note: "Backend modules in Laravel and Node.js." },
  { role: "Freelance Web Developer", org: "Independent", when: "Oct 2023 – present", note: "Client systems in Pakistan and abroad, including the SugarHills resort platform for a client in Kerala, India." },
  { role: "Junior Web Developer Intern", org: "RISS (Remote IT Services & Solutions)", when: "Jun 2023 – Nov 2023", note: "First professional work: training, then live client projects." },
  { role: "BS Information Technology", org: "University of the Punjab", when: "2022 – 2026", note: "Completed 2026." },
] as const;

/** One horizontal band of the "Inspect" x-ray: what runs at that layer of the system. Facts only. */
export type ArchLayer = { layer: "Interface" | "API" | "Data" | "Ops"; tech: string; does: string };

export type LiveSystem = {
  slug: string;
  name: string;
  kind: string;
  client: string;
  year: number;
  stack: string[];
  url: string;
  host: string;
  image: string;
  /** Scrolling screen recording (ping-pong loop). Image doubles as the poster. */
  video?: { av1: string; h264: string };
  imageNote?: string;
  summary: string;
  arch: ArchLayer[];
};

export const liveSystems: LiveSystem[] = [
  {
    slug: "ibrahim",
    name: "Ibrahim Business Manager",
    kind: "Inventory & distribution ERP",
    client: "Fertilizer distributor · Pakistan",
    year: 2026,
    stack: ["Laravel 11 API", "React + TypeScript", "MySQL", "Recharts"],
    url: "https://ibrahim-solution.com/",
    host: "ibrahim-solution.com",
    image: "/media/work/ibrahim.webp",
    imageNote: "Dashboard shown with demo data",
    summary:
      "Runs on AIWA Flow, Dawood's own inventory-management product: products, purchasing, stock alerts, POS and sales orders, with an event-driven Laravel 11 API behind a React/TypeScript dashboard.",
    arch: [
      { layer: "Interface", tech: "React + TypeScript · Recharts", does: "Staff dashboard: sales, stock, cash, POS" },
      { layer: "API", tech: "Laravel 11 REST API", does: "Orders, purchasing, returns, event-driven stock alerts" },
      { layer: "Data", tech: "MySQL", does: "Products, suppliers, customers, ledgers" },
    ],
  },
  {
    slug: "e-masjid",
    name: "E-Masjid",
    kind: "Mosque community platform",
    client: "Mosques around Sheikhupura · Pakistan",
    year: 2026,
    stack: ["Next.js", "React", "Node.js", "MongoDB"],
    url: "https://emasjid.me/",
    host: "emasjid.me",
    image: "/media/work/emasjid.webp",
    video: { av1: "/media/work/emasjid.av1.mp4", h264: "/media/work/emasjid.h264.mp4" },
    arch: [
      { layer: "Interface", tech: "Next.js + React", does: "Pick a home mosque, then its prayer times and events" },
      { layer: "API", tech: "Node.js", does: "Mosques, events, donations, fund requests" },
      { layer: "Data", tech: "MongoDB", does: "Multi-mosque records, donations, requests" },
    ],
    summary:
      "Multi-mosque platform: each visitor picks their home mosque, then gets its prayer times, events, donations and fund requests.",
  },
  {
    slug: "biks",
    name: "BIKS Trading Company",
    kind: "Vehicle & heavy-machinery marketplace",
    client: "Trading company in Japan · Japanese / English",
    year: 2026,
    stack: ["Next.js", "React", "Node.js", "MongoDB"],
    url: "https://biks.online/",
    host: "biks.online",
    image: "/media/work/biks.webp",
    video: { av1: "/media/work/biks.av1.mp4", h264: "/media/work/biks.h264.mp4" },
    summary:
      "Marketplace for a trading company in Japan selling used vehicles and heavy machinery (excavators, cars): collection browsing, vehicle detail pages, sell requests and a Japanese/English interface.",
    arch: [
      { layer: "Interface", tech: "Next.js + React · JA / EN", does: "Collections, vehicle detail, sell requests" },
      { layer: "API", tech: "Node.js", does: "Listings, enquiries, contact flows" },
      { layer: "Data", tech: "MongoDB", does: "Vehicles, specs, media, enquiries" },
    ],
  },
  {
    slug: "sugarhills",
    name: "SugarHills Resort",
    kind: "Resort website & booking platform",
    client: "Paid international client · Wayanad, Kerala, India",
    year: 2026,
    stack: ["React + TypeScript", "Node.js", "Express", "MongoDB", "JWT"],
    url: "https://sugarhills.in/",
    host: "sugarhills.in",
    image: "/media/work/sugarhills.webp",
    video: { av1: "/media/work/sugarhills.av1.mp4", h264: "/media/work/sugarhills.h264.mp4" },
    summary:
      "Complete dynamic site for a luxury resort, with cottages, experiences, offers and an admin panel so the client manages their own content.",
    arch: [
      { layer: "Interface", tech: "React + TypeScript · Tailwind", does: "Cottages, experiences, offers, booking enquiries" },
      { layer: "API", tech: "Node.js + Express · JWT", does: "Content and bookings, authenticated admin" },
      { layer: "Data", tech: "MongoDB", does: "Cottages, offers, gallery, enquiries" },
      { layer: "Ops", tech: "Admin panel", does: "The client edits their own content" },
    ],
  },
];

// Projects that are code-first (no public client deployment). Used by the Ask corpus now, /archive later.
export const codeProjects = [
  { slug: "rag-support-agent", name: "RAG Customer Support Agent", stack: ["LangChain", "LangGraph", "Vector embeddings", "Groq"], url: "https://github.com/dawood125/rag-customer-support-agent", summary: "Retrieval-augmented support agent that answers from a company's own documents." },
  { slug: "jarvis", name: "Jarvis AI Assistant", stack: ["Node.js", "Groq API", "Windows automation"], url: "https://github.com/dawood125/Jarvis-ai-assistant", summary: "Windows desktop assistant that opens apps, manages files and runs tasks from natural language, using Groq for fast responses." },
  { slug: "linkedin-automation", name: "LinkedIn Content Automation Hub", stack: ["n8n", "MongoDB", "AI agent", "WhatsApp API", "LinkedIn API"], url: "https://github.com/dawood125/linkedin-content-automation-hub", summary: "n8n workflow: pulls raw data from MongoDB, an AI agent drafts a post and image, a WhatsApp message asks for approval, then it publishes to LinkedIn." },
  { slug: "freelancehub", name: "FreelanceHub", stack: ["React", "Node.js", "Express", "MongoDB", "Stripe", "AWS EC2", "GitHub Actions"], url: "https://github.com/dawood125/freelancehub", summary: "Fiverr-style marketplace with real-time chat and Stripe payments, deployed to AWS EC2 through a GitHub Actions pipeline." },
  { slug: "employee-system", name: "Employee Management System", stack: ["React", "Node.js", "Express", "MongoDB", "JWT"], url: "https://github.com/dawood125/employee-management-system", summary: "MERN employee and task management with JWT auth and role-based access control." },
  { slug: "offlow", name: "Offlow (company project)", stack: ["Next.js", "React", "Figma"], summary: "Next.js App Router frontend built from Figma designs as part of professional work." },
] as const;

/* ------------------------------------------------------------------------------------------------
 * Inside AIWA Flow — the product Ibrahim Business Manager runs on.
 * Nodes and the traced flow are taken from the live dashboard's own modules (see the demo capture)
 * and the CV ("order tracking, stock alerts, and event-driven design"). Dawood to review wording.
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
    { id: "pos", label: "POS / new order", tech: "React + TypeScript", lane: "interface", does: "Counter staff create sales orders for customers." },
    { id: "purchasing", label: "Purchasing", tech: "React + TypeScript", lane: "interface", does: "Suppliers, purchase orders and purchase returns." },
    { id: "dashboard", label: "Dashboard", tech: "React + TypeScript · Recharts", lane: "interface", does: "Sales, expenses and profit by period; cash, bank, JazzCash and EasyPaisa balances; pending payments." },
    { id: "api", label: "REST API", tech: "Laravel 11", lane: "core", does: "Validates every request and applies the business rules for orders, purchasing, returns and expenses." },
    { id: "events", label: "Stock events", tech: "Laravel events", lane: "core", does: "Stock changes raise events, which drive low-stock and out-of-stock alerts." },
    { id: "db", label: "Database", tech: "MySQL", lane: "data", does: "Companies, brands, categories, products, suppliers, customers, orders and ledgers." },
  ] satisfies AiwaNode[],
  /** One sale, traced through the system. Each step lights the node it happens in. */
  flow: [
    { node: "pos", text: "A sale is entered at the counter." },
    { node: "api", text: "The Laravel API validates it and records the order." },
    { node: "db", text: "Stock and the customer's ledger update in MySQL." },
    { node: "events", text: "The stock change raises an event." },
    { node: "dashboard", text: "Sales, cash and any low-stock warning show up on the dashboard." },
  ],
};

/* ------------------------------------------------------------------------------------------------
 * Stack × project matrix. Every dot comes from a project's stack above — nothing added.
 * ---------------------------------------------------------------------------------------------- */
export type SkillGroup = "Frontend" | "Backend" | "Data" | "AI" | "Cloud";
export const matrix = {
  projects: [
    { slug: "ibrahim", short: "Ibrahim" },
    { slug: "e-masjid", short: "E-Masjid" },
    { slug: "biks", short: "BIKS" },
    { slug: "sugarhills", short: "SugarHills" },
    { slug: "rag-support-agent", short: "RAG agent" },
    { slug: "jarvis", short: "Jarvis" },
    { slug: "linkedin-automation", short: "LinkedIn hub" },
    { slug: "freelancehub", short: "FreelanceHub" },
    { slug: "employee-system", short: "Employee sys." },
  ],
  skills: [
    { name: "Next.js", group: "Frontend", in: ["e-masjid", "biks"] },
    { name: "React", group: "Frontend", in: ["ibrahim", "e-masjid", "biks", "sugarhills", "freelancehub", "employee-system"] },
    { name: "TypeScript", group: "Frontend", in: ["ibrahim", "sugarhills"] },
    { name: "Laravel 11", group: "Backend", in: ["ibrahim"] },
    { name: "Node.js / Express", group: "Backend", in: ["e-masjid", "biks", "sugarhills", "jarvis", "freelancehub", "employee-system"] },
    { name: "JWT auth / RBAC", group: "Backend", in: ["sugarhills", "employee-system"] },
    { name: "Stripe", group: "Backend", in: ["freelancehub"] },
    { name: "MySQL", group: "Data", in: ["ibrahim"] },
    { name: "MongoDB", group: "Data", in: ["e-masjid", "biks", "sugarhills", "linkedin-automation", "freelancehub", "employee-system"] },
    { name: "RAG · LangChain · LangGraph", group: "AI", in: ["rag-support-agent"] },
    { name: "Groq LLM API", group: "AI", in: ["rag-support-agent", "jarvis"] },
    { name: "n8n AI agents", group: "AI", in: ["linkedin-automation"] },
    { name: "AWS EC2 + GitHub Actions", group: "Cloud", in: ["freelancehub"] },
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
    { label: "Freelance web developer", org: "Independent", start: "2023-10", end: null, kind: "work" },
    { label: "Backend Developer (intern)", org: "Sky Waves Software House", start: "2026-01", end: "2026-03", kind: "work" },
    { label: "Full Stack Developer", org: "Sky Waves Software House", start: "2026-04", end: "2026-05", kind: "work" },
    { label: "Full Stack Developer · intern → full-time (Oct 2026)", org: "Techling", start: "2026-06", end: null, kind: "work" },
  ] as { label: string; org: string; start: string; end: string | null; kind: "work" | "study"; approx?: boolean }[],
  /** Point events dated to the month (rendered as dashed markers). */
  marks: [] as { at: string; label: string }[],
  /** 2026 facts without a month: shown as a note, not as points on the axis. */
  year2026: ["4 live client systems delivered", "HEC / NCEAC Generative AI — Top Performer", "BS IT completed"],
};
