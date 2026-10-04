"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLiquidGlass } from "@/hooks/useLiquidGlass";
import LiquidGlassButton from "@/components/LiquidGlassButton";

interface NavbarProps {
  isEntered?: boolean;
}

export default function Navbar({ isEntered = true }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);

  // Apply authentic Apple-style Liquid Glass refraction (deepika-builds/liquid-glass)
  // Configured with blur: 0 and fallbackBlur: 0 for crystal-clear, non-frosted optics
  useLiquidGlass(navRef, true, {
    scale: -112,
    chroma: 6,
    border: 0.07,
    mapBlur: 12,
    blur: 0,        // 0 blur = crystal-clear refraction, NOT frosted!
    saturate: 1.25,
    fallbackBlur: 0, // No frosted blur on fallback
  });

  useLiquidGlass(mobileDrawerRef, isOpen, {
    scale: -90,
    chroma: 5,
    border: 0.06,
    mapBlur: 10,
    blur: 0,
    saturate: 1.25,
    radius: 24,
    fallbackBlur: 0,
  });

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001
  });

  const navItems = [
    { label: "Overview", href: "#hero", index: "00" },
    { label: "Manifesto", href: "#manifesto", index: "01" },
    { label: "Skills", href: "#skills", index: "02" },
    { label: "Showcase", href: "#showcase", index: "03" },
    { label: "Chronicle", href: "#timeline", index: "04" },
    { label: "Connect", href: "#connect", index: "05" },
  ];

  return (
    <>
      {/* Scroll-Linked Global Top Spectrum Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] spectrum-bar origin-left z-[9999] pointer-events-none shadow-[0_0_15px_rgba(255,94,0,0.8)]"
        style={{ scaleX }}
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={isEntered ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.25 }}
        className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl"
      >
        <div
          ref={navRef}
          className="bg-[#0C0C0C]/35 py-2.5 px-5 sm:px-6 rounded-full flex items-center justify-between border border-white/15 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.45),inset_0_-4px_14px_rgba(255,255,255,0.05),inset_0_0_0_1px_rgba(255,255,255,0.12)] hover:border-white/25"
        >
          
          {/* Brand identity */}
          <a href="#hero" className="flex items-center group py-0.5">
            <span className="font-signature font-[family-name:var(--font-sacramento)] text-2xl sm:text-3xl text-white group-hover:text-[#FF5E00] transition-colors leading-none tracking-wide select-none">
              Sujith Putta
            </span>
          </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-7 font-sans text-xs">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-white/60 hover:text-white transition-colors relative py-1 font-medium tracking-wide flex items-center gap-1.5 group"
            >
              <span className="font-mono text-[9px] text-white/30 group-hover:text-[#FF5E00] transition-colors">
                {item.index}
              </span>
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-[#FF5E00] to-[#0070F3] transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <LiquidGlassButton
            href="#connect"
            size="sm"
            variant="crystal"
            className="text-white font-sans text-xs font-semibold shadow-[0_4px_20px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.85)] border-white/30"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#FF5E00]" />
          </LiquidGlassButton>
        </div>

        {/* Mobile Toggle Button */}
        <LiquidGlassButton
          onClick={() => setIsOpen(!isOpen)}
          variant="crystal"
          size="sm"
          className="md:hidden !p-2 text-white/80 hover:text-white !rounded-full"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
              <path d="M 3 3 L 5 3 L 8 6 L 11 3 L 13 3 L 9 8 L 13 13 L 11 13 L 8 10 L 5 13 L 3 13 L 7 8 Z" />
            </svg>
          ) : (
            <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
              <rect x="2" y="3.5" width="12" height="1.5" rx="0.75" />
              <rect x="2" y="7.5" width="12" height="1.5" rx="0.75" />
              <rect x="2" y="11.5" width="12" height="1.5" rx="0.75" />
            </svg>
          )}
        </LiquidGlassButton>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={mobileDrawerRef}
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="md:hidden mt-2 liquid-glass-clear border border-white/15 p-5 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.9)] flex flex-col gap-3"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="py-2.5 px-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all flex items-center justify-between"
              >
                <span>{item.label}</span>
                <span className="font-mono text-[10px] text-white/30">{item.index}</span>
              </a>
            ))}

            <div className="pt-2 border-t border-white/10 mt-1">
              <LiquidGlassButton
                href="#connect"
                onClick={() => setIsOpen(false)}
                variant="white"
                className="w-full py-2.5 !rounded-full text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </LiquidGlassButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
    </>
  );
}
