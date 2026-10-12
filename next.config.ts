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
};

export default nextConfig;
