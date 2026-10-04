"use client";

import React from "react";
import { profileData } from "@/data/profile";
import { LiquidGlassCard } from "@/components/LiquidGlassCard";

export default function SocialProof() {
  const repeatedItems = [
    ...profileData.socialProof,
    ...profileData.socialProof,
    ...profileData.socialProof,
    ...profileData.socialProof,
  ];

  return (
    <section className="py-6 sm:py-8 border-y border-white/10 bg-[#070707] relative z-10 overflow-hidden w-full select-none">
      {/* Luxury Edge Fades for Seamless Marquee Flow */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#070707] via-[#070707]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#070707] via-[#070707]/80 to-transparent z-20 pointer-events-none" />

      <div className="w-full flex overflow-hidden">
        {/* Infinite Marquee Track with Glass Pills */}
        <div className="flex gap-4 sm:gap-6 shrink-0 animate-marquee min-w-full items-center pr-6">
          {repeatedItems.map((item, idx) => (
            <LiquidGlassCard
              key={`${item.text}-${idx}`}
              className="flex items-center gap-3.5 py-2.5 px-5 sm:px-6 rounded-full border border-white/15 hover:border-white/35 transition-all duration-300 cursor-default shrink-0 shadow-[0_8px_25px_rgba(0,0,0,0.6)] group hover:scale-[1.03]"
              options={{
                radius: 9999,
                scale: -75,
                chroma: 4,
                border: 0.06,
                mapBlur: 8,
                blur: 0,
                fallbackBlur: 0,
              }}
              style={{
                background: "rgba(255, 255, 255, 0.04)",
              }}
            >
              {/* Glowing Pulse Dot */}
              <div className="w-2 h-2 rounded-full bg-[#FF5E00] animate-pulse shrink-0 shadow-[0_0_10px_#FF5E00]" />
              
              {/* Text Label */}
              <div className="flex flex-col text-left">
                <span className="text-xs sm:text-sm font-sans font-bold text-white tracking-tight leading-tight group-hover:text-white transition-colors">
                  {item.text}
                </span>
                <span className="text-[9px] font-mono tracking-widest text-white/50 uppercase mt-0.5">
                  {item.subtext}
                </span>
              </div>
            </LiquidGlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
