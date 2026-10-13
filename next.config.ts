import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Stamped once at build so the footer can say when this version was built.
  env: {
    BUILD_TIME: new Date().toISOString(),
  },
  async redirects() {
    return [
      // The RAG case study was renamed to match the project's real name.
      { source: "/work/rag-support-agent", destination: "/work/neuraldesk", permanent: true },
    ];
  },
};

export default nextConfig;
