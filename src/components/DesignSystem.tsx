"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DesignSystem() {
  const [copied, setCopied] = useState(false);
  const [sliderVal, setSliderVal] = useState(4); // shadow offset in px
  const [activeTab, setActiveTab] = useState("css");
  const [isPressed, setIsPressed] = useState(false);
  
  // Custom tilt ref and coordinates
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState({ transform: "rotateX(0deg) rotateY(0deg)" });
  const [currentRot, setCurrentRot] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalise from -0.5 to 0.5
    const normX = (x / rect.width) - 0.5;
    const normY = (y / rect.height) - 0.5;
    
    // Degrees of tilt
    const rotateX = Math.round(normY * -15); // Vertical tilt
    const rotateY = Math.round(normX * 15); // Horizontal tilt
    
    setCurrentRot({ x: rotateX, y: rotateY });
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    });
  };

  const handleMouseLeave = () => {
    setCurrentRot({ x: 0, y: 0 });
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    });
  };

  const getDynamicCode = (tab: string) => {
    switch (tab) {
      case "css":
        return `/* Retro 8-Bit Design Tokens */
:root {
  --color-bg-light: #F7F7F5;
  --color-primary: #111111;
  --color-secondary: #555555;
  --color-accent: #C7FF3D;
  --color-success: #4ADE80;
  --color-border: #111111;
  --shadow-offset: ${sliderVal}px;
}`;
      case "btn":
        return `// Retro 8-Bit Button Component
<button 
  className="px-6 py-2 bg-[#111111] text-[#C7FF3D] rounded-none border-2 border-black font-pixel transition-all duration-100"
  style={{
    boxShadow: "${Math.round(sliderVal / 2)}px ${Math.round(sliderVal / 2)}px 0px 0px #000000"
  }}
>
  Interactive CTA
</button>`;
      case "card":
        return `// Retro 8-Bit Card Component (with real-time 3D tilt)
<div 
  className="bg-[#FAF9F6] border-2 border-black rounded-none p-6 transition-all duration-150"
  style={{
    transform: "perspective(1000px) rotateX(${currentRot.x}deg) rotateY(${currentRot.y}deg)",
    boxShadow: "${sliderVal}px ${sliderVal}px 0px 0px #000000"
  }}
>
  <span className="font-pixel text-[9px] text-[#111111]">3D TILT ENGINE</span>
  <h4 className="font-pixel font-bold text-lg text-[#111111]">Hover Mouse Coordinate Tilt</h4>
</div>`;
      default:
        return "";
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(getDynamicCode(activeTab));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-24 bg-[#F7F7F5] border-b-2 border-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Header content */}
        <div className="mb-16 text-center md:text-left">
          <span className="font-pixel text-xs text-[#555555] tracking-widest uppercase font-bold">
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
          <div className="lg:col-span-6 bg-white border-2 border-black rounded-none p-6 md:p-8 flex flex-col justify-between min-h-[400px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div>
              <span className="font-pixel text-[9px] text-[#555555] tracking-widest uppercase block mb-6 font-bold">
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
                    boxShadow: `${sliderVal}px ${sliderVal}px 0px 0px rgba(0,0,0,1)`,
                    transition: "transform 0.08s ease-out, background 0.3s ease",
                  }}
                  className="bg-[#FAF9F6] border-2 border-black rounded-none p-6 cursor-pointer select-none flex flex-col justify-between h-40 transform-gpu"
                >
                  <div className="flex justify-between items-start">
                    <span className="font-pixel text-[9px] text-[#111111] bg-white border border-black px-2 py-0.5 rounded-none font-bold">
                      3D TILT ENGINE
                    </span>
                    <div className="w-2.5 h-2.5 rounded-none bg-[#C7FF3D] border border-black animate-pulse" />
                  </div>
                  <div>
                    <h4 className="font-pixel font-bold text-lg text-[#111111]">
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
                  <div className="bg-[#FAF9F6] border-2 border-black rounded-none p-4 flex flex-col justify-between min-h-[7rem] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <span className="font-pixel text-[9px] text-[#555555] block font-bold">
                      SHADOW CONTROL
                    </span>
                    <input
                      type="range"
                      min="1"
                      max="12"
                      value={sliderVal}
                      onChange={(e) => setSliderVal(Number(e.target.value))}
                      className="w-full accent-[#111111] cursor-pointer"
                    />
                    <div className="flex justify-between font-pixel text-[10px] text-[#555555] font-bold">
                      <span>OFFSET:</span>
                      <span className="text-[#111111]">{sliderVal}px</span>
                    </div>
                  </div>

                  {/* Buttons controls */}
                  <div className="bg-[#FAF9F6] border-2 border-black rounded-none p-4 flex flex-col justify-between min-h-[7rem] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <span className="font-pixel text-[9px] text-[#555555] block font-bold">
                      MICRO-INTERACTIVE BUTTON
                    </span>
                    <button 
                      onClick={() => {
                        setIsPressed(true);
                        setActiveTab("btn");
                        setTimeout(() => setIsPressed(false), 1000);
                      }}
                      style={{
                        boxShadow: `${Math.round(sliderVal / 2)}px ${Math.round(sliderVal / 2)}px 0px 0px rgba(0,0,0,1)`
                      }}
                      className={`w-full py-2 rounded-none text-xs font-bold font-pixel border-2 border-black transition-all duration-100 mt-2 cursor-pointer ${
                        isPressed ? "bg-[#4ADE80] text-[#111111]" : "bg-[#111111] text-[#C7FF3D]"
                      }`}
                    >
                      {isPressed ? "SUCCESS!" : "Interactive CTA"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between font-pixel text-[10px] text-[#555555] pt-8 border-t-2 border-black/10 mt-8 font-bold">
              <span>INTERFACE VIEWPORT</span>
              <span>100% RESPONSIBLE</span>
            </div>
          </div>

          {/* Raw configuration code panel (col-span-6) */}
          <div className="lg:col-span-6 bg-[#111111] text-white rounded-none p-6 md:p-8 flex flex-col justify-between min-h-[400px] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 16 16" className="w-4 h-4 text-[#C7FF3D]" fill="none">
                    <path d="M 4 4 L 8 7 L 4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                    <line x1="9" y1="10" x2="12" y2="10" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  <span className="font-pixel text-[10px] text-white/55 tracking-wider uppercase font-bold">
                    Configuration Engine Code
                  </span>
                </div>
                <button
                  onClick={copyCode}
                  className="p-1.5 hover:bg-white/5 border border-white/10 rounded-none text-white/70 hover:text-white transition-colors cursor-pointer shadow-[1px_1px_0px_0px_rgba(255,255,255,0.1)]"
                  aria-label="Copy code"
                >
                  {copied ? (
                    <svg viewBox="0 0 16 16" className="w-4 h-4 text-[#4ADE80]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square">
                      <path d="M 3 8 L 6 11 L 13 4" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                      <rect x="2" y="2" width="8" height="8" />
                      <rect x="6" y="6" width="8" height="8" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Selector Tabs */}
              <div className="flex gap-2 mb-6 font-pixel text-[10px] font-bold relative z-10">
                <button
                  onClick={() => { setActiveTab("css"); setCopied(false); }}
                  className={`relative px-3 py-1.5 rounded-none border-2 transition-all duration-150 cursor-pointer ${
                    activeTab === "css" ? "text-[#C7FF3D] border-white/20 bg-white/5 shadow-[1.5px_1.5px_0px_0px_rgba(255,255,255,0.15)]" : "text-white/50 border-transparent hover:text-white"
                  }`}
                >
                  tokens.config
                </button>
                <button
                  onClick={() => { setActiveTab("btn"); setCopied(false); }}
                  className={`relative px-3 py-1.5 rounded-none border-2 transition-all duration-150 cursor-pointer ${
                    activeTab === "btn" ? "text-[#C7FF3D] border-white/20 bg-white/5 shadow-[1.5px_1.5px_0px_0px_rgba(255,255,255,0.15)]" : "text-white/50 border-transparent hover:text-white"
                  }`}
                >
                  button.tsx
                </button>
                <button
                  onClick={() => { setActiveTab("card"); setCopied(false); }}
                  className={`relative px-3 py-1.5 rounded-none border-2 transition-all duration-150 cursor-pointer ${
                    activeTab === "card" ? "text-[#C7FF3D] border-white/20 bg-white/5 shadow-[1.5px_1.5px_0px_0px_rgba(255,255,255,0.15)]" : "text-white/50 border-transparent hover:text-white"
                  }`}
                >
                  card.tsx
                </button>
              </div>

              {/* Code window */}
              <div className="bg-black/60 rounded-none p-4 border-2 border-white/15 font-mono text-[11px] overflow-x-auto text-left shadow-inner min-h-[180px] flex flex-col justify-center">
                <pre className="text-white/95">
                  <code>{getDynamicCode(activeTab)}</code>
                </pre>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 mt-8 flex justify-between items-center font-pixel text-[9px] text-white/45 font-bold">
              <span>ACTIVE CONFIGURATION: {activeTab.toUpperCase()}</span>
              <span className="text-[#C7FF3D]">SHADCN CORE / TAILWIND v4</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
