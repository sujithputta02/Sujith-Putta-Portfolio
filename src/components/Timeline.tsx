"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import {
  ChevronDown,
  GraduationCap,
  Trophy,
  Cloud,
  Cpu,
} from "lucide-react";
import { LiquidGlassCard } from "@/components/LiquidGlassCard";

// Milestone definitions formatted directly for the Gantt-style timeline
interface MilestoneEra {
  yearRange: string;
  yearStart: number;
  yearEnd: number;
  shortOrg: string;
  organization: string;
  shortRole: string;
  role: string;
  description: string;
  diamondTag: string;
  diamondLabel: string;
  color: string;
  glowColor: string;
  icon: React.ReactNode;
  // Canvas coordinate percentages
  yPercent: number; // Stepped elevation (64% -> 53% -> 42% -> 31%)
  startXPercent: number;
  endXPercent: number;
}

const MILESTONES: MilestoneEra[] = [
  {
    yearRange: "2023 – 2024",
    yearStart: 2023,
    yearEnd: 2024,
    shortOrg: "Dayananda Sagar Univ.",
    organization: "Dayananda Sagar University",
    shortRole: "B.Tech CS & Technology",
    role: "B.Tech Computer Science & Technology",
    description:
      "Matriculated into CST B.Tech program. Deep mastery of core foundations: Algorithms, Data Engineering, DBMS, and Object-Oriented System Architecture.",
    diamondTag: "ACADEMIC EXCELLENCE",
    diamondLabel: "CGPA 9.05 / 10.0 • Core CS Foundations",
    color: "#A3E635", // Lime Green (from reference image)
    glowColor: "rgba(163, 230, 53, 0.6)",
    icon: <GraduationCap className="w-4 h-4 text-[#A3E635]" />,
    yPercent: 64,
    startXPercent: 8,
    endXPercent: 36,
  },
  {
    yearRange: "2024 – 2025",
    yearStart: 2024,
    yearEnd: 2025,
    shortOrg: "NASA Space Apps Arena",
    organization: "NASA Space Apps Global Arena",
    shortRole: "Global Hackathon Challenger",
    role: "Global Hackathon Challenger & Rapid Prototyper",
    description:
      "Entered NASA Space Apps Challenge international arenas. Engineered rapid satellite telemetry visualizations and autonomous aerospace AI prototypes.",
    diamondTag: "GLOBAL ARENA",
    diamondLabel: "NASA Space Apps 2024 & 2025 Consecutive Participation",
    color: "#F59E0B", // Amber Orange (from reference image)
    glowColor: "rgba(245, 158, 11, 0.6)",
    icon: <Trophy className="w-4 h-4 text-[#F59E0B]" />,
    yPercent: 53,
    startXPercent: 36,
    endXPercent: 62,
  },
  {
    yearRange: "2025 – 2026",
    yearStart: 2025,
    yearEnd: 2026,
    shortOrg: "Enterprise Deployments",
    organization: "Enterprise Deployments & ERP Backends",
    shortRole: "FlowGrid ERP & Cloud Eng.",
    role: "FlowGrid ERP & DineInGo Production Engineering",
    description:
      "Architected institutional scale products (FlowGrid ERP backend, DineInGo 3D platform) and acquired AWS Cloud Foundations and Google Cloud Automated Delivery credentials.",
    diamondTag: "CLOUD ACCREDITATION",
    diamondLabel: "AWS Cloud Foundations & Google Cloud CI/CD Certified",
    color: "#06B6D4", // Electric Cyan / Sky Blue (from reference image)
    glowColor: "rgba(6, 182, 212, 0.6)",
    icon: <Cloud className="w-4 h-4 text-[#06B6D4]" />,
    yPercent: 42,
    startXPercent: 62,
    endXPercent: 84,
  },
  {
    yearRange: "2026 – PRESENT",
    yearStart: 2026,
    yearEnd: 2027,
    shortOrg: "Microsoft Imagine Cup",
    organization: "Microsoft Imagine Cup & AI Labs",
    shortRole: "Autonomous Multi-Agent RAG",
    role: "Autonomous Multi-Agent Systems & Research Architectures",
    description:
      "Advanced RAG pipeline architectures, full-stack microservices platforms, and Microsoft Imagine Cup global challenge arena entries.",
    diamondTag: "COMPETITIVE DISTINCTION",
    diamondLabel: "Cleared Google Prompt Wars Round 1 & Imagine Cup Arena",
    color: "#FF5E00", // Vivid Coral / Red-Orange (from reference image)
    glowColor: "rgba(255, 94, 0, 0.6)",
    icon: <Cpu className="w-4 h-4 text-[#FF5E00]" />,
    yPercent: 31,
    startXPercent: 84,
    endXPercent: 98,
  },
];

// Year tick markers along the horizontal axis
const YEAR_TICKS = [
  { year: "2023", xPercent: 12 },
  { year: "2024", xPercent: 36 },
  { year: "2025", xPercent: 62 },
  { year: "2026", xPercent: 84 },
  { year: "PRESENT", xPercent: 98 },
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track the vertical scroll of the pinned container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Butter-smooth spring progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    restDelta: 0.001,
  });

  // Track active stage and percentage for UI
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    setScrollPercent(Math.round(latest * 100));
    if (latest < 0.28) {
      setActiveStage(0);
    } else if (latest < 0.55) {
      setActiveStage(1);
    } else if (latest < 0.8) {
      setActiveStage(2);
    } else {
      setActiveStage(3);
    }
  });

  // Laser scanner vertical cursor X position (from left to right)
  const scannerX = useTransform(smoothProgress, [0, 1], ["8%", "98%"]);

  // Mobile horizontal pan transform to keep active milestone centered on small screens
  const mobilePanX = useTransform(smoothProgress, [0, 1], ["0%", "-48%"]);

  // Quick jump click to smoothly scroll the window to any stage
  const jumpToStage = (stageIdx: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    const travel = containerHeight - window.innerHeight;
    const targetScroll = containerTop + (stageIdx / 3) * travel;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const activeMilestone = MILESTONES[activeStage];

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative w-full h-[280vh] bg-[#070707]"
    >
      {/* ─── STICKY VIEWPORT CONTAINER ─── */}
      {/* Pins to screen during the 280vh vertical scroll; unpins smoothly at 100% */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between bg-[#070707] text-white overflow-hidden select-none border-y border-white/[0.08]">
        
        {/* Subtle Luxury Film Grain / Radial Vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(20, 20, 20, 0.9) 0%, rgba(7, 7, 7, 1) 85%)",
          }}
        />

        {/* ─────────────────────────────────────────────────────────────
            1. TOP HEADER BAR: "TIMELINE" (Exact aesthetic from Reference Image)
           ───────────────────────────────────────────────────────────── */}
        <div className="relative z-20 w-full px-6 sm:px-10 md:px-14 pt-6 sm:pt-8 flex items-center justify-between border-b border-white/[0.07] pb-4">
          
          {/* Top Left: Subtitle & Milestone Indicator */}
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs text-white/50 tracking-wider">
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ backgroundColor: activeMilestone.color }}
              />
              <span className="uppercase text-white/70">
                07 // PRODUCTION CHRONOLOGY
              </span>
            </div>
            <span className="text-xs sm:text-sm text-white/40 font-light mt-0.5 hidden sm:inline">
              Scroll down to navigate career trajectory
            </span>
          </div>

          {/* Top Right: "TIMELINE" Title (Exact placement & typography from Reference Image) */}
          <div className="text-right">
            <h2 className="font-display font-light tracking-[0.25em] text-2xl sm:text-3xl md:text-4xl text-white uppercase leading-none drop-shadow-[0_2px_12px_rgba(255,255,255,0.15)]">
              TIMELINE
            </h2>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            2. MAIN GANTT CANVAS (Staggered Bars, Vertical Grid, Diamond Badge)
           ───────────────────────────────────────────────────────────── */}
        <div className="relative z-10 w-full flex-1 flex items-center justify-center overflow-hidden px-2 sm:px-6 md:px-10">
          
          <motion.div
            style={{ x: isDesktop ? "0%" : mobilePanX }}
            className="relative w-full h-[380px] sm:h-[420px] md:h-[450px] min-w-[920px] lg:min-w-full"
          >
            {/* ─── VERTICAL YEAR GRID LINES ─── */}
            {YEAR_TICKS.map((tick) => (
              <div
                key={tick.year}
                className="absolute top-0 bottom-16 border-l border-white/[0.06] pointer-events-none"
                style={{ left: `${tick.xPercent}%` }}
              >
                {/* Subtle top tick mark */}
                <div className="w-1.5 h-[1px] bg-white/20 -ml-[0.75px]" />
              </div>
            ))}

            {/* ─── HORIZONTAL AXIS LINE (at Y ≈ 75%) ─── */}
            <div
              className="absolute left-0 right-0 h-[1.5px] bg-white/[0.12] pointer-events-none"
              style={{ top: "75%" }}
            />

            {/* ─── YEAR NUMERALS ON THE AXIS ─── */}
            {YEAR_TICKS.map((tick, idx) => {
              const isYearActive =
                (idx === 0 && activeStage === 0) ||
                (idx === 1 && (activeStage === 0 || activeStage === 1)) ||
                (idx === 2 && activeStage === 2) ||
                (idx === 3 && activeStage === 3) ||
                (idx === 4 && activeStage === 3);

              return (
                <div
                  key={tick.year}
                  className="absolute -translate-x-1/2 flex flex-col items-center pointer-events-auto cursor-pointer group/tick"
                  style={{ left: `${tick.xPercent}%`, top: "75%" }}
                  onClick={() => jumpToStage(Math.min(idx, 3))}
                  title={`Jump to ${tick.year}`}
                >
                  {/* Axis Intersection Tick Point */}
                  <div
                    className={`w-2 h-2 rounded-full -mt-[3.5px] transition-all duration-300 ${
                      isYearActive
                        ? "bg-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                        : "bg-white/30 group-hover/tick:bg-white/70"
                    }`}
                  />
                  {/* Year Label */}
                  <span
                    className={`font-mono text-xs sm:text-sm mt-3 tracking-widest transition-all duration-300 ${
                      isYearActive
                        ? "text-white font-bold"
                        : "text-white/40 group-hover/tick:text-white/70"
                    }`}
                  >
                    {tick.year}
                  </span>
                </div>
              );
            })}

            {/* ─── THE 4 STEPPED HORIZONTAL COLORED BARS (from Reference Image) ─── */}
            {MILESTONES.map((era, idx) => {
              const isPastOrActive = idx <= activeStage;
              const isCurrent = idx === activeStage;

              return (
                <div key={era.organization} className="contents">
                  {/* A. TEXT LABELS (Above the bar, uncluttered and non-congested) */}
                  <motion.div
                    animate={{
                      opacity: isPastOrActive ? 1 : 0.35,
                      scale: isCurrent ? 1.02 : 1,
                      y: isCurrent ? -3 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute z-20 flex flex-col text-left transition-all"
                    style={{
                      left: `${era.startXPercent}%`,
                      top: `calc(${era.yPercent}% - 62px)`,
                      maxWidth: `${era.endXPercent - era.startXPercent + 8}%`,
                    }}
                  >
                    {/* Line 1: Year Range */}
                    <span className="font-mono text-[10px] sm:text-[11px] text-white/50 tracking-wider">
                      {era.yearRange}
                    </span>

                    {/* Line 2: Organization / Company (Concise & crisp in bar accent color) */}
                    <span
                      className="font-display font-bold text-sm sm:text-base tracking-tight leading-snug drop-shadow-sm mt-0.5 truncate"
                      style={{ color: era.color }}
                      title={era.organization}
                    >
                      {era.shortOrg}
                    </span>

                    {/* Line 3: Role / Program (in italicized white subtext) */}
                    <span
                      className="font-sans italic text-xs sm:text-[13px] text-white/80 font-light tracking-wide truncate mt-0.5"
                      title={era.role}
                    >
                      {era.shortRole}
                    </span>
                  </motion.div>

                  {/* B. THE HORIZONTAL COLORED CAPSULE BAR */}
                  <div
                    className="absolute z-10"
                    style={{
                      left: `${era.startXPercent}%`,
                      top: `${era.yPercent}%`,
                      width: `${era.endXPercent - era.startXPercent}%`,
                      height: "9px",
                    }}
                  >
                    {/* The Full Colored Bar */}
                    <motion.div
                      animate={{
                        opacity: isPastOrActive ? 1 : 0.28,
                        boxShadow: isCurrent
                          ? `0 0 20px ${era.glowColor}, 0 0 35px ${era.glowColor}`
                          : isPastOrActive
                          ? `0 0 10px ${era.glowColor}`
                          : "none",
                      }}
                      transition={{ duration: 0.35 }}
                      className="w-full h-full rounded-full transition-all relative"
                      style={{ backgroundColor: era.color }}
                    >
                      {/* Bright Glowing Circular End-Cap Dot (from Reference Image) */}
                      <div
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full border-2 border-[#070707] transition-transform duration-300"
                        style={{
                          backgroundColor: era.color,
                          boxShadow: isCurrent
                            ? `0 0 15px #FFFFFF, 0 0 25px ${era.color}`
                            : `0 0 8px ${era.color}`,
                          transform: isCurrent
                            ? "translate(50%, -50%) scale(1.25)"
                            : "translate(50%, -50%) scale(1)",
                        }}
                      />
                    </motion.div>
                  </div>
                </div>
              );
            })}

            {/* ─── C. LIQUID GLASS ACTIVE DIAMOND MILESTONE (Below Axis, Zero Congestion!) ─── */}
            {/* Exactly as in the Reference Image: One prominent diamond milestone positioned below the axis */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.28 }}
                className="absolute z-20 pointer-events-auto"
                style={{
                  left: `${Math.min(Math.max(activeMilestone.startXPercent, 6), 55)}%`,
                  top: "83%",
                }}
              >
                <LiquidGlassCard
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
                  options={{
                    radius: 9999,
                    scale: -80,
                    chroma: 4,
                    border: 0.06,
                    mapBlur: 8,
                    blur: 0,
                    fallbackBlur: 0,
                  }}
                >
                  {/* Glowing Diamond Indicator */}
                  <span
                    className="text-xs transition-transform"
                    style={{
                      color: activeMilestone.color,
                      filter: `drop-shadow(0 0 8px ${activeMilestone.color})`,
                    }}
                  >
                    ◆
                  </span>

                  {/* Diamond Tag Category */}
                  <span className="font-mono text-white/50 uppercase tracking-widest text-[10px] font-bold">
                    {activeMilestone.diamondTag}:
                  </span>

                  {/* Diamond Milestone Name */}
                  <span
                    className="font-sans font-semibold text-xs text-white tracking-wide"
                    style={{
                      textShadow: `0 0 12px ${activeMilestone.color}88`,
                    }}
                  >
                    {activeMilestone.diamondLabel}
                  </span>
                </LiquidGlassCard>
              </motion.div>
            </AnimatePresence>

            {/* ─── DYNAMIC TIME SCANNER LASER CURSOR ─── */}
            <motion.div
              style={{ left: scannerX }}
              className="absolute top-4 bottom-10 z-30 pointer-events-none flex flex-col items-center"
            >
              {/* Laser Core Line */}
              <div
                className="w-[2px] h-full shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                style={{
                  background: `linear-gradient(to bottom, transparent 0%, ${activeMilestone.color} 30%, #FFFFFF 75%, transparent 100%)`,
                }}
              />
              {/* Scanner Head Glow Beacon */}
              <div
                className="w-3.5 h-3.5 rounded-full bg-white shadow-[0_0_15px_#FFFFFF] absolute -translate-x-1/2 -top-1"
                style={{ left: "1px" }}
              />
            </motion.div>
          </motion.div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            3. LIQUID GLASS BOTTOM STATUS DOCK (Narrative & Year Controls)
           ───────────────────────────────────────────────────────────── */}
        <div className="relative z-20 w-full px-4 sm:px-8 md:px-12 pb-6 sm:pb-8 pt-2">
          
          <LiquidGlassCard
            className="w-full max-w-5xl mx-auto rounded-2xl border border-white/15 p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
            options={{
              radius: 16,
              scale: -90,
              chroma: 5,
              border: 0.05,
              mapBlur: 10,
              blur: 0,
              fallbackBlur: 0,
            }}
          >
            {/* Active Era Narrative Summary */}
            <div className="flex items-start sm:items-center gap-3.5 text-left max-w-2xl">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 border border-white/15 transition-all duration-300"
                style={{
                  backgroundColor: `${activeMilestone.color}20`,
                  boxShadow: `0 0 16px ${activeMilestone.glowColor}`,
                }}
              >
                {activeMilestone.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono text-xs font-bold uppercase tracking-wider transition-colors duration-300"
                    style={{ color: activeMilestone.color }}
                  >
                    ERA 0{activeStage + 1} // {activeMilestone.yearRange}
                  </span>
                  <span className="text-white/30 text-xs">•</span>
                  <span className="text-white font-display font-bold text-xs sm:text-sm">
                    {activeMilestone.organization}
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] font-sans text-white/70 font-light mt-0.5 line-clamp-2 leading-relaxed">
                  {activeMilestone.description}
                </p>
              </div>
            </div>

            {/* Right Controls: Interactive Year Pills & Scroll Progress */}
            <div className="flex items-center gap-4 shrink-0 justify-between sm:justify-end">
              {/* Quick Jump Buttons */}
              <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 rounded-full p-1">
                {MILESTONES.map((era, idx) => (
                  <button
                    key={era.yearStart}
                    type="button"
                    onClick={() => jumpToStage(idx)}
                    className={`px-3 py-1 rounded-full text-[11px] font-mono font-medium transition-all cursor-pointer ${
                      idx === activeStage
                        ? "bg-white text-black font-bold shadow-md"
                        : "text-white/50 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {era.yearStart}
                  </button>
                ))}
              </div>

              {/* Scroll Percentage Indicator */}
              <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] text-white/40">
                <span>{scrollPercent}%</span>
                <div className="w-16 h-1 bg-white/15 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-150 rounded-full"
                    style={{
                      width: `${scrollPercent}%`,
                      backgroundColor: activeMilestone.color,
                    }}
                  />
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-white/40 animate-bounce" />
              </div>
            </div>
          </LiquidGlassCard>

        </div>

      </div>
    </section>
  );
}
