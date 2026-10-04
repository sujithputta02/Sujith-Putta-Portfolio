"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform
} from "framer-motion";
import { ArrowUpRight, Mail, ChevronDown } from "lucide-react";
import { useLiquidGlass } from "@/hooks/useLiquidGlass";

const nameWords = [
  {
    word: "SUJITH",
    letters: [
      { char: "S", tag: "SOVEREIGN AGENTIC RUNTIMES", id: "s1" },
      { char: "U", tag: "ULTRA LOW-LATENCY ROUTERS", id: "u1" },
      { char: "J", tag: "JOINT GRAPH-VECTOR RETRIEVAL", id: "j1" },
      { char: "I", tag: "INTELLIGENT AIR-GAPPED RAG", id: "i1" },
      { char: "T", tag: "TYPE-SAFE PROTOCOLS & ZOD", id: "t1" },
      { char: "H", tag: "HIGH-PERFORMANCE ASYNC APIS", id: "h1" },
    ],
  },
  {
    word: "PUTTA",
    letters: [
      { char: "P", tag: "PRODUCTION ENTERPRISE PIPELINES", id: "p2" },
      { char: "U", tag: "UNIVERSAL DOCKER CONTAINMENT", id: "u2" },
      { char: "T", tag: "TESTED OWASP DEFENSE BOUNDARIES", id: "t2" },
      { char: "T", tag: "TOP-TIER 60FPS INTERACTION", id: "t3" },
      { char: "A", tag: "AUTONOMOUS MULTI-AGENT SWARMS", id: "a2" },
    ],
  },
];

const ROTATING_ROLES = [
  {
    title: "Full Stack Developer",
    desc: "Building resilient microservices, distributed cloud architectures, and modern high-performance web applications."
  },
  {
    title: "UI/UX Designer",
    desc: "Crafting modern design systems, intuitive user journeys, and tactile high-converting digital interfaces."
  },
  {
    title: "Gen AI Developer",
    desc: "Building sovereign agentic pipelines, air-gapped vector search spaces, and multi-agent AI architectures."
  }
];

export default function Hero() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [pulseCount, setPulseCount] = useState(0);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROTATING_ROLES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const titleBoxRef = useRef<HTMLDivElement>(null);

  // Mouse coordinate tracking for 3D perspective tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 180, damping: 24 });
  const springY = useSpring(mouseY, { stiffness: 180, damping: 24 });

  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // 3D tilt angles derived from cursor
  const rotateX = useTransform(springY, [-120, 120], [3.5, -3.5]);
  const rotateY = useTransform(springX, [-350, 350], [-4.5, 4.5]);

  // Subtle opposite parallax for the foreground portrait image
  const imageX = useTransform(springX, [-350, 350], [6, -6]);
  const imageY = useTransform(springY, [-120, 120], [3, -3]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice) return;
    const rect = titleBoxRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHoveredIdx(null);
  };

  const handleHeadlineClick = () => {
    setPulseCount((c) => c + 1);
  };

  return (
    <section
      id="hero"
      className="relative w-full h-[100dvh] min-h-[560px] sm:min-h-[580px] md:min-h-[600px] flex flex-col justify-between bg-[#0A0A0A] px-4 sm:px-8 md:px-12 pt-24 sm:pt-28 md:pt-20 lg:pt-18 pb-5 sm:pb-6 select-none overflow-hidden"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. TECHNICAL ARCHITECTURAL GRID BACKGROUND (Exact match to reference)
         ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      {/* Subtle Analog Radial Vignette */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_45%,transparent_40%,rgba(0,0,0,0.75)_100%)]"
        aria-hidden="true"
      />

      {/* ─────────────────────────────────────────────────────────────
          2. TOP BAR: MINIMAL SWISS BRUTALIST + ACID LIME ACCENT
          Generous top spacing to completely clear floating navbar
         ───────────────────────────────────────────────────────────── */}
      <div className="relative z-30 flex items-center justify-between font-mono text-[10px] sm:text-xs text-white/60 tracking-wider border-b border-white/10 pb-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse shrink-0" />
          <span className="uppercase font-bold text-white/90 tracking-widest text-[10px] sm:text-xs">
            <span className="hidden sm:inline">SUJITH PUTTA // ARCHITECT &amp; SYSTEMS</span>
            <span className="sm:hidden">SUJITH // ARCHITECT</span>
          </span>
          <span className="hidden md:inline text-white/25">/</span>
          <span className="hidden md:inline text-white/45">BENGALURU, IN</span>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-white/70 text-[10px]">
            <span>EDITION 2026</span>
          </div>

          {/* Electric Acid-Lime Accent Pill Button */}
          <a
            href="#contact"
            className="group px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#D4FF00] hover:bg-[#BFFF00] text-black font-mono font-black text-[10px] sm:text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(212,255,0,0.35)] flex items-center gap-1.5 sm:gap-2 cursor-pointer shrink-0"
          >
            <span>GET IN TOUCH</span>
            <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-black flex items-center justify-center text-[#D4FF00] shrink-0 group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[2.5]" />
            </span>
          </a>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. MONUMENTAL SLANTED BRUTALIST TYPOGRAPHY "SUJITH PUTTA"
          - On Mobile (< md): Stacked vertically (SUJITH / PUTTA) at monumental
            text-[19vw] filling the phone screen with raw editorial power.
          - On Desktop (md+): Side-by-side with generous gap framed directly
            behind the portrait photo.
         ───────────────────────────────────────────────────────────── */}
      <motion.div
        ref={titleBoxRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleHeadlineClick}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        animate={
          isTouchDevice
            ? {
              rotateX: [1, -1, 1],
              rotateY: [-1.5, 1.5, -1.5],
              transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            }
            : undefined
        }
        className="absolute top-[48%] sm:top-[46%] md:top-[38%] lg:top-[39%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full flex flex-col md:flex-row items-center justify-center gap-y-1 sm:gap-y-2 md:gap-y-0 md:gap-x-28 lg:gap-x-32 xl:gap-x-36 2xl:gap-x-40 select-none cursor-pointer overflow-visible px-4"
      >
        {nameWords.map((wordObj, wIdx) => (
          <span
            key={wIdx}
            className="inline-flex items-baseline whitespace-nowrap [transform:skewX(-15deg)_scaleX(1.18)_scaleY(1.12)] md:[transform:skewX(-18deg)_scaleX(1.32)_scaleY(1.18)] [transform-origin:center_bottom] text-[19vw] xs:text-[21vw] sm:text-[17vw] md:text-[11.5vw] lg:text-[11vw] xl:text-[152px] 2xl:text-[180px] tracking-[0.01em] md:tracking-[0.02em] leading-[0.85] md:leading-[0.82]"
          >
            {wordObj.letters.map((item, lIdx) => {
              const globalIdx = wIdx * 10 + lIdx;
              const isHovered = hoveredIdx === globalIdx;

              return (
                <motion.div
                  key={item.id}
                  onMouseEnter={() => setHoveredIdx(globalIdx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onTouchStart={() => setHoveredIdx(globalIdx)}
                  whileHover={{
                    y: -8,
                    transition: { type: "spring", stiffness: 450, damping: 16 },
                  }}
                  whileTap={{
                    scale: 0.96,
                    y: -4,
                    transition: { type: "spring", stiffness: 500, damping: 15 },
                  }}
                  animate={
                    pulseCount > 0
                      ? {
                        scale: [1, 1.04, 1],
                        y: [0, -6, 0],
                        transition: { duration: 0.4, delay: globalIdx * 0.02 },
                      }
                      : {}
                  }
                  className="relative inline-block"
                >
                  {/* SLANTED EDITORIAL BRUTALIST LETTER WITH SHARP SEPARATION CUT */}
                  <span
                    className={`relative z-10 inline-block font-[family-name:var(--font-anton)] uppercase select-none transition-all duration-300 ${
                      isHovered
                        ? "text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.7)]"
                        : "text-[#ECEAE4] drop-shadow-[0_12px_28px_rgba(0,0,0,0.95)]"
                    }`}
                    style={{
                      WebkitTextStroke: "1.5px #0A0A0A",
                      paintOrder: "stroke fill",
                    }}
                  >
                    {item.char}
                  </span>
                </motion.div>
              );
            })}
          </span>
        ))}
      </motion.div>

      {/* ─────────────────────────────────────────────────────────────
          4. PORTRAIT IMAGE: POSITIONED ELEGANTLY IN FRONT OF SLANTED LETTERS
          - Hidden on smaller ratios (< md) as requested
          - Visible and layered with butter-smooth radial feather on desktop (md+)
         ───────────────────────────────────────────────────────────── */}
      <motion.div
        style={{
          x: imageX,
          y: imageY,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 24 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 pointer-events-auto hidden md:flex items-end justify-center select-none"
        onMouseEnter={() => setIsImageHovered(true)}
        onMouseLeave={() => setIsImageHovered(false)}
      >
        <div
          className="relative flex items-end justify-center"
          style={{
            maskImage: "radial-gradient(ellipse 92% 76% at 50% 26%, #000 36%, rgba(0,0,0,0.85) 54%, rgba(0,0,0,0.2) 74%, transparent 92%)",
            WebkitMaskImage: "radial-gradient(ellipse 92% 76% at 50% 26%, #000 36%, rgba(0,0,0,0.85) 54%, rgba(0,0,0,0.2) 74%, transparent 92%)",
          }}
        >
          <Image
            src="/sujith-hero-trimmed.png"
            alt="Sujith Putta — AI Systems Architect & Generative AI Developer"
            width={436}
            height={572}
            priority
            fetchPriority="high"
            className={`h-[48vh] sm:h-[54vh] md:h-[60vh] lg:h-[65vh] xl:h-[68vh] max-h-[640px] w-auto object-contain object-bottom transition-all duration-700 ease-out cursor-pointer ${
              isImageHovered || hoveredIdx !== null
                ? "grayscale-0 contrast-105 saturate-120 brightness-100 scale-[1.012]"
                : "grayscale contrast-110 brightness-95 scale-100"
            }`}
          />
        </div>
      </motion.div>

      {/* FULL-WIDTH SEAMLESS FLOOR GRADIENT: Blends bottom smoothly into grid floor across entire width */}
      <div
        className="absolute inset-x-0 bottom-0 h-44 sm:h-52 pointer-events-none bg-gradient-to-t from-[#0A0A0A] from-20% via-[#0A0A0A]/75 via-60% to-transparent z-25"
        aria-hidden="true"
      />

      {/* ─────────────────────────────────────────────────────────────
          5. BOTTOM BAR: METADATA & DYNAMIC ROTATING ROLES
         ───────────────────────────────────────────────────────────── */}
      <div className="relative z-30 w-full flex flex-col md:flex-row items-start md:items-end justify-between gap-3 sm:gap-4 pointer-events-none bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/85 to-transparent pt-4 sm:pt-0">

        {/* Left Wing: Architectural Identity & Dynamic Rotating Roles */}
        <div className="text-left space-y-1 max-w-xs sm:max-w-sm md:max-w-md pointer-events-auto">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] xs:text-[10px] sm:text-xs text-white/50 uppercase tracking-wider font-bold">
              30 // PRODUCTION &amp; STRATEGY
            </span>
            <span className="w-4 h-[1px] bg-white/20" />
            <a
              href="#manifesto"
              className="inline-flex items-center gap-1 font-mono text-[9px] xs:text-[10px] text-[#D4FF00] uppercase tracking-wider hover:underline"
            >
              <span>Explore</span>
              <ChevronDown className="w-3 h-3 animate-bounce" />
            </a>
          </div>

          {/* Dynamic Rotating Title: Full Stack Developer -> UI/UX Designer -> Gen AI Developer */}
          <div className="h-6 sm:h-7 overflow-hidden relative flex items-center">
            <AnimatePresence mode="wait">
              <motion.h2
                key={roleIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs xs:text-sm sm:text-lg font-sans font-medium text-white tracking-tight leading-snug truncate"
              >
                {ROTATING_ROLES[roleIndex].title}
              </motion.h2>
            </AnimatePresence>
          </div>

          {/* Dynamic Rotating Supporting Subtitle */}
          <div className="hidden sm:block min-h-[34px] overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-[11px] xs:text-xs text-white/55 font-sans font-light leading-relaxed"
              >
                {ROTATING_ROLES[roleIndex].desc}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Wing: Dual Action Buttons & Coordinates */}
        <div className="flex flex-col items-start md:items-end gap-2 shrink-0 pointer-events-auto w-full md:w-auto">
          <div className="flex items-center gap-2 sm:gap-3 w-full xs:w-auto">
            <a
              href="#showcase"
              className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white text-black hover:bg-white/90 font-sans text-[11px] sm:text-xs font-bold tracking-wide shadow-[0_0_25px_rgba(255,255,255,0.25)] transition-all hover:scale-105 active:scale-95 group flex-1 xs:flex-initial text-center"
            >
              <span>Explore Works</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-white/90 hover:text-white font-sans text-[11px] sm:text-xs font-semibold tracking-wide border border-white/20 hover:border-white/40 transition-all hover:scale-105 active:scale-95 flex-1 xs:flex-initial text-center backdrop-blur-md"
            >
              <Mail className="w-3.5 h-3.5 text-[#D4FF00]" />
              <span>Contact</span>
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3 font-mono text-[10px] text-white/40">
            <span>sujithputta02@gmail.com</span>
            <span>·</span>
            <span>+91 7386777701</span>
          </div>
        </div>

      </div>
    </section>
  );
}
