"use client";

import React from "react";
import { profileData } from "@/data/profile";
import { Award, Compass, Cloud, Trophy } from "lucide-react";
import { motion } from "framer-motion";

export default function SocialProof() {
  const getIcon = (idx: number) => {
    switch (idx % 4) {
      case 0:
        return (
          <svg viewBox="0 0 16 16" className="w-5 h-5 text-[#111111]" fill="currentColor">
            <rect x="3" y="2" width="10" height="5" />
            <rect x="2" y="3" width="1" height="3" />
            <rect x="13" y="3" width="1" height="3" />
            <rect x="7" y="7" width="2" height="4" />
            <rect x="5" y="11" width="6" height="2" />
          </svg>
        );
      case 1:
        return (
          <svg viewBox="0 0 16 16" className="w-5 h-5 text-[#111111]" fill="currentColor">
            <rect x="6" y="2" width="4" height="1" />
            <rect x="4" y="3" width="8" height="1" />
            <rect x="3" y="4" width="10" height="8" />
            <rect x="4" y="12" width="8" height="1" />
            <rect x="6" y="13" width="4" height="1" />
            <path d="M 8 5 L 10 8 L 8 11 L 6 8 Z" fill="white" stroke="currentColor" strokeWidth="1" />
          </svg>
        );
      case 2:
        return (
          <svg viewBox="0 0 16 16" className="w-5 h-5 text-[#111111]" fill="currentColor">
            <rect x="5" y="2" width="6" height="6" />
            <rect x="4" y="3" width="8" height="4" />
            <path d="M 5 8 V 13 L 7 11 L 8 12 L 9 11 L 11 13 V 8 Z" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 16 16" className="w-5 h-5 text-[#111111]" fill="currentColor">
            <rect x="5" y="5" width="6" height="2" />
            <rect x="3" y="7" width="10" height="2" />
            <rect x="2" y="9" width="12" height="3" />
          </svg>
        );
    }
  };

  // Duplicate the array to create a seamless looping slider
  const repeatedItems = [...profileData.socialProof, ...profileData.socialProof, ...profileData.socialProof];

  return (
    <section className="py-12 border-y-2 border-black bg-white/40 backdrop-blur-sm relative z-10 overflow-hidden w-full select-none">
      <div className="w-full flex overflow-hidden">
        {/* Infinite marquee block */}
        <div className="flex gap-8 md:gap-16 shrink-0 animate-marquee min-w-full justify-around pr-8">
          {repeatedItems.map((item, idx) => (
            <motion.div
              key={`${item.text}-${idx}`}
              whileHover={{ scale: 1.02, y: -1 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-4 py-2 px-6 rounded-none bg-[#F7F7F5] border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 pointer-events-auto cursor-default"
            >
              <div className="p-1.5 rounded-none border border-black bg-[#C7FF3D] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] shrink-0">
                {getIcon(idx)}
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-pixel font-bold text-[#111111]">
                  {item.text}
                </span>
                <span className="text-[9px] font-pixel tracking-wider text-[#555555] uppercase mt-0.5">
                  {item.subtext}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
