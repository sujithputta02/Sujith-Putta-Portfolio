"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const roles = ["AI Engineer", "Full Stack Developer", "UI/UX Designer"];
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIdx((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Custom springs for orbital hover effect on desktop
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const glowY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      // Normalised position for translation
      mouseX.set(x - rect.width / 2);
      mouseY.set(y - rect.height / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-4 md:px-8 pt-32 pb-20 md:pt-40 md:pb-24 bg-[#F7F7F5]"
    >
      {/* Subtle grid background to overlay the background */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(17,17,17,1) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,1) 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />

      {/* Floating Pixel Stickers (Hidden on mobile for clean layout, visible on desktop) */}
      
      {/* Sticker 1: Terminal Prompt (Top Left) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: -12 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
        className="hidden lg:block absolute left-[8%] top-[22%] p-3 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] select-none z-10"
      >
        <svg viewBox="0 0 16 16" width="56" height="56" fill="none" className="text-black">
          <rect x="2" y="2" width="12" height="12" fill="white" />
          <rect x="1" y="1" width="14" height="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          <path d="M 4 4 L 8 7 L 4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          <line x1="9" y1="10" x2="12" y2="10" stroke="currentColor" strokeWidth="2" />
        </svg>
      </motion.div>

      {/* Sticker 2: Code Brackets (Top Right) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotate: 20 }}
        animate={{ opacity: 1, scale: 1, rotate: 8 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.6 }}
        className="hidden lg:block absolute right-[8%] top-[22%] p-3 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] select-none z-10"
      >
        <svg viewBox="0 0 16 16" width="56" height="56" fill="none" className="text-black">
          <rect x="2" y="2" width="12" height="12" fill="white" />
          <rect x="1" y="1" width="14" height="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          <path d="M 5 5 L 2 8 L 5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          <line x1="9" y1="4" x2="7" y2="12" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 11 5 L 14 8 L 11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        </svg>
      </motion.div>

      {/* Sticker 3: Server/Database (Bottom Left) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: -8 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.7 }}
        className="hidden lg:block absolute left-[10%] bottom-[22%] p-3 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] select-none z-10"
      >
        <svg viewBox="0 0 16 16" width="56" height="56" fill="none" className="text-black">
          <rect x="2" y="2" width="12" height="12" fill="white" />
          <rect x="1" y="1" width="14" height="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          <rect x="4" y="3" width="8" height="2" stroke="currentColor" strokeWidth="1.5" fill="white" />
          <rect x="4" y="7" width="8" height="2" stroke="currentColor" strokeWidth="1.5" fill="white" />
          <rect x="4" y="11" width="8" height="2" stroke="currentColor" strokeWidth="1.5" fill="white" />
        </svg>
      </motion.div>

      {/* Sticker 4: AI Processor Microchip (Bottom Right) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, rotate: 25 }}
        animate={{ opacity: 1, scale: 1, rotate: 15 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.8 }}
        className="hidden lg:block absolute right-[10%] bottom-[22%] p-3 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] select-none z-10"
      >
        <svg viewBox="0 0 16 16" width="56" height="56" fill="none" className="text-black">
          <rect x="2" y="2" width="12" height="12" fill="white" />
          <rect x="1" y="1" width="14" height="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
          <rect x="5" y="5" width="6" height="6" stroke="currentColor" strokeWidth="1.5" fill="white" />
          <line x1="3" y1="6" x2="5" y2="6" stroke="currentColor" strokeWidth="1.5" />
          <line x1="3" y1="8" x2="5" y2="8" stroke="currentColor" strokeWidth="1.5" />
          <line x1="3" y1="10" x2="5" y2="10" stroke="currentColor" strokeWidth="1.5" />
          <line x1="11" y1="6" x2="13" y2="6" stroke="currentColor" strokeWidth="1.5" />
          <line x1="11" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="1.5" />
          <line x1="11" y1="10" x2="13" y2="10" stroke="currentColor" strokeWidth="1.5" />
          <line x1="6" y1="3" x2="6" y2="5" stroke="currentColor" strokeWidth="1.5" />
          <line x1="8" y1="3" x2="8" y2="5" stroke="currentColor" strokeWidth="1.5" />
          <line x1="10" y1="3" x2="10" y2="5" stroke="currentColor" strokeWidth="1.5" />
          <line x1="6" y1="11" x2="6" y2="13" stroke="currentColor" strokeWidth="1.5" />
          <line x1="8" y1="11" x2="8" y2="13" stroke="currentColor" strokeWidth="1.5" />
          <line x1="10" y1="11" x2="10" y2="13" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </motion.div>

      {/* Hero content container */}
      <div className="relative z-10 w-full max-w-5xl text-center flex flex-col items-center select-none">

        {/* Editorial Sub-badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] as const }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-black text-[10px] font-pixel text-[#111111] uppercase tracking-widest mb-8 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
        >
          <span className="w-1.5 h-1.5 rounded-none bg-[#C7FF3D] border border-black shadow-[0_0_4px_#C7FF3D] animate-pulse" />
          Available for product engineering
        </motion.div>

        {/* Primary Header */}
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-3xl sm:text-4xl md:text-6xl font-pixel font-bold tracking-tight text-[#111111] leading-[1.5] max-w-4xl"
        >
          Hi, I&apos;m{" "}
          <span className="font-sacramento text-5xl sm:text-6xl md:text-8xl inline-block text-shadow-sm font-semibold text-[#111111] pr-2">
            Sujith Putta
          </span>.
          <br />
          I shape digital systems as an
          <br />
          <span className="relative block h-[1.3em] overflow-hidden text-[#111111] font-bold w-full text-center mt-3 md:mt-4">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIdx}
                initial={{ y: "80%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-80%", opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as const }}
                className="absolute inset-x-0 bottom-0 whitespace-nowrap text-[#111111] underline decoration-[#111111] decoration-wavy decoration-2 underline-offset-8"
              >
                {roles[roleIdx]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-[#555555] text-xs sm:text-sm md:text-base font-sans max-w-2xl mt-8 leading-relaxed font-light px-4 sm:px-0"
        >
          Transforming ideas into intelligent products through engineering, AI, and design. Specializing in production-grade backend scaling, vector search architectures, and polished interactions.
        </motion.p>

        {/* Row of 8-Bit Developer Icons (Visible on all devices) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex gap-4 mt-8 justify-center"
        >
          {/* Icon 1: Terminal */}
          <div className="p-2.5 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <svg viewBox="0 0 16 16" width="20" height="20" fill="none" className="text-black">
              <path d="M 4 4 L 8 7 L 4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
              <line x1="9" y1="10" x2="12" y2="10" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
          {/* Icon 2: Brackets */}
          <div className="p-2.5 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <svg viewBox="0 0 16 16" width="20" height="20" fill="none" className="text-black">
              <path d="M 5 5 L 2 8 L 5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
              <line x1="9" y1="4" x2="7" y2="12" stroke="currentColor" strokeWidth="1.5" />
              <path d="M 11 5 L 14 8 L 11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          </div>
          {/* Icon 3: Server */}
          <div className="p-2.5 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="text-black">
              <rect x="3" y="2" width="10" height="3" />
              <rect x="3" y="6" width="10" height="3" />
              <rect x="3" y="10" width="10" height="3" />
              <circle cx="5" cy="3.5" r="0.7" fill="white" />
              <circle cx="5" cy="7.5" r="0.7" fill="white" />
              <circle cx="5" cy="11.5" r="0.7" fill="white" />
            </svg>
          </div>
          {/* Icon 4: CPU */}
          <div className="p-2.5 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <svg viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="text-black">
              <rect x="5" y="5" width="6" height="6" />
              <line x1="3" y1="6" x2="5" y2="6" stroke="currentColor" strokeWidth="1.2" />
              <line x1="3" y1="8" x2="5" y2="8" stroke="currentColor" strokeWidth="1.2" />
              <line x1="3" y1="10" x2="5" y2="10" stroke="currentColor" strokeWidth="1.2" />
              <line x1="11" y1="6" x2="13" y2="6" stroke="currentColor" strokeWidth="1.2" />
              <line x1="11" y1="8" x2="13" y2="8" stroke="currentColor" strokeWidth="1.2" />
              <line x1="11" y1="10" x2="13" y2="10" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </div>
        </motion.div>

        {/* Call to Actions (CTAs) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex flex-col sm:flex-row gap-6 mt-12 w-full sm:w-auto px-6 sm:px-0"
        >
          {/* Primary View Projects */}
          <a
            href="#projects"
            className="group relative inline-flex items-center justify-center gap-2 bg-[#C7FF3D] text-[#111111] border-2 border-black px-8 py-4 font-pixel font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 select-none cursor-pointer"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          {/* View Resume */}
          <a
            href="/sujith-putta-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-black bg-white text-[#111111] font-pixel font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 cursor-pointer"
          >
            View Resume
          </a>

          {/* Secondary Connect */}
          <a
            href="#connect"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-black bg-white text-[#111111] font-pixel font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 cursor-pointer"
          >
            Let&apos;s Connect
          </a>
        </motion.div>
      </div>

      {/* Subtle indicator of more content */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 z-10">
        <span className="text-[10px] font-pixel font-bold tracking-widest text-[#111111] uppercase">Scroll</span>
        <div className="w-1.5 h-3.5 border border-black bg-[#111111] animate-bounce" />
      </div>
    </div>
  );
}
