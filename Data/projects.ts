export type Project = {
  slug: string;
  name: string;
  headline: string;
  description: string;
  stack: string[];
  live?: string;
  github?: string;
  private?: boolean;
  category: "MERN" | "Next.js" | "Laravel" | "GenAI";
  hero: boolean;
};

export const heroProjects: Project[] = [
  {
    slug: "fertilizer-inventory",
    name: "Ibrahim Business Manager",
    headline: "ERP-style inventory that runs a real fertilizer business",
    description:
      "Laravel 11 API + React/TypeScript dashboard with product, order, stock-alert and event-driven design. Deployed for a live client at ibrahim-solution.com.",
    stack: ["Laravel 11", "React", "TypeScript", "MySQL", "Tailwind", "Recharts"],
    live: "https://ibrahim-solution.com/",
    github: "https://github.com/dawood125/Fertilizer-Inventory-Management-system.git",
    category: "Laravel",
    hero: true,
  },
  {
    slug: "e-masjid",
    name: "E-Masjid",
    headline: "Community SaaS connecting hearts through faith",
    description:
      "Mosque services platform — prayer times, events, donations, fund requests. Public Next.js build serving community since 1985 narrative.",
    stack: ["Next.js", "React", "Node.js", "MongoDB"],
    live: "https://emasjid.me/",
    github: "https://github.com/dawood125/E-Masjid-System.git",
    category: "Next.js",
    hero: true,
  },
  {
    slug: "rag-support-agent",
    name: "RAG Customer Support Agent",
    headline: "Retrieval agent that answers from your own docs",
    description:
      "LangChain + LangGraph + vector embeddings with evals. Applied GenAI differentiator backed by NCEAC Top Performer credential.",
    stack: ["LangChain", "LangGraph", "RAG", "Vector DB", "Groq"],
    github: "https://github.com/dawood125/rag-customer-support-agent.git",
    category: "GenAI",
    hero: true,
  },
  {
    slug: "jarvis-ai",
    name: "Jarvis AI Assistant",
    headline: "Desktop AI that controls Windows by voice",
    description:
      "Lightweight Node.js assistant — files, apps and tasks via natural language with Groq LLM for fast responses.",
    stack: ["Node.js", "Groq API", "Windows Automation"],
    github: "https://github.com/dawood125/Jarvis-ai-assistant.git",
    category: "GenAI",
    hero: true,
  },
  {
    slug: "biks-trading",
    name: "BIKS Trading Company",
    headline: "Heavy-machinery marketplace that sells excavators",
    description:
      "Client delivery at biks.online — collection browsing, vehicle detail, multilingual message + sell flow for Hitachi-class stock.",
    stack: ["React", "Next.js", "Node.js", "MongoDB"],
    live: "https://biks.online/",
    github: "https://github.com/dawood125/Biks-Car.git",
    private: true,
    category: "Next.js",
    hero: true,
  },
  {
    slug: "sugar-hills",
    name: "SugarHills Resort",
    headline: "Luxury resort booking above the clouds",
    description:
      "Paid international client (Kerala, India) — React + TypeScript + Tailwind resort site with admin panel to manage content.",
    stack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "JWT"],
    live: "https://sugarhills.in/",
    github: "https://github.com/dawood125/Sugar-Hills.git",
    private: true,
    category: "MERN",
    hero: true,
  },
];

export const archiveProjects: Project[] = [
  {
    slug: "linkedin-automation",
    name: "LinkedIn Content Automation Hub",
    headline: "n8n workflow: MongoDB → AI post → WhatsApp approval → LinkedIn",
    description:
      "End-to-end n8n automation pulling raw data, generating post + image via AI agent, WhatsApp approval, auto-publish.",
    stack: ["n8n", "MongoDB", "AI Agent", "WhatsApp API", "LinkedIn API"],
    github: "https://github.com/dawood125/linkedin-content-automation-hub.git",
    category: "GenAI",
    hero: false,
  },
  {
    slug: "employee-system",
    name: "Employee Management System",
    headline: "MERN + RBAC task management with JWT",
    description: "Full-stack employee and task system with JWT auth and role-based access control.",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    github: "https://github.com/dawood125/employee-management-system.git",
    category: "MERN",
    hero: false,
  },
  {
    slug: "freelancehub",
    name: "FreelanceHub",
    headline: "Fiverr-style marketplace with chat + Stripe + CI/CD",
    description:
      "Production-ready marketplace with real-time chat, Stripe payments, AWS EC2 + GitHub Actions pipeline.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Stripe", "AWS EC2"],
    github: "https://github.com/dawood125/freelancehub.git",
    category: "MERN",
    hero: false,
  },
];
