import type { MetadataRoute } from "next";

const BASE_URL = "https://sujith-putta-portfolio.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
      images: [
        `${BASE_URL}/opengraph-image`,
        `${BASE_URL}/Sujith%20Putta%20Profile.png`,
        `${BASE_URL}/sujith-hero-trimmed.png`,
        `${BASE_URL}/sujith-about-portrait.png`,
      ],
    },
  ];
}
