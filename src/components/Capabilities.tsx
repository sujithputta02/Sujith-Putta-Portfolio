"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Terminal, Database, Server, Cpu, ArrowRight } from "lucide-react";

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
      whileHover={{ scale: 1.03, zIndex: 10 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="w-[300px] md:w-[350px] shrink-0 relative cursor-pointer"
    >
      {/* Glow border that follows cursor */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(180px circle at ${glowPos.x}% ${glowPos.y}%, ${cap.accent}40, transparent 70%)`,
        }}
      />

      {/* Card face — front */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0, opacity: flipped ? 0 : 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white border border-[#111111]/8 rounded-3xl p-6 flex flex-col justify-between h-[280px] shadow-sm group relative overflow-hidden"
        style={{ backfaceVisibility: "hidden" }}
      >
        {/* Dynamic glow overlay */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(200px circle at ${glowPos.x}% ${glowPos.y}%, ${cap.accent}18, transparent 70%)`,
          }}
        />

        {/* Accent top bar */}
        <motion.div
          className="absolute top-0 left-0 h-[3px] rounded-t-3xl"
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ backgroundColor: cap.accent }}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between border-b border-[#111111]/5 pb-3">
            <div className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 15, scale: 1.15 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="p-2 rounded-xl"
                style={{ backgroundColor: `${cap.accent}25` }}
              >
                {cap.icon}
              </motion.div>
              <span className="font-mono text-[9px] text-[#555555] uppercase tracking-wider">
                {cap.category}
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#555555] opacity-40 group-hover:opacity-100 transition-opacity">
              [{String(idx % 4 + 1).padStart(2, "0")}]
            </span>
          </div>

          <h3 className="text-lg font-sans font-bold text-[#111111] mt-4">{cap.title}</h3>
          <p className="text-xs font-sans text-[#555555] mt-2 leading-relaxed">{cap.description}</p>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          {/* Tag pills */}
          <div className="flex flex-wrap gap-1.5">
            {cap.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded text-[8px] font-mono bg-[#111111]/5 text-[#555555] border border-transparent"
              >
                {tag}
              </span>
            ))}
            {cap.tags.length > 3 && (
              <span
                className="px-2 py-0.5 rounded text-[8px] font-mono text-[#111111] font-bold"
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
            className="flex items-center gap-1 text-[9px] font-mono text-[#555555]"
          >
            ALL <ArrowRight className="w-3 h-3" />
          </motion.div>
        </div>
      </motion.div>

      {/* Card face — back (all tags) */}
      <motion.div
        animate={{ rotateY: flipped ? 0 : -180, opacity: flipped ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 rounded-3xl p-6 flex flex-col justify-between h-[280px] shadow-md border"
        style={{
          backfaceVisibility: "hidden",
          backgroundColor: "#111111",
          borderColor: `${cap.accent}40`,
        }}
      >
        {/* Glowing top bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-3xl" style={{ backgroundColor: cap.accent }} />

        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl" style={{ backgroundColor: `${cap.accent}25`, color: cap.accent }}>
              {cap.icon}
            </div>
            <span className="font-mono text-[9px] uppercase tracking-wider" style={{ color: cap.accent }}>
              FULL STACK
            </span>
          </div>
          <h3 className="text-base font-sans font-bold text-white mb-3">{cap.title}</h3>
          <div className="flex flex-wrap gap-1.5">
            {cap.tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="px-2.5 py-1 rounded-lg text-[9px] font-mono font-medium border"
                style={{
                  color: cap.accent,
                  borderColor: `${cap.accent}35`,
                  backgroundColor: `${cap.accent}12`,
                }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

        <p className="font-mono text-[9px] text-white/30 text-right">CLICK TO FLIP BACK ↩</p>
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
      icon: <Server className="w-5 h-5 text-[#111111]" />,
      tags: ["FastAPI", "Node.js", "Express", "REST APIs", "GraphQL", "SOLID Principles"],
      accent: "#4ADE80",
    },
    {
      title: "Frontend Engineering",
      category: "Interfaces & Interactions",
      description: "Polished, component-driven UI applications designed using React, TypeScript, Vite, Tailwind CSS, and Framer Motion dynamics.",
      icon: <Terminal className="w-5 h-5 text-[#111111]" />,
      tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "Component UI", "Figma"],
      accent: "#60A5FA",
    },
    {
      title: "Database Engineering",
      category: "Storage & Indexing",
      description: "Highly optimised schemas. Master of FAISS vector indexes, Neo4j knowledge graphs, MongoDB documents, and MySQL relational queries.",
      icon: <Database className="w-5 h-5 text-[#111111]" />,
      tags: ["FAISS (Vector)", "Neo4j (Graph)", "MongoDB", "MySQL", "Query Optimisation"],
      accent: "#F472B6",
    },
    {
      title: "DevOps & Cloud Systems",
      category: "Infrastructure & Security",
      description: "Multi-cloud infrastructure management over Microsoft Azure and AWS, containerised Docker instances, and CI/CD pipeline automation.",
      icon: <Cpu className="w-5 h-5 text-[#111111]" />,
      tags: ["Azure", "AWS", "Docker", "GitHub Actions CI/CD", "Linux (Ubuntu)"],
      accent: "#C7FF3D",
    },
  ];

  const repeatedItems = [...capabilities, ...capabilities, ...capabilities];

  return (
    <section className="py-20 border-b border-[#111111]/8 bg-[#F7F7F5] relative overflow-hidden w-full select-none">
      <div className="max-w-6xl mx-auto px-4 md:px-8 mb-12 flex items-end justify-between">
        <div>
          <span className="font-mono text-xs text-[#555555] tracking-widest uppercase">
            03 // TECH CAPABILITIES
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-[#111111] mt-3">
            Core Focus Areas
          </h2>
        </div>
        <span className="hidden md:block font-mono text-[10px] text-[#555555] mb-1">
          HOVER · TILT · CLICK TO FLIP
        </span>
      </div>

      {/* Marquee track */}
      <div
        className="w-full flex overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div
          className="flex gap-6 shrink-0 min-w-full justify-around pr-6"
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
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F7F7F5] to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#F7F7F5] to-transparent pointer-events-none z-10" />
    </section>
  );
}
