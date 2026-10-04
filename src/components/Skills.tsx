"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { profileData } from "@/data/profile";
import { Search, X, Code, CheckCircle, Sparkles, ExternalLink } from "lucide-react";
import { LiquidGlassCard } from "@/components/LiquidGlassCard";

// ─────────────────────────────────────────────────────────────
// AUTHENTIC RETRO GRAPHIC EMBLEMS (From Image 2)
// ─────────────────────────────────────────────────────────────

// Card 1: 3-Stripe Curving Ribbon "2" (Warm Orange & Amber stripes)
function EmblemRibbonTwo() {
  return (
    <svg viewBox="0 0 220 220" className="w-full h-full" fill="none">
      <rect width="220" height="220" fill="#151413" />
      {/* Stripe 1 (Outer Red-Orange) */}
      <path
        d="M 40 45 L 170 45 C 195 45 195 90 170 90 L 70 90 C 45 90 45 155 70 155 L 180 155"
        stroke="#FF3B1D"
        strokeWidth="15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Stripe 2 (Middle Warm Orange) */}
      <path
        d="M 40 68 L 165 68 C 180 68 180 110 165 110 L 75 110 C 60 110 60 176 75 176 L 180 176"
        stroke="#FF7A00"
        strokeWidth="15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Stripe 3 (Inner Amber-Yellow) */}
      <path
        d="M 40 91 L 155 91 C 165 91 165 130 155 130 L 85 130 C 75 130 75 197 85 197 L 180 197"
        stroke="#FFAA00"
        strokeWidth="15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Card 2: Horizontal Speed-Line Scanlines "3" / "B" (Image 2)
function EmblemSpeedlineThree() {
  const lines = [
    { y: 35, w: 140, ext: 40 },
    { y: 44, w: 145, ext: 45 },
    { y: 53, w: 150, ext: 50 },
    { y: 62, w: 155, ext: 55 },
    { y: 71, w: 150, ext: 50 },
    { y: 80, w: 135, ext: 35 },
    { y: 89, w: 120, ext: 20 },
    { y: 98, w: 110, ext: 10 },
    { y: 107, w: 130, ext: 30 },
    { y: 116, w: 145, ext: 45 },
    { y: 125, w: 155, ext: 55 },
    { y: 134, w: 160, ext: 60 },
    { y: 143, w: 160, ext: 60 },
    { y: 152, w: 155, ext: 55 },
    { y: 161, w: 145, ext: 45 },
    { y: 170, w: 135, ext: 35 },
    { y: 179, w: 120, ext: 20 },
  ];

  return (
    <svg viewBox="0 0 220 220" className="w-full h-full" fill="none">
      <rect width="220" height="220" fill="#151413" />
      {lines.map((l, i) => (
        <g key={i}>
          {/* Main solid bar */}
          <rect x="35" y={l.y} width={l.w} height="5" fill="#FF4425" rx="1.5" />
          {/* Speed line trailing segments */}
          <rect x={35 + l.w + 6} y={l.y} width="12" height="5" fill="#FF4425" opacity="0.8" rx="1" />
          <rect x={35 + l.w + 22} y={l.y} width="8" height="5" fill="#FF4425" opacity="0.5" rx="1" />
          <rect x={35 + l.w + 34} y={l.y} width="5" height="5" fill="#FF4425" opacity="0.25" rx="1" />
        </g>
      ))}
    </svg>
  );
}

// Card 3: Geometric Block "4" with Horizontal Grille Slats (Image 2)
function EmblemGrilleFour() {
  return (
    <svg viewBox="0 0 220 220" className="w-full h-full" fill="none">
      <rect width="220" height="220" fill="#151413" />
      {/* Top triangle head of 4 */}
      <path d="M 40 120 L 120 30 L 120 120 Z" fill="#FF4425" />
      {/* Solid vertical pillar */}
      <rect x="120" y="30" width="40" height="160" fill="#FF4425" />
      {/* Horizontal Grille Slats across horizontal crossbar */}
      {[105, 115, 125, 135, 145, 155, 165].map((y, i) => (
        <rect key={i} x="35" y={y} width="150" height="5" fill="#FF4425" />
      ))}
    </svg>
  );
}

// Card 4: Precision Circular Loop / Tech Omega Symbol (Image 2)
function EmblemOmegaFive() {
  return (
    <svg viewBox="0 0 220 220" className="w-full h-full" fill="none">
      <rect width="220" height="220" fill="#151413" />
      {/* Circular loop with open bottom */}
      <path
        d="M 65 160 C 45 140 35 110 45 75 C 60 35 110 25 145 35 C 180 50 190 95 180 130 C 170 150 155 160 145 160"
        stroke="#FF4425"
        strokeWidth="24"
        strokeLinecap="square"
        fill="none"
      />
      {/* Horizontal feet extensions */}
      <rect x="35" y="148" width="38" height="24" fill="#FF4425" />
      <rect x="137" y="148" width="38" height="24" fill="#FF4425" />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// COLLECTOR CARDS CONFIGURATION (Matched to Sujith's stack)
// ─────────────────────────────────────────────────────────────
interface CollectorCardData {
  edition: string;
  num: string;
  categoryKey: string;
  title: string;
  discipline: string;
  component: React.ComponentType;
  skills: string[];
  description: string;
}

const collectorCards: CollectorCardData[] = [
  {
    edition: "29/36",
    num: "2",
    categoryKey: "ai",
    title: "Sovereign AI & Vector RAG",
    discipline: "Autonomous Intelligence",
    component: EmblemRibbonTwo,
    skills: ["FAISS Vector Store", "Neo4j Knowledge Graphs", "FastAPI RAG", "LLaMA 3 (Ollama)", "Gemini 2.5 Flash", "scikit-learn"],
    description: "Air-gapped retrieval engines, hybrid dense-sparse vector scoring, and autonomous multi-agent pipelines with zero data leakage."
  },
  {
    edition: "30/36",
    num: "3",
    categoryKey: "backend",
    title: "Full-Stack & Asynchronous APIs",
    discipline: "Distributed Systems",
    component: EmblemSpeedlineThree,
    skills: ["FastAPI Microservices", "Node.js / Express", "React 19 / TypeScript", "REST & GraphQL", "MongoDB Atlas", "MySQL Queries"],
    description: "High-concurrency microservice routers, sub-second query execution, and robust schema validation pipelines."
  },
  {
    edition: "31/36",
    num: "4",
    categoryKey: "devops",
    title: "Cloud Infrastructure & SecOps",
    discipline: "Reliability & Defense",
    component: EmblemGrilleFour,
    skills: ["Microsoft Azure AI", "AWS Cloud Academy", "Docker Containment", "GitHub Actions CI/CD", "OWASP Top 10", "JWT / RBAC"],
    description: "Containerized deployment clusters, automated integration pipelines, and cryptographic access authorization boundaries."
  },
  {
    edition: "32/36",
    num: "5",
    categoryKey: "frontend",
    title: "High-Performance Interfaces & 3D",
    discipline: "Interactive Craft",
    component: EmblemOmegaFive,
    skills: ["Three.js / React Three Fiber", "Tailwind CSS Architecture", "Framer Motion Springs", "Vite Native Bundling", "Figma Design Systems"],
    description: "Component-driven design systems, dynamic coordinate hover optics, and 60fps micro-animation choreography."
  }
];

function ScrollCollectorCard({
  card,
  isSelected,
  onSelect,
  idx
}: {
  card: CollectorCardData;
  isSelected: boolean;
  onSelect: () => void;
  idx: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [35, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.4, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  const EmblemComponent = card.component;

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        y,
        opacity,
        scale,
        transformPerspective: 1000
      }}
      whileHover={{ y: -6, scale: 1.015 }}
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className={`retro-collector-card p-4 sm:p-5 flex flex-col justify-between cursor-pointer relative overflow-hidden transition-all ${
        isSelected ? "ring-4 ring-[#FF5E00] shadow-[0_0_30px_rgba(255,94,0,0.5)]" : ""
      }`}
    >
      {/* Top Inner Dark Framed Graphic Panel */}
      <div className="w-full aspect-square rounded-xl overflow-hidden border-2 border-[#1A1918] bg-[#151413] shadow-inner mb-4 relative">
        <EmblemComponent />
        
        {/* Subtle hover gleam */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Card Title & Discipline */}
      <div className="space-y-1 mb-4">
        <span className="font-mono text-[9px] text-[#7A746B] uppercase font-bold tracking-wider block">
          {card.discipline}
        </span>
        <h3 className="font-display font-black text-lg text-[#1A1918] leading-tight line-clamp-1">
          {card.title}
        </h3>
      </div>

      {/* Card Bottom Meta: Edition (Left) & Large Numeral (Right) - Exactly as in Image 2 */}
      <div className="border-t-2 border-[#1A1918] pt-3 flex items-center justify-between font-display font-black text-[#1A1918]">
        <span className="text-xl sm:text-2xl tracking-tighter">
          {card.edition}
        </span>
        <span className="text-3xl sm:text-4xl leading-none">
          {card.num}
        </span>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [selectedCard, setSelectedCard] = useState<CollectorCardData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { skills } = profileData;

  // Flatten all skills for quick search
  const allSkillsList: { name: string; category: string }[] = [];
  Object.entries(skills).forEach(([category, list]) => {
    list.forEach(name => {
      allSkillsList.push({ name, category });
    });
  });

  const filteredSkills = searchQuery.trim()
    ? allSkillsList.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <section id="skills" className="w-full px-2 sm:px-4 md:px-5 py-4 sm:py-6 flex flex-col gap-6 text-left">
      
      {/* ─────────────────────────────────────────────────────────────
          SECTION FRAME HEADER
         ───────────────────────────────────────────────────────────── */}
      <div className="editorial-frame w-full p-6 sm:p-10 md:p-12 relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8 font-mono text-xs text-white/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF5E00] animate-pulse" />
            <span className="uppercase tracking-widest text-white/70">ARCHITECTURAL DOMAINS // EDITION 2026</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Click any card to inspect stack specs</span>
            <div className="w-16 h-1.5 rounded-full spectrum-pill" />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none font-normal">
              Skills &amp; Architecture<sup className="font-sans text-xs sm:text-sm font-mono text-white/50 ml-1.5 top-[-1.5em] sm:top-[-2.2em] font-normal">(02)</sup>
            </h2>
            <p className="font-sans text-sm sm:text-base text-white/60 mt-3 max-w-xl font-light">
              Collector edition technical cards classifying specialized core competencies—from air-gapped agentic intelligence to distributed cloud infrastructure.
            </p>
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Search stack (e.g. FAISS, Docker)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-full py-2.5 pl-10 pr-9 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#FF5E00] focus:ring-1 focus:ring-[#FF5E00] transition-all font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Live Search Overlay if typing */}
        {searchQuery.trim() !== "" && (
          <div className="mb-10 p-5 rounded-2xl bg-[#111111] border border-white/15">
            <div className="flex items-center justify-between text-xs font-mono text-white/50 mb-3 border-b border-white/10 pb-2">
              <span>FOUND {filteredSkills.length} MATCHES FOR &ldquo;{searchQuery}&rdquo;</span>
              <button onClick={() => setSearchQuery("")} className="underline hover:text-white">Clear</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {filteredSkills.map((s, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-xs text-white font-mono flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5E00]" />
                  <span>{s.name}</span>
                  <span className="text-[9px] text-white/40 uppercase">({s.category})</span>
                </div>
              ))}
              {filteredSkills.length === 0 && (
                <p className="text-xs text-white/40 font-mono py-2">No matching stack items found. Try searching for Python, Docker, or React.</p>
              )}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            THE 4 RETRO COLLECTOR CARDS (Exact Pattern From Image 2)
           ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
          {collectorCards.map((card, idx) => {
            const isSelected = selectedCard?.edition === card.edition;
            return (
              <ScrollCollectorCard
                key={card.edition}
                card={card}
                isSelected={isSelected}
                onSelect={() => setSelectedCard(isSelected ? null : card)}
                idx={idx}
              />
            );
          })}
        </div>

        {/* ─────────────────────────────────────────────────────────────
            EXPANDABLE SPECIFICATION ACCORDION PANEL (On Card Click)
           ───────────────────────────────────────────────────────────── */}
        <AnimatePresence>
          {selectedCard && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden mt-8 pt-6 border-t border-white/15"
            >
              <LiquidGlassCard
                className="border border-white/20 rounded-2xl p-6 sm:p-8 text-white relative"
                options={{ radius: 16, scale: -95, chroma: 5, border: 0.05, mapBlur: 10, blur: 0, fallbackBlur: 0 }}
              >
                <button
                  onClick={() => setSelectedCard(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                  <div>
                    <span className="font-mono text-xs text-[#FF5E00] uppercase tracking-widest block mb-1">
                      {selectedCard.edition} // {selectedCard.discipline}
                    </span>
                    <h4 className="font-display font-black text-2xl sm:text-3xl text-white">
                      {selectedCard.title}
                    </h4>
                    <p className="font-sans text-sm text-white/70 mt-2 max-w-2xl font-light">
                      {selectedCard.description}
                    </p>
                  </div>

                  <div className="font-mono text-xs text-white/40 uppercase bg-white/5 px-4 py-2 rounded-xl border border-white/10 shrink-0">
                    Production Verified // 100% Type-Safe
                  </div>
                </div>

                {/* Skill Pills */}
                <div className="border-t border-white/10 pt-4">
                  <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest block mb-3">
                    Active Technologies In Stack:
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {selectedCard.skills.map((s, idx) => (
                      <span
                        key={idx}
                        className="px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-white font-mono flex items-center gap-2 hover:border-[#FF5E00] transition-colors"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-[#FF5E00]" />
                        <span>{s}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </LiquidGlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section Corner Index */}
        <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between text-white/40 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-xl font-display font-black text-white">33</span>
            <span className="uppercase tracking-widest text-[10px]">Collector Stack Editions</span>
          </div>
          <span className="text-[10px] uppercase">Designed With Grotesque Precision</span>
        </div>

      </div>

    </section>
  );
}
