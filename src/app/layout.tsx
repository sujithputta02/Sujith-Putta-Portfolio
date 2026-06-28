import type { Metadata } from "next";
import { Sacramento, JetBrains_Mono, Silkscreen, Pixelify_Sans } from "next/font/google";
import "./globals.css";

const sacramento = Sacramento({
  weight: "400",
  variable: "--font-sacramento",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const silkscreen = Silkscreen({
  weight: "400",
  variable: "--font-silkscreen",
  subsets: ["latin"],
});

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify-sans",
  subsets: ["latin"],
});

const BASE_URL = "https://sujith-putta-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  // ── Title ──────────────────────────────────────────────────────────────────
  title: {
    default: "Sujith Putta | AI Engineer & Product Developer",
    template: "%s | Sujith Putta",
  },

  // ── Description ───────────────────────────────────────────────────────────
  description:
    "Portfolio of Sujith Putta — AI Engineer, Full-Stack Developer, and Product Builder from Sacramento, CA. Specialising in Hybrid RAG pipelines, FastAPI microservices, React, Node.js, and cloud-native deployments on AWS & Azure.",

  // ── Keywords ──────────────────────────────────────────────────────────────
  keywords: [
    "Sujith Putta",
    "AI Engineer",
    "Full Stack Developer",
    "Product Developer",
    "RAG Pipeline",
    "FastAPI",
    "React Developer",
    "Node.js",
    "Next.js",
    "FAISS",
    "Neo4j",
    "TypeScript",
    "Python Developer",
    "AWS",
    "Azure",
    "Sacramento Developer",
    "Portfolio",
  ],

  // ── Authors & Creator ─────────────────────────────────────────────────────
  authors: [{ name: "Sujith Putta", url: BASE_URL }],
  creator: "Sujith Putta",

  // ── Canonical ─────────────────────────────────────────────────────────────
  alternates: {
    canonical: "/",
  },

  // ── Robots ────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Sujith Putta — Portfolio",
    title: "Sujith Putta | AI Engineer & Product Developer",
    description:
      "AI Engineer & Full-Stack Developer building RAG pipelines, microservices, and premium web products. Open to opportunities in AI, backend, and product engineering.",
    images: [
      {
        url: "/Sujith Putta Profile.png",
        width: 800,
        height: 800,
        alt: "Sujith Putta — AI Engineer & Product Developer",
      },
    ],
  },

  // ── Twitter / X Card ──────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Sujith Putta | AI Engineer & Product Developer",
    description:
      "AI Engineer & Full-Stack Developer building RAG pipelines, microservices, and premium web products.",
    images: ["/Sujith Putta Profile.png"],
    creator: "@sujithputta02",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sacramento.variable} ${jetbrainsMono.variable} ${silkscreen.variable} ${pixelifySans.variable} scroll-smooth`}
    >
      <body className="bg-[#F7F7F5] text-[#111111] min-h-screen selection:bg-[#C7FF3D] selection:text-[#111111] relative antialiased">
        {/* Grain overlay for luxury feel */}
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
