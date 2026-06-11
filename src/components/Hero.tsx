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
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-4 md:px-8 py-20 bg-[#F7F7F5]"
    >
      {/* Background Animated Orbital Glow Canvas */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        {/* Responsive soft radial glow blur circles */}
        <motion.div
          style={{
            x: glowX,
            y: glowY,
          }}
          animate={{
            scale: [1, 1.12, 0.96, 1],
            rotate: [0, 90, 180, 360],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-[85vw] h-[85vw] md:w-[620px] md:h-[620px] rounded-full bg-radial from-[#C7FF3D]/30 via-[#DFFF72]/12 to-transparent blur-[90px] md:blur-[130px]"
        />
        
        {/* Subtle grid background to overlay the glow */}
        <div 
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: "linear-gradient(rgba(17,17,17,1) 1px, transparent 1px), linear-gradient(90deg, rgba(17,17,17,1) 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />
      </div>

      {/* Hero content container */}
      <div className="relative z-10 w-full max-w-5xl text-center flex flex-col items-center select-none">

        {/* Primary Header */}
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
          className="text-4xl sm:text-5xl md:text-7xl font-display font-medium tracking-tight text-[#111111] leading-[1.15] max-w-4xl"
        >
          Hi, I&apos;m{" "}
          <span className="font-sacramento text-5xl sm:text-6xl md:text-8xl inline-block text-shadow-sm font-semibold text-[#111111] pr-2">
            Sujith Putta
          </span>.
          <br />
          I shape digital systems as an
          <br />
          <span className="relative block h-[1.3em] overflow-hidden text-[#111111] font-bold w-full text-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIdx}
                initial={{ y: "80%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-80%", opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as const }}
                className="absolute inset-x-0 bottom-0 whitespace-nowrap text-[#111111] underline decoration-[#C7FF3D] decoration-wavy decoration-2 underline-offset-8"
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
          className="text-[#555555] text-sm sm:text-base md:text-lg font-sans max-w-2xl mt-8 leading-relaxed font-light px-4 sm:px-0"
        >
          Transforming ideas into intelligent products through engineering, AI, and design. Specializing in production-grade backend scaling, vector search architectures, and polished interactions.
        </motion.p>

        {/* Call to Actions (CTAs) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
          className="flex flex-col sm:flex-row gap-4 mt-12 w-full sm:w-auto px-6 sm:px-0"
        >
          {/* Primary View Projects */}
          <a
            href="#projects"
            className="group relative inline-flex items-center justify-center gap-2 bg-[#111111] text-[#F7F7F5] hover:bg-[#C7FF3D] hover:text-[#111111] transition-all duration-300 px-8 py-4 rounded-full font-bold shadow-md select-none overflow-hidden"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>

          {/* View Resume */}
          <a
            href="/sujith-putta-resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-[#111111]/10 bg-white/40 hover:bg-[#111111]/5 hover:border-[#111111]/25 transition-all duration-300 text-[#111111] font-bold"
          >
            View Resume
          </a>

          {/* Secondary Connect */}
          <a
            href="#connect"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-[#111111]/10 bg-white/40 hover:bg-[#111111]/5 hover:border-[#111111]/25 transition-all duration-300 text-[#111111] font-bold"
          >
            Let&apos;s Connect
          </a>
        </motion.div>
      </div>

      {/* Subtle indicator of more content */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-50 z-10">
        <span className="text-[10px] font-mono tracking-widest text-[#555555] uppercase">Scroll</span>
        <div className="w-1 h-3 rounded-full bg-[#111111] animate-bounce" />
      </div>
    </div>
  );
}
