import type { Metadata, Viewport } from "next";
import Script from "next/script";
import {
  Sacramento,
  JetBrains_Mono,
  Space_Grotesk,
  Plus_Jakarta_Sans,
  Silkscreen,
  Pixelify_Sans,
  Playfair_Display,
  Anton,
} from "next/font/google";
import StructuredData from "@/components/StructuredData";
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

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060606" },
    { media: "(prefers-color-scheme: light)", color: "#060606" },
  ],
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  // ── Title ──────────────────────────────────────────────────────────────────
  title: {
    default: "Sujith Putta | Generative AI Developer & Product Developer",
    template: "%s | Sujith Putta",
  },

  // ── Description ───────────────────────────────────────────────────────────
  description:
    "Portfolio of Sujith Putta — Generative AI Developer & Full-Stack Systems Architect. Specializing in Sovereign Hybrid RAG pipelines, FastAPI microservices, deterministic Rust safety gates, and production cloud systems on Azure & AWS.",

  applicationName: "Sujith Putta Portfolio",

  // ── Keywords ──────────────────────────────────────────────────────────────
  keywords: [
    "Sujith Putta",
    "sujithputta02",
    "Generative AI Developer",
    "AI Systems Architect",
    "Full Stack Developer",
    "Product Developer",
    "RAG Pipeline Specialist",
    "Hybrid RAG",
    "Sovereign AI",
    "Autonomous AI Agents",
    "Rust Developer",
    "FastAPI",
    "React 19",
    "Next.js 16",
    "TypeScript",
    "Python Developer",
    "Neo4j Graph Database",
    "FAISS Vector Search",
    "PyTorch",
    "Docker",
    "Microsoft Azure",
    "Amazon Web Services AWS",
    "OWASP Top 10 Security",
    "Dayananda Sagar University",
    "Bengaluru AI Developer",
    "Imagine Cup 2026",
    "NASA Space Apps Challenge",
  ],

  // ── Authors & Creator ─────────────────────────────────────────────────────
  authors: [{ name: "Sujith Putta", url: BASE_URL }],
  creator: "Sujith Putta",
  publisher: "Sujith Putta",

  // ── Format Detection ──────────────────────────────────────────────────────
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

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
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Category & Classification ─────────────────────────────────────────────
  category: "technology",
  classification: "Developer Portfolio & AI Engineering Showcase",

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Sujith Putta Portfolio",
    title: "Sujith Putta | Generative AI Developer & Product Developer",
    description:
      "Generative AI Developer & Full-Stack Architect building sovereign RAG pipelines, deterministic Rust safety gates, and production web products.",
    firstName: "Sujith",
    lastName: "Putta",
    gender: "male",
    username: "sujithputta02",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Sujith Putta — Generative AI Developer & Product Developer",
      },
    ],
  },

  // ── Twitter / X Card ──────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Sujith Putta | Generative AI Developer & Product Developer",
    description:
      "Generative AI Developer & Full-Stack Architect building sovereign RAG pipelines, deterministic Rust safety gates, and production web products.",
    creator: "@sujithputta02",
    site: "@sujithputta02",
    images: ["/twitter-image"],
  },

  // ── Icons & Manifest ──────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/file.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/icon.png",
  },
  manifest: "/manifest.webmanifest",

  // ── Extended Meta Tags for Search & AI Indexers ───────────────────────────
  other: {
    "geo.region": "IN-KA",
    "geo.placename": "Bengaluru",
    "llms-txt": `${BASE_URL}/llms.txt`,
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
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Context" />
        <StructuredData />
      </head>
      <body className="bg-[#060606] text-[#EDEDED] min-h-screen selection:bg-[#FF5E00] selection:text-white relative antialiased overflow-x-hidden font-sans">
        {/* Grain overlay for luxury feel */}
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
