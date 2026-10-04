import type { Metadata } from "next";
import Script from "next/script";
import { Sacramento, JetBrains_Mono, Space_Grotesk, Plus_Jakarta_Sans, Silkscreen, Pixelify_Sans, Playfair_Display, Anton } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  variable: "--font-anton",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const sacramento = Sacramento({
  weight: "400",
  variable: "--font-sacramento",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
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
    default: "Sujith Putta | Generative AI Developer & Product Developer",
    template: "%s | Sujith Putta",
  },

  // ── Description ───────────────────────────────────────────────────────────
  description:
    "Portfolio of Sujith Putta — Generative AI Developer, Full-Stack Developer, and Product Builder from Sacramento, CA. Specialising in Hybrid RAG pipelines, FastAPI microservices, React, Node.js, and cloud-native deployments on AWS & Azure.",

  // ── Keywords ──────────────────────────────────────────────────────────────
  keywords: [
    "Sujith Putta",
    "Generative AI Developer",
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
    title: "Sujith Putta | Generative AI Developer & Product Developer",
    description:
      "Generative AI Developer & Full-Stack Developer building RAG pipelines, microservices, and premium web products. Open to opportunities in AI, backend, and product engineering.",
    images: [
      {
        url: "/Sujith Putta Profile.png",
        width: 800,
        height: 800,
        alt: "Sujith Putta — Generative AI Developer & Product Developer",
      },
    ],
  },

  // ── Twitter / X Card ──────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Sujith Putta | Generative AI Developer & Product Developer",
    description:
      "Generative AI Developer & Full-Stack Developer building RAG pipelines, microservices, and premium web products.",
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
      className={`${anton.variable} ${spaceGrotesk.variable} ${plusJakarta.variable} ${playfair.variable} ${sacramento.variable} ${jetbrainsMono.variable} ${silkscreen.variable} ${pixelifySans.variable} scroll-smooth dark`}
    >
      <head>
        <Script src="/liquid-glass.js" strategy="beforeInteractive" />
      </head>
      <body className="bg-[#060606] text-[#EDEDED] min-h-screen selection:bg-[#FF5E00] selection:text-white relative antialiased overflow-x-hidden font-sans">
        {/* Grain overlay for luxury feel */}
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
