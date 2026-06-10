"use client";

import React from "react";
import { profileData } from "@/data/profile";
import { Award, Compass, Cloud, Trophy } from "lucide-react";

export default function SocialProof() {
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Trophy className="w-5 h-5 text-[#111111]" />;
      case 1:
        return <Compass className="w-5 h-5 text-[#111111]" />;
      case 2:
        return <Award className="w-5 h-5 text-[#111111]" />;
      default:
        return <Cloud className="w-5 h-5 text-[#111111]" />;
    }
  };

  // Duplicate the array to create a seamless looping slider
  const repeatedItems = [...profileData.socialProof, ...profileData.socialProof, ...profileData.socialProof];

  return (
    <section className="py-12 border-y border-[#111111]/8 bg-white/40 backdrop-blur-sm relative z-10 overflow-hidden w-full">
      <div className="w-full flex overflow-hidden">
        {/* Infinite marquee block */}
        <div className="flex gap-8 md:gap-16 shrink-0 animate-marquee min-w-full justify-around pr-8">
          {repeatedItems.map((item, idx) => (
            <div
              key={`${item.text}-${idx}`}
              className="flex items-center gap-4 py-2 px-6 rounded-2xl bg-[#F7F7F5]/80 border border-[#111111]/5 shadow-sm hover:border-[#111111]/12 hover:bg-white transition-colors duration-300 pointer-events-auto"
            >
              <div className="p-2 rounded-xl bg-[#C7FF3D]/40">
                {getIcon(idx % 4)}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-sans font-semibold text-[#111111]">
                  {item.text}
                </span>
                <span className="text-[10px] font-mono tracking-wider text-[#555555] uppercase">
                  {item.subtext}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
