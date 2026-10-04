"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AppleHelloEnglishEffect } from "@/components/ui/apple-hello-effect";

interface EntrancePreloaderProps {
  onEnter: () => void;
}

export const EntrancePreloader: React.FC<EntrancePreloaderProps> = ({ onEnter }) => {
  const [helloCompleted, setHelloCompleted] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleTriggerEnter = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    onEnter();
  }, [isExiting, onEnter]);

  // Smooth auto-transition into Hero once handwriting finishes
  useEffect(() => {
    if (helloCompleted && !isExiting) {
      const timer = setTimeout(() => {
        handleTriggerEnter();
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [helloCompleted, isExiting, handleTriggerEnter]);

  // Fallback timer so user never gets stuck under any circumstance
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      handleTriggerEnter();
    }, 4200);
    return () => clearTimeout(safetyTimer);
  }, [handleTriggerEnter]);

  return (
    <div
      onClick={handleTriggerEnter}
      className={`fixed inset-0 z-[99999] select-none overflow-hidden transition-all duration-[1100ms] cursor-pointer ${
        isExiting ? "pointer-events-none" : "pointer-events-auto"
      }`}
      title="Click anywhere to enter portfolio"
    >
      {/* Top Theatrical Shutter Panel (Seamless dark luxury velvet, NO seam lines) */}
      <div
        className={`fixed top-0 left-0 w-full h-[50.5vh] bg-[#060606] transition-transform duration-[1100ms] ease-[cubic-bezier(0.85,0,0.15,1)] z-10 ${
          isExiting ? "-translate-y-full" : "translate-y-0"
        }`}
      />

      {/* Bottom Theatrical Shutter Panel (Seamless dark luxury velvet, NO seam lines) */}
      <div
        className={`fixed bottom-0 left-0 w-full h-[50.5vh] bg-[#060606] transition-transform duration-[1100ms] ease-[cubic-bezier(0.85,0,0.15,1)] z-10 ${
          isExiting ? "translate-y-full" : "translate-y-0"
        }`}
      />

      {/* Subtle architectural grid pattern */}
      <div
        className={`fixed inset-0 pointer-events-none z-15 transition-opacity duration-700 ${
          isExiting ? "opacity-0" : "opacity-[0.04]"
        }`}
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.25) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.25) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Ambient optical caustic glow pool radiating behind the liquid glass */}
      <div
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#0070F3]/20 via-[#38BDF8]/15 to-[#FF5E00]/15 blur-[150px] rounded-full pointer-events-none z-15 transition-opacity duration-700 ${
          isExiting ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Center Cinematic Liquid Glass Hello Showcase */}
      <div
        className={`fixed inset-0 z-20 flex flex-col justify-center items-center text-white px-6 transition-all duration-[750ms] ease-[cubic-bezier(0.85,0,0.15,1)] ${
          isExiting
            ? "opacity-0 scale-105 pointer-events-none"
            : "opacity-100 scale-100 pointer-events-auto"
        }`}
      >
        <div className="flex flex-col items-center max-w-4xl w-full text-center">
          
          {/* Luminous Apple Liquid Glass Hello Typography */}
          <div className="relative flex flex-col items-center justify-center w-full py-4">
            <AppleHelloEnglishEffect
              speed={0.92}
              className="h-32 sm:h-44 md:h-56 lg:h-64 w-auto max-w-full filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)] drop-shadow-[0_0_40px_rgba(56,189,248,0.3)] drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
              onAnimationComplete={() => setHelloCompleted(true)}
            />
          </div>

          {/* Minimalist interactive hint */}
          <div
            className={`mt-10 font-mono text-[10px] tracking-[0.25em] uppercase text-white/30 transition-opacity duration-700 ${
              isExiting ? "opacity-0" : "opacity-100"
            }`}
          >
            Click anywhere to enter
          </div>

        </div>
      </div>
    </div>
  );
};

export default EntrancePreloader;
