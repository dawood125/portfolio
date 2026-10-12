import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["three"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: []
  },
  experimental: {
    optimizePackageImports: ["three", "@react-three/drei", "@react-three/fiber"]
  }
};

export default nextConfig;
