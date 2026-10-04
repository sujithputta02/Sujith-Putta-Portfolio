"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue
} from "framer-motion";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { ParallaxOrb } from "@/components/Parallax";

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  // Scroll-driven animation: text comes up dynamically as user scrolls into the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    restDelta: 0.001,
  });

  // Staggered upward scroll transforms: Each line rises up sequentially
  const line1Y = useTransform(smoothProgress, [0.05, 0.65], [110, 0]);
  const line1Opacity = useTransform(smoothProgress, [0.05, 0.55], [0, 0.7]);

  const line2Y = useTransform(smoothProgress, [0.12, 0.75], [150, 0]);
  const line2Opacity = useTransform(smoothProgress, [0.12, 0.65], [0, 1]);

  const line3Y = useTransform(smoothProgress, [0.18, 0.85], [180, 0]);
  const line3Opacity = useTransform(smoothProgress, [0.18, 0.75], [0, 0.7]);

  const line4Y = useTransform(smoothProgress, [0.24, 0.95], [210, 0]);
  const line4Opacity = useTransform(smoothProgress, [0.24, 0.85], [0, 1]);

  // Top micro-insights scroll reveal
  const topInsightsY = useTransform(smoothProgress, [0.02, 0.45], [40, 0]);
  const topInsightsOpacity = useTransform(smoothProgress, [0.02, 0.4], [0, 1]);

  // Interactive Mouse Coordinates & 3D Tilt over Manifesto text
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 220, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 220, damping: 22 });

  const rotateX = useTransform(springY, [-180, 180], [4, -4]);
  const rotateY = useTransform(springX, [-350, 350], [-5, 5]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isSpotlightActive, setIsSpotlightActive] = useState(false);
  const [hoveredLine, setHoveredLine] = useState<string | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const centerX = e.clientX - (rect.left + rect.width / 2);
    const centerY = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(centerX);
    mouseY.set(centerY);
  };

  const handleMouseLeave = () => {
    setIsSpotlightActive(false);
    setHoveredLine(null);
    mouseX.set(0);
    mouseY.set(0);
  };

  const microInsights = [
    {
      num: "01",
      title: "SOVEREIGN RUNTIMES",
      desc: "Air-gapped vector search engines (FAISS) + relational knowledge graphs (Neo4j) operating locally with zero external data leaks.",
      accent: "hover:border-[#FF5E00]/40",
      pill: "text-[#FF5E00]",
    },
    {
      num: "02",
      title: "DETERMINISTIC SCHEMAS",
      desc: "End-to-end type safety, Zod runtime validation, and strict RBAC authorization boundaries across asynchronous FastAPI microservices.",
      accent: "hover:border-[#00E5FF]/40",
      pill: "text-[#00E5FF]",
    },
    {
      num: "03",
      title: "INTERACTIVE ELEVATION",
      desc: "Precision component craftsmanship, cursor-reactive coordinate layers, and fluid 60fps micro-animations.",
      accent: "hover:border-[#A800FF]/40",
      pill: "text-[#A800FF]",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="w-full min-h-screen py-3 sm:py-4 px-2 sm:px-4 md:px-5 flex flex-col justify-center scroll-mt-20 text-left select-none relative overflow-hidden"
    >
      <div className="editorial-frame w-full h-full flex-1 flex flex-col justify-between p-6 sm:p-10 md:p-14 relative overflow-hidden">
        
        {/* Dynamic Background Spotlight Following Cursor */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 -z-0"
          style={{
            opacity: isSpotlightActive ? 1 : 0,
            background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 94, 0, 0.14) 0%, rgba(0, 229, 255, 0.07) 42%, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        {/* Parallax Floating Ambient Depth Orbs */}
        <ParallaxOrb color="#FF5E00" speed={0.4} size={360} top="15%" right="-8%" opacity={0.12} />
        <ParallaxOrb color="#00F0FF" speed={-0.3} size={280} top="65%" left="-5%" opacity={0.08} />

        {/* ─────────────────────────────────────────────────────────────
            TOP 3-COLUMN MICRO-INSIGHTS (Scroll Animated & Interactive)
           ───────────────────────────────────────────────────────────── */}
        <motion.div
          style={{ y: topInsightsY, opacity: topInsightsOpacity }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 border-b border-white/10 pb-6 mb-8 text-xs font-mono text-white/50 leading-relaxed relative z-10"
        >
          {microInsights.map((insight, idx) => (
            <motion.div
              key={insight.num}
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className={`p-3.5 sm:p-4 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 ${insight.accent} cursor-default`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className={`font-bold font-mono text-[11px] ${insight.pill}`}>
                  {insight.num} // {insight.title}
                </span>
                <Sparkles className="w-3 h-3 text-white/20" />
              </div>
              <p className="text-white/60 text-[11px] sm:text-xs leading-relaxed">
                {insight.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* ─────────────────────────────────────────────────────────────
            MASSIVE 4-LINE EDITORIAL STATEMENT (Scroll-Driven Upward Movement + Interactive)
           ───────────────────────────────────────────────────────────── */}
        <motion.div
          ref={textContainerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsSpotlightActive(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            perspective: 1000,
          }}
          className="space-y-1 sm:space-y-2 select-none py-6 sm:py-8 my-auto relative z-10 cursor-pointer"
        >
          {/* LINE 1: COMFORT BUILDS */}
          <motion.div
            style={{ y: line1Y, opacity: line1Opacity }}
            onMouseEnter={() => setHoveredLine("comfort")}
            onMouseLeave={() => setHoveredLine(null)}
            whileHover={{ x: 14 }}
            transition={{ type: "spring", stiffness: 350, damping: 18 }}
            className="group flex items-baseline gap-4"
          >
            <p className="font-display font-light text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-white/70 tracking-tight leading-none uppercase transition-colors duration-300 group-hover:text-white group-hover:tracking-wider">
              Comfort Builds
            </p>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-xs text-[#FF5E00] tracking-widest hidden sm:inline-block">
              // [ STABILITY ]
            </span>
          </motion.div>

          {/* LINE 2: COMPANIES. (Bold, Interactive Glow) */}
          <motion.div
            style={{ y: line2Y, opacity: line2Opacity }}
            onMouseEnter={() => setHoveredLine("companies")}
            onMouseLeave={() => setHoveredLine(null)}
            whileHover={{ x: 22, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 16 }}
            className="group flex items-baseline gap-4"
          >
            <p className="font-display font-black text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-white tracking-tight leading-none uppercase transition-all duration-300 group-hover:text-[#FF5E00] group-hover:drop-shadow-[0_0_40px_rgba(255,94,0,0.6)]">
              Companies.
            </p>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-xs text-[#FF5E00] font-bold tracking-widest hidden md:inline-block">
              // STATUS QUO 01
            </span>
          </motion.div>

          {/* LINE 3: DISRUPTION BUILDS */}
          <motion.div
            style={{ y: line3Y, opacity: line3Opacity }}
            onMouseEnter={() => setHoveredLine("disruption")}
            onMouseLeave={() => setHoveredLine(null)}
            whileHover={{ x: 14 }}
            transition={{ type: "spring", stiffness: 350, damping: 18 }}
            className="group flex items-baseline gap-4 pt-2"
          >
            <p className="font-display font-light text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-white/70 tracking-tight leading-none uppercase transition-colors duration-300 group-hover:text-white group-hover:tracking-wider">
              Disruption Builds
            </p>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-xs text-[#00E5FF] tracking-widest hidden sm:inline-block">
              // [ CATALYST ]
            </span>
          </motion.div>

          {/* LINE 4: INDUSTRIES. (Bold, Electric Cyan Glow) */}
          <motion.div
            style={{ y: line4Y, opacity: line4Opacity }}
            onMouseEnter={() => setHoveredLine("industries")}
            onMouseLeave={() => setHoveredLine(null)}
            whileHover={{ x: 22, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 16 }}
            className="group flex items-baseline gap-4"
          >
            <p className="font-display font-black text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-white tracking-tight leading-none uppercase transition-all duration-300 group-hover:text-[#00E5FF] group-hover:drop-shadow-[0_0_45px_rgba(0,229,255,0.7)]">
              Industries.
            </p>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-xs text-[#00E5FF] font-bold tracking-widest hidden md:inline-block">
              // REVOLUTION 02
            </span>
          </motion.div>
        </motion.div>

        {/* ─────────────────────────────────────────────────────────────
            BOTTOM METADATA & CORNER INDEX
           ───────────────────────────────────────────────────────────── */}
        <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-white/40 font-mono text-xs relative z-10">
          <div className="flex items-center gap-3">
            <span className="text-xl font-display font-black text-white">31</span>
            <span className="uppercase tracking-widest text-[10px] text-white/70 font-semibold">
              Architectural Manifesto
            </span>
          </div>

          <div className="flex items-center gap-4 text-[10px] text-white/50 uppercase tracking-widest">
            <span className="hidden sm:inline">[ HOVER WORDS TO ILLUMINATE · SCROLL TO ELEVATE ]</span>
            <span className="text-[#FF5E00] font-bold">Engineered With Purpose</span>
          </div>
        </div>

      </div>
    </section>
  );
}

