"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  Sliders,
  Sparkles,
  Code2,
  Droplets,
  Layers,
  Type,
  Ticket as TicketIcon,
  Play,
  RotateCcw,
  Palette,
} from "lucide-react";
import { LiquidGlassCard } from "@/components/LiquidGlassCard";

type TokenTab = "liquid" | "chromatic" | "spectrum" | "ticket";
type ExportFormat = "css" | "tailwind" | "react";

export default function DesignSystem() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<TokenTab>("liquid");
  const [exportFormat, setExportFormat] = useState<ExportFormat>("css");

  // 1. Liquid Glass State
  const [glassScale, setGlassScale] = useState(-115);
  const [glassChroma, setGlassChroma] = useState(6);
  const [glassBorder, setGlassBorder] = useState(0.07);

  // 2. Chromatic Extrusion State
  const [extrusionOffset, setExtrusionOffset] = useState(8);
  const [customText, setCustomText] = useState("OUR EXPERIENCE");

  // 3. Spectrum Beam State
  const [glowIntensity, setGlowIntensity] = useState(30);
  const [barHeight, setBarHeight] = useState(18);
  const [isAnimated, setIsAnimated] = useState(true);

  // 4. Ticket State
  const [ticketElevation, setTicketElevation] = useState(25);
  const [ticketVariant, setTicketVariant] = useState<"cobalt" | "obsidian" | "parchment">("cobalt");

  // Generate dynamic code output based on active tab and format
  const getCompiledCode = () => {
    if (activeTab === "liquid") {
      if (exportFormat === "css") {
        return `/* Ventura Liquid Glass Optical Specimen */
.liquid-glass-token {
  background: rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(0px); /* 0px blur = crystal-clear optics */
  border: 1px solid rgba(255, 255, 255, ${glassBorder.toFixed(2)});
  border-radius: 28px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
  --glass-refraction-scale: ${glassScale};
  --glass-chroma-dispersion: ${glassChroma}px;
}`;
      }
      if (exportFormat === "tailwind") {
        return `<!-- Tailwind v4 Liquid Glass Token -->
<div class="rounded-[28px] border border-white/[${Math.round(glassBorder * 100)}%] bg-white/[0.04] p-6 shadow-2xl backdrop-blur-none transition-all">
  <!-- Refraction Scale: ${glassScale} | Chroma: ${glassChroma}px -->
  <span class="text-white font-display font-bold">Liquid Refraction</span>
</div>`;
      }
      return `// React + LiquidGlassCard Hook Spec
<LiquidGlassCard
  options={{
    scale: ${glassScale},
    chroma: ${glassChroma},
    border: ${glassBorder.toFixed(2)},
    blur: 0,        // Non-frosted crystal optics
    mapBlur: 10,
    fallbackBlur: 0
  }}
  className="rounded-[28px] p-6 border border-white/${Math.round(glassBorder * 100)}"
>
  <YourContent />
</LiquidGlassCard>`;
    }

    if (activeTab === "chromatic") {
      if (exportFormat === "css") {
        return `/* 3D Chromatic Trailing Extrusion */
.chromatic-trail {
  font-family: var(--font-space-grotesk), sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  color: #FFFFFF;
  text-shadow:
    0px ${Math.round(extrusionOffset * 0.4)}px 0px #FF5E00,
    0px ${Math.round(extrusionOffset * 0.8)}px 0px #FF0055,
    0px ${Math.round(extrusionOffset * 1.2)}px 0px #A800FF,
    0px ${Math.round(extrusionOffset * 1.6)}px 0px #0070F3,
    0px ${Math.round(extrusionOffset * 2.0)}px 0px #00DFD8;
}`;
      }
      if (exportFormat === "tailwind") {
        return `<!-- Tailwind 3D Chromatic Shadow -->
<h2 class="font-display font-black text-white uppercase tracking-tight [text-shadow:0_${Math.round(
          extrusionOffset * 0.4
        )}px_0_#FF5E00,0_${Math.round(extrusionOffset * 0.8)}px_0_#FF0055,0_${Math.round(
          extrusionOffset * 1.2
        )}px_0_#A800FF,0_${Math.round(extrusionOffset * 1.6)}px_0_#0070F3,0_${Math.round(
          extrusionOffset * 2.0
        )}px_0_#00DFD8]">
  ${customText}
</h2>`;
      }
      return `// React Chromatic Typography Token
export const ChromaticHeading = ({ children = "${customText}", offset = ${extrusionOffset} }) => (
  <h2
    style={{
      textShadow: \`
        0px \${Math.round(offset * 0.4)}px 0px #FF5E00,
        0px \${Math.round(offset * 0.8)}px 0px #FF0055,
        0px \${Math.round(offset * 1.2)}px 0px #A800FF,
        0px \${Math.round(offset * 1.6)}px 0px #0070F3,
        0px \${Math.round(offset * 2.0)}px 0px #00DFD8
      \`
    }}
    className="font-display font-black text-4xl uppercase text-white"
  >
    {children}
  </h2>
);`;
    }

    if (activeTab === "spectrum") {
      if (exportFormat === "css") {
        return `/* Ventura Multi-Stop Spectrum Beam */
.spectrum-beam {
  background: linear-gradient(90deg, #FF5E00 0%, #FF0055 25%, #A800FF 50%, #0070F3 75%, #00F0FF 100%);
  height: ${barHeight}px;
  border-radius: 9999px;
  box-shadow: 0 0 ${glowIntensity}px rgba(255, 94, 0, 0.55);
  ${isAnimated ? "animation: spectrum-flow 4s ease infinite alternate;" : ""}
}`;
      }
      if (exportFormat === "tailwind") {
        return `<!-- Tailwind Continuous Spectrum Beam -->
<div class="w-full h-[${barHeight}px] rounded-full bg-gradient-to-r from-[#FF5E00] via-[#FF0055] via-[#A800FF] via-[#0070F3] to-[#00F0FF] shadow-[0_0_${glowIntensity}px_rgba(255,94,0,0.55)] ${
          isAnimated ? "animate-pulse" : ""
        }" />`;
      }
      return `// React Spectrum Beam Token Component
export const SpectrumBeam = ({ height = ${barHeight}, glow = ${glowIntensity}, animated = ${isAnimated} }) => (
  <div
    style={{
      height: \`\${height}px\`,
      boxShadow: \`0 0 \${glow}px rgba(255, 94, 0, 0.55)\`
    }}
    className={\`w-full rounded-full bg-gradient-to-r from-[#FF5E00] via-[#FF0055] via-[#A800FF] via-[#0070F3] to-[#00F0FF] \${
      animated ? "animate-pulse" : ""
    }\`}
  />
);`;
    }

    // ticket tab
    const bgCol =
      ticketVariant === "cobalt" ? "#1254F5" : ticketVariant === "obsidian" ? "#121212" : "#EDE8DF";
    const textCol = ticketVariant === "parchment" ? "#151413" : "#FFFFFF";
    const shadowRgba =
      ticketVariant === "cobalt"
        ? "rgba(18, 84, 245, 0.45)"
        : ticketVariant === "obsidian"
        ? "rgba(0, 0, 0, 0.7)"
        : "rgba(0, 0, 0, 0.35)";

    if (exportFormat === "css") {
      return `/* Ventura Specimen Ticket (${ticketVariant.toUpperCase()}) */
.specimen-ticket-${ticketVariant} {
  background-color: ${bgCol};
  color: ${textCol};
  border-radius: 28px;
  border: ${ticketVariant === "parchment" ? "2px solid #1A1918" : "1px solid rgba(255, 255, 255, 0.15)"};
  box-shadow: 0 ${ticketElevation}px 50px ${shadowRgba};
  padding: 24px;
}`;
    }
    if (exportFormat === "tailwind") {
      return `<!-- Tailwind Specimen Ticket (${ticketVariant}) -->
<div class="rounded-[28px] p-6 shadow-[0_${ticketElevation}px_50px_${shadowRgba}] ${
        ticketVariant === "cobalt"
          ? "bg-[#1254F5] text-white"
          : ticketVariant === "obsidian"
          ? "bg-[#121212] text-white border border-white/15"
          : "bg-[#EDE8DF] text-[#151413] border-2 border-[#1A1918]"
      }">
  <span class="font-display font-black text-xl">SOVEREIGN SYSTEMS</span>
</div>`;
    }
    return `// React Specimen Ticket Token
export const SpecimenTicket = ({ variant = "${ticketVariant}", elevation = ${ticketElevation} }) => (
  <div
    style={{ boxShadow: \`0 \${elevation}px 50px ${shadowRgba}\` }}
    className="rounded-[28px] p-6 ${
      ticketVariant === "cobalt"
        ? "bg-[#1254F5] text-white"
        : ticketVariant === "obsidian"
        ? "bg-[#121212] text-white border border-white/15"
        : "bg-[#EDE8DF] text-[#151413] border-2 border-[#1A1918]"
    }"
  >
    <span className="font-display font-black text-xl">SOVEREIGN SYSTEMS</span>
  </div>
);`;
  };

  const copyCode = () => {
    navigator.clipboard.writeText(getCompiledCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="design-system"
      className="w-full px-2 sm:px-4 md:px-5 py-6 sm:py-8 scroll-mt-20 text-left select-none"
    >
      <div className="editorial-frame w-full p-6 sm:p-10 md:p-12 relative overflow-hidden">
        
        {/* Frame Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8 font-mono text-xs text-white/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF5E00] animate-pulse" />
            <span className="uppercase tracking-widest text-white/70">
              05 // DESIGN SYSTEMS & TOKENS ENGINE
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>Ventura Optical Spec & Liquid Engine</span>
            <div className="w-16 h-1.5 rounded-full spectrum-pill" />
          </div>
        </div>

        {/* Section Heading */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl text-white tracking-tight leading-none font-normal">
                Design Systems &amp; Tokens<sup className="font-sans text-xs sm:text-sm font-mono text-white/50 ml-1.5 top-[-1.5em] sm:top-[-2.2em] font-normal">(05)</sup>
              </h2>
              <p className="font-sans text-sm sm:text-base text-white/60 mt-3 max-w-xl font-light">
                Interactive real-time design tokens workbench featuring crystal-clear Liquid Glass refraction, chromatic extrusions, cyber spectrum gradients, and sovereign specimen tickets.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 font-mono text-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FF5E00]" />
              <span>Real-Time Reactive Token Compiler</span>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            INTERACTIVE BENCH GRID (Left: Canvas | Right: Compiler Terminal)
           ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* ─── LEFT COLUMN (7 Cols): INTERACTIVE TOKEN CANVAS ─── */}
          <LiquidGlassCard
            className="lg:col-span-7 rounded-3xl border border-white/[0.1] p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl relative"
            options={{ radius: 24, scale: -90, chroma: 4, border: 0.05, mapBlur: 8, blur: 0, fallbackBlur: 0 }}
            style={{ background: "rgba(14, 14, 14, 0.95)" }}
          >
            {/* Canvas Header & Token Switcher Tabs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <span className="font-mono text-[11px] text-white/60 uppercase tracking-widest font-bold flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-[#FF5E00]" />
                <span>// INTERACTIVE SPECIMEN CANVAS</span>
              </span>

              {/* Token Selector Pills */}
              <div className="flex flex-wrap gap-1.5 bg-black/40 border border-white/10 p-1 rounded-full">
                <button
                  type="button"
                  onClick={() => setActiveTab("liquid")}
                  className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === "liquid"
                      ? "bg-white text-black font-bold shadow-md"
                      : "text-white/50 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Droplets className="w-3 h-3 text-[#00F0FF]" />
                  <span>LIQUID GLASS</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("chromatic")}
                  className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === "chromatic"
                      ? "bg-white text-black font-bold shadow-md"
                      : "text-white/50 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Type className="w-3 h-3 text-[#FF5E00]" />
                  <span>CHROMATIC</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("spectrum")}
                  className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === "spectrum"
                      ? "bg-white text-black font-bold shadow-md"
                      : "text-white/50 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Palette className="w-3 h-3 text-[#A800FF]" />
                  <span>SPECTRUM</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("ticket")}
                  className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === "ticket"
                      ? "bg-white text-black font-bold shadow-md"
                      : "text-white/50 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <TicketIcon className="w-3 h-3 text-[#1254F5]" />
                  <span>TICKET</span>
                </button>
              </div>
            </div>

            {/* ─── LIVE INTERACTIVE PREVIEW VIEWPORT ─── */}
            <div className="min-h-[250px] sm:min-h-[280px] rounded-2xl bg-[#090909] border border-white/10 relative overflow-hidden flex items-center justify-center p-6 sm:p-8">
              
              {/* Background ambient lighting for refraction & depth */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    activeTab === "liquid"
                      ? "radial-gradient(circle at 75% 30%, rgba(0, 240, 255, 0.18) 0%, transparent 60%), radial-gradient(circle at 25% 70%, rgba(255, 94, 0, 0.18) 0%, transparent 60%)"
                      : activeTab === "chromatic"
                      ? "radial-gradient(circle at 50% 50%, rgba(255, 94, 0, 0.12) 0%, transparent 70%)"
                      : activeTab === "spectrum"
                      ? "radial-gradient(circle at 50% 50%, rgba(168, 0, 255, 0.15) 0%, transparent 70%)"
                      : "radial-gradient(circle at 50% 50%, rgba(18, 84, 245, 0.15) 0%, transparent 70%)",
                }}
              />

              {/* Decorative background grid pattern to visibly prove Liquid Glass refraction */}
              {activeTab === "liquid" && (
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />
              )}

              {/* 1. LIQUID GLASS SPECIMEN */}
              {activeTab === "liquid" && (
                <LiquidGlassCard
                  options={{
                    scale: glassScale,
                    chroma: glassChroma,
                    border: glassBorder,
                    blur: 0,
                    mapBlur: 10,
                    fallbackBlur: 0,
                  }}
                  className="relative z-10 w-full max-w-[340px] sm:max-w-[380px] p-6 rounded-3xl border border-white/20 shadow-2xl transition-all"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest">
                      // OPTICAL SPECIMEN
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                  </div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight leading-snug">
                    Crystal Liquid Glass
                  </h3>
                  <p className="font-sans text-xs text-white/70 mt-1 font-light leading-relaxed">
                    Dynamic non-frosted optical refraction tuned with chromatic light dispersion.
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-white/60">
                    <span>Scale: {glassScale}</span>
                    <span>Chroma: {glassChroma}px</span>
                    <span>Border: {glassBorder.toFixed(2)}</span>
                  </div>
                </LiquidGlassCard>
              )}

              {/* 2. CHROMATIC 3D EXTRUSION SPECIMEN */}
              {activeTab === "chromatic" && (
                <div className="relative z-10 text-center max-w-full overflow-hidden px-2">
                  <div
                    className="font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase text-white leading-none tracking-tight transition-all"
                    style={{
                      textShadow: `
                        0px ${Math.round(extrusionOffset * 0.4)}px 0px #FF5E00,
                        0px ${Math.round(extrusionOffset * 0.8)}px 0px #FF0055,
                        0px ${Math.round(extrusionOffset * 1.2)}px 0px #A800FF,
                        0px ${Math.round(extrusionOffset * 1.6)}px 0px #0070F3,
                        0px ${Math.round(extrusionOffset * 2.0)}px 0px #00DFD8
                      `,
                    }}
                  >
                    {customText || "OUR EXPERIENCE"}
                  </div>
                  <span className="font-mono text-[11px] text-white/40 block mt-6">
                    Interactive 5-stop chromatic trailing shadow • Depth: {extrusionOffset}px
                  </span>
                </div>
              )}

              {/* 3. SPECTRUM GRADIENT BEAM SPECIMEN */}
              {activeTab === "spectrum" && (
                <div className="relative z-10 w-full max-w-md space-y-5">
                  <div
                    className="w-full rounded-full transition-all duration-300 relative overflow-hidden"
                    style={{
                      height: `${barHeight}px`,
                      background:
                        "linear-gradient(90deg, #FF5E00 0%, #FF0055 25%, #A800FF 50%, #0070F3 75%, #00F0FF 100%)",
                      boxShadow: `0 0 ${glowIntensity}px rgba(255, 94, 0, 0.65)`,
                    }}
                  >
                    {isAnimated && (
                      <motion.div
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ repeat: Infinity, duration: 2.2, ease: "linear" }}
                        className="absolute inset-y-0 w-1/3 bg-white/40 blur-sm pointer-events-none"
                      />
                    )}
                  </div>

                  <div className="flex justify-between font-mono text-[10px] sm:text-[11px] text-white/50 pt-2">
                    <span className="text-[#FF5E00]">#FF5E00 Amber</span>
                    <span className="text-[#FF0055]">#FF0055 Rose</span>
                    <span className="text-[#A800FF]">#A800FF Violet</span>
                    <span className="text-[#0070F3]">#0070F3 Cobalt</span>
                    <span className="text-[#00F0FF]">#00F0FF Cyan</span>
                  </div>
                </div>
              )}

              {/* 4. TICKET SPECIMEN */}
              {activeTab === "ticket" && (
                <div
                  className="relative z-10 w-full max-w-[320px] rounded-[28px] p-6 transition-all duration-300"
                  style={{
                    backgroundColor:
                      ticketVariant === "cobalt"
                        ? "#1254F5"
                        : ticketVariant === "obsidian"
                        ? "#131313"
                        : "#EDE8DF",
                    color: ticketVariant === "parchment" ? "#151413" : "#FFFFFF",
                    border:
                      ticketVariant === "parchment"
                        ? "2px solid #1A1918"
                        : "1px solid rgba(255, 255, 255, 0.15)",
                    boxShadow: `0 ${ticketElevation}px 50px ${
                      ticketVariant === "cobalt"
                        ? "rgba(18, 84, 245, 0.45)"
                        : ticketVariant === "obsidian"
                        ? "rgba(0, 0, 0, 0.8)"
                        : "rgba(0, 0, 0, 0.35)"
                    }`,
                  }}
                >
                  <div className="flex items-center justify-between mb-3 border-b pb-2 border-current/20">
                    <span className="font-mono text-[10px] uppercase font-bold tracking-widest">
                      // SPECIMEN 0{ticketElevation}
                    </span>
                    <span className="font-mono text-[10px] uppercase">VERIFIED</span>
                  </div>
                  <h4 className="font-display font-black text-xl tracking-tight leading-tight uppercase">
                    AUTONOMOUS AI
                  </h4>
                  <p className="font-sans text-xs opacity-75 mt-1 font-light">
                    Sovereign microservice deployment token architecture.
                  </p>
                  <div className="mt-4 pt-2 border-t border-current/20 flex justify-between font-mono text-[10px] opacity-70">
                    <span>ELEVATION: {ticketElevation}px</span>
                    <span>STYLE: {ticketVariant.toUpperCase()}</span>
                  </div>
                </div>
              )}

            </div>

            {/* ─── DYNAMIC CONTROL DECK (Contextual per tab) ─── */}
            <div className="bg-[#080808] border border-white/10 rounded-2xl p-4 sm:p-5 space-y-4 font-mono text-xs">
              
              {/* Controls for Liquid Glass */}
              {activeTab === "liquid" && (
                <div className="space-y-3">
                  {/* Slider 1: Refraction Scale */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-white/60">OPTICAL REFRACTION SCALE:</span>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="-160"
                        max="-40"
                        value={glassScale}
                        onChange={(e) => setGlassScale(Number(e.target.value))}
                        className="w-36 sm:w-48 accent-[#00F0FF] cursor-pointer"
                      />
                      <span className="font-bold text-[#00F0FF] w-12 text-right">{glassScale}</span>
                    </div>
                  </div>

                  {/* Slider 2: Chroma Dispersion */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-white/60">CHROMATIC DISPERSION:</span>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="1"
                        max="14"
                        value={glassChroma}
                        onChange={(e) => setGlassChroma(Number(e.target.value))}
                        className="w-36 sm:w-48 accent-[#FF5E00] cursor-pointer"
                      />
                      <span className="font-bold text-[#FF5E00] w-12 text-right">{glassChroma}px</span>
                    </div>
                  </div>

                  {/* Slider 3: Glass Border */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-white/60">GLASS RIM OPACITY:</span>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="0.02"
                        max="0.18"
                        step="0.01"
                        value={glassBorder}
                        onChange={(e) => setGlassBorder(Number(e.target.value))}
                        className="w-36 sm:w-48 accent-white cursor-pointer"
                      />
                      <span className="font-bold text-white w-12 text-right">
                        {(glassBorder * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Controls for Chromatic */}
              {activeTab === "chromatic" && (
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-white/60">TYPE CUSTOM TEXT:</span>
                    <input
                      type="text"
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value.toUpperCase())}
                      className="bg-white/5 border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white font-mono outline-none focus:border-[#FF5E00] w-full sm:w-60"
                      placeholder="ENTER HEADING..."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-white/60">EXTRUSION OFFSET DEPTH:</span>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="2"
                        max="20"
                        value={extrusionOffset}
                        onChange={(e) => setExtrusionOffset(Number(e.target.value))}
                        className="w-36 sm:w-48 accent-[#FF5E00] cursor-pointer"
                      />
                      <span className="font-bold text-[#FF5E00] w-12 text-right">{extrusionOffset}px</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Controls for Spectrum */}
              {activeTab === "spectrum" && (
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-white/60">GLOW RADIUS & AURA:</span>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="10"
                        max="60"
                        value={glowIntensity}
                        onChange={(e) => setGlowIntensity(Number(e.target.value))}
                        className="w-36 sm:w-48 accent-[#A800FF] cursor-pointer"
                      />
                      <span className="font-bold text-[#A800FF] w-12 text-right">{glowIntensity}px</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-white/60">BEAM HEIGHT:</span>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="8"
                        max="32"
                        value={barHeight}
                        onChange={(e) => setBarHeight(Number(e.target.value))}
                        className="w-36 sm:w-48 accent-[#00F0FF] cursor-pointer"
                      />
                      <span className="font-bold text-[#00F0FF] w-12 text-right">{barHeight}px</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-white/60">CONTINUOUS WAVE SHIMMER:</span>
                    <button
                      type="button"
                      onClick={() => setIsAnimated(!isAnimated)}
                      className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold transition-all cursor-pointer ${
                        isAnimated ? "bg-[#FF5E00] text-white" : "bg-white/10 text-white/40"
                      }`}
                    >
                      {isAnimated ? "ACTIVE" : "PAUSED"}
                    </button>
                  </div>
                </div>
              )}

              {/* Controls for Ticket */}
              {activeTab === "ticket" && (
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-white/60">COLOR PROFILE:</span>
                    <div className="flex gap-2">
                      {(["cobalt", "obsidian", "parchment"] as const).map((variant) => (
                        <button
                          key={variant}
                          type="button"
                          onClick={() => setTicketVariant(variant)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-mono uppercase transition-all cursor-pointer ${
                            ticketVariant === variant
                              ? "bg-white text-black font-bold shadow-sm"
                              : "bg-white/5 text-white/50 hover:text-white"
                          }`}
                        >
                          {variant}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-white/60">ISOMETRIC SHADOW ELEVATION:</span>
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min="10"
                        max="45"
                        value={ticketElevation}
                        onChange={(e) => setTicketElevation(Number(e.target.value))}
                        className="w-36 sm:w-48 accent-[#1254F5] cursor-pointer"
                      />
                      <span className="font-bold text-[#1254F5] w-12 text-right">{ticketElevation}px</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </LiquidGlassCard>

          {/* ─── RIGHT COLUMN (5 Cols): COMPILED TOKEN TERMINAL ─── */}
          <LiquidGlassCard
            className="lg:col-span-5 rounded-3xl border border-white/[0.1] p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative"
            options={{ radius: 24, scale: -90, chroma: 4, border: 0.05, mapBlur: 8, blur: 0, fallbackBlur: 0 }}
            style={{ background: "rgba(14, 14, 14, 0.95)" }}
          >
            <div>
              {/* Terminal Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[#FF5E00]" />
                  <span className="font-mono text-[10px] text-white/70 uppercase tracking-widest font-bold">
                    COMPILED TOKEN OUTPUT
                  </span>
                </div>

                {/* Copy Button */}
                <button
                  type="button"
                  onClick={copyCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] transition-all cursor-pointer hover:scale-105 active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Spec</span>
                    </>
                  )}
                </button>
              </div>

              {/* Format Switcher Pills: CSS / Tailwind / React */}
              <div className="flex gap-2 mb-4">
                {(["css", "tailwind", "react"] as const).map((fmt) => (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setExportFormat(fmt)}
                    className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase transition-all cursor-pointer ${
                      exportFormat === fmt
                        ? "bg-[#FF5E00] text-white font-bold shadow-md shadow-[#FF5E00]/30"
                        : "bg-white/5 text-white/50 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {fmt === "react" ? "React Hook" : fmt.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Syntax-Highlighted Code Viewport */}
              <div className="bg-[#070707] border border-white/10 rounded-2xl p-4 sm:p-5 font-mono text-[11px] sm:text-xs text-white/90 overflow-x-auto min-h-[260px] sm:min-h-[290px] leading-relaxed shadow-inner">
                <pre>
                  <code>{getCompiledCode()}</code>
                </pre>
              </div>
            </div>

            {/* Terminal Metadata Footer */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-white/40">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Deterministic Engine v4</span>
              </span>
              <span className="uppercase text-white/60">Live Interactive</span>
            </div>
          </LiquidGlassCard>

        </div>

        {/* Section Corner Index */}
        <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between text-white/40 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-xl font-display font-black text-white">43</span>
            <span className="uppercase tracking-widest text-[10px]">
              Ventura Design Tokens & Optical Specimen
            </span>
          </div>
          <span className="text-[10px] uppercase">Interactive Liquid Glass Specimen</span>
        </div>

      </div>
    </section>
  );
}
