"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CapabilityCard {
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  accent: string;
}

// ── Individual interactive card ───────────────────────────────────────────────
function CapCard({ cap, idx }: { cap: CapabilityCard; idx: number }) {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Magnetic tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-80, 80], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-80, 80], [-8, 8]), { stiffness: 300, damping: 30 });

  // Glow position
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    mouseX.set(cx - rect.width / 2);
    mouseY.set(cy - rect.height / 2);
    setGlowPos({ x: (cx / rect.width) * 100, y: (cy / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setFlipped((f) => !f)}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      whileHover={{ scale: 1.01, zIndex: 10 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="w-full max-w-[350px] md:w-[350px] shrink-0 relative cursor-pointer"
    >
      {/* Card face — front */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0, opacity: flipped ? 0 : 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white border-2 border-black rounded-none p-6 flex flex-col justify-between h-[280px] group relative overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all duration-150"
        style={{ backfaceVisibility: "hidden" }}
      >
        {/* Dynamic glow overlay */}
        <div
          className="absolute inset-0 rounded-none pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(200px circle at ${glowPos.x}% ${glowPos.y}%, ${cap.accent}12, transparent 70%)`,
          }}
        />

        {/* Accent top bar */}
        <motion.div
          className="absolute top-0 left-0 h-[3px] rounded-none"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ backgroundColor: cap.accent }}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between border-b-2 border-black/10 pb-3">
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="p-2 rounded-none border border-black/10 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] bg-white"
                style={{ color: "#111111" }}
              >
                {cap.icon}
              </motion.div>
              <span className="font-pixel text-[9px] text-[#555555] uppercase tracking-wider font-bold">
                {cap.category}
              </span>
            </div>
            <span className="text-[10px] font-pixel text-[#555555] opacity-40 group-hover:opacity-100 transition-opacity font-bold">
              [{String(idx % 4 + 1).padStart(2, "0")}]
            </span>
          </div>

          <h3 className="text-lg font-pixel font-bold text-[#111111] mt-4">{cap.title}</h3>
          <p className="text-xs font-sans text-[#555555] mt-2 leading-relaxed">{cap.description}</p>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          {/* Tag pills */}
          <div className="flex flex-wrap gap-1.5">
            {cap.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-none text-[8px] font-pixel bg-[#111111]/5 text-[#555555] border border-black/15 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
              >
                {tag}
              </span>
            ))}
            {cap.tags.length > 3 && (
              <span
                className="px-2 py-0.5 rounded-none text-[8px] font-pixel text-[#111111] font-bold border border-black/15 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                style={{ backgroundColor: `${cap.accent}55` }}
              >
                +{cap.tags.length - 3}
              </span>
            )}
          </div>
          {/* Flip hint */}
          <motion.div
            initial={{ opacity: 0, x: -6 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="flex items-center gap-1 text-[9px] font-pixel text-[#555555] font-bold"
          >
            ALL <ArrowRight className="w-3 h-3" />
          </motion.div>
        </div>
      </motion.div>

      {/* Card face — back (all tags) */}
      <motion.div
        animate={{ rotateY: flipped ? 0 : -180, opacity: flipped ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 rounded-none p-6 flex flex-col justify-between h-[280px] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        style={{
          backfaceVisibility: "hidden",
          backgroundColor: "#111111",
        }}
      >
        {/* Glowing top bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] rounded-none" style={{ backgroundColor: cap.accent }} />

        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-none border border-white/20 shadow-[1px_1px_0px_0px_rgba(255,255,255,0.15)]" style={{ backgroundColor: `${cap.accent}25`, color: cap.accent }}>
              {cap.icon}
            </div>
            <span className="font-pixel text-[9px] uppercase tracking-wider font-bold" style={{ color: cap.accent }}>
              FULL STACK
            </span>
          </div>
          <h3 className="text-base font-pixel font-bold text-white mb-3">{cap.title}</h3>
          <div className="flex flex-wrap gap-1.5">
            {cap.tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="px-2.5 py-1 rounded-none text-[9px] font-pixel font-bold border"
                style={{
                  color: cap.accent,
                  borderColor: `${cap.accent}35`,
                  backgroundColor: `${cap.accent}12`,
                  boxShadow: "1px 1px 0px 0px rgba(255,255,255,0.1)"
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        <p className="font-pixel text-[9px] text-white/30 text-right">CLICK TO FLIP BACK ↩</p>
      </motion.div>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Capabilities() {
  const [paused, setPaused] = useState(false);

  const capabilities: CapabilityCard[] = [
    {
      title: "Backend Architecture",
      category: "APIs & Core Systems",
      description: "Production-ready REST & GraphQL query layers built with FastAPI, Node.js, and Express, adhering strictly to SOLID development standards.",
      icon: (
        <svg viewBox="0 0 16 16" className="w-5 h-5" fill="currentColor">
          <rect x="3" y="2" width="10" height="3" />
          <rect x="3" y="6" width="10" height="3" />
          <rect x="3" y="10" width="10" height="3" />
          <circle cx="5" cy="3.5" r="0.7" fill="white" />
          <circle cx="5" cy="7.5" r="0.7" fill="white" />
          <circle cx="5" cy="11.5" r="0.7" fill="white" />
        </svg>
      ),
      tags: ["FastAPI", "Node.js", "Express", "REST APIs", "GraphQL", "SOLID Principles"],
      accent: "#4ADE80",
    },
    {
      title: "Frontend Engineering",
      category: "Interfaces & Interactions",
      description: "Polished, component-driven UI applications designed using React, TypeScript, Vite, Tailwind CSS, and Framer Motion dynamics.",
      icon: (
        <svg viewBox="0 0 16 16" className="w-5 h-5" fill="none">
          <path d="M 4 4 L 8 7 L 4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          <line x1="9" y1="10" x2="12" y2="10" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
      tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "Component UI", "Figma"],
      accent: "#60A5FA",
    },
    {
      title: "Database Engineering",
      category: "Storage & Indexing",
      description: "Highly optimised schemas. Master of FAISS vector indexes, Neo4j knowledge graphs, MongoDB documents, and MySQL relational queries.",
      icon: (
        <svg viewBox="0 0 16 16" className="w-5 h-5" fill="currentColor">
          <rect x="4" y="3" width="8" height="2" />
          <rect x="4" y="7" width="8" height="2" />
          <rect x="4" y="11" width="8" height="2" />
        </svg>
      ),
      tags: ["FAISS (Vector)", "Neo4j (Graph)", "MongoDB", "MySQL", "Query Optimisation"],
      accent: "#F472B6",
    },
    {
      title: "DevOps & Cloud Systems",
      category: "Infrastructure & Security",
      description: "Multi-cloud infrastructure management over Microsoft Azure and AWS, containerised Docker instances, and CI/CD pipeline automation.",
      icon: (
        <svg viewBox="0 0 16 16" className="w-5 h-5" fill="currentColor">
          <rect x="5" y="5" width="6" height="6" />
          <line x1="3" y1="6" x2="5" y2="6" stroke="currentColor" strokeWidth="1.2" />
          <line x1="3" y1="8" x2="5" y2="8" stroke="currentColor" strokeWidth="1.2" />
          <line x1="3" y1="10" x2="5" y2="10" stroke="currentColor" strokeWidth="1.2" />
          <line x1="11" y1="6" x2="13" y2="6" stroke="currentColor" strokeWidth="1.2" />
          <line x1="11" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="1.2" />
          <line x1="11" y1="10" x2="13" y2="10" stroke="currentColor" strokeWidth="1.2" />
          <line x1="6" y1="3" x2="6" y2="5" stroke="currentColor" strokeWidth="1.2" />
          <line x1="8" y1="3" x2="8" y2="5" stroke="currentColor" strokeWidth="1.2" />
          <line x1="10" y1="3" x2="10" y2="5" stroke="currentColor" strokeWidth="1.2" />
          <line x1="6" y1="11" x2="6" y2="13" stroke="currentColor" strokeWidth="1.2" />
          <line x1="8" y1="11" x2="8" y2="13" stroke="currentColor" strokeWidth="1.2" />
          <line x1="10" y1="11" x2="10" y2="13" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      ),
      tags: ["Azure", "AWS", "Docker", "GitHub Actions CI/CD", "Linux (Ubuntu)"],
      accent: "#C7FF3D",
    },
  ];

  const repeatedItems = [...capabilities, ...capabilities, ...capabilities];

  return (
    <section className="py-20 border-b-2 border-black bg-[#F7F7F5] relative overflow-hidden w-full select-none">
      <div className="max-w-6xl mx-auto px-4 md:px-8 mb-12 flex items-end justify-between">
        <div>
          <span className="font-pixel text-xs text-[#555555] tracking-widest uppercase font-bold">
            03 // TECH CAPABILITIES
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-[#111111] mt-3">
            Core Focus Areas
          </h2>
        </div>
        <span className="hidden md:block font-pixel text-[10px] text-[#555555] mb-1 font-bold">
          HOVER · TILT · CLICK TO FLIP
        </span>
      </div>

      {/* Mobile Grid View (no continuous animations for peak mobile performance) */}
      <div className="md:hidden px-4 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {capabilities.map((cap, idx) => (
          <CapCard key={`${cap.title}-mobile`} cap={cap} idx={idx} />
        ))}
      </div>

      {/* Desktop Marquee track */}
      <div
        className="hidden md:flex w-full overflow-hidden py-6 -my-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div
          className="flex gap-6 shrink-0 min-w-full justify-around pr-6 py-2"
          style={{
            animation: `marquee 40s linear infinite`,
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {repeatedItems.map((cap, idx) => (
            <CapCard key={`${cap.title}-${idx}`} cap={cap} idx={idx} />
          ))}
        </div>
      </div>

      {/* Edge fade masks */}
      <div className="hidden md:block absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F7F7F5] to-transparent pointer-events-none z-10" />
      <div className="hidden md:block absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#F7F7F5] to-transparent pointer-events-none z-10" />
    </section>
  );
}
