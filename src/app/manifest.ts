import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sujith Putta — Generative AI Developer & Product Architect",
    short_name: "Sujith Putta",
    description:
      "Interactive portfolio of Sujith Putta — Generative AI Developer, Full-Stack Engineer, and Product Builder.",
    start_url: "/",
    display: "standalone",
    background_color: "#060606",
    theme_color: "#060606",
    categories: ["portfolio", "technology", "artificial intelligence", "developer tools"],
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
