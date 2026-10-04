"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Cpu, Layers, ShieldCheck, Terminal } from "lucide-react";

interface CapabilityCard {
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  accent: string;
}

function CapCard({ cap, idx }: { cap: CapabilityCard; idx: number }) {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-80, 80], [6, -6]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-80, 80], [-6, 6]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    mouseX.set(cx - rect.width / 2);
    mouseY.set(cy - rect.height / 2);
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
      whileHover={{ scale: 1.02, zIndex: 10 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="w-full max-w-[340px] md:w-[340px] shrink-0 relative cursor-pointer select-none"
    >
      {/* Card Front */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0, opacity: flipped ? 0 : 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="bg-[#111111] border border-white/12 rounded-2xl p-6 flex flex-col justify-between h-[280px] group relative overflow-hidden shadow-xl hover:border-white/25 transition-all text-left"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <span className="font-mono text-[9px] uppercase tracking-wider text-white/50">
            {cap.category}
          </span>
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white">
            {cap.icon}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-display font-bold text-white tracking-tight leading-snug">
            {cap.title}
          </h3>
          <p className="text-xs text-white/60 font-sans mt-2 line-clamp-2 leading-relaxed font-light">
            {cap.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex flex-wrap gap-1">
            {cap.tags.slice(0, 2).map((t, i) => (
              <span key={i} className="text-[9px] font-mono text-white/50 bg-white/5 px-2 py-0.5 rounded-full border border-white/5">
                {t}
              </span>
            ))}
          </div>
          <span className="text-[9px] font-mono text-[#FF5E00] uppercase font-bold flex items-center gap-1">
            Flip ↗
          </span>
        </div>
      </motion.div>

      {/* Card Back */}
      <motion.div
        animate={{ rotateY: flipped ? 0 : -180, opacity: flipped ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-[#EDE8DF] text-[#151413] border-2 border-[#1A1918] rounded-2xl p-6 flex flex-col justify-between h-[280px] shadow-2xl text-left"
        style={{ backfaceVisibility: "hidden" }}
      >
        <div className="flex items-center justify-between border-b border-black/10 pb-2">
          <span className="font-mono text-[9px] uppercase tracking-widest font-bold text-black/60">
            SPECIFICATION MATRIX
          </span>
          <span className="font-mono text-[9px] font-bold text-[#FF5E00]">
            0{idx + 1} // ACTIVE
          </span>
        </div>

        <div className="space-y-2">
          <h4 className="font-display font-black text-lg text-black leading-tight">
            {cap.title}
          </h4>
          <p className="text-xs text-black/70 font-sans leading-relaxed">
            {cap.description}
          </p>
        </div>

        <div className="border-t border-black/10 pt-3 flex flex-wrap gap-1.5">
          {cap.tags.map((t, i) => (
            <span key={i} className="text-[8px] font-mono text-black/80 bg-black/5 px-2 py-0.5 rounded-full border border-black/10">
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Capabilities() {
  const [paused, setPaused] = useState(false);

  const capabilities: CapabilityCard[] = [
    {
      title: "Generative AI & Agent Workflows",
      category: "01 // CORE AI",
      description: "Architecting context-aware AI pipelines with local LLMs (Ollama LLaMA 3), multimodal Gemini models, and agent coordination systems.",
      icon: <Cpu className="w-4 h-4 text-[#FF5E00]" />,
      tags: ["Gemini 2.5", "Ollama", "RAG", "LangChain", "PyTorch"],
      accent: "#FF5E00",
    },
    {
      title: "Hybrid Search & Vector Stores",
      category: "02 // RETRIEVAL",
      description: "Dense vector indexing with FAISS and knowledge graph traversal with Neo4j, delivering sub-second retrieval in air-gapped environments.",
      icon: <Layers className="w-4 h-4 text-[#00E5FF]" />,
      tags: ["FAISS", "Neo4j", "Vector Search", "Embeddings", "MMR Scoring"],
      accent: "#00E5FF",
    },
    {
      title: "Full-Stack Microservices & APIs",
      category: "03 // BACKEND ARCHITECTURE",
      description: "Async Python/FastAPI microservices and Node.js/Express controllers with strict Zod validation, rate limiting, and RBAC.",
      icon: <Terminal className="w-4 h-4 text-[#A800FF]" />,
      tags: ["FastAPI", "Node.js", "Express", "REST APIs", "GraphQL"],
      accent: "#A800FF",
    },
    {
      title: "DevOps & Cloud Pipelines",
      category: "04 // CLOUD INFRASTRUCTURE",
      description: "Containerization with Docker, multi-stage GitHub Actions CI/CD workflows, and automated deployments on Microsoft Azure and AWS.",
      icon: <ShieldCheck className="w-4 h-4 text-[#10B981]" />,
      tags: ["Azure", "AWS", "Docker", "GitHub Actions CI/CD", "Linux"],
      accent: "#10B981",
    },
  ];

  const repeatedItems = [...capabilities, ...capabilities, ...capabilities];

  return (
    <section className="w-full px-2 sm:px-4 md:px-5 py-4 sm:py-6 scroll-mt-20 text-left select-none">
      <div className="editorial-frame w-full p-6 sm:p-10 md:p-12 relative overflow-hidden">
        
        {/* Frame Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8 font-mono text-xs text-white/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF7A00] animate-pulse" />
            <span className="uppercase tracking-widest text-white/70">
              03 // TECHNICAL FOCUS & CAPABILITIES
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>Hover · Tilt · Click to Flip</span>
            <div className="w-16 h-1.5 rounded-full spectrum-pill" />
          </div>
        </div>

        <div className="mb-10">
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-none">
            Core Focus Areas
          </h2>
          <p className="font-sans text-sm sm:text-base text-white/60 mt-3 max-w-xl font-light">
            Modular engineering domains spanning localized generative AI, hybrid graph retrieval, and production microservice routing.
          </p>
        </div>

        {/* Desktop Marquee / Mobile Grid */}
        <div
          className="w-full overflow-hidden py-4 -my-4"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
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

        {/* Section Corner Index */}
        <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between text-white/40 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-xl font-display font-black text-white">41</span>
            <span className="uppercase tracking-widest text-[10px]">Technical Focus Modules</span>
          </div>
          <span className="text-[10px] uppercase">Magnetic 3D Card Physics</span>
        </div>

      </div>
    </section>
  );
}
