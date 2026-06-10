<div align="center">

# Sujith Putta — Developer Portfolio

**AI Engineer · Full-Stack Developer · Product Builder**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?logo=framer&logoColor=white)](https://www.framer.com/motion)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com)

A premium, interactive developer portfolio built with Next.js 16, TypeScript, and Framer Motion — featuring smooth scroll animations, 3D card interactions, a RAG pipeline visualizer, and a fully functional contact system.

[Live Site](https://sujithputta.dev) · [LinkedIn](https://linkedin.com/in/sujithputta02) · [GitHub](https://github.com/sujithputta02)

</div>

---

## ✦ Features

| Section | Highlights |
|---|---|
| **Hero** | Magnetic cursor tracking, animated typewriter, scroll-driven parallax |
| **Skills Matrix** | 7-category explorer with live search, drag-to-scroll mobile tabs, and staggered card reveals |
| **Project Gallery** | Full-screen modals with tech stack breakdowns for 7 projects |
| **Capabilities** | 3D tilt + glow marquee cards that flip on click to reveal full tech stack |
| **NEXORA Pipeline** | Animated RAG architecture visualizer (FAISS → Neo4j → LLaMA 3) |
| **Production Timeline** | Scroll-triggered milestone timeline with Framer Motion variants |
| **Credentials** | Animated certification badge grid with hover effects |
| **Contact** | Zod-validated form with EmailJS delivery to `sujithputta02@gmail.com` |
| **SEO** | Full Open Graph, Twitter Card, sitemap, robots.txt, structured metadata |

---

## ⚙ Tech Stack

```
Framework     Next.js 16 (App Router, Turbopack)
Language      TypeScript 5
Styling       Tailwind CSS v4 + vanilla CSS
Animation     Framer Motion 12
Icons         Lucide React
Forms         React Hook Form + Zod v4
Fonts         PP Neue Montreal · PP Mondwest · Sacramento · JetBrains Mono
Runtime       Bun
Deploy        Vercel
```

---

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh) ≥ 1.0 **or** Node.js ≥ 20

### Install & Run

```bash
# Clone the repo
git clone https://github.com/sujithputta02/portfolio.git
cd portfolio/developer-portfolio

# Install dependencies
bun install

# Start the dev server
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
bun run build
bun run start
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout + SEO metadata
│   ├── page.tsx          # Page composition
│   ├── globals.css       # Design tokens, scrollbar styles, animations
│   ├── icon.svg          # Custom SVG favicon
│   ├── robots.ts         # /robots.txt route
│   └── sitemap.ts        # /sitemap.xml route
│
├── components/
│   ├── Hero.tsx           # Landing section with magnetic cursor
│   ├── Navbar.tsx         # Floating pill navigation
│   ├── AboutMe.tsx        # Bio + social links
│   ├── Skills.tsx         # Interactive 7-category skill explorer
│   ├── BentoGrid.tsx      # Recruiter-focused bento layout
│   ├── ProjectGallery.tsx # Full project showcase with modals
│   ├── Capabilities.tsx   # Flip card marquee
│   ├── AIPipeline.tsx     # NEXORA RAG architecture visualizer
│   ├── DesignSystem.tsx   # Interaction canvas showcase
│   ├── Timeline.tsx       # Production chronicle timeline
│   ├── Education.tsx      # Academic + coursework section
│   ├── Credentials.tsx    # Certification grid
│   ├── Research.tsx       # Academic research column
│   ├── CaseStudy.tsx      # LifeFlow AI deep-dive
│   ├── SocialProof.tsx    # Achievement marquee
│   └── ContactFooter.tsx  # Zod form + footer
│
└── data/
    └── profile.ts         # Single source of truth for all content
```

---

## 🌐 Deployment

The project includes a [`vercel.json`](./vercel.json) with:
- Security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`)
- Immutable cache headers for static assets and `_next/static/`
- Rewrites for `/sitemap.xml` and `/robots.txt`

**Deploy to Vercel in one click:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sujithputta02/portfolio)

After deploying, update `BASE_URL` in `src/app/layout.tsx` to your live domain.

---

## ✉ Contact Form Setup

The contact form uses [EmailJS](https://emailjs.com). To configure it:

1. Create a free EmailJS account
2. Set up a service and email template
3. Add your keys to `.env.local`:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## 📄 License

MIT — feel free to fork and customise. A credit or star is appreciated!

---

<div align="center">
  <sub>Designed & built by <strong>Sujith Putta</strong> · Sacramento, CA</sub>
</div>
