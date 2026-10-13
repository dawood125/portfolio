import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dawood Ahmed — Full-Stack & GenAI Developer",
    short_name: "Dawood Ahmed",
    description: "Live client systems, applied GenAI, and a portfolio you can question.",
    start_url: "/",
    display: "browser",
    background_color: "#EDECE8",
    theme_color: "#111214",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
