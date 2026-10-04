"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, ChevronDown, Sparkles } from "lucide-react";
import { useLiquidGlass } from "@/hooks/useLiquidGlass";

export default function AboutMe() {
  const introGlassRef = useRef<HTMLDivElement>(null);
  const emailGlassRef = useRef<HTMLAnchorElement>(null);
  const linkedinGlassRef = useRef<HTMLAnchorElement>(null);
  const githubGlassRef = useRef<HTMLAnchorElement>(null);

  // Apply authentic Apple-style Liquid Glass refraction
  useLiquidGlass(introGlassRef, true, {
    scale: -90,
    chroma: 4,
    border: 0.06,
    mapBlur: 10,
    blur: 0,
    saturate: 1.25,
    fallbackBlur: 0,
  });

  useLiquidGlass(emailGlassRef, true, {
    scale: -70,
    chroma: 3,
    border: 0.05,
    mapBlur: 8,
    blur: 0,
    saturate: 1.25,
    radius: 24,
    fallbackBlur: 0,
  });

  useLiquidGlass(linkedinGlassRef, true, {
    scale: -70,
    chroma: 3,
    border: 0.05,
    mapBlur: 8,
    blur: 0,
    saturate: 1.25,
    radius: 24,
    fallbackBlur: 0,
  });

  useLiquidGlass(githubGlassRef, true, {
    scale: -70,
    chroma: 3,
    border: 0.05,
    mapBlur: 8,
    blur: 0,
    saturate: 1.25,
    radius: 24,
    fallbackBlur: 0,
  });

  return (
    <section id="about" className="w-full px-2 sm:px-4 md:px-5 py-3 sm:py-4 scroll-mt-20 select-none text-left">
      <div className="editorial-frame w-full p-6 sm:p-10 md:p-12 relative overflow-hidden">
        
        {/* Frame Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8 font-mono text-xs text-white/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF5E00] animate-pulse" />
            <span className="uppercase tracking-widest text-white/70">
              00 // IDENTITY &amp; CORE PHILOSOPHY
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>B.Tech CST // Dayananda Sagar University</span>
            <div className="w-16 h-1.5 rounded-full spectrum-pill" />
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            EXACT REFERENCE LAYOUT:
            Left: Tall Poster Card with Portrait & Bio Statement
            Right: Introduction Card (top) + Get In Touch 3 Cards (bottom)
           ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">

          {/* ─────────────────────────────────────────────────────────────
              LEFT COLUMN: TALL POSTER CARD WITH SUJITH PROFILE
             ───────────────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 rounded-[2rem] border border-white/15 bg-gradient-to-b from-[#181818] via-[#111111] to-[#080808] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] min-h-[580px] lg:min-h-[660px] group"
          >
            {/* Top Text Header */}
            <div className="relative z-20 space-y-1">
              <span className="font-sans text-white/60 text-lg sm:text-xl font-light tracking-wide block">
                Hello,
              </span>
              <h3 className="font-serif font-normal text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[0.95]">
                My name<br />is Sujith
              </h3>
            </div>

            {/* Middle: Portrait Image Layer */}
            <div className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden">
              {/* Subtle warm backlight aura */}
              <div
                className="absolute bottom-24 w-[340px] h-[340px] rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ background: "radial-gradient(circle, #FF5E00 0%, #00E5FF 65%, transparent 80%)" }}
                aria-hidden="true"
              />

              <Image
                src="/sujith-about-portrait.png"
                alt="Sujith Putta — AI Systems Architect & Full-Stack Developer"
                width={1600}
                height={1980}
                priority
                className="relative z-10 w-[96%] sm:w-[92%] max-h-[460px] sm:max-h-[520px] lg:max-h-[560px] object-contain object-bottom transition-transform duration-700 ease-out group-hover:scale-[1.03] drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)]"
              />
            </div>

            {/* Bottom Statement Card Overlay */}
            <div className="relative z-20 mt-auto pt-6">
              <div className="bg-[#0b0b0b]/85 backdrop-blur-md border border-white/12 rounded-2xl p-4 sm:p-5 shadow-2xl transition-all duration-300 group-hover:border-white/25">
                <p className="font-sans text-xs sm:text-sm font-light text-white/80 leading-relaxed">
                  I consider myself an architect who constantly builds sovereign AI systems, explores resilient agentic pipelines, and crafts deterministic microservices to deliver production-grade results in every project.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ─────────────────────────────────────────────────────────────
              RIGHT COLUMN: INTRODUCTION + GET IN TOUCH
             ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-7 flex flex-col justify-between gap-6 lg:gap-8">

            {/* SECTION 1: INTRODUCTION */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3.5"
            >
              {/* Header with Chevron */}
              <div className="flex items-center justify-between">
                <h3 className="text-3xl sm:text-4xl font-serif font-normal text-white tracking-tight">
                  Introduction
                </h3>
                <div className="w-9 h-9 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>

              {/* Large Horizontal Introduction Card with Liquid Glass */}
              <div
                ref={introGlassRef}
                className="relative rounded-[2rem] border border-white/15 p-6 sm:p-8 lg:p-9 liquid-glass-clear shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.45),inset_0_-4px_14px_rgba(255,255,255,0.05),inset_0_0_0_1px_rgba(255,255,255,0.12)] hover:border-white/25 transition-all overflow-hidden"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  
                  {/* Left Column: Headline and Bio (8 cols) */}
                  <div className="md:col-span-8 space-y-3 text-left">
                    <h4 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight leading-snug">
                      An AI Systems Architect &amp; Full-Stack Engineer based in Bengaluru
                    </h4>
                    <p className="font-sans text-xs sm:text-sm font-light text-white/70 leading-relaxed">
                      While my academic foundation is anchored in Computer Science and Technology at Dayananda Sagar University (9.05 CGPA), I have developed a strong passion for sovereign agentic systems and high-performance microservices. I love crafting architectures that are not only computationally resilient with FAISS and Neo4j, but also deterministic, secure, and production-ready.
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-2 pt-2 select-none">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold bg-white/5 border border-white/10 text-[#FF5E00]">
                        FastAPI &amp; Rust
                      </span>
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold bg-white/5 border border-white/10 text-[#00E5FF]">
                        FAISS &amp; Neo4j
                      </span>
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold bg-white/5 border border-white/10 text-[#A800FF]">
                        React 19 &amp; TS
                      </span>
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold bg-white/5 border border-white/10 text-white/60">
                        Azure &amp; AWS Cloud
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Developer Workstation Illustration (4 cols) */}
                  <div className="md:col-span-4 flex items-center justify-center select-none">
                    <div className="relative w-40 h-40 sm:w-44 sm:h-44 flex items-center justify-center">
                      {/* Ambient Halo */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF5E00]/20 via-[#00E5FF]/15 to-[#A800FF]/20 blur-xl animate-pulse" />

                      {/* Clean Vector Coding Character Illustration */}
                      <svg
                        viewBox="0 0 200 200"
                        className="w-full h-full relative z-10 drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
                      >
                        {/* Shadow floor */}
                        <ellipse cx="100" cy="180" rx="75" ry="12" fill="#000000" opacity="0.6" />

                        {/* Desk surface */}
                        <rect x="35" y="148" width="130" height="7" rx="3.5" fill="#222222" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                        <rect x="50" y="155" width="6" height="25" fill="#181818" rx="2" />
                        <rect x="144" y="155" width="6" height="25" fill="#181818" rx="2" />

                        {/* Developer Body */}
                        {/* Torso in Hoodie / Sweater */}
                        <path d="M72 135 C68 115, 74 100, 100 100 C126 100, 132 115, 128 135 Z" fill="#E65100" />
                        
                        {/* Arms extended to keyboard */}
                        <path d="M72 118 Q86 138 98 135" stroke="#E65100" strokeWidth="8" strokeLinecap="round" fill="none" />
                        <path d="M128 118 Q114 138 102 135" stroke="#E65100" strokeWidth="8" strokeLinecap="round" fill="none" />

                        {/* Head & Hair */}
                        <circle cx="100" cy="82" r="15" fill="#D4A373" />
                        {/* Hair */}
                        <path d="M85 80 C85 68, 115 68, 115 80 C112 72, 88 72, 85 80 Z" fill="#1E1E1E" />
                        <path d="M85 78 C82 85, 87 90, 89 88" stroke="#1E1E1E" strokeWidth="3" strokeLinecap="round" />

                        {/* Modern Laptop with Glowing Screen */}
                        <polygon points="76,146 124,146 120,132 80,132" fill="#333333" />
                        {/* Laptop Lid/Display */}
                        <polygon points="78,132 122,132 126,108 74,108" fill="#1A1A1A" stroke="#00E5FF" strokeWidth="1.5" />
                        {/* Screen Glow */}
                        <polygon points="80,130 120,130 124,110 76,110" fill="url(#screenGradient)" />

                        {/* Screen Glow Light Beam */}
                        <polygon points="76,110 124,110 110,85 90,85" fill="url(#lightBeam)" opacity="0.3" />

                        {/* Floating Agent Nodes */}
                        <circle cx="50" cy="70" r="11" fill="#111111" stroke="#FF5E00" strokeWidth="1.5" />
                        <text x="50" y="73.5" textAnchor="middle" fill="#FF5E00" fontSize="7" fontFamily="monospace" fontWeight="bold">AI</text>

                        <circle cx="155" cy="75" r="12" fill="#111111" stroke="#00E5FF" strokeWidth="1.5" />
                        <text x="155" y="78.5" textAnchor="middle" fill="#00E5FF" fontSize="7" fontFamily="monospace" fontWeight="bold">RAG</text>

                        <circle cx="140" cy="40" r="9" fill="#111111" stroke="#A800FF" strokeWidth="1.5" />
                        <text x="140" y="43" textAnchor="middle" fill="#A800FF" fontSize="6" fontFamily="monospace" fontWeight="bold">API</text>

                        {/* Sparkles */}
                        <path d="M60 45 L62 48 L65 50 L62 52 L60 55 L58 52 L55 50 L58 48 Z" fill="#FF5E00" opacity="0.8" />
                        <path d="M165 110 L166 112 L168 113 L166 114 L165 116 L164 114 L162 113 L164 112 Z" fill="#00E5FF" opacity="0.8" />

                        <defs>
                          <linearGradient id="screenGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#00E5FF" />
                            <stop offset="100%" stopColor="#0A66C2" />
                          </linearGradient>
                          <linearGradient id="lightBeam" x1="0" y1="1" x2="0" y2="0">
                            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>

            {/* SECTION 2: GET IN TOUCH */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3.5"
            >
              {/* Header with Chevron */}
              <div className="flex items-center justify-between">
                <h3 className="text-3xl sm:text-4xl font-serif font-normal text-white tracking-tight">
                  Get In Touch
                </h3>
                <div className="w-9 h-9 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>

              {/* 3 Squircle Action Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                
                {/* 1. EMAIL CARD (Dark Glass) */}
                <a
                  ref={emailGlassRef}
                  href="mailto:sujithputta02@gmail.com"
                  className="rounded-3xl border border-white/15 bg-[#141414]/90 p-5 sm:p-6 flex flex-col justify-between min-h-[160px] liquid-glass-clear hover:border-[#FF5E00]/60 transition-all hover:-translate-y-1 shadow-lg group select-none"
                >
                  <Mail className="w-8 h-8 text-white group-hover:text-[#FF5E00] transition-colors" />

                  {/* Dot-Line-Dot Divider matching reference */}
                  <div className="flex items-center gap-1.5 w-full my-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                    <div className="flex-1 h-[1px] bg-white/20" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  </div>

                  <span className="font-mono text-[11px] text-white/80 group-hover:text-white transition-colors truncate">
                    sujithputta02@gmail.com
                  </span>
                </a>

                {/* 2. LINKEDIN CARD (Royal Blue Glass) */}
                <a
                  ref={linkedinGlassRef}
                  href="https://linkedin.com/in/sujithputta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-3xl border border-[#00E5FF]/40 bg-[#0A66C2] p-5 sm:p-6 flex flex-col justify-between min-h-[160px] shadow-[0_15px_35px_rgba(10,102,194,0.4)] hover:shadow-[0_22px_45px_rgba(10,102,194,0.65)] transition-all hover:-translate-y-1 group select-none"
                >
                  {/* LinkedIn 'in' Monogram matching reference */}
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#0A66C2] font-black text-xl font-sans leading-none shadow-md">
                    in
                  </div>

                  {/* Dot-Line-Dot Divider */}
                  <div className="flex items-center gap-1.5 w-full my-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                    <div className="flex-1 h-[1px] bg-white/40" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
                  </div>

                  <span className="font-mono text-[11px] text-white font-medium truncate">
                    linkedin.com/in/sujithputta
                  </span>
                </a>

                {/* 3. GITHUB / PORTFOLIO CARD (Light Luxury Creme / Slate matching Behance card) */}
                <a
                  ref={githubGlassRef}
                  href="https://github.com/sujithputta02"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-3xl border border-[#111111]/20 bg-[#EDE8DF] text-[#111111] p-5 sm:p-6 flex flex-col justify-between min-h-[160px] shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 group select-none"
                >
                  {/* GitHub Octocat Vector */}
                  <svg className="w-8 h-8 fill-[#111111] group-hover:scale-105 transition-transform" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>

                  {/* Dot-Line-Dot Divider */}
                  <div className="flex items-center gap-1.5 w-full my-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#111111]/40" />
                    <div className="flex-1 h-[1px] bg-[#111111]/30" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#111111]/40" />
                  </div>

                  <span className="font-mono text-[11px] text-[#111111] font-bold truncate">
                    github.com/sujithputta02
                  </span>
                </a>

              </div>
            </motion.div>

          </div>

        </div>

        {/* Section Corner Index */}
        <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between text-white/40 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-xl font-display font-black text-white">36</span>
            <span className="uppercase tracking-widest text-[10px]">Identity &amp; Background Matrix</span>
          </div>
          <span className="text-[10px] uppercase">Bangalore, India</span>
        </div>

      </div>
    </section>
  );
}
