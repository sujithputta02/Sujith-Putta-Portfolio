"use client";

import React, { useState, useRef } from "react";
import { Terminal, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DesignSystem() {
  const [copied, setCopied] = useState(false);
  const [sliderVal, setSliderVal] = useState(40);
  const [activeTab, setActiveTab] = useState("css");
  
  // Custom tilt ref and coordinates
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({ transform: "rotateX(0deg) rotateY(0deg)" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalise from -0.5 to 0.5
    const normX = (x / rect.width) - 0.5;
    const normY = (y / rect.height) - 0.5;
    
    // Degrees of tilt
    const rotateX = normY * -15; // Vertical tilt
    const rotateY = normX * 15; // Horizontal tilt
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    });
  };

  const codeSnippets: Record<string, string> = {
    css: `/* Strict Luxury Design Tokens */
:root {
  --color-bg-light: #F7F7F5;
  --color-primary: #111111;
  --color-secondary: #555555;
  --color-accent: #C7FF3D;
  --color-success: #4ADE80;
  --color-border: rgba(17, 17, 17, 0.08);
}`,
    btn: `<button className="group relative overflow-hidden bg-[#111111] text-[#F7F7F5] px-6 py-3 rounded-full hover:bg-[#C7FF3D] hover:text-[#111111] transition-all duration-300">
  <span className="relative z-10">Magnetic CTA</span>
  <div className="absolute inset-0 bg-[#C7FF3D] scale-y-0 origin-bottom transition-transform group-hover:scale-y-100 duration-300 z-0" />
</button>`,
    card: `<div className="glass-panel border border-[#111111]/8 rounded-3xl p-6 relative overflow-hidden">
  <div className="absolute inset-0 bg-radial from-[#C7FF3D]/5 to-transparent opacity-0 hover:opacity-100 transition-all duration-500 pointer-events-none" />
  <h4 className="font-display font-medium text-lg">Spec Glass Card</h4>
</div>`
  };

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 bg-[#F7F7F5] border-b border-[#111111]/8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Header content */}
        <div className="mb-16 text-center md:text-left">
          <span className="font-mono text-xs text-[#555555] tracking-widest uppercase">
            05 // INTERACTION ARCHITECTURE
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-[#111111] mt-3">
            Design Systems Showcase
          </h2>
          <p className="text-[#555555] font-sans text-sm mt-3 max-w-xl">
            Interactive canvas presenting high-fidelity custom frontend wireframes, hover micro-interactions, and underlying CSS design tokens.
          </p>
        </div>

        {/* Layout split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Interface canvas (col-span-6) */}
          <div className="lg:col-span-6 bg-white border border-[#111111]/8 rounded-3xl p-6 md:p-8 flex flex-col justify-between min-h-[400px]">
            <div>
              <span className="font-mono text-[9px] text-[#555555] tracking-widest uppercase block mb-6">
                // COMPONENT INTERACTION FIELD
              </span>
              
              <div className="space-y-6">
                {/* 3D tilt card wrapper */}
                <div
                  ref={cardRef}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    ...tiltStyle,
                    transition: "transform 0.1s ease, background 0.3s ease",
                  }}
                  className="bg-[#FAF9F6] border border-[#111111]/8 rounded-2xl p-6 cursor-pointer select-none shadow-sm flex flex-col justify-between h-40 transform-gpu"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[10px] text-[#555555] bg-[#111111]/5 px-2 py-0.5 rounded">
                      3D TILT ENGINE
                    </span>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#C7FF3D] animate-ping" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-[#111111]">
                      Hover Mouse Coordinate Tilt
                    </h4>
                    <p className="text-xs text-[#555555] mt-1 font-sans">
                      Move your cursor over this card to witness three-dimensional tilt angle matrices.
                    </p>
                  </div>
                </div>

                {/* Sub components row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Slider interaction element */}
                  <div className="bg-[#FAF9F6] border border-[#111111]/8 rounded-2xl p-4 flex flex-col justify-between min-h-[7rem]">
                    <span className="font-mono text-[9px] text-[#555555] block">
                      SLIDER CONTROL
                    </span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sliderVal}
                      onChange={(e) => setSliderVal(Number(e.target.value))}
                      className="w-full accent-[#111111] cursor-pointer"
                    />
                    <div className="flex justify-between font-mono text-[10px] text-[#555555]">
                      <span>VALUE:</span>
                      <span className="font-bold text-[#111111]">{sliderVal}%</span>
                    </div>
                  </div>

                  {/* Buttons controls */}
                  <div className="bg-[#FAF9F6] border border-[#111111]/8 rounded-2xl p-4 flex flex-col justify-between min-h-[7rem]">
                    <span className="font-mono text-[9px] text-[#555555] block">
                      MICRO-INTERACTIVE BUTTON
                    </span>
                    <button className="w-full py-2 bg-[#111111] text-[#F7F7F5] rounded-full text-xs font-bold font-sans hover:bg-[#C7FF3D] hover:text-[#111111] transition-all duration-300 shadow-sm mt-2">
                      Interactive CTA
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between font-mono text-[10px] text-[#555555] pt-8 border-t border-[#111111]/8 mt-8">
              <span>INTERFACE VIEWPORT</span>
              <span>100% RESPONSIBLE</span>
            </div>
          </div>

          {/* Raw configuration code panel (col-span-6) */}
          <div className="lg:col-span-6 bg-[#111111] text-white rounded-3xl p-6 md:p-8 flex flex-col justify-between min-h-[400px] border border-white/5 shadow-xl">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#C7FF3D]" />
                  <span className="font-mono text-[10px] text-white/55 tracking-wider uppercase">
                    Configuration Engine Code
                  </span>
                </div>
                <button
                  onClick={copyCode}
                  className="p-1.5 hover:bg-white/5 rounded-lg text-white/70 hover:text-white transition-colors"
                  aria-label="Copy code"
                >
                  {copied ? <Check className="w-4 h-4 text-[#4ADE80]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Selector Tabs */}
              <div className="flex gap-2 mb-6 font-mono text-[10px] relative z-10">
                <button
                  onClick={() => { setActiveTab("css"); setCopied(false); }}
                  className={`relative px-3 py-1 rounded transition-colors duration-300 cursor-pointer ${
                    activeTab === "css" ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  tokens.config
                  {activeTab === "css" && (
                    <motion.div
                      layoutId="designTabBg"
                      className="absolute inset-0 bg-white/10 rounded border border-white/10 -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </button>
                <button
                  onClick={() => { setActiveTab("btn"); setCopied(false); }}
                  className={`relative px-3 py-1 rounded transition-colors duration-300 cursor-pointer ${
                    activeTab === "btn" ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  button.tsx
                  {activeTab === "btn" && (
                    <motion.div
                      layoutId="designTabBg"
                      className="absolute inset-0 bg-white/10 rounded border border-white/10 -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </button>
                <button
                  onClick={() => { setActiveTab("card"); setCopied(false); }}
                  className={`relative px-3 py-1 rounded transition-colors duration-300 cursor-pointer ${
                    activeTab === "card" ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  card.tsx
                  {activeTab === "card" && (
                    <motion.div
                      layoutId="designTabBg"
                      className="absolute inset-0 bg-white/10 rounded border border-white/10 -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                </button>
              </div>

              {/* Code window */}
              <div className="bg-black/60 rounded-2xl p-4 border border-white/5 font-mono text-[11px] overflow-x-auto text-left shadow-inner">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <pre className="text-white/95">
                      <code>{codeSnippets[activeTab]}</code>
                    </pre>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 mt-8 flex justify-between items-center font-mono text-[9px] text-white/45">
              <span>ACTIVE CONFIGURATION: {activeTab.toUpperCase()}</span>
              <span className="text-[#C7FF3D]">SHADCN CORE / TAILWIND v4</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
